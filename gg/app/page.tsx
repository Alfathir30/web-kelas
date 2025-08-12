"use client"

import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat...</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard user={user} /> : <LoginPage />
}
