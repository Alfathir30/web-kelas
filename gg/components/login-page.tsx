"use client"

import { useState } from "react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isFirebaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Konfigurasi Firebase Diperlukan</CardTitle>
            <CardDescription className="text-gray-600">Website belum dikonfigurasi dengan Firebase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Untuk menggunakan website ini, Anda perlu menambahkan environment variables Firebase di Project
                Settings:
                <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                  <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
                  <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
                  <li>NEXT_PUBLIC_FIREBASE_DATABASE_URL</li>
                  <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                  <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
                  <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
                  <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account",
      })

      const result = await signInWithPopup(auth, provider)

      if (result.user) {
        toast({
          title: "Berhasil masuk!",
          description: `Selamat datang, ${result.user.displayName || result.user.email}`,
        })
      }
    } catch (error: any) {
      console.error("Error signing in:", error)

      let errorMessage = "Terjadi kesalahan saat masuk. Silakan coba lagi."

      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login dibatalkan. Silakan coba lagi."
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup diblokir browser. Silakan izinkan popup dan coba lagi."
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Tidak ada koneksi internet. Periksa koneksi Anda."
      } else if (error.code === "auth/invalid-api-key") {
        errorMessage = "Konfigurasi Firebase tidak valid. Hubungi administrator."
      }

      setError(errorMessage)
      toast({
        title: "Gagal masuk",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Website Kelas TKJ</CardTitle>
          <CardDescription className="text-gray-600">Masuk untuk mengakses informasi kelas dan jadwal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            size="lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Memuat...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Masuk dengan Google
              </div>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Hanya siswa dan guru yang terdaftar yang dapat mengakses sistem ini
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
