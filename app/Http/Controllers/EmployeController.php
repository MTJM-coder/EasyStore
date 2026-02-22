<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employe;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Hash;

class EmployeController extends Controller
{
    //
    public function getEmployes()
    {
        try {
            $user = Auth::user();
        } catch (Exception $e) {
            return Response()->json([401, 'Message' => $e->getMessage()]);
        }
        if ($user->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }
        
        $employes = User::where('commerce_id', $user->commerce_id)->where('role', 'employe')->get();
        
        return Response()->json([200, 'Message' => 'Employes found successfully', 'data' => $employes]);
    }

    public function getEmploye($id)
    {
        try {
            $user = Auth::user();
        } catch (Exception $e) {
            return Response()->json([401, 'Message' => $e->getMessage()]);
        }
        if ($user->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }
        $employe = User::where('id', $id)->where('commerce_id', $user->commerce_id)->where('role', 'employe')->first();
        if ($employe) {
            return Response()->json([200, 'Message' => 'Employe found successfully', 'data' => $employe]);
        } else {
            return Response()->json([404, 'Message' => 'Employe not found']);
        }
    }

    public function createEmploye(Request $req)
    {
        
        try {
            $boss = Auth::user();
            
        } catch (Exception $e) {
            return Response()->json([401, 'Message' => $e->getMessage()]);
        }
        if ($boss->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }
        
        
        $validateData = $req->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
            'telephone' => 'required|unique:users',

        ]);
       
        
    
        $user = new User();
        $user->name = $validateData['name'];
        $user->email = $validateData['email'];
        $user->password = Hash::make($validateData['password']);
        $user->telephone = $validateData['telephone'];
        $user->role = 'employe';
        $user->commerce_id = $boss->commerce_id;
        $user->save();

        $employe = new Employe();
        $employe->user_id = $user->id;
        $employe->consultation_stock = $req->consultation;
        $employe->entree_stock = $req->entree;
        $employe->sortie_stock = $req->sortie;
        $employe->save();
        
        return Response()->json([201, 'Message' => 'Employe created successfully', 'data' => $employe]);
    }
    public function deleteEmploye($id)
    {
        try {
            $user = Auth::user();
        } catch (Exception $e) {
            return Response()->json([401, 'Message' => $e->getMessage()]);
        }
        if ($user->role !== 'commerce') {
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }
        $user = User::find($id);
        if (!$user) {
            return Response()->json([404, 'Message' => 'Employe not found']);
        }
        $employe = Employe::where('user_id', $user->id)->first();
        if (!$employe) {
            return Response()->json([404, 'Message' => 'Employe not found']);
        }

        $employe->delete();
        $user->delete();
        return Response()->json([200, 'Message' => 'Employe deleted successfully']);
    }

    public function updateEmploye(Request $req, $id)
    {
       
        try {
            $user = Auth::user();
           
        } catch (Exception $e) {
             
            return Response()->json([401, 'Message' => $e->getMessage()]);
        }
       
        if ($user->role !== 'commerce') {
            
            return Response()->json([403, 'Message' => 'Unauthorized']);
        }
        
        
        $validateData = $req->validate([
            'name' => 'required',
            'email' => 'required',
            'telephone' => 'required'
        ]);
        
        $user = User::find($id);
        if (!$user) {
            return Response()->json([404, 'Message' => 'Employe not found']);
        }
        $employe = Employe::where('user_id', $user->id)->first();
        if (!$employe) {
            return Response()->json([404, 'Message' => 'Employe not found']);
        }
        
        $user->name = $validateData['name'];
        $user->email = $validateData['email'];
        $user->telephone = $validateData['telephone'];
        $user->save();
        $employe->consultation_stock = $req->consultation;
        $employe->entree_stock = $req->entree;
        $employe->sortie_stock = $req->sortie;
        $employe->save();
        return Response()->json([200, 'Message' => 'Employe updated successfully', 'data' => $employe]);
    }
}
