# Nownext.live – Antigravity Context File

## 1. What the Project Is

Nownext.live is a lightweight real-time display system designed for community sports, events, and any situation where schedules, scores, timings, or updates need to be broadcast to multiple screens simultaneously.
It uses a controller → websocket → display pattern, where any authorised controller device can update “what’s happening now” and “what’s happening next,” and all connected displays update instantly.

The project aims to be:
- Simple
- Fast
- Reliable
- Brand-clean

Example use cases:
- Community sports league fixtures
- Venue running orders
- Club nights
- Event production teams
- Tournament scoreboards
- “Next rink/mat/game on” displays
- Ad-hoc information feeds

## 2. Main Pain Points It Solves

### Existing tools are timer-only
Event organisers and clubs need flexible information, not just countdown timers.

### Clubs rely on whiteboards or spreadsheets  
These are slow, error-prone, non-synchronised, and hard to update.

### Solutions are too complex or too expensive  
Clubs want something simple that “just works.”

### People on-site need information anywhere  
Displays can be placed around the venue and stay in sync.

### Multi-screen syncing is difficult  
Nownext.live solves this with broadcast websockets and a clean data model.

## 3. Current Tech Stack (MVP)

**Frontend:**
- Nuxt 4  
- Nuxt UI + TailwindCSS  
- Light mode only  

**Real-time Layer:**
- Socket.io  
- Controller emits updates → websocket server stores → displays update  

**Backend:**
- Lightweight, minimal persistence for MVP
- Future full build likely Supabase-backed

**Hosting:**
- Static Nuxt site (Netlify/Vercel compatible)
- Separate Node-based websocket server (Heroku/Railway/Render)

## 4. Testing

to run this project locally, run the following commands:

```bash
npm run dev -- -o
```

An example controller can be accessed at http://localhost:3000/r/NDST3/controller

An example display can be accessed at http://localhost:3000/r/NDST3/display

A socket.io server is running at https://hidden-journey-22873-ad31037ba953.herokuapp.com