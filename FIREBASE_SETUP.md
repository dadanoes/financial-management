# Firebase Setup Guide untuk Financial Management App

## 1. Konfigurasi Firebase

### Langkah 1: Buat Project Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project"
3. Masukkan nama project: `finapp-c956b` (atau nama yang Anda inginkan)
4. Ikuti langkah-langkah setup

### Langkah 2: Aktifkan Authentication

1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar
3. Klik "Get started"
4. Pilih tab "Sign-in method"
5. Aktifkan "Email/Password"
6. Klik "Save"

### Langkah 3: Buat Database Firestore

1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi database (misalnya: `asia-southeast1`)

### Langkah 4: Dapatkan Konfigurasi

1. Klik ikon gear (⚙️) di sidebar
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik ikon web (</>)
5. Masukkan nama app: `financial-management-app`
6. Copy konfigurasi yang diberikan

## 2. Setup Environment Variables

Buat file `.env` di root project dengan konfigurasi berikut:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id-here
```

## 3. Buat User Demo

### Langkah 1: Buat User di Firebase Console

1. Buka Firebase Console > Authentication > Users
2. Klik "Add user"
3. Buat 2 user:

**Admin Utama:**

- Email: `[email-admin]` (ganti dengan email yang diinginkan)
- Password: `[password-admin]` (ganti dengan password yang aman)

**Admin Toko:**

- Email: `[email-admintoko]` (ganti dengan email yang diinginkan)
- Password: `[password-admintoko]` (ganti dengan password yang aman)

### Langkah 2: Buat Collection Users di Firestore

1. Buka Firestore Database
2. Klik "Start collection"
3. Collection ID: `users`
4. Buat 2 dokumen:

**Dokumen untuk Admin Utama:**

- Document ID: `[uid-admin]` (copy UID dari user admin)
- Fields:
  - `role`: `admin` (string)
  - `email`: `[email-admin]` (string)
  - `createdAt`: `[timestamp]` (timestamp)

**Dokumen untuk Admin Toko:**

- Document ID: `[uid-admintoko]` (copy UID dari user admintoko)
- Fields:
  - `role`: `admintoko` (string)
  - `email`: `[email-admintoko]` (string)
  - `userStore`: `Toko Admin` (string)
  - `createdAt`: `[timestamp]` (timestamp)

## 4. Setup Security Rules

### Firestore Security Rules

Buka Firestore Database > Rules dan ganti dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Transactions collection - authenticated users can read/write
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null;
    }

    // Stores collection - authenticated users can read/write
    match /stores/{storeId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 5. Test Aplikasi

1. Jalankan aplikasi: `npm start`
2. Login dengan kredensial yang telah dikonfigurasi di Firebase Console

## 6. Troubleshooting

### Error: "Firebase App named '[DEFAULT]' already exists"

- Pastikan hanya ada satu inisialisasi Firebase di `src/firebase.ts`

### Error: "Permission denied"

- Periksa Firestore Security Rules
- Pastikan user sudah login

### Error: "User document not found"

- Pastikan dokumen user sudah dibuat di collection `users`
- Pastikan Document ID sama dengan UID user

## 7. Fitur yang Tersedia

### Admin Utama:

- ✅ Login dengan email/password
- ✅ Dashboard dengan ringkasan keuangan
- ✅ Tambah transaksi
- ✅ Lihat daftar transaksi
- ✅ Analisis keuangan dengan grafik
- ✅ Kelola toko (CRUD)
- ✅ Download PDF laporan

### Admin Toko:

- ✅ Login dengan email/password
- ✅ Dashboard dengan ringkasan keuangan
- ✅ Tambah transaksi
- ✅ Lihat riwayat transaksi
- ❌ Tidak bisa akses analisis keuangan
- ❌ Tidak bisa kelola toko

## 8. Struktur Database

```
finapp-c956b/
├── users/
│   ├── [uid-admin]/
│   │   ├── role: "admin"
│   │   ├── email: "admin@finapp.com"
│   │   └── createdAt: timestamp
│   └── [uid-admintoko]/
│       ├── role: "admintoko"
│       ├── email: "admintoko@finapp.com"
│       ├── userStore: "Toko Admin"
│       └── createdAt: timestamp
├── transactions/
│   └── [auto-id]/
│       ├── storeName: string
│       ├── amount: number
│       ├── type: "income" | "expense"
│       ├── description: string
│       ├── date: timestamp
│       └── createdAt: timestamp
└── stores/
    └── [auto-id]/
        ├── name: string
        ├── description: string
        ├── address: string
        ├── phone: string
        └── createdAt: timestamp
```
