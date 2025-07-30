# 🏪 Aplikasi Manajemen Keuangan Toko Terpusat

Aplikasi web manajemen keuangan terpusat yang dapat mengintegrasikan dan menampilkan data pemasukan, pengeluaran, dan saldo bersih dari berbagai toko dalam satu dashboard yang mudah digunakan.

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi Multi-Level

- **👑 Admin Utama (Level 1)**

  - Username: `admin`
  - Password: `admin123`
  - Akses penuh ke semua fitur aplikasi
  - Dapat mengelola toko, transaksi, dan melihat semua data

- **🏪 Admin Toko (Level 2)**
  - Username: `admintoko`
  - Password: `admintoko`
  - Akses terbatas untuk operasi harian
  - Dapat menambah transaksi dan melihat riwayat transaksi dari semua toko

### 📊 Dashboard Keuangan

- **Ringkasan Keuangan Konsolidasi** (Admin Utama): Tampilkan total pemasukan, total pengeluaran, dan saldo bersih untuk semua toko secara keseluruhan
- **Ringkasan Per Toko** (Admin Utama): Tampilkan total pemasukan, total pengeluaran, dan saldo bersih untuk setiap toko secara individual
- **Statistik Visual**: Grafik dan indikator visual untuk analisis keuangan yang lebih mudah

### 📈 Analisis Keuangan (Admin Utama)

- **Laporan Per Periode**: Analisis pemasukan dan pengeluaran per hari, minggu, bulan, dan tahun
- **Grafik Interaktif**: Visualisasi data dengan grafik bar yang responsif dan mudah dipahami
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
- **Edit Informasi Toko**: Update data toko yang sudah ada
- **Hapus Toko**: Hapus toko yang tidak lagi aktif
- **Daftar Toko**: Tampilkan semua toko dalam format yang mudah dibaca

### 💰 Manajemen Transaksi

- **Pencatatan Transaksi Manual**: Tambahkan transaksi pemasukan dan pengeluaran secara manual
- **Detail Transaksi Lengkap**:
  - Nama toko
  - Jumlah transaksi
  - Jenis transaksi (pemasukan/pengeluaran)
  - Deskripsi transaksi
  - Tanggal transaksi
- **Riwayat Transaksi**: Tampilkan daftar semua transaksi dengan filter dan sorting
- **Filter dan Pencarian**: Cari dan filter transaksi berdasarkan berbagai kriteria
- **Hapus Transaksi**: Hapus transaksi yang tidak diperlukan (Admin Utama)

### 📱 Responsif dan User-Friendly

- **Desain Responsif**: Optimal untuk desktop, tablet, dan mobile
- **Interface Modern**: Desain yang menarik dengan animasi dan efek visual
- **Navigasi Intuitif**: Menu dan navigasi yang mudah dipahami
- **Loading States**: Indikator loading untuk pengalaman yang lebih baik

### 🔒 Keamanan dan Privasi

- **Autentikasi Berlapis**: Sistem login yang aman dengan level akses berbeda
- **Pembatasan Akses**: Setiap level admin memiliki akses yang sesuai
- **Validasi Input**: Validasi form untuk mencegah kesalahan data
- **Pesan Error yang Jelas**: Feedback yang informatif untuk user

## 🛠️ Teknologi yang Digunakan

### Frontend

- **React.js 18**: Framework JavaScript untuk membangun user interface yang interaktif
- **TypeScript**: Bahasa pemrograman yang menambahkan type safety pada JavaScript
- **CSS3**: Styling modern dengan custom CSS dan utility classes
- **Responsive Design**: Mobile-first approach dengan media queries

### Backend & Database

- **Firebase Firestore**: Database NoSQL real-time untuk penyimpanan data
- **Firebase Authentication**: Sistem autentikasi yang aman (dikustomisasi untuk demo)
- **Real-time Updates**: Data terupdate secara otomatis tanpa refresh

### Development Tools

- **Create React App**: Tool untuk setup project React
- **npm**: Package manager untuk JavaScript
- **ESLint**: Linting tool untuk kode quality
- **Git**: Version control system

### Styling & UI/UX

- **Custom CSS**: Styling yang dibuat khusus untuk aplikasi
- **CSS Grid & Flexbox**: Layout system modern
- **CSS Animations**: Animasi smooth untuk user experience yang lebih baik
- **Gradient Backgrounds**: Visual design yang menarik
- **Glassmorphism Effects**: Efek visual modern dengan backdrop blur

### State Management

- **React Hooks**: useState, useEffect untuk state management
- **Custom Hooks**: useFirestore, useAuth untuk logic yang reusable
- **Local Storage**: Penyimpanan state autentikasi di browser

## 📁 Struktur Project

