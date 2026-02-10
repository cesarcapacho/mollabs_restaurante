<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestauranteController extends Controller
{
    // F para mostrar el menu al front
    public function index()
    {
        // Traigo los platos que tengan stock mayor a 0
        return DB::table('platos')->where('stock', '>', 0)->get();
    }

    // F para recibir la orden y guardarla
    public function guardarOrden(Request $request)
    {
        //Validaciones 
        $request->validate([
            'items' => 'required|array', // Tiene que ser una lista
        ]);

        $items = $request->input('items');
        $totalOrden = 0;

        //una transacción para asegurar que todo se guarde correctamente o nada se guarde en caso de error
        DB::beginTransaction();

        try {
            // Creamos la orden vacía primero para tener el ID
            $ordenId = DB::table('ordenes')->insertGetId([
                'total_pagar' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            foreach ($items as $item) {
                // Busco el plato en la Base
                $plato = DB::table('platos')->where('id', $item['plato_id'])->first();

                // verificp si existe y si hay inv suficiente
                if (!$plato || $plato->stock < $item['cantidad']) {
                    return response()->json(['error' => "No hay suficiente stock de: " . $plato->nombre], 400);
                }

                $subtotal = $plato->precio * $item['cantidad'];
                $totalOrden += $subtotal;

                // Guardo detalle
                DB::table('detalles_orden')->insert([
                    'orden_id' => $ordenId,
                    'plato_id' => $plato->id,
                    'cantidad' => $item['cantidad'],
                    'subtotal' => $subtotal,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                //Resto del inventario lo que se pidió 
                DB::table('platos')->where('id', $plato->id)->decrement('stock', $item['cantidad']);
            }

            // Actualizo el total final de la orden
            DB::table('ordenes')->where('id', $ordenId)->update(['total_pagar' => $totalOrden]);

            DB::commit(); // Todo salió bien, confirmamos la transacción

            return response()->json(['mensaje' => 'Orden creada con éxito', 'total' => $totalOrden]);
        } catch (\Exception $e) {
            DB::rollBack(); // Hubo error, deshacemos todo
            return response()->json(['error' => 'Hubo un problema procesando la orden'], 500);
        }
    }
}
