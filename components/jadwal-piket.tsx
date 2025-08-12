"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar } from "lucide-react"

const jadwalPiket = {
  Senin: ["Alip", "Asri", "Bunga", "Rofi", "Rizka", "Lexa", "Baik", "Aji"],
  Selasa: ["Fakhri H", "Yusuf", "Natasya", "Sella", "Faiz", "Arumi", "Ardi", "Sona"],
  Rabu: ["Gani", "Raihan", "Icad", "Kia", "Sri", "Ica", "Ayu"],
  Kamis: ["Citra", "Ghiwen", "Mulyadi", "Alwan", "Rofi", "Lia", "Fahri S"],
  Jumat: ["Ian", "Kela", "Eldo", "Ninda", "Dara", "Sahet"],
}

export function JadwalPiket() {
  return (
    <section id="piket" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Jadwal Piket Kelas</h2>
          <p className="text-slate-300 text-lg">Pembagian tugas piket harian untuk menjaga kebersihan kelas</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(jadwalPiket).map(([hari, siswa], index) => (
            <Card
              key={hari}
              className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  {hari}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  <Users className="h-3 w-3 mr-1" />
                  {siswa.length} siswa
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {siswa.map((nama, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700/50 rounded-lg p-2 text-sm text-slate-300 text-center hover:bg-slate-600/50 transition-colors"
                    >
                      {nama}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
