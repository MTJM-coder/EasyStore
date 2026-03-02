<?php

namespace App\Http\Controllers;

use App\Models\Fournisseurs;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MouvementStock;
use Symfony\Component\HttpFoundation\Response;

class FournisseurController extends Controller
{
    //
    public function getSuppliers()
    {
        $user = Auth::user();

        if ($user->role !== "commerce") {
            return Response()->json(["Message" => "unhautorized"], 403);
        }

        $suppliers = Fournisseurs::where('commerce_id', $user->commerce_id)->get();
        // $dernieresCommandes=MouvementStock::with("produit")->whereHas('produit',function($q) use ($user){
        //     $q->where('commerce_id',$user->commerce_id);
        // })->orderBy('created_at','desc')->take(5)->get();

        $totalFournisseursActifs = MouvementStock::where('type', 'in')
            ->whereHas('produit', function ($q) use ($user) {
                $q->where('commerce_id', $user->commerce_id);
            })
            ->distinct('fournisseur_id')
            ->count('fournisseur_id');
        return Inertia::render("GestFournisseur", ["fournisseurs" => $suppliers, "totalFournisseursActifs" => $totalFournisseursActifs]);
    }

    public function addSupplier(Request $req)
    {
        $validatedata = $req->validate([
            "name" => "required",
            "telephone" => "required",
            "email" => "nullable|email",
            "ville" => "nullable",
            "pays" => "nullable",
            "adresse" => "nullable",
            "type" => "nullable"

        ]);
        $user = Auth::user();
        if ($user->role !== "commerce") {
            return Response()->json(["Message" => "unhautorized"], 403);
        }

        $fournisseur = new Fournisseurs();
        $fournisseur->name = $validatedata['name'];
        $fournisseur->telephone = $validatedata['telephone'];
        $fournisseur->commerce_id = $user->commerce_id;
        $fournisseur->email = $validatedata['email'];
        $fournisseur->ville = $validatedata['ville'];
        $fournisseur->pays = $validatedata['pays'];
        $fournisseur->type = $validatedata['type'];
        // $fournisseur->adresse = $validatedata['adresse'];
        $fournisseur->save();

        return redirect()->back()->with("success", "Fournisseur ajouté avec succès");
    }

    public function updateSupplier(Request $req, $id)
    {
        $validatedata = $req->validate([
            "name" => "required",
            "telephone" => "required",
            "email" => "nullable|email",
            "ville" => "nullable",
            "pays" => "nullable",
            // "adresse" => "nullable",
            "type" => "nullable"

        ]);

        $user = Auth::user();
        if ($user->role !== "commerce") {
            return Response()->json(["Message" => "unhautorized"], 403);
        }

        $fournisseur = Fournisseurs::where('id', $id)->where("commerce_id", $user->commerce_id)->first();
        if (!$fournisseur) {
            return redirect()->back()->with("error", "Fournisseur introuvable");
        }
        $fournisseur->name = $validatedata['name'];
        $fournisseur->telephone = $validatedata['telephone'];
        $fournisseur->email = $validatedata['email'];
        $fournisseur->ville = $validatedata['ville'];
        $fournisseur->pays = $validatedata['pays'];
        // $fournisseur->adresse = $validatedata['adresse'];
        $fournisseur->type = $validatedata['type'];
        $fournisseur->save();

        return redirect()->back()->with("success", "Fournisseur mis à jour avec succès");
    }

    public function deleteSupplier($id)
    {
        $user = Auth::user();
        if ($user->role !== "commerce") {
            return Response()->json(["Message" => "unhautorized"], 403);
        }

        $fournisseur = Fournisseurs::where('id', $id)->where("commerce_id", $user->commerce_id)->first();
        if (!$fournisseur) {
            return redirect()->back()->with("error", "Fournisseur introuvable");
        }
        $fournisseur->delete();

        return redirect()->back()->with("success", "Fournisseur supprimé avec succès");
    }
}
