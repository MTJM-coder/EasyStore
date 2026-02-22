<?php

namespace App\Http\Controllers;

use App\Models\MouvementStock;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class MouvementStockController extends Controller
{
    //
    public function getMouvements(){
        try{
            Auth::user();
        }
        catch(Exception $e){
            return response()->json([403,"Message"=>$e->getMessage()]);
        }

        $mouvement=MouvementStock::with("produits","fournisseur")->where('');
    }
}
