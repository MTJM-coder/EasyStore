<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employe;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EmployeController extends Controller
{
    //
    public function getEmployes()
    {

        $user = Auth::user();
        if ($user->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }

        $employes = User::with('employe')->where('commerce_id', $user->commerce_id)->where('role', 'employe')->get();

        return Inertia::render('GestEmployes', ['employes' => $employes]);
    }


    public function createEmploye(Request $req)
    {


        $boss = Auth::user();

        if ($boss->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }


        $validateData = $req->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'telephone' => 'required|unique:users',

        ]);
        $password = str()->random(8);
        DB::transaction(function () use ($validateData, $boss, $req, $password) {
            $user = new User();
            $user->name = $validateData['name'];
            $user->email = $validateData['email'];
            $user->password = Hash::make($password);
            $user->telephone = $validateData['telephone'];
            $user->role = 'employe';
            $user->commerce_id = $boss->commerce_id;
            $user->save();

            $employe = new Employe();
            $employe->user_id = $user->id;
            $employe->consultation_stock = $req->consultation;
            $employe->entree_stock = $req->entree_stock;
            $employe->sortie_stock = $req->sortie_stock;
            $employe->poste = $req->poste;
            $employe->save();
        });

        
        return redirect()->back()->with("success", "Employé créé avec succès et son mot de passe est : " . $password);
    }
    public function deleteEmploye($id)
    {

        $user = Auth::user();

        if ($user->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }
        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with("error", "Employe introuvable");
        }
        $employe = Employe::where('user_id', $user->id)->first();
        if (!$employe) {
            return redirect()->back()->with("error", "Employe introuvable");
        }

        $employe->delete();
        $user->delete();
        return redirect()->back()->with("success", "Employe supprimé avec succès");
    }

    public function updateEmploye(Request $req, $id)
    {


        $user = Auth::user();
        if ($user->role !== 'commerce') {

            return redirect()->back()->with("error", "Unauthorized");
        }
        $validateData = $req->validate([
            'name' => 'required',
            'email' => 'required',
            'telephone' => 'required',
            'poste' => 'nullable',

        ]);

        $user = User::find($id);
        if (!$user) {
            return Response()->json([404, 'Message' => 'Employe not found']);
        }
        $employe = Employe::where('user_id', $user->id)->first();
        if (!$employe) {
            return redirect()->back()->with("error", "Employe introuvable");
        }

        $user->name = $validateData['name'];
        $user->email = $validateData['email'];
        $user->telephone = $validateData['telephone'];
        $user->save();
        $employe->consultation_stock = $req->consultation;
        $employe->entree_stock = $req->entree_stock;
        $employe->sortie_stock = $req->sortie_stock;
        $employe->poste = $req->poste;
        $employe->save();

        return redirect()->back()->with("success", "Employe mis à jour avec succès");
    }
}
