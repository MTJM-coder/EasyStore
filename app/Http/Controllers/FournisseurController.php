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
        $user=Auth::user();
        
        if($user->role !=="commerce"){
            return Response()->json(["Message"=>"unhautorized"],403);
        }
       
        $suppliers=Fournisseurs::where('commerce_id',$user->commerce_id)->get();
        return Response()->json(["suppliers"=>$suppliers],200);

    }

    public function getSupplier($id){

       $user=Auth::user();
        if($user->role !=="commerce"){
            return Response()->json(["Message"=>"unhautorized"],403);
        }
        $supplier=Fournisseurs::where('id',$id)->where('commerce_id',$user->commerce_id)->first();
       if(!$supplier){
            return response()->json(["Message"=>"Supplier not found"],404);
        }
        return Response()->json(["supplier"=>$supplier],200);

    }

    public function addSupplier(Request $req){
        $validatedata=$req->validate([
            "name"=>"required",
            "telephone"=>"required"

        ]);
        $user=Auth::user();
        if($user->role !=="commerce"){
            return Response()->json(["Message"=>"unhautorized"],403);
        }

        $fournisseur=new Fournisseurs();
        $fournisseur->name=$validatedata['name'];
        $fournisseur->telephone=$validatedata['telephone'];
        $fournisseur->commerce_id=$user->commerce_id;
        $fournisseur->save();

        return response()->json(["Message"=>"Supplier created successfully","supplier"=>$fournisseur],200);

    }

    public function updateSupplier(Request $req , $id){
        $validatedata=$req->validate([
            "name"=>"required",
            "telephone"=>"required"

        ]);

          $user=Auth::user();
        if($user->role !=="commerce"){
            return Response()->json(["Message"=>"unhautorized"],403);
        }

        $fournisseur=Fournisseurs::where('id',$id)->where("commerce_id",$user->commerce_id)->first();
        if(!$fournisseur){
            return response()->json(["Message"=>"Supplier not found"],404);
        }
        $fournisseur->name=$validatedata['name'];
        $fournisseur->telephone=$validatedata['telephone'];
        $fournisseur->save();

        return response()->json(["Message"=>"supplier updated successfully","supplier"=>$fournisseur],200);
    }

    public function deleteSupplier($id){
        $user=Auth::user();
        if($user->role !=="commerce"){
            return Response()->json(["Message"=>"unhautorized"],403);
        }

        $fournisseur=Fournisseurs::where('id',$id)->where("commerce_id",$user->commerce_id)->first();
        if(!$fournisseur){
            return response()->json(["Message"=>"Supplier not found"],404);
        }
        $fournisseur->delete();

        return response()->json(["Message"=>"Supplier deleted successfully"],200);
    }
}
