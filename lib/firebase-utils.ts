"use client"

import { ref, set, onValue } from "firebase/database"
import { database } from "@/lib/firebase"
import { sendNotification } from "@/lib/notification-utils"
import type { User } from "firebase/auth"

export interface FirebaseData {
  classStructure?: any[]
  piketSchedule?: any
  lessonSchedule?: any
  assignments?: any[]
}

// Generic function to save data to Firebase with offline support and notifications
export const saveToFirebase = async (
  path: string,
  data: any,
  user?: User,
  notificationType?: string,
  notificationMessage?: string,
) => {
  try {
    const dataRef = ref(database, path)
    await set(dataRef, data)

    // Also save to localStorage for offline access
    localStorage.setItem(path, JSON.stringify(data))

    // Send notification if specified
    if (user && notificationType && notificationMessage) {
      await sendNotification(user, notificationType as any, getNotificationTitle(notificationType), notificationMessage)
    }

    return { success: true }
  } catch (error) {
    console.error(`Error saving to Firebase (${path}):`, error)

    // Save to localStorage as fallback
    localStorage.setItem(path, JSON.stringify(data))
    localStorage.setItem(`${path}_offline`, "true")

    return { success: false, error }
  }
}

// Generic function to load data from Firebase with offline fallback
export const loadFromFirebase = (path: string, callback: (data: any) => void) => {
  const dataRef = ref(database, path)

  // Try to load from localStorage first
  const savedData = localStorage.getItem(path)
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      callback(parsedData)
    } catch (error) {
      console.error("Error parsing localStorage data:", error)
    }
  }

  // Listen to Firebase changes
  const unsubscribe = onValue(
    dataRef,
    (snapshot) => {
      const data = snapshot.val()
      if (data) {
        callback(data)
        localStorage.setItem(path, JSON.stringify(data))
        localStorage.removeItem(`${path}_offline`)
      }
    },
    (error) => {
      console.error(`Firebase error (${path}):`, error)
    },
  )

  return unsubscribe
}

// Helper function for notification titles
const getNotificationTitle = (type: string) => {
  switch (type) {
    case "assignment":
      return "Tugas Baru"
    case "schedule":
      return "Jadwal Diperbarui"
    case "structure":
      return "Struktur Kelas Diperbarui"
    default:
      return "Pembaruan Data"
  }
}

// Function to sync offline data when connection is restored
export const syncOfflineData = async () => {
  const offlineKeys = Object.keys(localStorage).filter((key) => key.endsWith("_offline"))

  for (const offlineKey of offlineKeys) {
    const path = offlineKey.replace("_offline", "")
    const data = localStorage.getItem(path)

    if (data) {
      try {
        const parsedData = JSON.parse(data)
        await saveToFirebase(path, parsedData)
        localStorage.removeItem(offlineKey)
      } catch (error) {
        console.error(`Error syncing offline data for ${path}:`, error)
      }
    }
  }
}
