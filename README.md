# Aplikasi Manajemen Keuangan Toko Terpusat

Aplikasi web untuk mengelola keuangan terpusat dari berbagai toko dengan fitur pencatatan transaksi, ringkasan keuangan, dan dashboard yang responsif.

## Fitur Utama

### 📊 Ringkasan Keuangan Per Toko

- Tampilkan total pemasukan, pengeluaran, dan saldo bersih untuk setiap toko
- Visualisasi data dengan kartu yang informatif
- Warna yang berbeda untuk pemasukan (hijau) dan pengeluaran (merah)

### 🏢 Ringkasan Keuangan Konsolidasi

- Dashboard terpusat untuk semua toko
- Total pemasukan, pengeluaran, dan saldo bersih keseluruhan
- Tampilan yang mudah dipahami dengan ikon yang intuitif

### ➕ Pencatatan Transaksi Manual

- Form untuk menambah transaksi pemasukan dan pengeluaran
- Pilihan nama toko dari daftar yang tersedia
- Input jumlah, tanggal, dan deskripsi transaksi
- Validasi form yang memastikan data lengkap

### 📋 Daftar Transaksi

- Tampilan semua transaksi dengan detail lengkap
- Filter berdasarkan toko dan jenis transaksi
- Kemampuan melihat detail transaksi dalam modal
- Fungsi hapus transaksi dengan konfirmasi

## Teknologi yang Digunakan

- **Frontend**: React.js dengan TypeScript
- **Styling**: Tailwind CSS
- **Backend & Database**: Firebase Firestore
- **Icons**: Heroicons
- **UI Components**: Headless UI

## Instalasi dan Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd financial-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan Firestore Database
3. Dapatkan konfigurasi Firebase dari project settings
4. Update file `src/firebase.ts` dengan konfigurasi Anda:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};
```

### 4. Jalankan Aplikasi

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Proyek

```
src/
├── components/
│   ├── Header.tsx              # Header aplikasi
│   ├── FinancialSummary.tsx    # Ringkasan keuangan
│   ├── AddTransaction.tsx      # Form tambah transaksi
│   ├── TransactionList.tsx     # Daftar transaksi
│   └── LoadingSpinner.tsx      # Komponen loading
├── hooks/
│   └── useFirestore.ts         # Hook untuk Firebase
├── types/
│   └── index.ts                # Definisi tipe TypeScript
├── firebase.ts                 # Konfigurasi Firebase
└── App.tsx                     # Komponen utama
```

## Fitur Responsif

Aplikasi dirancang responsif dan dapat digunakan di berbagai perangkat:

- **Desktop**: Layout 3 kolom untuk ringkasan keuangan
- **Tablet**: Layout 2 kolom yang menyesuaikan
- **Mobile**: Layout 1 kolom dengan navigasi yang mudah

## Keamanan

- Validasi input di sisi client
- Konfirmasi untuk aksi penghapusan
- Error handling yang komprehensif
- Data tersimpan aman di Firebase Firestore

## Penggunaan

### Menambah Transaksi Baru

1. Klik tombol "Tambah Transaksi"
2. Pilih nama toko dari dropdown
3. Pilih jenis transaksi (Pemasukan/Pengeluaran)
4. Masukkan jumlah dalam Rupiah
5. Pilih tanggal transaksi
6. Tambahkan deskripsi
7. Klik "Simpan Transaksi"

### Melihat Detail Transaksi

1. Klik ikon mata (👁️) pada transaksi yang ingin dilihat
2. Modal akan menampilkan detail lengkap transaksi
3. Klik "Tutup" untuk menutup modal

### Menghapus Transaksi

1. Klik ikon tempat sampah (🗑️) pada transaksi
2. Konfirmasi penghapusan
3. Transaksi akan dihapus dari database

### Filter Transaksi

1. Gunakan dropdown "Filter Toko" untuk melihat transaksi toko tertentu
2. Gunakan dropdown "Filter Jenis" untuk melihat pemasukan atau pengeluaran saja

## Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah MIT License.

## Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.
