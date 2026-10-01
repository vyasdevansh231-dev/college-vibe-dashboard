/**
 * CampusPulse — College Life Dashboard & Watchkeeper
 * Pure Vanilla JavaScript (ES6+) with LocalStorage persistence.
 * Zero external dependencies.
 */

// --- Default Seed Data for New Users ---
const DEFAULT_DATA = {
  theme: 'dark',
  threshold: 75,
  subjects: [
    { id: 'sub-1', name: 'Data Structures & Algorithms', code: 'CS201 • Lab 3', attended: 26, total: 30, target: 75 },
    { id: 'sub-2', name: 'Computer Networks', code: 'CS204 • Hall B', attended: 18, total: 25, target: 75 },
    { id: 'sub-3', name: 'Database Management Systems', code: 'CS203 • Room 402', attended: 15, total: 22, target: 75 },
    { id: 'sub-4', name: 'Linear Algebra & Calculus', code: 'MA201 • Hall A', attended: 21, total: 24, target: 75 }
  ],
  courses: [
    { id: 'c-1', name: 'Data Structures & Algorithms', credits: 4, gradePoints: 9 }, // A+
    { id: 'c-2', name: 'Computer Networks', credits: 3, gradePoints: 8 }, // A
    { id: 'c-3', name: 'Database Management Systems', credits: 4, gradePoints: 9 }, // A+
    { id: 'c-4', name: 'Linear Algebra & Calculus', credits: 4, gradePoints: 8 } // A
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'DBMS Lab Assignment 3 (SQL Joins)',
      course: 'Database Management Systems',
      type: 'assignment',
      dueDate: getFutureDate(2),
      priority: 'high',
      notes: 'Submit schema diagrams and queries on campus portal.',
      completed: false
    },
    {
      id: 'task-2',
      title: 'Mid-Term Exam: Computer Networks',
      course: 'Computer Networks',
      type: 'exam',
      dueDate: getFutureDate(5),
      priority: 'high',
      notes: 'Chapters 1-4: OSI Model, TCP/IP, Routing Algorithms.',
      completed: false
    },
    {
      id: 'task-3',
      title: 'DSA Tree Traversals LeetCode Sheet',
      course: 'Data Structures & Algorithms',
      type: 'lab',
      dueDate: getFutureDate(7),
      priority: 'medium',
      notes: 'Solve BFS and DFS problems before Friday lab.',
      completed: true
    }
  ],
  notes: [
    {
      id: 'note-1',
      title: 'Prof. Sharma Office Hours',
      tag: 'Faculty',
      content: 'Room 304, Academic Block 2.\nAvailable: Tuesdays & Thursdays from 2:00 PM to 4:30 PM.',
      date: 'Oct 1, 2026'
    },
    {
      id: 'note-2',
      title: 'Campus Wi-Fi & Library Passwords',
      tag: 'Campus Guide',
      content: 'SSID: Campus_Student_5G\nProxy Config: 172.16.1.1:8080\nLibrary digital portal username: Roll Number.',
      date: 'Oct 1, 2026'
    }
  ]
};

// Helper: generate relative future date strings (YYYY-MM-DD)
function getFutureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

// --- App State & Storage Management ---
const STORAGE_KEY = 'campuspulse_data_v1';

class AppState {
  constructor() {
    this.data = this.load();
  }

  load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state, resetting to defaults.', e);
      }
    }
    this.save(DEFAULT_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  save(customData = null) {
    if (customData) this.data = customData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.save();
  }
}

const state = new AppState();

