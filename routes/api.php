<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/auth/login',[AuthController::class,'']);
Route::post('/auth/logout',[AuthController::class, '']);
Route::post('/auth/register',[AuthController::class,'register']);
Route::get('/auth/me',[AuthController::class,'']);
Route::put('/auth/password',[AuthController::class,'']);
