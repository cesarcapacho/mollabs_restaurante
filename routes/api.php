<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RestauranteController;

Route::get('/menu', [RestauranteController::class, 'index']);
Route::post('/ordenar', [RestauranteController::class, 'guardarOrden']);
