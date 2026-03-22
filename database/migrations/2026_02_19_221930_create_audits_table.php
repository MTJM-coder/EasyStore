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
        Schema::create('audits', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('action'); //creer , modifier,supprimer,connexion
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('commerce_id')->nullable();
            $table->foreign('commerce_id')->references('id')->on('commerces')->onDelete('cascade');
            $table->string('entite'); //produit,fournisseur,employe,session
            $table->unsignedBigInteger('entite_id')->nullable();
            
            $table->foreign('entite_id')->references('id')->on('produits')->onDelete('cascade');
            $table->datetime('date_action')->nullable();
            $table->string('ip_address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audits');
    }
};
