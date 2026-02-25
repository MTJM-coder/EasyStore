<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Commerce;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    //
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

            $commerce = new Commerce();
            $commerce->name = $validateData['nom_commerce'];
            $commerce->commercant_id = $user->id;
            $commerce->save();

            $user->commerce_id = $commerce->id;
            $user->save();


            return response()->json([201, 'message' => 'User registered successfully']);
        } catch (Exception $e) {
            return response()->json([500, 'message' => $e->getMessage()]);
        };
    }

    // login

    public function login(Request $req)
    {
        // dd(0);
        $validateData = $req->validate([
            'email' => "required|email",
            'password' => "required",
        ]);

        $user = User::where('email', $validateData['email'])->first();

        if (!$user || !Hash::check($validateData['password'], $user->password)) {
            return redirect()->back()->withErrors(['email' => 'Identifiants invalides']);
        }
        Auth::login($user);

        // Regénérer la session pour la sécurité
        $req->session()->regenerate();
        
        if($user->role==="commerce"){
            
            return Inertia::location(route('commerce.dashboard'));
            
        }
        else if($user->role==="employe"){
            return redirect()->route('employe.dashboard');
        }
        else if($user->role==="admin"){
            return redirect()->route('admin.dashboard');
        }
    }

    // logout
    public function logout()
    {
        Auth::logout();
        session()->invalidate();
        session()->regenerateToken(); 
        return response()->json([
            'status' => 200,
            'message' => 'Logout successful'
        ]);
    }

    // fontion() getMe pour obtenir les infos d'un de l'utilisateu connecté

    public function getMe()
    {
        try {
            $user_id = Auth::user()->id;
            $user = User::with('commerce')->find($user_id);
            if ($user) {
                return response()->json([200, 'message' => 'User retrieved successfully', 'user' => $user]);
            }
        } catch (Exception $e) {
            return response()->json([500, 'message' => $e->getMessage()]);
        }
    }

    public function updatedPassword(Request $req)
    {
        $validateData = $req->validate([
            'passwordActuel' => 'required',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required'
        ]);
        try {
            $user = Auth::user()->id;
            $user = User::find($user);
            if (!Hash::check($validateData['passwordActuel'], $user->password)) {
                return response()->json([400, 'Message' => 'Current password is incorrect']);
            } else {
                $user->password = Hash::make($validateData['password']);
                $user->save();
                return response()->json([200, 'Message' => 'Password updated successfully']);
            }
        } catch (Exception $e) {
            return response()->json([500, 'Message' => $e->getMessage()]);
        }
    }
}
