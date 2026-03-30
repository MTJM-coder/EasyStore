<?php

namespace App\Http\Controllers;

use App\Models\Commerce;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CommerceController extends Controller
{
    //
    public function getCommerces(){
       $user=Auth::user();
        if($user->role !== "admin"){
            return response()->json(["Message"=>"Unhautorized"],403);
        }
        $commerces=Commerce::with(['commerce_abonnement.abonnement','commercant'])->get();
        return Inertia::render('GestCommerce',["commerces"=>$commerces]);
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
            return redirect()->back()->with('error', 'Unauthorized');
        }

        $commerce=Commerce::find($id);
        if(!$commerce){
            return redirect()->back()->with('error', 'Commerce not found.');
        }
        else{
        
            $commerce->delete();
            return Redirect()->back()->with('success', 'Commerce deleted successfully.');
        }

    }
}
