<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class commerce_abonnement extends Model
{
    //
    protected $table = 'commerce_abonnements';
    protected $fillable = [
        'commerce_id',
        'abonnement_id',
        'starts_at',
        'ends_at',
        'status'
    ];

    public function commerce(){

    }
}
