# SmartCrowd AI 🏟️ - Intelligent Crowd & Experience Management System

<div align="center">
  <h3>Next-generation AI-powered queue optimization, incident prediction, and crowd density management designed for Olympic-scale events.</h3>
  <br />
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-View_App-00D4FF?style=for-the-badge&logo=google-cloud&logoColor=white)](https://smartcrowd-app-500190929866.us-central1.run.app)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![Vanilla JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
</div>

---

## 🚀 Live Demo

**Experience the platform live on Google Cloud Run:**
👉 **[SmartCrowd AI - Attendee & Admin Dashboards](https://smartcrowd-app-500190929866.us-central1.run.app)**

---

## 📖 Project Overview

**SmartCrowd AI** is a comprehensive, client-side web application simulation representing the future of smart stadium management. Built specifically for the high-capacity, multi-venue complexities of the Olympic Games, this platform uses simulated real-time data to visually predict, track, and manage crowd densities to ensure safety and maximize the attendee experience.

The platform is split into two primary interfaces:
1. **Attendee Dashboard (`index.html`)**: Focuses on the user experience—helping attendees find optimal seating, tracking live wait times for food/washrooms, predicting crowd flows, and offering smart AI-based navigation to bypass congested sectors.
2. **Admin Command Center (`admin.html`)**: A high-level operational dashboard designed for security teams and event coordinators. It features live simulated CCTV feeds, deep venue-by-venue density heatmaps, active incident tracking, and active staff dispatch systems.

## ✨ In-Depth Feature Breakdown

### 1. Real-Time Venue Heatmaps (`heatmap.js`)
*   **Granular Layout Mapping:** Individual mapping for 6 distinct Olympic venues (Olympic Stadium, Aquatics Center, Athletics Arena, Cycling Velodrome, Tennis Center, Gymnastics Arena).
*   **Dynamic Data Visuals:** HTML5 Canvas rendering engine translates real-time crowd percentage data into smooth gradient heat areas displaying color-coded statuses (🟢 Optimal, 🟠 High, 🔴 Critical).
*   **Zone Segmentation:** Internal breakdown of venues down to specific sections (e.g., Gate A, South Wing, VIP Lounge, Washrooms) to pinpoint exact congestion spots.

### 2. A* Smart Navigation System (`navigation.js`)
*   **Intelligent Pathfinding:** Simulates dynamic routing mechanisms across the stadium footprint.
*   **Congestion Avoidance:** Continuously reads crowd density across different graph nodes. When a corridor becomes congested (e.g., hitting > 85% capacity), the algorithm dynamically reroutes attendees to a slightly longer but significantly faster optimal path.
*   **Real-time Timeline Updates:** Provides live ETA shifts based on active foot traffic. 

### 3. Queue Efficiency & Wait Time Tracking (`queues.js`)
*   Provides live wait-time estimates for high-friction areas: Ticketing, Merchandise Stores, Food Courts, and Restrooms.
*   Simulates "Before AI vs. After AI" efficiency metrics, allowing managers to visually track ROI on dynamic queue routing.

### 4. Predictive Forecaster & Alert Timelines (`alerts.js`)
*   **AI Crowd Prediction Chart:** Line/spline charts built purely in HTML Canvas that track current density and forecast crowd peaks 2 hours into the future based on simulated ingress patterns.
*   **Severity-Tiered Alerting:** Generates dynamic incident reports (e.g., "Emergency Exit Obstructed", "Food Court Surge") and auto-categorizes them by urgency (Low, Medium, High, Critical).

### 5. Multilingual & Localization App (`i18n.js`)
*   Extensive real-time localization dictionary supporting **8 worldwide languages**.
*   Languages included: English, Hindi, French, Spanish, Chinese, Japanese, Arabic (with full right-to-left UI alignment support), and Portuguese.
*   Context retains state without needing a page refresh.

### 6. Admin Panel Mechanics (`admin.html`)
*   **Simulated CCTV Monitor:** A grid of animated panels utilizing scan-lines and live AI pedestrian-counts simulating an active security room interface.
*   **Staff Coordination Table:** Active duty rosters mapped alongside a "Deploy Personnel" modal allowing admins to assign standby crowd managers to struggling sectors instantly.

---

## 🛠 Hardware & Tech Stack

This project was intentionally designed to run blisteringly fast without relying on heavy Node modules, external charting libraries like Chart.js, or backend servers.

*   **Core Logic:** Vanilla JavaScript (ES6+), maximizing native browser processing capabilities.
*   **Markup / Style:** HTML5, CSS3, and Tailwind CSS (via CDN configuration) to allow rapid utility-first UI building.
*   **Data Visualization:** HTML5 `<canvas>`, built entirely from scratch with raw `ctx` drawing commands handling bezier curves, rounded borders, gradient scaling, and grid mapping.
*   **Aesthetic Principle:** Heavy usage of **Glassmorphism** — translucent panels, heavy background blur layers (`backdrop-blur-md`), deep dark-mode backgrounds, and vibrant neon accents mimicking a futuristic cyberpunk HUD.
*   **Hosting & Deployment:** Containerized with Docker and hosted serverless on Google Cloud Run.

---

## 🎯 Local Development (Getting Started)

No `npm install` or complex database setup is required. The entire application runs directly on the local browser environment.

1. **Clone or Download** this directory to your machine:
   ```bash
   git clone https://github.com/Yogesh4918/SmartCrowd-AI-Olympic.git
   ```
2. Ensure you have a standard local development server to avoid CORS issues with certain script references. If you have VS Code, simply right click `index.html` and use **Live Server**.
   *Alternatively, via terminal:*
   ```bash
   # NodeJS
   npx serve .
   
   # Python 3
   python -m http.server 3000
   ```
3. Visit `http://localhost:3000` locally.
4. **Interact**: Change languages via the globe icon, test out the different venue mappings under Heatmaps, and click "Admin Panel" to test the command center functions.

---

## 🎨 Design Previews

The application uses an immersive dark-theme interface with neon accenting and responsive layouts optimized for Mobile, Tablet, and Desktop displays.

---

<div align="center">
  <h3>Made with ❤️ by Yogesh Patel</h3>
  <p><b>Developed for The Olympic Smart City & Crowd Intelligence Initiative</b></p>
</div>
