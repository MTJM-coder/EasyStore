<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Abonnement;
use App\Models\User;

class AbonnementSeeder extends Seeder
{
    public function run(): void
    {
        Abonnement::create([
            'name' => 'Gratuit',
            'price' => 0,
            'description' => 'Abonnement gratuit pour démarrer',
            'duration' => 30,
        ]);

        User::create([
            'email'=>'jaudelmerlando@gmail.com',
            'name'=>'Jaudel',
            'telephone'=>650090589,
            'role'=>'admin',
            'password'=>'adminM@t1jame'
        ]);
    }
}