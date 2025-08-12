import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if all required environment variables are present
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`)

if (missingVars.length > 0) {
  console.error("Missing Firebase environment variables:", missingVars.join(", "))
  console.error("Please add these variables to your environment configuration.")
}

let app: any = null
let auth: any = null
let database: any = null

if (missingVars.length === 0) {
  try {
    app = initializeApp(requiredEnvVars)
    auth = getAuth(app)
    database = getDatabase(app)
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
}

export { auth, database }

export const isFirebaseConfigured = () => {
  return missingVars.length === 0 && app !== null
}
