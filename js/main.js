// Data statis
const jadwalPiket = {
  Senin: ["Alip", "Asri", "Bunga", "Rofi", "Rizka", "Lexa", "Baik", "Aji"],
  Selasa: ["Fakhri H", "Yusuf", "Natasya", "Sella", "Faiz", "Arumi", "Ardi", "Sona"],
  Rabu: ["Gani", "Raihan", "Icad", "Kia", "Sri", "Ica", "Ayu"],
  Kamis: ["Citra", "Ghiwen", "Mulyadi", "Alwan", "Rofi", "Lia", "Fahri S"],
  Jumat: ["Ian", "Kela", "Eldo", "Ninda", "Dara", "Sahet"],
}

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
    {
      jam: "07:00-07:45",
      mata_pelajaran: "Administrasi Infrastruktur Jaringan",
      guru: "Djuli Hartono",
      kode: "12.A - D",
    },
    {
      jam: "07:45-08:30",
      mata_pelajaran: "Administrasi Infrastruktur Jaringan",
      guru: "Djuli Hartono",
      kode: "12.A - D",
    },
    {
      jam: "08:30-09:15",
      mata_pelajaran: "Administrasi Infrastruktur Jaringan",
      guru: "Djuli Hartono",
      kode: "12.A - D",
    },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    {
      jam: "09:30-10:15",
      mata_pelajaran: "Administrasi Infrastruktur Jaringan",
      guru: "Djuli Hartono",
      kode: "12.A - D",
    },
    { jam: "10:15-11:00", mata_pelajaran: "Sejarah", guru: "Indri Astuti", kode: "17.A" },
    { jam: "11:00-11:45", mata_pelajaran: "Sejarah", guru: "Indri Astuti", kode: "17.A" },
    { jam: "11:45-12:15", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:15-13:00", mata_pelajaran: "Tehwan", guru: "Dina Novida", kode: "20.A" },
    { jam: "13:00-13:45", mata_pelajaran: "Tehwan", guru: "Dina Novida", kode: "20.A" },
    { jam: "13:45-14:30", mata_pelajaran: "Tehwan", guru: "Dina Novida", kode: "20.A" },
  ],
  Rabu: [
    { jam: "07:00-07:45", mata_pelajaran: "B. Indonesia", guru: "Rifai", kode: "02.A" },
    { jam: "07:45-08:30", mata_pelajaran: "B. Indonesia", guru: "Rifai", kode: "02.A" },
    { jam: "08:30-09:15", mata_pelajaran: "B. Indonesia", guru: "Rifai", kode: "02.A" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "Teknologi Layanan Jaringan", guru: "Indra", kode: "33.B" },
    { jam: "10:15-11:00", mata_pelajaran: "Teknologi Layanan Jaringan", guru: "Indra", kode: "33.B" },
    { jam: "11:00-11:45", mata_pelajaran: "Teknologi Layanan Jaringan", guru: "Indra", kode: "33.B" },
    { jam: "11:45-12:15", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:15-13:00", mata_pelajaran: "Administrasi Sistem Jaringan", guru: "Irfan", kode: "34.A" },
    { jam: "13:00-13:45", mata_pelajaran: "Administrasi Sistem Jaringan", guru: "Irfan", kode: "34.A" },
    { jam: "13:45-14:30", mata_pelajaran: "Administrasi Sistem Jaringan", guru: "Irfan", kode: "34.A" },
  ],
  Kamis: [
    { jam: "07:00-07:45", mata_pelajaran: "Al-Quran", guru: "Zaky", kode: "38.A" },
    { jam: "07:45-08:30", mata_pelajaran: "Al-Quran", guru: "Zaky", kode: "38.A" },
    { jam: "08:30-09:15", mata_pelajaran: "PPKn", guru: "Irfan Rizwansyah", kode: "39.A" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "PPKn", guru: "Irfan Rizwansyah", kode: "39.A" },
    { jam: "10:15-11:00", mata_pelajaran: "Sunda", guru: "Saefi", kode: "27.B" },
    { jam: "11:00-11:45", mata_pelajaran: "Sunda", guru: "Saefi", kode: "27.B" },
    { jam: "11:45-12:15", mata_pelajaran: "Istirahat 2", guru: "", kode: "", istirahat: true },
    { jam: "12:15-13:00", mata_pelajaran: "Mata Pelajaran Pilihan (Coding)", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "13:00-13:45", mata_pelajaran: "Mata Pelajaran Pilihan (Coding)", guru: "Djuli Hartono", kode: "12.A - D" },
    { jam: "13:45-14:30", mata_pelajaran: "Mata Pelajaran Pilihan (Coding)", guru: "Djuli Hartono", kode: "12.A - D" },
  ],
  Jumat: [
    { jam: "07:00-07:45", mata_pelajaran: "Matematika", guru: "Bu Ika", kode: "16.A - C" },
    { jam: "07:45-08:30", mata_pelajaran: "Matematika", guru: "Bu Ika", kode: "16.A - C" },
    { jam: "08:30-09:15", mata_pelajaran: "Matematika", guru: "Bu Ika", kode: "16.A - C" },
    { jam: "09:15-09:30", mata_pelajaran: "Istirahat 1", guru: "", kode: "", istirahat: true },
    { jam: "09:30-10:15", mata_pelajaran: "PKK", guru: "Saefi", kode: "27.B" },
    { jam: "10:15-11:00", mata_pelajaran: "PKK", guru: "Saefi", kode: "27.B" },
    { jam: "11:00-11:45", mata_pelajaran: "PKK", guru: "Saefi", kode: "27.B" },
  ],
}

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

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }

  // Mobile navigation
  setupMobileNav()

  // Scroll to top
  setupScrollToTop()

  // Load content
  loadPiketSchedule()
  loadJadwalPelajaran()
  loadDaftarGuru()
  loadTugas()
})

