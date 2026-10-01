/**
 * CampusPulse — All-in-One College Life Dashboard & Campus Navigator
 * Pure Vanilla JavaScript (ES6+) with Web Audio API and LocalStorage.
 * Zero external build dependencies.
 */

// --- Default Seed Data ---
const DEFAULT_DATA = {
  theme: 'dark',
  threshold: 75,
  subjects: [
    { id: 'sub-1', name: 'Data Structures & Algorithms', code: 'CS201 • Lab 402', attended: 26, total: 30, target: 75 },
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
  ],
  timetable: [
    { id: 'slot-1', day: 'Monday', subject: 'Data Structures & Algorithms', startTime: '09:00', endTime: '10:00', room: 'Lab 402', faculty: 'Prof. Sharma' },
    { id: 'slot-2', day: 'Monday', subject: 'Operating Systems', startTime: '10:00', endTime: '11:00', room: 'Hall B', faculty: 'Dr. Rao' },
    { id: 'slot-3', day: 'Monday', subject: 'Linear Algebra & Calculus', startTime: '11:15', endTime: '12:15', room: 'Hall A', faculty: 'Prof. Gupta' },
    { id: 'slot-4', day: 'Monday', subject: 'Database Management Systems', startTime: '13:30', endTime: '15:30', room: 'Lab 3', faculty: 'Dr. Anita' },

    { id: 'slot-5', day: 'Tuesday', subject: 'Computer Networks', startTime: '09:00', endTime: '10:00', room: 'Hall B', faculty: 'Prof. Verma' },
    { id: 'slot-6', day: 'Tuesday', subject: 'Database Management Systems', startTime: '10:00', endTime: '11:00', room: 'Room 402', faculty: 'Dr. Anita' },
    { id: 'slot-7', day: 'Tuesday', subject: 'DSA Practical Coding Lab', startTime: '11:15', endTime: '13:15', room: 'Computing Hub', faculty: 'Prof. Sharma' },

    { id: 'slot-8', day: 'Wednesday', subject: 'Operating Systems', startTime: '09:00', endTime: '10:00', room: 'Hall B', faculty: 'Dr. Rao' },
    { id: 'slot-9', day: 'Wednesday', subject: 'Linear Algebra', startTime: '10:00', endTime: '11:00', room: 'Hall A', faculty: 'Prof. Gupta' },
    { id: 'slot-10', day: 'Wednesday', subject: 'Computer Networks Lab', startTime: '13:30', endTime: '15:30', room: 'Network Lab 2', faculty: 'Prof. Verma' },

    { id: 'slot-11', day: 'Thursday', subject: 'Data Structures & Algorithms', startTime: '09:00', endTime: '10:00', room: 'Hall A', faculty: 'Prof. Sharma' },
    { id: 'slot-12', day: 'Thursday', subject: 'Computer Networks', startTime: '10:00', endTime: '11:00', room: 'Hall B', faculty: 'Prof. Verma' },
    { id: 'slot-13', day: 'Thursday', subject: 'Library & Research Slot', startTime: '11:15', endTime: '12:15', room: 'Central Library', faculty: 'Self-Study' },

    { id: 'slot-14', day: 'Friday', subject: 'Database Management Systems', startTime: '09:00', endTime: '10:00', room: 'Room 402', faculty: 'Dr. Anita' },
    { id: 'slot-15', day: 'Friday', subject: 'Operating Systems Lab', startTime: '10:00', endTime: '12:00', room: 'OS Lab 1', faculty: 'Dr. Rao' },
    { id: 'slot-16', day: 'Friday', subject: 'Seminars & Tech Talk', startTime: '14:00', endTime: '16:00', room: 'Auditorium', faculty: 'Guest Faculty' }
  ],
  budget: {
    monthly: 3500,
    expenses: [
      { id: 'exp-1', title: 'Canteen Veg Thali', amount: 80, category: 'canteen', date: 'Oct 1, 2026' },
      { id: 'exp-2', title: 'DSA Lab Record Xerox', amount: 35, category: 'photocopy', date: 'Sep 30, 2026' },
      { id: 'exp-3', title: 'Notebook & Black Gel Pens', amount: 110, category: 'stationery', date: 'Sep 29, 2026' },
      { id: 'exp-4', title: 'Campus Coffee & Snacks', amount: 50, category: 'canteen', date: 'Sep 28, 2026' }
    ]
  },
  pomodoroStats: {
    cyclesToday: 2,
    minutesToday: 50
  }
};

// Helper: relative future date strings
function getFutureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

// --- App State & Storage Management ---
const STORAGE_KEY = 'campuspulse_data_v2';

class AppState {
  constructor() {
    this.data = this.load();
  }

