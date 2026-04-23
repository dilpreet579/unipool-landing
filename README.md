# UniPool — Landing Page
> **Campus rides, without the hassle.** — The official marketing and download landing page for the UniPool mobile application.

## 📌 Overview

This repository contains the **landing page** for **UniPool**, a student-exclusive carpooling app for Android. The landing page serves as the primary download hub and marketing site while the app awaits Play Store and App Store approval.

The page allows students to:
- Learn about UniPool's features and how it works
- Download the Android APK directly
- Scan a QR code (on desktop) to send the APK download link to their phone

---

## ✨ Page Sections

- **Hero** — Full-bleed video background, headline, APK download button, and QR code popover (desktop only)
- **Proof Strip** — Key stats: ₹0 platform fee, 2 min to post a ride, 100% student-verified, real-time chat
- **Features** — Four feature cards: Nearby Ride Discovery, In-App Chat, Verified Students Only, Transparent Fares
- **How It Works** — Three-step onboarding walkthrough (Sign up → Browse/Post → Request & Go)
- **FAQ** — Accordion-style answers to common questions
- **CTA / Download** — Secondary download button and waitlist prompt

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v18.0.0 or higher
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd unipool-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📱 APK Distribution

The Android APK is hosted externally (recommended: **GitHub Releases**) and the landing page points to it via the `NEXT_PUBLIC_APK_URL` environment variable.

Example:
`NEXT_PUBLIC_APK_URL=https://github.com/<owner>/<repo>/releases/latest/download/unipool.apk`

A QR code popover on the hero section lets desktop visitors instantly send the download link to their phone.

---

## 📄 License

© 2026 UniPool. All rights reserved.