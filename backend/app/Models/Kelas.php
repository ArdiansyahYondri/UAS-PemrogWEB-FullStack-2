<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = 'kelas';
    protected $fillable = ['guru_id', 'nama_kelas', 'deskripsi'];

    // Relasi: Kelas ini milik satu Guru
    public function guru()
    {
        return $this->belongsTo(User::class, 'guru_id');
    }

    // Relasi: Kelas punya banyak Materi
    public function materi()
    {
        return $this->hasMany(Materi::class);
    }

    // Relasi: Kelas punya banyak Ujian
    public function ujian()
    {
        return $this->hasMany(Ujian::class);
    }

    // Relasi: Kelas punya banyak Siswa (Anggota)
    public function anggota()
    {
        return $this->hasMany(AnggotaKelas::class);
    }
}