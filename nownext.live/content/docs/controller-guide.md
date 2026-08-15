---
title: "Controller Dashboard Guide"
description: "Comprehensive guide to managing spaces, editing sessions, advancing Now & Next matches, and monitoring connected displays."
category: "Getting Started"
order: 2
date: "2026-08-14"
author: "NowNext Team"
tags: ["Controller", "Management", "Organizer"]
draft: false
---

# Controller Dashboard Guide

The **Controller** is the command center of your NowNext.live event. Designed for high-speed operation on mobile devices and desktop computers, it allows organizers to update schedules instantly while matches or sessions progress.

---

## Accessing the Controller

- **URL Structure**: `/r/[event_id]/controller`
- **Ownership & Control**:
  - Unclaimed events can be managed by anyone with the controller link.
  - Claimed events require signing into your NowNext.live organizer account.

---

## Key Interface Components

### 1. Event Header & Navigation
- **Event Name**: Displays the active event title with an inline edit option.
- **Output Links Button**: Opens the modal containing all public display URLs and QR codes.
- **Live Connected Displays Counter**: Displays the number of currently connected screens listening to real-time updates via Supabase presence channels.

### 2. Spaces Management (Courts / Rooms)
- **Add Space**: Create new locations (e.g. *Court 3*, *VIP Lounge*).
- **Edit / Reorder**: Rename spaces or reorder their position on main display screens.
- **Delete Space**: Remove empty or inactive spaces.

### 3. Session Controls (Now & Next)
- **Current Session ("NOW")**: Shows the match or talk currently taking place on that space.
- **Upcoming Session ("NEXT")**: Shows the next scheduled match or talk lined up.
- **Advance Session Button (`▶ Next`)**:
  - One-tap action that finishes the current session and instantly promotes the "NEXT" session into the "NOW" slot.
  - Automatically fetches the following queued session into the "NEXT" slot.

---

## Detailed User Workflows

### Creating and Editing Sessions
- **Adding a Session**:
  - Click **+ Add Session** under the target space.
  - Input Session Title (e.g. *Quarter-Final: Team A vs. Team B*), Category/Division (*Men's Singles*), Start Time, and Duration.
- **Editing Active Sessions**:
  - Click any session card to adjust participant names, scores, or start times on the fly.
  - Changes save automatically and push to all connected displays in under 200ms.

### Reordering and Rescheduling
- **Drag-and-Drop / Reordering**: Rearrange upcoming sessions if a match runs late or a player is delayed.
- **Moving Sessions Between Spaces**: Transfer a delayed session from Court 1 to Court 3 to maintain schedule velocity.

---

## Best Practices for Event Organizers

- **Use Mobile Phones for On-Court Scorers**: Umpires or volunteers standing on court can tap `▶ Next` on their smartphones as soon as a match ends.
- **Monitor Connected Displays**: Check the green indicator dot in the header to ensure all venue TVs remain connected to the internet.
- **Claim Your Event**: Always claim your event to prevent unauthorized visitors from accessing controller controls.
