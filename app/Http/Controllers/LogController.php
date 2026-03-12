<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    //
    public function index(){
        $user=Auth::user();
        if($user->role!='admin'){
            return redirect()->back()->with('error','acces non autorisé');
        }
        $historique=Audit::with('user','commerce')->get();
        
        return Inertia::render('Logs',[
            'logs'=>$historique

        ]);
    }
}
