"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ref, onValue, set, push, remove } from "firebase/database"
import { database } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { BookOpen, Calendar, Clock, Plus, Trash2, Edit } from "lucide-react"
import { format, parseISO, isBefore, addDays } from "date-fns"
import { id } from "date-fns/locale"

interface Assignment {
  id: string
  title: string
  subject: string
  description?: string
  dueDate: string
  dueTime?: string
  priority: "low" | "medium" | "high"
  status: "pending" | "completed"
  createdAt: string
  createdBy: string
  createdByName: string
}

const subjects = [
  "B.Inggris",
  "PABP",
  "Penjas",
  "Akidah Akhlak",
  "AIJ",
  "Sejarah",
  "Tehwan",
  "B. Indo",
  "TLJ",
  "ASJ",
  "Al-Quran",
  "PPKn",
  "Sunda",
  "Coding",
  "MTK",
  "PKK",
]

const priorities = {
  low: { label: "Rendah", color: "bg-gray-100 text-gray-800" },
  medium: { label: "Sedang", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "Tinggi", color: "bg-red-100 text-red-800" },
}

export function AssignmentSystem() {
  const { user } = useAuth()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  useEffect(() => {
    const assignmentsRef = ref(database, "assignments")

    // Load from localStorage first
    const savedData = localStorage.getItem("assignments")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setAssignments(parsedData)
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }

    // Listen to Firebase changes
    const unsubscribe = onValue(
      assignmentsRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const assignmentsList = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }))
          // Sort by due date and priority
          assignmentsList.sort((a, b) => {
            const dateA = new Date(a.dueDate)
            const dateB = new Date(b.dueDate)
            if (dateA.getTime() === dateB.getTime()) {
              const priorityOrder = { high: 3, medium: 2, low: 1 }
              return priorityOrder[b.priority] - priorityOrder[a.priority]
            }
            return dateA.getTime() - dateB.getTime()
          })
          setAssignments(assignmentsList)
          localStorage.setItem("assignments", JSON.stringify(assignmentsList))
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Firebase error:", error)
        setIsLoading(false)
        toast({
          title: "Gagal memuat tugas",
          description: "Menggunakan data offline",
          variant: "destructive",
        })
      },
    )

    return () => unsubscribe()
  }, [])

  const handleAddAssignment = async (
    assignmentData: Omit<Assignment, "id" | "createdAt" | "createdBy" | "createdByName">,
  ) => {
    if (!user) return

    try {
      const newAssignment: Omit<Assignment, "id"> = {
        ...assignmentData,
        createdAt: new Date().toISOString(),
        createdBy: user.uid,
        createdByName: user.displayName || user.email || "Unknown",
      }

      const assignmentsRef = ref(database, "assignments")
      const newAssignmentRef = push(assignmentsRef)
      await set(newAssignmentRef, newAssignment)

      setShowAddDialog(false)
      toast({
        title: "Tugas berhasil ditambahkan",
        description: `${assignmentData.title} telah ditambahkan ke daftar tugas`,
      })
    } catch (error) {
      console.error("Error adding assignment:", error)
      toast({
        title: "Gagal menambahkan tugas",
        description: "Data disimpan secara offline",
        variant: "destructive",
      })
    }
  }

  const handleUpdateAssignment = async (updatedAssignment: Assignment) => {
    try {
      const assignmentRef = ref(database, `assignments/${updatedAssignment.id}`)
      const { id, ...assignmentData } = updatedAssignment
      await set(assignmentRef, assignmentData)

      setEditingAssignment(null)
      toast({
        title: "Tugas berhasil diperbarui",
        description: `${updatedAssignment.title} telah diperbarui`,
      })
    } catch (error) {
      console.error("Error updating assignment:", error)
      toast({
        title: "Gagal memperbarui tugas",
        description: "Data disimpan secara offline",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      const assignmentRef = ref(database, `assignments/${assignmentId}`)
      await remove(assignmentRef)

      toast({
        title: "Tugas berhasil dihapus",
        description: "Tugas telah dihapus dari daftar",
      })
    } catch (error) {
      console.error("Error deleting assignment:", error)
      toast({
        title: "Gagal menghapus tugas",
        description: "Terjadi kesalahan saat menghapus",
        variant: "destructive",
      })
    }
  }

  const toggleAssignmentStatus = async (assignment: Assignment) => {
    const updatedAssignment = {
      ...assignment,
      status: assignment.status === "pending" ? "completed" : "pending",
    } as Assignment

    await handleUpdateAssignment(updatedAssignment)
  }

  const getFilteredAssignments = () => {
    return assignments.filter((assignment) => {
      if (filter === "all") return true
      return assignment.status === filter
    })
  }

  const getAssignmentStatusColor = (assignment: Assignment) => {
    if (assignment.status === "completed") return "bg-green-100 text-green-800"

    const dueDate = new Date(assignment.dueDate)
    const today = new Date()
    const tomorrow = addDays(today, 1)

    if (isBefore(dueDate, today)) return "bg-red-100 text-red-800" // Overdue
    if (isBefore(dueDate, tomorrow)) return "bg-orange-100 text-orange-800" // Due today
    return "bg-blue-100 text-blue-800" // Upcoming
  }

  const AssignmentForm = ({ assignment, onSubmit }: { assignment?: Assignment; onSubmit: (data: any) => void }) => {
    const [formData, setFormData] = useState({
      title: assignment?.title || "",
      subject: assignment?.subject || "",
      description: assignment?.description || "",
      dueDate: assignment?.dueDate || "",
      dueTime: assignment?.dueTime || "",
      priority: assignment?.priority || "medium",
      status: assignment?.status || "pending",
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.title || !formData.subject || !formData.dueDate) {
        toast({
          title: "Data tidak lengkap",
          description: "Mohon isi semua field yang wajib",
          variant: "destructive",
        })
        return
      }
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Judul Tugas *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Contoh: Mengerjakan soal halaman 25-30"
            required
          />
        </div>

        <div>
          <Label htmlFor="subject">Mata Pelajaran *</Label>
          <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih mata pelajaran" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dueDate">Tanggal Deadline *</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="dueTime">Jam Deadline</Label>
            <Input
              id="dueTime"
              type="time"
              value={formData.dueTime}
              onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="priority">Prioritas</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(priorities).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Deskripsi (opsional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detail tambahan tentang tugas..."
            rows={3}
          />
        </div>

        {assignment && (
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Belum Selesai</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button type="submit" className="w-full">
          {assignment ? "Perbarui Tugas" : "Tambah Tugas"}
        </Button>
      </form>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Daftar PR & Tugas
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

  const filteredAssignments = getFilteredAssignments()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Daftar PR & Tugas
          </CardTitle>
          {user && (
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Tugas
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Tambah Tugas Baru</DialogTitle>
                </DialogHeader>
                <AssignmentForm onSubmit={handleAddAssignment} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Semua ({assignments.length})
          </Button>
          <Button variant={filter === "pending" ? "default" : "outline"} size="sm" onClick={() => setFilter("pending")}>
            Belum Selesai ({assignments.filter((a) => a.status === "pending").length})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Selesai ({assignments.filter((a) => a.status === "completed").length})
          </Button>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada tugas yang ditambahkan</p>
            {user && <p className="text-sm">Klik "Tambah Tugas" untuk menambahkan tugas baru</p>}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`border rounded-lg p-4 transition-all ${
                  assignment.status === "completed" ? "bg-gray-50 opacity-75" : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className={`font-semibold ${
                          assignment.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                        }`}
                      >
                        {assignment.title}
                      </h3>
                      <Badge className={priorities[assignment.priority].color}>
                        {priorities[assignment.priority].label}
                      </Badge>
                      <Badge className={getAssignmentStatusColor(assignment)}>
                        {assignment.status === "completed" ? "Selesai" : "Belum Selesai"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {assignment.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(parseISO(assignment.dueDate), "dd MMM yyyy", { locale: id })}
                      </span>
                      {assignment.dueTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {assignment.dueTime}
                        </span>
                      )}
                    </div>

                    {assignment.description && <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>}

                    <p className="text-xs text-gray-500">
                      Ditambahkan oleh {assignment.createdByName} pada{" "}
                      {format(parseISO(assignment.createdAt), "dd MMM yyyy HH:mm", { locale: id })}
                    </p>
                  </div>

                  {user && (
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => toggleAssignmentStatus(assignment)}>
                        {assignment.status === "completed" ? "Belum Selesai" : "Selesai"}
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit Tugas</DialogTitle>
                          </DialogHeader>
                          <AssignmentForm
                            assignment={assignment}
                            onSubmit={(data) => handleUpdateAssignment({ ...assignment, ...data })}
                          />
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!user && <p className="text-center text-gray-500 text-sm mt-4">Masuk untuk menambahkan dan mengedit tugas</p>}
      </CardContent>
    </Card>
  )
}
