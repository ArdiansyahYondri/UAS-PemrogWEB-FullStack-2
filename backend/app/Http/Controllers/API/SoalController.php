<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Soal;
use Illuminate\Http\Request;

class SoalController extends Controller
{
    // Menampilkan daftar soal (biasanya difilter berdasarkan ujian_id)
    public function index(Request $request)
    {
        $query = Soal::with('ujian:id,judul_ujian'); 

        if ($request->has('ujian_id')) {
            $query->where('ujian_id', $request->ujian_id);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data soal',
            'data' => $query->get()
        ]);
    }

    // Guru menambahkan soal baru ke dalam ujian
    public function store(Request $request)
    {
        $request->validate([
            'ujian_id' => 'required|exists:ujian,id',
            'pertanyaan' => 'required|string',
            'opsi_a' => 'required|string',
            'opsi_b' => 'required|string',
            'opsi_c' => 'required|string',
            'opsi_d' => 'required|string',
            'kunci_jawaban' => 'required|string|in:A,B,C,D', // Membatasi input hanya huruf A/B/C/D
        ]);

        $soal = Soal::create($request->all());

        return response()->json([
            'message' => 'Soal berhasil ditambahkan',
            'data' => $soal
        ], 201);
    }

    // Menampilkan detail satu soal
    public function show(string $id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail soal berhasil diambil',
            'data' => $soal
        ]);
    }

    // Mengubah data soal
    public function update(Request $request, string $id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan'], 404);
        }

        $request->validate([
            'pertanyaan' => 'sometimes|required|string',
            'opsi_a' => 'sometimes|required|string',
            'opsi_b' => 'sometimes|required|string',
            'opsi_c' => 'sometimes|required|string',
            'opsi_d' => 'sometimes|required|string',
            'kunci_jawaban' => 'sometimes|required|string|in:A,B,C,D',
        ]);

        $soal->update($request->only([
            'pertanyaan', 'opsi_a', 'opsi_b', 'opsi_c', 'opsi_d', 'kunci_jawaban'
        ]));

        return response()->json([
            'message' => 'Soal berhasil diperbarui',
            'data' => $soal
        ]);
    }

    // Menghapus soal
    public function destroy(string $id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan'], 404);
        }

        $soal->delete();

        return response()->json([
            'message' => 'Soal berhasil dihapus'
        ]);
    }
}