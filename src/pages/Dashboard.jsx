import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

import {
  LayoutDashboard,
  FileText,
  Brain,
  Compass,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Calendar,
  TrendingUp,
  Check,
  Briefcase,
  Clock,
  User,
  Plus,
  AlertTriangle,
  ChevronRight,
  LogOut,
  Flame
} from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';

// Lazy load heavy dashboard components
const ResumeAnalyzer = lazy(() => import('@/components/dashboard/ResumeAnalyzer'));
const SkillGapAnalyzer = lazy(() => import('@/components/dashboard/SkillGapAnalyzer'));
const PlacementRoadmap = lazy(() => import('@/components/dashboard/PlacementRoadmap'));
const MockInterview = lazy(() => import('@/components/dashboard/MockInterview'));
const CompanyPrepHub = lazy(() => import('@/components/dashboard/CompanyPrepHub'));
const ProgressTracker = lazy(() => import('@/components/dashboard/ProgressTracker'));
const ProfilePanel = lazy(() => import('@/components/dashboard/Profile'));
const SettingsPanel = lazy(() => import('@/components/dashboard/Settings'));
const WeeklyProgressChart = lazy(() => import('@/components/dashboard/WeeklyProgressChart'));

// Premium SaaS-grade Skeleton Loaders
function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      <div className="flex flex-col gap-2">
        <div className="h-7 bg-gray-200 dark:bg-white/[0.05] rounded-xl w-48" />
        <div className="h-4 bg-gray-200 dark:bg-white/[0.05] rounded-xl w-80" />
      </div>
      <hr className="border-gray-200/60 dark:border-gray-800/60" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-44 bg-gray-200 dark:bg-white/[0.05] rounded-3xl" />
        <div className="h-44 bg-gray-200 dark:bg-white/[0.05] rounded-3xl" />
        <div className="h-44 bg-gray-200 dark:bg-white/[0.05] rounded-3xl" />
      </div>
      <div className="h-64 bg-gray-200 dark:bg-white/[0.05] rounded-3xl w-full" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-[#111827] border border-gray-200/60 dark:border-gray-805/60 rounded-3xl h-[278px] animate-pulse flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-white/[0.05] rounded-lg w-28" />
          <div className="h-3 bg-gray-200 dark:bg-white/[0.05] rounded-lg w-40" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-white/[0.05] rounded-lg w-32" />
      </div>
      <div className="h-32 bg-gray-205 dark:bg-white/[0.03] rounded-2xl w-full" />
    </div>
  );
}

/* ================================================================
   SIDEBAR LINK CONFIG
   ================================================================ */
const sidebarLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'resume', label: 'Resume Analysis', icon: FileText },
  { id: 'skills', label: 'Skill Gap Analysis', icon: Brain },
  { id: 'roadmap', label: 'Roadmap', icon: Compass },
  { id: 'interview', label: 'Interview Practice', icon: MessageSquare },
  { id: 'company-hub', label: 'Company Prep Hub', icon: Briefcase },
  { id: 'progress', label: 'Progress Tracker', icon: BarChart3 },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];


