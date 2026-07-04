<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ujian;
use Illuminate\Http\Request;

class UjianController extends Controller
{
    // Menampilkan daftar ujian (bisa difilter per kelas)
    public function index(Request $request)
    {
        $query = Ujian::with('kelas:id,nama_kelas');

        if ($request->has('kelas_id')) {
            $query->where('kelas_id', $request->kelas_id);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data ujian',
            'data' => $query->get()
        ]);
    }

    // Guru membuat ujian baru
    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'judul_ujian' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'durasi_menit' => 'required|integer',
        ]);

        $ujian = Ujian::create($request->all());

        return response()->json([
            'message' => 'Ujian berhasil dibuat',
            'data' => $ujian
        ], 201);
    }

    // Menampilkan detail satu ujian (nanti akan kita hubungkan dengan Soal)
    public function show(string $id)
    {
        $ujian = Ujian::with('kelas')->find($id);

        if (!$ujian) {
            return response()->json(['message' => 'Ujian tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail ujian berhasil diambil',
            'data' => $ujian
        ]);
    }

    // Mengubah data ujian
    public function update(Request $request, string $id)
    {
        $ujian = Ujian::find($id);

        if (!$ujian) {
            return response()->json(['message' => 'Ujian tidak ditemukan'], 404);
        }

        $request->validate([
            'judul_ujian' => 'sometimes|required|string|max:255',
            'deskripsi' => 'nullable|string',
            'durasi_menit' => 'sometimes|required|integer',
        ]);

        $ujian->update($request->only(['judul_ujian', 'deskripsi', 'durasi_menit']));

        return response()->json([
            'message' => 'Ujian berhasil diperbarui',
            'data' => $ujian
        ]);
    }

    // Menghapus ujian
    public function destroy(string $id)
    {
        $ujian = Ujian::find($id);

        if (!$ujian) {
            return response()->json(['message' => 'Ujian tidak ditemukan'], 404);
        }

        $ujian->delete();

        return response()->json([
            'message' => 'Ujian berhasil dihapus'
        ]);
    }
}