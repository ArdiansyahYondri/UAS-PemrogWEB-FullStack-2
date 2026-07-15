import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BacaMateri() {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/materi`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Mencari materi yang sesuai ID secara lokal jika backend mengembalikan bentuk kumpulan data
        const found = res.data.find((m) => m.id === parseInt(id));
        setMateri(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!materi)
    return (
      <div className="p-6 text-center text-blue-600">Memuat teks bacaan...</div>
    );

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-blue-100">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-blue-600 hover:underline flex items-center gap-1 font-semibold"
        >
          &larr; Tutup Teks & Kembali
        </button>
        <h1 className="text-2xl font-black text-gray-900 mb-4">
          {materi.judul}
        </h1>
        <article className="leading-loose text-gray-700 text-base whitespace-pre-line border-t border-blue-50 pt-4">
          {materi.konten}
        </article>
      </div>
    </div>
  );
}