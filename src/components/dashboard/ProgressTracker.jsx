import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  TrendingUp,
  Award,
  Clock,
  Check,
  Plus,
  Zap,
  Calendar,
  Sparkles,
  BarChart3,
  CheckCircle2,
  ListTodo,
  Info,
  ChevronRight,
  Code,
  Layers,
  HelpCircle,
  Share2,
  Lock,
  Trophy,
  Activity,
  Smile,
  CheckCircle,
  Trash2,
  Edit2,
  Target,
  MessageSquare
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { roadmapAPI } from '@/lib/api';

// Motivational Quotes
const MOTIVATIONAL_QUOTES = [
  "Success isn't owned, it's leased. And rent is due every single day. Keep pushing!",
  "Consistency beats talent when talent doesn't work hard. Your daily streak is your super power.",
  "Every line of code you write, every mock you solve, brings you closer to your dream offer.",
  "The secret of getting ahead is getting started. Today is another opportunity to level up your skills.",
  "Don't study to clear interviews, study to build solutions. The offers will follow your capability.",
  "Your placement readiness score grows with every task checked. Consistent effort always compounds!"
];

// Helper to load JSON from localStorage
const loadState = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    console.error(e);
    return defaultVal;
  }
};

// Helper to save JSON to localStorage
const saveState = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('placify_data_update'));
  } catch (e) {
    console.error(e);
  }
};

