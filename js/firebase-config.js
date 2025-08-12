// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Ganti dengan API key Anda
  authDomain: "kelas-tkj2.firebaseapp.com", // Ganti dengan auth domain Anda
  projectId: "kelas-tkj2", // Ganti dengan project ID Anda
  storageBucket: "kelas-tkj2.appspot.com", // Ganti dengan storage bucket Anda
  messagingSenderId: "123456789", // Ganti dengan messaging sender ID Anda
  appId: "1:123456789:web:abc123", // Ganti dengan app ID Anda
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

// Initialize Firebase menggunakan compat SDK
let app, db
const firebase = window.firebase // Declare the firebase variable

try {
  if (!validateFirebaseConfig()) {
    throw new Error("Firebase configuration is invalid")
  }

  console.log("🔥 Initializing Firebase...")

  firebase.initializeApp(firebaseConfig)
  db = firebase.firestore()

  console.log("✅ Firebase initialized successfully")

  // Test connection
  console.log("🔍 Testing Firestore connection...")
} catch (error) {
  console.error("❌ Firebase initialization failed:", error)
  alert("❌ Gagal menginisialisasi Firebase. Periksa console untuk detail error.")
}

// Global variables untuk digunakan di file lain
window.firebaseDB = db
window.firebaseReady = !!db
console.log("Firebase ready status:", window.firebaseReady)
