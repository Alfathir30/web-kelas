"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTugas } from "@/hooks/use-tugas"
import { Plus, Save } from "lucide-react"

const mataPelajaran = [
  "B. Indonesia",
  "B. Inggris",
  "Matematika",
  "PABP",
  "Penjas",
  "Akidah Akhlak",
  "Administrasi Infrastruktur Jaringan",
  "Sejarah",
  "Tehwan",
  "Teknologi Layanan Jaringan",
  "Administrasi Sistem Jaringan",
  "Al-Quran",
  "PPKn",
  "Sunda",
  "Mata Pelajaran Pilihan (Coding)",
  "PKK",
]

const hariOptions = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

export function AdminTugasForm() {
  const { tambahTugas } = useTugas()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    judul: "",
    mataPelajaran: "",
    deskripsi: "",
    deadline: "",
    hari: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.judul || !formData.mataPelajaran || !formData.deadline || !formData.hari) {
      alert("Mohon lengkapi semua field yang wajib diisi")
      return
    }

    setLoading(true)
    try {
      await tambahTugas({
        judul: formData.judul,
        mataPelajaran: formData.mataPelajaran,
        deskripsi: formData.deskripsi,
        deadline: new Date(formData.deadline),
        hari: formData.hari,
      })

      // Reset form
      setFormData({
        judul: "",
        mataPelajaran: "",
        deskripsi: "",
        deadline: "",
        hari: "",
      })

      alert("Tugas berhasil ditambahkan!")
    } catch (error) {
      alert("Gagal menambahkan tugas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-400" />
          Tambah Tugas Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="judul" className="text-slate-300">
              Judul Tugas *
            </Label>
            <Input
              id="judul"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              placeholder="Contoh: Membuat laporan jaringan"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="mataPelajaran" className="text-slate-300">
              Mata Pelajaran *
            </Label>
            <Select
              value={formData.mataPelajaran}
              onValueChange={(value) => setFormData({ ...formData, mataPelajaran: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Pilih mata pelajaran" />
              </SelectTrigger>
              <SelectContent>
                {mataPelajaran.map((mp) => (
                  <SelectItem key={mp} value={mp}>
                    {mp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="hari" className="text-slate-300">
              Hari *
            </Label>
            <Select value={formData.hari} onValueChange={(value) => setFormData({ ...formData, hari: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Pilih hari" />
              </SelectTrigger>
              <SelectContent>
                {hariOptions.map((hari) => (
                  <SelectItem key={hari} value={hari}>
                    {hari}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deskripsi" className="text-slate-300">
              Deskripsi Tugas
            </Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              placeholder="Jelaskan detail tugas yang harus dikerjakan..."
              className="bg-slate-700 border-slate-600 text-white"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="deadline" className="text-slate-300">
              Deadline *
            </Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {loading ? "Menyimpan..." : "Simpan Tugas"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
