<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fournisseurs extends Model
{
    //
    protected $fillable = [
        'name',
        'telephone',
        'commerce_id',
    ];
    public function commerce()
    {
        return $this->belongsTo(Commerce::class);
    }
}
