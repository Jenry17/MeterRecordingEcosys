<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::create('readings', function (Blueprint $table) {
    //         $table->id();
    //         $table->timestamps();
    //         $table->string('meter_id');
    //         $table->date('reading_date');
    //     });
    // }

    public function up(): void
{
    Schema::create('readings', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('meter_id');
        // Use DATETIME instead of DATE, and default to CURRENT_TIMESTAMP
        $table->dateTime('reading_date')->default(DB::raw('CURRENT_TIMESTAMP'));
    });
}



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('readings');
    }
};
