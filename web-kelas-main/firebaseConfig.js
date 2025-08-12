// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE6ZBC9OZQomhNYa2s26kdna2gVtOitiI",
  authDomain: "webkelas-1f013.firebaseapp.com",
  projectId: "webkelas-1f013",
  storageBucket: "webkelas-1f013.firebasestorage.app",
  messagingSenderId: "479528175775",
  appId: "1:479528175775:web:333be78ef70f19ac07baaa",
  measurementId: "G-HZDNBT8N6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);