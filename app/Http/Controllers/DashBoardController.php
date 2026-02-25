<?php

namespace App\Http\Controllers;

use App\Models\MouvementStock;
use Illuminate\Container\Attributes\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;


use function Termwind\render;

class DashBoardController extends Controller
{
    //
    public function getDashboard()
    {

        $user = Auth::user();
        if ($user->role !== "commerce") {
            return Response()->json(["Message" => "unhautorized"], 403);
        }
        $totalProduits = $user->commerce->produits()->count();
        $totalProduitsRupture = $user->commerce->produits()->where('current_quantity', '<=', 0)->count();
        $dernieresMouvements = MouvementStock::whereHas('produit', function ($query) use ($user) {
            $query->where('commerce_id', $user->commerce_id);
        })->orderBy('created_at', 'desc')->take(10)->get();

        $ProduitCritique = $user->commerce->produits()->whereRaw('current_quantity <= seuil/2')->get();
        $totalvaleurStock = $user->commerce->produits()->selectRaw('SUM(current_quantity*purchasing_price) as valeurTotalStock')
            ->value('valeurTotalStock')??0;

        $statsWeek = MouvementStock::whereHas('produit', function($q) use ($user){
             $q->where('commerce_id', $user->commerce_id);
        })->where('date_mouvement', '>=', now()->subDays(7))
            ->selectRaw('DATE(date_mouvement) as jour, type, SUM(quantity_change) as total')
            ->groupBy('jour', 'type')
            ->get();
            
        $alertes = $user->commerce->produits()->whereRaw('current_quantity <= seuil')->get();

        return Inertia::render('DashboardCommercant', [
            "totalProduits" => $totalProduits,
            "totalProduitsRupture" => $totalProduitsRupture,
            "dernieresMouvements" => $dernieresMouvements,
            "ProduitCritique" => $ProduitCritique,
            "totalvaleurStock" => $totalvaleurStock,
            "alertes" => $alertes,
            "statsWeek" => $statsWeek,
        ]);
    }
}
