"use client"

import { useState, useEffect } from "react"
import { ref, onValue, set } from "firebase/database"
import { database } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { BookOpen, Clock, Pencil, Save } from "lucide-react"

interface LessonPeriod {
  subject: string
  teacherCode?: string
  teacherName?: string
  duration: number // number of periods
}

interface DaySchedule {
  day: string
  lessons: LessonPeriod[]
}

const teachers = {
  "02.A": "Rifai",
  "12.A-D": "Djuli Hartono",
  "16.A-C": "Bu Ika",
  "17.A": "Indri Astuti",
  "20.A": "Dina Novida",
  "21.A": "Mugajidin",
  "23.A": "Indriani",
  "27.B": "Saefi",
  "32.A": "Hadi",
  "33.B": "Indra",
  "34.A": "Irfan",
  "38.A": "Zaky",
  "39.A": "Irfan Rizwansyah",
}

const defaultLessonSchedule: DaySchedule[] = [
  {
    day: "Senin",
    lessons: [
      { subject: "Upacara", duration: 1 },
      { subject: "B.Inggris", teacherCode: "17.A", teacherName: "Indri Astuti", duration: 3 },
      { subject: "Istirahat 1", duration: 1 },
      { subject: "PABP", teacherCode: "21.A", teacherName: "Mugajidin", duration: 3 },
      { subject: "Istirahat 2", duration: 1 },
      { subject: "Penjas", teacherCode: "32.A", teacherName: "Hadi", duration: 2 },
      { subject: "Akidah Akhlak", teacherCode: "21.A", teacherName: "Mugajidin", duration: 2 },
    ],
  },
  {
    day: "Selasa",
    lessons: [
      { subject: "AIJ", teacherCode: "12.A-D", teacherName: "Djuli Hartono", duration: 3 },
      { subject: "Istirahat 1", duration: 1 },
      { subject: "AIJ", teacherCode: "12.A-D", teacherName: "Djuli Hartono", duration: 1 },
      { subject: "Sejarah", teacherCode: "23.A", teacherName: "Indriani", duration: 2 },
      { subject: "Istirahat 2", duration: 1 },
      { subject: "Tehwan", teacherCode: "33.B", teacherName: "Indra", duration: 3 },
    ],
  },
  {
    day: "Rabu",
    lessons: [
      { subject: "B. Indo", teacherCode: "16.A-C", teacherName: "Bu Ika", duration: 3 },
      { subject: "Istirahat 1", duration: 1 },
      { subject: "TLJ", teacherCode: "34.A", teacherName: "Irfan", duration: 3 },
      { subject: "Istirahat 2", duration: 1 },
      { subject: "ASJ", teacherCode: "38.A", teacherName: "Zaky", duration: 3 },
    ],
  },
  {
    day: "Kamis",
    lessons: [
      { subject: "Al-Quran", teacherCode: "21.A", teacherName: "Mugajidin", duration: 2 },
      { subject: "PPKn", teacherCode: "20.A", teacherName: "Dina Novida", duration: 1 },
      { subject: "Istirahat 1", duration: 1 },
      { subject: "PPKn", teacherCode: "20.A", teacherName: "Dina Novida", duration: 1 },
      { subject: "Sunda", teacherCode: "27.B", teacherName: "Saefi", duration: 2 },
      { subject: "Istirahat 2", duration: 1 },
      { subject: "Coding", teacherCode: "39.A", teacherName: "Irfan Rizwansyah", duration: 3 },
    ],
  },
  {
    day: "Jumat",
    lessons: [
      { subject: "MTK", teacherCode: "02.A", teacherName: "Rifai", duration: 3 },
      { subject: "Istirahat 1", duration: 1 },
      { subject: "PKK", duration: 3 },
    ],
  },
]

