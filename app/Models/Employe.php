<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    //
    protected $fillable = [
        'user_id',
        'poste'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
