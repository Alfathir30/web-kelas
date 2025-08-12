"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"

const daftarGuru = [
  { kode: "02.A", nama: "Rifai" },
  { kode: "12.A - D", nama: "Djuli Hartono" },
  { kode: "16.A - C", nama: "Bu Ika" },
  { kode: "17.A", nama: "Indri Astuti" },
  { kode: "20.A", nama: "Dina Novida" },
  { kode: "21.A", nama: "Mugajidin" },
  { kode: "23.A", nama: "Indriani" },
  { kode: "27.B", nama: "Saefi" },
  { kode: "32.A", nama: "Hadi" },
  { kode: "33.B", nama: "Indra" },
  { kode: "34.A", nama: "Irfan" },
  { kode: "38.A", nama: "Zaky" },
  { kode: "39.A", nama: "Irfan Rizwansyah" },
]

export function DaftarGuru() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Daftar Guru</h2>
          <p className="text-slate-300 text-lg">Guru pengajar dengan kode masing-masing</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {daftarGuru.map((guru, index) => (
            <Card
              key={guru.kode}
              className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{guru.nama}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {guru.kode}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
