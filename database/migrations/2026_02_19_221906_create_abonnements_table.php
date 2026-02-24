<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('abonnements', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name'); // Gratuit, Basic, Pro
            $table->decimal('price', 8, 2);
            $table->text('description')->nullable();
            $table->integer('duration'); // durée en jours 
            $table->integer('max_produits')->default(50); // limite de produits
            $table->integer('max_users')->default(1); // limite d'utilisateurs
            $table->boolean('export_pdf')->default(false);
            $table->boolean('rapports_avances')->default(false);
            $table->boolean('multi_boutique')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abonnements');
    }
};
