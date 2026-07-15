import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DashboardSiswa() {
  const [kelasList, setKelasList] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/kelas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setKelasList(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex justify-between items-center mb-8">
          <span className="text-2xl font-black text-blue-600">KeJar</span>
          <span className="text-sm text-gray-500 font-medium">
            Ruang Eksplorasi Siswa
          </span>
        </header>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Katalog Kelas Pembelajaran
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kelasList.map((kelas) => (
            <Link
              to={`/siswa/kelas/${kelas.id}`}
              key={kelas.id}
              className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition flex flex-col justify-between block"
            >
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold mb-4">
                  📚
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-1">
                  {kelas.nama_kelas}
                </h4>
                <p className="text-xs text-gray-400">
                  Tekan untuk mulai mempelajari ruangan
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}