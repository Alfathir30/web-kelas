# Panduan Deploy ke Netlify

## Langkah-langkah Deployment:

### 1. Persiapan Repository
- Push semua kode ke GitHub repository
- Pastikan semua file sudah ter-commit

### 2. Setup di Netlify
1. Login ke [Netlify](https://netlify.com)
2. Klik "New site from Git"
3. Pilih GitHub dan repository Anda
4. Konfigurasi build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: 18

### 3. Environment Variables
Tambahkan environment variables berikut di Netlify Dashboard > Site Settings > Environment Variables:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 4. Deploy
- Klik "Deploy site"
- Netlify akan otomatis build dan deploy website Anda

### 5. Custom Domain (Opsional)
- Di Site Settings > Domain management
- Tambahkan custom domain jika diperlukan

## Catatan Penting:
- Website akan di-generate sebagai static site
- Firebase akan tetap berfungsi untuk database tugas
- Auto-deploy akan aktif setiap kali ada push ke repository
- Build time sekitar 2-3 menit

## Troubleshooting:
- Jika build gagal, cek di Deploy log
- Pastikan semua environment variables sudah diset
- Verifikasi Firebase configuration
