// FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYAEn8EaP9hiKbvqkZjTCz2IbYJys9ZCM",
  authDomain: "ksa4sale-f0388.firebaseapp.com",
  projectId: "ksa4sale-f0388",
  storageBucket: "ksa4sale-f0388.firebasestorage.app",
  messagingSenderId: "494758410258",
  appId: "1:494758410258:web:a1fdadfa4df6e0f87700cb",
  measurementId: "G-5CDR4XPRYT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