// --- DOM References ---
const DOM = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  menuToggle: document.getElementById('menuToggle'),
  sidebar: document.querySelector('.sidebar'),
  navItems: document.querySelectorAll('.nav-item'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  pageTitle: document.getElementById('pageTitle'),
  currentDateText: document.getElementById('currentDateText'),

  // Quick chips
  topAttendanceVal: document.getElementById('topAttendanceVal'),
  topCgpaVal: document.getElementById('topCgpaVal'),

  // Overview
  navAttendanceAlert: document.getElementById('nav-attendance-alert'),
  navTaskCount: document.getElementById('nav-task-count'),
  overviewAvgAttendance: document.getElementById('overviewAvgAttendance'),
  overviewAttendanceStatus: document.getElementById('overviewAttendanceStatus'),
  overviewAttendanceBar: document.getElementById('overviewAttendanceBar'),
  overviewAttendanceDesc: document.getElementById('overviewAttendanceDesc'),
  overviewCgpaValue: document.getElementById('overviewCgpaValue'),
  overviewPendingTasksCount: document.getElementById('overviewPendingTasksCount'),
  overviewDueBadge: document.getElementById('overviewDueBadge'),
  overviewNextTaskText: document.getElementById('overviewNextTaskText'),
  overviewBunkStatus: document.getElementById('overviewBunkStatus'),
  overviewBunkDetail: document.getElementById('overviewBunkDetail'),
  overviewSubjectList: document.getElementById('overviewSubjectList'),
  overviewTaskList: document.getElementById('overviewTaskList'),

  // Attendance
  criteriaThresholdInput: document.getElementById('criteriaThresholdInput'),
  saveThresholdBtn: document.getElementById('saveThresholdBtn'),
  attendanceCardsContainer: document.getElementById('attendanceCardsContainer'),
  openAddSubjectModalBtn: document.getElementById('openAddSubjectModalBtn'),
  subjectModal: document.getElementById('subjectModal'),
  closeSubjectModal: document.getElementById('closeSubjectModal'),
  cancelSubjectModal: document.getElementById('cancelSubjectModal'),
  subjectForm: document.getElementById('subjectForm'),
  editSubjectId: document.getElementById('editSubjectId'),
  subName: document.getElementById('subName'),
  subCode: document.getElementById('subCode'),
  subAttended: document.getElementById('subAttended'),
  subTotal: document.getElementById('subTotal'),
  subTarget: document.getElementById('subTarget'),

  // CGPA
  openAddCourseModalBtn: document.getElementById('openAddCourseModalBtn'),
  courseModal: document.getElementById('courseModal'),
  closeCourseModal: document.getElementById('closeCourseModal'),
  cancelCourseModal: document.getElementById('cancelCourseModal'),
  courseForm: document.getElementById('courseForm'),
  courseTableBody: document.getElementById('courseTableBody'),
  computedSgpa: document.getElementById('computedSgpa'),
  totalCreditsVal: document.getElementById('totalCreditsVal'),
  totalCreditPointsVal: document.getElementById('totalCreditPointsVal'),
  calcTargetSgpaBtn: document.getElementById('calcTargetSgpaBtn'),
  targetCurrentCgpa: document.getElementById('targetCurrentCgpa'),
  targetCompletedCredits: document.getElementById('targetCompletedCredits'),
  targetDesiredCgpa: document.getElementById('targetDesiredCgpa'),
  targetUpcomingCredits: document.getElementById('targetUpcomingCredits'),
  forecastResultBox: document.getElementById('forecastResultBox'),

  // Tasks
  openAddTaskModalBtn: document.getElementById('openAddTaskModalBtn'),
  taskModal: document.getElementById('taskModal'),
  closeTaskModal: document.getElementById('closeTaskModal'),
  cancelTaskModal: document.getElementById('cancelTaskModal'),
  taskForm: document.getElementById('taskForm'),
  tasksListContainer: document.getElementById('tasksListContainer'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  countAll: document.getElementById('count-all'),
  countPending: document.getElementById('count-pending'),
  countCompleted: document.getElementById('count-completed'),

  // Notes
  openAddNoteModalBtn: document.getElementById('openAddNoteModalBtn'),
  noteModal: document.getElementById('noteModal'),
  closeNoteModal: document.getElementById('closeNoteModal'),
  cancelNoteModal: document.getElementById('cancelNoteModal'),
  noteForm: document.getElementById('noteForm'),
  notesGridContainer: document.getElementById('notesGridContainer'),

  // Campus Navigator & Map
  campusSearchInput: document.getElementById('campusSearchInput'),
  quickRoomJumpSelect: document.getElementById('quickRoomJumpSelect'),
  mapCategoryPills: document.getElementById('mapCategoryPills'),
  mapSidebarPanel: document.getElementById('mapSidebarPanel'),
  sideBldgPhoto: document.getElementById('sideBldgPhoto'),
  sideBldgCategory: document.getElementById('sideBldgCategory'),
  sideBldgTitle: document.getElementById('sideBldgTitle'),
  sideBldgCode: document.getElementById('sideBldgCode'),
  sideBldgDesc: document.getElementById('sideBldgDesc'),
  sideBldgHighlights: document.getElementById('sideBldgHighlights'),
  sideBldgHours: document.getElementById('sideBldgHours'),
  sideBldgWalk: document.getElementById('sideBldgWalk'),
  openTourVideoBtn: document.getElementById('openTourVideoBtn'),
  toggleMapLayerBtn: document.getElementById('toggleMapLayerBtn'),
  resetMapCenterBtn: document.getElementById('resetMapCenterBtn'),
  mapLayerIcon: document.getElementById('mapLayerIcon'),
  mapLayerText: document.getElementById('mapLayerText'),

  // Media Modal
  campusMediaModal: document.getElementById('campusMediaModal'),
  closeMediaModal: document.getElementById('closeMediaModal'),
  mediaModalTitle: document.getElementById('mediaModalTitle'),
  mediaModalSubtitle: document.getElementById('mediaModalSubtitle'),
  tabBtnVideo: document.getElementById('tabBtnVideo'),
  tabBtnPhotos: document.getElementById('tabBtnPhotos'),
  paneVideoTour: document.getElementById('paneVideoTour'),
  panePhotoGallery: document.getElementById('panePhotoGallery'),
  campusTourVideo: document.getElementById('campusTourVideo'),
  videoCaptionText: document.getElementById('videoCaptionText'),
  featuredGalleryImg: document.getElementById('featuredGalleryImg'),
  photoCaptionText: document.getElementById('photoCaptionText'),
  photoThumbnailsRow: document.getElementById('photoThumbnailsRow'),

  // Data Actions
  exportDataBtn: document.getElementById('exportDataBtn'),
  importDataInput: document.getElementById('importDataInput'),
  resetDemoBtn: document.getElementById('resetDemoBtn'),
  toastContainer: document.getElementById('toastContainer')
};

let currentTaskFilter = 'all';

// --- Toast Notification Helper ---
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'danger' ? '⚠️' : '✅'}</span> <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Attendance Math & Bunk Logic ---
function calculateAttendanceStats(attended, total, targetThreshold) {
  const percentage = total === 0 ? 100 : (attended / total) * 100;
  const isSafe = percentage >= targetThreshold;

  let bunkVerdict = '';
  let safeSkips = 0;
  let neededClasses = 0;

  if (isSafe) {
    // How many can bunk without falling below targetThreshold?
    // attended / (total + x) >= targetThreshold / 100
    // => x <= (100 * attended - targetThreshold * total) / targetThreshold
    safeSkips = Math.floor((100 * attended - targetThreshold * total) / targetThreshold);
    if (safeSkips <= 0) {
      bunkVerdict = `On the borderline! Do not miss your next class.`;
    } else {
      bunkVerdict = `You can safely bunk <strong>${safeSkips}</strong> class${safeSkips > 1 ? 'es' : ''} and remain above ${targetThreshold}%.`;
    }
  } else {
    // How many consecutive classes needed to recover?
    // (attended + y) / (total + y) >= targetThreshold / 100
    // => y >= (targetThreshold * total - 100 * attended) / (100 - targetThreshold)
    neededClasses = Math.ceil((targetThreshold * total - 100 * attended) / (100 - targetThreshold));
    bunkVerdict = `Critical! Must attend <strong>${neededClasses}</strong> consecutive class${neededClasses > 1 ? 'es' : ''} to recover to ${targetThreshold}%.`;
  }

  return {
    percentage: Math.round(percentage * 10) / 10,
    isSafe,
    safeSkips,
    neededClasses,
    bunkVerdict
  };
}

// --- Navigation Tabs ---
window.switchTab = function(tabName) {
  DOM.navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  DOM.tabPanes.forEach(pane => {
    pane.classList.toggle('active', pane.id === `pane-${tabName}`);
  });

  // Update Page Title
  const titles = {
    overview: 'College Overview & Stats',
    map: 'Campus Navigator & Virtual Satellite Tours',
    attendance: 'Attendance Watchkeeper & Bunk Predictor',
    cgpa: 'CGPA & Academic Performance',
    tasks: 'Deadlines, Exams & Submissions',
    notes: 'Campus Notes & Directory'
  };
  DOM.pageTitle.textContent = titles[tabName] || 'CampusPulse';

  if (tabName === 'map') {
    initOrResizeCampusMap();
  }

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    DOM.sidebar.classList.remove('open');
  }
};

DOM.navItems.forEach(item => {
  item.addEventListener('click', () => {
    window.switchTab(item.dataset.tab);
  });
});

if (DOM.menuToggle) {
  DOM.menuToggle.addEventListener('click', () => {
    DOM.sidebar.classList.toggle('open');
  });
}

// --- Theme Switcher ---
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  state.data.theme = theme;
  state.save();
}

