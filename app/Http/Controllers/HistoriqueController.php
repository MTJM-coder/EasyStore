<?php

namespace App\Http\Controllers;

use App\Models\MouvementStock;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;


class HistoriqueController extends Controller
{
    //
    public function getHistorique(){
        $user=Auth::user();
        $historiqueMouvements=MouvementStock::whereHas('produit',function($q) use ($user){
            $q->where('commerce_id',$user->commerce_id);
        })->with('produit','user','fournisseur')->orderBy('created_at','desc')->get();
        return Inertia::render('HistoriqueEmploye',[
            'historiqueMouvements'=>$historiqueMouvements
        ]);
    }
}
