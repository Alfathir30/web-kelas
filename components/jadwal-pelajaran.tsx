"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Coffee } from "lucide-react"

const jadwalPelajaran = {
  Senin: [
    { jam: "07:00-07:30", mata_pelajaran: "Upacara", guru: "", kode: "" },
    { jam: "07:30-08:15", mata_pelajaran: "B. Inggris", guru: "Bu Ika", kode: "16.A - C" },
    { jam: "08:15-09:00", mata_pelajaran: "B. Inggris", guru: "Bu Ika", kode: "16.A - C" },
    { jam: "09:00-09:45", mata_pelajaran: "B. Inggris", guru: "Bu Ika", kode: "16.A - C" },
    { jam: "09:45-10:00", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "10:00-10:45", mata_pelajaran: "PABP", guru: "Mugajidin", kode: "21.A" },
    { jam: "10:45-11:30", mata_pelajaran: "PABP", guru: "Mugajidin", kode: "21.A" },
    { jam: "11:30-12:15", mata_pelajaran: "PABP", guru: "Mugajidin", kode: "21.A" },
    { jam: "12:15-12:45", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:45-13:30", mata_pelajaran: "Penjas", guru: "Hadi", kode: "32.A" },
    { jam: "13:30-14:15", mata_pelajaran: "Penjas", guru: "Hadi", kode: "32.A" },
    { jam: "14:15-15:00", mata_pelajaran: "Akidah Akhlak", guru: "Indriani", kode: "23.A" },
    { jam: "15:00-15:45", mata_pelajaran: "Akidah Akhlak", guru: "Indriani", kode: "23.A" },
  ],
  Selasa: [
    { jam: "07:00-07:45", mata_pelajaran: "Administrasi Infrastruktur Jaringan", guru: "Saefi", kode: "27.B" },
    { jam: "07:45-08:30", mata_pelajaran: "Administrasi Infrastruktur Jaringan", guru: "Saefi", kode: "27.B" },
    { jam: "08:30-09:15", mata_pelajaran: "Administrasi Infrastruktur Jaringan", guru: "Saefi", kode: "27.B" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "Administrasi Infrastruktur Jaringan", guru: "Saefi", kode: "27.B" },
    { jam: "10:15-11:00", mata_pelajaran: "Sejarah", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "11:00-11:45", mata_pelajaran: "Sejarah", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "11:45-12:15", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:15-13:00", mata_pelajaran: "Tehwan", guru: "Indra", kode: "33.B" },
    { jam: "13:00-13:45", mata_pelajaran: "Tehwan", guru: "Indra", kode: "33.B" },
    { jam: "13:45-14:30", mata_pelajaran: "Tehwan", guru: "Indra", kode: "33.B" },
  ],
  Rabu: [
    { jam: "07:00-07:45", mata_pelajaran: "B. Indo", guru: "Rifai", kode: "02.A" },
    { jam: "07:45-08:30", mata_pelajaran: "B. Indo", guru: "Rifai", kode: "02.A" },
    { jam: "08:30-09:15", mata_pelajaran: "B. Indo", guru: "Rifai", kode: "02.A" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "Teknologi Layanan Jaringan", guru: "Irfan", kode: "34.A" },
    { jam: "10:15-11:00", mata_pelajaran: "Teknologi Layanan Jaringan", guru: "Irfan", kode: "34.A" },
    { jam: "11:00-11:45", mata_pelajaran: "Teknologi Layanan Jaringan", guru: "Irfan", kode: "34.A" },
    { jam: "11:45-12:15", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:15-13:00", mata_pelajaran: "Administrasi Sistem Jaringan", guru: "Zaky", kode: "38.A" },
    { jam: "13:00-13:45", mata_pelajaran: "Administrasi Sistem Jaringan", guru: "Zaky", kode: "38.A" },
    { jam: "13:45-14:30", mata_pelajaran: "Administrasi Sistem Jaringan", guru: "Zaky", kode: "38.A" },
  ],
  Kamis: [
    { jam: "07:00-07:45", mata_pelajaran: "Al-Quran", guru: "Mugajidin", kode: "21.A" },
    { jam: "07:45-08:30", mata_pelajaran: "Al-Quran", guru: "Mugajidin", kode: "21.A" },
    { jam: "08:30-09:15", mata_pelajaran: "PPKn", guru: "Dina Novida", kode: "20.A" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "PPKn", guru: "Dina Novida", kode: "20.A" },
    { jam: "10:15-11:00", mata_pelajaran: "Sunda", guru: "Indri Astuti", kode: "17.A" },
    { jam: "11:00-11:45", mata_pelajaran: "Sunda", guru: "Indri Astuti", kode: "17.A" },
    { jam: "11:45-12:15", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:15-13:00", mata_pelajaran: "Mata Pelajaran Pilihan (Coding)", guru: "Irfan Rizwansyah", kode: "39.A" },
    { jam: "13:00-13:45", mata_pelajaran: "Mata Pelajaran Pilihan (Coding)", guru: "Irfan Rizwansyah", kode: "39.A" },
    { jam: "13:45-14:30", mata_pelajaran: "Mata Pelajaran Pilihan (Coding)", guru: "Irfan Rizwansyah", kode: "39.A" },
  ],
  Jumat: [
    { jam: "07:00-07:45", mata_pelajaran: "MTK", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "07:45-08:30", mata_pelajaran: "MTK", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "08:30-09:15", mata_pelajaran: "MTK", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "PKK", guru: "Dina Novida", kode: "20.A" },
    { jam: "10:15-11:00", mata_pelajaran: "PKK", guru: "Dina Novida", kode: "20.A" },
    { jam: "11:00-11:45", mata_pelajaran: "PKK", guru: "Dina Novida", kode: "20.A" },
  ],
}

export function JadwalPelajaran() {
  return (
    <section id="jadwal" className="py-16 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Jadwal Pelajaran</h2>
          <p className="text-slate-300 text-lg">Jadwal mata pelajaran lengkap untuk kelas 11 TKJ2</p>
        </div>

        <div className="space-y-6">
          {Object.entries(jadwalPelajaran).map(([hari, pelajaran], index) => (
            <Card
              key={hari}
              className="bg-slate-800/50 border-slate-700 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-400" />
                  {hari}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {pelajaran.length} jam pelajaran
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pelajaran.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        item.istirahat
                          ? "bg-orange-900/20 border border-orange-500/30"
                          : "bg-slate-700/50 hover:bg-slate-600/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.istirahat ? (
                          <Coffee className="h-4 w-4 text-orange-400" />
                        ) : (
                          <Clock className="h-4 w-4 text-blue-400" />
                        )}
                        <div>
                          <div className="text-white font-medium">{item.mata_pelajaran}</div>
                          {item.guru && (
                            <div className="text-sm text-slate-400">
                              {item.guru} {item.kode && `(${item.kode})`}
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.jam}
                      </Badge>
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
