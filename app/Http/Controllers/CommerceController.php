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
       $user=Auth::user();
        if($user->role !== "admin"){
            return response()->json(["Message"=>"Unhautorized"],403);
        }
        $commerces=Commerce::all();
        return response()->json(["Message"=>"list of commerces found successfully","commerces"=>$commerces],200);
    }

    public function getCommerce($id){
       $user=Auth::user();
        if($user->role !== "admin"){
            return response()->json(["Message"=>"Unhautorized"],403);
        }

        $commerce=Commerce::find($id);
        if(!$commerce){
            return response()->json(["Message"=>"commerce not found"],404);
        }
        else{
           
            return response()->json(["Message"=>"commerce found successfully","commerce"=>$commerce],200);
        }
    }

    public function updateCommerce(Request $req,$id){
        $validateData=$req->validate([
            'name'=>'required'
        ]);
        $user=Auth::user();
        if($user->role !== "commerce" ){
            return response()->json(["Message"=>"Unhautorized"],403);
        }

        $commerce=Commerce::where('id',$id)->where('commercant_id',$user->id)->first();
        if(!$commerce){
            return response()->json(["Message"=>"commerce not found"],404);
        }
        else{
            
            $commerce->name=$validateData['name'];
            $commerce->save();
            return response()->json(["Message"=>"commerce updated successfully"],200);

        }

    }

    public function deleteCommerce($id){
       $user=Auth::user();
        if($user->role !== "admin"){
            return response()->json(["Message"=>"Unhautorized"],403);
        }

        $commerce=Commerce::find($id);
        if(!$commerce){
            return response()->json(["Message"=>"commerce not found"],404);
        }
        else{
            $commerce->delete();
            return response()->json(["Message"=>"commerce deleted successfully"],200);
        }

    }
}
