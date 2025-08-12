"use client"

import { useState, useEffect } from "react"
import { type Tugas, subscribeTugas, addTugas, deleteTugas } from "@/lib/firebase-tugas"

export function useTugas() {
  const [tugas, setTugas] = useState<Tugas[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeTugas((tugasList) => {
      setTugas(tugasList)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const tambahTugas = async (tugasBaru: Omit<Tugas, "id" | "createdAt">) => {
    try {
      await addTugas(tugasBaru)
    } catch (err) {
      setError("Gagal menambah tugas")
      throw err
    }
  }

  const hapusTugas = async (id: string) => {
    try {
      await deleteTugas(id)
    } catch (err) {
      setError("Gagal menghapus tugas")
      throw err
    }
  }

  return {
    tugas,
    loading,
    error,
    tambahTugas,
    hapusTugas,
  }
}
