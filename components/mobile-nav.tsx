"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Monitor, Settings } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden text-white">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-800 border-slate-700">
        <div className="flex items-center space-x-2 mb-8">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Monitor className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-semibold">Kelas 11 TKJ2</span>
        </div>
        <nav className="flex flex-col space-y-4">
          <a
            href="#struktur"
            className="text-slate-300 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Struktur Kelas
          </a>
          <a
            href="#piket"
            className="text-slate-300 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Piket
          </a>
          <a
            href="#jadwal"
            className="text-slate-300 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Jadwal
          </a>
          <a
            href="#tugas"
            className="text-slate-300 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Tugas
          </a>
          <Link href="/admin" onClick={() => setOpen(false)}>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
