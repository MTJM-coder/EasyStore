<?php

namespace App\Observers;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Audit;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
        $this->log('créé',$user);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
        $this->log('modifié',$user);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
        $this->log('supprimé',$user);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
    
    private function log($action,$user){
        if(!Auth::check()) return;

        $audit=new Audit();
        $audit->action=$action;
        $audit->user_id=Auth::id();
        $audit->commerce_id=Auth::user()->commerce_id;
        $audit->entite='User';
        $audit->entite_id=$user->id;
        $audit->ip_address=request()->ip();
        $audit->save();

    }
}
