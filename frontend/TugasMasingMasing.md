### TUGAS 1 (Auth & Router Guard)

**Folder Kerjamu:** `src/views/auth/` & `src/router/`
**Nama Branch:** `task/1-setup-auth`

**Gambaran Umum Tugas:**
Intinya, tugasmu adalah membuat pintu gerbang utama aplikasi ini sekaligus menjadi satpamnya. Kamu yang membuat halaman agar pengguna bisa Login dan Register. Selain itu, kamu juga bertugas membuat sistem keamanan (Router Guard). Jadi, kalau ada orang asing yang belum login tapi mencoba memaksa masuk lewat link ke dalam aplikasi, sistem buatanmu akan otomatis menendang dia kembali ke halaman login.

**Langkah Pengerjaan:**

1. Buka `LoginView.vue` dan `RegisterView.vue`. Buat tampilan formnya.
2. Hubungkan form tersebut dengan API backend menggunakan file `api.js` yang sudah disiapkan. (Tembak POST `/login` dan POST `/register`).
3. Jika login berhasil, simpan token ke dalam sistem browser dengan perintah `localStorage.setItem('token', token)`. Lalu arahkan user ke halaman dashboard sesuai jabatan mereka.
4. Buka file `src/router/index.js`. Buat fungsi keamanan `router.beforeEach`. Aturannya: Jika user mencoba membuka halaman selain login tapi tidak punya token, arahkan mereka kembali ke halaman login.

### TUGAS 2 (Manajemen Kelas Guru)

**Folder Kerjamu:** `src/views/guru/`
**Nama Branch:** `task/2-guru-kelas`

**Gambaran Umum Tugas:**
Tugasmu adalah membuat ruang kerja untuk Guru. Guru tentu butuh tempat untuk membuat kelas baru (misalnya membuat kelas "Matematika Dasar") dan memasukkan materi pelajaran ke dalam kelas tersebut. Kamu yang bertugas mendesain halaman dan tombol-tombolnya supaya guru bisa melakukan hal itu dengan mudah.

**Langkah Pengerjaan:**

1. Buka `DashboardGuru.vue`. Tarik data dari API (GET `/kelas`) dan tampilkan daftar kelas yang dimiliki guru tersebut.
2. Masih di halaman yang sama, buat tombol dan form popup (modal) untuk membuat kelas baru. Hubungkan dengan API POST `/kelas`.
3. Buka `DetailKelasView.vue`. Halaman ini terbuka saat guru mengklik salah satu kelas. Ambil ID kelas dari link atas (URL), lalu panggil API (GET `/materi?kelas_id={id}`) untuk memunculkan daftar materinya. Jangan lupa siapkan juga form untuk menambah materi baru.

### TUGAS 3 (Evaluasi & Nilai Guru)

**Folder Kerjamu:** `src/views/guru/`
**Nama Branch:** `task/3-guru-evaluasi`

**Gambaran Umum Tugas:**
Tugasmu berkaitan erat dengan ujian. Kamu membuat halaman supaya guru bisa mengetik pertanyaan ujian, menentukan pilihan gandanya (A, B, C, D), dan mengatur kunci jawabannya. Selain itu, setelah siswa selesai ujian, guru butuh melihat nilainya. Jadi, kamu juga bertugas membuat tabel rekap nilai supaya guru tahu siapa saja siswa yang sudah mengerjakan dan berapa skor mereka.

**Langkah Pengerjaan:**

1. Buka `DaftarUjianView.vue`. Tampilkan daftar ujian yang sudah dibuat (tarik dari GET `/ujian`). Buat juga tombol untuk membuat ujian baru (POST `/ujian`).
2. Buka `BuatSoalView.vue`. Buat form panjang untuk memasukkan pertanyaan beserta pilihan ganda (A, B, C, D) dan kunci jawabannya. Kirim data ini ke POST `/soal`. Pastikan saat tombol simpan ditekan, isi form langsung kosong kembali agar guru bisa langsung lanjut mengetik soal berikutnya.
3. Buka `RekapNilaiView.vue`. Buat tabel rapi untuk menampilkan nama siswa dan nilai ujian mereka menggunakan data dari GET `/hasil-ujian`.

