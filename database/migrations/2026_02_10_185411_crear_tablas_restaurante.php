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
        // Tabla para los platos del menú
        Schema::create('platos', function (Blueprint $table) {
            $table->id();
            $table->string('categoria');
            $table->string('tipo');
            $table->string('nombre');
            $table->decimal('precio', 10, 2);
            $table->integer('stock')->default(50);
            $table->timestamps();
        });

        // Tabla para las órdenes
        Schema::create('ordenes', function (Blueprint $table) {
            $table->id();
            $table->decimal('total_pagar', 10, 2)->default(0);
            $table->timestamps();
        });

        // Tabla para el detalle de cada orden
        Schema::create('detalles_orden', function (Blueprint $table) {
            $table->id();
            $table->foreignId('orden_id')->constrained('ordenes');
            $table->foreignId('plato_id')->constrained('platos');
            $table->integer('cantidad');
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();
        });
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
