<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Commerce;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\Abonnement;
use App\Models\commerce_abonnement;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    //
    public function register(Request $req)
    {



        $validateData = $req->validate([
            'email' => 'unique:users',
            'name' => 'required',
            'telephone' => 'required|unique:users',
            'password' => 'required',
            'nom_commerce' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $user = new User();
            $user->name = $req->name;
            $user->email = $req->email;
            $user->telephone = $req->telephone;
            $user->role = 'commerce';
            $user->password = Hash::make($req->password);
            $user->actif = true;
            $user->save();

            $commerce = new Commerce();
            $commerce->name = $req->nom_commerce;
            $commerce->commercant_id = $user->id;
            $commerce->save();

            $user->commerce_id = $commerce->id;
            $user->save();

            $planGratuit = Abonnement::where('price', 0)->first();
            if ($planGratuit) {
                Commerce_abonnement::create([
                    'commerce_id' => $commerce->id, 
                    'abonnement_id' => $planGratuit->id, 
                    'status' => 'actif', 
                    'starts_at' => now(), 
                    'ends_at' => now()->addDays(14),]);
            }
            // Logger l'inscription 
            Audit::create([
                'user_id' => $user->id,
                'commerce_id' => $commerce->id,
                'action' => 'inscription',
                'entite' => 'utilisate ur',
                'entite_id' => null,
                'ip_address' => $req->ip(),
            ]);
        dd(9);
            // Connecter automatiquement après inscription 
            Auth::login($user);
            $req->session()->regenerate();

            return Inertia::location(route('commerce.dashboard'));;
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error',$e->getMessage());
        }
    }

    // login

    public function login(Request $req)
    {

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

        // Logger la connexion
        Audit::create([
            'user_id'    => Auth::id(),
            'commerce_id' => Auth::user()->commerce_id,
            'action'     => 'connexion',
            'entite'     => 'session',
            'entite_id'  => null,

            // 'nouvelles_valeurs' => json_encode([
            //     'name' => Auth::user()->name,
            //     'role' => Auth::user()->role,
            // ]),
            'ip_address' => $req->ip(),
        ]);

        if ($user->role === "commerce") {

            return Inertia::location(route('commerce.dashboard'));
        } else if ($user->role === "employe") {
            return redirect()->route('employe.dashboard');
        } else if ($user->role === "admin") {
            return Inertia::location(route('admin.dashboard'));
        }
    }

    // logout
    public function logout(Request $req)
    {
        // Logger avant de déconnecter
        Audit::create([
            'user_id'    => Auth::id(),
            'commerce_id' => Auth::user()->commerce_id,
            'action'     => 'déconnexion',
            'entite'     => 'session',
            'entite_id' => null,
            'ip_address' => $req->ip(),
            // 'nouvelles_valeurs' => json_encode([
            //     'name' => Auth::user()->name,
            //     'role' => Auth::user()->role,
            // ]),
        ]);
        Auth::logout();
        session()->invalidate();
        session()->regenerateToken();
        return redirect('/');
    }

    // fontion() getMe pour obtenir les infos d'un de l'utilisateu connecté

    public function getMe()
    {
        $user_id = Auth::user()->id;
        $user = User::with('commerce')->find($user_id);
        if (!$user) {
            return response()->json(["Message" => "Utilisateur introuvable"], 401);
        }

        return Inertia::render('Profile', [
            'user' => $user
        ]);
    }

    public function updatedPassword(Request $req)
    {

        $validateData = $req->validate([
            'passwordActuel' => 'required',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required'
        ]);


        $user = Auth::user()->id;
        $user = User::find($user);
        if (!Hash::check($validateData['passwordActuel'], $user->password)) {
            return response()->json([400, 'Message' => 'Current password is incorrect']);
        } else {
            $user->password = Hash::make($validateData['password']);
            $user->save();
            return redirect()->back()->with('success', 'Mot de passe mis à jour avec succès');
        }

        return redirect()->back()->with('error', "Une erreur s'est produite lors de la mise à jour du mot de passe");
    }

    public function updateMe(Request $req)
    {

        $user_id = Auth::user()->id;

        $validateData = $req->validate([
            'email' => 'required',
            'name' => 'required',
            'telephone' => 'required',

        ]);


        $user = User::find($user_id);
        try {
            $user->name = $validateData['name'];
            $user->email = $validateData['email'];
            $user->telephone = $validateData['telephone'];
            $user->save();
            return redirect()->back()->with('success', "Informations mises a jour");
        } catch (Exception $e) {
            return redirect()->back()->with('error', "Une erreur s'est produite lors de la mise a jour des informations");
        }
    }
}