### TUGAS 4 (Ruang Belajar Siswa)

**Folder Kerjamu:** `src/views/siswa/`
**Nama Branch:** `task/4-siswa-eksplorasi`

**Gambaran Umum Tugas:**
Tugasmu adalah membuat halaman beranda utama untuk Siswa. Saat siswa login, mereka harus bisa melihat daftar kelas apa saja yang tersedia (seperti melihat katalog menu). Kalau kelas itu diklik, siswa bisa masuk ke dalam ruangannya untuk mulai membaca materi-materi yang sudah disiapkan oleh guru. Pastikan tampilannya rapi dan enak dibaca.

**Langkah Pengerjaan:**

1. Buka `DashboardSiswa.vue`. Tarik semua kelas dari database (GET `/kelas`) dan tampilkan seperti katalog kelas yang bisa diklik. (Gunakan data dummy kelas yang sudah disiapkan di seeder).
2. Buka `RuangKelasView.vue`. Jika siswa mengklik satu kelas, tampilkan apa saja isinya. Panggil GET `/materi` dan GET `/ujian` berdasarkan ID kelas tersebut. Pisahkan tampilannya antara bagian membaca materi dan bagian mulai ujian.
3. Buka `BacaMateriView.vue`. Buat tampilan yang enak dibaca mata saat siswa membuka isi dari materi teks tersebut. Tambahkan tombol "Kembali ke Ruang Kelas".

### TUGAS 5 (Sistem Ujian Siswa)

**Folder Kerjamu:** `src/views/siswa/`
**Nama Branch:** `task/5-siswa-ujian`

**Gambaran Umum Tugas:**
Tugasmu adalah membuat lembar kerja ujian elektronik untuk siswa. Saat siswa mulai ujian, mereka akan melihat soal pilihan ganda dan ada jam hitung mundur di layar. Setelah mereka selesai memilih jawaban dan menekan tombol kumpul, tugasmu adalah membuat kode yang otomatis mengoreksi jawaban mereka (mencocokkan dengan kunci jawaban), menghitung skor akhirnya, dan menyimpan nilai tersebut ke database.

**Langkah Pengerjaan:**

1. Buka `KerjakanUjianView.vue`. Tarik daftar soal dari GET `/soal?ujian_id={id}`. Tampilkan soal satu per satu atau sekaligus.
2. Buat fitur timer (hitung mundur) di pojok atas layar berdasarkan data durasi dari database.
3. Kumpulkan jawaban yang dipilih siswa. Saat waktu habis atau siswa menekan tombol kumpulkan, buat fungsi JavaScript untuk mengecek jawaban benar dan salah. Hitung skor akhirnya.
4. Kirim hasil skor perhitungan tersebut ke database backend menggunakan POST `/hasil-ujian`.

### TUGAS 6 (Panel Admin Utama)

**Folder Kerjamu:** `src/views/admin/`
**Nama Branch:** `task/6-admin-panel`

**Gambaran Umum Tugas:**
Tugas ini membuat ruang kendali utama untuk Admin. Admin memantau seluruh aktivitas di aplikasi. Admin bisa melihat rangkuman jumlah guru, jumlah siswa, dan jumlah kelas. Admin juga bisa melihat tabel daftar seluruh akun yang ada di aplikasi dan memiliki hak untuk menghapus akun jika ada pengguna yang melanggar aturan.

**Langkah Pengerjaan:**

1. Buka `DashboardAdmin.vue`. Buat halaman ringkasan data. Tampilkan kotak-kotak informasi seperti: Jumlah Total Siswa, Jumlah Total Guru, dan Total Kelas Aktif. Data ini ditarik dari backend.
2. Buka `KelolaPenggunaView.vue`. Buat satu tabel besar yang berisi semua akun di dalam aplikasi.
3. Tambahkan tombol saringan (filter) agar admin bisa memilih untuk hanya melihat daftar Guru saja atau Siswa saja.
4. Sediakan tombol peringatan atau hapus akun di sebelah nama pengguna jika nantinya dibutuhkan.
