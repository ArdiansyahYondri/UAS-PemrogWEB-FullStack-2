import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function KelolaPengguna() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleHapusUser = async (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus akun ini secara permanen dari pangkalan data?",
      )
    ) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
      } catch (error) {
        alert("Gagal mengeksekusi penghapusan akun.");
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-blue-100 space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Buku Induk Pangkalan Akun
            </h2>
            <Link
              to="/admin/dashboard"
              className="text-xs text-blue-600 hover:underline"
            >
              &larr; Kembali ke Ringkasan
            </Link>
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan nama/jabatan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-blue-200 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500 bg-blue-50/50">
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">Email</th>
                <th className="p-3">Jabatan</th>
                <th className="p-3 text-center">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50/80">
                  <td className="p-3 font-semibold text-gray-800">
                    {user.name}
                  </td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${user.role === "guru" ? "bg-indigo-100 text-indigo-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleHapusUser(user.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100 hover:bg-red-600 hover:text-white transition"
                    >
                      Hapus Akun
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