function DailyGoalsWidget() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newGoalText, setNewGoalText] = useState('');

  const loadTasks = () => {
    try {
      const suffix = user?.email ? `_${user.email}` : '';
      const val = localStorage.getItem(`placify_tasks${suffix}`);
      setTasks(val ? JSON.parse(val) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTasks();
    window.addEventListener('focus', loadTasks);
    window.addEventListener('storage', loadTasks);
    window.addEventListener('placify_data_update', loadTasks);
    return () => {
      window.removeEventListener('focus', loadTasks);
      window.removeEventListener('storage', loadTasks);
      window.removeEventListener('placify_data_update', loadTasks);
    };
  }, [user]);

  const toggleGoal = (id) => {
    const suffix = user?.email ? `_${user.email}` : '';
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextCompleted = !t.completed;
        return {
          ...t,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : null
        };
      }
      return t;
    });
    setTasks(updated);
    localStorage.setItem(`placify_tasks${suffix}`, JSON.stringify(updated));

    // Update streak if completing
    const completedTask = updated.find(t => t.id === id);
    if (completedTask && completedTask.completed) {
      try {
        const streakVal = localStorage.getItem(`placify_streak${suffix}`);
        const streak = streakVal ? JSON.parse(streakVal) : { currentStreak: 0, longestStreak: 0, lastCompletedDate: null };
        const todayStr = new Date().toDateString();
        let current = streak.currentStreak;
        
        if (!streak.lastCompletedDate) {
          current = 1;
        } else {
          const lastStr = new Date(streak.lastCompletedDate).toDateString();
          if (lastStr !== todayStr) {
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
        const longest = Math.max(streak.longestStreak, current);
        localStorage.setItem(`placify_streak${suffix}`, JSON.stringify({ currentStreak: current, longestStreak: longest, lastCompletedDate: todayStr }));
      } catch (err) {
        console.error(err);
      }
    }
    window.dispatchEvent(new Event('placify_data_update'));
  };

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const suffix = user?.email ? `_${user.email}` : '';
    const newTask = {
      id: `task-${Date.now()}`,
      name: newGoalText.trim(),
      category: 'General',
      priority: 'Medium',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      goalId: null,
      completed: false,
      completedAt: null
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem(`placify_tasks${suffix}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('placify_data_update'));
    setNewGoalText('');
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
              Daily Goals
            </h3>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              Keep your consistency streak alive
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-xl">
            {completed}/{total} Done
          </span>
        </div>

        <div className="mb-5">
          <div className="h-1.5 w-full bg-gray-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
          {total === 0 ? (
            <div className="text-center py-6 text-xs text-surface-400 font-medium">
              No tasks yet. Add a quick target below!
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleGoal(task.id)}
                className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  task.completed
                    ? 'bg-success/5 border-success/15 text-surface-500 dark:text-surface-400 line-through'
                    : 'bg-white/50 border-gray-100 dark:bg-white/[0.02] dark:border-white/[0.04] text-gray-900 dark:text-white hover:border-gray-200 dark:hover:border-white/10'
                }`}
              >
                <div
                  className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                    task.completed
                      ? 'bg-success border-success text-white'
                      : 'border-gray-300 dark:border-white/20'
                  }`}
                >
                  {task.completed && <Check size={12} strokeWidth={3.5} />}
                </div>
                <span className="text-xs leading-normal">{task.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={addGoal} className="mt-4 flex gap-2 pt-4 border-t border-gray-100 dark:border-white/[0.05]">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder="Add a new quick target..."
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
  );
}

/* ================================================================
   WIDGET 0: WELCOME BANNER CARD
   ================================================================ */
function WelcomeCard({ name, branch, cgpa }) {
  const { user } = useAuth();
  const [streak, setStreak] = useState({ currentStreak: 0 });

  const loadStreak = () => {
    try {
      const suffix = user?.email ? `_${user.email}` : '';
      const val = localStorage.getItem(`placify_streak${suffix}`);
      if (val) setStreak(JSON.parse(val));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStreak();
    window.addEventListener('focus', loadStreak);
    window.addEventListener('storage', loadStreak);
    window.addEventListener('placify_data_update', loadStreak);
    return () => {
      window.removeEventListener('focus', loadStreak);
      window.removeEventListener('storage', loadStreak);
      window.removeEventListener('placify_data_update', loadStreak);
    };
  }, [user]);

  return (
    <Card variant="default" className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-surface-50 dark:from-indigo-950/40 dark:via-violet-950/20 dark:to-surface-950 border border-surface-200 dark:border-white/[0.08]" hoverable={false}>
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-30%] right-[-10%] w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[20%] w-48 h-48 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Assessment Complete
            </span>
            {streak.currentStreak > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning border border-warning/15">
                <Flame size={12} className="fill-warning text-warning" />
                <span>{streak.currentStreak} Day Streak</span>
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-heading">
            Welcome back, <span className="gradient-text font-extrabold">{name}</span>
          </h2>
          <p className="text-xs md:text-sm text-surface-500 dark:text-surface-400 mt-2 max-w-xl leading-relaxed">
            Your personalized dashboard is live. Track progress, optimize your resume keywords, and build skills to reach your career benchmarks.
          </p>
          <p className="text-xs italic text-indigo-600 dark:text-indigo-400 mt-2.5 font-semibold">
            "From Learning to Landing — Your Placement Journey Starts Here."
          </p>
        </div>

        {/* Profile Stats Quick Grid */}
        <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6 shrink-0">
          {/* Branch Stat */}
          <div className="bg-white/70 dark:bg-white/[0.03] border border-surface-200 dark:border-white/[0.05] rounded-2xl px-5 py-3.5 backdrop-blur-xs shadow-sm flex flex-col min-w-[140px]">
            <span className="text-[10px] text-surface-400 dark:text-surface-500 uppercase font-bold tracking-wider mb-1">
              Branch
            </span>
            <span className="text-xs font-bold text-surface-900 dark:text-white truncate">
              {branch}
            </span>
          </div>

          {/* CGPA Stat */}
          <div className="bg-white/70 dark:bg-white/[0.03] border border-surface-200 dark:border-white/[0.05] rounded-2xl px-5 py-3.5 backdrop-blur-xs shadow-sm flex flex-col min-w-[100px]">
            <span className="text-[10px] text-surface-400 dark:text-surface-555 uppercase font-bold tracking-wider mb-1">
              CGPA
            </span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none">
              {cgpa} <span className="text-[10px] font-medium text-surface-400 dark:text-surface-555">/ 10</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ================================================================
   WIDGET 8: RESUME STATUS CARD
   ================================================================ */
function getRecommendedSkillsForRole(role) {
  switch (role) {
    case 'Full Stack Developer':
      return ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'System Design', 'Git', 'SQL'];
    case 'Data Analyst':
      return ['SQL', 'Python', 'Excel', 'Tableau', 'PowerBI', 'Statistics'];
    case 'Data Scientist':
      return ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'Data Visualization'];
    case 'AI Engineer':
      return ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'NLP'];
    case 'Cybersecurity Analyst':
      return ['Networking', 'Linux', 'Penetration Testing', 'Cryptography', 'Wireshark'];
    case 'Software Engineer':
    default:
      return ['Data Structures & Algorithms', 'Java', 'C++', 'System Design', 'SQL', 'Git'];
  }
}

function ResumeStatusCard({ onActionClick }) {
  const { user } = useAuth();
  const hasResume = !!user?.resumeFile;

  return (
    <Card variant="default" className="p-6 relative overflow-hidden flex flex-col justify-between" hoverable={false}>
      {/* Glow background decoration */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-success-light/5 rounded-full blur-xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Resume Status
          </h3>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
            hasResume 
              ? 'border-success/25 bg-success/5 text-success' 
              : 'border-warning/25 bg-warning/5 text-warning'
          }`}>
            {hasResume ? 'Ready to Apply' : 'Missing Resume'}
          </span>
        </div>

        {/* ATS Score Indicator */}
        <div className="flex items-center gap-4 bg-white/70 dark:bg-white/[0.02] border border-surface-200 dark:border-white/[0.05] p-3.5 rounded-2xl mb-4">
          <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${
            hasResume ? 'from-success to-success-dark shadow-success/15' : 'from-warning to-amber-600 shadow-warning/15'
          } flex flex-col items-center justify-center text-white shrink-0 shadow-md`}>
            <span className="text-base font-black leading-none">{hasResume ? 85 : 0}</span>
            <span className="text-[8px] font-semibold opacity-90 mt-0.5">Score</span>
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {hasResume ? user.resumeFile : "No Resume Uploaded"}
            </h4>
            <span className="text-[10px] text-surface-500 dark:text-surface-400 mt-1 block">
              {hasResume ? 'Parsed by AI engine' : 'Upload PDF to parse skills'}
            </span>
          </div>
        </div>

        {/* Short Feedback bullets */}
        <div className="space-y-2 pl-1 mb-5">
          {hasResume ? (
            <>
              <div className="flex items-center gap-2 text-[11px] text-surface-600 dark:text-surface-400">
                <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                <span className="truncate">ATS-compliant formatting template</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-surface-600 dark:text-surface-400">
                <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                <span className="truncate">Core competencies match target JD</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-[11px] text-warning font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-warning shrink-0 animate-pulse" />
              <span>Please upload your resume to run key term checks</span>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        className={`w-full justify-center text-xs py-2 ${
          hasResume 
            ? 'bg-indigo-500/10 hover:bg-indigo-500/20 dark:bg-success/10 dark:hover:bg-success/20 border border-indigo-500/20 dark:border-success/30 text-indigo-600 dark:text-success' 
            : 'bg-indigo-600 text-white hover:bg-indigo-550'
        }`}
        onClick={onActionClick}
      >
        {hasResume ? 'Optimize Resume' : 'Analyze Resume'}
      </Button>
    </Card>
  );
}

function PlacementReadinessWidget() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [mockSessions, setMockSessions] = useState(0);

  const loadStats = () => {
    try {
      const suffix = user?.email ? `_${user.email}` : '';
      const tVal = localStorage.getItem(`placify_tasks${suffix}`);
      const gVal = localStorage.getItem(`placify_goals${suffix}`);
      const sVal = localStorage.getItem(`placify_mock_sessions${suffix}`);
      setTasks(tVal ? JSON.parse(tVal) : []);
      setGoals(gVal ? JSON.parse(gVal) : []);
      setMockSessions(sVal ? parseInt(sVal) : 0);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStats();
    window.addEventListener('focus', loadStats);
    window.addEventListener('storage', loadStats);
    window.addEventListener('placify_data_update', loadStats);
    return () => {
      window.removeEventListener('focus', loadStats);
      window.removeEventListener('storage', loadStats);
      window.removeEventListener('placify_data_update', loadStats);
    };
  }, [user]);

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const hasResume = !!user?.resumeFile;
  
  const getGoalProgress = (goalId) => {
    const goalTasks = tasks.filter(t => t.goalId === goalId);
    if (goalTasks.length === 0) return 0;
    const completed = goalTasks.filter(t => t.completed).length;
    return Math.round((completed / goalTasks.length) * 100);
  };
  const completedGoalsCount = goals.filter(g => getGoalProgress(g.id) === 100 && tasks.filter(t => t.goalId === g.id).length > 0).length;

  const score = Math.min(
    100,
    Math.round(
      15 + 
      (completedTasksCount * 8) + 
      (completedGoalsCount * 15) + 
      (hasResume ? 20 : 0) + 
      (mockSessions * 10)
    )
  );

  const status = score >= 85 ? 'Excellent' : score >= 70 ? 'Strong' : score >= 50 ? 'Moderate' : 'Needs Work';
  const statusColor = score >= 70 ? 'text-success' : 'text-warning';

  return (
    <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

      <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
        Placement Readiness
      </h3>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative flex items-center justify-center h-28 w-28">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              className="stroke-gray-150 dark:stroke-white/[0.06]"
              strokeWidth="8"
              fill="transparent"
            />
            <motion.circle
              cx="56"
              cy="56"
              r="48"
              className="stroke-indigo-600 dark:stroke-indigo-400 svg-glow-primary"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={301.6}
              initial={{ strokeDashoffset: 301.6 }}
              animate={{ strokeDashoffset: 301.6 - (301.6 * score) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {score}%
            </span>
            <span className={`text-[10px] font-bold ${statusColor} uppercase tracking-wider mt-0.5`}>
              {status}
            </span>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-surface-500 dark:text-surface-400 px-4 leading-relaxed">
          {score >= 85 
            ? 'Excellent readiness. Profile meets standard benchmarks for top companies.' 
            : 'Ready for standard screening. Improve by completing mock coding assessments.'}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 bg-indigo-500/5 dark:bg-indigo-500/10 p-3 rounded-2xl border border-indigo-500/10">
        <Clock size={16} className="text-indigo-500 shrink-0" />
        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 leading-snug">
          Recommended: Do **{user?.dreamRole || 'Software'} Practice Mock** to boost score by 5%.
        </span>
      </div>
    </Card>
  );
}

function SkillsDetectedWidget() {
  const { user } = useAuth();
  const userSkills = user?.skills || [];

  return (
    <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
      <div className="absolute bottom-[-10%] right-[-10%] w-24 h-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
        Skills Detected
      </h3>
      <p className="text-xs text-surface-555 dark:text-surface-450 mb-5">
        Verified profile competencies and evaluations
      </p>

      <div className="space-y-4">
        {userSkills.length > 0 ? (
          userSkills.map((skill, index) => {
            const baseVal = user.experienceLevel === 'Beginner' ? 55 : user.experienceLevel === 'Intermediate' ? 75 : 90;
            const skillVal = Math.min(baseVal + (index * 3) % 11, 98);
            
            return (
              <div key={skill}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-surface-900 dark:text-gray-250">
                    {skill}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{skillVal}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skillVal}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-indigo-600 dark:bg-indigo-400"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6">
            <p className="text-xs text-surface-450 italic">No skills selected. Update profile to add skills.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function MissingSkillsWidget() {
  const { user } = useAuth();
  const userSkills = user?.skills || [];
  const recommended = getRecommendedSkillsForRole(user?.dreamRole);
  const missingSkills = recommended.filter(s => !userSkills.includes(s));

  const skillMeta = {
    'React': { cat: 'Web Development', pri: 'High' },
    'Node.js': { cat: 'Web Backend', pri: 'High' },
    'JavaScript': { cat: 'Core Web', pri: 'High' },
    'HTML': { cat: 'Core Web', pri: 'Medium' },
    'CSS': { cat: 'Core Web', pri: 'Medium' },
    'System Design': { cat: 'Software Design', pri: 'Medium' },
    'Git': { cat: 'Version Control', pri: 'Low' },
    'SQL': { cat: 'Databases', pri: 'High' },
    'Python': { cat: 'Core Programming', pri: 'High' },
    'Excel': { cat: 'Data Tools', pri: 'Medium' },
    'Tableau': { cat: 'Visualization', pri: 'High' },
    'PowerBI': { cat: 'Visualization', pri: 'Medium' },
    'Statistics': { cat: 'Analytics Core', pri: 'High' },
    'Machine Learning': { cat: 'AI Modelling', pri: 'High' },
    'Deep Learning': { cat: 'AI Modelling', pri: 'High' },
    'PyTorch': { cat: 'Frameworks', pri: 'Medium' },
    'TensorFlow': { cat: 'Frameworks', pri: 'Medium' },
    'NLP': { cat: 'AI Specialization', pri: 'Medium' },
    'Networking': { cat: 'Security Foundations', pri: 'High' },
    'Linux': { cat: 'Security Foundations', pri: 'Medium' },
    'Penetration Testing': { cat: 'Active Security', pri: 'High' },
    'Cryptography': { cat: 'Security Core', pri: 'High' },
    'Wireshark': { cat: 'Traffic Analysis', pri: 'Medium' },
    'Data Structures & Algorithms': { cat: 'Core DSA', pri: 'High' },
    'Java': { cat: 'Core Backend', pri: 'High' },
    'C++': { cat: 'Core Systems', pri: 'Medium' }
  };

  return (
    <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
      <div className="absolute top-[-10%] right-[-10%] w-20 h-20 bg-danger/5 rounded-full blur-xl pointer-events-none" />

      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
        Missing Skills
      </h3>
      <p className="text-xs text-surface-555 dark:text-surface-450 mb-5">
        Target Role: {user?.dreamRole || 'Software Engineer'}
      </p>

      <div className="space-y-3">
        {missingSkills.length > 0 ? (
          missingSkills.slice(0, 4).map((skill) => {
            const meta = skillMeta[skill] || { cat: 'Other Core', pri: 'Medium' };
            const colorClass = meta.pri === 'High' 
              ? 'text-danger bg-danger-light/10 dark:bg-danger/10 border-danger/20' 
              : 'text-warning bg-warning-light/10 dark:bg-warning/10 border-warning/20';
            return (
              <div
                key={skill}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-surface-200/60 dark:bg-white/[0.02] dark:border-white/[0.04] hover:border-surface-300 dark:hover:border-white/10 transition-colors"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {skill}
                  </h4>
                  <span className="text-[10px] text-surface-450 dark:text-surface-500 mt-0.5 block">
                    {meta.cat}
                  </span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold shrink-0 ${colorClass}`}>
                  {meta.pri}
                </span>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-xs text-success font-semibold">🔥 All recommended skills are set!</p>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ================================================================
   WIDGET 6: UPCOMING TARGETS
   ================================================================ */