DOM.themeToggleBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// --- RENDER 1: OVERVIEW PANE ---
function renderOverview() {
  const subjects = state.data.subjects;
  const tasks = state.data.tasks;
  const threshold = state.data.threshold || 75;

  // 1. Overall Attendance
  let totalAttended = 0;
  let totalConducted = 0;
  let dangerCount = 0;

  subjects.forEach(s => {
    totalAttended += Number(s.attended);
    totalConducted += Number(s.total);
    const pct = s.total > 0 ? (s.attended / s.total) * 100 : 100;
    if (pct < (s.target || threshold)) dangerCount++;
  });

  const overallPct = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 10) / 10 : 100;
  DOM.overviewAvgAttendance.textContent = `${overallPct}%`;
  DOM.topAttendanceVal.textContent = `${overallPct}%`;
  DOM.overviewAttendanceBar.style.width = `${Math.min(100, overallPct)}%`;

  if (overallPct >= threshold) {
    DOM.overviewAttendanceStatus.textContent = 'Safe & Eligible';
    DOM.overviewAttendanceStatus.className = 'stat-badge';
  } else {
    DOM.overviewAttendanceStatus.textContent = 'Attendance Risk';
    DOM.overviewAttendanceStatus.className = 'stat-badge badge-warning';
  }

  DOM.overviewAttendanceDesc.textContent = `${totalAttended} of ${totalConducted} classes attended across ${subjects.length} subjects.`;
  DOM.navAttendanceAlert.textContent = dangerCount;
  DOM.navAttendanceAlert.style.display = dangerCount > 0 ? 'inline-block' : 'none';

  // 2. CGPA
  const sgpa = computeSemesterSgpa();
  DOM.overviewCgpaValue.textContent = sgpa.toFixed(2);
  DOM.topCgpaVal.textContent = sgpa.toFixed(2);

  // 3. Pending tasks
  const pendingTasks = tasks.filter(t => !t.completed);
  DOM.overviewPendingTasksCount.textContent = pendingTasks.length;
  DOM.navTaskCount.textContent = pendingTasks.length;

  const urgentTasks = pendingTasks.filter(t => {
    const days = getDaysUntil(t.dueDate);
    return days >= 0 && days <= 3;
  });
  DOM.overviewDueBadge.textContent = `${urgentTasks.length} Urgent`;

  if (pendingTasks.length > 0) {
    const nextTask = [...pendingTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
    const days = getDaysUntil(nextTask.dueDate);
    DOM.overviewNextTaskText.textContent = `Next: "${nextTask.title}" (${days === 0 ? 'Due Today' : days + 'd left'})`;
  } else {
    DOM.overviewNextTaskText.textContent = 'All caught up! Zero pending tasks.';
  }

  // 4. Overall Bunk Status
  if (dangerCount === 0) {
    DOM.overviewBunkStatus.textContent = 'Good Standing';
    DOM.overviewBunkDetail.textContent = 'All subjects satisfy attendance criteria.';
  } else {
    DOM.overviewBunkStatus.textContent = `${dangerCount} At Risk`;
    DOM.overviewBunkDetail.textContent = 'Immediate attendance recovery required!';
  }

  // Quick Subject List
  DOM.overviewSubjectList.innerHTML = '';
  if (subjects.length === 0) {
    DOM.overviewSubjectList.innerHTML = `<p class="small-text">No subjects added yet. Click "Manage All" to start.</p>`;
  } else {
    subjects.slice(0, 4).forEach(sub => {
      const stats = calculateAttendanceStats(sub.attended, sub.total, sub.target || threshold);
      const div = document.createElement('div');
      div.className = 'quicklist-item';
      div.innerHTML = `
        <div>
          <strong>${escapeHtml(sub.name)}</strong>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">${sub.attended}/${sub.total} classes attended</div>
        </div>
        <div style="text-align: right;">
          <span class="sub-pct-badge ${stats.isSafe ? 'pct-safe' : 'pct-danger'}" style="font-size: 0.85rem; padding: 2px 6px;">
            ${stats.percentage}%
          </span>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
            ${stats.isSafe ? `+${stats.safeSkips} safe` : `Need ${stats.neededClasses}`}
          </div>
        </div>
      `;
      DOM.overviewSubjectList.appendChild(div);
    });
  }

  // Quick Task List
  DOM.overviewTaskList.innerHTML = '';
  if (tasks.length === 0) {
    DOM.overviewTaskList.innerHTML = `<p class="small-text">No deadlines scheduled. Click "Add New" to track exams & assignments.</p>`;
  } else {
    const listToDisplay = tasks.slice(0, 3);
    listToDisplay.forEach(task => {
      const days = getDaysUntil(task.dueDate);
      const div = document.createElement('div');
      div.className = 'quicklist-item';
      div.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="window.toggleTaskStatus('${task.id}')">
          <span style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
            ${escapeHtml(task.title)}
          </span>
        </div>
        <span class="task-countdown ${days < 0 ? 'countdown-overdue' : (days <= 3 ? 'countdown-urgent' : 'countdown-normal')}">
          ${formatDaysLabel(days)}
        </span>
      `;
      DOM.overviewTaskList.appendChild(div);
    });
  }
}

// --- RENDER 2: ATTENDANCE WATCHKEEPER ---
function renderAttendance() {
  const subjects = state.data.subjects;
  const globalThreshold = state.data.threshold || 75;
  DOM.criteriaThresholdInput.value = globalThreshold;
  DOM.attendanceCardsContainer.innerHTML = '';

  if (subjects.length === 0) {
    DOM.attendanceCardsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No subjects added yet.</p>
        <button class="btn btn-primary" style="margin-top: 12px;" onclick="window.openAddSubjectModal()">+ Add Your First Subject</button>
      </div>
    `;
    return;
  }

  subjects.forEach(sub => {
    const target = sub.target || globalThreshold;
    const stats = calculateAttendanceStats(sub.attended, sub.total, target);
    const card = document.createElement('div');
    card.className = 'card glass-card subject-card';

    let badgeClass = 'pct-safe';
    if (stats.percentage < target) {
      badgeClass = stats.percentage < target - 10 ? 'pct-danger' : 'pct-warning';
    }

    card.innerHTML = `
      <div class="sub-header">
        <div class="sub-title-box">
          <h4>${escapeHtml(sub.name)}</h4>
          <span class="sub-code">${escapeHtml(sub.code || 'No Code/Room')}</span>
        </div>
        <div class="sub-pct-badge ${badgeClass}">${stats.percentage}%</div>
      </div>

      <div class="progress-bar-wrapper">
        <div class="progress-bar-fill" style="width: ${Math.min(100, stats.percentage)}%; background: ${stats.isSafe ? 'var(--status-success)' : 'var(--status-danger)'}"></div>
      </div>

      <div class="sub-stats-row">
        <span>Attended: <strong>${sub.attended}</strong></span>
        <span>Conducted: <strong>${sub.total}</strong></span>
        <span>Required: <strong>${target}%</strong></span>
      </div>

      <div class="bunk-calculator-box ${stats.isSafe ? 'bunk-box-safe' : 'bunk-box-danger'}">
        <span class="bunk-icon">${stats.isSafe ? '🎉' : '🚨'}</span>
        <div>${stats.bunkVerdict}</div>
      </div>

      <div class="sub-actions-row">
        <button class="btn btn-attend" onclick="window.recordAttendance('${sub.id}', true)">
          + Present
        </button>
        <button class="btn btn-bunk" onclick="window.recordAttendance('${sub.id}', false)">
          + Absent
        </button>
      </div>

      <div class="sub-more-actions">
        <button class="action-link" onclick="window.openEditSubjectModal('${sub.id}')">✏️ Edit Details</button>
        <button class="action-link text-danger" onclick="window.deleteSubject('${sub.id}')">🗑️ Remove</button>
      </div>
    `;
    DOM.attendanceCardsContainer.appendChild(card);
  });
}

// Attendance Actions
window.recordAttendance = function(subjectId, wasPresent) {
  const sub = state.data.subjects.find(s => s.id === subjectId);
  if (!sub) return;

  sub.total = Number(sub.total) + 1;
  if (wasPresent) {
    sub.attended = Number(sub.attended) + 1;
    showToast(`Marked Present for "${sub.name}"!`);
  } else {
    showToast(`Marked Absent for "${sub.name}". Watch your attendance!`, 'danger');
  }

  state.save();
  renderAll();
};

window.openAddSubjectModal = function() {
  DOM.subjectModalTitle.textContent = 'Add New Subject';
  DOM.editSubjectId.value = '';
  DOM.subjectForm.reset();
  DOM.subTarget.value = state.data.threshold || 75;
  DOM.subjectModal.classList.add('open');
};

window.openEditSubjectModal = function(subjectId) {
  const sub = state.data.subjects.find(s => s.id === subjectId);
  if (!sub) return;

  DOM.subjectModalTitle.textContent = 'Edit Subject';
  DOM.editSubjectId.value = sub.id;
  DOM.subName.value = sub.name;
  DOM.subCode.value = sub.code || '';
  DOM.subAttended.value = sub.attended;
  DOM.subTotal.value = sub.total;
  DOM.subTarget.value = sub.target || 75;
  DOM.subjectModal.classList.add('open');
};

window.deleteSubject = function(subjectId) {
  if (confirm('Are you sure you want to remove this subject?')) {
    state.data.subjects = state.data.subjects.filter(s => s.id !== subjectId);
    state.save();
    renderAll();
    showToast('Subject removed.');
  }
};

DOM.closeSubjectModal.addEventListener('click', () => DOM.subjectModal.classList.remove('open'));
DOM.cancelSubjectModal.addEventListener('click', () => DOM.subjectModal.classList.remove('open'));

DOM.subjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = DOM.editSubjectId.value;
  const attended = parseInt(DOM.subAttended.value, 10);
  const total = parseInt(DOM.subTotal.value, 10);

  if (attended > total) {
    alert('Attended classes cannot exceed total conducted classes!');
    return;
  }

  if (id) {
    // Edit existing
    const sub = state.data.subjects.find(s => s.id === id);
    if (sub) {
      sub.name = DOM.subName.value.trim();
      sub.code = DOM.subCode.value.trim();
      sub.attended = attended;
      sub.total = total;
      sub.target = parseInt(DOM.subTarget.value, 10) || 75;
      showToast('Subject updated successfully!');
    }
  } else {
    // Add new
    state.data.subjects.push({
      id: 'sub-' + Date.now(),
      name: DOM.subName.value.trim(),
      code: DOM.subCode.value.trim(),
      attended,
      total,
      target: parseInt(DOM.subTarget.value, 10) || 75
    });
    showToast('New subject added to watchkeeper!');
  }

  state.save();
  DOM.subjectModal.classList.remove('open');
  renderAll();
});

