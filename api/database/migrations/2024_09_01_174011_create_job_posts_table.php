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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->string('publisher')->nullable();
            $table->integer('profession')->nullable();
            $table->integer('area')->nullable();
            $table->string('location')->nullable();
            $table->longText('description')->nullable();
            $table->string('email')->nullable();
            $table->string('wa')->nullable();
            $table->string('imagepost')->nullable();
            $table->text('externalLink')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};
