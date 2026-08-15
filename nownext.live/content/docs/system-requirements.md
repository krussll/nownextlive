---
title: "System Requirements & Compatibility"
description: "Hardware, browser, and network requirements for running NowNext.live controller and display screens smoothly."
category: "Getting Started"
order: 3
date: "2026-08-14"
author: "NowNext Team"
tags: ["System Requirements", "Hardware", "Network", "Browsers"]
draft: false
---

# System Requirements & Compatibility

NowNext.live is built on modern web standards (HTML5, WebSockets, Vue/Nuxt 3, Tailwind CSS v4) to ensure effortless compatibility across diverse hardware without specialized software installation.

---

## Supported Browsers & Operating Systems

### Display Devices (Smart TVs, Digital Signage, Tablets)
- **Smart TV Browsers**:
  - Samsung Tizen OS (2019 or newer)
  - LG webOS 4.0+
  - Android TV / Google TV (Chrome, WebView, or Silk browser)
  - Amazon Fire TV (Amazon Silk Browser)
- **Tablets & Mobile**:
  - iOS 14.0+ (Safari, Chrome)
  - Android 8.0+ (Chrome, Firefox, Edge)
- **Desktop & PC**:
  - Google Chrome (latest 2 versions)
  - Apple Safari (latest 2 versions)
  - Microsoft Edge (latest 2 versions)
  - Mozilla Firefox (latest 2 versions)

---

## Network & Internet Bandwidth

### Bandwidth Consumption
- **Ultra-Low Bandwidth Requirement**: NowNext.live utilizes Supabase WebSockets (Real-time Presence & RPCs).
- **Data Transfer**: Less than **5 KB** of data per schedule update. An 8-hour tournament with 100 match updates consumes under **2 MB** of mobile data.

### Wi-Fi & Internet Stability
- **Offline Resiliency**: If Wi-Fi briefly drops, connected display screens retain the last rendered schedule on screen without showing an error box.
- **Auto-Reconnection**: When internet connectivity resumes, WebSockets automatically reconnect and fetch the latest schedule state seamlessly.

---

## Recommended Hardware Specs

| Device Role | Recommended Hardware | Key Considerations |
| :--- | :--- | :--- |
| **Organizer Controller** | Smartphone, iPad, or Laptop | Mobile web browser, touch screen enabled |
| **Main Entrance Display** | 43"–65" 4K Smart TV or Commercial Monitor | Landscape orientation, continuous power, browser full-screen |
| **Court / Space Display** | 10"–12" Android or iPad Tablet | High screen brightness, wall/stand mount, Guided Access |
| **Livestream Overlay** | OBS Studio / vMix PC | Dual monitor setup, 1080p/4K output resolution |
