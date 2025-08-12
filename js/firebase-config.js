// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnWBIil8PKjFXoPRXI4NtgAv6mVNkL89s",
  authDomain: "tkj2-2db1e.firebaseapp.com",
  databaseURL: "https://tkj2-2db1e-default-rtdb.firebaseio.com",
  projectId: "tkj2-2db1e",
  storageBucket: "tkj2-2db1e.firebasestorage.app",
  messagingSenderId: "1017107912057",
  appId: "1:1017107912057:web:0754a2adc6d4b686bc8ba8",
  measurementId: "G-440VKHG02X"
}

// Validasi config
function validateFirebaseConfig() {
  const requiredFields = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"]
  const missingFields = []

  for (const field of requiredFields) {
    if (
      !firebaseConfig[field] ||
      firebaseConfig[field].includes("...") ||
      firebaseConfig[field] === "kelas-tkj2" ||
      firebaseConfig[field] === "123456789"
    ) {
      missingFields.push(field)
    }
  }

  if (missingFields.length > 0) {
    console.error("❌ Firebase Config Error: Harap ganti placeholder values untuk:", missingFields)
    alert(
      `⚠️ Firebase belum dikonfigurasi!\n\nHarap ganti nilai placeholder di file js/firebase-config.js untuk:\n${missingFields.join(", ")}\n\nLihat console untuk detail lebih lanjut.`,
    )
    return false
  }

  console.log("✅ Firebase config validation passed")
  return true
}

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

let app, db

try {
  if (!validateFirebaseConfig()) {
    throw new Error("Firebase configuration is invalid")
  }

  console.log("🔥 Initializing Firebase...")
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  console.log("✅ Firebase initialized successfully")

  // Test connection
  console.log("🔍 Testing Firestore connection...")
} catch (error) {
  console.error("❌ Firebase initialization failed:", error)
  alert("❌ Gagal menginisialisasi Firebase. Periksa console untuk detail error.")
}

// Export untuk digunakan di file lain
window.firebaseDB = db
window.firebaseUtils = {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
}

window.firebaseReady = !!db
console.log("Firebase ready status:", window.firebaseReady)