// Update global threshold
DOM.saveThresholdBtn.addEventListener('click', () => {
  const val = parseInt(DOM.criteriaThresholdInput.value, 10);
  if (val >= 50 && val <= 100) {
    state.data.threshold = val;
    state.save();
    renderAll();
    showToast(`Threshold updated to ${val}% across college subjects!`);
  }
});

// --- RENDER 3: CGPA & GRADES ---
const GRADE_POINTS_MAP = {
  10: 'O (Outstanding)',
  9: 'A+ (Excellent)',
  8: 'A (Very Good)',
  7: 'B+ (Good)',
  6: 'B (Above Average)',
  5: 'C (Pass)',
  0: 'F (Fail)'
};

function computeSemesterSgpa() {
  const courses = state.data.courses || [];
  let totalCredits = 0;
  let earnedPoints = 0;

  courses.forEach(c => {
    const credits = Number(c.credits) || 0;
    const pts = Number(c.gradePoints) || 0;
    totalCredits += credits;
    earnedPoints += (credits * pts);
  });

  return totalCredits === 0 ? 0.00 : earnedPoints / totalCredits;
}

function renderCgpa() {
  const courses = state.data.courses || [];
  DOM.courseTableBody.innerHTML = '';

  let totalCredits = 0;
  let totalCreditPoints = 0;

  if (courses.length === 0) {
    DOM.courseTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">
          No semester courses added yet. Click "Add Course" above.
        </td>
      </tr>
    `;
  } else {
    courses.forEach(c => {
      const credits = Number(c.credits) || 0;
      const points = Number(c.gradePoints) || 0;
      const creditPts = credits * points;

      totalCredits += credits;
      totalCreditPoints += creditPts;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${escapeHtml(c.name)}</strong></td>
        <td>${credits}</td>
        <td><span class="grade-badge">${GRADE_POINTS_MAP[points] || points}</span></td>
        <td>${points}</td>
        <td><strong>${creditPts}</strong></td>
        <td>
          <button class="action-link text-danger" onclick="window.deleteCourse('${c.id}')">Delete</button>
        </td>
      `;
      DOM.courseTableBody.appendChild(tr);
    });
  }

  const sgpa = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;
  DOM.computedSgpa.textContent = sgpa.toFixed(2);
  DOM.totalCreditsVal.textContent = totalCredits;
  DOM.totalCreditPointsVal.textContent = totalCreditPoints;
}

window.deleteCourse = function(courseId) {
  state.data.courses = state.data.courses.filter(c => c.id !== courseId);
  state.save();
  renderAll();
  showToast('Course removed from semester list.');
};

