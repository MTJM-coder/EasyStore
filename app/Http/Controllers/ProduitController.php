<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\MouvementStock;
use Illuminate\Support\Facades\DB;

class ProduitController extends Controller
{
    //
    public function getproduits(){
         $user=Auth::user();
        if($user->role!=="commerce"){
            return response()->json(["Message"=>"unhautorized"],403);
        }
        
        $products=Produit::where('commerce_id',$user->commerce_id)->get();
        return response()->json(["Message"=>"Products found successfully","products"=>$products],200);
    }

    public function getproduit($id){
        $user=Auth::user();
        if($user->role!=="commerce"){
            return response()->json(["Message"=>"unhautorized"],403);
        }
        
        $product=Produit::where('id',$id)->where('commerce_id',$user->commerce_id)->first();
        if(!$product){
            return response()->json(["Message"=>"Product not found"],404);
        }
        return response()->json(["Message"=>"Product found successfully","products"=>$product],200);
    }   

    public function addProduit(Request $req){
        $validateData=$req->validate([
            'name'=>"required",
            "ref"=>"required",
            "purchasing_price"=>"nullable",
            "current_quantity"=>"nullable",
            "description"=>"nullable",
            "fournisseur_id"=>"nullable",
            "seuil"=>"nullable",
            "selling_price"=>"nullable",
            "unit"=>"nullable"
            
        ]);

        $user=Auth::user();
        $product=null;

        DB::transaction(function() use ($validateData,$user,&$product){
        $product=new Produit();
        $product->name=$validateData['name'];
        $product->ref=$validateData['ref'];
        $product->purchasing_price=$validateData['purchasing_price'];
        $product->selling_price=$validateData['selling_price'];
        $product->unit=$validateData['unit'];
        $product->current_quantity=$validateData['initialQte'];
        $product->seuil=$validateData['seuil'];
        $product->fournisseur_id=$validateData['fournisseur_id'];
        $product->commerce_id=$user->commerce_id;
        $product->save();
        if($validateData['current_quantity']>0){
            $movement=new MouvementStock();
            $movement->type="in";
            $movement->motif="ajustement";
            $movement->quantity_change=$validateData['current_quantity'];
            $movement->unit_price=$validateData['purchasing_price']??0;
            $movement->produit_id=$product->id;
            $movement->user_id=$user->id;
            $movement->save();
        }
        });

        return response()->json(['message' => 'Produit créé avec succès', 'product' => $product], 201);
    }

    public function updateProduit(Request $req,$id){
         $validateData=$req->validate([
            'name'=>"required",
            "ref"=>"required",
            "purchasing_price"=>"nullable",
            "unit_price"=>"nullable",
            "current_quantity"=>"nullable",
            "description"=>"nullable",
            "fournisseur_id"=>"nullable",
            "seuil"=>"nullable",
            "fournisseur_id"=>"nullable"
        ]);

        $user=Auth::user();
         

        $product=Produit::where('id',$id)->where("commerce_id",$user->commerce_id)->first();
        if(!$product){
            return response()->json(["Message"=>"Product not found"],404);
        }
       

        $product->name=$validateData['name'];
        $product->ref=$validateData['ref'];
        $product->purchasing_price=$validateData['purchasing_price'];
        $product->unit_price=$validateData['unit_price'];
        $product->current_quantity=$validateData['current_quantity'];
        $product->seuil=$validateData['seuil'];
        $product->fournisseur_id=$validateData['fournisseur_id'];
        $product->commerce_id=$user->commerce_id;
        $product->save();

        return response()->json(["Message"=>"Product updated successfully","Product"=>$product],200);
    }
    
    public function deleteProduit($id){
        $user=Auth::user();

        $product=Produit::where('id',$id)->where('commerce_id',$user->commerce_id)->first();
        if(!$product){
            return response()->json(["Message"=>"Product not found"],404);
        }

        $product->delete();
        return response()->json(["Message"=>"product deleted successfully"],200);
    }
    
}
