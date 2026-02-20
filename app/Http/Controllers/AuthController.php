<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Commerce;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //
    public function createCommerce(String $name, User $commercant, $abonnement_id)
    {
        try {
            $commerce = new Commerce();
            $commerce->name = $name;
            $commerce->commercant_id = $commercant->id;
            $commerce->abonnement_id = $abonnement_id;
            $commerce->save();
            return response()->json([201, 'message' => 'Commerce created successfully']);
        } catch (Exception $e) {
            return response()->json([500, 'message' => $e->getMessage()]);
        };
    }


    public function register(Request $req)
    {
        $validateData = $req->validate([
            'email' => 'unique:users',
            'nom' => 'required',
            'telephone' => 'required|unique:users',
            'password' => 'required|confirmed',
            'nom_commerce' => 'required',
        ]);

        try {
            $user = new User();
            $user->name = $validateData['nom'];
            $user->email = $validateData['email'];
            $user->telephone = $validateData['telephone'];
            $user->role = 'commerce';
            $user->password = Hash::make($validateData['password']);
            $user->actif = true;
            $user->save();
            $this->createCommerce($validateData['nom_commerce'], $user, null);
            return response()->json([201, 'message' => 'User registered successfully']);
        } catch (Exception $e) {
            return response()->json([500, 'message' => $e->getMessage()]);
        };
    }

    // login

    public function login(Request $req)
    {
        $validateData = $req->validate([
            'email' => "required",
            'password' => "required",

        ]);

        $user = User::where('email', $validateData['email'])->first();
        if (!$user || !Hash::check($validateData['password'], $user->password)) {
            return response()->json([401, 'message' => 'Invalid credentials']);
        } else {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([200, 'message' => 'User logged in successfully', 'token' => $token]);
        }
    }
    // logout
    public function logout()
    {
        $user = Auth::user();
        if ($user) {
            foreach ($user->tokens as $token) {
                $token->delete();
            }

            return response()->json([200, 'message' => 'User logged out successfully']);
        }
        return response()->json([401, $user, 'message' => 'Not authenticated']);
    }

    // fontion() getMe pour obtenir les infos d'un de l'utilisateu connecté

    public function getMe(){
        try{
            $user_id=Auth::user()->id;
            $user=User::with('commerce')->find($user_id);
            if($user){
                return response()->json([200, 'message' => 'User retrieved successfully', 'user' => $user]);
            }
        }
        catch(Exception $e){
            return response()->json([500, 'message' => $e->getMessage()]);
        }
    }
}
