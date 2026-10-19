# Mig33Reborn Room Moderator — HTML + Node.js

## Files
- `public/index.html`: mobile HTML frontend.
- `server.js`: Node.js server and WebSocket proxy to the fixed upstream endpoint.
- `package.json`: dependency manifest.

## Run on Node.js 18+
```sh
npm install
npm start
```
Open `http://IP-SERVER:3000` in Chrome. For internet-facing use, configure HTTPS/WSS via a TLS reverse proxy; do not send account credentials over public plain HTTP.

## Android / Termux
Install Node.js in Termux, copy the project folder, run `npm install` then `npm start`, and open `http://127.0.0.1:3000` in Chrome.

Upstream default: `wss://developer.mig33.id/developer/ws`; override with `MIG33_WS_URL` if the official API documentation specifies a different endpoint. The app deliberately does not invent list-all-rooms or mute commands. Confirm message names/payloads against the current API docs before relying on API operations.
