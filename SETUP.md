# 🚀 Setup Guide - Financial Management App

Panduan lengkap untuk setup dan menjalankan aplikasi manajemen keuangan toko.

## 📋 Daftar Isi

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Firebase Setup](#firebase-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Deployment](#deployment)

## 🔧 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- **Node.js** (versi 14 atau lebih tinggi)
- **npm** atau **yarn**
- **Git**
- **Firebase Account** (gratis)
- **Code Editor** (VS Code recommended)

### Check Versions

```bash
node --version
npm --version
git --version
```

## 📦 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd financial-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Installation

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000` (tanpa Firebase setup, akan ada error - ini normal).

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project"
3. Masukkan nama project: `financial-management-app`
4. Pilih "Enable Google Analytics" (opsional)
5. Klik "Create project"

### 2. Enable Authentication

1. Di Firebase Console, klik "Authentication" di sidebar
2. Klik "Get started"
3. Pilih tab "Sign-in method"
4. Aktifkan "Email/Password"
5. Klik "Save"

### 3. Create Users

1. Klik "Users" tab
2. Klik "Add user"
3. Buat 2 user:

**Admin Utama:**

- Email: `[email-admin]` (ganti dengan email yang diinginkan)
- Password: `[password-admin]` (ganti dengan password yang aman)

**Admin Toko:**

- Email: `[email-admintoko]` (ganti dengan email yang diinginkan)
- Password: `[password-admintoko]` (ganti dengan password yang aman)

### 4. Setup Firestore Database

1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi database (pilih yang terdekat)
5. Klik "Done"

### 5. Create Collections

#### Collection: `users`

1. Klik "Start collection"
2. Collection ID: `users`
3. Buat 2 dokumen:

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

#### Collection: `transactions`

- Akan dibuat otomatis saat ada transaksi pertama

#### Collection: `stores`

- Akan dibuat otomatis saat ada toko pertama

### 6. Setup Security Rules

1. Klik "Rules" tab di Firestore
2. Ganti rules dengan:

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

3. Klik "Publish"

### 7. Get Firebase Configuration

1. Klik gear icon ⚙️ di sidebar
2. Pilih "Project settings"
3. Scroll ke "Your apps"
4. Klik "Add app" → "Web"
5. Masukkan app nickname: `financial-app`
6. Klik "Register app"
7. Copy konfigurasi Firebase

## 🔐 Environment Configuration

### 1. Create .env File

Buat file `.env` di root project:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 2. Update Firebase Config

File `src/firebase.ts` sudah dikonfigurasi untuk menggunakan environment variables dengan fallback.

## 🚀 Running the Application

### Development Mode

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

### Production Build

```bash
npm run build
```

### Test Production Build

```bash
npx serve -s build -l 3001
```

## 🧪 Testing

### 1. Test Authentication

1. Buka aplikasi di browser
2. Login dengan kredensial yang dibuat
3. Verifikasi level akses sesuai role

### 2. Test Features

#### Admin Utama:

- ✅ Dashboard dengan ringkasan keuangan
- ✅ Tambah transaksi
- ✅ Kelola toko (CRUD)
- ✅ Analisis keuangan
- ✅ Export PDF

#### Admin Toko:

- ✅ Dashboard dengan ringkasan keuangan
- ✅ Tambah transaksi
- ✅ Lihat riwayat transaksi
- ❌ Kelola toko (tidak bisa akses)

## 🚀 Deployment

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase

```bash
firebase init hosting
```

Pilih:

- Project: `financial-management-app`
- Public directory: `build`
- Single-page app: `Yes`
- Overwrite index.html: `No`

### 4. Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

### 5. Access Live App

Aplikasi akan tersedia di: `https://your-project-id.web.app`

## 🔧 Troubleshooting

### Common Issues

#### 1. Firebase Configuration Error

**Error**: `Firebase: Error (auth/configuration-not-found)`

**Solution**:

- Periksa file `.env` sudah benar
- Restart development server
- Periksa Firebase project settings

#### 2. Permission Denied

**Error**: `PERMISSION_DENIED: Missing or insufficient permissions`

**Solution**:

- Periksa Firestore Security Rules
- Pastikan user sudah login
- Periksa collection permissions

#### 3. Build Errors

**Error**: `Module not found`

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
```

#### 4. Port Already in Use

**Error**: `Something is already running on port 3000`

**Solution**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Debug Mode

Untuk debugging, tambahkan di browser console:

```javascript
// Check Firebase connection
console.log(window.firebase);

// Check authentication state
firebase.auth().onAuthStateChanged((user) => {
  console.log("Auth state:", user);
});
```

## 📱 Mobile Testing

### Responsive Design

Aplikasi sudah responsive untuk:

- **Desktop** (>1024px)
- **Tablet** (768px-1024px)
- **Mobile** (<768px)

### PWA Features

- Offline support (dalam development)
- Install to home screen
- Push notifications (dalam development)

## 🔒 Security Best Practices

### 1. Environment Variables

- Jangan commit `.env` file ke repository
- Gunakan different configs untuk development/production
- Rotate API keys secara berkala

### 2. Firestore Security

- Gunakan rules yang ketat untuk production
- Implement row-level security
- Audit access logs secara berkala

### 3. Authentication

- Enforce strong passwords
- Implement rate limiting
- Monitor failed login attempts

## 📊 Performance Optimization

### 1. Build Optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Optimize for production
npm run build
```

### 2. Firebase Optimization

- Use indexes for queries
- Implement pagination
- Cache frequently accessed data

### 3. React Optimization

- Use React.memo for expensive components
- Implement lazy loading
- Optimize re-renders

## 🎯 Next Steps

### 1. Customization

- Update branding dan colors
- Modify user roles dan permissions
- Add custom features

### 2. Integration

- Connect dengan payment gateways
- Integrate dengan accounting software
- Add reporting features

### 3. Scaling

- Implement caching strategy
- Add CDN for static assets
- Optimize database queries

## 📞 Support

### Getting Help

1. **Check Documentation**: README.md dan file dokumentasi lainnya
2. **Search Issues**: Cari di GitHub issues
3. **Create Issue**: Buat issue baru dengan detail error
4. **Community**: Tanya di forum atau Discord

### Useful Commands

```bash
# Development
npm start                    # Start development server
npm test                     # Run tests
npm run build               # Build for production

# Firebase
firebase login              # Login to Firebase
firebase deploy             # Deploy to Firebase
firebase hosting:channel:list # List preview channels

# Debugging
npm run build -- --analyze  # Analyze bundle
firebase emulators:start    # Start local emulators
```

---

**Happy Coding! 🚀**

Aplikasi ini dibuat dengan ❤️ menggunakan React.js, Tailwind CSS, dan Firebase.
