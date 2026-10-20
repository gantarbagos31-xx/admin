# Mig33Reborn Room Moderator — single-file app

Backend Node.js dan frontend HTML sudah digabung dalam `server.js`.

## Jalankan
1. Instal Node.js 18 atau lebih baru.
2. Simpan `server.js` dan `package.json` dalam folder yang sama.
3. Jalankan `npm install`, lalu `npm start`.
4. Buka `http://IP-SERVER:3000` di Chrome Android. Di perangkat yang sama dengan Node.js, gunakan `http://127.0.0.1:3000`.

Opsional: atur URL WebSocket upstream dengan environment variable `MIG33_WS_URL`, dan port dengan `PORT`.

Daftar peserta bergantung pada format respons API upstream; protokol upstream belum diuji langsung. Gunakan HTTPS/WSS bila dipublikasikan melalui internet.

## Perubahan auto-refresh dan Auto Kick
- Event `room.joined` dengan teks `has entered` memicu permintaan `room.participants` otomatis.
- Checkbox Auto Kick mengirim `room.kick` untuk username yang diekstrak dari event tanpa memeriksa daftar TARGET. Permission `rooms.kick` tetap wajib tersedia.
- Format payload event upstream dapat berbeda; verifikasi bentuk event dan respons `room.participants` pada log sebelum penggunaan.


## Perbaikan ekstraksi username (2026-10-20)
- Auto Kick mengambil username dari `data.username` pada event `room.text` / `room.joined` terlebih dahulu (contoh: `rockgan`).
- Parser teks `has entered` tetap menjadi fallback bila field username tidak tersedia.
- Log ROOM JOIN MATCH mencatat sumber username untuk memudahkan diagnosis.
