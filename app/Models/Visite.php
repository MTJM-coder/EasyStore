<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visite extends Model
{
    //
     protected $fillable = [
        'user_id',
        'ip_address',
        'url',
        'user_agent',
    ];
}
