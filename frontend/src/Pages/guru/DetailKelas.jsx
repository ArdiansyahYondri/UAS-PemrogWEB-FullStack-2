import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function DetailKelas() {
  const { id } = useParams();
  const [materiList, setMateriList] = useState([]);
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const token = localStorage.getItem("token");

  const fetchMateri = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/materi?kelas_id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMateriList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMateri();
  }, [id]);

  const handleAddMateri = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/materi",
        { kelas_id: id, judul, konten },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setJudul("");
      setKonten("");
      fetchMateri();
    } catch (error) {
      alert("Gagal mengunggah materi baru.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            KeJar &gt; Ruang Detail Kelas
          </span>
          <Link
            to="/guru/dashboard"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Kembali ke Dasbor
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-blue-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
              Daftar Materi Pembelajaran
            </h2>
            {materiList.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Belum ada materi pelajaran di kelas ini.
              </p>
            ) : (
              <div className="space-y-3">
                {materiList.map((materi) => (
                  <div
                    key={materi.id}
                    className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg"
                  >
                    <h4 className="font-bold text-gray-800">{materi.judul}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {materi.konten}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Tambah Materi Baru
            </h2>
            <form onSubmit={handleAddMateri} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Materi
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konten / Isi Bacaan
                </label>
                <textarea
                  value={konten}
                  onChange={(e) => setKonten(e.target.value)}
                  className="w-full p-2 border border-blue-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Unggah Materi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