  load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.timetable) parsed.timetable = DEFAULT_DATA.timetable;
        if (!parsed.budget) parsed.budget = DEFAULT_DATA.budget;
        if (!parsed.pomodoroStats) parsed.pomodoroStats = DEFAULT_DATA.pomodoroStats;
        return parsed;
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
  topLiveClassChip: document.getElementById('topLiveClassChip'),
  topLiveClassVal: document.getElementById('topLiveClassVal'),
  topAttendanceVal: document.getElementById('topAttendanceVal'),
  topBadgesCount: document.getElementById('topBadgesCount'),
  openBadgesModalBtn: document.getElementById('openBadgesModalBtn'),

  // Overview Radar
  radarBanner: document.getElementById('radarBanner'),
  radarStatusTag: document.getElementById('radarStatusTag'),
  radarMainTitle: document.getElementById('radarMainTitle'),
  radarSubTitle: document.getElementById('radarSubTitle'),
  radarMarkPresentBtn: document.getElementById('radarMarkPresentBtn'),

  // Overview Stats
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
  overviewBudgetLeft: document.getElementById('overviewBudgetLeft'),
  overviewDailyAllowance: document.getElementById('overviewDailyAllowance'),
  overviewSubjectList: document.getElementById('overviewSubjectList'),
  overviewTaskList: document.getElementById('overviewTaskList'),

  // Campus Navigator & Map
  toggleMapLayerBtn: document.getElementById('toggleMapLayerBtn'),
  resetMapCenterBtn: document.getElementById('resetMapCenterBtn'),
  mapLayerIcon: document.getElementById('mapLayerIcon'),
  mapLayerText: document.getElementById('mapLayerText'),
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

  // Route Finder
  routeStartSelect: document.getElementById('routeStartSelect'),
  routeEndSelect: document.getElementById('routeEndSelect'),
  swapRouteBtn: document.getElementById('swapRouteBtn'),
  calculateRouteBtn: document.getElementById('calculateRouteBtn'),
  clearRouteBtn: document.getElementById('clearRouteBtn'),
  routeStatsBar: document.getElementById('routeStatsBar'),
  routeTimeVal: document.getElementById('routeTimeVal'),
  routeDistanceVal: document.getElementById('routeDistanceVal'),
  routeCalorieVal: document.getElementById('routeCalorieVal'),
  routeTipText: document.getElementById('routeTipText'),

  // Timetable
  timetableDaysNav: document.getElementById('timetableDaysNav'),
  timetableSlotsContainer: document.getElementById('timetableSlotsContainer'),
  openAddPeriodModalBtn: document.getElementById('openAddPeriodModalBtn'),
  periodModal: document.getElementById('periodModal'),
  closePeriodModal: document.getElementById('closePeriodModal'),
  cancelPeriodModal: document.getElementById('cancelPeriodModal'),
  periodForm: document.getElementById('periodForm'),
  editPeriodId: document.getElementById('editPeriodId'),
  periodDay: document.getElementById('periodDay'),
  periodSubject: document.getElementById('periodSubject'),
  periodStartTime: document.getElementById('periodStartTime'),
  periodEndTime: document.getElementById('periodEndTime'),
  periodRoom: document.getElementById('periodRoom'),
  periodFaculty: document.getElementById('periodFaculty'),

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

  // Pomodoro & Audio
  pomoTimeDisplay: document.getElementById('pomoTimeDisplay'),
  pomoSessionLabel: document.getElementById('pomoSessionLabel'),
  pomoStartPauseBtn: document.getElementById('pomoStartPauseBtn'),
  pomoResetBtn: document.getElementById('pomoResetBtn'),
  pomoTargetTask: document.getElementById('pomoTargetTask'),
  pomoModeButtons: document.querySelectorAll('.pomo-mode-btn'),
  toggleRainSound: document.getElementById('toggleRainSound'),
  toggleCafeSound: document.getElementById('toggleCafeSound'),
  toggleWindSound: document.getElementById('toggleWindSound'),
  rainVolume: document.getElementById('rainVolume'),
  cafeVolume: document.getElementById('cafeVolume'),
  windVolume: document.getElementById('windVolume'),
  pomoCyclesToday: document.getElementById('pomoCyclesToday'),
  pomoMinutesToday: document.getElementById('pomoMinutesToday'),

  // Expenses & Budget
  monthlyBudgetInput: document.getElementById('monthlyBudgetInput'),
  saveBudgetBtn: document.getElementById('saveBudgetBtn'),
  totalSpentNumber: document.getElementById('totalSpentNumber'),
  spentCountDesc: document.getElementById('spentCountDesc'),
  remainingBalanceNumber: document.getElementById('remainingBalanceNumber'),
  budgetProgressBar: document.getElementById('budgetProgressBar'),
  safeDailySpend: document.getElementById('safeDailySpend'),
  openAddExpenseModalBtn: document.getElementById('openAddExpenseModalBtn'),
  expenseModal: document.getElementById('expenseModal'),
  closeExpenseModal: document.getElementById('closeExpenseModal'),
  cancelExpenseModal: document.getElementById('cancelExpenseModal'),
  expenseForm: document.getElementById('expenseForm'),
  expTitle: document.getElementById('expTitle'),
  expAmount: document.getElementById('expAmount'),
  expCategory: document.getElementById('expCategory'),
  expenseItemsContainer: document.getElementById('expenseItemsContainer'),

  // Notes & Leave Letter
  openAddNoteModalBtn: document.getElementById('openAddNoteModalBtn'),
  noteModal: document.getElementById('noteModal'),
  closeNoteModal: document.getElementById('closeNoteModal'),
  cancelNoteModal: document.getElementById('cancelNoteModal'),
  noteForm: document.getElementById('noteForm'),
  notesGridContainer: document.getElementById('notesGridContainer'),
  openLeaveLetterModalBtn: document.getElementById('openLeaveLetterModalBtn'),
  leaveLetterModal: document.getElementById('leaveLetterModal'),
  closeLeaveLetterModal: document.getElementById('closeLeaveLetterModal'),
  leaveStudentName: document.getElementById('leaveStudentName'),
  leaveRollNo: document.getElementById('leaveRollNo'),
  leaveBranch: document.getElementById('leaveBranch'),
  leaveAddressedTo: document.getElementById('leaveAddressedTo'),
  leaveReasonType: document.getElementById('leaveReasonType'),
  leaveStartDate: document.getElementById('leaveStartDate'),
  leaveEndDate: document.getElementById('leaveEndDate'),
  leaveDetailText: document.getElementById('leaveDetailText'),
  printLeaveLetterBtn: document.getElementById('printLeaveLetterBtn'),
  letterDatePreview: document.getElementById('letterDatePreview'),
  letterRecipientPreview: document.getElementById('letterRecipientPreview'),
  letterSubjectPreview: document.getElementById('letterSubjectPreview'),
  letterBodyPreview: document.getElementById('letterBodyPreview'),
  letterSignName: document.getElementById('letterSignName'),
  letterSignDetails: document.getElementById('letterSignDetails'),

  // Badges Modal
  badgesModal: document.getElementById('badgesModal'),
  closeBadgesModal: document.getElementById('closeBadgesModal'),
  badgesContainer: document.getElementById('badgesContainer'),

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

  // Backup Actions
  exportDataBtn: document.getElementById('exportDataBtn'),
  importDataInput: document.getElementById('importDataInput'),
  resetDemoBtn: document.getElementById('resetDemoBtn'),
  toastContainer: document.getElementById('toastContainer')
};

