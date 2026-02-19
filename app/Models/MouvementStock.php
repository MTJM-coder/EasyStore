<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MouvementStock extends Model
{
    //
    protected $fillable = [
        'produit_id',
        'quantity',
    ];
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseurs::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
