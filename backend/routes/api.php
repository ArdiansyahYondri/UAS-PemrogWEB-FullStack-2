<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KelasController;
use App\Http\Controllers\API\MateriController;
use App\Http\Controllers\API\AnggotaKelasController;
use App\Http\Controllers\API\UjianController;
use App\Http\Controllers\API\SoalController;
use App\Http\Controllers\API\HasilUjianController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute yang dilindungi (wajib login)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::apiResource('kelas', KelasController::class);
    Route::apiResource('materi', MateriController::class);
    Route::apiResource('anggota', AnggotaKelasController::class);
    Route::apiResource('ujian', UjianController::class);
    Route::apiResource('soal', SoalController::class);
    Route::apiResource('hasil-ujian', HasilUjianController::class);
});