# Contoh WSS MIG33

File ini menyalin nilai yang terlihat pada screenshot:

- `API_BASE_URL`: `https://api.mig33.id`
- `WS_URL`: `wss://api.mig33.id/ws`
- `APP_VERSION`: `1.0.169-web`

## Menjalankan

Memerlukan Node.js dan npm:

```sh
npm install
npm start
```

`config.js` menyimpan konstanta endpoint. `wss.js` mencoba membuka koneksi dan mencatat pesan server.

## Catatan penting

Endpoint pada screenshot belum diverifikasi dapat diakses dari Node.js atau bahwa protokol autentikasinya sama dengan aplikasi resmi. Contoh ini tidak mengirim kredensial atau melakukan tindakan akun. Jika koneksi ditolak, periksa dokumentasi resmi dan protokol yang diizinkan; jangan menebak format login.