function UpcomingTargetsWidget() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    try {
      const suffix = user?.email ? `_${user.email}` : '';
      const val = localStorage.getItem(`placify_tasks${suffix}`);
      setTasks(val ? JSON.parse(val) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTasks();
    window.addEventListener('focus', loadTasks);
    window.addEventListener('storage', loadTasks);
    window.addEventListener('placify_data_update', loadTasks);
    return () => {
      window.removeEventListener('focus', loadTasks);
      window.removeEventListener('storage', loadTasks);
      window.removeEventListener('placify_data_update', loadTasks);
    };
  }, [user]);

  const pending = tasks.filter(t => !t.completed);

  return (
    <Card variant="default" className="p-6" hoverable={false}>
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 font-heading">
        Upcoming Targets
      </h3>

      {pending.length === 0 ? (
        <div className="text-center py-6 text-xs text-surface-400 font-medium">
          No upcoming targets. Create a task to get started!
        </div>
      ) : (
        <div className="space-y-4 max-h-[180px] overflow-y-auto pr-1">
          {pending.slice(0, 4).map((target, idx) => {
            let daysLeftText = 'Due';
            let color = 'bg-indigo-500/10 text-indigo-500 border-indigo-500/15';
            
            if (target.deadline) {
              const diffTime = new Date(target.deadline) - new Date();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays < 0) {
                daysLeftText = 'Overdue';
                color = 'bg-danger/10 text-danger border-danger/15';
              } else if (diffDays === 0) {
                daysLeftText = 'Due today';
                color = 'bg-warning/10 text-warning border-warning/15';
              } else if (diffDays === 1) {
                daysLeftText = '1 day left';
                color = 'bg-warning/10 text-warning border-warning/15';
              } else {
                daysLeftText = `${diffDays} days left`;
                color = 'bg-indigo-500/10 text-indigo-500 border-indigo-500/15';
              }
            }

            return (
              <div key={target.id} className="flex gap-4 items-start relative pl-4">
                {idx !== Math.min(pending.length, 4) - 1 && (
                  <span className="absolute left-[7px] top-4.5 bottom-[-16px] w-0.5 bg-gray-100 dark:bg-white/[0.06]" />
                )}
                <span className="h-3.5 w-3.5 rounded-full border-2 border-indigo-500 bg-white dark:bg-gray-950 shrink-0 mt-1.5 z-10" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight truncate">
                      {target.name}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border shrink-0 font-semibold ${color}`}>
                      {daysLeftText}
                    </span>
                  </div>
                  <span className="text-[10px] text-surface-500 dark:text-surface-400 mt-1 block flex items-center gap-1.5">
                    <Calendar size={12} />
                    {target.deadline || 'No deadline'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

/* ================================================================
   MAIN DASHBOARD COMPONENT
   ================================================================ */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully.');
  };

  // Map pathnames to tab ids
  const pathToTab = {
    '/dashboard': 'dashboard',
    '/resume-analyzer': 'resume',
    '/skill-gap': 'skills',
    '/roadmap': 'roadmap',
    '/interview': 'interview',
    '/company-hub': 'company-hub',
    '/progress': 'progress',
    '/profile': 'profile',
    '/settings': 'settings'
  };

  const tabToPath = {
    'dashboard': '/dashboard',
    'resume': '/resume-analyzer',
    'skills': '/skill-gap',
    'roadmap': '/roadmap',
    'interview': '/interview',
    'company-hub': '/company-hub',
    'progress': '/progress',
    'profile': '/profile',
    'settings': '/settings'
  };

  const activeTab = pathToTab[location.pathname] || 'dashboard';

  const setActiveTab = (tabId) => {
    const path = tabToPath[tabId] || '/dashboard';
    navigate(path);
  };
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  // Notifications status toggle
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 transition-colors duration-300">
      
      {/* ──────────────────────────────────────────────────────────
          DESKTOP SIDEBAR (Static Left)
          ────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#111827] border-r border-gray-200/60 dark:border-gray-800/60 shrink-0 sticky top-0 h-screen p-5">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 px-2 mb-8 flex-nowrap shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/25 shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white font-heading shrink-0">
            Placify
          </span>
        </div>
        {/* Links Navigation */}
        <nav className="flex-1 space-y-2" aria-label="Sidebar navigation">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out cursor-pointer relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/25 text-indigo-700 dark:bg-gradient-to-r dark:from-[#6366F1] dark:to-[#8B5CF6] dark:border-indigo-500/50 dark:text-white dark:shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gradient-to-r dark:hover:from-[#6366F1]/10 dark:hover:to-[#8B5CF6]/10 hover:text-slate-900 dark:hover:text-white'
                } border`}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-450 dark:text-slate-500'} />
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-indicator"
                    className="absolute right-4 h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-white shadow-sm shadow-indigo-500/50"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-white/[0.06] mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-danger hover:bg-danger-light/10 dark:hover:bg-danger/10 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────
          MOBILE SIDEBAR (Slide-over drawer)
          ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black backdrop-blur-xs"
            />
            {/* Sidebar drawer content */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-64 z-50 bg-white dark:bg-[#111827] p-5 flex flex-col border-r border-gray-150 dark:border-gray-800/60"
            >
              <div className="flex items-center justify-between mb-8 px-2 flex-nowrap">
                <div className="flex items-center gap-2 flex-nowrap shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-base font-bold text-gray-900 dark:text-white font-heading shrink-0">Placify</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-150 dark:hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveTab(link.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out cursor-pointer relative ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/25 text-indigo-700 dark:bg-gradient-to-r dark:from-[#6366F1] dark:to-[#8B5CF6] dark:border-indigo-500/50 dark:text-white dark:shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gradient-to-r dark:hover:from-[#6366F1]/10 dark:hover:to-[#8B5CF6]/10 hover:text-slate-900 dark:hover:text-white'
                      } border`}
                    >
                      <Icon size={18} className={isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-450 dark:text-slate-500'} />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-gray-100 dark:border-white/[0.06] mt-auto">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-danger hover:bg-danger-light/10 dark:hover:bg-danger/10 transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          MAIN BODY LAYOUT
          ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ── TOPBAR ───────────────────────────────────────────── */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 dark:border-white/[0.08] bg-white/80 dark:bg-[#151B2D]/40 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
            >
              <Menu size={20} />
            </button>
            
            {/* User Greeting */}
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                Welcome back, {user?.name || 'Sowmya'}
              </h1>
              <p className="text-[10px] text-surface-500 dark:text-surface-400 mt-0.5 hidden sm:block">
                Here's a review of your placement milestones today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input bar */}
            <div className="relative w-48 sm:w-60 hidden sm:block">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, mocks..."
                className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.08] rounded-xl pl-9.5 pr-4 py-1.5 text-xs text-gray-900 dark:text-white placeholder-surface-400 outline-none focus:border-indigo-500/60 transition-colors"
              />
            </div>

            {/* Notifications Button */}
            <button
              onClick={() => setUnreadNotifications(false)}
              className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Bell size={18} />
              {unreadNotifications && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-indigo-500 rounded-full border border-white dark:border-gray-900" />
              )}
            </button>

            {/* Profile Avatar indicator */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-white/[0.08] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {(user?.name || 'Sowmya').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* ── MAIN SCROLLING CONTENT AREA ────────────────────────── */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto relative overflow-x-hidden z-10">
          {/* SaaS Premium Ambient Glow Backgrounds */}
          <div className="absolute top-12 left-1/4 w-[450px] h-[450px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-20 right-10 w-[350px] h-[350px] bg-secondary/5 dark:bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-info/5 dark:bg-info/5 rounded-full blur-[90px] pointer-events-none -z-10" />
          
          <Suspense fallback={<PageSkeleton />}>
            {activeTab === 'dashboard' ? (
              <div className="space-y-6">
                
                {/* Welcome Banner Card */}
                <WelcomeCard
                  name={user?.name || 'Sowmya Reddy'}
                  branch={user?.branch || 'Computer Science & Engineering'}
                  cgpa={user?.cgpa || '9.2'}
                />

                {/* Widgets Row 1: Readiness, Skills Detected, Missing Skills */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <PlacementReadinessWidget />
                  <SkillsDetectedWidget />
                  <MissingSkillsWidget />
                </div>

                {/* Widgets Row 2: Weekly Progress (takes 2 cols), Daily Goals (takes 1 col) */}
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Suspense fallback={<ChartSkeleton />}>
                      <WeeklyProgressChart />
                    </Suspense>
                  </div>
                  <div>
                    <DailyGoalsWidget />
                  </div>
                </div>

                {/* Widgets Row 3: Upcoming Targets, Resume Status, Quick Interview launcher */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UpcomingTargetsWidget />
                  <ResumeStatusCard onActionClick={() => setActiveTab('resume')} />

                  {/* Quick launch mock practice card */}
                  <Card variant="default" className="p-6 relative overflow-hidden flex flex-col justify-between" hoverable={true}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                        Mock Practicing
                      </h3>
                      <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed mb-4">
                        Get real-time feedback on your mock pitch or technical coding answers with our AI interview modules.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      rightIcon={ChevronRight}
                      onClick={() => setActiveTab('interview')}
                    >
                      Launch Mock Practice
                    </Button>
                  </Card>
                </div>

              </div>
            ) : activeTab === 'resume' ? (
              <motion.div
                key="resume-analyzer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResumeAnalyzer />
              </motion.div>
            ) : activeTab === 'skills' ? (
              <motion.div
                key="skill-gap-analyzer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SkillGapAnalyzer />
              </motion.div>
            ) : activeTab === 'roadmap' ? (
              <motion.div
                key="placement-roadmap"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PlacementRoadmap />
              </motion.div>
            ) : activeTab === 'interview' ? (
              <motion.div
                key="mock-interview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MockInterview />
              </motion.div>
            ) : activeTab === 'company-hub' ? (
              <motion.div
                key="company-hub"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CompanyPrepHub />
              </motion.div>
            ) : activeTab === 'progress' ? (
              <motion.div
                key="progress-tracker"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressTracker />
              </motion.div>
            ) : activeTab === 'profile' ? (
              <motion.div
                key="profile-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProfilePanel />
              </motion.div>
            ) : activeTab === 'settings' ? (
              <motion.div
                key="settings-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsPanel />
              </motion.div>
            ) : (
              /* Subtabs Placeholder render */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4"
              >
                <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                  {activeTab === 'interview' && <MessageSquare size={28} />}
                  {activeTab === 'progress' && <BarChart3 size={28} />}
                  {activeTab === 'settings' && <Settings size={28} />}
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize mb-2">
                  {activeTab.replace('-', ' ')}
                </h2>
                <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm">
                  Interactive module is being constructed. You can return to the Dashboard layout in the sidebar link.
                </p>
                
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-6"
                  onClick={() => setActiveTab('dashboard')}
                >
                  Back to Dashboard Tab
                </Button>
              </motion.div>
            )}
          </Suspense>
        </main>
      </div>

    </div>
  );
}
