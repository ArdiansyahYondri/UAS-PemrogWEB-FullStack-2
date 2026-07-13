import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function DashboardGuru() {
  const [kelasList, setKelasList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namaKelas, setNamaKelas] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchKelas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/kelas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKelasList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKelas();
  }, []);

  const handleCreateKelas = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/kelas",
        { nama_kelas: namaKelas },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNamaKelas("");
      setIsModalOpen(false);
      fetchKelas();
    } catch (error) {
      alert("Gagal membuat kelas.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-blue-100">
          <span className="text-2xl font-black text-blue-600">KeJar Guru</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Tambah Kelas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kelasList.map((kelas) => (
            <div
              key={kelas.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {kelas.nama_kelas}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Kode Ruangan: {kelas.id}
                </p>
              </div>
              <Link
                to={`/guru/kelas/${kelas.id}`}
                className="text-center w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition"
              >
                Masuk Kelas
              </Link>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Buat Kelas Baru
              </h3>
              <form onSubmit={handleCreateKelas} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Kelas
                  </label>
                  <input
                    type="text"
                    value={namaKelas}
                    onChange={(e) => setNamaKelas(e.target.value)}
                    className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
