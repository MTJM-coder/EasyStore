<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
    ]);   
});

Route::get('/header',function(){
        return Inertia::render('DashboardEmploye',[]);
    });


require __DIR__.'/auth.php';
