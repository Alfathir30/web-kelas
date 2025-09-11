// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE6ZBC9OZQomhNYa2s26kdna2gVtOitiI",
  authDomain: "webkelas-1f013.firebaseapp.com",
  databaseURL: "https://webkelas-1f013-default-rtdb.firebaseio.com",
  projectId: "webkelas-1f013",
  storageBucket: "webkelas-1f013.firebasestorage.app",
  messagingSenderId: "479528175775",
  appId: "1:479528175775:web:333be78ef70f19ac07baaa",
  measurementId: "G-HZDNBT8N6G"
};

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
