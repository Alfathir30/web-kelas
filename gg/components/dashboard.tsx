"use client"

import type { User } from "firebase/auth"
import { Header } from "@/components/header"
import { ClassStructure } from "@/components/class-structure"
import { PiketSchedule } from "@/components/piket-schedule"
import { LessonSchedule } from "@/components/lesson-schedule"
import { AssignmentSystem } from "@/components/assignment-system"
import { RealTimeNotifications } from "@/components/real-time-notifications"

interface DashboardProps {
  user: User
}

export function Dashboard({ user }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <RealTimeNotifications />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Website Kelas TKJ</h1>
          <p className="text-gray-600">Sistem Informasi Kelas Teknik Komputer dan Jaringan</p>
        </div>

        <ClassStructure />
        <PiketSchedule />
        <LessonSchedule />
        <AssignmentSystem />
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Kelas TKJ</h3>
          <p className="text-gray-400">SMK Negeri - Tahun Ajaran 2024/2025</p>
        </div>
      </footer>
    </div>
  )
}
