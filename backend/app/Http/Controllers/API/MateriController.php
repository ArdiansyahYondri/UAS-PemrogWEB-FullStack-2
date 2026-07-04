<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Materi;
use Illuminate\Http\Request;

class MateriController extends Controller
{
    // Menampilkan semua materi (bisa difilter berdasarkan kelas)
    public function index(Request $request)
    {
        $query = Materi::with('kelas:id,nama_kelas');

        // Jika ada permintaan materi untuk kelas tertentu (contoh: /api/materi?kelas_id=1)
        if ($request->has('kelas_id')) {
            $query->where('kelas_id', $request->kelas_id);
        }

        $materi = $query->get();
        
        return response()->json([
            'message' => 'Berhasil mengambil data materi',
            'data' => $materi
        ]);
    }

    // Membuat materi baru
    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'judul' => 'required|string|max:255',
            'isi_materi' => 'nullable|string',
            'file_url' => 'nullable|string',
        ]);

        $materi = Materi::create($request->all());

        return response()->json([
            'message' => 'Materi berhasil ditambahkan',
            'data' => $materi
        ], 201);
    }

    // Menampilkan detail satu materi
    public function show(string $id)
    {
        $materi = Materi::with('kelas')->find($id);

        if (!$materi) {
            return response()->json(['message' => 'Materi tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail materi berhasil diambil',
            'data' => $materi
        ]);
    }

    // Mengubah data materi
    public function update(Request $request, string $id)
    {
        $materi = Materi::find($id);

        if (!$materi) {
            return response()->json(['message' => 'Materi tidak ditemukan'], 404);
        }

        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'isi_materi' => 'nullable|string',
            'file_url' => 'nullable|string',
        ]);

        $materi->update($request->only(['judul', 'isi_materi', 'file_url']));

        return response()->json([
            'message' => 'Materi berhasil diperbarui',
            'data' => $materi
        ]);
    }

    // Menghapus materi
    public function destroy(string $id)
    {
        $materi = Materi::find($id);

        if (!$materi) {
            return response()->json(['message' => 'Materi tidak ditemukan'], 404);
        }

        $materi->delete();

        return response()->json([
            'message' => 'Materi berhasil dihapus'
        ]);
    }
}