export default function ProgressTracker() {
  const { user } = useAuth();
  const taskFormRef = useRef(null);
  
  // Confetti / Particles State
  const [particles, setParticles] = useState([]);
  
  // State from LocalStorage
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [dailyGoals, setDailyGoals] = useState([]);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastCompletedDate: null });
  const [questionsSolved, setQuestionsSolved] = useState(0);
  const [mockSessions, setMockSessions] = useState(0);
  
  // Interview Sessions history log
  const [interviewSessions, setInterviewSessions] = useState([]);
  
  const hasResume = !!user?.resumeFile;

  // Initial load when user changes
  useEffect(() => {
    if (user) {
      const emailSuffix = user.email ? `_${user.email}` : '';
      setTasks(loadState(`placify_tasks${emailSuffix}`, []));
      setGoals(loadState(`placify_goals${emailSuffix}`, []));
      setDailyGoals(loadState(`placify_daily_goals${emailSuffix}`, []));
      setStreak(loadState(`placify_streak${emailSuffix}`, { currentStreak: 0, longestStreak: 0, lastCompletedDate: null }));
      setQuestionsSolved(parseInt(localStorage.getItem(`placify_questions_solved${emailSuffix}`) || '0'));
      setMockSessions(parseInt(localStorage.getItem(`placify_mock_sessions${emailSuffix}`) || '0'));
      setInterviewSessions(loadState(`placify_interview_sessions${emailSuffix}`, []));
      setUnlockedBadgeIds(loadState(`placify_unlocked_badges${emailSuffix}`, []));
    }
  }, [user]);

  // Sync state between tabs/focus
  useEffect(() => {
    const handleStorageChange = () => {
      if (!user) return;
      const emailSuffix = user.email ? `_${user.email}` : '';
      
      const newQuestions = parseInt(localStorage.getItem(`placify_questions_solved${emailSuffix}`) || '0');
      if (newQuestions !== questionsSolved) {
        setQuestionsSolved(newQuestions);
      }

      const newMockSessions = parseInt(localStorage.getItem(`placify_mock_sessions${emailSuffix}`) || '0');
      if (newMockSessions !== mockSessions) {
        setMockSessions(newMockSessions);
      }

      const newTasks = loadState(`placify_tasks${emailSuffix}`, []);
      if (JSON.stringify(newTasks) !== JSON.stringify(tasks)) {
        setTasks(newTasks);
      }

      const newGoals = loadState(`placify_goals${emailSuffix}`, []);
      if (JSON.stringify(newGoals) !== JSON.stringify(goals)) {
        setGoals(newGoals);
      }

      const newDailyGoals = loadState(`placify_daily_goals${emailSuffix}`, []);
      if (JSON.stringify(newDailyGoals) !== JSON.stringify(dailyGoals)) {
        setDailyGoals(newDailyGoals);
      }

      const newStreak = loadState(`placify_streak${emailSuffix}`, { currentStreak: 0, longestStreak: 0, lastCompletedDate: null });
      if (JSON.stringify(newStreak) !== JSON.stringify(streak)) {
        setStreak(newStreak);
      }

      const newSessions = loadState(`placify_interview_sessions${emailSuffix}`, []);
      if (JSON.stringify(newSessions) !== JSON.stringify(interviewSessions)) {
        setInterviewSessions(newSessions);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    window.addEventListener('placify_data_update', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
      window.removeEventListener('placify_data_update', handleStorageChange);
    };
  }, [user, questionsSolved, mockSessions, tasks, goals, dailyGoals, streak, interviewSessions]);

  // Fetch server learning roadmap progress
  const [roadmapProgress, setRoadmapProgress] = useState({ completed: 0, total: 0 });
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await roadmapAPI.getAll();
        if (res.success && res.data.length > 0) {
          const rm = res.data[0];
          const items = rm.items || [];
          const total = items.length;
          const completed = items.filter(i => i.status === 'completed').length;
          setRoadmapProgress({ completed, total });
        }
      } catch (err) {
        console.warn('Roadmap API not accessible in progress tracker:', err);
      }
    };
    fetchRoadmap();
  }, [tasks]);

  // Persist states
  useEffect(() => {
    if (user) {
      const emailSuffix = user.email ? `_${user.email}` : '';
      saveState(`placify_tasks${emailSuffix}`, tasks);
    }
  }, [tasks, user]);

  useEffect(() => {
    if (user) {
      const emailSuffix = user.email ? `_${user.email}` : '';
      saveState(`placify_goals${emailSuffix}`, goals);
    }
  }, [goals, user]);

  useEffect(() => {
    if (user) {
      const emailSuffix = user.email ? `_${user.email}` : '';
      saveState(`placify_daily_goals${emailSuffix}`, dailyGoals);
    }
  }, [dailyGoals, user]);

  useEffect(() => {
    if (user) {
      const emailSuffix = user.email ? `_${user.email}` : '';
      saveState(`placify_streak${emailSuffix}`, streak);
    }
  }, [streak, user]);

  // Streak verification on mount: reset if user missed yesterday
  useEffect(() => {
    if (streak.lastCompletedDate) {
      const todayStr = new Date().toDateString();
      const lastStr = new Date(streak.lastCompletedDate).toDateString();
      if (todayStr !== lastStr) {
        const oneDayMs = 24 * 60 * 60 * 1000;
        const todayMs = new Date(todayStr).getTime();
        const lastMs = new Date(lastStr).getTime();
        const diffDays = Math.round((todayMs - lastMs) / oneDayMs);
        if (diffDays > 1) {
          setStreak(prev => ({ ...prev, currentStreak: 0 }));
        }
      }
    }
  }, []);

  // Form states
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('DSA');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskGoalId, setNewTaskGoalId] = useState('');
  
  const [newDailyGoalText, setNewDailyGoalText] = useState('');

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('DSA');
  const [newGoalDuration, setNewGoalDuration] = useState('30');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  // Editing state
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskCategory, setEditTaskCategory] = useState('DSA');
  const [editTaskPriority, setEditTaskPriority] = useState('Medium');
  const [editTaskDeadline, setEditTaskDeadline] = useState('');
  const [editTaskGoalId, setEditTaskGoalId] = useState('');

  // Selection states for calendar click
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Weekly/readiness interactive states
  const [weeklyMetric, setWeeklyMetric] = useState('hours'); // hours, tasks, coding
  const [readinessFilter, setReadinessFilter] = useState('6 Wks');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredCalendarDay, setHoveredCalendarDay] = useState(null);

  // Celebration banners
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Cycle motivation quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Confetti particles generator
  const triggerConfetti = (x = window.innerWidth / 2, y = window.innerHeight / 2) => {
    const newParticles = Array.from({ length: 45 }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x,
      y,
      color: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'][Math.floor(Math.random() * 6)],
      angle: Math.random() * Math.PI * 2,
      velocity: 5 + Math.random() * 12,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      rotationSpeed: -10 + Math.random() * 20
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 4000);
  };

  // Helper stats lists
  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);

  // Dynamic Badges array
  const badges = [
    { 
      id: 'b1', 
      name: 'First Step', 
      desc: 'Completed your first placement preparation task', 
      unlocked: completedTasks.length >= 1, 
      icon: Award, 
      color: 'text-success bg-success/10 border-success/20', 
      metric: 'Tasks Completed', 
      current: completedTasks.length, 
      target: 1,
      date: completedTasks[0]?.completedAt ? new Date(completedTasks[0].completedAt).toLocaleDateString() : 'Pending'
    },
    { 
      id: 'b2', 
      name: '7-Day Streak', 
      desc: 'Maintained a 7-day preparation streak', 
      unlocked: streak.longestStreak >= 7, 
      icon: Flame, 
      color: 'text-warning bg-warning/10 border-warning/20', 
      metric: 'Consistency Streak', 
      current: streak.longestStreak, 
      target: 7
    },
    { 
      id: 'b3', 
      name: 'Resume Uploaded', 
      desc: 'Uploaded your career resume to Placify', 
      unlocked: hasResume, 
      icon: Sparkles, 
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20', 
      metric: 'Resume Upload', 
      current: hasResume ? 1 : 0, 
      target: 1,
      date: user?.resumeFile ? 'Completed' : 'Pending'
    },
    { 
      id: 'b4', 
      name: 'Mock Novice', 
      desc: 'Completed first mock interview session', 
      unlocked: mockSessions >= 1, 
      icon: Zap, 
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20', 
      metric: 'Mock Sessions', 
      current: mockSessions, 
      target: 1
    },
    { 
      id: 'b5', 
      name: '50 Questions Solved', 
      desc: 'Solved 50+ DSA or Aptitude questions', 
      unlocked: questionsSolved >= 50, 
      icon: Code, 
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', 
      metric: 'Questions Solved', 
      current: questionsSolved, 
      target: 50
    },
    { 
      id: 'b6', 
      name: 'Roadmap Completed', 
      desc: 'Completed all milestones in your learning roadmap', 
      unlocked: roadmapProgress.total > 0 && roadmapProgress.completed === roadmapProgress.total, 
      icon: Trophy, 
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', 
      metric: 'Roadmap Milestones', 
      current: roadmapProgress.completed, 
      target: roadmapProgress.total || 10
    }
  ];

  // Check new achievements on-the-fly
  useEffect(() => {
    const currentUnlocked = badges.filter(b => b.unlocked).map(b => b.id);
    const newlyUnlocked = currentUnlocked.filter(id => !unlockedBadgeIds.includes(id));
    if (newlyUnlocked.length > 0) {
      const firstNewBadge = badges.find(b => b.id === newlyUnlocked[0]);
      setUnlockedBadgeIds(currentUnlocked);
      const emailSuffix = user?.email ? `_${user.email}` : '';
      saveState(`placify_unlocked_badges${emailSuffix}`, currentUnlocked);
      
      setCelebrationMessage(`Congratulations! You unlocked the "${firstNewBadge.name}" achievement badge!`);
      setShowCelebrationBanner(true);
      triggerConfetti();
      setTimeout(() => setShowCelebrationBanner(false), 6000);
    }
  }, [completedTasks.length, streak.longestStreak, hasResume, mockSessions, questionsSolved, roadmapProgress.completed]);

  // Streak logic implementation
  const updateStreak = () => {
    const todayStr = new Date().toDateString();
    setStreak(prev => {
      let current = prev.currentStreak;
      if (!prev.lastCompletedDate) {
        current = 1;
      } else {
        const lastStr = new Date(prev.lastCompletedDate).toDateString();
        if (lastStr === todayStr) {
          // Already completed activity today
        } else {
          const oneDayMs = 24 * 60 * 60 * 1000;
          const todayMs = new Date(todayStr).getTime();
          const lastMs = new Date(lastStr).getTime();
          const diffDays = Math.round((todayMs - lastMs) / oneDayMs);
          if (diffDays === 1) {
            current += 1;
          } else {
            current = 1;
          }
        }
      }
      const longest = Math.max(prev.longestStreak, current);
      return { currentStreak: current, longestStreak: longest, lastCompletedDate: todayStr };
    });
  };

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      name: newTaskText.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      deadline: newTaskDeadline || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      goalId: newTaskGoalId || null,
      completed: false,
      completedAt: null
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
    setNewTaskDeadline('');
  };

  // Edit Task
  const handleEditTaskClick = (task) => {
    setEditingTask(task.id);
    setEditTaskText(task.name);
    setEditTaskCategory(task.category);
    setEditTaskPriority(task.priority);
    setEditTaskDeadline(task.deadline);
    setEditTaskGoalId(task.goalId || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTaskText.trim()) return;
    setTasks(prev => prev.map(t => t.id === editingTask ? {
      ...t,
      name: editTaskText.trim(),
      category: editTaskCategory,
      priority: editTaskPriority,
      deadline: editTaskDeadline,
      goalId: editTaskGoalId || null
    } : t));
    setEditingTask(null);
  };

  // Toggle complete
  const handleToggleComplete = (task, e) => {
    const isNowCompleted = !task.completed;
    setTasks(prev => prev.map(t => t.id === task.id ? {
      ...t,
      completed: isNowCompleted,
      completedAt: isNowCompleted ? new Date().toISOString() : null
    } : t));

    if (isNowCompleted) {
      updateStreak();
      const rect = e.currentTarget.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      setCelebrationMessage(`Completed task: "${task.name}"! Streak updated!`);
      setShowCelebrationBanner(true);
      setTimeout(() => setShowCelebrationBanner(false), 5000);
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Add Daily Goal
  const handleAddDailyGoal = (e) => {
    e.preventDefault();
    if (!newDailyGoalText.trim()) return;
    const newGoal = {
      id: `dg-${Date.now()}`,
      name: newDailyGoalText.trim(),
      completed: false,
      completedAt: null
    };
    setDailyGoals(prev => [...prev, newGoal]);
    setNewDailyGoalText('');
  };

  // Toggle Daily Goal
  const handleToggleDailyGoal = (dg, e) => {
    const isNowCompleted = !dg.completed;
    setDailyGoals(prev => prev.map(item => item.id === dg.id ? {
      ...item,
      completed: isNowCompleted,
      completedAt: isNowCompleted ? new Date().toISOString() : null
    } : item));

    if (isNowCompleted) {
      updateStreak();
      const rect = e.currentTarget.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      setCelebrationMessage(`Completed daily goal: "${dg.name}"! Streak updated!`);
      setShowCelebrationBanner(true);
      setTimeout(() => setShowCelebrationBanner(false), 5000);
    }
  };

  // Delete Daily Goal
  const handleDeleteDailyGoal = (id) => {
    setDailyGoals(prev => prev.filter(dg => dg.id !== id));
  };

  // Create Goal
  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    const newGoal = {
      id: `goal-${Date.now()}`,
      title: newGoalTitle.trim(),
      category: newGoalCategory,
      duration: newGoalDuration,
      deadline: newGoalDeadline || new Date(Date.now() + parseInt(newGoalDuration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      completed: false
    };
    setGoals(prev => [...prev, newGoal]);
    setNewGoalTitle('');
    setNewGoalDeadline('');
    setShowGoalModal(false);
    
    triggerConfetti();
    setCelebrationMessage(`Started goal: "${newGoal.title}"! Target: ${newGoal.duration} days.`);
    setShowCelebrationBanner(true);
    setTimeout(() => setShowCelebrationBanner(false), 5000);
  };

  // Delete Goal
  const handleDeleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    setTasks(prev => prev.map(t => t.goalId === id ? { ...t, goalId: null } : t));
  };

  // Calculate Goal progress percentage
  const getGoalProgress = useCallback((goalId) => {
    const goalTasks = tasks.filter(t => t.goalId === goalId);
    if (goalTasks.length === 0) return 0;
    const completed = goalTasks.filter(t => t.completed).length;
    return Math.round((completed / goalTasks.length) * 100);
  }, [tasks]);

  // Dynamic Overall Placement Readiness Score
  const activeUserReadinessScore = useMemo(() => {
    return Math.min(
      100,
      Math.round(
        15 + 
        (completedTasks.length * 8) +
        (goals.filter(g => getGoalProgress(g.id) === 100 && tasks.filter(t => t.goalId === g.id).length > 0).length * 15) +
        (hasResume ? 20 : 0) +
        (mockSessions * 10)
      )
    );
  }, [completedTasks.length, goals, tasks, getGoalProgress, hasResume, mockSessions]);

  // Dynamic Skill competencies for Radar Chart
  const dynamicSkillGrowth = useMemo(() => {
    const categoriesMap = {
      'DSA & Coding': tasks.filter(t => t.category === 'DSA'),
      'Java Basics': tasks.filter(t => t.category === 'Company Prep'),
      'Python Basics': tasks.filter(t => t.category === 'Aptitude'),
      'SQL & DBMS': tasks.filter(t => t.category === 'Resume'),
      'System Design': tasks.filter(t => t.category === 'Interview'),
      'Aptitude & Math': tasks.filter(t => t.category === 'Aptitude')
    };

    return Object.keys(categoriesMap).map(skillName => {
      const categoryTasks = categoriesMap[skillName];
      const completedCount = categoryTasks.filter(t => t.completed).length;
      const value = Math.min(95, 10 + completedCount * 25);
      const growth = completedCount * 15;
      
      let targetText = 'Practice intermediate standard online drills';
      if (skillName === 'DSA & Coding') targetText = 'Google, Microsoft OA standard';
      else if (skillName === 'Aptitude & Math') targetText = 'TCS / Wipro quantitative cutoff';
      else if (skillName === 'System Design') targetText = 'High-level round design specs';

      return {
        name: skillName,
        value,
        growth,
        details: `Solved ${completedCount} dynamic modules in category. Focus on scaling practical projects.`,
        target: targetText
      };
    });
  }, [tasks]);

  const activeSelectedSkill = dynamicSkillGrowth[0];

  // Pre-calculate lookup table of activities grouped by date string to avoid heavy O(N) operations inside rendering loops
  const activitiesByDate = useMemo(() => {
    const map = {};

    tasks.forEach(t => {
      if (t.completed && t.completedAt) {
        const dateStr = new Date(t.completedAt).toDateString();
        if (!map[dateStr]) {
          map[dateStr] = { completedTasks: [], dailyGoals: [], interviews: [], count: 0, hours: 0, aptitude: [], roadmap: [] };
        }
        map[dateStr].completedTasks.push(t);
        map[dateStr].count++;
        map[dateStr].hours += 1.5;
        if (t.category === 'Roadmap' || t.category === 'Company Prep') {
          map[dateStr].roadmap.push(t);
        }
      }
    });

    dailyGoals.forEach(dg => {
      if (dg.completed && dg.completedAt) {
        const dateStr = new Date(dg.completedAt).toDateString();
        if (!map[dateStr]) {
          map[dateStr] = { completedTasks: [], dailyGoals: [], interviews: [], count: 0, hours: 0, aptitude: [], roadmap: [] };
        }
        map[dateStr].dailyGoals.push(dg);
        map[dateStr].count++;
      }
    });

    interviewSessions.forEach(s => {
      if (s.completedAt) {
        const dateStr = new Date(s.completedAt).toDateString();
        if (!map[dateStr]) {
          map[dateStr] = { completedTasks: [], dailyGoals: [], interviews: [], count: 0, hours: 0, aptitude: [], roadmap: [] };
        }
        map[dateStr].interviews.push(s);
        map[dateStr].count++;
        map[dateStr].hours += 1.0;
        if (s.type === 'Aptitude') {
          map[dateStr].aptitude.push(s);
        }
      }
    });

    return map;
  }, [tasks, dailyGoals, interviewSessions]);

  // Calendar metrics resolver (O(1) lookup map check instead of nested loops)
  const getActivitiesOnDate = useCallback((date) => {
    const dateStr = date.toDateString();
    return activitiesByDate[dateStr] || {
      completedTasks: [],
      dailyGoals: [],
      interviews: [],
      aptitude: [],
      roadmap: [],
      hours: 0,
      count: 0
    };
  }, [activitiesByDate]);

  // Generate 16 calendar weeks once on mount
  const calendarWeeks = useMemo(() => {
    const days = [];
    const today = new Date();
    const startOffset = 16 * 7;
    const startDate = new Date();
    startDate.setDate(today.getDate() - startOffset);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    for (let i = 0; i < 16 * 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }

    const weeks = [];
    for (let w = 0; w < 16; w++) {
      weeks.push(days.slice(w * 7, (w + 1) * 7));
    }
    return weeks;
  }, []);

  const activeSelectedDayLog = getActivitiesOnDate(selectedDate);

  // Active days this month count
  const activeDaysThisMonthCount = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const activeDates = new Set();
    
    tasks.forEach(t => {
      if (t.completed && t.completedAt) {
        const date = new Date(t.completedAt);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          activeDates.add(date.toDateString());
        }
      }
    });
    
    dailyGoals.forEach(dg => {
      if (dg.completed && dg.completedAt) {
        const date = new Date(dg.completedAt);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          activeDates.add(date.toDateString());
        }
      }
    });

    interviewSessions.forEach(s => {
      if (s.completedAt) {
        const date = new Date(s.completedAt);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          activeDates.add(date.toDateString());
        }
      }
    });
    
    return activeDates.size;
  }, [tasks, dailyGoals, interviewSessions]);

  // Weekly summary calculator
  const weeklySummary = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // convert to Mon-Sun
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOffset);
    
    let daysActive = 0;
    let tasksCompletedCount = 0;
    let questionsSolvedCount = 0;
    let mockSessionsCount = 0;
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const acts = getActivitiesOnDate(d);
      if (acts.count > 0) {
        daysActive++;
      }
      tasksCompletedCount += acts.completedTasks.length;
      mockSessionsCount += acts.interviews.length;
      acts.interviews.forEach(s => {
        questionsSolvedCount += s.questionsCount || 0;
      });
    }
    
    return {
      daysActive,
      tasksCompleted: tasksCompletedCount,
      questionsSolved: questionsSolvedCount,
      interviews: mockSessionsCount
    };
  }, [getActivitiesOnDate]);

  // Monthly summary calculator
  const monthlySummary = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const tasksThisMonth = tasks.filter(t => {
      if (t.deadline) {
        const date = new Date(t.deadline);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      }
      return false;
    });
    
    const completedTasksThisMonth = tasksThisMonth.filter(t => t.completed);
    const progressPercent = tasksThisMonth.length > 0 
      ? Math.round((completedTasksThisMonth.length / tasksThisMonth.length) * 100)
      : 0;

    let learningHours = 0;
    let completedTasksCount = 0;
    
    tasks.forEach(t => {
      if (t.completed && t.completedAt) {
        const date = new Date(t.completedAt);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          learningHours += 1.5;
          completedTasksCount++;
        }
      }
    });
    
    interviewSessions.forEach(s => {
      if (s.completedAt) {
        const date = new Date(s.completedAt);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          learningHours += 1.0;
        }
      }
    });

    return {
      progressPercent,
      longestStreak: streak.longestStreak,
      learningHours: parseFloat(learningHours.toFixed(1)),
      completedTasks: completedTasksCount
    };
  }, [tasks, interviewSessions, streak.longestStreak]);

  // Load Demo Data
  const loadDemoData = () => {
    const demoTasks = [];
    const demoSessions = [];
    const demoGoals = [];
    const today = new Date();
    
    const getDateOffset = (daysAgo, hourOffset = 10) => {
      const d = new Date(today);
      d.setDate(today.getDate() - daysAgo);
      d.setHours(hourOffset, 0, 0, 0);
      return d.toISOString();
    };

    const taskNames = [
      { name: 'Solve 10 Array problems', cat: 'DSA', days: 0 },
      { name: 'Review Java Streams API', cat: 'Company Prep', days: 0 },
      { name: 'Complete LinkedList implementation', cat: 'DSA', days: 1 },
      { name: 'Optimize resume layout', cat: 'Resume', days: 1 },
      { name: 'Practice 5 Probability questions', cat: 'Aptitude', days: 2 },
      { name: 'Complete System Design Caching', cat: 'Interview', days: 3 },
      { name: 'Solve LeetCode Easy: TwoSum', cat: 'DSA', days: 4 },
      { name: 'Read TCS NQT Syllabus', cat: 'Company Prep', days: 5 },
      { name: 'Solve Binary Tree Traversal', cat: 'DSA', days: 7 },
      { name: 'Practice DBMS Transactions', cat: 'Interview', days: 8 },
      { name: 'Solve 15 logical reasoning questions', cat: 'Aptitude', days: 9 },
      { name: 'Revise OOP Polymorphism', cat: 'Company Prep', days: 12 },
      { name: 'Optimize resume keywords', cat: 'Resume', days: 14 },
      { name: 'Learn Grid/Flexbox layouts', cat: 'Other', days: 15 },
      { name: 'Solve Graph BFS/DFS problems', cat: 'DSA', days: 20 },
      { name: 'Prepare HR questions list', cat: 'Interview', days: 21 },
      { name: 'Analyze Accenture test guidelines', cat: 'Company Prep', days: 25 },
      { name: 'Complete Wipro practice test', cat: 'Company Prep', days: 28 },
    ];

    taskNames.forEach((t, i) => {
      demoTasks.push({
        id: `demo-task-${i}`,
        name: t.name,
        category: t.cat,
        priority: i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low',
        deadline: getDateOffset(t.days - 1),
        goalId: null,
        completed: true,
        completedAt: getDateOffset(t.days)
      });
    });

    demoTasks.push(
      { id: 'demo-task-p1', name: 'Solve 5 Stack questions in DSA Roadmap', category: 'DSA', priority: 'High', deadline: getDateOffset(-1), goalId: null, completed: false, completedAt: null },
      { id: 'demo-task-p2', name: 'Review resume links suggestions', category: 'Resume', priority: 'Medium', deadline: getDateOffset(-2), goalId: null, completed: false, completedAt: null },
      { id: 'demo-task-p3', name: 'Conduct behavioral mock session', category: 'Interview', priority: 'Low', deadline: getDateOffset(-3), goalId: null, completed: false, completedAt: null }
    );

    const sessionsList = [
      { type: 'Aptitude', score: 80, questions: 10, days: 0 },
      { type: 'Technical', score: 85, questions: 5, days: 1 },
      { type: 'HR', score: 90, questions: 4, days: 3 },
      { type: 'Aptitude', score: 70, questions: 10, days: 7 },
      { type: 'Technical', score: 75, questions: 5, days: 9 },
      { type: 'Mock Placement', score: 82, questions: 15, days: 14 },
      { type: 'Technical', score: 68, questions: 5, days: 21 },
      { type: 'Communication', score: 88, questions: 3, days: 28 },
    ];

    sessionsList.forEach((s, i) => {
      demoSessions.push({
        id: `demo-sess-${i}`,
        type: s.type,
        score: s.score,
        questionsCount: s.questions,
        completedAt: getDateOffset(s.days, 14)
      });
    });

    const dailyGoalsList = [
      { name: 'Solve 5 Aptitude Questions', completed: true, days: 0 },
      { name: 'Complete Arrays Topic', completed: true, days: 0 },
      { name: 'Practice Java Interview', completed: false, days: 0 },
    ];

    dailyGoalsList.forEach((dg, i) => {
      demoGoals.push({
        id: `demo-dg-${i}`,
        name: dg.name,
        completed: dg.completed,
        completedAt: dg.completed ? getDateOffset(dg.days) : null
      });
    });

    const demoJourneyGoals = [
      { id: 'demo-goal-1', title: 'Complete DSA in 60 Days', category: 'DSA', duration: '60', deadline: getDateOffset(-40), createdAt: getDateOffset(20), completed: false },
      { id: 'demo-goal-2', title: 'Prepare for TCS', category: 'Company Prep', duration: '30', deadline: getDateOffset(-10), createdAt: getDateOffset(20), completed: false },
      { id: 'demo-goal-3', title: 'Optimize Placement Profile', category: 'Resume', duration: '15', deadline: getDateOffset(-5), createdAt: getDateOffset(10), completed: true },
    ];

    const emailSuffix = user?.email ? `_${user.email}` : '';
    saveState(`placify_tasks${emailSuffix}`, demoTasks);
    saveState(`placify_goals${emailSuffix}`, demoJourneyGoals);
    saveState(`placify_daily_goals${emailSuffix}`, demoGoals);
    saveState(`placify_interview_sessions${emailSuffix}`, demoSessions);
    
    const demoStreak = {
      currentStreak: 6,
      longestStreak: 12,
      lastCompletedDate: today.toDateString()
    };
    saveState(`placify_streak${emailSuffix}`, demoStreak);
    
    localStorage.setItem(`placify_questions_solved${emailSuffix}`, '68');
    localStorage.setItem(`placify_mock_sessions${emailSuffix}`, '8');
    saveState(`placify_unlocked_badges${emailSuffix}`, ['b1', 'b2', 'b3', 'b4']);

    setTasks(demoTasks);
    setGoals(demoJourneyGoals);
    setDailyGoals(demoGoals);
    setStreak(demoStreak);
    setQuestionsSolved(68);
    setMockSessions(8);
    setInterviewSessions(demoSessions);
    setUnlockedBadgeIds(['b1', 'b2', 'b3', 'b4']);

    triggerConfetti();
    setCelebrationMessage("Demo Data loaded successfully! Checkout the activity calendar.");
    setShowCelebrationBanner(true);
    setTimeout(() => setShowCelebrationBanner(false), 5000);
  };

  // Weekly Summary SVG Bar Chart metrics resolver
  const getWeeklyCompletedHours = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = [0, 0, 0, 0, 0, 0, 0];
    tasks.forEach(t => {
      if (t.completed && t.completedAt) {
        const date = new Date(t.completedAt);
        let dayIdx = date.getDay();
        dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        hours[dayIdx] += 1.5;
      }
    });
    return days.map((day, i) => ({ day, value: hours[i], text: `${hours[i]} hrs` }));
  };

  const getWeeklyCompletedTasks = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    tasks.forEach(t => {
      if (t.completed && t.completedAt) {
        const date = new Date(t.completedAt);
        let dayIdx = date.getDay();
        dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        counts[dayIdx] += 1;
      }
    });
    return days.map((day, i) => ({ day, value: counts[i], text: `${counts[i]} tasks` }));
  };

  const getWeeklyCodingSolved = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    tasks.forEach(t => {
      if (t.completed && t.completedAt && (t.category === 'DSA' || t.category === 'Aptitude')) {
        const date = new Date(t.completedAt);
        let dayIdx = date.getDay();
        dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        counts[dayIdx] += 1;
      }
    });
    return days.map((day, i) => ({ day, value: counts[i], text: `${counts[i]} solved` }));
  };

  const currentWeeklyMetricData = 
    weeklyMetric === 'hours' ? getWeeklyCompletedHours() : 
    weeklyMetric === 'tasks' ? getWeeklyCompletedTasks() : getWeeklyCodingSolved();

  const maxWeeklyVal = Math.max(...currentWeeklyMetricData.map(d => d.value), 1);

  // Dynamic Line Graph coordinates resolver
  const generateReadinessTrendData = () => {
    const ranges = {
      '3 Wks': ['Wk 4', 'Wk 5', 'Wk 6'],
      '6 Wks': ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
      '12 Wks': ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8', 'Wk 9', 'Wk 10', 'Wk 11', 'Wk 12']
    };
    
    const trend = {};
    Object.keys(ranges).forEach(range => {
      const weeks = ranges[range];
      const count = weeks.length;
      trend[range] = weeks.map((week, idx) => {
        const totalCompleted = completedTasks.length;
        const progressUpToWeek = totalCompleted > 0 ? Math.round((idx + 1) / count * totalCompleted) : 0;
        const score = Math.min(100, Math.round(15 + (progressUpToWeek * 8) + (hasResume ? 20 : 0) + (mockSessions * 10)));
        const x = 30 + (idx / (count - 1 || 1)) * 440;
        const y = 180 - (score / 100) * 140;
        return {
          week,
          score,
          x,
          y,
          milestone: progressUpToWeek > 0 
            ? `Completed ${progressUpToWeek} preparation tasks` 
            : 'No tasks completed yet'
        };
      });
    });
    
    return trend;
  };

  const dynamicReadinessTimeline = generateReadinessTrendData();
  const currentReadinessTrend = dynamicReadinessTimeline[readinessFilter];
  const pointsStr = currentReadinessTrend.map(p => `${p.x},${p.y}`).join(' ');
  const linePath = `M ${pointsStr}`;

  // Custom Radar Chart Geometry (300x300 center 150)
  const skillPoints = dynamicSkillGrowth.map((s, i) => getCoordinates(i, s.value));
  const radarPathStr = skillPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';
  const radarGridPaths = gridLevels.map(level => {
    const points = angles.map((_, i) => getCoordinates(i, level));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';
  });

  const interviewsCompleted = Math.max(
    interviewSessions.filter(s => s.type !== 'Aptitude').length,
    0
  );
  const aptitudeCompleted = Math.max(
    interviewSessions.filter(s => s.type === 'Aptitude').length,
    0
  );

  const handleStartToday = () => {
    taskFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasNoActivity = tasks.length === 0 && goals.length === 0 && dailyGoals.length === 0 && interviewSessions.length === 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative px-1">
      {/* Celebration Banner */}
      <AnimatePresence>
        {showCelebrationBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-55 w-full max-w-md bg-gradient-to-r from-success-dark to-success text-white px-5 py-3.5 rounded-2xl shadow-glow border border-white/20 flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg animate-bounce">
              🎉
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold font-heading">Accomplishment Unlocked!</h4>
              <p className="text-[10.5px] opacity-90 mt-0.5 leading-normal font-medium">{celebrationMessage}</p>
            </div>
            <button 
              onClick={() => setShowCelebrationBanner(false)}
              className="text-xs font-bold text-white hover:text-white/80 p-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: 1, opacity: 1, rotate: p.rotation }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.velocity * 30,
              y: p.y + Math.sin(p.angle) * p.velocity * 30 + 150, 
              scale: 0.2,
              opacity: 0,
              rotate: p.rotation + p.rotationSpeed * 20
            }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute rounded-sm"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color
            }}
          />
        ))}
      </div>

      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-200 dark:border-white/[0.06] pb-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white font-heading tracking-tight flex items-center gap-2">
            Placement Prep Journey Tracker
            <span className="h-2 w-2 rounded-full bg-success animate-ping" />
          </h2>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Build premium routines, analyze skill velocity, and unlock job milestones based on your actual preparation.
          </p>
        </div>

        {/* Demo Mode Button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadDemoData}
            className="cursor-pointer bg-warning/10 hover:bg-warning/20 border-warning/20 text-warning font-bold text-xs"
            leftIcon={<Sparkles size={14} />}
          >
            Load Demo Data
          </Button>

          <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/15 rounded-2xl px-4 py-2 flex items-start gap-2.5 shadow-sm">
            <Smile size={16} className="text-indigo-500 mt-0.5 shrink-0 animate-bounce" />
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block leading-none">
                Coach Motivation
              </span>
              <p className="text-[9.5px] text-surface-650 dark:text-surface-300 leading-normal italic font-medium mt-0.5 truncate max-w-[150px] sm:max-w-none">
                "{MOTIVATIONAL_QUOTES[currentQuoteIndex]}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK PREP STATISTICS CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Placement Readiness Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Activity size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Readiness Score</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">{activeUserReadinessScore}%</span>
          </div>
        </Card>

        {/* Current Streak Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0">
            <Flame size={20} className={streak.currentStreak > 0 ? 'fill-warning text-warning' : ''} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Current Streak</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">{streak.currentStreak} Days</span>
          </div>
        </Card>

        {/* Longest Streak Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Trophy size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Longest Streak</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">{streak.longestStreak} Days</span>
          </div>
        </Card>

        {/* Tasks Completed Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ListTodo size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Tasks Completed</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">
              {completedTasks.length} <span className="text-[10px] font-bold text-surface-400">/ {pendingTasks.length} pending</span>
            </span>
          </div>
        </Card>

        {/* Goals Completed Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Target size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Goals Completed</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">
              {goals.filter(g => getGoalProgress(g.id) === 100 && tasks.filter(t => t.goalId === g.id).length > 0).length} <span className="text-[10px] font-bold text-surface-400">/ {goals.length} total</span>
            </span>
          </div>
        </Card>

        {/* Interviews Completed Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
            <MessageSquare size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Interviews Completed</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">{interviewsCompleted}</span>
          </div>
        </Card>

        {/* Aptitude Tests Completed Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0">
            <Zap size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Aptitude Tests Taken</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">{aptitudeCompleted}</span>
          </div>
        </Card>

        {/* Total Questions Solved Card */}
        <Card variant="default" className="p-4 flex items-center gap-3.5 relative overflow-hidden" hoverable={true}>
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <Code size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-surface-450 uppercase font-bold tracking-wider block">Questions Solved</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-heading mt-0.5 block">{questionsSolved}</span>
          </div>
        </Card>
      </div>

      {/* FULL TRACKER LAYOUT */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: Streak and heat-map calendar (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* DAILY STREAK CARD */}
          <Card variant="default" className="p-6 relative overflow-hidden flex flex-col justify-between" hoverable={false}>
            <div className="absolute top-0 right-0 w-36 h-36 bg-warning/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400">
                  Daily Consistency
                </span>
                <div className="flex items-center gap-3.5 mt-2">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all ${
                    streak.currentStreak > 0
                      ? 'bg-warning/15 border-warning/30 text-warning shadow-md scale-105'
                      : 'bg-surface-100 dark:bg-white/5 border-surface-200 dark:border-white/10 text-surface-400'
                  }`}>
                    <Flame size={28} className={streak.currentStreak > 0 ? 'fill-warning text-warning animate-pulse' : ''} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white font-heading leading-none">
                      {streak.currentStreak} Days
                    </h3>
                    <span className="text-[10.5px] text-surface-500 dark:text-surface-400 mt-1 block font-medium">
                      Active Days This Month: <strong className="text-indigo-500">{activeDaysThisMonthCount} days</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Streaks counts */}
              <div className="flex gap-4 border-l border-gray-100 dark:border-white/[0.05] pl-6 self-start sm:self-auto">
                <div>
                  <span className="text-[9px] uppercase font-bold text-surface-450 block">Current Streak</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white font-heading">{streak.currentStreak} days</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-surface-450 block">Longest Streak</span>
                  <span className="text-xl font-black text-warning font-heading">{streak.longestStreak} days</span>
                </div>
              </div>
            </div>

            {/* First Time User Experience Onboarding CTA */}
            {hasNoActivity && (
              <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent border border-dashed border-indigo-500/20 text-center relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white font-heading">Welcome to Placify!</h4>
                <p className="text-xs text-surface-555 dark:text-surface-300 mt-2 max-w-md mx-auto leading-relaxed">
                  Start your placement journey by creating your first task or goal.
                </p>
                <div className="flex justify-center gap-3.5 mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowGoalModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 cursor-pointer"
                    leftIcon={<Plus size={14} />}
                  >
                    Create Goal
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleStartToday}
                    className="bg-white hover:bg-gray-50 border border-gray-250 dark:bg-white/5 dark:border-white/10 text-xs px-4 py-2 font-bold cursor-pointer text-gray-700 dark:text-gray-205"
                    leftIcon={<Plus size={14} />}
                  >
                    Create Task
                  </Button>
                </div>
              </div>
            )}

            {/* HEAT-MAP CALENDAR CONTAINER */}
            <div className="mt-6 pt-5 border-t border-surface-150 dark:border-white/[0.05]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10.5px] font-bold text-gray-900 dark:text-white uppercase font-heading">
                  16-Week Activity Heatmap
                </span>
                <span className="text-[9px] text-surface-400 font-bold uppercase">
                  Oldest → Recent
                </span>
              </div>

              {/* Heatmap layout */}
              <div className="flex items-start gap-1 justify-center w-full overflow-x-auto pb-2">
                {/* Rows labels */}
                <div className="flex flex-col gap-[3.5px] text-[7.5px] text-surface-450 dark:text-surface-500 font-bold uppercase select-none pr-1 justify-between pt-0.5 h-[105px]">
                  <span>Sun</span>
                  <span className="opacity-0">Mon</span>
                  <span className="opacity-0">Tue</span>
                  <span>Wed</span>
                  <span className="opacity-0">Thu</span>
                  <span className="opacity-0">Fri</span>
                  <span>Sat</span>
                </div>

                {/* Weeks grid */}
                <div className="flex gap-[3.5px]">
                  {calendarWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3.5px]">
                      {week.map((date) => {
                        const acts = getActivitiesOnDate(date);
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        
                        // Resolve level color
                        let colorClass = 'bg-slate-100 dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.03]';
                        if (acts.count === 1) colorClass = 'bg-indigo-500/20 dark:bg-indigo-500/10 border-indigo-500/10';
                        else if (acts.count >= 2 && acts.count <= 5) colorClass = 'bg-indigo-500/50 dark:bg-indigo-500/35 border-indigo-500/20';
                        else if (acts.count >= 6) colorClass = 'bg-indigo-600 dark:bg-indigo-500/80 border-indigo-500/30 shadow-sm';

                        return (
                          <div
                            key={date.toDateString()}
                            onClick={() => setSelectedDate(date)}
                            onMouseEnter={() => setHoveredCalendarDay({ date, count: acts.count })}
                            onMouseLeave={() => setHoveredCalendarDay(null)}
                            className={`h-3.5 w-3.5 rounded-[3px] border cursor-pointer transition-all ${colorClass} ${
                              isSelected ? 'ring-2 ring-indigo-500 scale-110 z-10' : 'hover:scale-105'
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Tooltip info */}
              <div className="h-6 mt-1 flex justify-center text-[10px] text-surface-450 font-bold">
                {hoveredCalendarDay ? (
                  <span>
                    {hoveredCalendarDay.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}: {hoveredCalendarDay.count} activities completed
                  </span>
                ) : (
                  <span className="opacity-60">Hover over blocks to view activity levels</span>
                )}
              </div>
            </div>
          </Card>

          {/* CLICKED DAY DETAILS DRAWER */}
          <Card variant="default" className="p-6 bg-surface-100/50 dark:bg-white/[0.01] border-surface-200/50 dark:border-white/[0.04]" hoverable={false}>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/[0.05] pb-3 mb-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Activity Details: {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
              </h4>
              <span className="text-xs font-bold text-indigo-500">
                {activeSelectedDayLog.hours} hrs prepped
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h5 className="text-[10px] uppercase font-bold text-surface-450 mb-2">Completed Tasks ({activeSelectedDayLog.completedTasks.length})</h5>
                {activeSelectedDayLog.completedTasks.length === 0 ? (
                  <span className="text-[10.5px] italic text-surface-400 font-medium">No tasks completed on this day.</span>
                ) : (
                  <ul className="space-y-1.5">
                    {activeSelectedDayLog.completedTasks.map((t, idx) => (
                      <li key={idx} className="text-[11px] text-surface-650 dark:text-surface-300 font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-success shrink-0" />
                        <span className="truncate">{t.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h5 className="text-[10px] uppercase font-bold text-surface-450 mb-2">Daily Goals Checklist ({activeSelectedDayLog.dailyGoals.length})</h5>
                {activeSelectedDayLog.dailyGoals.length === 0 ? (
                  <span className="text-[10.5px] italic text-surface-400 font-medium">No daily goals completed on this day.</span>
                ) : (
                  <ul className="space-y-1.5">
                    {activeSelectedDayLog.dailyGoals.map((dg, idx) => (
                      <li key={idx} className="text-[11px] text-surface-650 dark:text-surface-300 font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-success shrink-0" />
                        <span className="truncate">{dg.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 border-t border-gray-100 dark:border-white/[0.05] mt-4 pt-4">
              <div>
                <span className="text-[9px] uppercase font-bold text-surface-400 block mb-0.5">Interviews Taken</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {activeSelectedDayLog.interviews.length} sessions
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-surface-400 block mb-0.5">Aptitude Attempted</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {activeSelectedDayLog.aptitude.length} tests
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-surface-400 block mb-0.5">Roadmap Progress</span>
                <span className="text-xs font-bold text-indigo-500">
                  +{activeSelectedDayLog.roadmap.length} items checked
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Summaries, Daily Goals Form & Badges */}
        <div className="space-y-6">
          
          {/* WEEKLY SUMMARY CARD */}
          <Card variant="default" className="p-6" hoverable={false}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-surface-400 mb-4 flex items-center gap-1.5">
              <TrendingUp size={14} className="text-indigo-500" />
              Weekly Summary (Mon-Sun)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-surface-100/50 dark:bg-white/5 border border-surface-200/50 dark:border-white/[0.04]">
                <span className="text-[8px] uppercase font-bold text-surface-450 block mb-1">Days Active</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-heading">{weeklySummary.daysActive} days</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-100/50 dark:bg-white/5 border border-surface-200/50 dark:border-white/[0.04]">
                <span className="text-[8px] uppercase font-bold text-surface-450 block mb-1">Tasks Done</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-heading">{weeklySummary.tasksCompleted} tasks</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-100/50 dark:bg-white/5 border border-surface-200/50 dark:border-white/[0.04]">
                <span className="text-[8px] uppercase font-bold text-surface-450 block mb-1">Questions Solved</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-heading">{weeklySummary.questionsSolved} Qs</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-100/50 dark:bg-white/5 border border-surface-200/50 dark:border-white/[0.04]">
                <span className="text-[8px] uppercase font-bold text-surface-450 block mb-1">Interviews</span>
                <span className="text-base font-black text-gray-900 dark:text-white font-heading">{weeklySummary.interviews} Sess</span>
              </div>
            </div>
          </Card>

          {/* MONTHLY SUMMARY CARD */}
          <Card variant="default" className="p-6" hoverable={false}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-surface-400 mb-4 flex items-center gap-1.5">
              <Calendar size={14} className="text-indigo-500" />
              Monthly Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-surface-500">Monthly Progress</span>
                <span className="text-indigo-500">{monthlySummary.progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all"
                  style={{ width: `${monthlySummary.progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-2 border-t border-gray-100 dark:border-white/[0.05]">
                <div>
                  <span className="text-[8px] uppercase font-bold text-surface-400 block mb-0.5">Learning Hours</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                    {monthlySummary.learningHours} hrs
                  </span>
                </div>
                <div>
                  <span className="text-[8px] uppercase font-bold text-surface-400 block mb-0.5">Completed Tasks</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                    {monthlySummary.completedTasks} tasks
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* DAILY GOALS CHECKLIST PANEL */}
          <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
                    Daily Goals Checklist
                  </h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                    Quick checks to build streaks
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-xl">
                  {dailyGoals.filter(dg => dg.completed).length}/{dailyGoals.length} Done
                </span>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 mb-4">
                {dailyGoals.length === 0 ? (
                  <div className="text-center py-6 text-xs text-surface-400 font-medium">
                    No daily goals added yet. Add a milestone below!
                  </div>
                ) : (
                  dailyGoals.map(dg => (
                    <div
                      key={dg.id}
                      onClick={(e) => handleToggleDailyGoal(dg, e)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        dg.completed
                          ? 'bg-success/5 border-success/15 text-surface-500 dark:text-surface-400 line-through'
                          : 'bg-white/50 border-gray-100 dark:bg-white/[0.02] dark:border-white/[0.04] text-gray-900 dark:text-white hover:border-gray-200 dark:hover:border-white/10'
                      }`}
                    >
                      <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                        dg.completed ? 'bg-success border-success text-white' : 'border-gray-300 dark:border-white/20'
                      }`}>
                        {dg.completed && <Check size={12} strokeWidth={3.5} />}
                      </div>
                      <span className="text-xs leading-normal flex-1">{dg.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDailyGoal(dg.id);
                        }}
                        className="p-0.5 text-surface-400 hover:text-danger rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleAddDailyGoal} className="flex gap-2 pt-3 border-t border-gray-100 dark:border-white/[0.05]">
              <input
                type="text"
                value={newDailyGoalText}
                onChange={(e) => setNewDailyGoalText(e.target.value)}
                placeholder="e.g. Solve 5 Aptitude Questions..."
                className="flex-1 min-w-0 bg-white/40 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-gray-900 dark:text-white placeholder-surface-400 outline-none focus:border-indigo-500/60 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              >
                <Plus size={16} />
              </button>
            </form>
          </Card>
        </div>
      </div>

      {/* THREE INTERACTIVE DATA GRAPHS ROW */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Placement Readiness Line Graph */}
        <Card variant="default" className="p-6 relative overflow-hidden flex flex-col justify-between" hoverable={false}>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 font-heading">
                  <Activity size={18} className="text-indigo-500" />
                  Readiness Timeline
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-surface-100 dark:bg-white/5 p-1 rounded-xl border border-surface-200 dark:border-white/10 self-start">
                {['3 Wks', '6 Wks', '12 Wks'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setReadinessFilter(filter);
                      setHoveredPoint(null);
                    }}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      readinessFilter === filter ? 'bg-indigo-600 text-white shadow-sm' : 'text-surface-500 dark:text-surface-400'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full h-[180px] select-none">
              {completedTasks.length === 0 && interviewSessions.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-surface-200 dark:border-white/[0.08] rounded-2xl bg-slate-50/50 dark:bg-white/[0.01]">
                  <Activity size={24} className="text-surface-400 mb-2" />
                  <span className="text-xs text-surface-450 font-medium italic">No activity data available yet.</span>
                </div>
              ) : (
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                  <path
                    d={`${linePath} L ${currentReadinessTrend[currentReadinessTrend.length - 1].x},200 L ${currentReadinessTrend[0].x},200 Z`}
                    fill="url(#readinessGrad)"
                  />
                  <motion.path
                    key={readinessFilter} 
                    d={linePath}
                    fill="none"
                    stroke="oklch(0.58 0.22 275)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {currentReadinessTrend.map((p, idx) => (
                    <g key={idx}>
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="6.5"
                        className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-gray-900 cursor-pointer"
                        strokeWidth="2.5"
                        onMouseEnter={() => setHoveredPoint(p)}
                      />
                      <text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-gray-900 dark:fill-white font-extrabold text-[9px]">{p.score}%</text>
                      <text x={p.x} y="192" textAnchor="middle" className="fill-surface-400 dark:fill-surface-500 font-bold text-[8.5px] uppercase">{p.week}</text>
                    </g>
                  ))}
                </svg>
              )}
            </div>
          </div>
        </Card>

        {/* Weekly Metrics Bar Chart */}
        <Card variant="default" className="p-6 relative overflow-hidden flex flex-col justify-between" hoverable={false}>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
                Weekly Metrics Detail
              </h3>
              <div className="grid grid-cols-3 gap-1 bg-surface-100 dark:bg-white/5 p-1 rounded-xl border border-surface-200 dark:border-white/10">
                {['hours', 'tasks', 'coding'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setWeeklyMetric(tab)}
                    className={`text-[9.5px] font-bold py-1 px-2 rounded-lg cursor-pointer ${
                      weeklyMetric === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-surface-555 dark:text-surface-400'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full h-[180px] flex items-end justify-between px-1 select-none pt-4">
              {currentWeeklyMetricData.every(d => d.value === 0) ? (
                <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-surface-200 dark:border-white/[0.08] rounded-2xl bg-slate-50/50 dark:bg-white/[0.01]">
                  <TrendingUp size={24} className="text-surface-400 mb-2" />
                  <span className="text-xs text-surface-450 font-medium italic">No activity data available yet.</span>
                </div>
              ) : (
                currentWeeklyMetricData.map((bar, idx) => {
                  const heightPercentage = (bar.value / maxWeeklyVal) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 group flex-1">
                      <div className="w-5 sm:w-7 bg-surface-150 dark:bg-white/[0.05] rounded-t-lg h-[130px] flex items-end overflow-hidden relative">
                        <motion.div
                          className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300 rounded-t-lg"
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <span className="text-[9px] text-surface-450 dark:text-surface-500 font-bold uppercase">{bar.day}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* ACTIVE GOALS PANEL */}
      <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 font-heading">
              <Target size={18} className="text-indigo-500" />
              Active Career Goals
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              Track dynamic progress percentage against your target benchmarks.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
            onClick={() => setShowGoalModal(true)}
            leftIcon={<Plus size={14} />}
          >
            Add Goal
          </Button>
        </div>

        {goals.length === 0 ? (
          <div className="p-8 text-center text-xs text-surface-400 font-medium bg-gray-50/50 dark:bg-white/[0.01] border border-dashed rounded-2xl">
            No goals created yet. Setup a career goal milestone above.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map(goal => {
              const percent = getGoalProgress(goal.id);
              const goalTasks = tasks.filter(t => t.goalId === goal.id);
              return (
                <div key={goal.id} className="p-4 rounded-2xl bg-white/50 border border-surface-250 dark:bg-white/[0.02] dark:border-white/[0.05] relative flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-extrabold text-gray-900 dark:text-white leading-normal font-heading">
                        {goal.title}
                      </h4>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-1 text-surface-400 hover:text-danger rounded-lg transition-colors cursor-pointer"
                        title="Delete goal"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-indigo-500 uppercase tracking-wide">
                        {goal.category}
                      </span>
                      <span className="text-[8.5px] font-medium text-surface-400">
                        Days: {goal.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/[0.05]">
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-surface-500">
                        {goalTasks.filter(t => t.completed).length}/{goalTasks.length} Completed
                      </span>
                      <span className="text-indigo-500">{percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* TASKS CHECKLIST BOARD */}
      <div ref={taskFormRef} className="grid gap-6 md:grid-cols-2">
        {/* Active Tasks Board */}
        <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 font-heading">
                  <ListTodo size={18} className="text-indigo-500" />
                  Active Tasks Board
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-xl">
                {pendingTasks.length} Pending
              </span>
            </div>

            {/* Editing Box */}
            {editingTask && (
              <form onSubmit={handleSaveEdit} className="mb-4 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/15 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-500">Edit Task</span>
                  <button type="button" onClick={() => setEditingTask(null)} className="text-[10px] text-surface-450 hover:text-gray-950 font-bold">Cancel</button>
                </div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  className="w-full bg-white dark:bg-white/[0.04] border border-surface-250 dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={editTaskCategory}
                    onChange={(e) => setEditTaskCategory(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-surface-250 dark:border-white/[0.08] rounded-lg px-2 py-1 text-xs text-gray-900 dark:text-white"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Resume">Resume</option>
                    <option value="Interview">Interview</option>
                    <option value="Company Prep">Company Prep</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Roadmap">Roadmap</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    value={editTaskPriority}
                    onChange={(e) => setEditTaskPriority(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-surface-250 dark:border-white/[0.08] rounded-lg px-2 py-1 text-xs text-gray-900 dark:text-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={editTaskDeadline}
                    onChange={(e) => setEditTaskDeadline(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-surface-250 dark:border-white/[0.08] rounded-lg px-2 py-1 text-xs text-gray-900 dark:text-white"
                  />
                  <select
                    value={editTaskGoalId}
                    onChange={(e) => setEditTaskGoalId(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-surface-250 dark:border-white/[0.08] rounded-lg px-2 py-1 text-xs text-gray-900 dark:text-white"
                  >
                    <option value="">No Linked Goal</option>
                    {goals.map(g => (
                      <option key={g.id} value={g.id}>{g.title}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full text-xs py-1.5 bg-indigo-600 text-white font-bold rounded-lg justify-center">
                  Save
                </Button>
              </form>
            )}

            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {pendingTasks.length === 0 ? (
                <div className="p-8 text-center text-xs text-surface-400 font-medium">
                  🎉 All tasks finished! Add a new goal task checklist item below.
                </div>
              ) : (
                pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-start justify-between gap-3 p-3 rounded-xl border border-surface-200 dark:bg-white/[0.01] dark:border-white/[0.04] text-gray-900 dark:text-white hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] transition-all"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={(e) => handleToggleComplete(task, e)}
                        className="h-5 w-5 rounded flex items-center justify-center shrink-0 border border-surface-300 dark:border-white/20 mt-0.5 hover:border-indigo-500 hover:bg-indigo-500/10 cursor-pointer"
                      >
                        <div className="h-2.5 w-2.5 rounded-xs bg-indigo-500 opacity-0 hover:opacity-100 transition-opacity" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs leading-normal font-bold block truncate">{task.name}</span>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-[8px] font-bold px-1.5 py-0.2 rounded border border-indigo-500/15 bg-indigo-500/5 text-indigo-500 uppercase">
                            {task.category}
                          </span>
                          {task.goalId && goals.some(g => g.id === task.goalId) && (
                            <span className="text-[8px] font-bold px-1.5 py-0.2 rounded border border-warning/15 bg-warning/5 text-warning uppercase max-w-[120px] truncate">
                              Goal: {goals.find(g => g.id === task.goalId)?.title}
                            </span>
                          )}
                          <span className="text-[8px] font-medium text-surface-400">
                            Due: {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                        task.priority === 'High' ? 'border-danger/20 bg-danger/5 text-danger' :
                        task.priority === 'Medium' ? 'border-warning/20 bg-warning/5 text-warning' :
                        'border-success/20 bg-success/5 text-success'
                      } uppercase`}>
                        {task.priority}
                      </span>
                      <button onClick={() => handleEditTaskClick(task)} className="p-1 text-surface-450 hover:text-indigo-500 rounded-lg cursor-pointer"><Edit2 size={12} /></button>
                      <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-surface-450 hover:text-danger rounded-lg cursor-pointer"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <form onSubmit={handleAddTask} className="mt-4 pt-4 border-t border-surface-150 dark:border-white/[0.05] space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new custom progress target..."
                className="flex-1 min-w-0 bg-white/40 dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white placeholder-surface-400 outline-none focus:border-indigo-500/60 transition-colors"
                required
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors"><Plus size={18} /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)} className="bg-white dark:bg-slate-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none font-bold">
                <option value="DSA">DSA</option>
                <option value="Resume">Resume</option>
                <option value="Interview">Interview</option>
                <option value="Company Prep">Company</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Roadmap">Roadmap</option>
                <option value="Other">Other</option>
              </select>
              <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)} className="bg-white dark:bg-slate-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none font-bold">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input type="date" value={newTaskDeadline} onChange={(e) => setNewTaskDeadline(e.target.value)} className="bg-white dark:bg-slate-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none font-bold" />
              <select value={newTaskGoalId} onChange={(e) => setNewTaskGoalId(e.target.value)} className="bg-white dark:bg-slate-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-gray-900 dark:text-white outline-none font-bold">
                <option value="">No Goal</option>
                {goals.map(g => (
                  <option key={g.id} value={g.id}>{g.title}</option>
                ))}
              </select>
            </div>
          </form>
        </Card>

        {/* Completed Tasks Logs */}
        <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 font-heading">
                  <CheckCircle size={18} className="text-success" />
                  Completed Logs
                </h3>
              </div>
              <span className="text-xs font-bold text-success bg-success/10 px-2.5 py-1 rounded-xl">
                {completedTasks.length} Completed
              </span>
            </div>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {completedTasks.length === 0 ? (
                <div className="p-8 text-center text-xs text-surface-400 font-medium">
                  No completed tasks yet. Mark items complete to build streak counts!
                </div>
              ) : (
                completedTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/15 hover:bg-success/10 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <button onClick={(e) => handleToggleComplete(task, e)} className="h-5 w-5 rounded-full bg-success text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer">
                        <Check size={12} strokeWidth={3} />
                      </button>
                      <span className="text-xs font-semibold text-surface-650 dark:text-surface-300 leading-normal line-through truncate">{task.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[9px] text-success font-bold font-sans">{task.completedAt ? new Date(task.completedAt).toLocaleDateString() : 'Just now'}</span>
                      <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-surface-450 hover:text-danger rounded-lg cursor-pointer"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* ACHIEVEMENT BADGES GRID */}
      <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 font-heading">
            <Trophy size={18} className="text-warning animate-pulse" />
            Achievement Badges
          </h3>
          <span className="text-xs font-bold text-surface-450 dark:text-surface-400">
            {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
          </span>
        </div>
        <p className="text-xs text-surface-500 dark:text-surface-455 mb-5">
          Unlock certificates and selection tags as you hit mock questions target milestones. Click any badge to view status.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBadge(b)}
                className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer ${
                  b.unlocked
                    ? 'bg-white/50 border-surface-200 dark:bg-white/[0.02] dark:border-white/[0.04] shadow-sm hover:scale-105 hover:bg-indigo-500/[0.02] hover:border-indigo-500/30'
                    : 'bg-surface-100 border-surface-150 dark:bg-white/[0.01] dark:border-white/[0.03] opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`p-3 rounded-xl border shrink-0 relative ${
                  b.unlocked ? b.color : 'text-surface-400 bg-surface-200/50 border-surface-300 dark:bg-white/5 dark:border-white/10'
                }`}>
                  <Icon size={22} />
                  {!b.unlocked && (
                    <div className="absolute -top-1 -right-1 bg-gray-600 text-white rounded-full p-0.5 border border-white dark:border-gray-900">
                      <Lock size={8} />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{b.name}</h4>
                  <span className="text-[9px] text-surface-450 truncate block mt-0.5">{b.unlocked ? 'Unlocked' : 'Locked'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ACHIEVEMENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-950 w-full max-w-md rounded-3xl border border-surface-200 dark:border-white/[0.08] shadow-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 text-surface-400 hover:text-gray-950 font-bold p-1 text-sm">✕</button>
              
              <div className="flex flex-col items-center text-center mt-3">
                <div className={`p-5 rounded-2xl border ${
                  selectedBadge.unlocked ? selectedBadge.color + ' shadow-md' : 'text-surface-400 bg-surface-200/50 border-surface-300 dark:bg-white/5'
                }`}>
                  {(() => {
                    const DynIcon = selectedBadge.icon;
                    return <DynIcon size={38} />;
                  })()}
                </div>

                <h3 className="text-xl font-black text-gray-900 dark:text-white mt-4 font-heading">{selectedBadge.name}</h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-2 px-6 leading-relaxed font-medium">{selectedBadge.desc}</p>

                <div className="w-full mt-6 bg-surface-100/60 dark:bg-white/[0.02] border border-surface-200/50 dark:border-white/[0.05] p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-surface-500">{selectedBadge.metric} Progress</span>
                    <span className="text-indigo-500">{selectedBadge.current} / {selectedBadge.target}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${Math.min((selectedBadge.current / selectedBadge.target) * 100, 100)}%` }} />
                  </div>
                  {selectedBadge.unlocked ? (
                    <div className="mt-3.5 text-[10px] text-success font-bold flex items-center justify-center gap-1.5"><CheckCircle2 size={13} />Unlocked!</div>
                  ) : (
                    <div className="mt-3.5 text-[10px] text-warning font-bold flex items-center justify-center gap-1.5 animate-pulse"><Lock size={12} />Complete {selectedBadge.target - selectedBadge.current} remaining units to unlock!</div>
                  )}
                </div>

                <div className="flex gap-3 w-full mt-6">
                  <Button variant="secondary" className="flex-1 justify-center text-xs py-2 bg-surface-150 dark:bg-white/5" onClick={() => setSelectedBadge(null)}>Close</Button>
                  {selectedBadge.unlocked ? (
                    <Button variant="default" className="flex-1 justify-center text-xs py-2 bg-indigo-600 text-white font-bold" leftIcon={<Share2 size={12} />} onClick={() => { triggerConfetti(); alert('Congrats! Shared achievement to placement timeline.'); }}>Share</Button>
                  ) : (
                    <Button variant="default" className="flex-1 justify-center text-xs py-2 bg-indigo-600 text-white" disabled>Locked</Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE GOAL MODAL FORM */}
      <AnimatePresence>
        {showGoalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-950 w-full max-w-md rounded-3xl border border-surface-200 dark:border-white/[0.08] shadow-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-indigo-600" />
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">Create Career Goal</h3>
                <button onClick={() => setShowGoalModal(false)} className="text-surface-400 hover:text-gray-900 font-bold p-1 text-sm">✕</button>
              </div>

              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-surface-450 mb-1">Goal Name</label>
                  <input
                    type="text"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="e.g. Complete DSA in 60 Days"
                    className="w-full bg-white dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-indigo-500 transition-colors font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-surface-450 mb-1">Category</label>
                    <select
                      value={newGoalCategory}
                      onChange={(e) => setNewGoalCategory(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-2.5 py-2 text-xs text-gray-900 dark:text-white outline-none font-bold"
                    >
                      <option value="DSA">DSA</option>
                      <option value="Resume">Resume</option>
                      <option value="Interview">Interview</option>
                      <option value="Company Prep">Company Prep</option>
                      <option value="Aptitude">Aptitude</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-surface-450 mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      value={newGoalDuration}
                      onChange={(e) => setNewGoalDuration(e.target.value)}
                      className="w-full bg-white dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-indigo-500 transition-colors font-bold"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-surface-450 mb-1">Deadline Date (Optional)</label>
                  <input type="date" value={newGoalDeadline} onChange={(e) => setNewGoalDeadline(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white outline-none font-bold" />
                </div>

                <Button type="submit" className="w-full justify-center text-xs py-2.5 bg-indigo-600 text-white font-bold rounded-xl">Start Journey Goal</Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helpers
const getCoordinates = (index, value) => {
  const angles = [0, 60, 120, 180, 240, 300];
  const maxRadarRadius = 100;
  const center = 150;
  const angleRad = (angles[index] * Math.PI) / 180 - Math.PI / 2;
  const r = (value / 100) * maxRadarRadius;
  return {
    x: center + r * Math.cos(angleRad),
    y: center + r * Math.sin(angleRad)
  };
};
const angles = [0, 60, 120, 180, 240, 300];
const gridLevels = [25, 50, 75, 100];
