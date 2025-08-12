"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useTugas } from "@/hooks/use-tugas"
import { Calendar, BookOpen, Trash2, Clock, AlertCircle } from "lucide-react"
import { format, isBefore, addDays } from "date-fns"
import { id } from "date-fns/locale"

interface TugasListProps {
  showDeleteButton?: boolean
}

export function TugasList({ showDeleteButton = false }: TugasListProps) {
  const { tugas, loading, hapusTugas } = useTugas()

  if (loading) {
    return <LoadingSpinner />
  }

  if (tugas.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4 animate-pulse-slow" />
        <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Tugas</h3>
        <p className="text-slate-300">Tugas akan muncul di sini ketika guru memberikan tugas baru</p>
      </div>
    )
  }

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      try {
        await hapusTugas(id)
      } catch (error) {
        alert("Gagal menghapus tugas")
      }
    }
  }

  const getDeadlineStatus = (deadline: Date) => {
    const now = new Date()
    const tomorrow = addDays(now, 1)

    if (isBefore(deadline, now)) {
      return { status: "overdue", color: "border-red-500 text-red-400", icon: AlertCircle }
    } else if (isBefore(deadline, tomorrow)) {
      return { status: "urgent", color: "border-orange-500 text-orange-400", icon: Clock }
    } else {
      return { status: "normal", color: "border-green-500 text-green-400", icon: Clock }
    }
  }

  return (
    <div className="space-y-4">
      {tugas.map((item, index) => {
        const deadlineInfo = getDeadlineStatus(item.deadline)
        const DeadlineIcon = deadlineInfo.icon

        return (
          <Card
            key={item.id}
            className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-3">{item.judul}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {item.mataPelajaran}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500 text-purple-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.hari}
                    </Badge>
                    <Badge variant="outline" className={deadlineInfo.color}>
                      <DeadlineIcon className="h-3 w-3 mr-1" />
                      {deadlineInfo.status === "overdue"
                        ? "Terlambat"
                        : deadlineInfo.status === "urgent"
                          ? "Mendesak"
                          : "Normal"}
                    </Badge>
                  </div>
                </div>
                {showDeleteButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white ml-4 focus-ring"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {item.deskripsi && <p className="text-slate-300 mb-4 leading-relaxed">{item.deskripsi}</p>}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="h-4 w-4" />
                <span>Deadline: {format(item.deadline, "EEEE, dd MMMM yyyy", { locale: id })}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
