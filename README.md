# Mig33Reborn Room Moderator — single-file app

Backend Node.js dan frontend HTML sudah digabung dalam `server.js`.

## Jalankan
1. Instal Node.js 18 atau lebih baru.
2. Simpan `server.js` dan `package.json` dalam folder yang sama.
3. Jalankan `npm install`, lalu `npm start`.
4. Buka `http://IP-SERVER:3000` di Chrome Android. Di perangkat yang sama dengan Node.js, gunakan `http://127.0.0.1:3000`.

Opsional: atur URL WebSocket upstream dengan environment variable `MIG33_WS_URL`, dan port dengan `PORT`.

Daftar peserta bergantung pada format respons API upstream; protokol upstream belum diuji langsung. Gunakan HTTPS/WSS bila dipublikasikan melalui internet.
