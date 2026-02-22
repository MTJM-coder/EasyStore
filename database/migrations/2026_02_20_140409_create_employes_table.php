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
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            // definition des permissons
            $table->boolean('consultation_produits')->default(false);
            $table->boolean('ajout_produits')->default(false);
            $table->boolean('modification_produits')->default(false);
            $table->boolean('suppression_produits')->default(false);
            $table->boolean('consultation_fournisseurs')->default(false);
            $table->boolean('ajout_fournisseurs')->default(false);
            $table->boolean('modification_fournisseurs')->default(false);
            $table->boolean('suppression_fournisseurs')->default(false);
            $table->boolean('entree_stock')->default(false);
            $table->boolean('sortie_stock')->default(false);
            $table->boolean('consultation_stock')->default(false);    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};
