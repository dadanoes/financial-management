// Script untuk setup user di Firebase
// Jalankan dengan: node scripts/setup-firebase-users.js
//
// INSTRUKSI:
// 1. Ganti kredensial di array demoUsers dengan email dan password yang diinginkan
// 2. Jalankan script: node scripts/setup-firebase-users.js

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { getFirestore, doc, setDoc, Timestamp } = require("firebase/firestore");

// Konfigurasi Firebase - hardcode untuk development
const firebaseConfig = {
  apiKey: "AIzaSyBw5vhUlrof-JL1BRQARoyVANl2sn4xmyA",
  authDomain: "finapp-c956b.firebaseapp.com",
  projectId: "finapp-c956b",
  storageBucket: "finapp-c956b.firebasestorage.app",
  messagingSenderId: "523617760047",
  appId: "1:523617760047:web:e1529de24b807ee688a7da",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Data user - ganti dengan kredensial yang diinginkan
const demoUsers = [
  {
    email: "[email-admin]", // Ganti dengan email admin
    password: "[password-admin]", // Ganti dengan password admin
    role: "admin",
    userStore: null,
  },
  {
    email: "[email-admintoko]", // Ganti dengan email admin toko
    password: "[password-admintoko]", // Ganti dengan password admin toko
    role: "admintoko",
    userStore: "Toko Admin",
  },
];

async function createUser(userData) {
  try {
    console.log(`Creating user: ${userData.email}`);

    // Buat user di Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;
    console.log(`✅ User created with UID: ${user.uid}`);

    // Buat dokumen user di Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDocData = {
      email: userData.email,
      role: userData.role,
      createdAt: Timestamp.now(),
      ...(userData.userStore && { userStore: userData.userStore }),
    };

    await setDoc(userDocRef, userDocData);
    console.log(`✅ User document created in Firestore`);

    return user.uid;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log(`⚠️ User ${userData.email} already exists`);

      // Coba login untuk mendapatkan UID
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        const user = userCredential.user;

        // Update dokumen user di Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocData = {
          email: userData.email,
          role: userData.role,
          updatedAt: Timestamp.now(),
          ...(userData.userStore && { userStore: userData.userStore }),
        };

        await setDoc(userDocRef, userDocData, { merge: true });
        console.log(`✅ User document updated in Firestore`);

        return user.uid;
      } catch (loginError) {
        console.error(
          `❌ Failed to login user ${userData.email}:`,
          loginError.message
        );
        return null;
      }
    } else {
      console.error(
        `❌ Failed to create user ${userData.email}:`,
        error.message
      );
      return null;
    }
  }
}

async function setupDemoUsers() {
  console.log("🚀 Starting Firebase user setup...\n");

  const results = [];

  for (const userData of demoUsers) {
    const uid = await createUser(userData);
    results.push({
      email: userData.email,
      role: userData.role,
      uid: uid,
      success: !!uid,
    });
    console.log(""); // Empty line for readability
  }

  console.log("📊 Setup Results:");
  console.log("================");
  results.forEach((result) => {
    if (result.success) {
      console.log(`✅ ${result.email} (${result.role}) - UID: ${result.uid}`);
    } else {
      console.log(`❌ ${result.email} (${result.role}) - Failed`);
    }
  });

  console.log("\n🎉 Setup completed!");
  console.log("\n📝 Next steps:");
  console.log("1. Update your .env file with the correct Firebase config");
  console.log("2. Run: npm start");
  console.log("3. Login with the demo credentials");
}

// Jalankan setup
setupDemoUsers().catch(console.error);
