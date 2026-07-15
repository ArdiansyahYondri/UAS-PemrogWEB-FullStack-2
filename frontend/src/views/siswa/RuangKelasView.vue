import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function RuangKelas() {
  const { id } = useParams();
  const [materiList, setMateriList] = useState([]);
  const [ujianList, setUjianList] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Tarik Materi
    axios
      .get(`http://127.0.0.1:8000/api/materi?kelas_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMateriList(res.data))
      .catch((err) => console.error(err));

    // Tarik Ujian
    axios
      .get(`http://127.0.0.1:8000/api/ujian?kelas_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUjianList(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            KeJar &gt; Struktur Ruang Kelas
          </span>
          <Link
            to="/siswa/dashboard"
            className="text-sm text-gray-500 hover:text-blue-600"
          >
            Keluar Ke Dasbor
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri: Bacaan Materi */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              📖 Bahan Bacaan Materi
            </h3>
            <div className="space-y-2">
              {materiList.map((mat) => (
                <Link
                  to={`/siswa/materi/${mat.id}`}
                  key={mat.id}
                  className="block p-3 border border-blue-100 bg-blue-50/20 rounded-lg hover:bg-blue-50 transition"
                >
                  <p className="font-semibold text-gray-800 text-sm">
                    {mat.judul}
                  </p>
                </Link>
              ))}
              {materiList.length === 0 && (
                <p className="text-gray-400 text-sm">
                  Belum ada materi pelajaran dirilis.
                </p>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Ujian */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              📝 Ujian & Evaluasi
            </h3>
            <div className="space-y-2">
              {ujianList.map((uj) => (
                <div
                  key={uj.id}
                  className="p-3 border border-blue-100 bg-blue-50/20 rounded-lg flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800 text-sm">
                    {uj.nama_ujian}
                  </span>
                  <Link
                    to={`/siswa/ujian/${uj.id}`}
                    className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition"
                  >
                    Mulai
                  </Link>
                </div>
              ))}
              {ujianList.length === 0 && (
                <p className="text-gray-400 text-sm">
                  Tidak ada jadwal evaluasi ujian saat ini.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}