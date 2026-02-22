<?php

namespace App\Http\Controllers;

use App\Models\Fournisseurs;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FournisseurController extends Controller
{
    //
    public function getSuppliers(){
        try{
           $user=Auth::user();
        }catch(Exception $e){
            return Response()->json([401,"Message"=>$e->getMessage()]);
        }
        
        if($user->role !=="commerce"){
            return Response()->json([403,"Message"=>"unhautorized"]);
        }
       
        $suppliers=Fournisseurs::where('commerce_id',$user->commerce_id)->get();
        return Response()->json([200,"suppliers"=>$suppliers]);

    }

    public function getSupplier($id){

         try{
           $user=Auth::user();
        }catch(Exception $e){
            return Response()->json([401,"Message"=>$e->getMessage()]);
        }
        if($user->role !=="commerce"){
            return Response()->json([403,"Message"=>"unhautorized"]);
        }
        $supplier=Fournisseurs::where('id',$id)->where('commerce_id',$user->commerce_id)->first();
       if(!$supplier){
            return response()->json([401,"Message"=>"Supplier not found"]);
        }
        return Response()->json([200,"supplier"=>$supplier]);

    }

    public function addSupplier(Request $req){
        $validatedata=$req->validate([
            "name"=>"required",
            "telephone"=>"required"

        ]);
        try{
            $user=Auth::user();
        }catch(Exception $e){
            return Response()->json([401,"Message"=>$e->getMessage()]);
        }
        if($user->role !=="commerce"){
            return Response()->json([403,"Message"=>"unhautorized"]);
        }

        $fournisseur=new Fournisseurs();
        $fournisseur->name=$validatedata['name'];
        $fournisseur->telephone=$validatedata['telephone'];
        $fournisseur->commerce_id=$user->commerce_id;
        $fournisseur->save();

        return response()->json([200,"Message"=>"Supplier created successfully","supplier"=>$fournisseur]);

    }

    public function updateSupplier(Request $req , $id){
        $validatedata=$req->validate([
            "name"=>"required",
            "telephone"=>"required"

        ]);

         try{
            $user=Auth::user();
        }catch(Exception $e){
            return Response()->json([401,"Message"=>$e->getMessage()]);
        }
        if($user->role !=="commerce"){
            return Response()->json([403,"Message"=>"unhautorized"]);
        }

        $fournisseur=Fournisseurs::where('id',$id)->where("commerce_id",$user->commerce_id)->first();
        if(!$fournisseur){
            return response()->json([401,"Message"=>"Supplier not found"]);
        }
        $fournisseur->name=$validatedata['name'];
        $fournisseur->telephone=$validatedata['telephone'];
        $fournisseur->save();

        return response()->json([200,"Message"=>"supplier updated successfully","supllier"=>$fournisseur]);
    }

    public function deleteSupplier($id){
         try{
            $user=Auth::user();
        }catch(Exception $e){
            return Response()->json([401,"Message"=>$e->getMessage()]);
        }
        if($user->role !=="commerce"){
            return Response()->json([403,"Message"=>"unhautorized"]);
        }

        $fournisseur=Fournisseurs::where('id',$id)->where("commerce_id",$user->commerce_id)->first();
        if(!$fournisseur){
            return response()->json([401,"Message"=>"Supplier not found"]);
        }
        $fournisseur->delete();

        return response()->json([200,"Message"=>"Supplier deleted successfully"]);
    }
}
