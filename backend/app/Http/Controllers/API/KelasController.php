<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    // Menampilkan semua kelas
    public function index()
    {
        // Mengambil data kelas beserta nama gurunya
        $kelas = Kelas::with('guru:id,name,email')->get();
        
        return response()->json([
            'message' => 'Berhasil mengambil data kelas',
            'data' => $kelas
        ]);
    }

    // Membuat kelas baru (Khusus Guru/Admin)
    public function store(Request $request)
    {
        $request->validate([
            'nama_kelas' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $kelas = Kelas::create([
            'guru_id' => $request->user()->id, // Otomatis mengambil ID user yang sedang login
            'nama_kelas' => $request->nama_kelas,
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json([
            'message' => 'Kelas berhasil dibuat',
            'data' => $kelas
        ], 201);
    }

    // Menampilkan detail satu kelas
    public function show(string $id)
    {
        $kelas = Kelas::with('guru:id,name,email', 'materi', 'ujian')->find($id);

        if (!$kelas) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail kelas berhasil diambil',
            'data' => $kelas
        ]);
    }

    // Mengubah data kelas
    public function update(Request $request, string $id)
    {
        $kelas = Kelas::find($id);

        if (!$kelas) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_kelas' => 'sometimes|required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $kelas->update($request->only(['nama_kelas', 'deskripsi']));

        return response()->json([
            'message' => 'Kelas berhasil diperbarui',
            'data' => $kelas
        ]);
    }

    // Menghapus kelas
    public function destroy(string $id)
    {
        $kelas = Kelas::find($id);

        if (!$kelas) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        $kelas->delete();

        return response()->json([
            'message' => 'Kelas berhasil dihapus'
        ]);
    }
}