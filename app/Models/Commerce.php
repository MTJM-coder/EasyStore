<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commerce extends Model
{
    //
    protected $fillable = [
        'name',
        'commercant_id',
        'abonnement_id',
    ];

    public function commercant()
    {
        return $this->belongsTo(User::class, 'commercant_id');
    }
    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }
    public function produits()
    {
        return $this->hasMany(Produit::class); 
    }
    public function fournisseurs()
    {
        return $this->hasMany(Fournisseurs::class); 
    }
    public function audits()
    {
        return $this->hasMany(Audit::class); 
    }

    public function users()
    {
        return $this->hasMany(User::class, 'commerce_id');
    }
}
