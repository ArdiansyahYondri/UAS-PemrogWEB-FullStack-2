# 🚀 PANDUAN KERJA TIM FRONTEND: PROJECT KEJAR

Semua fondasi aplikasi KeJar (arsitektur folder React dan Tailwind, jembatan API, dan Backend) sudah siap 100%. Kita sekarang bisa mulai coding secara bersamaan tanpa harus saling tunggu.

Tolong baca panduan ini pelan-pelan dari awal sampai akhir sebelum mulai menyentuh kode ya.

## 🛠️ TAHAP 1: Menyalakan Backend (Laravel)

Kalian wajib menyalakan mesin backend ini di laptop masing-masing supaya aplikasi React kita nanti bisa mengambil data dari database.

1. Buka aplikasi XAMPP (klik Start pada Apache dan MySQL) atau buka Laragon (klik Start All).
2. Buat database baru dengan nama `e-learning`.
   - **Pengguna XAMPP:** Buka browser dan ketik `localhost/phpmyadmin`.
   - **Pengguna Laragon:** Klik kanan pada aplikasi Laragon, pilih menu **MySQL**, lalu klik **phpMyAdmin**.
   - Setelah phpMyAdmin terbuka, buat database baru di sana.
3. Buka terminal, cari folder tempat kalian biasa menyimpan tugas, lalu jalankan perintah ini untuk mengambil kode dari GitHub:
   `git clone https://github.com/ArdiansyahYondri/UAS-PemrogWEB-FullStack-2.git`
4. Masuk ke dalam folder hasil download tersebut:
   `cd UAS-PemrogWEB-FullStack-2`
5. Masuk ke folder backend:
   `cd backend`
6. Install semua kebutuhan sistem Laravel:
   `composer install`
7. Copy file bernama `.env.example` lalu paste dan ubah namanya menjadi `.env`. Buka file `.env` tersebut, cari bagian database, lalu ubah menjadi seperti ini:

   DB_CONNECTION=mysql

   DB_HOST=127.0.0.1

   DB_PORT=3306

   DB_DATABASE=e-learning

   DB_USERNAME=root

   DB_PASSWORD=

8. Kembali ke terminal tadi, ketik empat perintah ini satu per satu:

   `php artisan key:generate`

   `php artisan migrate`

   `php artisan db:seed`

   `php artisan serve`

_(Keterangan: Perintah db:seed di atas otomatis membuatkan 3 akun dan 1 kelas untuk kalian tes di Postman. Email yang bisa dipakai: admin@kejar.study, guru@kejar.study, dan nyahu@kejar.study dengan password: password123. PENTING: Jangan tutup terminal ini selama kalian sedang mengerjakan frontend React)._

## 💻 TAHAP 2: Menyalakan Frontend (React.js)

1. Biarkan terminal backend tadi tetap jalan. Sekarang buka tab terminal BARU di VS Code kalian.
2. Pastikan posisi kalian ada di folder utama (`UAS-PemrogWEB-FullStack-2`), lalu masuk ke folder frontend:
   `cd frontend`
3. Install semua kebutuhan sistem React:
   `npm install`
4. Nyalakan server React kalian:
   `npm run dev`
5. Buka browser dan ketik alamat yang muncul (biasanya `http://localhost:5173`).

## 🚨 TAHAP 3: Aturan Simpan Kode (WAJIB DIIKUTI)

Branch utama kita (`main`) sudah dikunci oleh Ardi untuk mencegah kode bentrok. Kalian tidak bisa menyimpan kode langsung ke sana. Wajib ikuti langkah ini setiap kali bekerja:

1. Ambil Update Terbaru:
   Sebelum mulai coding setiap harinya, ketik: `git checkout main` lalu `git pull origin main`.
2. Buat Cabang (Branch) Baru:
   Buat ruang kerja khusus untuk tugasmu sendiri. Ketik: `git checkout -b task/[nomor-tugasmu]` (Contoh: `git checkout -b task/2-guru-kelas`).
3. Mulai Kerja:
   Silakan coding di dalam folder yang sudah ditugaskan.
4. Cara Menyimpan:
   Simpan pekerjaanmu ke GitHub dengan urutan ini: `git add .` lalu `git commit -m "pesan perubahanmu"` lalu `git push origin task/[nomor-tugasmu]`.
5. Kirim untuk Digabung (Pull Request):
   Buka halaman GitHub repositori kita. Klik tombol hijau bertuliskan "Compare & pull request". Nanti Ardi yang akan mengecek kodemu dan menggabungkannya ke aplikasi utama.

## 💡 TAHAP 4: Trik Jalan Pintas (Kerja Tanpa Menunggu Fitur Login)

Karena halaman Login masih dibuat oleh Tim 1, gunakan cara ini agar sistem mengira kalian sudah login:

1. Buka aplikasi Postman atau Thunder Client.
2. Buat request POST ke alamat `http://127.0.0.1:8000/api/login`. Masukkan email dummy dan password yang ada di keterangan Tahap 1.
3. Saat berhasil, akan muncul teks panjang bernama `token`. Copy teks tersebut.
4. Buka halaman React kalian di browser.
5. Klik kanan di layar browser, lalu pilih Inspect (atau Inspect Element).
6. Cari tab bernama Application (atau Storage).
7. Di menu sebelah kiri, cari dan klik Local Storage, lalu klik nama website kita.
8. Di tabel sebelah kanan, buat data baru. Kolom Key isi dengan tulisan `token`. Kolom Value paste teks panjang yang kalian copy dari Postman tadi.
9. Refresh browser. Sekarang kalian sudah bisa mengakses API yang dikunci!