DOM.openAddCourseModalBtn.addEventListener('click', () => {
  DOM.courseForm.reset();
  DOM.courseModal.classList.add('open');
});
DOM.closeCourseModal.addEventListener('click', () => DOM.courseModal.classList.remove('open'));
DOM.cancelCourseModal.addEventListener('click', () => DOM.courseModal.classList.remove('open'));

DOM.courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.data.courses.push({
    id: 'c-' + Date.now(),
    name: document.getElementById('courseName').value.trim(),
    credits: parseInt(document.getElementById('courseCredits').value, 10),
    gradePoints: parseInt(document.getElementById('courseGrade').value, 10)
  });
  state.save();
  DOM.courseModal.classList.remove('open');
  renderAll();
  showToast('Course added to grade calculation!');
});

// Target CGPA Forecaster
DOM.calcTargetSgpaBtn.addEventListener('click', () => {
  const currCgpa = parseFloat(DOM.targetCurrentCgpa.value);
  const compCredits = parseFloat(DOM.targetCompletedCredits.value);
  const targetCgpa = parseFloat(DOM.targetDesiredCgpa.value);
  const upCredits = parseFloat(DOM.targetUpcomingCredits.value);

  if (isNaN(currCgpa) || isNaN(compCredits) || isNaN(targetCgpa) || isNaN(upCredits) || upCredits <= 0) {
    alert('Please enter valid numbers in all 4 forecast fields.');
    return;
  }

  const totalCredits = compCredits + upCredits;
  const currentTotalPoints = currCgpa * compCredits;
  const targetTotalPoints = targetCgpa * totalCredits;
  const neededPoints = targetTotalPoints - currentTotalPoints;
  const requiredSgpa = neededPoints / upCredits;

  DOM.forecastResultBox.style.display = 'block';

  if (requiredSgpa > 10.0) {
    const maxAchievable = ((currentTotalPoints + 10.0 * upCredits) / totalCredits).toFixed(2);
    DOM.forecastResultBox.innerHTML = `
      <strong style="color: var(--status-danger)">Target Unattainable (Required SGPA: ${requiredSgpa.toFixed(2)})</strong><br>
      Even with a perfect 10.0 SGPA in your upcoming ${upCredits} credits, the maximum achievable cumulative CGPA is <strong>${maxAchievable}</strong>.
    `;
  } else if (requiredSgpa <= 0) {
    DOM.forecastResultBox.innerHTML = `
      <strong style="color: var(--status-success)">Target Already Secured!</strong><br>
      You have already secured enough credit points to guarantee your desired ${targetCgpa} CGPA. Keep up the great work!
    `;
  } else {
    DOM.forecastResultBox.innerHTML = `
      <strong style="color: var(--status-info)">Target Achievable!</strong><br>
      You need to maintain an average SGPA of <strong>${requiredSgpa.toFixed(2)}</strong> across the next ${upCredits} credits to graduate with a <strong>${targetCgpa}</strong> CGPA.
    `;
  }
});

// --- RENDER 4: TASKS & DEADLINES ---
function getDaysUntil(dueDateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  const diffTime = due - now;
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function formatDaysLabel(days) {
  if (days < 0) return `Overdue by ${Math.abs(days)}d`;
  if (days === 0) return `Due Today ⚠️`;
  if (days === 1) return `Due Tomorrow`;
  return `${days} days left`;
}

function renderTasks() {
  const tasks = state.data.tasks || [];
  DOM.tasksListContainer.innerHTML = '';

  const total = tasks.length;
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;

  DOM.countAll.textContent = total;
  DOM.countPending.textContent = pending;
  DOM.countCompleted.textContent = completed;

  let filtered = tasks;
  if (currentTaskFilter === 'pending') {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentTaskFilter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  } else if (currentTaskFilter === 'urgent') {
    filtered = tasks.filter(t => !t.completed && getDaysUntil(t.dueDate) >= 0 && getDaysUntil(t.dueDate) <= 3);
  }

  // Sort by due date
  filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  if (filtered.length === 0) {
    DOM.tasksListContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);" class="glass-card">
        <p>No items found for this filter.</p>
        <button class="btn btn-primary" style="margin-top: 12px;" onclick="window.openAddTaskModal()">+ Add New Deadline / Exam</button>
      </div>
    `;
    return;
  }

  filtered.forEach(task => {
    const days = getDaysUntil(task.dueDate);
    const item = document.createElement('div');
    item.className = `task-item glass-card ${task.completed ? 'completed' : ''}`;

    let countdownClass = 'countdown-normal';
    if (!task.completed) {
      if (days < 0) countdownClass = 'countdown-overdue';
      else if (days <= 3) countdownClass = 'countdown-urgent';
    }

    item.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="window.toggleTaskStatus('${task.id}')">
        <div>
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="task-meta">
            <span class="task-badge type-${task.type}">${escapeHtml(task.type)}</span>
            <span>📚 ${escapeHtml(task.course || 'General')}</span>
            <span class="priority-${task.priority}">Priority: ${task.priority.toUpperCase()}</span>
            ${task.notes ? `<span>• 📝 ${escapeHtml(task.notes)}</span>` : ''}
          </div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:14px;">
        <span class="task-countdown ${countdownClass}">${formatDaysLabel(days)}</span>
        <button class="action-link text-danger" onclick="window.deleteTask('${task.id}')" title="Delete">🗑️</button>
      </div>
    `;
    DOM.tasksListContainer.appendChild(item);
  });
}

window.toggleTaskStatus = function(taskId) {
  const task = state.data.tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    state.save();
    renderAll();
    showToast(task.completed ? 'Task marked complete! 🎯' : 'Task restored to pending.');
  }
};

window.deleteTask = function(taskId) {
  state.data.tasks = state.data.tasks.filter(t => t.id !== taskId);
  state.save();
  renderAll();
  showToast('Task removed.');
};

DOM.filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    DOM.filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTaskFilter = btn.dataset.filter;
    renderTasks();
  });
});

window.openAddTaskModal = function() {
  DOM.taskForm.reset();
  document.getElementById('taskDueDate').value = getFutureDate(3);
  DOM.taskModal.classList.add('open');
};

DOM.openAddTaskModalBtn.addEventListener('click', window.openAddTaskModal);
DOM.closeTaskModal.addEventListener('click', () => DOM.taskModal.classList.remove('open'));
DOM.cancelTaskModal.addEventListener('click', () => DOM.taskModal.classList.remove('open'));

