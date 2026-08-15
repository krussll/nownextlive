---
title: "OBS Studio & Livestream Overlay Integration"
description: "Embed live-updating Now & Next schedule cards into OBS Studio and vMix broadcasts for live event streaming."
category: "Guides & Integrations"
order: 10
date: "2026-08-14"
author: "NowNext Team"
tags: ["OBS Studio", "vMix", "Livestream", "Browser Source", "Overlay"]
draft: false
---

# OBS Studio & Livestream Overlay Integration

Enhance your live broadcast with real-time lower-thirds and screen overlays showing upcoming matches and current sessions. NowNext.live display links can be added directly into OBS Studio, vMix, and Streamlabs as **Browser Sources**.

---

## Adding a Browser Source in OBS Studio

1. Open **OBS Studio** and select your active Scene.
2. Under **Sources**, click **+ (Add)** → Select **Browser**.
3. Name the source (e.g., *NowNext Schedule Overlay*).
4. Set Source Properties:
   - **URL**: Paste your Main Display or Space Display link.
   - **Width**: `1920` (or `1280`)
   - **Height**: `1080` (or `720`)
   - **Custom CSS**: (Optional) Add background transparency overrides if desired.
5. Click **OK**. The live schedule will immediately render in your broadcast preview.

---

## vMix Integration Setup

1. In **vMix**, click **Add Input** (bottom left).
2. Select **Web Browser**.
3. URL: Enter your NowNext display link.
4. Set Resolution to `1920x1080`.
5. Position overlay into production mix using vMix MultiView or Layering.

---

## Broadcast Best Practices

- **Dedicated Stream View**: Use single-space views for court camera streams (e.g. *Court 1 Stream overlay*).
- **Instant Graphics Update**: When show director advances a match on their smartphone, OBS overlay graphics update instantly in the broadcast without manual graphic switching.
