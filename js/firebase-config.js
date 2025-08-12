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

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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