DOM.taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.data.tasks.push({
    id: 'task-' + Date.now(),
    title: document.getElementById('taskTitle').value.trim(),
    course: document.getElementById('taskCourse').value.trim(),
    type: document.getElementById('taskType').value,
    dueDate: document.getElementById('taskDueDate').value,
    priority: document.getElementById('taskPriority').value,
    notes: document.getElementById('taskNotes').value.trim(),
    completed: false
  });
  state.save();
  DOM.taskModal.classList.remove('open');
  renderAll();
  showToast('New deadline added!');
});

// --- RENDER 5: CAMPUS NOTES ---
function renderNotes() {
  const notes = state.data.notes || [];
  DOM.notesGridContainer.innerHTML = '';

  if (notes.length === 0) {
    DOM.notesGridContainer.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);" class="glass-card">
        <p>No notes written yet. Keep faculty schedules, lab numbers, and bookmarks here.</p>
        <button class="btn btn-primary" style="margin-top:12px;" onclick="window.openAddNoteModal()">+ Add Note</button>
      </div>
    `;
    return;
  }

  notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'card glass-card note-card';
    card.innerHTML = `
      <div class="note-header">
        <h4>${escapeHtml(note.title)}</h4>
        ${note.tag ? `<span class="note-tag">${escapeHtml(note.tag)}</span>` : ''}
      </div>
      <div class="note-body">${escapeHtml(note.content)}</div>
      <div class="note-date">
        <span>${escapeHtml(note.date)}</span>
        <button class="action-link text-danger" onclick="window.deleteNote('${note.id}')">Delete</button>
      </div>
    `;
    DOM.notesGridContainer.appendChild(card);
  });
}

window.openAddNoteModal = function() {
  DOM.noteForm.reset();
  DOM.noteModal.classList.add('open');
};

window.deleteNote = function(noteId) {
  state.data.notes = state.data.notes.filter(n => n.id !== noteId);
  state.save();
  renderAll();
  showToast('Note deleted.');
};

DOM.openAddNoteModalBtn.addEventListener('click', window.openAddNoteModal);
DOM.closeNoteModal.addEventListener('click', () => DOM.noteModal.classList.remove('open'));
DOM.cancelNoteModal.addEventListener('click', () => DOM.noteModal.classList.remove('open'));

DOM.noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new Date();
  const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  state.data.notes.unshift({
    id: 'note-' + Date.now(),
    title: document.getElementById('noteTitle').value.trim(),
    tag: document.getElementById('noteTag').value.trim(),
    content: document.getElementById('noteContent').value.trim(),
    date: formattedDate
  });
  state.save();
  DOM.noteModal.classList.remove('open');
  renderAll();
  showToast('Note saved!');
});

// --- DATA BACKUP & RESTORE ---
DOM.exportDataBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CampusPulse_Backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Backup JSON downloaded successfully!');
});

DOM.importDataInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.subjects && parsed.courses && parsed.tasks) {
        state.data = parsed;
        state.save();
        renderAll();
        showToast('Backup restored successfully!');
      } else {
        alert('Invalid CampusPulse backup file structure.');
      }
    } catch (err) {
      alert('Failed to parse JSON file.');
    }
  };
  reader.readAsText(file);
});

DOM.resetDemoBtn.addEventListener('click', () => {
  if (confirm('Reset to demo college dataset? Any custom data will be replaced with sample courses.')) {
    state.reset();
    renderAll();
    showToast('Reset to sample college data.');
  }
});

// ==========================================================================
// CAMPUS NAVIGATOR & REALISTIC SATELLITE TOURS
// ==========================================================================

const CAMPUS_CONFIG = {
  center: [37.4275, -122.1697], // University Main Quadrangle & Oval
  zoom: 16,
  minZoom: 14,
  maxZoom: 19
};

const CAMPUS_BUILDINGS = [
  {
    id: 'bldg-cs',
    name: 'Turing Computing & AI Research Center',
    code: 'Block CS • North Quad',
    category: 'academic',
    icon: '💻',
    lat: 37.4298,
    lng: -122.1735,
    description: 'Premier facility housing Computer Science departments, AI & Machine Learning research suites, high-performance GPU clusters, and modern robotics simulation arenas.',
    highlights: ['Lab 402 (Algorithms)', 'Robotics Arena', 'NVIDIA GPU Cluster', 'Lecture Hall CS-101'],
    hours: '08:00 AM - 10:00 PM',
    walkingTime: '~3 min from North Gate',
    photo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'Computing Center Exterior & Glass Facade'
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-Tech Computer Science Lab 402'
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Robotics & Hardware Prototyping Workshop'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-university-campus-42838-large.mp4',
    videoCaption: '4K Drone aerial flight capturing the modern glass facade and computer science academic wings.'
  },
  {
    id: 'bldg-lib',
    name: 'The Glasshouse Central Library',
    code: 'Central Wing • Tower Quad',
    category: 'library',
    icon: '📚',
    lat: 37.4270,
    lng: -122.1662,
    description: 'A 5-story modern research library with over 450,000 volumes, 24/7 silent study cubicles, high-speed Wi-Fi, audio-visual editing rooms, and collaborative project rooms.',
    highlights: ['24/7 Reading Rooms', 'Digital Archive Center', 'Discussion Pods', 'Cafe Corner'],
    hours: 'Open 24 Hours (Student ID required)',
    walkingTime: '~2 min from Central Quad',
    photo: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        caption: 'Grand Reading Hall with Skylight Architecture'
      },
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Archival Research & Rare Books Collection'
      },
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Satellite Orthophoto over Library Quad'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-university-building-aerial-view-42841-large.mp4',
    videoCaption: 'Architectural flyover showcasing the iconic glass atrium and surrounding student courtyards.'
  },
  {
    id: 'bldg-admin',
    name: 'University Tower & Administrative Headquarters',
    code: 'Main Quadrangle • Clock Tower',
    category: 'admin',
    icon: '🏢',
    lat: 37.4265,
    lng: -122.1695,
    description: 'The historic administrative heart of the university. Houses the Vice Chancellor, Registrar, Dean of Academic Affairs, Financial Aid, and Student Services.',
    highlights: ['Dean of Academics', 'Registrar Office', 'Scholarships Desk', 'Visitor Welcome Center'],
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    walkingTime: '~1 min from Main Quad',
    photo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aerial View of the University Main Quadrangle'
      },
      {
        url: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic Colonnades & Dean’s Entrance'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-university-campus-42838-large.mp4',
    videoCaption: 'Panoramic drone tour over the clocktower, arcades, and central administrative gardens.'
  },
  {
    id: 'bldg-sports',
    name: 'Olympic Sports Pavilion & Arena',
    code: 'East Campus • Athletics Zone',
    category: 'sports',
    icon: '⚽',
    lat: 37.4315,
    lng: -122.1615,
    description: 'Comprehensive sports facility featuring a regulation 400m synthetic running track, heated Olympic swimming pool, indoor basketball & badminton courts, and weight training gym.',
    highlights: ['Olympic Swimming Pool', '400m Running Track', 'Indoor Basketball Arena', 'Cardio & Strength Gym'],
    hours: '06:00 AM - 10:00 PM',
    walkingTime: '~6 min from Main Quad',
    photo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        caption: 'All-Weather Athletics Track & Football Pitch'
      },
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-Performance Student Fitness Center'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-stadium-and-football-field-42840-large.mp4',
    videoCaption: 'Dynamic aerial perspective over the athletic fields, stadium stands, and swimming pavilion.'
  },
  {
    id: 'bldg-food',
    name: 'Student Commons & Global Food Court',
    code: 'South Quad • Plaza',
    category: 'food',
    icon: '☕',
    lat: 37.4248,
    lng: -122.1702,
    description: 'The social hub of campus life. Features an open-air amphitheater, multiple multi-cuisine dining counters, artisan coffee shop, campus bookstore, and bank ATM.',
    highlights: ['Multi-cuisine Cafeteria', 'Campus Roastery Cafe', 'Open Amphitheater', 'Bookstore & Stationery'],
    hours: '07:30 AM - 11:30 PM',
    walkingTime: '~2 min from Central Quad',
    photo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student Gathering Plaza & Coffee Pavilion'
      },
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vibrant Multi-Cuisine Dining Hall'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-university-campus-42838-large.mp4',
    videoCaption: 'Drone flight over the lively student terrace, amphitheater steps, and plaza lawns.'
  },
  {
    id: 'bldg-science',
    name: 'Newton Science & Biotechnology Complex',
    code: 'Block S • Science Quad',
    category: 'academic',
    icon: '🔬',
    lat: 37.4292,
    lng: -122.1708,
    description: 'Advanced laboratories for Physics, Chemical Analysis, Molecular Biology, and Nanotechnology. Equipped with cleanrooms and electron microscopes.',
    highlights: ['Spectroscopy Wing', 'Bio-tech Cleanroom', 'Organic Chemistry Lab', 'Hall Physics 201'],
    hours: '08:30 AM - 08:00 PM',
    walkingTime: '~4 min from North Gate',
    photo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Advanced Biotechnology & Analytical Laboratory'
      },
      {
        url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cleanroom & Optics Laser Experiment Hall'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-university-building-aerial-view-42841-large.mp4',
    videoCaption: 'Aerial perspective highlighting the science complex architecture and rooftop green solar array.'
  },
  {
    id: 'bldg-hostel',
    name: 'Scholars Residential Village & Dormitories',
    code: 'West Village • Hostels 1-4',
    category: 'hostel',
    icon: '🛏️',
    lat: 37.4235,
    lng: -122.1672,
    description: 'Comfortable on-campus residential community offering single and shared dorms, 24/7 security, laundry facilities, study lounges, and outdoor badminton courts.',
    highlights: ['Hostels A to D', 'Dining Mess', 'Laundromat', 'Student Recreation Room'],
    hours: 'Residential (24/7 Access for Residents)',
    walkingTime: '~5 min from Main Quad',
    photo: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scholars Courtyard & Dormitory Quadrangle'
      },
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student Study Lounge & Common Room'
      }
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-university-campus-42838-large.mp4',
    videoCaption: 'Cinematic aerial flyover of the green residential quad and surrounding tree canopy.'
  }
];

let campusMap = null;
let satelliteLayer = null;
let streetLayer = null;
let isSatelliteMode = true;
let campusMarkers = {};
let selectedBuilding = CAMPUS_BUILDINGS[0];

function initOrResizeCampusMap() {
  if (!window.L) {
    console.warn('Leaflet library is still loading...');
    setTimeout(initOrResizeCampusMap, 200);
    return;
  }

  if (!campusMap) {
    // 1. Initialize Leaflet Map
    campusMap = L.map('campusMap', {
      center: CAMPUS_CONFIG.center,
      zoom: CAMPUS_CONFIG.zoom,
      minZoom: CAMPUS_CONFIG.minZoom,
      maxZoom: CAMPUS_CONFIG.maxZoom,
      zoomControl: true
    });

    // 2. Base Layers
    // High-Resolution Esri World Imagery (Realistic Satellite)
    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
    });

    // CartoDB Voyager (Crisp Vector Map)
    streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    });

    satelliteLayer.addTo(campusMap);

    // 3. Add Custom Markers
    CAMPUS_BUILDINGS.forEach(bldg => {
      const customIcon = L.divIcon({
        className: 'custom-campus-marker-wrapper',
        html: `<div class="campus-marker-pin" id="marker-pin-${bldg.id}" title="${escapeHtml(bldg.name)}">${bldg.icon}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([bldg.lat, bldg.lng], { icon: customIcon }).addTo(campusMap);

      // Popup with mini preview
      marker.bindPopup(`
        <div style="font-family: var(--font-sans); min-width: 180px; padding: 2px;">
          <strong style="font-size: 0.95rem; color: #111827;">${escapeHtml(bldg.name)}</strong>
          <div style="font-size: 0.75rem; color: #6b7280; margin: 3px 0 8px;">${escapeHtml(bldg.code)}</div>
          <button style="background: #6366f1; color: #fff; border:none; padding: 5px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; cursor: pointer; width: 100%;" onclick="window.selectCampusBuilding('${bldg.id}')">
            View Details & Tour
          </button>
        </div>
      `);

      marker.on('click', () => {
        window.selectCampusBuilding(bldg.id);
      });

      campusMarkers[bldg.id] = marker;
    });

    // 4. Initial Building Sidebar Selection
    updateBuildingSidebar(CAMPUS_BUILDINGS[0]);

    // 5. Setup Controls & Listeners
    setupMapListeners();
  }

  // Leaflet needs invalidateSize() when rendered inside tabs
  setTimeout(() => {
    if (campusMap) {
      campusMap.invalidateSize();
    }
  }, 120);
}

