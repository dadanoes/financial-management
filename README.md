# 🏪 Financial Management App

Aplikasi manajemen keuangan toko yang modern dan responsif dengan sistem autentikasi multi-level menggunakan Firebase.

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi Multi-Level dengan Firebase

- **👑 Admin Utama (Level 1)**

  - Akses penuh ke semua fitur aplikasi
  - Dapat mengelola toko, transaksi, dan melihat semua data
  - Dashboard dengan ringkasan keuangan konsolidasi
  - Analisis keuangan dengan grafik modern
  - Export data ke PDF

- **🏪 Admin Toko (Level 2)**
  - Akses terbatas untuk operasi harian
  - Dapat menambah transaksi dan melihat riwayat transaksi dari semua toko
  - Dashboard dengan ringkasan keuangan per toko
  - Filter dan sort transaksi

**Catatan**: Sistem autentikasi menggunakan Firebase Authentication dengan role-based access control yang disimpan di Firestore. Kredensial login dapat dikonfigurasi melalui Firebase Console.

### 📊 Dashboard Keuangan

- **Ringkasan Keuangan Konsolidasi** (Admin Utama): Tampilkan total pemasukan, total pengeluaran, dan saldo bersih untuk semua toko secara keseluruhan
- **Ringkasan Per Toko** (Admin Utama): Tampilkan total pemasukan, total pengeluaran, dan saldo bersih untuk setiap toko secara individual
- **Statistik Visual**: Grafik dan indikator visual untuk analisis keuangan yang lebih mudah

### 📈 Analisis Keuangan Modern (Admin Utama)

- **Grafik Interaktif Modern**:
  - **Bar Chart**: Grafik batang dengan rounded corners dan gradient colors
  - **Line Chart**: Grafik garis dengan smooth curves dan filled areas
  - **Doughnut Chart**: Grafik donat untuk overview total
- **Laporan Per Periode**: Analisis pemasukan dan pengeluaran per hari, minggu, bulan, dan tahun
- **Filter Data**: Pilihan untuk melihat pemasukan saja, pengeluaran saja, atau keduanya
- **Ringkasan Total**: Card yang menampilkan total pemasukan, pengeluaran, dan saldo bersih
- **Tabel Detail**: Tabel data lengkap dengan format currency Indonesia
- **Periode Analisis**:
  - **Harian**: 30 hari terakhir
  - **Mingguan**: 12 minggu terakhir
  - **Bulanan**: 12 bulan terakhir
  - **Tahunan**: 5 tahun terakhir

### 🏪 Manajemen Toko (Admin Utama)

- **Tambah Toko Baru**: Tambahkan toko baru dengan informasi lengkap (nama, deskripsi, alamat, telepon)
- **Edit Informasi Toko**: Update data toko yang sudah ada dengan real-time update
- **Hapus Toko**: Hapus toko yang tidak lagi aktif
- **Daftar Toko**: Tampilkan semua toko dalam format yang mudah dibaca

### 💰 Manajemen Transaksi

- **Pencatatan Transaksi Manual**: Tambahkan transaksi pemasukan dan pengeluaran secara manual
- **Waktu Input Real-time**: Transaksi disimpan dengan waktu input yang sebenarnya
- **Detail Transaksi Lengkap**:
  - Nama toko
  - Jumlah transaksi
  - Jenis transaksi (pemasukan/pengeluaran)
  - Deskripsi transaksi
  - Tanggal dan waktu transaksi
- **Riwayat Transaksi dengan Scrolling**: Tampilkan daftar semua transaksi dengan scrolling yang smooth
- **Filter dan Pencarian**: Cari dan filter transaksi berdasarkan berbagai kriteria
- **Hapus Transaksi**: Hapus transaksi yang tidak diperlukan (Admin Utama)
- **Export PDF**: Download data transaksi dalam format PDF

### 📱 Responsif dan User-Friendly

- **Desain Responsif**: Optimal untuk desktop, tablet, dan mobile
- **Interface Modern**: Desain yang menarik dengan Tailwind CSS
- **Navigasi Intuitif**: Menu dan navigasi yang mudah dipahami
- **Loading States**: Indikator loading untuk pengalaman yang lebih baik
- **Mobile-First Design**: Optimized untuk penggunaan mobile