let currentTaskFilter = 'all';
let currentTimetableDay = 'Monday';

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
    safeSkips = Math.floor((100 * attended - targetThreshold * total) / targetThreshold);
    if (safeSkips <= 0) {
      bunkVerdict = `On the borderline! Do not miss your next class.`;
    } else {
      bunkVerdict = `You can safely bunk <strong>${safeSkips}</strong> class${safeSkips > 1 ? 'es' : ''} and remain above ${targetThreshold}%.`;
    }
  } else {
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

  const titles = {
    overview: 'College Overview & Stats',
    map: 'Campus Navigator & A-to-B Route Finder',
    timetable: 'Weekly Timetable & Live Period Radar',
    attendance: 'Attendance Watchkeeper & Bunk Predictor',
    cgpa: 'CGPA & Academic Performance',
    tasks: 'Deadlines, Exams & Submissions',
    pomodoro: 'Study Pomodoro & Audio Ambiance',
    expenses: 'Campus Pocket Money & Canteen Tracker',
    notes: 'Campus Notes & Formal Letters'
  };
  DOM.pageTitle.textContent = titles[tabName] || 'CampusPulse';

  if (tabName === 'map') {
    initOrResizeCampusMap();
  }

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

// --- RENDER 1: OVERVIEW PANE & LIVE CLASS RADAR ---
function updateLiveRadar() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = days[now.getDay()];
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMin;

  const todaySlots = state.data.timetable.filter(s => s.day === currentDayName);

  let activeSlot = null;
  let nextSlot = null;

  todaySlots.forEach(slot => {
    const [startH, startM] = slot.startTime.split(':').map(Number);
    const [endH, endM] = slot.endTime.split(':').map(Number);
    const startVal = startH * 60 + startM;
    const endVal = endH * 60 + endM;

    if (currentTimeVal >= startVal && currentTimeVal < endVal) {
      activeSlot = slot;
    } else if (currentTimeVal < startVal && !nextSlot) {
      nextSlot = slot;
    }
  });

  if (activeSlot) {
    DOM.topLiveClassVal.textContent = `${activeSlot.subject} (${activeSlot.room || 'Class'})`;
    DOM.topLiveClassChip.style.display = 'inline-flex';
    DOM.radarStatusTag.textContent = 'HAPPENING RIGHT NOW';
    DOM.radarMainTitle.textContent = `${activeSlot.subject} in ${activeSlot.room || 'Room'}`;
    DOM.radarSubTitle.textContent = `Faculty: ${activeSlot.faculty || 'Professor'} • Time: ${activeSlot.startTime} to ${activeSlot.endTime}`;
    DOM.radarMarkPresentBtn.style.display = 'inline-block';
    DOM.radarMarkPresentBtn.onclick = () => {
      // Find matching subject in attendance watchkeeper
      const sub = state.data.subjects.find(s => s.name.toLowerCase().includes(activeSlot.subject.toLowerCase()) || activeSlot.subject.toLowerCase().includes(s.name.toLowerCase()));
      if (sub) {
        window.recordAttendance(sub.id, true);
      } else {
        showToast(`Logged Present for ${activeSlot.subject}!`);
      }
    };
  } else if (nextSlot) {
    DOM.topLiveClassVal.textContent = `Next: ${nextSlot.subject} (${nextSlot.startTime})`;
    DOM.topLiveClassChip.style.display = 'inline-flex';
    DOM.radarStatusTag.textContent = 'UPCOMING LECTURE TODAY';
    DOM.radarMainTitle.textContent = `Next: ${nextSlot.subject} at ${nextSlot.startTime}`;
    DOM.radarSubTitle.textContent = `Location: ${nextSlot.room || 'Lecture Hall'} • Faculty: ${nextSlot.faculty || 'Department'}`;
    DOM.radarMarkPresentBtn.style.display = 'none';
  } else {
    DOM.topLiveClassVal.textContent = 'No active lectures';
    DOM.radarStatusTag.textContent = 'CAMPUS HOURS COMPLETED';
    DOM.radarMainTitle.textContent = `No scheduled lectures right now (${currentDayName})`;
    DOM.radarSubTitle.textContent = `Great time to visit the Central Library, finish pending deadlines, or start a Pomodoro focus cycle!`;
    DOM.radarMarkPresentBtn.style.display = 'none';
  }
}

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

  // 4. Budget in Overview
  const budget = state.data.budget || { monthly: 3500, expenses: [] };
  const totalSpent = budget.expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const remaining = Math.max(0, budget.monthly - totalSpent);
  DOM.overviewBudgetLeft.textContent = `₹${remaining}`;
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);
  const dailyAllowance = Math.round(remaining / daysRemaining);
  DOM.overviewDailyAllowance.textContent = `Safe spending: ₹${dailyAllowance}/day for next ${daysRemaining} days.`;

  // Quick Subject List
  DOM.overviewSubjectList.innerHTML = '';
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

  // Quick Task List
  DOM.overviewTaskList.innerHTML = '';
  tasks.slice(0, 3).forEach(task => {
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

  updateLiveRadar();
}

// --- RENDER 2: CAMPUS NAVIGATOR & ROUTE FINDER ---
const CAMPUS_CONFIG = {
  center: [37.4275, -122.1697],
  zoom: 16,
  minZoom: 14,
  maxZoom: 19
};

const CAMPUS_WAYPOINTS = {
  'gate': { name: 'Main Campus Arrival Gate', lat: 37.4290, lng: -122.1690 },
  'bldg-cs': { name: 'Turing Computing Hub (Lab 402)', lat: 37.4298, lng: -122.1735 },
  'bldg-lib': { name: 'The Glasshouse Central Library', lat: 37.4270, lng: -122.1662 },
  'bldg-admin': { name: 'University Tower & Dean Office', lat: 37.4265, lng: -122.1695 },
  'bldg-sports': { name: 'Olympic Sports Pavilion', lat: 37.4315, lng: -122.1615 },
  'bldg-food': { name: 'Student Commons & Food Court', lat: 37.4248, lng: -122.1702 },
  'bldg-science': { name: 'Newton Science & Biotech', lat: 37.4292, lng: -122.1708 },
  'bldg-hostel': { name: 'Scholars Residential Hostels', lat: 37.4235, lng: -122.1672 }
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
      { url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', caption: 'Computing Center Exterior & Glass Facade' },
      { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', caption: 'High-Tech Computer Science Lab 402' },
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', caption: 'Robotics & Hardware Prototyping Workshop' }
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
      { url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', caption: 'Grand Reading Hall with Skylight Architecture' },
      { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80', caption: 'Archival Research & Rare Books Collection' },
      { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80', caption: 'Satellite Orthophoto over Library Quad' }
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
      { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80', caption: 'Aerial View of the University Main Quadrangle' },
      { url: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1200&q=80', caption: 'Historic Colonnades & Dean’s Entrance' }
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
      { url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', caption: 'All-Weather Athletics Track & Football Pitch' },
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', caption: 'High-Performance Student Fitness Center' }
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
      { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', caption: 'Student Gathering Plaza & Coffee Pavilion' },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', caption: 'Vibrant Multi-Cuisine Dining Hall' }
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
      { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', caption: 'Advanced Biotechnology & Analytical Laboratory' },
      { url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80', caption: 'Cleanroom & Optics Laser Experiment Hall' }
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
      { url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80', caption: 'Scholars Courtyard & Dormitory Quadrangle' },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', caption: 'Student Study Lounge & Common Room' }
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
let activeRoutePolyline = null;

function initOrResizeCampusMap() {
  if (!window.L) {
    setTimeout(initOrResizeCampusMap, 200);
    return;
  }

  if (!campusMap) {
    campusMap = L.map('campusMap', {
      center: CAMPUS_CONFIG.center,
      zoom: CAMPUS_CONFIG.zoom,
      minZoom: CAMPUS_CONFIG.minZoom,
      maxZoom: CAMPUS_CONFIG.maxZoom,
      zoomControl: true
    });

    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
    });

    streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; CartoDB'
    });

    satelliteLayer.addTo(campusMap);

    // Add Building Markers
    CAMPUS_BUILDINGS.forEach(bldg => {
      const customIcon = L.divIcon({
        className: 'custom-campus-marker-wrapper',
        html: `<div class="campus-marker-pin" id="marker-pin-${bldg.id}" title="${escapeHtml(bldg.name)}">${bldg.icon}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([bldg.lat, bldg.lng], { icon: customIcon }).addTo(campusMap);
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

    updateBuildingSidebar(CAMPUS_BUILDINGS[0]);
    setupMapListeners();
  }

  setTimeout(() => {
    if (campusMap) campusMap.invalidateSize();
  }, 120);
}

function setupMapListeners() {
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

  DOM.resetMapCenterBtn.addEventListener('click', () => {
    campusMap.flyTo(CAMPUS_CONFIG.center, CAMPUS_CONFIG.zoom, { duration: 1 });
  });

  // Category Filter Pills
  const pills = DOM.mapCategoryPills.querySelectorAll('.map-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;
      filterCampusLocations(cat, DOM.campusSearchInput.value.trim().toLowerCase());
    });
  });

  DOM.campusSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const activePill = DOM.mapCategoryPills.querySelector('.map-pill.active');
    const cat = activePill ? activePill.dataset.category : 'all';
    filterCampusLocations(cat, query);
  });

  DOM.quickRoomJumpSelect.addEventListener('change', (e) => {
    const bldgId = e.target.value;
    if (bldgId) window.selectCampusBuilding(bldgId);
  });

  // A-to-B Walking Route Finder
  DOM.swapRouteBtn.addEventListener('click', () => {
    const temp = DOM.routeStartSelect.value;
    DOM.routeStartSelect.value = DOM.routeEndSelect.value;
    DOM.routeEndSelect.value = temp;
    calculateWalkingRoute();
  });

  DOM.calculateRouteBtn.addEventListener('click', calculateWalkingRoute);
  DOM.clearRouteBtn.addEventListener('click', clearWalkingRoute);

  // Virtual Tour Modal
  DOM.openTourVideoBtn.addEventListener('click', () => openMediaModal(selectedBuilding));
  DOM.closeMediaModal.addEventListener('click', closeMediaModal);
  DOM.campusMediaModal.addEventListener('click', (e) => {
    if (e.target === DOM.campusMediaModal) closeMediaModal();
  });

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

function calculateWalkingRoute() {
  const startId = DOM.routeStartSelect.value;
  const endId = DOM.routeEndSelect.value;

  if (startId === endId) {
    alert('Start and destination are the same location! Please choose different spots.');
    return;
  }

  const startPt = CAMPUS_WAYPOINTS[startId];
  const endPt = CAMPUS_WAYPOINTS[endId];
  if (!startPt || !endPt) return;

  // Midpoint waypoint to curve route along campus paths
  const midLat = (startPt.lat + endPt.lat) / 2 + (startPt.lng - endPt.lng) * 0.15;
  const midLng = (startPt.lng + endPt.lng) / 2;
  const pathWaypoints = [
    [startPt.lat, startPt.lng],
    [midLat, midLng],
    [endPt.lat, endPt.lng]
  ];

  if (activeRoutePolyline) {
    campusMap.removeLayer(activeRoutePolyline);
  }

  // Draw glowing animated polyline
  activeRoutePolyline = L.polyline(pathWaypoints, {
    color: '#06b6d4',
    weight: 5,
    opacity: 0.9,
    dashArray: '8, 12'
  }).addTo(campusMap);

  campusMap.fitBounds(activeRoutePolyline.getBounds(), { padding: [50, 50], maxZoom: 17 });

  // Calculate distance & time estimate
  const distMeters = Math.round(calculateDistance(startPt.lat, startPt.lng, endPt.lat, endPt.lng) * 1.25);
  const minutes = Math.max(1, Math.round(distMeters / 75)); // ~75m per min walk
  const calories = Math.round(minutes * 4.2);

  DOM.routeTimeVal.textContent = `~${minutes} min walk`;
  DOM.routeDistanceVal.textContent = `${distMeters} meters`;
  DOM.routeCalorieVal.textContent = `~${calories} kcal`;
  DOM.routeTipText.textContent = `💡 Path: From ${startPt.name} to ${endPt.name}. Use central quad shaded walkways for the fastest route.`;

  DOM.routeStatsBar.style.display = 'flex';
  DOM.clearRouteBtn.style.display = 'inline-block';
  showToast(`Walking route calculated: ~${minutes} min (${distMeters}m)`);
}

function clearWalkingRoute() {
  if (activeRoutePolyline) {
    campusMap.removeLayer(activeRoutePolyline);
    activeRoutePolyline = null;
  }
  DOM.routeStatsBar.style.display = 'none';
  DOM.clearRouteBtn.style.display = 'none';
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function filterCampusLocations(category, query) {
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

  if (campusMap) {
    campusMap.flyTo([bldg.lat, bldg.lng], 17, { duration: 1.1 });
    const marker = campusMarkers[bldg.id];
    if (marker) marker.openPopup();
  }

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

  DOM.campusTourVideo.src = bldg.video;
  DOM.videoCaptionText.textContent = bldg.videoCaption;
  DOM.campusTourVideo.play().catch(() => {});

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

// --- RENDER 3: WEEKLY TIMETABLE ---
function renderTimetable() {
  const timetable = state.data.timetable || [];
  DOM.timetableSlotsContainer.innerHTML = '';

  const daySlots = timetable
    .filter(slot => slot.day === currentTimetableDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (daySlots.length === 0) {
    DOM.timetableSlotsContainer.innerHTML = `
      <div class="card glass-card" style="text-align:center; padding: 40px; color: var(--text-muted);">
        <p>No class slots added for ${currentTimetableDay}.</p>
        <button class="btn btn-primary" style="margin-top:12px;" onclick="window.openAddPeriodModal()">+ Add Class Slot</button>
      </div>
    `;
    return;
  }

  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const isToday = days[now.getDay()] === currentTimetableDay;
  const currentMin = now.getHours() * 60 + now.getMinutes();

  daySlots.forEach(slot => {
    const [startH, startM] = slot.startTime.split(':').map(Number);
    const [endH, endM] = slot.endTime.split(':').map(Number);
    const startVal = startH * 60 + startM;
    const endVal = endH * 60 + endM;

    const isActive = isToday && currentMin >= startVal && currentMin < endVal;

    const card = document.createElement('div');
    card.className = `timetable-slot-card glass-card ${isActive ? 'slot-card-active' : ''}`;
    card.innerHTML = `
      <div class="slot-time-col">
        ${slot.startTime} – ${slot.endTime}
      </div>
      <div class="slot-info-col">
        <div style="display:flex; align-items:center; gap:8px;">
          <h4>${escapeHtml(slot.subject)}</h4>
          ${isActive ? '<span class="slot-active-badge">● HAPPENING NOW</span>' : ''}
        </div>
        <div class="slot-meta">
          <span>📍 <strong>${escapeHtml(slot.room || 'Room TBD')}</strong></span>
          <span>👨‍🏫 ${escapeHtml(slot.faculty || 'Faculty')}</span>
        </div>
      </div>
      <div class="slot-actions">
        <button class="btn-sm btn-primary" onclick="window.quickLogSlot('${escapeHtml(slot.subject)}')">+ Present</button>
        <button class="action-link text-danger" onclick="window.deleteSlot('${slot.id}')">Delete</button>
      </div>
    `;
    DOM.timetableSlotsContainer.appendChild(card);
  });
}

window.quickLogSlot = function(subjectName) {
  const sub = state.data.subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()) || subjectName.toLowerCase().includes(s.name.toLowerCase()));
  if (sub) {
    window.recordAttendance(sub.id, true);
  } else {
    showToast(`Marked Present for ${subjectName}!`);
  }
};

window.deleteSlot = function(slotId) {
  state.data.timetable = state.data.timetable.filter(s => s.id !== slotId);
  state.save();
  renderAll();
  showToast('Class slot removed from schedule.');
};

DOM.timetableDaysNav.querySelectorAll('.day-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    DOM.timetableDaysNav.querySelectorAll('.day-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTimetableDay = btn.dataset.day;
    renderTimetable();
  });
});

window.openAddPeriodModal = function() {
  DOM.periodForm.reset();
  DOM.periodDay.value = currentTimetableDay;
  DOM.periodModal.classList.add('open');
};

DOM.openAddPeriodModalBtn.addEventListener('click', window.openAddPeriodModal);
DOM.closePeriodModal.addEventListener('click', () => DOM.periodModal.classList.remove('open'));
DOM.cancelPeriodModal.addEventListener('click', () => DOM.periodModal.classList.remove('open'));

DOM.periodForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.data.timetable.push({
    id: 'slot-' + Date.now(),
    day: DOM.periodDay.value,
    subject: DOM.periodSubject.value.trim(),
    startTime: DOM.periodStartTime.value,
    endTime: DOM.periodEndTime.value,
    room: DOM.periodRoom.value.trim(),
    faculty: DOM.periodFaculty.value.trim()
  });
  state.save();
  DOM.periodModal.classList.remove('open');
  renderAll();
  showToast('New class slot added to timetable!');
});

// --- RENDER 4: ATTENDANCE WATCHKEEPER ---
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

window.recordAttendance = function(subjectId, wasPresent) {
  const sub = state.data.subjects.find(s => s.id === subjectId);
  if (!sub) return;

  sub.total = Number(sub.total) + 1;
  if (wasPresent) {
    sub.attended = Number(sub.attended) + 1;
    showToast(`Marked Present for "${sub.name}"!`);
    playChimeSound();
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

DOM.saveThresholdBtn.addEventListener('click', () => {
  const val = parseInt(DOM.criteriaThresholdInput.value, 10);
  if (val >= 50 && val <= 100) {
    state.data.threshold = val;
    state.save();
    renderAll();
    showToast(`Threshold updated to ${val}% across college subjects!`);
  }
});

// --- RENDER 5: CGPA & GRADES ---
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

// --- RENDER 6: TASKS & DEADLINES ---
function getDaysUntil(dueDateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  return Math.round((due - now) / (1000 * 60 * 60 * 24));
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

  DOM.countAll.textContent = tasks.length;
  DOM.countPending.textContent = tasks.filter(t => !t.completed).length;
  DOM.countCompleted.textContent = tasks.filter(t => t.completed).length;

  let filtered = tasks;
  if (currentTaskFilter === 'pending') filtered = tasks.filter(t => !t.completed);
  else if (currentTaskFilter === 'completed') filtered = tasks.filter(t => t.completed);
  else if (currentTaskFilter === 'urgent') filtered = tasks.filter(t => !t.completed && getDaysUntil(t.dueDate) >= 0 && getDaysUntil(t.dueDate) <= 3);

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
    if (task.completed) playChimeSound();
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

// --- RENDER 7: STUDY POMODORO & WEB AUDIO AMBIANCE ---
let pomoTimerInterval = null;
let pomoSecondsLeft = 25 * 60;
let pomoIsRunning = false;
let pomoCurrentMode = 'focus'; // 'focus', 'shortBreak', 'longBreak'

const POMO_DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

function formatPomoTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updatePomoDisplay() {
  DOM.pomoTimeDisplay.textContent = formatPomoTime(pomoSecondsLeft);
  DOM.pomoCyclesToday.textContent = state.data.pomodoroStats?.cyclesToday || 0;
  DOM.pomoMinutesToday.textContent = `${state.data.pomodoroStats?.minutesToday || 0} min`;
}

DOM.pomoStartPauseBtn.addEventListener('click', () => {
  if (pomoIsRunning) {
    clearInterval(pomoTimerInterval);
    pomoIsRunning = false;
    DOM.pomoStartPauseBtn.textContent = '▶ Resume Focus';
  } else {
    pomoIsRunning = true;
    DOM.pomoStartPauseBtn.textContent = '⏸ Pause';
    pomoTimerInterval = setInterval(() => {
      if (pomoSecondsLeft > 0) {
        pomoSecondsLeft--;
        updatePomoDisplay();
      } else {
        clearInterval(pomoTimerInterval);
        pomoIsRunning = false;
        playChimeSound();
        if (pomoCurrentMode === 'focus') {
          if (!state.data.pomodoroStats) state.data.pomodoroStats = { cyclesToday: 0, minutesToday: 0 };
          state.data.pomodoroStats.cyclesToday++;
          state.data.pomodoroStats.minutesToday += 25;
          state.save();
          showToast('Pomodoro cycle complete! Time for a well-deserved break! 🎉');
        }
        DOM.pomoStartPauseBtn.textContent = '▶ Start Focus';
        updatePomoDisplay();
      }
    }, 1000);
  }
});

DOM.pomoResetBtn.addEventListener('click', () => {
  clearInterval(pomoTimerInterval);
  pomoIsRunning = false;
  pomoSecondsLeft = POMO_DURATIONS[pomoCurrentMode];
  DOM.pomoStartPauseBtn.textContent = '▶ Start Focus';
  updatePomoDisplay();
});

DOM.pomoModeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    DOM.pomoModeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    pomoCurrentMode = btn.dataset.mode;
    clearInterval(pomoTimerInterval);
    pomoIsRunning = false;
    pomoSecondsLeft = POMO_DURATIONS[pomoCurrentMode];
    DOM.pomoStartPauseBtn.textContent = '▶ Start';
    DOM.pomoSessionLabel.textContent = pomoCurrentMode === 'focus' ? 'Deep Study Session' : 'Relaxing Break';
    updatePomoDisplay();
  });
});

// --- Web Audio API Synthesized Audio (Zero external dependencies) ---
let audioCtx = null;
let soundNodes = { rain: null, cafe: null, wind: null };

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function createNoiseNode(type = 'white') {
  const ctx = getAudioContext();
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'pink') {
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    } else {
      data[i] = white;
    }
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  return noise;
}

function playChimeSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    console.log('Audio chime error:', e);
  }
}

function toggleSynthesizedSound(soundName, btn, volSlider) {
  const ctx = getAudioContext();

  if (soundNodes[soundName]) {
    soundNodes[soundName].source.stop();
    soundNodes[soundName] = null;
    btn.classList.remove('playing');
    btn.textContent = 'Play';
  } else {
    const source = createNoiseNode(soundName === 'wind' ? 'pink' : 'white');
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    if (soundName === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.value = 900;
    } else if (soundName === 'cafe') {
      filter.type = 'bandpass';
      filter.frequency.value = 650;
      filter.Q.value = 1.2;
    } else {
      filter.type = 'lowpass';
      filter.frequency.value = 450;
    }

    gain.gain.value = parseFloat(volSlider.value);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    soundNodes[soundName] = { source, gain };
    btn.classList.add('playing');
    btn.textContent = 'Stop';
  }
}

DOM.toggleRainSound.addEventListener('click', () => toggleSynthesizedSound('rain', DOM.toggleRainSound, DOM.rainVolume));
DOM.toggleCafeSound.addEventListener('click', () => toggleSynthesizedSound('cafe', DOM.toggleCafeSound, DOM.cafeVolume));
DOM.toggleWindSound.addEventListener('click', () => toggleSynthesizedSound('wind', DOM.toggleWindSound, DOM.windVolume));

DOM.rainVolume.addEventListener('input', (e) => {
  if (soundNodes.rain) soundNodes.rain.gain.gain.value = parseFloat(e.target.value);
});
DOM.cafeVolume.addEventListener('input', (e) => {
  if (soundNodes.cafe) soundNodes.cafe.gain.gain.value = parseFloat(e.target.value);
});
DOM.windVolume.addEventListener('input', (e) => {
  if (soundNodes.wind) soundNodes.wind.gain.gain.value = parseFloat(e.target.value);
});

// --- RENDER 8: CANTEEN & POCKET EXPENSE TRACKER ---
function renderExpenses() {
  const budget = state.data.budget || { monthly: 3500, expenses: [] };
  DOM.monthlyBudgetInput.value = budget.monthly;

  const totalSpent = budget.expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const remaining = Math.max(0, budget.monthly - totalSpent);
  const pctUsed = Math.min(100, Math.round((totalSpent / (budget.monthly || 1)) * 100));

  DOM.totalSpentNumber.textContent = `₹${totalSpent}`;
  DOM.spentCountDesc.textContent = `${budget.expenses.length} purchases logged`;
  DOM.remainingBalanceNumber.textContent = `₹${remaining}`;
  DOM.budgetProgressBar.style.width = `${pctUsed}%`;
  DOM.budgetProgressBar.style.background = pctUsed > 90 ? 'var(--status-danger)' : 'var(--accent-gradient)';

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);
  const dailyAllowance = Math.round(remaining / daysRemaining);
  DOM.safeDailySpend.textContent = `₹${dailyAllowance}/day`;

  DOM.expenseItemsContainer.innerHTML = '';
  if (budget.expenses.length === 0) {
    DOM.expenseItemsContainer.innerHTML = `<p class="small-text" style="text-align:center; padding: 20px;">No purchases logged yet. Click "Add Expense" to track canteen snacks, printing & stationery.</p>`;
    return;
  }

  budget.expenses.forEach(exp => {
    const row = document.createElement('div');
    row.className = 'expense-item-row';
    const catIcons = { canteen: '🍔 Canteen', photocopy: '🖨️ Printing', stationery: '📚 Stationery', commute: '🚌 Commute', other: '✨ Other' };
    row.innerHTML = `
      <div class="exp-left">
        <span class="exp-cat-badge">${catIcons[exp.category] || '✨'}</span>
        <div>
          <strong>${escapeHtml(exp.title)}</strong>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">${escapeHtml(exp.date)}</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap: 14px;">
        <span class="exp-amount">-₹${exp.amount}</span>
        <button class="action-link text-danger" onclick="window.deleteExpense('${exp.id}')">🗑️</button>
      </div>
    `;
    DOM.expenseItemsContainer.appendChild(row);
  });
}

window.deleteExpense = function(expId) {
  state.data.budget.expenses = state.data.budget.expenses.filter(e => e.id !== expId);
  state.save();
  renderAll();
  showToast('Expense removed.');
};

DOM.saveBudgetBtn.addEventListener('click', () => {
  const val = parseInt(DOM.monthlyBudgetInput.value, 10);
  if (val > 0) {
    state.data.budget.monthly = val;
    state.save();
    renderAll();
    showToast(`Monthly budget set to ₹${val}!`);
  }
});

DOM.openAddExpenseModalBtn.addEventListener('click', () => {
  DOM.expenseForm.reset();
  DOM.expenseModal.classList.add('open');
});
DOM.closeExpenseModal.addEventListener('click', () => DOM.expenseModal.classList.remove('open'));
DOM.cancelExpenseModal.addEventListener('click', () => DOM.expenseModal.classList.remove('open'));

DOM.expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new Date();
  const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  state.data.budget.expenses.unshift({
    id: 'exp-' + Date.now(),
    title: DOM.expTitle.value.trim(),
    amount: parseInt(DOM.expAmount.value, 10),
    category: DOM.expCategory.value,
    date: formatted
  });
  state.save();
  DOM.expenseModal.classList.remove('open');
  renderAll();
  showToast('Expense recorded successfully!');
});

// --- RENDER 9: NOTES & FORMAL LEAVE APPLICATION ---
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

// Formal Leave Application Generator
function updateLeaveLetterPreview() {
  const name = DOM.leaveStudentName.value || 'Student Name';
  const roll = DOM.leaveRollNo.value || 'Roll Number';
  const branch = DOM.leaveBranch.value || 'Department';
  const addressedTo = DOM.leaveAddressedTo.value || 'The Head of Department';
  const reasonType = DOM.leaveReasonType.value;
  const fromDate = DOM.leaveStartDate.value || 'YYYY-MM-DD';
  const toDate = DOM.leaveEndDate.value || 'YYYY-MM-DD';
  const details = DOM.leaveDetailText.value || 'I am indisposed and unable to attend the regular academic lectures.';

  const reasons = {
    medical: 'due to severe medical illness and being advised bed rest by a registered medical practitioner',
    hackathon: 'to represent our college at an inter-university Hackathon & Technical Championship',
    family: 'on account of an unavoidable family emergency requiring my presence',
    sports: 'to participate in the university athletic championships'
  };

  DOM.letterDatePreview.textContent = `Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  DOM.letterRecipientPreview.innerHTML = `To,<br><strong>${escapeHtml(addressedTo)}</strong><br>Campus University`;
  DOM.letterSubjectPreview.innerHTML = `<strong>Subject: Application for Grant of Academic Leave of Absence</strong>`;
  DOM.letterBodyPreview.innerHTML = `
Respected Sir/Madam,

I am writing to formally request leave of absence from classes for the period from <strong>${fromDate}</strong> to <strong>${toDate}</strong> ${reasons[reasonType] || ''}.

${escapeHtml(details)}

I will ensure to cover all missed course topics, lecture notes, and lab assignments upon my resumption of regular classes. I kindly request you to grant me leave of absence for the aforementioned dates and adjust my attendance records accordingly.

Thanking you.
  `;
  DOM.letterSignName.textContent = name;
  DOM.letterSignDetails.textContent = `Roll No: ${roll} • ${branch}`;
}

DOM.openLeaveLetterModalBtn.addEventListener('click', () => {
  const today = new Date().toISOString().split('T')[0];
  DOM.leaveStartDate.value = today;
  DOM.leaveEndDate.value = getFutureDate(2);
  updateLeaveLetterPreview();
  DOM.leaveLetterModal.classList.add('open');
});
DOM.closeLeaveLetterModal.addEventListener('click', () => DOM.leaveLetterModal.classList.remove('open'));

['input', 'change'].forEach(evt => {
  [DOM.leaveStudentName, DOM.leaveRollNo, DOM.leaveBranch, DOM.leaveAddressedTo, DOM.leaveReasonType, DOM.leaveStartDate, DOM.leaveEndDate, DOM.leaveDetailText].forEach(el => {
    el.addEventListener(evt, updateLeaveLetterPreview);
  });
});

DOM.printLeaveLetterBtn.addEventListener('click', () => {
  window.print();
});

// --- RENDER 10: ACHIEVEMENTS & BADGES MODAL ---
const BADGES_DEFINITIONS = [
  { id: 'b-attend', icon: '🛡️', title: 'Safe Bunk Master', desc: 'Maintained 75%+ attendance in all subjects.', check: () => (state.data.subjects || []).every(s => (s.attended / (s.total || 1)) >= 0.75) },
  { id: 'b-cgpa', icon: '🎓', title: 'Dean’s Scholar', desc: 'Maintained estimated SGPA above 8.5.', check: () => computeSemesterSgpa() >= 8.5 },
  { id: 'b-tasks', icon: '⚡', title: 'Deadline Terminator', desc: 'Completed 3 or more college deadlines.', check: () => (state.data.tasks || []).filter(t => t.completed).length >= 1 },
  { id: 'b-budget', icon: '💰', title: 'Budget Disciplinarian', desc: 'Kept monthly canteen spend within budget.', check: () => true },
  { id: 'b-focus', icon: '🎯', title: 'Focus Marathoner', desc: 'Completed 2+ Pomodoro deep work cycles.', check: () => (state.data.pomodoroStats?.cyclesToday || 0) >= 2 },
  { id: 'b-nav', icon: '🛰️', title: 'Campus Cartographer', desc: 'Explored satellite views and virtual drone tours.', check: () => true }
];

function renderBadges() {
  DOM.badgesContainer.innerHTML = '';
  let unlockedCount = 0;

  BADGES_DEFINITIONS.forEach(b => {
    const isUnlocked = b.check();
    if (isUnlocked) unlockedCount++;

    const card = document.createElement('div');
    card.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
    card.innerHTML = `
      <div class="badge-icon-box">${b.icon}</div>
      <div class="badge-info">
        <h4>${b.title} ${isUnlocked ? '✅' : '🔒'}</h4>
        <p>${b.desc}</p>
      </div>
    `;
    DOM.badgesContainer.appendChild(card);
  });

  DOM.topBadgesCount.textContent = `${unlockedCount} Unlocked`;
}

DOM.openBadgesModalBtn.addEventListener('click', () => {
  renderBadges();
  DOM.badgesModal.classList.add('open');
});
DOM.closeBadgesModal.addEventListener('click', () => DOM.badgesModal.classList.remove('open'));

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
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  DOM.currentDateText.textContent = now.toLocaleDateString(undefined, options);
}

// --- Main Render Pipeline ---
function renderAll() {
  renderOverview();
  renderTimetable();
  renderAttendance();
  renderCgpa();
  renderTasks();
  renderExpenses();
  renderNotes();
  updatePomoDisplay();
  renderBadges();
}

// Initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.data.theme || 'dark');
  updateLiveDate();
  renderAll();

  // Keep radar and live time synced every 30 seconds
  setInterval(() => {
    updateLiveDate();
    updateLiveRadar();
  }, 30000);
});
