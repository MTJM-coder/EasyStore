<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    //
    public function getNotif(){
        
        return Inertia::render('NotificationsAdmin',[]);
    }
}