function setupMapListeners() {
  // Toggle Layer (Satellite vs Street)
  DOM.toggleMapLayerBtn.addEventListener('click', () => {
    isSatelliteMode = !isSatelliteMode;
    if (isSatelliteMode) {
      campusMap.removeLayer(streetLayer);
      satelliteLayer.addTo(campusMap);
      DOM.mapLayerIcon.textContent = '🛰️';
      DOM.mapLayerText.textContent = 'Switch to Street Map';
      showToast('Switched to High-Definition Satellite Imagery');
    } else {
      campusMap.removeLayer(satelliteLayer);
      streetLayer.addTo(campusMap);
      DOM.mapLayerIcon.textContent = '🗺️';
      DOM.mapLayerText.textContent = 'Switch to Satellite View';
      showToast('Switched to Vector Street Map');
    }
  });

  // Recenter Map
  DOM.resetMapCenterBtn.addEventListener('click', () => {
    campusMap.flyTo(CAMPUS_CONFIG.center, CAMPUS_CONFIG.zoom, { duration: 1 });
  });

  // Category Filtering Pills
  const pills = DOM.mapCategoryPills.querySelectorAll('.map-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;
      filterCampusLocations(cat, DOM.campusSearchInput.value.trim().toLowerCase());
    });
  });

  // Search Input
  DOM.campusSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const activePill = DOM.mapCategoryPills.querySelector('.map-pill.active');
    const cat = activePill ? activePill.dataset.category : 'all';
    filterCampusLocations(cat, query);
  });

  // Quick Room Jump Select
  DOM.quickRoomJumpSelect.addEventListener('change', (e) => {
    const bldgId = e.target.value;
    if (bldgId) {
      window.selectCampusBuilding(bldgId);
    }
  });

  // Media Modal: Open Button
  DOM.openTourVideoBtn.addEventListener('click', () => {
    openMediaModal(selectedBuilding);
  });

  // Media Modal: Close Button
  DOM.closeMediaModal.addEventListener('click', closeMediaModal);
  DOM.campusMediaModal.addEventListener('click', (e) => {
    if (e.target === DOM.campusMediaModal) closeMediaModal();
  });

  // Media Modal Tabs
  DOM.tabBtnVideo.addEventListener('click', () => {
    DOM.tabBtnVideo.classList.add('active');
    DOM.tabBtnPhotos.classList.remove('active');
    DOM.paneVideoTour.classList.add('active');
    DOM.panePhotoGallery.classList.remove('active');
  });

  DOM.tabBtnPhotos.addEventListener('click', () => {
    DOM.tabBtnPhotos.classList.add('active');
    DOM.tabBtnVideo.classList.remove('active');
    DOM.panePhotoGallery.classList.add('active');
    DOM.paneVideoTour.classList.remove('active');
  });
}

