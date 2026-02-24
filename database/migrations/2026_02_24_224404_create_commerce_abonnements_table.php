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
       Schema::create('commerce_abonnements', function (Blueprint $table) {
    $table->id();
    $table->timestamps();
    $table->unsignedBigInteger('commerce_id');
    $table->foreign('commerce_id')->references('id')->on('commerces')->onDelete('cascade');
    $table->unsignedBigInteger('abonnement_id');
    $table->foreign('abonnement_id')->references('id')->on('abonnements')->onDelete('cascade');
    $table->enum('status', ['actif', 'expiré', 'annulé'])->default('actif');
    $table->timestamp('starts_at');
    $table->timestamp('ends_at');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commerce_abonnements');
    }
};
