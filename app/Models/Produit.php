<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'price',
        'commerce_id',
    ];
    public function commerce()
    {
        return $this->belongsTo(Commerce::class);
    }

    public function mouvementStocks()
    {
        return $this->hasMany(MouvementStock::class);
    }

   
}