function filterCampusLocations(category, query) {
  let matchedCount = 0;
  let firstMatch = null;

  CAMPUS_BUILDINGS.forEach(bldg => {
    const matchesCategory = category === 'all' || bldg.category === category;
    const matchesQuery = !query ||
      bldg.name.toLowerCase().includes(query) ||
      bldg.description.toLowerCase().includes(query) ||
      bldg.highlights.some(h => h.toLowerCase().includes(query));

    const marker = campusMarkers[bldg.id];
    if (matchesCategory && matchesQuery) {
      if (!campusMap.hasLayer(marker)) marker.addTo(campusMap);
      matchedCount++;
      if (!firstMatch) firstMatch = bldg;
    } else {
      if (campusMap.hasLayer(marker)) campusMap.removeLayer(marker);
    }
  });

  if (firstMatch && query) {
    window.selectCampusBuilding(firstMatch.id);
  }
}

window.selectCampusBuilding = function(bldgId) {
  const bldg = CAMPUS_BUILDINGS.find(b => b.id === bldgId);
  if (!bldg) return;

  selectedBuilding = bldg;
  updateBuildingSidebar(bldg);

  // Animate map camera smoothly to the building
  if (campusMap) {
    campusMap.flyTo([bldg.lat, bldg.lng], 17, {
      duration: 1.1,
      easeLinearity: 0.25
    });

    const marker = campusMarkers[bldg.id];
    if (marker) {
      marker.openPopup();
    }
  }

  // Update active pin visual style
  document.querySelectorAll('.campus-marker-pin').forEach(pin => pin.classList.remove('active'));
  const currentPin = document.getElementById(`marker-pin-${bldg.id}`);
  if (currentPin) currentPin.classList.add('active');
};

function updateBuildingSidebar(bldg) {
  DOM.sideBldgPhoto.src = bldg.photo;
  DOM.sideBldgCategory.textContent = bldg.category.toUpperCase();
  DOM.sideBldgTitle.textContent = bldg.name;
  DOM.sideBldgCode.textContent = bldg.code;
  DOM.sideBldgDesc.textContent = bldg.description;
  DOM.sideBldgHours.textContent = bldg.hours;
  DOM.sideBldgWalk.textContent = bldg.walkingTime;

  DOM.sideBldgHighlights.innerHTML = '';
  bldg.highlights.forEach(item => {
    const chip = document.createElement('span');
    chip.className = 'bldg-chip';
    chip.textContent = `📍 ${item}`;
    DOM.sideBldgHighlights.appendChild(chip);
  });
}

function openMediaModal(bldg) {
  DOM.mediaModalTitle.textContent = `${bldg.name} — Virtual Tour`;
  DOM.mediaModalSubtitle.textContent = `${bldg.code} • High-Resolution Satellite & Aerial Walkthrough`;

  // Video Tour
  DOM.campusTourVideo.src = bldg.video;
  DOM.videoCaptionText.textContent = bldg.videoCaption;
  DOM.campusTourVideo.play().catch(() => {
    // Autoplay blocked by browser policy without user gesture is normal
  });

  // Photo Gallery
  if (bldg.gallery && bldg.gallery.length > 0) {
    DOM.featuredGalleryImg.src = bldg.gallery[0].url;
    DOM.photoCaptionText.textContent = bldg.gallery[0].caption;

    DOM.photoThumbnailsRow.innerHTML = '';
    bldg.gallery.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.caption;
      img.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
      img.addEventListener('click', () => {
        DOM.photoThumbnailsRow.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        img.classList.add('active');
        DOM.featuredGalleryImg.src = item.url;
        DOM.photoCaptionText.textContent = item.caption;
      });
      DOM.photoThumbnailsRow.appendChild(img);
    });
  }

  // Show Modal & default to video tour
  DOM.tabBtnVideo.classList.add('active');
  DOM.tabBtnPhotos.classList.remove('active');
  DOM.paneVideoTour.classList.add('active');
  DOM.panePhotoGallery.classList.remove('active');
  DOM.campusMediaModal.classList.add('open');
}

function closeMediaModal() {
  DOM.campusTourVideo.pause();
  DOM.campusMediaModal.classList.remove('open');
}

// --- Helper Utilities ---
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateLiveDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  DOM.currentDateText.textContent = now.toLocaleDateString(undefined, options);
}

// --- Main Render Pipeline ---
function renderAll() {
  renderOverview();
  renderAttendance();
  renderCgpa();
  renderTasks();
  renderNotes();
}

// Initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.data.theme || 'dark');
  updateLiveDate();
  renderAll();
});
