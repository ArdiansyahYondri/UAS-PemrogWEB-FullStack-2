import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // opsional jika backend mengirim role

      // Mengarahkan ke halaman sesuai role pengguna
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.data.role === "guru") {
        navigate("/guru/dashboard");
      } else {
        navigate("/siswa/dashboard");
      }
    } catch (error) {
      alert("Login gagal, periksa email dan password kembali.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-2">
          KeJar
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Masuk untuk memulai sesi belajar
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2.5 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Masuk
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
