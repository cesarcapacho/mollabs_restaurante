<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Aca meti el menú exacto que me pasaron por el drive
        // Tambien Usé DB::table para hacerlo rápido sin crear tantos modelos al principio

        DB::table('platos')->insert([
            // --- ITALIANA ---
            ['categoria' => 'Italiana', 'tipo' => 'Pasta', 'nombre' => 'Boloñesa', 'precio' => 32500, 'stock' => 20],
            ['categoria' => 'Italiana', 'tipo' => 'Pasta', 'nombre' => 'Carbonara', 'precio' => 37900, 'stock' => 20],
            ['categoria' => 'Italiana', 'tipo' => 'Pasta', 'nombre' => 'Pesto', 'precio' => 31200, 'stock' => 20],

            ['categoria' => 'Italiana', 'tipo' => 'Pizza', 'nombre' => 'Pollo', 'precio' => 29900, 'stock' => 15],
            ['categoria' => 'Italiana', 'tipo' => 'Pizza', 'nombre' => 'Hawaiana', 'precio' => 24900, 'stock' => 15],
            ['categoria' => 'Italiana', 'tipo' => 'Pizza', 'nombre' => 'Carnes', 'precio' => 35500, 'stock' => 15],
            ['categoria' => 'Italiana', 'tipo' => 'Pizza', 'nombre' => 'Criolla', 'precio' => 33000, 'stock' => 15],

            ['categoria' => 'Italiana', 'tipo' => 'Lasaña', 'nombre' => 'Carne', 'precio' => 30900, 'stock' => 10],
            ['categoria' => 'Italiana', 'tipo' => 'Lasaña', 'nombre' => 'Vegetariana', 'precio' => 26800, 'stock' => 10],
            ['categoria' => 'Italiana', 'tipo' => 'Lasaña', 'nombre' => 'Pollo', 'precio' => 28500, 'stock' => 10],
            ['categoria' => 'Italiana', 'tipo' => 'Lasaña', 'nombre' => 'Mixta', 'precio' => 31500, 'stock' => 10],

            // --- ASIÁTICA ---
            ['categoria' => 'Asiática', 'tipo' => 'Sushi Nigiri', 'nombre' => 'Maguro', 'precio' => 10500, 'stock' => 50],
            ['categoria' => 'Asiática', 'tipo' => 'Sushi Nigiri', 'nombre' => 'Ebi', 'precio' => 8900, 'stock' => 50],
            ['categoria' => 'Asiática', 'tipo' => 'Sushi Nigiri', 'nombre' => 'Tamago', 'precio' => 6200, 'stock' => 50],

            ['categoria' => 'Asiática', 'tipo' => 'Sushi Maki', 'nombre' => 'Tekka (Rollo)', 'precio' => 35000, 'stock' => 20],
            ['categoria' => 'Asiática', 'tipo' => 'Sushi Maki', 'nombre' => 'Kappa (Rollo)', 'precio' => 22000, 'stock' => 20],
            ['categoria' => 'Asiática', 'tipo' => 'Sushi Maki', 'nombre' => 'California (Rollo)', 'precio' => 38900, 'stock' => 20],

            ['categoria' => 'Asiática', 'tipo' => 'Sushi Temaki', 'nombre' => 'Ikura', 'precio' => 25000, 'stock' => 15],

            // --- BEBIDAS ---
            ['categoria' => 'Bebidas', 'tipo' => 'Jugos', 'nombre' => 'Lulo', 'precio' => 7500, 'stock' => 100],
            ['categoria' => 'Bebidas', 'tipo' => 'Jugos', 'nombre' => 'Mora', 'precio' => 7500, 'stock' => 100],
            ['categoria' => 'Bebidas', 'tipo' => 'Jugos', 'nombre' => 'Maracuya', 'precio' => 7500, 'stock' => 100],
            ['categoria' => 'Bebidas', 'tipo' => 'Jugos', 'nombre' => 'Limonada Natural', 'precio' => 6500, 'stock' => 100],
            ['categoria' => 'Bebidas', 'tipo' => 'Jugos', 'nombre' => 'Limonada Coco', 'precio' => 8500, 'stock' => 100],

            ['categoria' => 'Bebidas', 'tipo' => 'Cervezas', 'nombre' => 'Artesanal', 'precio' => 15000, 'stock' => 60],
            ['categoria' => 'Bebidas', 'tipo' => 'Cervezas', 'nombre' => 'Nacional', 'precio' => 3500, 'stock' => 60],
        ]);  //
    }
}
