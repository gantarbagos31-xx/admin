// Contoh koneksi WebSocket ke endpoint pada screenshot.
// Catatan: endpoint/protokol dan format autentikasi belum diverifikasi.
const WebSocket = require("ws");
const { WS_URL, APP_VERSION } = require("./config");

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
  console.log("WSS terhubung:", WS_URL);
  console.log("Versi referensi:", APP_VERSION);
});

ws.on("message", (data) => {
  console.log("Pesan server:", data.toString());
});

ws.on("error", (err) => {
  console.error("WSS error:", err.message);
});

ws.on("close", (code, reason) => {
  console.log("WSS terputus:", code, reason.toString());
});
