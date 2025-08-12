"use client"

import { useState, useEffect } from "react"
import { ref, onDisconnect, onValue, serverTimestamp, set } from "firebase/database"
import { database } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Users, Clock } from "lucide-react"

export function ConnectionStatus() {
  const { user } = useAuth()
  const [isOnline, setIsOnline] = useState(true)
  const [activeUsers, setActiveUsers] = useState<number>(0)
  const [lastSync, setLastSync] = useState<Date | null>(null)

  useEffect(() => {
    // Monitor browser online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Monitor Firebase connection
    const connectedRef = ref(database, ".info/connected")
    const unsubscribeConnection = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        setIsOnline(true)
        setLastSync(new Date())
      } else {
        setIsOnline(false)
      }
    })

    // Track active users if user is logged in
    let unsubscribeUsers: (() => void) | null = null
    if (user) {
      const userStatusRef = ref(database, `presence/${user.uid}`)
      const usersRef = ref(database, "presence")

      // Set user as online
      set(userStatusRef, {
        name: user.displayName || user.email,
        lastSeen: serverTimestamp(),
        online: true,
      })

      // Remove user when they disconnect
      onDisconnect(userStatusRef).remove()

      // Monitor active users count
      unsubscribeUsers = onValue(usersRef, (snapshot) => {
        const users = snapshot.val()
        if (users) {
          const activeCount = Object.values(users).filter((user: any) => user.online).length
          setActiveUsers(activeCount)
        }
      })
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      unsubscribeConnection()
      if (unsubscribeUsers) unsubscribeUsers()
    }
  }, [user])

  return (
    <div className="flex items-center gap-2 text-sm">
      <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        {isOnline ? "Online" : "Offline"}
      </Badge>

      {user && activeUsers > 0 && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {activeUsers} aktif
        </Badge>
      )}

      {lastSync && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Sync: {lastSync.toLocaleTimeString()}
        </Badge>
      )}
    </div>
  )
}
