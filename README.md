# 🏪 Aplikasi Manajemen Keuangan Toko Terpusat

Aplikasi web manajemen keuangan terpusat yang dapat mengintegrasikan dan menampilkan data pemasukan, pengeluaran, dan saldo bersih dari berbagai toko dalam satu dashboard yang mudah digunakan dengan teknologi modern.

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
- **Edit Informasi Toko**: Update data toko yang sudah ada
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
- **Firebase Authentication**: Sistem autentikasi yang aman (dikustomisasi untuk demo)
- **Real-time Updates**: Data terupdate secara otomatis tanpa refresh

### Development Tools

- **Create React App**: Tool untuk setup project React
- **npm**: Package manager untuk JavaScript
- **ESLint**: Linting tool untuk kode quality
- **Git**: Version control system

### Styling & UI/UX

- **Tailwind CSS**: Utility-first CSS framework dengan custom configuration
- **Custom Theme**: Extended color palette dan animations
- **Modern Charts**: Interactive charts dengan smooth animations
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
│   │   ├── FinancialAnalytics.tsx   # Analisis keuangan dengan grafik modern
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
│   ├── index.css                    # Global CSS styles dengan Tailwind directives
│   └── firebase.ts                  # Konfigurasi Firebase dan Firestore
│
├── .env                             # Environment variables (Firebase config)
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies dan scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── README.md                        # Dokumentasi utama project
├── SETUP.md                         # Panduan setup dan konfigurasi
├── TAILWIND_GUIDE.md                # Panduan penggunaan Tailwind CSS
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
- **FinancialAnalytics.tsx**: Analisis keuangan dengan grafik modern (Chart.js)
- **AddTransaction.tsx**: Form untuk menambah transaksi baru dengan auto-update date
- **TransactionList.tsx**: Tabel/list transaksi dengan filter, scrolling, dan actions (Admin Utama)
- **TransactionHistory.tsx**: Riwayat transaksi dengan filter, sorting, dan scrolling (Admin Toko)
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

#### **Configuration Files**

- **tailwind.config.js**: Konfigurasi Tailwind CSS dengan custom theme
- **postcss.config.js**: Konfigurasi PostCSS untuk Tailwind
- **.env**: Environment variables untuk Firebase configuration
- **package.json**: Dependencies, scripts, dan metadata project
- **tsconfig.json**: Konfigurasi TypeScript compiler

### 🔧 Konfigurasi Files

#### **package.json Dependencies**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.x.x",
    "typescript": "^4.x.x",
    "chart.js": "^4.x.x",
    "react-chartjs-2": "^5.x.x",
    "jspdf": "^2.x.x",
    "jspdf-autotable": "^3.x.x"
  },
  "devDependencies": {
    "@types/react": "^18.x.x",
    "@types/react-dom": "^18.x.x",
    "tailwindcss": "^3.x.x",
    "postcss": "^8.x.x",
    "autoprefixer": "^10.x.x",
    "eslint": "^8.x.x"
  }
}
```

#### **tailwind.config.js**

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          // custom colors
        },
        success: {
          // success colors
        },
        danger: {
          // danger colors
        },
        warning: {
          // warning colors
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },
    },
  },
  plugins: [],
};
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

| File                     | Primary Function       | Key Features                                               |
| ------------------------ | ---------------------- | ---------------------------------------------------------- |
| `App.tsx`                | Main orchestrator      | Authentication routing, tab management                     |
| `Login.tsx`              | User authentication    | Multi-level login, form validation                         |
| `Header.tsx`             | Navigation & user info | User avatar, level display, logout                         |
| `FinancialSummary.tsx`   | Financial dashboard    | Store summaries, total calculations                        |
| `FinancialAnalytics.tsx` | Financial analytics    | Modern charts (Bar, Line, Doughnut), data visualization    |
| `AddTransaction.tsx`     | Transaction creation   | Form validation, store selection, auto-update date         |
| `TransactionList.tsx`    | Transaction management | Filtering, deletion, modal details, scrolling (Admin only) |
| `TransactionHistory.tsx` | Transaction history    | Filtering, sorting, store display, scrolling (Admin Toko)  |
| `StoreManager.tsx`       | Store CRUD operations  | Add, edit, delete stores (Admin only)                      |
| `useFirestore.ts`        | Database operations    | Real-time data, CRUD functions                             |
| `useAuth.ts`             | Authentication logic   | Login/logout, level management                             |

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
- ✅ Tambah transaksi dengan waktu real-time
- ✅ Lihat dan hapus transaksi
- ✅ Lihat ringkasan keuangan konsolidasi
- ✅ Lihat ringkasan per toko
- ✅ Analisis keuangan dengan grafik modern (Bar, Line, Doughnut)
- ✅ Export data transaksi ke PDF
- ✅ Akses data sample

### Admin Toko (admintoko/admintoko)

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

- Sistem login dengan level akses berbeda
- Penyimpanan state di localStorage
- Validasi input yang ketat
- Pembatasan akses berdasarkan level admin

### Data Protection

- Validasi data sebelum disimpan
- Error handling yang komprehensif
- Backup data otomatis di Firestore
- Waktu input yang akurat untuk audit trail

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
- Panduan Tailwind CSS tersedia di [TAILWIND_GUIDE.md](TAILWIND_GUIDE.md)

---

**Dibuat dengan ❤️ menggunakan React.js, Tailwind CSS, Chart.js, dan Firebase**
