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
- Event `room.joined` memicu refresh daftar peserta; auto-kick hanya memproses username yang terdeteksi cocok dengan keluarga pola dinamis di List Target.
- Format payload event upstream dapat berbeda; verifikasi bentuk event dan respons `room.participants` pada log sebelum penggunaan.


## Perbaikan ekstraksi username (2026-10-20)
- Auto Kick mengambil username dari `data.username` pada event `room.text` / `room.joined` terlebih dahulu (contoh: `rockgan`).
- Parser teks `has entered` tetap menjadi fallback bila field username tidak tersedia.
- Log ROOM JOIN MATCH mencatat sumber username untuk memudahkan diagnosis.


## Metode kick melalui sendtext `/kick username`
- Tombol moderasi dan Auto Kick mengirim payload `{"type":"room.send_message","room":"nama-room","message":"/kick username"}`.
- Pesan teks yang terkirim bukan bukti target berhasil dikeluarkan; target hanya dihapus setelah respons/peristiwa mengonfirmasi kick berhasil.
- Command `/kick username` harus didukung server room dan akun harus memiliki izin mengirim pesan serta hak moderator yang sesuai. API/server dapat menolak command tersebut.
- Auto Kick memproses satu target setiap sekitar satu detik dan tidak menggunakan `room.kick.vote`.

## Perbaikan koneksi upstream (2026-10-20)
- Endpoint ditetapkan ke `wss://developer.mig33.id/developer/ws` dan subprotokol `mig33.developer.ws.v1`.
- Proxy mengirim status connecting/open/closed/reconnecting ke frontend.
- Jika koneksi upstream putus atau timeout, proxy mencoba menyambung ulang dengan jeda bertahap.
- Perintah tidak dikirim diam-diam ketika upstream offline; log akan menjelaskan agar tombol ditekan ulang setelah status tersambung.

## Deteksi keluarga username dan auto-kick
- Deteksi tidak memakai daftar contoh username yang dikunci. Nama yang mengandung angka dikelompokkan berdasarkan pola setelah rangkaian angka dinormalisasi (mis. `alpha1`, `alpha2`; `group-01-x`, `group-02-x`).
- Kelompok minimal dua username dengan pola normalisasi yang sama dipindahkan ke Target; nama dasar tanpa angka juga disertakan bila cocok dengan prefix keluarga tersebut.
- Auto Kick aktif secara default dan mengirim teks `/kick username` lewat `room.send_message`, satu target per detik. Tidak ada konfirmasi manual pada setiap target; server tetap memeriksa dukungan command dan hak moderator.
- Target tetap berada di daftar sampai aplikasi menerima indikator konfirmasi kick; pengiriman teks saja tidak dianggap sukses.
- Pengiriman command membutuhkan permission `messaging.send`; keberhasilan tetap bergantung pada dukungan command `/kick` dan hak moderator yang berlaku di server.

## Perilaku Auto Kick terbaru
- Auto Kick ON: username yang terdeteksi baru masuk room dijadwalkan untuk mengirim teks `/kick username`.
- Auto Kick OFF maupun ON: ketika List Target berisi lebih dari satu username, seluruh target diantrekan otomatis.
- Delay Antar Kick mengatur jarak pengiriman perintah berikutnya.
- Perintah dikirim melalui `room.send_message`; keberhasilan tetap bergantung pada dukungan command `/kick` dan izin moderator di server.
- Target tidak dihapus hanya karena perintah terkirim; penghapusan memerlukan indikasi konfirmasi kick yang dikenali aplikasi.