### 🔒 Keamanan dan Privasi

- **Autentikasi Berlapis**: Sistem login yang aman dengan level akses berbeda
- **Pembatasan Akses**: Setiap level admin memiliki akses yang sesuai
- **Validasi Input**: Validasi form untuk mencegah kesalahan data
- **Pesan Error yang Jelas**: Feedback yang informatif untuk user

## 🛠️ Teknologi yang Digunakan

### Frontend

- **React.js 18**: Framework JavaScript untuk membangun user interface yang interaktif
- **TypeScript**: Bahasa pemrograman yang menambahkan type safety pada JavaScript
- **Tailwind CSS**: Utility-first CSS framework untuk styling modern
- **Chart.js & react-chartjs-2**: Library untuk grafik interaktif dan modern
- **Responsive Design**: Mobile-first approach dengan Tailwind breakpoints

### Backend & Database

- **Firebase Firestore**: Database NoSQL real-time untuk penyimpanan data
- **Firebase Authentication**: Sistem autentikasi yang aman dengan email/password
- **Real-time Updates**: Data terupdate secara otomatis tanpa refresh
- **Role-based Access Control**: Sistem akses berdasarkan peran user
- **Security Rules**: Firestore security rules untuk keamanan data

### Development Tools

- **Create React App**: Tool untuk setup project React
- **npm**: Package manager untuk JavaScript
- **Firebase CLI**: Command line tools untuk deployment dan management
- **ESLint**: Code linting untuk maintainability

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Versi 14 atau lebih tinggi
- **npm**: Package manager
- **Firebase Account**: Untuk backend services

### Installation

1. **Clone repository**:

   ```bash
   git clone <repository-url>
   cd financial-management-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup Firebase**:

   - Ikuti panduan lengkap di [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
   - Atau jalankan script otomatis:

   ```bash
   node scripts/setup-firebase-users.js
   ```

4. **Konfigurasi Environment Variables**:
   Buat file `.env` di root project:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

5. **Jalankan aplikasi**:

   ```bash
   npm start
   ```

6. **Login dengan kredensial yang telah dikonfigurasi di Firebase Console**

## 👥 Level Akses dan Fitur

### Admin Utama

- ✅ Akses penuh ke semua fitur
- ✅ Kelola toko (tambah, edit, hapus)
- ✅ Tambah transaksi dengan waktu real-time
- ✅ Lihat dan hapus transaksi
- ✅ Lihat ringkasan keuangan konsolidasi
- ✅ Lihat ringkasan per toko
- ✅ Analisis keuangan dengan grafik modern (Bar, Line, Doughnut)
- ✅ Export data transaksi ke PDF
- ✅ Akses data sample

### Admin Toko

- ✅ Lihat ringkasan keuangan konsolidasi
- ✅ Tambah transaksi dengan waktu real-time
- ✅ Lihat riwayat transaksi dari semua toko
- ✅ Filter dan sort transaksi
- ✅ Akses data sample
- ❌ Kelola toko
- ❌ Hapus transaksi
- ❌ Analisis keuangan detail

## 📱 Responsivitas

Aplikasi dirancang responsif untuk berbagai ukuran layar dengan Tailwind CSS:

- **Desktop** (>1024px): Layout penuh dengan semua fitur
- **Tablet** (768px-1024px): Layout yang disesuaikan
- **Mobile** (<768px): Layout vertikal yang mudah digunakan

## 🔧 Konfigurasi Firebase

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Untuk development
    }
  }
}
```

**Note**: Untuk production, gunakan rules yang lebih ketat sesuai kebutuhan keamanan.

## 🎨 Fitur UI/UX Modern

### Design System dengan Tailwind CSS

- **Utility-First Approach**: Styling langsung di dalam JSX
- **Custom Theme**: Extended color palette dan animations
- **Responsive Design**: Mobile-first dengan breakpoints
- **Modern Charts**: Interactive charts dengan Chart.js
- **Smooth Animations**: Transisi dan hover effects

