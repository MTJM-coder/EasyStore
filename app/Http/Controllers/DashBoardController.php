<?php

namespace App\Http\Controllers;

use App\Models\MouvementStock;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    //
    public function getDashboard(){
        $user=Auth::user();
        if($user->role!=="commerce"){
            return Response()->json(["Message"=>"unhautorized"],403);
        }
        $totalProduits=$user->commerce->produits()->count();
        $totalProduitsRupture=$user->commerce->produits()->where('current_quantity','<=',0)->count();
        $dernieresMouvements=MouvementStock::whereHas('produit',function($query) use ($user){
            $query->where('commerce_id',$user->commerce_id);
        })->orderBy('created_at','desc')->take(10)->get();

        return response()->json([
            "totalProduits"=>$totalProduits,
            "totalProduitsRupture"=>$totalProduitsRupture,
            "dernieresMouvements"=>$dernieresMouvements
        ]);
    }
}
