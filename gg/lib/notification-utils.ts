"use client"

import { ref, push, set } from "firebase/database"
import { database } from "@/lib/firebase"
import type { User } from "firebase/auth"

interface NotificationData {
  type: "assignment" | "schedule" | "structure"
  title: string
  message: string
  timestamp: string
  userId: string
  userName: string
}

export const sendNotification = async (user: User, type: NotificationData["type"], title: string, message: string) => {
  try {
    const notificationsRef = ref(database, "notifications")
    const newNotificationRef = push(notificationsRef)

    const notification: NotificationData = {
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      userId: user.uid,
      userName: user.displayName || user.email || "Unknown User",
    }

    await set(newNotificationRef, notification)

    // Clean up old notifications (keep only last 50)
    const allNotificationsRef = ref(database, "notifications")
    // Note: In a real app, you'd implement cleanup logic here
  } catch (error) {
    console.error("Error sending notification:", error)
  }
}
