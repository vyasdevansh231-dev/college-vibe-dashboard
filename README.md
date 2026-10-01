# 🎓 CampusPulse — All-in-One College Life Dashboard

> Built with modern **HTML5**, **CSS3 (Custom Properties & Glassmorphism)**, and **Vanilla JavaScript (ES6+)**.  
> **100% Client-Side & Zero-Config** — Works offline, saves to `localStorage`, and deploys effortlessly on **GitHub Pages**!

---

## 🌟 Features

### 1. 🛰️ Interactive Campus Navigator & Virtual Tours (NEW!)
- **High-Resolution Satellite Orthophotos**: Powered by Esri World Imagery with crystal clear satellite zoom and 1-click Street Map toggle.
- **Realistic 4K Aerial Drone Tours**: Watch cinematic drone walkthrough videos for every major campus building and courtyard.
- **Curated Architectural Photo Galleries**: High-definition exterior and interior photography with interactive carousel and thumbnails.
- **Search & Filter System**: Instant filter by category (*Academic & Labs, Central Library, Cafeteria & Lounge, Sports Complex, Admin, Hostels*) or search by room/department (e.g. *Robotics, Lab 402, Gym*).
- **Walking Distance & Open Hours**: Real-time estimates of walking time from the campus gate.

### 2. 🛡️ Attendance Watchkeeper & Bunk Predictor
- **Configurable Criteria**: Default 75% or custom attendance thresholds.
- **Predictive Bunk Math**:
  - Automatically calculates: *"You can safely skip $S$ more classes without falling below 75%"*.
  - Or in danger zones: *"You must attend $N$ consecutive classes to regain eligibility"*.
- **1-Click Attendance Buttons**: Quick `+ Present` and `+ Absent` loggers for instant updates after each lecture.

### 3. 📊 CGPA & SGPA Academic Forecaster
- **Semester SGPA Calculator**: Input courses, credit weights, and 10-point grades (O, A+, A, B+, B, C, F) to compute instant semester SGPA.
- **Target CGPA Forecaster**: Enter current cumulative CGPA, credits completed, and desired target CGPA. The algorithm tells you the exact SGPA needed across future semesters or warns if mathematically impossible.

### 3. ⏰ Exam & Deadline Tracker
- **Smart Countdown Badges**: Color-coded badges for *Due Today ⚠️*, *Due Tomorrow*, *X days left*, or *Overdue*.
- **Priority Filtering**: Filter by All, Pending, Urgent ($\le 3$ days), or Completed.
- **Assignment Types**: Assignment, Mid-term/Exam, Lab, Presentation/Viva.

### 4. 📝 Campus Scratchpad
- Quick directory for faculty office hours, lab door codes, Wi-Fi passwords, and subject links.

### 5. 💾 Data Persistence & Portability
- Automatic persistence using browser `localStorage`.
- Full JSON **Export Backup** and **Import** functionality so you never lose your data across devices.
- Light/Dark mode toggle with persistent theme memory.

---

## 🚀 How to Run Locally

You don't need Node.js, Python, or complex dependencies!

1. Open your project folder in your file explorer:
   `c:\Users\devan\OneDrive\Desktop\Vibe Coding`
2. **Double-click `index.html`** or right-click $\rightarrow$ **Open with Chrome / Edge / Firefox**.
3. That's it! The dashboard will launch immediately.

---

## 🐙 Git & GitHub Setup (Step-by-Step)

To put your project on GitHub and get a free live link using **GitHub Pages**:

### Step 1: Open PowerShell or Terminal in this folder
```bash
git init
git add .
git commit -m "Initial commit: CampusPulse College Life Dashboard"
```

### Step 2: Create a new repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `campuspulse` or `vibe-college-dashboard`).
3. Leave it **Public** and do not add a README (we already created one).
4. Click **Create repository**.

### Step 3: Push your code to GitHub
Run the commands shown on GitHub:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/campuspulse.git
git push -u origin main
```

### Step 4: Enable Free Live Deployment (GitHub Pages)
1. On your GitHub repository page, go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
2. Under **Build and deployment** $\rightarrow$ **Source**, choose **Deploy from a branch**.
3. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
4. In about 60 seconds, your site will be live at:
   `https://YOUR_USERNAME.github.io/campuspulse/`

---

## ⚡ What is "Vibe Coding" with Antigravity?

**Vibe Coding** is an AI-first development approach where you act as the **Architect and Creative Director**, and **Antigravity** acts as your autonomous pair programmer:

1. **You describe intent in natural language**:
   Instead of writing repetitive boilerplate syntax, you define what problem you want to solve (e.g. *"Build an attendance predictor that tells students how many bunks they have left"*).
2. **Antigravity implements the complete architecture**:
   It writes clean, production-ready code, creates files, handles math formulas, designs UI, and validates logic.
3. **Iterative refinement**:
   You can continuously chat with Antigravity to evolve the app:
   - *"Add a timetable tab with Monday to Friday schedule"*
   - *"Add sound effects when completing a task"*
   - *"Add export to PDF for my attendance report"*
