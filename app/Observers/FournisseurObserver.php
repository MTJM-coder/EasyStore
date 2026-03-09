<?php

namespace App\Observers;
use Illuminate\Support\Facades\Auth;

use App\Models\Fournisseurs;
use App\Models\Audit;

class FournisseurObserver
{
    /**
     * Handle the Fournisseurs "created" event.
     */
    public function created(Fournisseurs $fournisseurs): void
    {
        //
        $this->log('créé',$fournisseurs);
    }

    /**
     * Handle the Fournisseurs "updated" event.
     */
    public function updated(Fournisseurs $fournisseurs): void
    {
        //
        $this->log('modifié',$fournisseurs);
    }

    /**
     * Handle the Fournisseurs "deleted" event.
     */
    public function deleted(Fournisseurs $fournisseurs): void
    {
        //
        $this->log('supprimé',$fournisseurs);
    }

    /**
     * Handle the Fournisseurs "restored" event.
     */
    public function restored(Fournisseurs $fournisseurs): void
    {
        //
    }

    /**
     * Handle the Fournisseurs "force deleted" event.
     */
    public function forceDeleted(Fournisseurs $fournisseurs): void
    {
        //
    }
     private function log($action,$fournisseurs){
        if(!Auth::check()) return;

        $audit=new Audit();
        $audit->action=$action;
        $audit->user_id=Auth::id();
        $audit->commerce_id=Auth::user()->commerce_id;
        $audit->entite='Fournisseur';
        $audit->entite_id=$fournisseurs->id;
        $audit->ip_address=request()->ip();
        $audit->save();

    }
}