export function LessonSchedule() {
  const { user } = useAuth()
  const [lessonSchedule, setLessonSchedule] = useState<DaySchedule[]>(defaultLessonSchedule)
  const [editingDay, setEditingDay] = useState<DaySchedule | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const lessonRef = ref(database, "lessonSchedule")

    // Load from localStorage first
    const savedData = localStorage.getItem("lessonSchedule")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setLessonSchedule(parsedData)
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }

    // Listen to Firebase changes
    const unsubscribe = onValue(
      lessonRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setLessonSchedule(data)
          localStorage.setItem("lessonSchedule", JSON.stringify(data))
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Firebase error:", error)
        setIsLoading(false)
        toast({
          title: "Gagal memuat jadwal pelajaran",
          description: "Menggunakan data offline",
          variant: "destructive",
        })
      },
    )

    return () => unsubscribe()
  }, [])

  const handleSaveDay = async (updatedDay: DaySchedule) => {
    try {
      const updatedSchedule = lessonSchedule.map((day) => (day.day === updatedDay.day ? updatedDay : day))

      setLessonSchedule(updatedSchedule)
      setEditingDay(null)

      // Save to localStorage
      localStorage.setItem("lessonSchedule", JSON.stringify(updatedSchedule))

      // Save to Firebase
      const lessonRef = ref(database, "lessonSchedule")
      await set(lessonRef, updatedSchedule)

      toast({
        title: "Berhasil disimpan",
        description: `Jadwal ${updatedDay.day} telah diperbarui`,
      })
    } catch (error) {
      console.error("Error saving lesson schedule:", error)
      toast({
        title: "Gagal menyimpan",
        description: "Data disimpan secara offline",
        variant: "destructive",
      })
    }
  }

  const getSubjectColor = (subject: string) => {
    if (subject.includes("Istirahat")) return "bg-green-100 text-green-800"
    if (subject === "Upacara") return "bg-red-100 text-red-800"
    return "bg-blue-100 text-blue-800"
  }

  const EditDayDialog = ({ day }: { day: DaySchedule }) => {
    const [editData, setEditData] = useState(day)

    const updateLesson = (index: number, field: keyof LessonPeriod, value: any) => {
      const updatedLessons = [...editData.lessons]
      updatedLessons[index] = { ...updatedLessons[index], [field]: value }

      // Auto-fill teacher name when teacher code is selected
      if (field === "teacherCode" && value) {
        updatedLessons[index].teacherName = teachers[value as keyof typeof teachers]
      }

      setEditData({ ...editData, lessons: updatedLessons })
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2 bg-transparent">
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Jadwal {day.day}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editData.lessons.map((lesson, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Mata Pelajaran</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      value={lesson.subject}
                      onChange={(e) => updateLesson(index, "subject", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Durasi (JP)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      value={lesson.duration}
                      onChange={(e) => updateLesson(index, "duration", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Kode Guru</label>
                  <Select
                    value={lesson.teacherCode || ""}
                    onValueChange={(value) => updateLesson(index, "teacherCode", value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Pilih guru" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(teachers).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {code} - {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            <Button onClick={() => handleSaveDay(editData)} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Simpan Jadwal
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
            <BookOpen className="w-5 h-5" />
            Jadwal Pelajaran
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
          <BookOpen className="w-5 h-5" />
          Jadwal Pelajaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lessonSchedule.map((daySchedule) => (
            <div key={daySchedule.day} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900">{daySchedule.day}</h3>
                {user && <EditDayDialog day={daySchedule} />}
              </div>
              <div className="space-y-2">
                {daySchedule.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border">
                    <div className="flex items-center gap-3">
                      <Badge className={getSubjectColor(lesson.subject)}>
                        <Clock className="w-3 h-3 mr-1" />
                        {lesson.duration} JP
                      </Badge>
                      <span className="font-medium">{lesson.subject}</span>
                    </div>
                    {lesson.teacherCode && (
                      <div className="text-sm text-gray-600">
                        {lesson.teacherCode} - {lesson.teacherName}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!user && <p className="text-center text-gray-500 text-sm mt-4">Masuk untuk mengedit jadwal pelajaran</p>}
      </CardContent>
    </Card>
  )
}
