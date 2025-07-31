import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyBw5vhUlrof-JL1BRQARoyVANl2sn4xmyA",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "finapp-c956b.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "finapp-c956b",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "finapp-c956b.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "523617760047",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:523617760047:web:e1529de24b807ee688a7da",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
