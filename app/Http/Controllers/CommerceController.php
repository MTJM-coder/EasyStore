<?php

namespace App\Http\Controllers;

use App\Models\Commerce;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Support\ValidatedData;

class CommerceController extends Controller
{
    //
    public function getCommerces(){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,'Message'=>$e->getMessage()]);
        }
        if($user->role !== "admin"){
            return response()->json([403,'Unhautorized']);
        }
        $commerces=Commerce::all();
        return response()->json([200,"Message"=>"list of commerces found successfully","commerces"=>$commerces]);
    }

    public function getCommerce($id){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,'Message'=>$e->getMessage()]);
        }
        if($user->role !== "admin"){
            return response()->json([403,'Unhautorized']);
        }

        $commerce=Commerce::find($id);
        if(!$commerce){
            return response()->json([404,"Message"=>"commerce not found"]);
        }
        else{
           
            return response()->json([200,"Message"=>"commerce found successfully","commerce"=>$commerce]);
        }
    }

    public function updateCommerce(Request $req,$id){
        $validateData=$req->validate([
            'name'=>'required'
        ]);
         try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,'Message'=>$e->getMessage()]);
        }
        if($user->role !== "commerce" ){
            return response()->json([403,'Unhautorized']);
        }

        $commerce=Commerce::where('id',$id)->where('commercant_id',$user->id)->first();
        if(!$commerce){
            return response()->json([404,"Message"=>"commerce not found"]);
        }
        else{
            
            $commerce->name=$validateData['name'];
            $commerce->save();
            return response()->json([200,"Message"=>"commerce updated successfully"]);

        }

    }

    public function deleteCommerce($id){
        try{
            $user=Auth::user();
        }
        catch(Exception $e){
            return response()->json([401,'Message'=>$e->getMessage()]);
        }
        if($user->role !== "admin"){
            return response()->json([403,'Unhautorized']);
        }

        $commerce=Commerce::find($id);
        if(!$commerce){
            return response()->json([404,"Message"=>"commerce not found"]);
        }
        else{
            $commerce->delete();
            return response()->json([200,"Message"=>"commerce deleted successfully"]);
        }

    }
}
