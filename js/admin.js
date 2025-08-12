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

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }

  // Setup login
  setupLogin()

  // Setup mata pelajaran options
  setupMataPelajaranOptions()

  // Setup form submission
  setupTugasForm()

  // Load tugas list
  loadAdminTugasList()
})

function setupLogin() {
  const loginForm = document.getElementById("loginForm")
  const loginModal = document.getElementById("loginModal")
  const adminDashboard = document.getElementById("adminDashboard")
  const logoutBtn = document.getElementById("logoutBtn")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const password = document.getElementById("password").value

    if (password === "tkj2admin") {
      loginModal.style.display = "none"
      adminDashboard.style.display = "block"
    } else {
      alert("Password salah!")
    }
  })

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      loginModal.style.display = "flex"
      adminDashboard.style.display = "none"
      document.getElementById("password").value = ""
    })
  }
}

function setupMataPelajaranOptions() {
  const select = document.getElementById("mataPelajaran")
  if (!select) return

  mataPelajaran.forEach((mp) => {
    const option = document.createElement("option")
    option.value = mp
    option.textContent = mp
    select.appendChild(option)
  })
}

function setupTugasForm() {
  const form = document.getElementById("tugasForm")
  const submitBtn = document.getElementById("submitBtn")

  if (!form) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!window.firebaseReady) {
      alert("❌ Firebase belum siap. Periksa konfigurasi Firebase di js/firebase-config.js")
      console.error("Firebase not ready. Check firebase-config.js")
      return
    }

    const formData = {
      judul: document.getElementById("judul").value,
      mataPelajaran: document.getElementById("mataPelajaran").value,
      hari: document.getElementById("hari").value,
      deskripsi: document.getElementById("deskripsi").value,
      deadline: document.getElementById("deadline").value,
    }

    if (!formData.judul || !formData.mataPelajaran || !formData.deadline || !formData.hari) {
      alert("Mohon lengkapi semua field yang wajib diisi")
      return
    }

    submitBtn.disabled = true
    submitBtn.innerHTML =
      '<div class="spinner" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></div>Menyimpan...'

    try {
      const db = window.firebaseDB

      console.log("📝 Attempting to save tugas:", formData)

      const docRef = await db.collection("tugas").add({
        judul: formData.judul,
        mataPelajaran: formData.mataPelajaran,
        hari: formData.hari,
        deskripsi: formData.deskripsi,
        deadline: new Date(formData.deadline),
        createdAt: new Date(),
      })

      console.log("✅ Tugas saved with ID:", docRef.id)

      // Reset form
      form.reset()
      alert("✅ Tugas berhasil ditambahkan!")

      // Reload tugas list
      loadAdminTugasList()
    } catch (error) {
      console.error("❌ Error adding tugas:", error)
      console.error("Error details:", error.message)
      alert(`❌ Gagal menambahkan tugas!\n\nError: ${error.message}\n\nPeriksa console untuk detail lebih lanjut.`)
    } finally {
      submitBtn.disabled = false
      submitBtn.innerHTML = '<i data-lucide="save"></i>Simpan Tugas'
      if (window.lucide) {
        window.lucide.createIcons()
      }
    }
  })
}

async function loadAdminTugasList() {
  const tugasList = document.getElementById("adminTugasList")
  if (!tugasList) return

  if (!window.firebaseReady) {
    tugasList.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--red-400);">
        <p>❌ Firebase belum dikonfigurasi. Periksa js/firebase-config.js</p>
      </div>
    `
    return
  }

  tugasList.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Memuat tugas...</p>
        </div>
    `

  try {
    const db = window.firebaseDB

    console.log("📖 Loading tugas list...")
    const querySnapshot = await db.collection("tugas").orderBy("deadline", "asc").get()
    console.log("✅ Tugas loaded, count:", querySnapshot.size)

    if (querySnapshot.empty) {
      tugasList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--slate-300);">
                    <i data-lucide="book-open" style="width: 3rem; height: 3rem; margin: 0 auto 1rem; display: block; color: var(--slate-400);"></i>
                    <p>Belum ada tugas yang dibuat</p>
                </div>
            `
      if (window.lucide) {
        window.lucide.createIcons()
      }
      return
    }

    let html = ""

    querySnapshot.forEach((doc) => {
      const tugas = doc.data()
      const deadline = tugas.deadline.toDate()
      const deadlineInfo = getDeadlineStatus(deadline)

      html += `
                <div class="card" style="margin-bottom: 1rem;">
                    <div class="card-header">
                        <div style="display: flex; align-items: start; justify-content: space-between;">
                            <div style="flex: 1;">
                                <h4 style="color: white; font-size: 1.125rem; margin-bottom: 0.75rem;">${tugas.judul}</h4>
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
                            <button class="btn" style="background: var(--red-600); color: white; margin-left: 1rem;" onclick="deleteTugas('${doc.id}')">
                                <i data-lucide="trash-2"></i>
                            </button>
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
    })

    tugasList.innerHTML = html
    if (window.lucide) {
      window.lucide.createIcons()
    }
  } catch (error) {
    console.error("❌ Error loading tugas:", error)
    tugasList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--red-400);">
                <p>❌ Gagal memuat tugas: ${error.message}</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Periksa console untuk detail error</p>
            </div>
        `
  }
}

async function deleteTugas(tugasId) {
  if (!confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    return
  }

  try {
    const db = window.firebaseDB

    await db.collection("tugas").doc(tugasId).delete()
    alert("Tugas berhasil dihapus!")

    // Reload tugas list
    loadAdminTugasList()
  } catch (error) {
    console.error("Error deleting tugas:", error)
    alert("Gagal menghapus tugas")
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

// Make deleteTugas available globally
window.deleteTugas = deleteTugas
