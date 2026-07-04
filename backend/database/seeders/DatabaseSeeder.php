<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Kelas;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Akun Admin
        User::create([
            'name' => 'AdminUtama',
            'email' => 'admin@kejar.study',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        // 2. Buat Akun Guru
        $guru = User::create([
            'name' => 'BapakArdi',
            'email' => 'guru@kejar.study',
            'password' => Hash::make('password123'),
            'role' => 'guru',
        ]);

        // 3. Buat Akun Siswa
        $siswa = User::create([
            'name' => 'Nyahu',
            'email' => 'nyahu@kejar.study',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 4. Buat Satu Kelas Contoh
        Kelas::create([
            'guru_id' => $guru->id,
            'nama_kelas' => 'Pemrograman Web Fullstack',
            'deskripsi' => 'Kelas dasar pembuatan aplikasi web menggunakan Laravel dan React.',
        ]);
    }
}