```
financial-management-app/
├── public/                          # Static files
│   ├── index.html                   # HTML template utama
│   ├── favicon.ico                  # Icon aplikasi
│   ├── manifest.json                # PWA manifest
│   └── robots.txt                   # SEO robots file
│
├── src/                             # Source code aplikasi
│   ├── components/                  # React components
│   │   ├── Header.tsx               # Header dengan info user dan level admin
│   │   ├── Login.tsx                # Halaman login dengan form autentikasi
│   │   ├── FinancialSummary.tsx     # Ringkasan keuangan per toko dan total
│   │   ├── FinancialAnalytics.tsx   # Analisis keuangan dengan grafik per periode
│   │   ├── AddTransaction.tsx       # Form untuk menambah transaksi
│   │   ├── TransactionList.tsx      # Daftar dan manajemen transaksi (Admin Utama)
│   │   ├── TransactionHistory.tsx   # Riwayat transaksi dengan filter (Admin Toko)
│   │   ├── StoreManager.tsx         # Manajemen toko (CRUD operations)
│   │   ├── LoadingSpinner.tsx       # Komponen loading spinner
│   │   └── SampleDataButton.tsx     # Button untuk menambah data sample
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useFirestore.ts          # Hook untuk interaksi dengan Firestore
│   │   └── useAuth.ts               # Hook untuk autentikasi dan level admin
│   │
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts                 # Interfaces untuk Transaction, Store, dll
│   │
│   ├── utils/                       # Utility functions
│   │   └── sampleData.ts            # Data sample untuk testing aplikasi
│   │
│   ├── App.tsx                      # Komponen utama aplikasi (root component)
│   ├── index.tsx                    # Entry point aplikasi
│   ├── index.css                    # Global CSS styles dan utility classes
│   └── firebase.ts                  # Konfigurasi Firebase dan Firestore
│
├── .env                             # Environment variables (Firebase config)
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies dan scripts
├── tsconfig.json                    # TypeScript configuration
├── README.md                        # Dokumentasi utama project
├── SETUP.md                         # Panduan setup dan konfigurasi
└── FINAL_SUMMARY.md                 # Ringkasan fitur dan teknologi
```

### 📂 Penjelasan Detail Struktur

#### **public/**

- **index.html**: Template HTML utama dengan meta tags dan root div
- **favicon.ico**: Icon aplikasi yang ditampilkan di browser tab
- **manifest.json**: Konfigurasi PWA (Progressive Web App)
- **robots.txt**: File untuk SEO dan web crawlers

#### **src/components/**

- **Header.tsx**: Header aplikasi dengan logo, user info, dan logout button
- **Login.tsx**: Form login dengan validasi dan level admin selection
- **FinancialSummary.tsx**: Dashboard ringkasan keuangan dengan cards dan stats
- **AddTransaction.tsx**: Form untuk menambah transaksi baru
- **TransactionList.tsx**: Tabel/list transaksi dengan filter dan actions (Admin Utama)
- **TransactionHistory.tsx**: Riwayat transaksi dengan filter dan sorting (Admin Toko)
- **StoreManager.tsx**: CRUD operations untuk manajemen toko
- **LoadingSpinner.tsx**: Komponen loading dengan animasi
- **SampleDataButton.tsx**: Button untuk menambah data testing

#### **src/hooks/**

- **useFirestore.ts**: Custom hook untuk operasi database (CRUD transactions & stores)
- **useAuth.ts**: Custom hook untuk autentikasi dan level admin management

#### **src/types/**

- **index.ts**: TypeScript interfaces untuk type safety
  - `Transaction`: Interface untuk data transaksi
  - `Store`: Interface untuk data toko
  - `StoreSummary`: Interface untuk ringkasan toko
  - `FinancialSummary`: Interface untuk ringkasan keuangan

#### **src/utils/**

- **sampleData.ts**: Data dummy untuk testing dan demo aplikasi

#### **Root Files**

- **.env**: Environment variables untuk Firebase configuration
- **package.json**: Dependencies, scripts, dan metadata project
- **tsconfig.json**: Konfigurasi TypeScript compiler
- **README.md**: Dokumentasi lengkap aplikasi
- **SETUP.md**: Panduan setup dan troubleshooting
- **FINAL_SUMMARY.md**: Ringkasan fitur dan teknologi yang digunakan

### 🔧 Konfigurasi Files

#### **package.json Dependencies**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.x.x",
    "typescript": "^4.x.x"
  },
  "devDependencies": {
    "@types/react": "^18.x.x",
    "@types/react-dom": "^18.x.x",
    "eslint": "^8.x.x"
  }
}
```

#### **tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

#### **.env Template**

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 📊 Data Flow Architecture

```
User Interface (Components)
         ↓
   Custom Hooks (useAuth, useFirestore)
         ↓
   Firebase Services (Firestore, Auth)
         ↓
   Database (Firestore Collections)
