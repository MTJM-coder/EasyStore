<?php

namespace App\Providers;

use App\Models\Fournisseurs;
use App\Models\Produit;
use App\Observers\FournisseurObserver;
use App\Observers\ProduitObserver;
use App\Observers\UserObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Produit::observe(ProduitObserver::class);
        Fournisseurs::observe(FournisseurObserver::class);
        User::observe(UserObserver::class);
    }
}
