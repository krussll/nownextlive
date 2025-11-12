# TECH_SPEC.md

## 🧰 Technology Stack Overview

**Frontend:**
- Jekyll static site generator
- HTML / CSS / Vanilla JavaScript
- Socket.IO client for real-time updates

**Backend:**
- Node.js (v18+)
- Express.js for HTTP handling
- Socket.IO for bidirectional communication

**Hosting:**
- Heroku Dyno for server
- GitHub Pages (or Netlify) for static site

---

## 🔄 Communication Flow

1. Controller connects via Socket.IO and joins a specific event room.
2. Organizer enters or edits “Now” and “Next” text for each of six spaces.
3. Controller emits a `controller_update` event to the server.
4. Server broadcasts `display_update` to all display clients in that event room.
5. Displays render new values immediately.

---

## 📦 Dependencies

**Server:**
```bash
npm install express socket.io
```

**Frontend:**
```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
```

---

## 📁 Folder Structure

```
/nownext/
 ├─ /server/
 │    └─ index.js
 ├─ /site/
 │    ├─ controller.html
 │    ├─ display.html
 │    ├─ /assets/js/
 │         ├─ socket.js
 │         ├─ controller.js
 │         └─ display.js
 ├─ Procfile
 ├─ package.json
 ├─ _config.yml
 └─ README.md
```

---

## 🧠 MVP Technical Goals

| Goal | Implementation |
|------|-----------------|
| Realtime updates | Socket.IO (controller → server → display) |
| Stateless MVP | No database; in-memory event handling only |
| 6-space layout | Static HTML grid of 6 “spaces” |
| Mobile ready | Responsive layout; large readable text |
| Deployment | Heroku (server), GitHub Pages (frontend) |

---

## ⚙️ Server Events

| Event | Direction | Description |
|--------|------------|-------------|
| `join_event` | Client → Server | Join a specific event room |
| `controller_update` | Controller → Server | Send update payload |
| `display_update` | Server → Displays | Broadcast to all display clients |

---

## 🧩 Example Payload

```json
{
  "eventId": "club2025",
  "rooms": [
    { "id": 1, "now": "Final Match", "next": "Awards" },
    { "id": 2, "now": "Training", "next": "Break" }
  ]
}
```

---

## 🪜 Deployment Commands

**Server:**
```bash
git push heroku main
```

**Frontend (Jekyll):**
```bash
jekyll build
git push origin main
```

---

**Maintainer:** Reece Williams  
**Version:** MVP v1.0  
**Date:** 2025-11-12
