import { Routes, Route } from "react-router-dom";

// Import folder auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Import folder admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import KelolaPengguna from "../pages/admin/KelolaPengguna";

// Import folder guru
import DashboardGuru from "../pages/guru/DashboardGuru";
import DetailKelas from "../pages/guru/DetailKelas";
import DaftarUjian from "../pages/guru/DaftarUjian";
import BuatSoal from "../pages/guru/BuatSoal";
import RekapNilai from "../pages/guru/RekapNilai";

// Import folder siswa
import DashboardSiswa from "../pages/siswa/DashboardSiswa";
import RuangKelas from "../pages/siswa/RuangKelas";
import BacaMateri from "../pages/siswa/BacaMateri";
import KerjakanUjian from "../pages/siswa/KerjakanUjian";

export const AppRoutes = () => (
  <Routes>
    {/* Rute Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Rute Admin */}
    <Route path="/admin/dashboard" element={<DashboardAdmin />} />
    <Route path="/admin/pengguna" element={<KelolaPengguna />} />

    {/* Rute Guru */}
    <Route path="/guru/dashboard" element={<DashboardGuru />} />
    <Route path="/guru/kelas/:id" element={<DetailKelas />} />
    <Route path="/guru/ujian" element={<DaftarUjian />} />
    <Route path="/guru/ujian/soal" element={<BuatSoal />} />
    <Route path="/guru/ujian/rekap" element={<RekapNilai />} />

    {/* Rute Siswa */}
    <Route path="/siswa/dashboard" element={<DashboardSiswa />} />
    <Route path="/siswa/kelas/:id" element={<RuangKelas />} />
    <Route path="/siswa/materi/:id" element={<BacaMateri />} />
    <Route path="/siswa/ujian/:id" element={<KerjakanUjian />} />
  </Routes>
);
