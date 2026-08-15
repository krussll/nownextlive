# Project Context & Documentation: NowNext.live

This document outlines the core purpose, technical architecture, UI/design system, and marketing context for **NowNext.live**. Use this document as authoritative context for all future feature development, UI updates, and content additions.

---

## 1. Application Purpose & Vision

**NowNext.live** (`nownext.live`) is a real-time event, sports club, and tournament scheduling platform designed to broadcast what is happening **NOW** and what is coming **NEXT** across multiple screens simultaneously.

### The Core Problem Solved
Traditional events and sports clubs rely on printed sheets, whiteboards, or manual announcements. When matches run late or schedules change:
- Information becomes outdated immediately.
- Participants crowd around desks asking "Am I on next?" or "Which court am I playing on?".
- Event organizers and volunteers spend their day manually rewriting schedules instead of managing the event.

### The NowNext Solution
- **Instant Real-Time Synchronization**: Any schedule update made in the controller dashboard broadcasts instantly to all public display screens.
- **Zero Friction**: Operates completely within web browsers on any internet-connected device (Smart TVs, iPads/tablets, laptops, phones). No mobile app downloads required.
- **Clear Visibility**: High-contrast, easy-to-read "Now" & "Next" schedule cards built for venue visibility.

---

## 2. Technical Architecture & Stack

- **Framework**: Nuxt 4 (Vue 3, SSR & SSG capable).
- **UI & Components**: Nuxt UI v3 (`@nuxt/ui`).
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`).
- **Icons**: Lucide Icons & Heroicons via Nuxt UI (`i-lucide-*`, `i-heroicons-*`).
- **Database & Realtime**: Supabase (`@nuxtjs/supabase`, `@supabase/supabase-js`) utilizing real-time presence channels and RPC calls (`get_event`, `update_full_event`, `claim_event`).
- **Content Engine**: Nuxt Content v3 (`@nuxt/content`) for Blog and Documentation collections.
- **Monetization**: Lemon Squeezy webhooks (`/api/webhooks/lemon-squeezy.post.ts`) for subscription management and display limits.

---

## 3. Key Pages & Routes

- `/`: Landing page featuring product value propositions, live demo preview, use cases, and CTA sections.
- `/blog`: Blog listing page displaying articles in a responsive 2-column cardless grid with author avatars and publish dates (Stagetimer.io inspired design).
- `/blog/[...slug]`: Individual blog post page with clean typography container (`max-w-3xl`), metadata bar (`← Back`, date, author avatar), and article footer navigation.
- `/contact`: Contact form submitting messages to Supabase (`/api/contact.post.ts`).
- `/r/generate`: Instant event creation generator.
- `/r/[id]`: Main public display view for event participants showing current and upcoming sessions.
- `/r/[id]/schedule`: Full event schedule grid view.
- `/r/[id]/controller`: Organizer control dashboard to manage spaces, advance sessions, update details, and monitor connected display counts.

---

## 4. Design & UI System

### Color Palette & Aesthetics
- **Theme**: Clean, sharp, modern light-mode primary (`neutral` & `indigo` accent palette).
- **Header & Footer**:
  - `UHeader` with logo, navigation menu, account buttons, and color mode toggle.
  - `UFooter` with 4-column layout (`Product`, `Compare`, `Use Cases`, `Resources`).
  - Tightened footer bottom bar displaying `Version X.X.X` on the left and `Made in England` on the right.

### Component Guidelines
- **Buttons (`UButton`)**: Sharp rectangular styling (`rounded-none`), bold text, hover shadow elevation (`hover:shadow-lg`).
- **Form Inputs (`UInput`, `UTextarea`, `UInputTime`)**: Strict sizing standard `w-full h-12` (48px height) for consistent UI flow across forms.
- **Article & Content Cards**: Clean, outline-free links with soft hover backgrounds (`hover:bg-gray-50 dark:hover:bg-gray-800`), explicit author attribution, and formatted dates.

---

## 5. Marketing Context & Positioning

### Value Proposition
"Replace paper schedules and tournament chaos with live-updating match displays in under 10 minutes."

### Primary Target Audiences
1. **Sports Clubs & Tournament Directors**: Badminton, tennis, squash, martial arts, football, padel, eSports.
2. **Event & Production Managers**: Conferences, seminars, livestreams, broadcast studios, hybrid events.
3. **Venue & Meeting Coordinators**: Corporate meetings, presentation halls, educational centers.

### Key Differentiators
- **No App Downloads Required**: Players and spectators scan a QR code or open a URL.
- **Ultra-Fast Setup**: Event setup completed in minutes.
- **Multi-Screen Support**: Control dozens of court/room screens from one master phone or laptop.

---

## 6. Feature Branching & Implementation Plan Workflow

- **Feature Branch Requirement**: Every new feature that requires an implementation plan MUST be developed on a newly created feature branch.
- **First Action Item**: Creating and checking out the new Git feature branch MUST always be the first step in the implementation plan.
- **Single Feature Scope**: Each implementation plan MUST focus on exactly ONE feature/item at a time.
- **Pushing Back on Multi-Item Requests**: If a prompt or request contains multiple feature additions or changes at once, push back to confirm with the user which specific feature to address first in the new plan.
- **Pull Request Target**: For each new feature request, create a Pull Request (PR) from the feature branch to `release-staging`.
