"use client"

import { useState, useEffect } from "react"
import { ref, onValue, set } from "firebase/database"
import { database } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Calendar, Pencil, Save, Users } from "lucide-react"

interface PiketDay {
  day: string
  students: string[]
}

const defaultPiketSchedule: PiketDay[] = [
  {
    day: "Senin",
    students: ["Alip", "Asri", "Bunga", "Rofif", "Rizka", "Lexa", "Baik", "Aji"],
  },
  {
    day: "Selasa",
    students: ["Fakhri H", "Yusuf", "Natasya", "Sella", "Faiz", "Arumi", "Ardi", "Sona"],
  },
  {
    day: "Rabu",
    students: ["Gani", "Raihan", "Icad", "Kia", "Sri", "Ica", "Ayu"],
  },
  {
    day: "Kamis",
    students: ["Citra", "Ghiwen", "Mulyadi", "Alwan", "Rofi", "Lia", "Fahri S"],
  },
  {
    day: "Jumat",
    students: ["Ian", "Kela", "Eldo", "Ninda", "Dara", "Sahet"],
  },
]

export function PiketSchedule() {
  const { user } = useAuth()
  const [piketSchedule, setPiketSchedule] = useState<PiketDay[]>(defaultPiketSchedule)
  const [editingDay, setEditingDay] = useState<PiketDay | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const piketRef = ref(database, "piketSchedule")

    // Load from localStorage first
    const savedData = localStorage.getItem("piketSchedule")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setPiketSchedule(parsedData)
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }

    // Listen to Firebase changes
    const unsubscribe = onValue(
      piketRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setPiketSchedule(data)
          localStorage.setItem("piketSchedule", JSON.stringify(data))
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Firebase error:", error)
        setIsLoading(false)
        toast({
          title: "Gagal memuat jadwal piket",
          description: "Menggunakan data offline",
          variant: "destructive",
        })
      },
    )

    return () => unsubscribe()
  }, [])

  const handleSaveDay = async (updatedDay: PiketDay) => {
    try {
      const updatedSchedule = piketSchedule.map((day) => (day.day === updatedDay.day ? updatedDay : day))

      setPiketSchedule(updatedSchedule)
      setEditingDay(null)

      // Save to localStorage
      localStorage.setItem("piketSchedule", JSON.stringify(updatedSchedule))

      // Save to Firebase
      const piketRef = ref(database, "piketSchedule")
      await set(piketRef, updatedSchedule)

      toast({
        title: "Berhasil disimpan",
        description: `Jadwal piket ${updatedDay.day} telah diperbarui`,
      })
    } catch (error) {
      console.error("Error saving piket schedule:", error)
      toast({
        title: "Gagal menyimpan",
        description: "Data disimpan secara offline",
        variant: "destructive",
      })
    }
  }

  const EditDayDialog = ({ day }: { day: PiketDay }) => {
    const [editData, setEditData] = useState({
      ...day,
      studentsText: day.students.join(", "),
    })

    const handleSave = () => {
      const students = editData.studentsText
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0)

      handleSaveDay({
        day: day.day,
        students,
      })
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2 bg-transparent">
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Jadwal Piket {day.day}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nama Siswa (pisahkan dengan koma)</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md resize-none"
                rows={4}
                value={editData.studentsText}
                onChange={(e) => setEditData({ ...editData, studentsText: e.target.value })}
                placeholder="Nama1, Nama2, Nama3..."
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Jadwal Piket Kelas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Jadwal Piket Kelas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {piketSchedule.map((daySchedule) => (
            <div key={daySchedule.day} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{daySchedule.day}</h3>
                {user && <EditDayDialog day={daySchedule} />}
              </div>
              <div className="flex flex-wrap gap-2">
                {daySchedule.students.map((student, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    <Users className="w-3 h-3 mr-1" />
                    {student}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Total: {daySchedule.students.length} siswa</p>
            </div>
          ))}
        </div>

        {!user && <p className="text-center text-gray-500 text-sm mt-4">Masuk untuk mengedit jadwal piket</p>}
      </CardContent>
    </Card>
  )
}
