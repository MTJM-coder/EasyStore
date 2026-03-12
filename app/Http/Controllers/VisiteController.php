<?php

namespace App\Http\Controllers;

use App\Models\Visite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisiteController extends Controller
{
    //
    public function index(Request $request)
    {
        $ip = Visite::where('ip_address', $request->ip())->first();
        if (!$ip) {

            $visite = new Visite();
            $visite->user_id = null;
            $visite->ip_address = $request->ip();
            $visite->url = '/';
            $visite->user_agent = $request->header('User-Agent');
            $visite->save();
        }

        return Inertia::render('Welcome');
    }
}
