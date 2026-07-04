<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materi extends Model
{
    protected $table = 'materi';
    protected $fillable = ['kelas_id', 'judul', 'isi_materi', 'file_url'];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}