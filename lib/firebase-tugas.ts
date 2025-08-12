import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore"
import { db } from "./firebase"

export interface Tugas {
  id: string
  judul: string
  mataPelajaran: string
  deskripsi: string
  deadline: Date
  hari: string
  createdAt: Date
}

export const tugasCollection = collection(db, "tugas")

export const addTugas = async (tugas: Omit<Tugas, "id" | "createdAt">) => {
  try {
    const docRef = await addDoc(tugasCollection, {
      ...tugas,
      deadline: Timestamp.fromDate(tugas.deadline),
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding tugas:", error)
    throw error
  }
}

export const deleteTugas = async (id: string) => {
  try {
    await deleteDoc(doc(db, "tugas", id))
  } catch (error) {
    console.error("Error deleting tugas:", error)
    throw error
  }
}

export const getTugas = async (): Promise<Tugas[]> => {
  try {
    const q = query(tugasCollection, orderBy("deadline", "asc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      deadline: doc.data().deadline.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Tugas[]
  } catch (error) {
    console.error("Error getting tugas:", error)
    throw error
  }
}

export const subscribeTugas = (callback: (tugas: Tugas[]) => void) => {
  const q = query(tugasCollection, orderBy("deadline", "asc"))
  return onSnapshot(q, (querySnapshot) => {
    const tugas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      deadline: doc.data().deadline.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Tugas[]
    callback(tugas)
  })
}
