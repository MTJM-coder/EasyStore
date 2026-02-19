<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    //
    protected $fillable = [
        'name',
        'price',
        'description',
        'duration',
    ];

    public function commerces()
    {
        return $this->hasMany(Commerce::class);
    }

}
