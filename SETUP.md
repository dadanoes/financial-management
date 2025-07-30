# Panduan Setup Aplikasi Manajemen Keuangan Toko

## Langkah 1: Setup Firebase

### 1.1 Buat Project Firebase

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a project" atau "Add project"
3. Masukkan nama project (misal: "financial-management-toko")
4. Pilih apakah ingin menggunakan Google Analytics (opsional)
5. Klik "Create project"

### 1.2 Aktifkan Firestore Database

1. Di sidebar kiri, klik "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in test mode" untuk development
4. Pilih lokasi database (pilih yang terdekat dengan lokasi Anda)
5. Klik "Done"

### 1.3 Dapatkan Konfigurasi Firebase

1. Klik ikon gear (⚙️) di sidebar kiri
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik ikon web (</>) untuk menambahkan web app
5. Masukkan nama app (misal: "financial-management-web")
6. Klik "Register app"
7. Copy konfigurasi yang muncul

### 1.4 Setup Environment Variables

1. Buat file `.env` di root project
2. Tambahkan konfigurasi berikut:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

## Langkah 2: Install Dependencies

```bash
npm install
```

## Langkah 3: Jalankan Aplikasi

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Langkah 4: Test Aplikasi

### 4.1 Tambah Transaksi Pertama

1. Klik "Tambah Transaksi"
2. Pilih nama toko (atau ketik nama toko baru)
3. Pilih jenis transaksi (Pemasukan/Pengeluaran)
4. Masukkan jumlah
5. Pilih tanggal
6. Tambahkan deskripsi
7. Klik "Simpan Transaksi"

### 4.2 Verifikasi Data Tersimpan

1. Cek di Firebase Console > Firestore Database
2. Anda akan melihat collection "transactions"
3. Data transaksi akan muncul di sana

## Troubleshooting

### Error: "Firebase: Error (auth/unauthorized-domain)"

- Pastikan domain Anda sudah ditambahkan di Firebase Console > Authentication > Settings > Authorized domains

### Error: "Firebase: Error (permission-denied)"

- Pastikan Firestore rules sudah dikonfigurasi dengan benar
- Untuk development, gunakan rules berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Error: "Module not found"

- Jalankan `npm install` untuk menginstall semua dependencies
- Pastikan semua file sudah ada di folder yang benar

## Keamanan untuk Production

### 1. Update Firestore Rules

Untuk production, gunakan rules yang lebih aman:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 2. Aktifkan Authentication

1. Di Firebase Console, klik "Authentication"
2. Klik "Get started"
3. Pilih provider yang ingin digunakan (Email/Password, Google, dll)
4. Setup sesuai kebutuhan

### 3. Environment Variables

- Jangan commit file `.env` ke repository
- Gunakan environment variables di hosting platform (Vercel, Netlify, dll)

## Deployment

### Vercel

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Tambahkan environment variables di Vercel dashboard
4. Deploy

### Netlify

1. Push code ke GitHub
2. Connect repository ke Netlify
3. Tambahkan environment variables di Netlify dashboard
4. Deploy

## Fitur Tambahan yang Bisa Dikembangkan

1. **Authentication**: Login/logout untuk multiple user
2. **Export Data**: Export ke Excel/PDF
3. **Charts**: Grafik keuangan dengan Chart.js
4. **Notifications**: Notifikasi untuk transaksi besar
5. **Backup**: Auto backup ke Google Drive
6. **API Integration**: Integrasi dengan aplikasi kasir online

## Support

Jika mengalami masalah, silakan:

1. Cek console browser untuk error
2. Cek Firebase Console untuk error database
3. Buat issue di repository dengan detail error
