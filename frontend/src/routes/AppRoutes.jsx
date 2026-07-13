import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../Page/auth/Login";
import Register from "../Page/auth/Register";
import DashboardAdmin from "../Page/admin/DashboardAdmin";
import KelolaPengguna from "../Page/admin/KelolaPengguna";
import DashboardGuru from "../Page/guru/DashboardGuru";
import DetailKelas from "../Page/guru/DetailKelas";
import DaftarUjian from "../Page/guru/DaftarUjian";
import BuatSoal from "../Page/guru/BuatSoal";
import RekapNilai from "../Page/guru/RekapNilai";
import DashboardSiswa from "../Page/siswa/DashboardSiswa";
import RuangKelas from "../Page/siswa/RuangKelas";
import BacaMateri from "../Page/siswa/BacaMateri";
import KerjakanUjian from "../Page/siswa/KerjakanUjian";

// Komponen Pembungkus Satpam Keamanan
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Admin */}
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute>
          <DashboardAdmin />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/pengguna"
      element={
        <ProtectedRoute>
          <KelolaPengguna />
        </ProtectedRoute>
      }
    />

    {/* Guru */}
    <Route
      path="/guru/dashboard"
      element={
        <ProtectedRoute>
          <DashboardGuru />
        </ProtectedRoute>
      }
    />
    <Route
      path="/guru/kelas/:id"
      element={
        <ProtectedRoute>
          <DetailKelas />
        </ProtectedRoute>
      }
    />
    <Route
      path="/guru/ujian"
      element={
        <ProtectedRoute>
          <DaftarUjian />
        </ProtectedRoute>
      }
    />
    <Route
      path="/guru/ujian/soal"
      element={
        <ProtectedRoute>
          <BuatSoal />
        </ProtectedRoute>
      }
    />
    <Route
      path="/guru/ujian/rekap"
      element={
        <ProtectedRoute>
          <RekapNilai />
        </ProtectedRoute>
      }
    />

    {/* Siswa */}
    <Route
      path="/siswa/dashboard"
      element={
        <ProtectedRoute>
          <DashboardSiswa />
        </ProtectedRoute>
      }
    />
    <Route
      path="/siswa/kelas/:id"
      element={
        <ProtectedRoute>
          <RuangKelas />
        </ProtectedRoute>
      }
    />
    <Route
      path="/siswa/materi/:id"
      element={
        <ProtectedRoute>
          <BacaMateri />
        </ProtectedRoute>
      }
    />
    <Route
      path="/siswa/ujian/:id"
      element={
        <ProtectedRoute>
          <KerjakanUjian />
        </ProtectedRoute>
      }
    />
  </Routes>
);
