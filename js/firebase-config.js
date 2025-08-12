// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDp7hrxSE0V9vmQWE7d0jl4xllQViNmNjQ",
    authDomain: "webkelas-1f013.firebaseapp.com",
    projectId: "webkelas-1f013",
    storageBucket: "webkelas-1f013.firebasestorage.app",
    messagingSenderId: "479528175775",
    appId: "1:479528175775:web:0d1f9a1b9f1e91e907baaa",
    measurementId: "G-LK85T5W7EK"
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

window.firebaseDB = db
window.firebaseReady = !!db
console.log("Firebase ready status:", window.firebaseReady)
