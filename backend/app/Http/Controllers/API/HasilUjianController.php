<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\HasilUjian;
use Illuminate\Http\Request;

class HasilUjianController extends Controller
{
    public function index(Request $request)
    {
        $query = HasilUjian::with(['ujian:id,judul_ujian', 'siswa:id,name,email']);

        if ($request->has('ujian_id')) {
            $query->where('ujian_id', $request->ujian_id);
        }

        if ($request->has('siswa_id')) {
            $query->where('siswa_id', $request->siswa_id);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data hasil ujian',
            'data' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ujian_id' => 'required|exists:ujian,id',
            'siswa_id' => 'required|exists:users,id',
            'skor' => 'required|numeric|min:0|max:100',
            'waktu_selesai' => 'nullable|date',
        ]);

        $cekHasil = HasilUjian::where('ujian_id', $request->ujian_id)
                         ->where('siswa_id', $request->siswa_id)
                         ->first();

        if ($cekHasil) {
            return response()->json(['message' => 'Siswa sudah mengumpulkan ujian ini'], 400); 
        }

        $hasil = HasilUjian::create($request->all());

        return response()->json(['message' => 'Hasil ujian berhasil disimpan', 'data' => $hasil], 201);
    }

    public function show(string $id)
    {
        $hasil = HasilUjian::with(['ujian', 'siswa'])->find($id);

        if (!$hasil) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json(['message' => 'Detail berhasil diambil', 'data' => $hasil]);
    }

    public function update(Request $request, string $id)
    {
        $hasil = HasilUjian::find($id);
        if (!$hasil) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate(['skor' => 'required|numeric|min:0|max:100']);
        $hasil->update($request->only(['skor']));

        return response()->json(['message' => 'Skor berhasil direvisi', 'data' => $hasil]);
    }

    public function destroy(string $id)
    {
        $hasil = HasilUjian::find($id);
        if (!$hasil) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $hasil->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}