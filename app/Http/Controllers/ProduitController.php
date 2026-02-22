<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Nette\Utils\Json;

class ProduitController extends Controller
{
    //
    public function getproduits(){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,"Message"=>$e->getMessage()]);

        }
        if($user->role!=="commerce"){
            return response()->json([403,"Message"=>"unhautorized"]);
        }
        
        $products=Produit::where('commerce_id',$user->commerce_id)->get();
        return response()->json([200,"Message"=>"Products found successfully","products"=>$products]);
    }

    public function getproduit($id){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,"Message"=>$e->getMessage()]);

        }
        if($user->role!=="commerce"){
            return response()->json([403,"Message"=>"unhautorized"]);
        }
        
        $product=Produit::where('id',$id)->where('commerce_id',$user->commerce_id)->first();
        if(!$product){
            return response()->json([401,"Message"=>"Product not found"]);
        }
        return response()->json([200,"Message"=>"Product found successfully","products"=>$product]);
    }   

    public function addProduit(Request $req){
        $validateData=$req->validate([
            'name'=>"required",
            "ref"=>"required",
            "price"=>"nullable",
            "initialQte"=>"nullable",
            "description"=>"nullable",
            "fournisseur_id"=>"nullable",
            "seuil"=>"nullable"
        ]);

        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,"Message"=>$e->getMessage()]);
        }

        $product=new Produit();
        $product->name=$validateData['name'];
        $product->ref=$validateData['ref'];
        $product->price=$validateData['price'];
        $product->initialQuantity=$validateData['initialQte'];
        $product->seuil=$validateData['seuil'];
        $product->fournisseur_id=$validateData['fournisseur_id'];
        $product->commerce_id=$user->commerce_id;
        $product->save();

        return response()->json([200,"Message"=>"Product created successfully","Product"=>$product]);
    }

    public function updateProduit(Request $req,$id){
         $validateData=$req->validate([
            'name'=>"required",
            "ref"=>"required",
            "price"=>"nullable",
            "initialQte"=>"nullable",
            "description"=>"nullable",
            "fournisseur_id"=>"nullable",
            "seuil"=>"nullable",
            "fournisseur_id"=>"nullable"
        ]);

        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,"Message"=>$e->getMessage()]);
        }
         

        $product=Produit::where('id',$id)->where("commerce_id",$user->commerce_id)->first();
        if(!$product){
            return response()->json([401,"Message"=>"Product not found"]);
        }
       

        $product->name=$validateData['name'];
        $product->ref=$validateData['ref'];
        $product->price=$validateData['price'];
        $product->initialQuantity=$validateData['initialQte'];
        $product->seuil=$validateData['seuil'];
        $product->fournisseur_id=$validateData['fournisseur_id'];
        $product->commerce_id=$user->commerce_id;
        $product->save();

        return response()->json([200,"Message"=>"Product updated successfully","Product"=>$product]);
    }
    
    public function deleteProduit($id){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,"Message"=>$e->getMessage()]);
        }

        $product=Produit::where('id',$id)->where('commerce_id',$user->commerce_id)->first();
        if(!$product){
            return response()->json([401,"Message"=>"Product not found"]);
        }

        $product->delete();
        return response()->json([200,"Message"=>"product deleted successfully"]);
    }
    
}
