# 🎓 CampusPulse — All-in-One College Life Dashboard & Campus Navigator

> Built with modern **HTML5**, **CSS3 (Custom Properties & Glassmorphism)**, and **Vanilla JavaScript (ES6+)**.  
> **100% Client-Side & Zero-Config** — Works offline, saves to `localStorage`, and deploys effortlessly on **GitHub Pages**!

---

## 🌟 Complete Feature Suite

### 1. 🛰️ Interactive Campus Navigator & A-to-B Walking Route Finder
- **High-Resolution Satellite Orthophotos**: Powered by Esri World Imagery with crystal clear satellite zoom and 1-click Street Map toggle.
- **A-to-B Walking Route Finder**: Select any start and destination point across campus; calculates path distance in meters, estimated walking minutes, and calorie burn with an animated route polyline!
- **Realistic 4K Aerial Drone Tours**: Watch cinematic drone walkthrough videos for every major campus building and courtyard.
- **Curated Architectural Photo Galleries**: High-definition exterior and interior photography with interactive carousel and thumbnails.
- **Search & Filter System**: Instant filter by category (*Academic & Labs, Central Library, Cafeteria & Lounge, Sports Complex, Admin, Hostels*) or search by room/department.

### 2. 📅 Interactive Weekly Timetable & "Live Next Class" Radar
- **Live Class Radar**: Automatically detects your computer's live time and highlights the ongoing lecture right now, displaying room number, faculty, and minutes remaining.
- **1-Click Attendance Logging**: Log presence directly from the current active timetable slot.
- **Monday-to-Friday Schedule Grid**: Filter by day and easily add/edit custom class slots.

### 3. 🛡️ Attendance Watchkeeper & Bunk Predictor
- **Configurable Criteria**: Default 75% or custom attendance thresholds.
- **Predictive Bunk Math**:
  - Automatically calculates: *"You can safely skip $S$ more classes without falling below 75%"*.
  - Or in danger zones: *"You must attend $N$ consecutive classes to regain eligibility"*.
- **1-Click Attendance Buttons**: Quick `+ Present` and `+ Absent` loggers for instant updates after each lecture.

### 4. 📊 CGPA & SGPA Academic Forecaster
- **Semester SGPA Calculator**: Input courses, credit weights, and 10-point grades (O, A+, A, B+, B, C, F) to compute instant semester SGPA.
- **Target CGPA Forecaster**: Enter current cumulative CGPA, credits completed, and desired target CGPA. The algorithm tells you the exact SGPA needed across future semesters or warns if mathematically impossible.

### 5. ⏰ Exam & Deadline Tracker
- **Smart Countdown Badges**: Color-coded badges for *Due Today ⚠️*, *Due Tomorrow*, *X days left*, or *Overdue*.
- **Priority Filtering**: Filter by All, Pending, Urgent ($\le 3$ days), or Completed.
- **Assignment Types**: Assignment, Mid-term/Exam, Lab, Presentation/Viva.

### 6. ⏱️ Study Pomodoro & Campus Ambient Sound Synthesizer
- **Focus Intervals**: 25-minute study sprints with 5-minute short break and 15-minute long break modes.
- **Web Audio API Synthesizer (Zero External Audio Files)**:
  - 🌧️ *Quiet Library Rain*
  - ☕ *Campus Cafe Murmur*
  - 🍃 *Gentle Quad Breeze*
- Harmonic bell chime on timer completion.

### 7. 💰 Campus Pocket Money & Canteen Tracker
- Track daily student expenses: *Canteen Snacks, Photocopy/Printing, Stationery, Commute, Books*.
- Auto-calculates remaining monthly balance and **Safe Daily Spending Limit**.

### 8. 📄 Formal Leave / Medical Absence Letter Generator
- Auto-generates a formal academic leave application addressed to the Head of Department.
- **Print / Save as PDF**: Clean print stylesheet (`@media print`) formats an official letterhead ready to submit.

### 9. 🏆 Achievements & Streaks
- Gamified badges unlocked by reaching attendance milestones, high CGPA, and focus sprints.

### 10. 💾 Data Persistence & Portability
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

To push your project to GitHub and deploy with **GitHub Pages**:

```bash
# 1. Add all changes and commit
git add .
git commit -m "Add Timetable, A-to-B Route Finder, Pomodoro, Expense Tracker and Leave Generator"

# 2. Push to GitHub
git push -u origin main
```

Your live website will automatically update on your GitHub Pages link!
