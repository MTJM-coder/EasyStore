<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    //
    protected $fillable = [
        'action',
        'user_id',
        'entite',
        'entite_id',
        'date_action',
        'ip_address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commerce(){
        return $this->belongsTo(Commerce::class);
    }
}
