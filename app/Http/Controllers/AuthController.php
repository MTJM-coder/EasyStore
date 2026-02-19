<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Commerce;

class AuthController extends Controller
{
    //
    public function createCommerce(String $name, User $commercant, $abonnement_id){
        $commerce=new Commerce();
        $commerce->name=$name;
        $commerce->commercant_id=$commercant->id;
        $commerce->abonnement_id=$abonnement_id;
        $commerce->save();
    }

    public function register(Request $req){
        $validateData=$req->validate([
            'email'=>'unique:users',
            'nom'=>'required',
            'telephone'=>'required|unique:users',
            'password'=>'required|confirmed',
        ]);

        try{
             $user=new User();
            $user->name=$validateData['nom'];
            $user->email=$validateData['email'];
            $user->telephone=$validateData['telephone'];
            $user->role='commercant';
            $user->password=Hash::make($validateData['password']);
            $user->save();
            return response()->json([201, 'message' => 'User registered successfully']);
        }
        catch(Exception $e){
            return response()->json([500, 'message' => $e->getMessage()]);
    };
}
}
