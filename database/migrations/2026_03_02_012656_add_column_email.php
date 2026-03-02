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
        Schema::table('fournisseurs', function (Blueprint $table) {
            //
                $table->string('email')->nullable()->after('telephone');
                $table->string('ville')->nullable()->after('email');
                $table->string('pays')->nullable()->after('ville');
                $table->string('adresse')->nullable()->after('pays');
               
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fournisseurs', function (Blueprint $table) {
            //
        });
    }
};
