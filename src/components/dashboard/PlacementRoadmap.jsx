import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  Lock,
  ChevronDown,
  Sparkles,
  Award,
  Zap,
  Target,
  Check,
  Plus,
  BookOpen,
  Calendar,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { roadmapAPI } from '@/lib/api';

export default function PlacementRoadmap() {
  const { user, updateUser } = useAuth();
  const currentRole = user?.dreamRole || 'Software Engineer';
  
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  
  const [dailyGoals, setDailyGoals] = useState([
    { id: 'd1', text: 'Solve 2 Array problems', checked: true },
    { id: 'd2', text: 'Practice pointer logic', checked: false },
    { id: 'd3', text: 'Implement custom buffer logic', checked: false }
  ]);
  const [newGoalText, setNewGoalText] = useState('');

  const toast = useToast();

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const res = await roadmapAPI.getAll();
      if (res.success) {
        setRoadmaps(res.data);
        // Default first item to expanded
        if (res.data.length > 0 && res.data[0].items.length > 0) {
          setExpandedItem(res.data[0].items[0].id);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load roadmap from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const handleGenerateRoadmap = async () => {
    try {
      setIsCreating(true);
      const title = `${currentRole} Preparation Track`;
      const res = await roadmapAPI.create(title, currentRole, `Personalized milestones generated for target position: ${currentRole}`);
      if (res.success) {
        toast.success(`Custom roadmap generated for "${currentRole}"!`);
        await fetchRoadmaps();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to generate learning roadmap');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleTaskStatus = async (itemId, currentStatus) => {
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const res = await roadmapAPI.updateItemStatus(itemId, nextStatus);
      if (res.success) {
        // Optimistic local update
        setRoadmaps((prevRoadmaps) =>
          prevRoadmaps.map((rm) => ({
            ...rm,
            items: rm.items.map((item) =>
              item.id === itemId ? { ...item, status: nextStatus } : item
            ),
          }))
        );
        toast.success('Task progress synchronized with server.');
        
        // Refresh profile stats in local context (readiness score updates)
        if (user) {
          // Trigger silent refresh or update local score
          updateUser({ readinessScore: Math.min(100, user.readinessScore + (nextStatus === 'completed' ? 4 : -4)) });
        }
      }
    } catch (err) {
      toast.error('Failed to update progress on server');
    }
  };

  const toggleDailyGoal = (id) => {
    setDailyGoals(
      dailyGoals.map(g => (g.id === id ? { ...g, checked: !g.checked } : g))
    );
  };

  const addDailyGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    setDailyGoals([
      ...dailyGoals,
      { id: Date.now().toString(), text: newGoalText.trim(), checked: false }
    ]);
    setNewGoalText('');
  };

  // Calculations for overall prep based on active roadmaps
  const activeRoadmap = roadmaps[0];
  const roadmapItems = activeRoadmap?.items || [];
  const totalTasks = roadmapItems.length;
  const completedTasks = roadmapItems.filter(item => item.status === 'completed').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Render Loader during initial load
  if (loading && roadmaps.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-sm text-surface-500 font-medium">Loading placement roadmap...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">
            Placement Roadmap
          </h2>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            A structured week-by-week DSA preparation syllabus designed for recruiting benchmarks.
          </p>
        </div>
        
        {roadmaps.length > 0 && (
          <Button 
            variant="secondary" 
            size="sm" 
            className="cursor-pointer flex items-center gap-1.5"
            leftIcon={<RefreshCw size={13} />}
            onClick={fetchRoadmaps}
          >
            Sync Progress
          </Button>
        )}
      </div>

      {roadmaps.length === 0 ? (
        /* Empty state: prompt user to generate roadmap based on their role */
        <Card variant="default" className="p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center min-h-[300px]" hoverable={false}>
          <div className="h-16 w-16 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-6">
            <Compass size={28} />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            No active career path roadmap found
          </h3>
          <p className="text-xs text-surface-455 dark:text-surface-500 mt-2 max-w-md">
            Placify can generate a target milestones syllabus tailored specifically to your target role: **{currentRole}**.
          </p>
          <Button 
            variant="primary" 
            size="sm" 
            className="mt-6 cursor-pointer"
            onClick={handleGenerateRoadmap}
            disabled={isCreating}
            leftIcon={isCreating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          >
            {isCreating ? 'Generating track...' : 'Generate Learning Path'}
          </Button>
        </Card>
      ) : (
        /* Roadmap exists, show timeline interface */
        <>
          {/* Row 1: Progress, Daily Goals, badging */}
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Card 1: Overall Progress Tracking */}
            <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15">
                    <Target size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none">
                      Roadmap Progress
                    </h3>
                    <span className="text-[10px] text-surface-450 dark:text-surface-500 block mt-1">
                      Syllabus milestones matching target
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2.5 mt-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white font-heading">
                    {progressPercent}%
                  </span>
                  <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                    {completedTasks} / {totalTasks} Completed
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-2 w-full bg-surface-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </Card>

            {/* Card 2: Daily Learning Goals */}
            <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/15">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none">
                        Daily Targets
                      </h3>
                      <span className="text-[10px] text-surface-450 dark:text-surface-500 block mt-1">
                        Today's study actions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {dailyGoals.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => toggleDailyGoal(g.id)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl border transition-colors cursor-pointer ${
                        g.checked
                          ? 'bg-success/5 border-success/10 text-surface-400 dark:text-surface-500 line-through'
                          : 'bg-white/50 border-surface-200/60 dark:bg-white/[0.02] dark:border-white/[0.04] text-gray-950 dark:text-white hover:border-surface-300 dark:hover:border-white/10'
                      }`}
                    >
                      <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                        g.checked ? 'bg-success border-success text-white' : 'border-surface-300 dark:border-white/20'
                      }`}>
                        {g.checked && <Check size={12} strokeWidth={3.5} />}
                      </div>
                      <span className="text-[11px] leading-snug">{g.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={addDailyGoal} className="mt-4 flex gap-2 pt-3 border-t border-surface-200 dark:border-white/[0.05]">
                <input
                  type="text"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  placeholder="Add quick target..."
                  className="flex-1 min-w-0 bg-surface-100 dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-gray-900 dark:text-white placeholder-surface-400 outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Plus size={14} />
                </button>
              </form>
            </Card>

            {/* Card 3: Milestones Tracker Badges */}
            <Card variant="default" className="p-6" hoverable={false}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-success/10 text-success border border-success/15">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none">
                    Milestones Badges
                  </h3>
                  <span className="text-[10px] text-surface-450 dark:text-surface-500 block mt-1">
                    Syllabus progress validation
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                {roadmapItems.map((item, index) => {
                  const isDone = item.status === 'completed';
                  return (
                    <div key={item.id} className={`flex items-center justify-between p-2.5 rounded-xl border ${
                      isDone 
                        ? 'text-success bg-success/5 border-success/20 font-bold' 
                        : 'text-surface-400 bg-white/20 dark:bg-white/[0.01] border-surface-200 dark:border-white/[0.04]'
                    }`}>
                      <span className="text-xs leading-none truncate max-w-[170px]">{item.title}</span>
                      <span className="text-[9px] font-black uppercase tracking-wider">
                        {isDone ? 'Completed' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Row 2: Timeline steps */}
          <div className="relative pl-3 md:pl-5 mt-6">
            <span className="absolute left-[17px] md:left-[27px] top-6 bottom-6 w-0.5 bg-surface-200 dark:bg-white/[0.08]" />

            <div className="space-y-6">
              {roadmapItems.map((item, index) => {
                const isExpanded = expandedItem === item.id;
                const isCompleted = item.status === 'completed';
                const isNextTrack = index === completedTasks;
                
                let stepIcon = null;
                let dotColorClass = '';
                
                if (isCompleted) {
                  stepIcon = <CheckCircle2 size={16} className="text-success shrink-0" />;
                  dotColorClass = 'bg-success/10 border-success text-success';
                } else if (isNextTrack) {
                  stepIcon = <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />;
                  dotColorClass = 'bg-indigo-500/10 border-indigo-500 text-indigo-500 ring-4 ring-indigo-500/10 dark:ring-indigo-500/5';
                } else {
                  stepIcon = <Lock size={12} className="text-surface-400 shrink-0" />;
                  dotColorClass = 'bg-white dark:bg-gray-950 border-surface-200 dark:border-white/20 text-surface-400';
                }

                const handleHeaderClick = () => {
                  if (!isCompleted && !isNextTrack) return; // Allow interaction only if completed or active next
                  setExpandedItem(isExpanded ? null : item.id);
                };

                return (
                  <div key={item.id} className="relative flex gap-5 md:gap-7 items-start">
                    
                    {/* Node dot */}
                    <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-colors ${dotColorClass}`}>
                      {stepIcon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        onClick={handleHeaderClick}
                        className={`glass rounded-2xl p-5 border text-left transition-all ${
                          !isCompleted && !isNextTrack
                            ? 'border-surface-200/50 dark:border-white/[0.03] opacity-65 cursor-default'
                            : isExpanded
                            ? 'border-indigo-500/40 dark:border-indigo-500/20 shadow-md ring-1 ring-indigo-500/10 cursor-pointer'
                            : 'border-surface-200 dark:border-white/[0.05] hover:border-surface-300 dark:hover:border-white/10 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                              Milestone Phase 0{index + 1}
                            </span>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mt-0.5 font-heading">
                              {item.title}
                            </h3>
                          </div>
                          
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider shrink-0 ${
                            isCompleted
                              ? 'text-success bg-success/5 border-success/15'
                              : isNextTrack
                              ? 'text-indigo-600 bg-indigo-500/5 border-indigo-500/15'
                              : 'text-surface-400 bg-white/20 dark:bg-white/[0.01] border-surface-200 dark:border-white/[0.04]'
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-surface-555 dark:text-surface-400 leading-relaxed max-w-2xl font-sans">
                          {item.description || 'No description provided for this milestone.'}
                        </p>

                        <AnimatePresence>
                          {isExpanded && (isCompleted || isNextTrack) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden mt-4 pt-4 border-t border-surface-200 dark:border-white/[0.05]"
                            >
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 mb-3">
                                Milestone Evaluation
                              </h4>

                              <div 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleTaskStatus(item.id, item.status);
                                }}
                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                  isCompleted
                                    ? 'bg-success/5 border-success/10 text-surface-400 dark:text-surface-500 line-through'
                                    : 'bg-white/50 border-surface-200 dark:bg-white/[0.02] dark:border-white/[0.03] text-gray-900 dark:text-white hover:border-surface-300 dark:hover:border-white/8'
                                }`}
                              >
                                <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                                  isCompleted ? 'bg-success border-success text-white' : 'border-surface-300 dark:border-white/20'
                                }`}>
                                  {isCompleted && <Check size={12} strokeWidth={3.5} />}
                                </div>
                                <div className="text-xs">
                                  <span className="font-bold block text-gray-900 dark:text-white mb-0.5">Mark entire section as completed</span>
                                  <span>Completing this milestone will increment your Placify readiness score.</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {(isCompleted || isNextTrack) && (
                          <div className="flex justify-end mt-3 text-[10px] text-indigo-500 font-bold items-center gap-0.5 select-none">
                            <span>{isExpanded ? "Collapse" : "Expand Evaluation Details"}</span>
                            <ChevronDown size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