```

### 🔄 Component Hierarchy

```
App.tsx
├── Login.tsx (if not authenticated)
└── Main App (if authenticated)
    ├── Header.tsx
    └── Content
        ├── Tab Navigation (Admin only)
        ├── Dashboard Tab
        │   ├── FinancialSummary.tsx
        │   ├── SampleDataButton.tsx
        │   ├── AddTransaction.tsx
        │   └── TransactionList.tsx (Admin only)
        ├── Analytics Tab (Admin only)
        │   └── FinancialAnalytics.tsx
        └── Stores Tab (Admin only)
            └── StoreManager.tsx
        └── Admin Toko Dashboard
            ├── FinancialSummary.tsx
            ├── SampleDataButton.tsx
            ├── AddTransaction.tsx
            └── TransactionHistory.tsx
```

### 🎯 Key Features by File

| File                     | Primary Function       | Key Features                                      |
| ------------------------ | ---------------------- | ------------------------------------------------- |
| `App.tsx`                | Main orchestrator      | Authentication routing, tab management            |
| `Login.tsx`              | User authentication    | Multi-level login, form validation                |
| `Header.tsx`             | Navigation & user info | User avatar, level display, logout                |
| `FinancialSummary.tsx`   | Financial dashboard    | Store summaries, total calculations               |
| `FinancialAnalytics.tsx` | Financial analytics    | Period-based analysis, charts, data visualization |
| `AddTransaction.tsx`     | Transaction creation   | Form validation, store selection                  |
| `TransactionList.tsx`    | Transaction management | Filtering, deletion, modal details (Admin only)   |
| `TransactionHistory.tsx` | Transaction history    | Filtering, sorting, store display (Admin Toko)    |
| `StoreManager.tsx`       | Store CRUD operations  | Add, edit, delete stores (Admin only)             |
| `useFirestore.ts`        | Database operations    | Real-time data, CRUD functions                    |
| `useAuth.ts`             | Authentication logic   | Login/logout, level management                    |

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites

- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- Akun Firebase (untuk database)

### Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd financial-management-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Firebase**

   - Buat project baru di [Firebase Console](https://console.firebase.google.com/)
   - Aktifkan Firestore Database
   - Buat file `.env` di root project dengan konfigurasi Firebase:

   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Jalankan aplikasi**

   ```bash
   npm start
   ```

5. **Buka browser**
   - Aplikasi akan berjalan di `http://localhost:3000`
   - Login dengan kredensial yang tersedia

## 👥 Level Akses dan Fitur

### Admin Utama (admin/admin123)

- ✅ Akses penuh ke semua fitur
- ✅ Kelola toko (tambah, edit, hapus)
- ✅ Tambah transaksi
- ✅ Lihat dan hapus transaksi
- ✅ Lihat ringkasan keuangan konsolidasi
- ✅ Lihat ringkasan per toko
- ✅ Analisis keuangan dengan grafik (harian, mingguan, bulanan, tahunan)
- ✅ Akses data sample

### Admin Toko (admintoko/admintoko)

- ✅ Lihat ringkasan keuangan konsolidasi
- ✅ Tambah transaksi
- ✅ Lihat riwayat transaksi dari semua toko
- ✅ Filter dan sort transaksi
- ✅ Akses data sample
- ❌ Kelola toko
- ❌ Hapus transaksi
- ❌ Analisis keuangan detail

## 📱 Responsivitas

Aplikasi dirancang responsif untuk berbagai ukuran layar:

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

## 🎨 Fitur UI/UX

### Design System

- **Color Palette**: Biru, ungu, hijau, merah, kuning, orange
- **Typography**: Font system yang konsisten
- **Spacing**: Grid system yang teratur
- **Shadows**: Elevation yang konsisten
- **Animations**: Transisi smooth dan hover effects

### Visual Elements

- **Gradient Backgrounds**: Header dan button dengan gradient
- **Glassmorphism**: Efek blur pada card dan modal
- **Icons**: Emoji icons untuk kemudahan penggunaan
- **Loading States**: Spinner dan skeleton loading
- **Error Handling**: Pesan error yang informatif

## 🔒 Keamanan

### Autentikasi

- Sistem login dengan level akses berbeda
- Penyimpanan state di localStorage
- Validasi input yang ketat
- Pembatasan akses berdasarkan level admin

### Data Protection

- Validasi data sebelum disimpan
- Error handling yang komprehensif
- Backup data otomatis di Firestore

## 📈 Performance

### Optimizations

- Lazy loading untuk komponen besar
- Efficient re-rendering dengan React hooks
- Optimized CSS dengan utility classes
- Minimal bundle size

### Monitoring

- Error tracking dengan console logging
- Performance monitoring dengan React DevTools
- Network request optimization

## 🚀 Deployment

### Build untuk Production

```bash
npm run build
```

### Hosting Options

- **Firebase Hosting**: Recommended untuk Firebase project
- **Vercel**: Easy deployment dengan Git integration
- **Netlify**: Free hosting dengan CI/CD
- **GitHub Pages**: Free hosting untuk open source

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

---

**Dibuat dengan ❤️ menggunakan React.js dan Firebase**
