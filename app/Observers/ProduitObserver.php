<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\Produit;
use Illuminate\Support\Facades\Auth;

class ProduitObserver
{
    /**
     * Handle the Produit "created" event.
     */
    public function created(Produit $produit): void
    {
        //
        $this->log('créé', $produit);
    }

    /**
     * Handle the Produit "updated" event.
     */
    public function updated(Produit $produit): void
    {
        //
        $this->log('modifié', $produit);
    }

    /**
     * Handle the Produit "deleted" event.
     */
    public function deleted(Produit $produit): void
    {
        //
        $this->log('supprimé',$produit->toArray());
    }

    /**
     * Handle the Produit "restored" event.
     */
    public function restored(Produit $produit): void
    {
        //
    }

    /**
     * Handle the Produit "force deleted" event.
     */
    public function forceDeleted(Produit $produit): void
    {
        //
    }

    private function log($action,$produit){
        if(!Auth::check()) return;

        $audit=new Audit();
        $audit->action=$action;
        $audit->user_id=Auth::id();
        $audit->commerce_id=Auth::user()->commerce_id;
        $audit->entite='produit';
        $audit->entite_id=$produit->id;
        $audit->entite_name=$produit->name;
        $audit->ip_address=request()->ip();
        $audit->save();


    }
}
