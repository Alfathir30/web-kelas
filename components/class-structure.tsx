"use client"

import { useState, useEffect } from "react"
import { ref, onValue, set } from "firebase/database"
import { database } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Pencil, Save, Users } from "lucide-react"

interface ClassMember {
  name: string
  photo?: string
  position: string
  id: string
}

const defaultClassStructure: ClassMember[] = [
  { id: "wali-kelas", name: "", photo: "", position: "Wali Kelas" },
  { id: "ketua-kelas", name: "", photo: "", position: "Ketua Kelas" },
  { id: "wakil-ketua", name: "", photo: "", position: "Wakil Ketua Kelas" },
  { id: "sekretaris", name: "", photo: "", position: "Sekretaris" },
  { id: "bendahara", name: "", photo: "", position: "Bendahara" },
  { id: "ketua-keamanan", name: "", photo: "", position: "Ketua Keamanan" },
  { id: "ketua-kebersihan", name: "", photo: "", position: "Ketua Kebersihan" },
  { id: "ketua-keagamaan", name: "", photo: "", position: "Ketua Keagamaan" },
]

export function ClassStructure() {
  const { user } = useAuth()
  const [classMembers, setClassMembers] = useState<ClassMember[]>(defaultClassStructure)
  const [editingMember, setEditingMember] = useState<ClassMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load data from Firebase and localStorage
  useEffect(() => {
    const classRef = ref(database, "classStructure")

    // Try to load from localStorage first (offline support)
    const savedData = localStorage.getItem("classStructure")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setClassMembers(parsedData)
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }

    // Listen to Firebase changes
    const unsubscribe = onValue(
      classRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setClassMembers(data)
          // Save to localStorage for offline access
          localStorage.setItem("classStructure", JSON.stringify(data))
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Firebase error:", error)
        setIsLoading(false)
        toast({
          title: "Gagal memuat data",
          description: "Menggunakan data offline",
          variant: "destructive",
        })
      },
    )

    return () => unsubscribe()
  }, [])

  const handleSaveMember = async (updatedMember: ClassMember) => {
    try {
      const updatedMembers = classMembers.map((member) => (member.id === updatedMember.id ? updatedMember : member))

      // Update local state immediately
      setClassMembers(updatedMembers)
      setEditingMember(null)

      // Save to localStorage
      localStorage.setItem("classStructure", JSON.stringify(updatedMembers))

      // Save to Firebase
      const classRef = ref(database, "classStructure")
      await set(classRef, updatedMembers)

      toast({
        title: "Berhasil disimpan",
        description: `Data ${updatedMember.position} telah diperbarui`,
      })
    } catch (error) {
      console.error("Error saving member:", error)
      toast({
        title: "Gagal menyimpan",
        description: "Data disimpan secara offline",
        variant: "destructive",
      })
    }
  }

  const EditMemberDialog = ({ member }: { member: ClassMember }) => {
    const [editData, setEditData] = useState(member)

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
            onClick={() => setEditingMember(member)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {member.position}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Masukkan nama"
              />
            </div>
            <div>
              <Label htmlFor="photo">URL Foto (opsional)</Label>
              <Input
                id="photo"
                value={editData.photo || ""}
                onChange={(e) => setEditData({ ...editData, photo: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSaveMember(editData)} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Simpan
              </Button>
            </div>
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
            <Users className="w-5 h-5" />
            Struktur Kelas
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
          <Users className="w-5 h-5" />
          Struktur Kelas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {classMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="text-center space-y-3">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src={member.photo || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {member.name ? member.name.charAt(0).toUpperCase() : member.position.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-gray-900">{member.name || "Belum diisi"}</h3>
                  <p className="text-sm text-blue-600 font-medium">{member.position}</p>
                </div>
              </div>

              {user && <EditMemberDialog member={member} />}
            </div>
          ))}
        </div>

        {!user && <p className="text-center text-gray-500 text-sm mt-4">Masuk untuk mengedit struktur kelas</p>}
      </CardContent>
    </Card>
  )
}
