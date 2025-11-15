# AGENTS.md

## 🎯 Project: NowNext MVP
A lightweight, browser-based system that lets clubs and event organizers instantly update *Now* and *Next* displays across multiple screens.

---

## 🧩 Purpose
Create a minimal, real-time “Now & Next” board for sports clubs and small event venues that can be updated remotely through a controller view.  
The system must work entirely in the browser — no downloads or installs required.

---

## 🧠 Core Concept
> One controller updates all displays instantly.

The MVP focuses purely on **Now & Next per space (6 spaces)** — no persistence, no authentication, no database.  
Socket.IO handles live updates, and the front end runs as a static site built with Jekyll and vanilla JavaScript.

---

## 🤖 Agents

### 1. Frontend Agent
**Name:** `display-agent`  
**Goal:** Render the live output display showing “Now” and “Next” for each space.  
**Stack:** HTML, CSS, JS (Vanilla), connected to Socket.IO server.  
**Responsibilities:**
- Listen for incoming `display_update` events from the WebSocket server.
- Render 6 spaces with current “Now” and “Next” values.
- Auto-refresh when updates are received.
- Show fallback message if disconnected.

### 2. Controller Agent
**Name:** `controller-agent`  
**Goal:** Provide a simple UI for event organizers to update “Now” and “Next” values.  
**Stack:** HTML, CSS, JS (Vanilla), Socket.IO client.  
**Responsibilities:**
- Render editable fields for 6 spaces.
- Send updates via `controller_update` events.
- Manage connection status (Connected / Disconnected).
- Trigger a broadcast to all displays when “Update” is pressed.

### 3. Server Agent
**Name:** `realtime-server-agent`  
**Goal:** Manage WebSocket communication between controllers and displays.  
**Stack:** Node.js + Express + Socket.IO  
**Responsibilities:**
- Accept client connections (controllers & displays).
- Manage “rooms” per event (e.g., `event_123`).
- Listen for `controller_update` events and broadcast as `display_update` to all connected clients.
- Log connections, disconnections, and updates.

---

## ⚙️ Data Flow

```
Controller → (Socket.IO emit: controller_update)
          → Server → (broadcast display_update)
          → Displays update immediately
```

All data is ephemeral (in-memory only).

---

## 🧩 User Stories

1. **Controller**: As an event organizer, I can edit “Now” and “Next” for each of six spaces and broadcast updates instantly.
2. **Display**: As a participant or spectator, I can view the latest “Now” and “Next” items on a screen that updates in real-time.
3. **Reliability**: The display should auto-reconnect if the WebSocket connection drops.

---

## 🪜 MVP Success Criteria

✅ Real-time updates between controller and display  
✅ Multi-space display grid (6 total)  
✅ Browser-only, no login or install  
✅ Responsive on desktop and mobile  
✅ Hosted on Heroku (Socket.IO) + GitHub Pages (static site)

---

## 🧰 Tech Stack Summary

| Layer | Tool | Purpose |
|-------|------|----------|
| **Frontend** | Jekyll + Vanilla JS | Static site, fast iteration |
| **Realtime** | Socket.IO (Node.js) | Communication between controller and displays |
| **Server Hosting** | Heroku Dyno | Free tier hosting for MVP |
| **Frontend Hosting** | GitHub Pages / Netlify | Public access for controller + display pages |

---

## 🧩 Expansion Hooks (Future)
- Supabase integration for persistence and auth  
- League tables and full-day schedules  
- Custom branding per club/event  
- Multiple controller access levels  
- “Auto-next” scheduling mode (timed transitions)

---

**Maintainer:** Reece Williams
**Version:** MVP v1.0
**Date:** 2025-11-12

---

## 🌐 Frontend dependency guidance

- Use [Material UI](https://mui.com/material-ui/getting-started/installation/) via CDN for static updates.
- Load Inter from Google Fonts and keep the Material Icons font available (`https://fonts.googleapis.com/icon?family=Material+Icons`).
- Favor light-theme tokens and components that align with MUI defaults; avoid reintroducing bespoke dark themes.
