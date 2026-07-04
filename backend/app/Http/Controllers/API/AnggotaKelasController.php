<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AnggotaKelas;
use Illuminate\Http\Request;

class AnggotaKelasController extends Controller
{
    // Menampilkan daftar anggota (bisa difilter berdasarkan kelas atau siswa)
    public function index(Request $request)
    {
        // Memanggil data anggota beserta nama kelas dan nama siswanya
        $query = AnggotaKelas::with(['kelas:id,nama_kelas', 'siswa:id,name,email']);

        // Jika ingin melihat siapa saja siswa di satu kelas tertentu
        if ($request->has('kelas_id')) {
            $query->where('kelas_id', $request->kelas_id);
        }

        // Jika siswa ingin melihat dia terdaftar di kelas mana saja
        if ($request->has('siswa_id')) {
            $query->where('siswa_id', $request->siswa_id);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data anggota kelas',
            'data' => $query->get()
        ]);
    }

    // Memasukkan siswa ke dalam kelas
    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'siswa_id' => 'required|exists:users,id',
        ]);

        // Cek apakah siswa sudah ada di kelas ini (mencegah duplikat)
        $cekTerdaftar = AnggotaKelas::where('kelas_id', $request->kelas_id)
                                    ->where('siswa_id', $request->siswa_id)
                                    ->first();

        if ($cekTerdaftar) {
            return response()->json([
                'message' => 'Siswa sudah terdaftar di kelas ini'
            ], 400); // 400 Bad Request
        }

        $anggota = AnggotaKelas::create([
            'kelas_id' => $request->kelas_id,
            'siswa_id' => $request->siswa_id,
        ]);

        return response()->json([
            'message' => 'Siswa berhasil ditambahkan ke kelas',
            'data' => $anggota
        ], 201);
    }

    // Menampilkan detail (Opsional, jarang dipakai tapi dibiarkan ada bawaan resource)
    public function show(string $id)
    {
        $anggota = AnggotaKelas::with(['kelas', 'siswa'])->find($id);
        if (!$anggota) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json(['data' => $anggota]);
    }

    // Update (Bisa dilewati karena anggota kelas biasanya hanya ditambah/dihapus)
    public function update(Request $request, string $id)
    {
        return response()->json(['message' => 'Fitur update tidak tersedia untuk anggota kelas'], 405);
    }

    // Mengeluarkan siswa dari kelas
    public function destroy(string $id)
    {
        $anggota = AnggotaKelas::find($id);

        if (!$anggota) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $anggota->delete();

        return response()->json([
            'message' => 'Siswa berhasil dikeluarkan dari kelas'
        ]);
    }
}