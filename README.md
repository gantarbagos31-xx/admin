# Mig33Reborn Room Moderator — single-file app

Backend Node.js dan frontend HTML sudah digabung dalam `server.js`.

## Jalankan
1. Instal Node.js 18 atau lebih baru.
2. Simpan `server.js` dan `package.json` dalam folder yang sama.
3. Jalankan `npm install`, lalu `npm start`.
4. Buka `http://IP-SERVER:3000` di Chrome Android. Di perangkat yang sama dengan Node.js, gunakan `http://127.0.0.1:3000`.

Endpoint upstream mengikuti dokumentasi Mig33: `wss://developer.mig33.id/developer/ws`. Subprotokol yang dikirim saat handshake adalah `mig33.developer.ws.v1`. URL endpoint dan subprotokol berbeda; jangan mengisi URL dengan nama subprotokol. Port dapat diatur dengan environment variable `PORT`.

Daftar peserta bergantung pada format respons API upstream; protokol upstream belum diuji langsung. Gunakan HTTPS/WSS bila dipublikasikan melalui internet.

## Perubahan auto-refresh dan Auto Kick
- Event `room.joined` dengan teks `has entered` memicu permintaan `room.participants` otomatis.
- Checkbox Auto Kick mengirim `room.kick.vote` untuk username yang diekstrak dari event tanpa memeriksa daftar TARGET. Permission `rooms.kick` tetap wajib tersedia.
- Format payload event upstream dapat berbeda; verifikasi bentuk event dan respons `room.participants` pada log sebelum penggunaan.


## Perbaikan ekstraksi username (2026-10-20)
- Auto Kick mengambil username dari `data.username` pada event `room.text` / `room.joined` terlebih dahulu (contoh: `rockgan`).
- Parser teks `has entered` tetap menjadi fallback bila field username tidak tersedia.
- Log ROOM JOIN MATCH mencatat sumber username untuk memudahkan diagnosis.


## Metode kick percobaan (`room.kick.vote`)
- Tombol moderasi dan Auto Kick mengirim payload `{"type":"room.kick.vote","room":"nama-room","target_username":"username"}`.
- `room.kick.vote` belum terkonfirmasi didukung dokumentasi; jika server mengembalikan `unsupported_type`, tipe ini tidak didukung. Jangan anggap queued sebagai bukti kick berhasil; respons queued bukan bukti bahwa target berhasil dikeluarkan. Periksa hasil job dan nilai `result.status` / `kicked`.
- Jika server menolak karena kredit tidak cukup, aplikasi tidak melewati pemeriksaan kredit.


## Perbaikan koneksi upstream (2026-10-20)
- Endpoint ditetapkan ke `wss://developer.mig33.id/developer/ws` dan subprotokol `mig33.developer.ws.v1`.
- Proxy mengirim status connecting/open/closed/reconnecting ke frontend.
- Jika koneksi upstream putus atau timeout, proxy mencoba menyambung ulang dengan jeda bertahap.
- Perintah tidak dikirim diam-diam ketika upstream offline; log akan menjelaskan agar tombol ditekan ulang setelah status tersambung.
