<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AbonnementController;
use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommerceController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\UserController;
use Illuminate\Container\Attributes\Auth;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\HistoriqueController;
use App\Http\Controllers\MouvementStockController;
use App\Http\Controllers\ProduitController;
use App\Models\Commerce;
use App\Models\Produit;
use App\Http\Controllers\RapportController;

Route::get('/', fn() => Inertia::render('Welcome'))->name('login');

Route::post('/auth/register',[AuthController::class,'register']);
Route::post('/auth/login',[AuthController::class,'login']);

Route::middleware('auth')->group(function(){

Route::post('/auth/logout',[AuthController::class, 'logout']);
Route::get('/auth/me',[AuthController::class,'getMe']);
Route::put('/auth/me',[AuthController::class, 'updateMe']);
Route::put('/auth/password',[AuthController::class,'updatedPassword']);


// Endpoints employes

Route::get('/employes',[EmployeController::class,'getEmployes']);
Route::get('/employes/{id}',[EmployeController::class,'getEmploye']);
Route::post('/employes',[EmployeController::class,'createEmploye']);
Route::put('/employes/{id}',[EmployeController::class,'updateEmploye']);
Route::delete('/employes/{id}',[EmployeController::class,'deleteEmploye']);
Route::get('/employes/commerce/{commerce_id}',[EmployeController::class,'getEmployesByCommerce']);

// Endpoints users

Route::get('/users',[UserController::class,'getUsers']);
Route::get('/users/{id}',[UserController::class,'getUser']);
Route::post('/users',[UserController::class,'createUser']);
Route::put('/users/{id}',[UserController::class,'updateUser']);
Route::delete('/users/{id}',[UserController::class,'deleteUser']);

//Endpoints commerces

Route::get('/admin/commerces',[CommerceController::class,'getCommerces']);
Route::get('/commerces/{id}',[CommerceController::class,'getCommerce']);
Route::put('/commerces/{id}',[CommerceController::class,'updateCommerce']);
Route::put('/commerces/{id}/abonnement',[CommerceController::class,'abonnement']);

// Endpoints Produits

Route::get('/products',[ProduitController::class,'getproduits']);
Route::get('/products/{id}',[ProduitController::class,'getProduit']);
Route::post('/products',[ProduitController::class,'addProduit']);
Route::put('/products/{id}',[ProduitController::class,'updateProduit']);
Route::delete('/products/{id}',[ProduitController::class,'deleteProduit']);

// Endpoints Stock & mouvements de stock

Route::get('/mouvements',[MouvementStockController::class,"getMouvements"]);
Route::get('/mouvements/entrees',[MouvementStockController::class, 'getEntrees']);
Route::get('/mouvements/sorties',[MouvementStockController::class, 'getSorties']);
Route::get('/mouvements/{id}',[MouvementStockController::class,"getMouvement"]);
Route::post('/mouvements/entree',[MouvementStockController::class,"addEntree"]);
Route::post('/mouvements/sortie',[MouvementStockController::class,"addSortie"]);
Route::get('/stocks',[MouvementStockController::class, 'getStock']);
Route::put('/mouvements',[MouvementStockController::class,"updateMouvement"]);

// Endpoint Fournisseurs

Route::get('/suppliers',[FournisseurController::class,"getSuppliers"]);
Route::get('/suppliers/{id}',[FournisseurController::class,"getSupplier"]);
Route::post("/suppliers",[FournisseurController::class,"addSupplier"]);
Route::put("/suppliers/{id}",[FournisseurController::class,"updateSupplier"]);
Route::delete("/suppliers/{id}",[FournisseurController::class,"deleteSupplier"]);

// Endpoints Rapport

Route::get('/rapports',[RapportController::class,'index']);
Route::get('/rapports/download',[RapportController::class,'createRapport']);
Route::get('/historique',[HistoriqueController::class,'getHistorique']);
// Edpoint Abonnement

Route::get('/admin/abonnements',[AbonnementController::class,"getAbonnements"]);
Route::get('/commerce/abonnements',[AbonnementController::class,"getAbonnementsCommerce"]);
Route::get('/abonnements/{id}',[AbonnementController::class,"getAbonnement"]);
Route::post('/abonnements',[AbonnementController::class,"addAbonnement"]);
Route::put('/abonnements/{id}',[AbonnementController::class,"updateAbonnement"]);
Route::delete('/abonnements/{id}',[AbonnementController::class,"deleteAbonnement"]);

Route::get('/commerce/dashboard',[DashBoardController::class,'getDashboard'])->name('commerce.dashboard');
Route::get('/employe/dashboard',[DashBoardController::class,'getDashboardEmploye'])->name('employe.dashboard');
Route::get('/admin/dashboard',[DashBoardController::class,'getDashboardAdmin'])->name('admin.dashboard');

});