function setupMobileNav() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")
  const mobileNavClose = document.getElementById("mobileNavClose")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.add("open")
    })

    mobileNavClose.addEventListener("click", () => {
      mobileNav.classList.remove("open")
    })

    // Close on link click
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open")
      })
    })
  }
}

function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop")

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show")
      } else {
        scrollToTopBtn.classList.remove("show")
      }
    })

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }
}

function loadPiketSchedule() {
  const piketGrid = document.getElementById("piketGrid")
  if (!piketGrid) return

  let html = ""
  let index = 0

  for (const [hari, siswa] of Object.entries(jadwalPiket)) {
    html += `
            <div class="card animate-fade-in-up" style="animation-delay: ${index * 0.1}s">
                <div class="card-header">
                    <h3>
                        <i data-lucide="calendar"></i>
                        ${hari}
                    </h3>
                    <span class="badge">
                        <i data-lucide="users"></i>
                        ${siswa.length} siswa
                    </span>
                </div>
                <div class="card-content">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        ${siswa
                          .map(
                            (nama) => `
                            <div style="background: rgba(51, 65, 85, 0.5); border-radius: 0.5rem; padding: 0.5rem; text-align: center; font-size: 0.875rem; color: var(--slate-300); transition: background 0.2s;">
                                ${nama}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `
    index++
  }

  piketGrid.innerHTML = html
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

function loadJadwalPelajaran() {
  const jadwalContainer = document.getElementById("jadwalContainer")
  if (!jadwalContainer) return

  let html = ""
  let index = 0

  for (const [hari, pelajaran] of Object.entries(jadwalPelajaran)) {
    html += `
            <div class="card animate-fade-in-up" style="animation-delay: ${index * 0.1}s; margin-bottom: 1.5rem;">
                <div class="card-header">
                    <h3>
                        <i data-lucide="book-open"></i>
                        ${hari}
                    </h3>
                    <span class="badge">${pelajaran.length} jam pelajaran</span>
                </div>
                <div class="card-content">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        ${pelajaran
                          .map(
                            (item) => `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: 0.5rem; transition: background 0.2s; ${item.istirahat ? "background: rgba(234, 88, 12, 0.2); border: 1px solid rgba(251, 146, 60, 0.3);" : "background: rgba(51, 65, 85, 0.5);"}">
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <i data-lucide="${item.istirahat ? "coffee" : "clock"}" style="width: 1rem; height: 1rem; color: ${item.istirahat ? "var(--orange-400)" : "var(--blue-400)"};"></i>
                                    <div>
                                        <div style="color: white; font-weight: 500;">${item.mata_pelajaran}</div>
                                        ${item.guru ? `<div style="font-size: 0.875rem; color: var(--slate-400);">${item.guru} ${item.kode ? `(${item.kode})` : ""}</div>` : ""}
                                    </div>
                                </div>
                                <span class="badge" style="font-size: 0.75rem;">${item.jam}</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `
    index++
  }

  jadwalContainer.innerHTML = html
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

function loadDaftarGuru() {
  const guruGrid = document.getElementById("guruGrid")
  if (!guruGrid) return

  let html = ""

  daftarGuru.forEach((guru, index) => {
    html += `
            <div class="card animate-fade-in-up" style="animation-delay: ${index * 0.05}s">
                <div class="card-content" style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="padding: 0.5rem; background: rgba(59, 130, 246, 0.2); border-radius: 0.5rem;">
                            <i data-lucide="graduation-cap" style="width: 1rem; height: 1rem; color: var(--blue-400);"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="color: white; font-weight: 500;">${guru.nama}</div>
                            <span class="badge" style="font-size: 0.75rem; margin-top: 0.25rem;">${guru.kode}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
  })

  guruGrid.innerHTML = html
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

async function loadTugas() {
  const tugasContainer = document.getElementById("tugasContainer")
  if (!tugasContainer) return

  try {
    const db = window.firebaseDB
    if (!db) {
      throw new Error("Firebase database tidak tersedia")
    }

    const querySnapshot = await db.collection("tugas").orderBy("deadline", "asc").get()

    if (querySnapshot.empty) {
      tugasContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--slate-300);">
                    <i data-lucide="book-open" style="width: 4rem; height: 4rem; margin: 0 auto 1rem; display: block; color: var(--slate-400);"></i>
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 0.5rem;">Belum Ada Tugas</h3>
                    <p>Tugas akan muncul di sini ketika guru memberikan tugas baru</p>
                </div>
            `
      if (window.lucide) {
        window.lucide.createIcons()
      }
      return
    }

    let html = ""
    let index = 0

    querySnapshot.forEach((doc) => {
      const tugas = doc.data()
      const deadline = tugas.deadline.toDate()
      const deadlineInfo = getDeadlineStatus(deadline)

      html += `
                <div class="card animate-fade-in-up" style="animation-delay: ${index * 0.1}s; margin-bottom: 1rem;">
                    <div class="card-header">
                        <h3 style="color: white; font-size: 1.125rem; margin-bottom: 0.75rem;">${tugas.judul}</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            <span class="badge badge-blue">
                                <i data-lucide="book-open"></i>
                                ${tugas.mataPelajaran}
                            </span>
                            <span class="badge badge-purple">
                                <i data-lucide="calendar"></i>
                                ${tugas.hari}
                            </span>
                            <span class="badge" style="border-color: ${deadlineInfo.color}; color: ${deadlineInfo.color};">
                                <i data-lucide="${deadlineInfo.icon}"></i>
                                ${deadlineInfo.text}
                            </span>
                        </div>
                    </div>
                    <div class="card-content">
                        ${tugas.deskripsi ? `<p style="color: var(--slate-300); margin-bottom: 1rem; line-height: 1.6;">${tugas.deskripsi}</p>` : ""}
                        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--slate-400);">
                            <i data-lucide="clock" style="width: 1rem; height: 1rem;"></i>
                            <span>Deadline: ${formatDate(deadline)}</span>
                        </div>
                    </div>
                </div>
            `
      index++
    })

    tugasContainer.innerHTML = html
    if (window.lucide) {
      window.lucide.createIcons()
    }
  } catch (error) {
    console.error("Error loading tugas:", error)
    tugasContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--red-400);">
                <p>Gagal memuat tugas. Silakan refresh halaman.</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Error: ${error.message}</p>
            </div>
        `
  }
}

function getDeadlineStatus(deadline) {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (deadline < now) {
    return { color: "var(--red-500)", text: "Terlambat", icon: "alert-circle" }
  } else if (deadline < tomorrow) {
    return { color: "var(--orange-500)", text: "Mendesak", icon: "clock" }
  } else {
    return { color: "var(--green-500)", text: "Normal", icon: "clock" }
  }
}

function formatDate(date) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayName}, ${day} ${month} ${year}`
}
