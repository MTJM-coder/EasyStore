<?php

namespace App\Http\Controllers;

use App\Models\MouvementStock;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Produit;
use Illuminate\Support\Facades\DB;

class MouvementStockController extends Controller
{
    //
    public function getMouvements()
    {
        try {
            Auth::user();
        } catch (Exception $e) {
            return response()->json([403, "Message" => $e->getMessage()]);
        }

        $mouvement = MouvementStock::with("produits", "fournisseur")->where('');
    }

    public function getEntrees()
    {
        $user = Auth::user();
        if ($user->role != "commerce") {
            return response()->json([403, "Message" => "Unauthorized"]);
        }
        $entrees = MouvementStock::with("produit", "fournisseur")->where('type', 'in')->whereHas('produit', function ($q) use ($user) {
            $q->where('commerce_id', $user->commerce_id);
        })->get();

        $produits = $user->commerce->produits()->get();
        $fournisseurs = $user->commerce->fournisseurs()->get();

        return Inertia::render('EntreeStockEmploye', [
            "entrees" => $entrees,
            'produits' => $produits,
            'fournisseurs' => $fournisseurs
        ]);
    }

    public function addEntree(Request $req)
    {

        $user = Auth::user();

        if ($user->role != "commerce") {
            return response()->json([403, "Message" => "Unauthorized"]);
        }

        $validateData = $req->validate([
            'produit_id' => 'required|exists:produits,id',
            'fournisseur_id' => 'nullable|exists:fournisseurs,id',
            'quantite' => 'required|integer|min:1',
            'date' => 'required|date',
            'commentaire' => 'nullable|string'
        ]);

        try {

            DB::transaction(function () use ($validateData, $user) {
                $mouvement = new MouvementStock();
                $mouvement->produit_id = $validateData['produit_id'];
                $mouvement->fournisseur_id = $validateData['fournisseur_id'] ?? null;
                $mouvement->quantity_change = $validateData['quantite'];
                $mouvement->date_mouvement = $validateData['date'];
                $mouvement->note = $validateData['commentaire'] ?? null;
                $mouvement->type = 'in';
                $mouvement->motif = 'achat';
                $mouvement->user_id = $user->id;
                $mouvement->save();

                $produit = Produit::find($validateData['produit_id']);
                $produit->current_quantity += $validateData['quantite'];
                $produit->save();
            });

            return redirect()->back()->with('success', 'Entrée de stock enregistrée avec succès');
        } catch (Exception $e) {
            return response()->json([500, "Message" => $e->getMessage()]);
        }
    }

    public function getSorties()
    {

        $user = Auth::user();
        if ($user->role != "commerce") {
            return response()->json([403, "Message" => "Unauthorized"]);
        }
        $sorties = MouvementStock::with("produit", "fournisseur")->where('type', 'out')->whereHas('produit', function ($q) use ($user) {
            $q->where('commerce_id', $user->commerce_id);
        })->get();

        $produits = Produit::where('commerce_id', $user->commerce_id)->get(['id', 'ref', 'name']);
        return Inertia::render('SortieStockEmployee', [
            "sorties" => $sorties,
            "produits" => $produits
        ]);
        return Inertia::render('SortieStockEmployee', [
            "sorties" => $sorties,
            "produits" => $produits
        ]);
    }

    public function addSortie(Request $req)
    {

        $user = Auth::user();

        if ($user->role != "commerce") {
            return response()->json([403, "Message" => "Unauthorized"]);
        }

        $validateData = $req->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1',
            'date' => 'required|date',
            'motif' => 'required|string|in:vente,perte,casse',
            // 'commentaire' => 'nullable|string'
        ]);

        $produit = Produit::find($validateData['produit_id']);
        if ($produit->current_quantity < $validateData['quantite']) {
            return redirect()->back()->with('error', 'Quantité insuffisante en stock');
        }
        try {

            DB::transaction(function () use ($validateData, $user) {
                $mouvement = new MouvementStock();
                $mouvement->produit_id = $validateData['produit_id'];
                $mouvement->quantity_change = -$validateData['quantite'];
                $mouvement->date_mouvement = $validateData['date'];
                $mouvement->note = $validateData['commentaire'] ?? null;
                $mouvement->type = 'out';
                $mouvement->motif = $validateData['motif'];
                $mouvement->user_id = $user->id;
                $mouvement->save();
                
                $produit = Produit::find($validateData['produit_id']);  
                $produit->current_quantity -= $validateData['quantite'];
                $produit->save();
            });

            return redirect()->back()->with('success', 'Sortie de stock enregistrée avec succès');
        } catch (Exception $e) {
            return response()->json([500, "Message" => $e->getMessage()]);
        }
    }
}
