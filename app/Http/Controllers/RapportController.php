<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class RapportController extends Controller
{
    //
    public function index()
    {
        $user = Auth::User();
        if ($user->role !== 'commerce') {
            return response()->json(['Message' => "Unhautorized"], 401);
        }
        return Inertia::render('Rapport');
    }


    public function createRapport(Request $req)
    {
        // dd($req->all());
    }
}