### Visual Elements

- **Gradient Backgrounds**: Header dan button dengan gradient
- **Modern Charts**: Bar, Line, dan Doughnut charts
- **Glassmorphism**: Efek blur pada card dan modal
- **Icons**: Emoji icons untuk kemudahan penggunaan
- **Loading States**: Spinner dan skeleton loading
- **Error Handling**: Pesan error yang informatif

## 🔒 Keamanan

### Autentikasi

- **Firebase Authentication**: Sistem login yang aman dengan email/password
- **Role-based Access Control**: Akses berdasarkan peran (admin/admintoko)
- **Real-time Auth State**: Status login terupdate secara real-time
- **Secure Token Management**: Firebase menangani token autentikasi
- **Validasi Input**: Validasi form yang ketat
- **Pembatasan Akses**: UI dan data dibatasi berdasarkan peran user

### Data Protection

- **Firestore Security Rules**: Aturan keamanan untuk akses data
- **Real-time Data Sync**: Data tersinkronisasi secara otomatis
- **Error Handling**: Penanganan error yang komprehensif
- **Data Validation**: Validasi data sebelum disimpan ke database
- **Audit Trail**: Waktu input yang akurat untuk tracking
- **Backup Otomatis**: Firebase menangani backup data secara otomatis

## 📈 Performance

### Optimizations

- Lazy loading untuk komponen besar
- Efficient re-rendering dengan React hooks
- Tailwind CSS dengan PurgeCSS otomatis
- Minimal bundle size
- Modern chart rendering dengan Chart.js

### Monitoring

- Error tracking dengan console logging
- Performance monitoring dengan React DevTools
- Network request optimization

## 🚀 Deployment

### Build untuk Production

```bash
npm run build
```

### Firebase Hosting

```bash
firebase deploy --only hosting
```

### Hosting URL

Aplikasi tersedia di: **https://finapp-c956b.web.app**

## 🔥 Firebase Setup

### Prerequisites

1. **Firebase Project**: Buat project di [Firebase Console](https://console.firebase.google.com/)
2. **Node.js**: Versi 14 atau lebih tinggi
3. **npm**: Package manager

### Quick Setup

1. **Clone repository dan install dependencies**:

   ```bash
   git clone <repository-url>
   cd financial-management-app
   npm install
   ```

2. **Setup Firebase**:

   - Ikuti panduan lengkap di [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
   - Atau jalankan script otomatis:

   ```bash
   node scripts/setup-firebase-users.js
   ```

3. **Konfigurasi Environment Variables**:
   Buat file `.env` di root project:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

4. **Jalankan aplikasi**:

   ```bash
   npm start
   ```

5. **Login dengan kredensial yang telah dikonfigurasi di Firebase Console**

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Support

Untuk pertanyaan atau dukungan:

- Buat issue di GitHub repository
- Hubungi developer melalui email
- Dokumentasi lengkap tersedia di [SETUP.md](SETUP.md)
- Panduan Tailwind CSS tersedia di [TAILWIND_GUIDE.md](TAILWIND_GUIDE.md)

## 🎯 Roadmap

### Fitur yang Akan Datang

- [ ] **Notifikasi Real-time**: Notifikasi untuk transaksi baru
- [ ] **Multi-currency Support**: Dukungan untuk berbagai mata uang
- [ ] **Advanced Analytics**: Analisis keuangan yang lebih detail
- [ ] **Export Excel**: Export data ke format Excel
- [ ] **Backup & Restore**: Fitur backup dan restore data
- [ ] **API Integration**: Integrasi dengan sistem eksternal

### Performance Improvements

- [ ] **Code Splitting**: Optimasi loading dengan code splitting
- [ ] **Service Worker**: Offline support dengan PWA
- [ ] **Image Optimization**: Optimasi gambar untuk performa
- [ ] **Caching Strategy**: Strategi caching yang lebih baik

---

**Dibuat dengan ❤️ menggunakan React.js, Tailwind CSS, Chart.js, dan Firebase**

**Live Demo**: [https://finapp-c956b.web.app](https://finapp-c956b.web.app)
