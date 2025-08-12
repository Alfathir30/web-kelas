"use client"

import { useState, useEffect } from "react"
import { ref, onValue, off } from "firebase/database"
import { database } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/hooks/use-toast"
import { Bell, BookOpen, Calendar, Users } from "lucide-react"

interface NotificationData {
  type: "assignment" | "schedule" | "structure"
  title: string
  message: string
  timestamp: string
  userId: string
  userName: string
}

export function RealTimeNotifications() {
  const { user } = useAuth()
  const [lastNotificationTime, setLastNotificationTime] = useState<number>(Date.now())

  useEffect(() => {
    if (!user) return

    const notificationsRef = ref(database, "notifications")

    const handleNotifications = (snapshot: any) => {
      const data = snapshot.val()
      if (!data) return

      const notifications = Object.values(data) as NotificationData[]
      const recentNotifications = notifications.filter(
        (notification) =>
          new Date(notification.timestamp).getTime() > lastNotificationTime && notification.userId !== user.uid, // Don't show notifications for own actions
      )

      recentNotifications.forEach((notification) => {
        const icon = getNotificationIcon(notification.type)
        toast({
          title: notification.title,
          description: `${notification.message} - oleh ${notification.userName}`,
          duration: 5000,
        })
      })

      if (recentNotifications.length > 0) {
        setLastNotificationTime(Date.now())
      }
    }

    onValue(notificationsRef, handleNotifications)

    return () => {
      off(notificationsRef, "value", handleNotifications)
    }
  }, [user, lastNotificationTime])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <BookOpen className="w-4 h-4" />
      case "schedule":
        return <Calendar className="w-4 h-4" />
      case "structure":
        return <Users className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return null // This component only handles notifications, no UI
}
