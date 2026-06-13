import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Award,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Check,
  Plus,
  Trash2,
  Loader2
} from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';
import { skillsAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth';

// Standard fallback/target values for mock visual matching
const SKILL_DESCRIPTIONS = {
  'Java': 'Object-Oriented Programming & Multi-threading',
  'Python': 'Scripting, Automation, & Algorithms',
  'SQL': 'Relational Schema & Complex Index Queries',
  'DSA': 'Data Structures & Algorithms Complexity Analysis',
  'React': 'Frontend Component Architecture & Hooks',
  'Git': 'Distributed Version Control & Workflows',
  'REST APIs': 'API Design Patterns & HTTP Methods',
  'HTML': 'Document structure & accessibility schemas',
  'CSS': 'Responsive web design, Flexbox and Grid layouts'
};

// Recommended learning path data
const LEARNING_PATH = [
  {
    id: 1,
    skill: 'React',
    title: 'React.js Frontend Intensive',
    provider: 'Placify Academy',
    match: '96% Match',
    time: '8 hours',
    boost: '+18% salary lift',
    desc: 'Master React functional components, useState/useEffect Hooks, context states, and modern Tailwind layouts.'
  },
  {
    id: 2,
    skill: 'Git',
    title: 'Git & Collaboration Workflows',
    provider: 'Design Masters',
    match: '92% Match',
    time: '4 hours',
    boost: '+10% salary lift',
    desc: 'Cover rebasing, conflict resolution, cherry-picking, pull requests, and standard semantic versioning.'
  },
  {
    id: 3,
    skill: 'DSA',
    title: 'Data Structures & Algorithms Bootcamp',
    provider: 'Tech Academy',
    match: '95% Match',
    time: '15 hours',
    boost: '+25% salary lift',
    desc: 'Focus on recursion, tree traversal algorithms, dynamic programming grids, and sorting runtimes.'
  }
];

export default function SkillGapAnalyzer() {
  const { user, updateUser } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedRoadmaps, setAddedRoadmaps] = useState({});
  const [hoveredBar, setHoveredBar] = useState(null);
  
  // Form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newProficiency, setNewProficiency] = useState('Beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  // Load skills on mount
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillsAPI.getAll();
      if (res.success) {
        setSkills(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load skills from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      toast.error('Skill name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await skillsAPI.add(newSkillName.trim(), newProficiency);
      if (res.success) {
        toast.success(`Skill "${newSkillName}" added successfully.`);
        setNewSkillName('');
        setNewProficiency('Beginner');
        // Refresh local skills
        await fetchSkills();
        
        // Sync context skills state for visual consistency
        const freshSkills = await skillsAPI.getAll();
        if (freshSkills.success) {
          updateUser({ skills: freshSkills.data.map(s => s.skill_name) });
        }
      }
    } catch (err) {
      toast.error(err.message || 'Failed to add skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async (skillId, skillName) => {
    try {
      const res = await skillsAPI.delete(skillId);
      if (res.success) {
        toast.success(`Skill "${skillName}" deleted.`);
        await fetchSkills();

        const freshSkills = await skillsAPI.getAll();
        if (freshSkills.success) {
          updateUser({ skills: freshSkills.data.map(s => s.skill_name) });
        }
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete skill');
    }
  };

  const toggleRoadmap = (id, skillName) => {
    setAddedRoadmaps((prev) => {
      const next = !prev[id];
      if (next) {
        toast.success(`"${skillName}" learning path has been added to your preparation roadmap!`);
      } else {
        toast.info(`"${skillName}" learning path removed from roadmap.`);
      }
      return {
        ...prev,
        [id]: next
      };
    });
  };

  // Map database proficiency levels to visual scores
  const proficiencyScores = { 'Beginner': 45, 'Intermediate': 75, 'Advanced': 95 };
  const benchmarkScores = { 'Beginner': 70, 'Intermediate': 80, 'Advanced': 90 };

  const mappedSkillsData = skills.map((s) => {
    const userScore = proficiencyScores[s.proficiency] || 45;
    const requiredScore = benchmarkScores[s.proficiency] || 80;
    return {
      id: s.id,
      name: s.skill_name,
      userScore,
      requiredScore,
      proficiency: s.proficiency,
      desc: SKILL_DESCRIPTIONS[s.skill_name] || 'General Technical Competency'
    };
  });

  // Default skills layout if DB is empty to prevent blank dashboard views
  const displaySkillsData = mappedSkillsData.length > 0 ? mappedSkillsData : [
    { name: 'Python', userScore: 80, requiredScore: 75, desc: 'Scripting, Automation & Systems', proficiency: 'Intermediate' },
    { name: 'SQL', userScore: 40, requiredScore: 80, desc: 'Relational Schema Designs', proficiency: 'Beginner' }
  ];

  const currentSkills = displaySkillsData.filter(s => s.userScore >= s.requiredScore);
  const missingSkills = displaySkillsData.filter(s => s.userScore < s.requiredScore);

  // Skill Readiness Score: average of (User Score / Required Score), capped at 100%
  const totalCompetencies = displaySkillsData.length;
  const metCompetencies = displaySkillsData.filter(s => s.userScore >= s.requiredScore).length;
  const readinessPercentage = totalCompetencies > 0 
    ? Math.round((displaySkillsData.reduce((acc, curr) => acc + Math.min(100, (curr.userScore / curr.requiredScore) * 100), 0) / totalCompetencies))
    : 0;

  // SVG Chart Dimensions
  const chartWidth = 560;
  const chartHeight = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;
  const barSpacing = graphWidth / displaySkillsData.length;
  const barWidth = 14;

  if (loading && skills.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-sm text-surface-500 font-medium">Fetching skill gap analysis...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Skill Gap Analysis
        </h2>
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
          Analyze your current skill proficiencies against SDE placement benchmarks.
        </p>
      </div>

      {/* Row 1: Readiness Score, Skills Lists, Missing Diagnostic */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Readiness Circle Gauge */}
        <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Skill Readiness Score
          </h3>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative flex items-center justify-center h-28 w-28">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  className="stroke-surface-100 dark:stroke-white/[0.06]"
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
                  animate={{ strokeDashoffset: 301.6 - (301.6 * readinessPercentage) / 100 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {readinessPercentage}%
                </span>
                <span className="text-[9px] font-bold text-warning uppercase tracking-wider mt-0.5">
                  {readinessPercentage >= 80 ? 'Placement Ready' : 'Needs Focus'}
                </span>
              </div>
            </div>
            <p className="mt-5 text-center text-[11px] text-surface-555 dark:text-surface-400 px-2 leading-relaxed">
              Mastered **{metCompetencies} of {totalCompetencies}** core requirements. Complete missing learning modules to achieve 90% benchmark.
            </p>
          </div>
        </Card>

        {/* Card 2: Current Skills & Inline CRUD Form */}
        <Card variant="default" className="p-6 flex flex-col justify-between" hoverable={false}>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Award size={16} className="text-indigo-500" />
              My Skills Inventory
            </h3>

            <div className="space-y-4 max-h-[160px] overflow-y-auto pr-1 mb-4">
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s.id} className="group px-2.5 py-1 rounded-xl text-[10px] font-bold bg-indigo-500/10 border border-indigo-500/15 text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1.5">
                      {s.skill_name} ({s.proficiency})
                      <button 
                        onClick={() => handleDeleteSkill(s.id, s.skill_name)} 
                        className="text-indigo-400 hover:text-danger transition-colors cursor-pointer"
                        title="Delete skill"
                      >
                        <Trash2 size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-surface-450 italic">No skills registered yet. Use the form below to begin seeding.</p>
              )}
            </div>
          </div>

          {/* Quick Add Skill Form */}
          <form onSubmit={handleAddSkill} className="border-t border-surface-200 dark:border-white/[0.05] pt-3.5 flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-surface-400 block">
              Quick Add Technical Skill
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="React, SQL, Java..."
                className="flex-1 bg-surface-100 dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-gray-950 dark:text-white outline-none focus:border-indigo-500"
              />
              <select
                value={newProficiency}
                onChange={(e) => setNewProficiency(e.target.value)}
                className="bg-surface-100 dark:bg-gray-900 border border-surface-200 dark:border-white/[0.08] rounded-xl px-2 py-1.5 text-xs text-gray-950 dark:text-white outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white p-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </form>
        </Card>

        {/* Card 3: Missing Skills Diagnostic Gaps */}
        <Card variant="default" className="p-6 border-l-4 border-l-danger" hoverable={false}>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-danger/10 border border-danger/15 text-danger">
              <AlertTriangle size={16} />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Diagnostic Gaps
            </h3>
          </div>
          
          <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
            {missingSkills.length > 0 ? (
              missingSkills.map(s => (
                <div key={s.name} className="p-2.5 rounded-xl bg-danger/5 border border-danger/15 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-danger uppercase">{s.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-danger/10 text-danger font-extrabold uppercase">
                      -{s.requiredScore - s.userScore}% Gap
                    </span>
                  </div>
                  <p className="text-[10px] text-surface-555 dark:text-surface-400 mt-1 leading-snug">
                    {s.desc}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <span className="text-xs text-success font-bold">🎉 No skill gaps detected!</span>
              </div>
            )}
          </div>
        </Card>

      </div>

      {/* Row 2: Skill Comparison Charts & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        
        {/* Interactive Comparison SVG Chart */}
        <Card variant="default" className="p-6 lg:col-span-2 relative overflow-hidden" hoverable={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Skill Comparison Chart
              </h3>
              <p className="text-[10px] text-surface-450 dark:text-surface-500 mt-0.5">
                Hover bars to see numerical benchmark delta
              </p>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-indigo-600 dark:bg-indigo-400 inline-block" />
                <span className="text-surface-700 dark:text-gray-300">Your Level</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-surface-200 border border-dashed border-indigo-400 dark:bg-white/5 inline-block" />
                <span className="text-surface-700 dark:text-gray-300">Target Benchmark</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[240px] select-none">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              {[0, 25, 50, 75, 100].map((val) => {
                const y = paddingTop + graphHeight - (val / 100) * graphHeight;
                return (
                  <g key={val}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={chartWidth - paddingRight}
                      y2={y}
                      className="stroke-surface-100 dark:stroke-white/[0.04]"
                      strokeWidth="1"
                      strokeDasharray={val === 0 ? "0" : "4,4"}
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 3}
                      textAnchor="end"
                      className="fill-surface-400 dark:fill-surface-500 font-bold text-[9px]"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {displaySkillsData.map((skill, index) => {
                const x = paddingLeft + index * barSpacing + (barSpacing - barWidth * 2) / 2;
                const userBarHeight = (skill.userScore / 100) * graphHeight;
                const reqBarHeight = (skill.requiredScore / 100) * graphHeight;
                const userY = paddingTop + graphHeight - userBarHeight;
                const reqY = paddingTop + graphHeight - reqBarHeight;
                const isHovered = hoveredBar === index;

                return (
                  <g
                    key={skill.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <rect
                      x={paddingLeft + index * barSpacing}
                      y={paddingTop}
                      width={barSpacing}
                      height={graphHeight}
                      fill="transparent"
                    />

                    <motion.rect
                      x={x}
                      y={userY}
                      width={barWidth}
                      height={userBarHeight}
                      className="fill-indigo-600 dark:fill-indigo-400"
                      rx="3"
                      animate={{ opacity: isHovered || hoveredBar === null ? 1 : 0.6 }}
                      transition={{ duration: 0.2 }}
                    />

                    <motion.rect
                      x={x + barWidth + 3}
                      y={reqY}
                      width={barWidth}
                      height={reqBarHeight}
                      className="fill-surface-200/50 stroke-dashed stroke-indigo-400/80 dark:fill-white/5"
                      strokeWidth="1"
                      rx="3"
                      animate={{ opacity: isHovered || hoveredBar === null ? 1 : 0.6 }}
                      transition={{ duration: 0.2 }}
                    />

                    <text
                      x={x + barWidth}
                      y={paddingTop + graphHeight + 14}
                      textAnchor="middle"
                      className={`font-semibold text-[10px] transition-colors ${
                        isHovered
                          ? 'fill-indigo-500 font-extrabold'
                          : 'fill-surface-450 dark:fill-surface-500'
                      }`}
                    >
                      {skill.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <AnimatePresence>
              {hoveredBar !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 pointer-events-none bg-surface-900/95 dark:bg-white/95 text-white dark:text-surface-900 px-3.5 py-2.5 rounded-2xl shadow-xl border border-white/10 dark:border-surface-200 flex flex-col text-xs"
                  style={{
                    left: `${(paddingLeft + hoveredBar * barSpacing + barSpacing/2) / chartWidth * 100}%`,
                    top: `10%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span className="font-extrabold uppercase text-[10px] tracking-wider text-indigo-400 dark:text-indigo-600">
                    {displaySkillsData[hoveredBar].name}
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1.5 text-[10px]">
                    <span>Your Level:</span>
                    <span className="font-bold text-right">{displaySkillsData[hoveredBar].userScore}%</span>
                    <span>Required:</span>
                    <span className="font-bold text-right">{displaySkillsData[hoveredBar].requiredScore}%</span>
                    <span className="border-t border-white/20 dark:border-surface-300 pt-1">Gap Delta:</span>
                    <span className={`font-bold text-right border-t border-white/20 dark:border-surface-300 pt-1 ${
                      displaySkillsData[hoveredBar].userScore >= displaySkillsData[hoveredBar].requiredScore
                        ? 'text-success'
                        : 'text-danger'
                    }`}>
                      {displaySkillsData[hoveredBar].userScore - displaySkillsData[hoveredBar].requiredScore}%
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Recommended Learning Path */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Brain size={16} className="text-indigo-500" />
              Recommended Modules
            </h3>
          </div>

          {LEARNING_PATH.map((c) => {
            const isAdded = addedRoadmaps[c.id];
            return (
              <Card key={c.id} variant="default" className="p-5 flex flex-col justify-between" hoverable={false}>
                <div>
                  <div className="flex items-center justify-between mb-3 text-[9px] font-bold">
                    <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-lg border border-indigo-500/15">
                      {c.match}
                    </span>
                    <span className="text-surface-450 dark:text-surface-500 font-semibold flex items-center gap-1">
                      <BookOpen size={10} />
                      {c.time}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                    {c.title}
                  </h4>
                  
                  <p className="text-[10px] text-surface-555 dark:text-surface-400 mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-surface-200 dark:border-white/[0.05] flex items-center justify-between">
                  <span className="text-[9px] text-success font-bold flex items-center gap-1 uppercase tracking-wide">
                    <TrendingUp size={10} />
                    {c.boost}
                  </span>

                  <Button
                    variant={isAdded ? "secondary" : "primary"}
                    size="sm"
                    className="py-1 text-[10px] cursor-pointer"
                    leftIcon={isAdded ? <Check size={12} /> : <Plus size={12} />}
                    onClick={() => toggleRoadmap(c.id, c.skill)}
                  >
                    {isAdded ? "Added" : "Add Target"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
