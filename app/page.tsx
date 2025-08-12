"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JadwalPiket } from "@/components/jadwal-piket"
import { JadwalPelajaran } from "@/components/jadwal-pelajaran"
import { DaftarGuru } from "@/components/daftar-guru"
import { TugasList } from "@/components/tugas-list"
import { MobileNav } from "@/components/mobile-nav"
import { ScrollToTop } from "@/components/scroll-to-top"
import {
  Users,
  Calendar,
  BookOpen,
  Settings,
  Monitor,
  Wifi,
  Server,
  Code,
  GraduationCap,
  Clock,
  User,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in-left">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Kelas 11 TKJ2</h1>
                <p className="text-sm text-slate-300">Teknik Komputer dan Jaringan</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6 animate-fade-in-right">
              <a href="#struktur" className="text-slate-300 hover:text-white transition-colors focus-ring rounded">
                Struktur Kelas
              </a>
              <a href="#piket" className="text-slate-300 hover:text-white transition-colors focus-ring rounded">
                Piket
              </a>
              <a href="#jadwal" className="text-slate-300 hover:text-white transition-colors focus-ring rounded">
                Jadwal
              </a>
              <a href="#tugas" className="text-slate-300 hover:text-white transition-colors focus-ring rounded">
                Tugas
              </a>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="focus-ring bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </nav>
            {/* Added mobile navigation */}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gradient-text">Kelas 11 TKJ2</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Membangun masa depan digital melalui teknologi komputer dan jaringan
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
              <Badge variant="secondary" className="px-3 sm:px-4 py-2 text-sm animate-fade-in-up delay-200">
                <Monitor className="h-4 w-4 mr-2" />
                Hardware
              </Badge>
              <Badge variant="secondary" className="px-3 sm:px-4 py-2 text-sm animate-fade-in-up delay-300">
                <Wifi className="h-4 w-4 mr-2" />
                Networking
              </Badge>
              <Badge variant="secondary" className="px-3 sm:px-4 py-2 text-sm animate-fade-in-up delay-400">
                <Server className="h-4 w-4 mr-2" />
                Server
              </Badge>
              <Badge variant="secondary" className="px-3 sm:px-4 py-2 text-sm animate-fade-in-up delay-500">
                <Code className="h-4 w-4 mr-2" />
                Programming
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Kelas */}
      <section id="struktur" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Struktur Kelas</h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Pengurus kelas yang bertanggung jawab mengorganisir kegiatan pembelajaran
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Wali Kelas */}
            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up delay-100">
              <CardHeader className="text-center">
                <Avatar className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                  <AvatarImage src="/diverse-classroom-teacher.png" />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">SF</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-lg sm:text-xl">Saefi</CardTitle>
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Wali Kelas
                </Badge>
              </CardHeader>
            </Card>

            {/* Ketua Kelas */}
            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up delay-200">
              <CardHeader className="text-center">
                <Avatar className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder-43pfg.png" />
                  <AvatarFallback className="bg-green-600 text-white text-lg">RR</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-lg sm:text-xl">Rofi Rijal</CardTitle>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <User className="h-3 w-3 mr-1" />
                  Ketua Kelas
                </Badge>
              </CardHeader>
            </Card>

            {/* Sekretaris */}
            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up delay-300">
              <CardHeader className="text-center">
                <Avatar className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                  <AvatarImage src="/secretary-student.png" />
                  <AvatarFallback className="bg-purple-600 text-white text-lg">S</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-lg sm:text-xl">Sekretaris</CardTitle>
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Sekretaris
                </Badge>
              </CardHeader>
            </Card>

            {/* Bendahara */}
            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up delay-400">
              <CardHeader className="text-center">
                <Avatar className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder-rm3e0.png" />
                  <AvatarFallback className="bg-orange-600 text-white text-lg">B</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-lg sm:text-xl">Bendahara</CardTitle>
                <Badge variant="outline" className="border-orange-500 text-orange-400">
                  <Users className="h-3 w-3 mr-1" />
                  Bendahara
                </Badge>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-left">
              <CardContent className="p-6 text-center">
                <Users className="h-10 sm:h-12 w-10 sm:w-12 text-blue-400 mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">32 Siswa</h3>
                <p className="text-slate-300 text-sm sm:text-base">Total siswa aktif</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up delay-100">
              <CardContent className="p-6 text-center">
                <Calendar className="h-10 sm:h-12 w-10 sm:w-12 text-green-400 mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">5 Hari</h3>
                <p className="text-slate-300 text-sm sm:text-base">Jadwal pembelajaran</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-right delay-200 sm:col-span-2 md:col-span-1">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 sm:h-12 w-10 sm:w-12 text-purple-400 mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">8 Jam</h3>
                <p className="text-slate-300 text-sm sm:text-base">Jam pelajaran per hari</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <JadwalPiket />

      <JadwalPelajaran />

      <DaftarGuru />

      {/* Tugas section */}
      <section id="tugas" className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Tugas Kelas</h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Daftar tugas yang harus dikerjakan siswa
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TugasList />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4 no-print">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 animate-fade-in-up">
            <Monitor className="h-5 w-5 text-blue-400" />
            <span className="text-white font-semibold">Kelas 11 TKJ2</span>
          </div>
          <p className="text-slate-400 text-sm sm:text-base">
            © 2024 Kelas 11 TKJ2. Membangun masa depan melalui teknologi.
          </p>
        </div>
      </footer>

      {/* Added scroll to top button */}
      <ScrollToTop />
    </div>
  )
}
