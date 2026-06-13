import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Search,
  ArrowLeft,
  Check,
  HelpCircle,
  Info,
  Calendar,
  GraduationCap,
  Award,
  TrendingUp,
  Terminal,
  Layers,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  Clock,
  Target,
  Briefcase,
  GitCompare,
  Sparkles,
  SlidersHorizontal,
  X,
  CheckCircle2,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { COMPANY_DATA } from './companyData';

export default function CompanyPrepHub() {
  const { user } = useAuth();
  const targetCompanies = user?.targetCompanies || [];
  
  // Extract user parameters for personalized recommendations
  const userCgpa = parseFloat(user?.cgpa) || 0.0;
  const userSkills = useMemo(() => {
    if (!user?.skills) return [];
    if (Array.isArray(user.skills)) {
      return user.skills.map(s => (typeof s === 'string' ? s : s.skill_name || s.name || ''));
    }
    return [];
  }, [user?.skills]);
  const userBranch = user?.branch || 'Engineering';

  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('eligibility'); // eligibility, process, topics, questions, tips
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState(null);
  
  // Filtering states
  const [companyType, setCompanyType] = useState('all'); // all, service, product, indian-product
  const [roleFilter, setRoleFilter] = useState('all');
  const [cgpaFilter, setCgpaFilter] = useState('all'); // all, eligible
  const [skillFilters, setSkillFilters] = useState([]); // array of skills to match
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Comparison states
  const [compareList, setCompareList] = useState([]); // Array of company IDs (max 2)
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Topic progress checklists state
  const [completedTopics, setCompletedTopics] = useState({});
  const toast = useToast();

  const handleToggleTopic = (companyId, topicName) => {
    const key = `${companyId}-${topicName}`;
    setCompletedTopics(prev => {
      const next = !prev[key];
      if (next) {
        toast.success(`Marked "${topicName}" as completed!`);
      } else {
        toast.info(`Topic "${topicName}" marked as incomplete.`);
      }
      return {
        ...prev,
        [key]: next
      };
    });
  };

  const handleBackToGrid = () => {
    setSelectedCompanyId(null);
    setExpandedQuestionIdx(null);
    setActiveTab('eligibility');
  };

  const companiesList = useMemo(() => Object.values(COMPANY_DATA), []);

  // Collect all unique roles and skills across database for filter dropdowns
  const allUniqueRoles = useMemo(() => {
    const rolesSet = new Set();
    companiesList.forEach(c => c.roles.forEach(r => rolesSet.add(r)));
    return Array.from(rolesSet).sort();
  }, [companiesList]);

  const allUniqueSkills = useMemo(() => {
    const skillsSet = new Set();
    companiesList.forEach(c => {
      // Add general skills required
      const defaultSkills = ['Java', 'Python', 'C++', 'SQL', 'DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Git'];
      defaultSkills.forEach(s => skillsSet.add(s));
      // Add any specific skills mentioned in topics
      c.technicalTopics.forEach(t => {
        if (t.length < 20) skillsSet.add(t);
      });
    });
    return Array.from(skillsSet).sort();
  }, [companiesList]);

  // Compute number of eligible companies for the user
  const eligibleCompaniesCount = useMemo(() => {
    return companiesList.filter(c => {
      // Check CGPA
      if (userCgpa > 0 && c.cgpa > userCgpa) return false;
      return true;
    }).length;
  }, [companiesList, userCgpa]);

  // Filter and Search Logic
  const filteredCompanies = useMemo(() => {
    return companiesList.filter(c => {
      // Search query
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Company Type Filter
      if (companyType !== 'all') {
        if (companyType === 'indian-product') {
          if (c.type !== 'indian-product') return false;
        } else if (c.type !== companyType) {
          return false;
        }
      }

      // Role Filter
      if (roleFilter !== 'all') {
        if (!c.roles.includes(roleFilter)) return false;
      }

      // CGPA Eligibility Filter
      if (cgpaFilter === 'eligible') {
        if (userCgpa > 0 && c.cgpa > userCgpa) return false;
      }

      // Skill Filters
      if (skillFilters.length > 0) {
        // Match if company requires any of the selected skills or lists them in technicalTopics
        const companySkillPool = [...c.technicalTopics, ...c.skills || []].map(s => s.toLowerCase());
        const hasMatchingSkill = skillFilters.every(sf => 
          companySkillPool.some(cs => cs.includes(sf.toLowerCase())) ||
          (c.skills && c.skills.some(s => s.toLowerCase() === sf.toLowerCase()))
        );
        if (!hasMatchingSkill) return false;
      }

      return true;
    });
  }, [companiesList, searchQuery, companyType, roleFilter, cgpaFilter, skillFilters, userCgpa]);

  // Divide filtered list into My Targets and Others
  const { userTargets, otherCompanies } = useMemo(() => {
    const targets = [];
    const others = [];
    filteredCompanies.forEach(c => {
      const isTarget = targetCompanies.some(tc => tc.toLowerCase() === c.name.toLowerCase());
      if (isTarget) {
        targets.push(c);
      } else {
        others.push(c);
      }
    });
    return { userTargets: targets, otherCompanies: others };
  }, [filteredCompanies, targetCompanies]);

  const selectedCompany = COMPANY_DATA[selectedCompanyId];

  // Toggle skill filter
  const handleToggleSkillFilter = (skillName) => {
    setSkillFilters(prev => 
      prev.includes(skillName) ? prev.filter(s => s !== skillName) : [...prev, skillName]
    );
  };

  // Comparison Handlers
  const handleToggleCompare = (e, companyId) => {
    e.stopPropagation(); // Avoid opening company details
    setCompareList(prev => {
      if (prev.includes(companyId)) {
        return prev.filter(id => id !== companyId);
      }
      if (prev.length >= 2) {
        toast.warning('You can compare a maximum of 2 companies side by side.');
        return prev;
      }
      return [...prev, companyId];
    });
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const renderComparisonModal = () => {
    if (compareList.length < 2) return null;
    const c1 = COMPANY_DATA[compareList[0]];
    const c2 = COMPANY_DATA[compareList[1]];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-150 dark:border-gray-800 shrink-0 bg-surface-50 dark:bg-surface-900/40">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <GitCompare size={20} />
              <h3 className="text-base font-bold font-heading">
                Compare Recruitment Standards
              </h3>
            </div>
            <button
              onClick={() => setShowComparisonModal(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Comparison Table Grid */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4 border-b border-gray-100 dark:border-white/[0.05] pb-4">
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider self-center">Feature</div>
              <div className="text-center font-bold text-sm text-gray-900 dark:text-white flex flex-col items-center gap-1">
                <span className={`p-2 rounded-xl bg-surface-100 dark:bg-white/5 ${c1.logoColor}`}>{c1.name}</span>
                <span className="text-[10px] text-gray-400 font-medium">{c1.fullName}</span>
              </div>
              <div className="text-center font-bold text-sm text-gray-900 dark:text-white flex flex-col items-center gap-1">
                <span className={`p-2 rounded-xl bg-surface-100 dark:bg-white/5 ${c2.logoColor}`}>{c2.name}</span>
                <span className="text-[10px] text-gray-400 font-medium">{c2.fullName}</span>
              </div>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-3 gap-4 py-2 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">Overview</div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed pr-2">{c1.description}</div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed pr-2">{c2.description}</div>
            </div>

            {/* Type */}
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100 dark:border-white/[0.04] pt-4 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">Company Type</div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
                  {c1.type === 'service' ? 'Service-Based' : c1.type === 'product' ? 'Product-Based' : 'Indian Product'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
                  {c2.type === 'service' ? 'Service-Based' : c2.type === 'product' ? 'Product-Based' : 'Indian Product'}
                </span>
              </div>
            </div>

            {/* Typical Package */}
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100 dark:border-white/[0.04] pt-4 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">Typical Package</div>
              <div className="font-bold text-indigo-650 dark:text-indigo-400">{c1.package}</div>
              <div className="font-bold text-indigo-650 dark:text-indigo-400">{c2.package}</div>
            </div>

            {/* Cutoff CGPA */}
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100 dark:border-white/[0.04] pt-4 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">Cutoff CGPA</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {c1.cgpa}+
                {userCgpa > 0 && (
                  <span className={`ml-2 text-[10px] font-bold ${userCgpa >= c1.cgpa ? 'text-success' : 'text-danger'}`}>
                    ({userCgpa >= c1.cgpa ? 'Eligible' : 'Ineligible'})
                  </span>
                )}
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {c2.cgpa}+
                {userCgpa > 0 && (
                  <span className={`ml-2 text-[10px] font-bold ${userCgpa >= c2.cgpa ? 'text-success' : 'text-danger'}`}>
                    ({userCgpa >= c2.cgpa ? 'Eligible' : 'Ineligible'})
                  </span>
                )}
              </div>
            </div>

            {/* Key Skills */}
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100 dark:border-white/[0.04] pt-4 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">Required Core Skills</div>
              <div className="flex flex-wrap gap-1">
                {c1.technicalTopics.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {c2.technicalTopics.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Major Locations */}
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100 dark:border-white/[0.04] pt-4 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">India Locations</div>
              <div className="text-gray-650 dark:text-gray-450">{c1.locations.join(', ')}</div>
              <div className="text-gray-650 dark:text-gray-450">{c2.locations.join(', ')}</div>
            </div>

            {/* Hiring Stages */}
            <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100 dark:border-white/[0.04] pt-4 text-xs">
              <div className="font-bold text-gray-700 dark:text-gray-300">Hiring Process</div>
              <div className="space-y-1">
                {c1.hiringProcess.map((step, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start">
                    <span className="h-4 w-4 shrink-0 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-[9px] flex items-center justify-center">{idx + 1}</span>
                    <span className="text-gray-650 dark:text-gray-400 leading-normal">{step.round.split(':')[1] || step.round}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {c2.hiringProcess.map((step, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start">
                    <span className="h-4 w-4 shrink-0 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-[9px] flex items-center justify-center">{idx + 1}</span>
                    <span className="text-gray-650 dark:text-gray-400 leading-normal">{step.round.split(':')[1] || step.round}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-150 dark:border-gray-800 flex justify-end gap-3 bg-surface-50 dark:bg-surface-900/40">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCompare}
            >
              Clear Comparison
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowComparisonModal(false)}
            >
              Close Overlay
            </Button>
          </div>
        </motion.div>
      </div>
    );
  };

  // Grid builder helper
  const renderCompanyGrid = (list) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c) => {
        const completedCount = c.technicalTopics.concat(c.aptitudeTopics)
          .filter(topic => completedTopics[`${c.id}-${topic}`]).length;
        const totalCount = c.technicalTopics.length + c.aptitudeTopics.length;
        const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        const isUserTarget = targetCompanies.some(tc => tc.toLowerCase() === c.name.toLowerCase());
        const isSelectedForCompare = compareList.includes(c.id);

        return (
          <motion.div
            key={c.id}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <Card
              variant="default"
              className={`p-6 relative overflow-hidden flex flex-col justify-between h-[300px] border border-surface-200 dark:border-white/[0.06] hover:border-indigo-500/40 cursor-pointer bg-white/60 dark:bg-white/[0.01]`}
              onClick={() => setSelectedCompanyId(c.id)}
            >
              {/* Decorative side glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${c.theme.from} opacity-5 rounded-full blur-xl pointer-events-none`} />

              <div>
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl bg-surface-100 dark:bg-white/5 border border-surface-200 dark:border-white/10 ${c.logoColor}`}>
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white font-heading">
                        {c.name}
                      </h3>
                      <span className="text-[9px] text-surface-450 dark:text-surface-500 font-semibold truncate block max-w-[120px]">
                        {c.fullName}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${c.theme.pill}`}>
                      {c.difficulty}
                    </span>
                    {isUserTarget && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-650 text-white font-extrabold uppercase tracking-wide">
                        My Goal
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-surface-500 dark:text-surface-400 mt-4 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-surface-150 dark:border-white/[0.04] text-[10px]">
                  <div>
                    <span className="text-surface-400 dark:text-surface-555 block uppercase font-bold tracking-wide text-[8px]">
                      Package Range
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white mt-0.5 block">
                      {c.package}
                    </span>
                  </div>
                  <div>
                    <span className="text-surface-400 dark:text-surface-555 block uppercase font-bold tracking-wide text-[8px]">
                      Hiring Cutoff
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white mt-0.5 block flex items-center gap-1">
                      <GraduationCap size={11} className="text-indigo-500" />
                      {c.cgpa}+ CGPA
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress & Compare Button Row */}
              <div className="mt-4 pt-3 border-t border-surface-100 dark:border-white/[0.03] flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex justify-between items-center text-[9px] mb-1 text-surface-500 dark:text-surface-400 font-bold">
                    <span>Syllabus</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-650"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => handleToggleCompare(e, c.id)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                    isSelectedForCompare
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-[#1f2937]/50 border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30'
                  }`}
                  title={isSelectedForCompare ? "Remove from comparison" : "Add to comparison side-by-side"}
                >
                  <GitCompare size={13} />
                </button>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <AnimatePresence mode="wait">
        {!selectedCompanyId ? (
          // Grid Overview State
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">
                  Company Preparation Hub
                </h2>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  Access tailored preparation guides, eligibility limits, India locations, hiring timelines, and placement roadmaps for 36 leading tech companies.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Search Bar */}
                <div className="relative w-full sm:w-60">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search companies..."
                    className="w-full bg-white/40 dark:bg-white/[0.04] border border-surface-200 dark:border-white/[0.08] rounded-xl pl-9.5 pr-4 py-1.5 text-xs text-gray-900 dark:text-white placeholder-surface-400 outline-none focus:border-indigo-500/60 transition-colors"
                  />
                </div>

                {/* Filter toggle button */}
                <button
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className={`p-2 rounded-xl border transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    showFiltersPanel || skillFilters.length > 0 || companyType !== 'all' || roleFilter !== 'all' || cgpaFilter !== 'all'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-650 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400'
                      : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Smart Filters Panel */}
            <AnimatePresence>
              {showFiltersPanel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <Card variant="solid" className="p-6 grid gap-6 md:grid-cols-4 rounded-2xl">
                    {/* Filter: Company Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide block">Company Type</label>
                      <select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                        className="w-full bg-white dark:bg-[#1f2937]/60 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white outline-none focus:border-indigo-500/60"
                      >
                        <option value="all">All Types</option>
                        <option value="service">Service-Based</option>
                        <option value="product">Product-Based</option>
                        <option value="indian-product">Indian Product Companies</option>
                      </select>
                    </div>

                    {/* Filter: Role eligibility */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide block">Target Role</label>
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full bg-white dark:bg-[#1f2937]/60 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white outline-none focus:border-indigo-500/60"
                      >
                        <option value="all">All Roles</option>
                        {allUniqueRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    {/* Filter: CGPA Eligibility */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide block">CGPA Cutoff</label>
                      <select
                        value={cgpaFilter}
                        onChange={(e) => setCgpaFilter(e.target.value)}
                        className="w-full bg-white dark:bg-[#1f2937]/60 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white outline-none focus:border-indigo-500/60"
                      >
                        <option value="all">Show All Companies</option>
                        <option value="eligible">Show Eligible Only (≤ {userCgpa || 'Profile CGPA'})</option>
                      </select>
                    </div>

                    {/* Filter: Core Required Skills */}
                    <div className="space-y-2 md:col-span-4 border-t border-gray-150 dark:border-white/[0.05] pt-4">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide block mb-2">Required Technical Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {allUniqueSkills.map(skill => {
                          const isSelected = skillFilters.includes(skill);
                          return (
                            <button
                              key={skill}
                              onClick={() => handleToggleSkillFilter(skill)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600 border-indigo-650 text-white shadow-sm'
                                  : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/10'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Personalized Recommendations Summary alert */}
            {userCgpa > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-5 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-surface-50 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-surface-950 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 shrink-0">
                    <Sparkles size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      Personalized Placement Analytics
                    </h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-medium leading-relaxed">
                      Based on your CGPA of <strong className="text-indigo-650 dark:text-indigo-400">{userCgpa}</strong>, branch <strong className="text-indigo-650 dark:text-indigo-400">{userBranch}</strong>, and skills <strong className="text-indigo-650 dark:text-indigo-400">{userSkills.length > 0 ? userSkills.join(' + ') : 'None added'}</strong>, you are currently eligible for <strong className="text-indigo-650 dark:text-indigo-400">{eligibleCompaniesCount}</strong> companies.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                      We recommend targeting product-based roles matching your technical stack first, followed by key service-based mock targets to test coding assessment speed.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Comparison Floating Bar */}
            {compareList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-gray-900/90 border border-indigo-500/30 shadow-2xl backdrop-blur px-6 py-4 rounded-2xl flex items-center justify-between gap-8 max-w-lg w-[90%]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <GitCompare size={16} />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-gray-900 dark:text-white block">Compare Mocks</span>
                    <span className="text-gray-400 text-[10px] font-semibold">{compareList.length} of 2 companies selected</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearCompare}
                    className="text-[10px] font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-1.5 rounded"
                  >
                    Clear
                  </button>
                  <Button
                    variant={compareList.length === 2 ? "primary" : "secondary"}
                    size="sm"
                    className="text-xs shrink-0"
                    disabled={compareList.length < 2}
                    onClick={() => setShowComparisonModal(true)}
                  >
                    Compare Now
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Main view rows */}
            {userTargets.length === 0 && otherCompanies.length === 0 ? (
              <Card className="p-12 text-center text-surface-555 rounded-3xl border border-gray-150 dark:border-white/[0.04] bg-white/60">
                <QuestionIcon size={24} className="mx-auto mb-3 text-gray-400" />
                No companies match your search and filter criteria. Try expanding your selections.
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Section 1: User's selected target companies */}
                {userTargets.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-150 dark:border-white/[0.05] pb-2">
                      <Target size={16} className="text-indigo-500" />
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        My Target Company Goals ({userTargets.length})
                      </h3>
                    </div>
                    {renderCompanyGrid(userTargets)}
                  </div>
                )}

                {/* Section 2: Other available companies */}
                {otherCompanies.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-150 dark:border-white/[0.05] pb-2">
                      <Briefcase size={16} className="text-surface-450 dark:text-surface-500" />
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        All Available Companies ({otherCompanies.length})
                      </h3>
                    </div>
                    {renderCompanyGrid(otherCompanies)}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          // Deep-Dive Detailed State
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Header section card */}
            <Card variant="default" className={`relative overflow-hidden p-6 md:p-8 border border-surface-200 dark:border-white/[0.06] bg-gradient-to-br ${selectedCompany.theme.gradient}`} hoverable={false}>
              {/* Brand blurred circle */}
              <div className={`absolute top-[-20%] right-[-10%] w-60 h-60 bg-gradient-to-br ${selectedCompany.theme.from} opacity-10 rounded-full blur-3xl pointer-events-none`} />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<ArrowLeft size={14} />}
                    className="text-xs -ml-2 text-surface-500 dark:text-surface-400 hover:text-indigo-500"
                    onClick={handleBackToGrid}
                  >
                    Back to Companies
                  </Button>

                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-surface-200 dark:border-white/10 ${selectedCompany.logoColor} shadow-md`}>
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-heading">
                        {selectedCompany.name} Recruitment Kit
                      </h2>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 max-w-xl leading-relaxed">
                        {selectedCompany.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shorthand specs grid */}
                <div className="grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-4 shrink-0">
                  <div className="bg-white/70 dark:bg-white/[0.03] border border-surface-200 dark:border-white/[0.05] rounded-xl p-3 text-center min-w-[100px] backdrop-blur-xs">
                    <span className="text-[8px] text-surface-400 dark:text-surface-500 uppercase font-bold tracking-wide block mb-1">
                      Avg Package
                    </span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {selectedCompany.package}
                    </span>
                  </div>
                  <div className="bg-white/70 dark:bg-white/[0.03] border border-surface-200 dark:border-white/[0.05] rounded-xl p-3 text-center min-w-[100px] backdrop-blur-xs">
                    <span className="text-[8px] text-surface-400 dark:text-surface-500 uppercase font-bold tracking-wide block mb-1">
                      Difficulty
                    </span>
                    <span className="text-xs font-bold text-indigo-650 dark:text-indigo-400">
                      {selectedCompany.difficulty}
                    </span>
                  </div>
                  <div className="bg-white/70 dark:bg-white/[0.03] border border-surface-200 dark:border-white/[0.05] rounded-xl p-3 text-center min-w-[100px] backdrop-blur-xs">
                    <span className="text-[8px] text-surface-400 dark:text-surface-500 uppercase font-bold tracking-wide block mb-1">
                      Acceptance
                    </span>
                    <span className="text-xs font-bold text-success">
                      {selectedCompany.stats.acceptanceRate}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Content body rows */}
            <div className="grid gap-6 lg:grid-cols-4">
              
              {/* Left Column Navigation Tabs */}
              <div className="lg:col-span-1 space-y-1">
                {[
                  { id: 'eligibility', label: 'Eligibility Criteria', icon: GraduationCap },
                  { id: 'process', label: 'Hiring Process', icon: Target },
                  { id: 'topics', label: 'Prep Syllabus', icon: Terminal },
                  { id: 'questions', label: 'Interview Q&A', icon: HelpCircle },
                  { id: 'tips', label: 'Placement Tips', icon: Lightbulb }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-150 text-left cursor-pointer border ${
                        isActive
                          ? 'bg-indigo-50 border-indigo-200/50 text-indigo-605 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400'
                          : 'bg-white/40 dark:bg-white/[0.01] border-surface-200/50 dark:border-white/[0.04] text-surface-500 dark:text-surface-400 hover:bg-gray-150 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column details viewport */}
              <div className="lg:col-span-3">
                <Card variant="default" className="p-6 h-full min-h-[400px] flex flex-col justify-between" hoverable={false}>
                  <AnimatePresence mode="wait">
                    
                    {/* Tab 1: Eligibility Criteria */}
                    {activeTab === 'eligibility' && (
                      <motion.div
                        key="eligibility"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
                            Eligibility & Overview
                          </h3>
                          <p className="text-[10px] text-surface-450 dark:text-surface-500">
                            Key baseline criteria required to participate in recruitment drives.
                          </p>
                        </div>

                        {/* General details grid */}
                        <div className="grid grid-cols-2 gap-4 bg-white/45 dark:bg-white/[0.02] border border-gray-150 dark:border-white/[0.04] p-4.5 rounded-2xl text-xs">
                          <div>
                            <span className="text-gray-400 dark:text-gray-500 font-bold block uppercase text-[8px] tracking-wider">Industry</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-1 block">{selectedCompany.industry}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 dark:text-gray-500 font-bold block uppercase text-[8px] tracking-wider">Company Size</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-1 block">{selectedCompany.size}</span>
                          </div>
                          <div className="mt-3">
                            <span className="text-gray-400 dark:text-gray-500 font-bold block uppercase text-[8px] tracking-wider">Headquarters</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-1 block">{selectedCompany.headquarters}</span>
                          </div>
                          <div className="mt-3">
                            <span className="text-gray-400 dark:text-gray-500 font-bold block uppercase text-[8px] tracking-wider">Fresher Roles</span>
                            <span className="font-semibold text-gray-850 dark:text-gray-200 mt-1 block">{selectedCompany.roles.join(', ')}</span>
                          </div>
                          <div className="col-span-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/[0.04]">
                            <span className="text-gray-400 dark:text-gray-500 font-bold block uppercase text-[8px] tracking-wider">India Presence</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200 mt-1 block leading-relaxed">{selectedCompany.indiaPresence}</span>
                          </div>
                          <div className="col-span-2 mt-3">
                            <span className="text-gray-400 dark:text-gray-500 font-bold block uppercase text-[8px] tracking-wider">India Office Locations</span>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {selectedCompany.locations.map(loc => (
                                <span key={loc} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 font-medium">
                                  {loc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {[
                            { title: 'Academic CGPA & Scores', value: selectedCompany.eligibility.cgpa, icon: GraduationCap },
                            { title: 'Backlogs Limits', value: selectedCompany.eligibility.backlogs, icon: Info },
                            { title: 'Education Gaps', value: selectedCompany.eligibility.gaps, icon: Calendar },
                            { title: 'Eligible Branches', value: selectedCompany.eligibility.branches, icon: Award }
                          ].map((e, idx) => {
                            const Icon = e.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 border border-surface-200 dark:bg-white/[0.02] dark:border-white/[0.04]"
                              >
                                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5 border border-indigo-500/10">
                                  <Icon size={16} />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                                    {e.title}
                                  </h4>
                                  <p className="text-[11px] leading-relaxed text-surface-500 dark:text-surface-400 font-medium">
                                    {e.value}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* CGPA Disclaimer */}
                        <div className="bg-amber-500/5 border border-amber-500/20 p-3.5 rounded-2xl flex items-start gap-2.5">
                          <Info size={14} className="text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-[10px] text-amber-600 dark:text-amber-450 leading-normal">
                            <strong>Cutoff Disclaimer:</strong> Cutoff requirements may vary by campus, role, and hiring year. These ranges represent historical aggregates.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: Hiring Process Timeline */}
                    {activeTab === 'process' && (
                      <motion.div
                        key="process"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
                            Hiring Stages Roadmap
                          </h3>
                          <p className="text-[10px] text-surface-450 dark:text-surface-500">
                            Sequential evaluation rounds to clear the recruitment process.
                          </p>
                        </div>

                        <div className="space-y-6 relative pl-6">
                          {/* Vertical timeline connector */}
                          <span className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-surface-200 dark:bg-white/[0.06]" />

                          {selectedCompany.hiringProcess.map((step, idx) => (
                            <div key={idx} className="relative flex gap-4 items-start">
                              {/* Icon block */}
                              <div className="h-7 w-7 rounded-full border-2 border-indigo-500 bg-white dark:bg-gray-950 shrink-0 flex items-center justify-center text-[10px] font-black text-indigo-500 z-10">
                                {idx + 1}
                              </div>

                              <div className="flex-1 bg-white/40 dark:bg-white/[0.02] border border-surface-200 dark:border-white/[0.04] p-4 rounded-2xl">
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                                  {step.round}
                                </h4>
                                <p className="text-[11px] leading-relaxed text-surface-500 dark:text-surface-400 mt-1.5 font-sans">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 3: Syllabus and Checklists */}
                    {activeTab === 'topics' && (
                      <motion.div
                        key="topics"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
                            Preparation Syllabus
                          </h3>
                          <p className="text-[10px] text-surface-450 dark:text-surface-500">
                            Tick off completed concepts to track your readiness.
                          </p>
                        </div>

                        {/* Technical Topics Checklist */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                            <Terminal size={14} />
                            Technical Core (Programming & Theory)
                          </h4>
                          <div className="space-y-2">
                            {selectedCompany.technicalTopics.map((topic, index) => {
                              const key = `${selectedCompany.id}-${topic}`;
                              const isDone = !!completedTopics[key];
                              return (
                                <div
                                  key={index}
                                  onClick={() => handleToggleTopic(selectedCompany.id, topic)}
                                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                                    isDone
                                      ? 'bg-success/5 border-success/15 text-surface-450 dark:text-surface-500 line-through'
                                      : 'bg-white/40 border-surface-200/50 dark:bg-white/[0.02] dark:border-white/[0.04] text-gray-900 dark:text-white hover:border-surface-300 dark:hover:border-white/10'
                                  }`}
                                >
                                  <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                                    isDone ? 'bg-success border-success text-white' : 'border-surface-300 dark:border-white/20'
                                  }`}>
                                    {isDone && <Check size={12} strokeWidth={3.5} />}
                                  </div>
                                  <span className="text-[11px] leading-normal font-medium">{topic}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Aptitude Topics Checklist */}
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                            <TrendingUp size={14} />
                            Aptitude & Reasoning
                          </h4>
                          <div className="space-y-2">
                            {selectedCompany.aptitudeTopics.map((topic, index) => {
                              const key = `${selectedCompany.id}-${topic}`;
                              const isDone = !!completedTopics[key];
                              return (
                                <div
                                  key={index}
                                  onClick={() => handleToggleTopic(selectedCompany.id, topic)}
                                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                                    isDone
                                      ? 'bg-success/5 border-success/15 text-surface-450 dark:text-surface-500 line-through'
                                      : 'bg-white/40 border-surface-200/50 dark:bg-white/[0.02] dark:border-white/[0.04] text-gray-900 dark:text-white hover:border-surface-300 dark:hover:border-white/10'
                                  }`}
                                >
                                  <div className={`h-4.5 w-4.5 rounded flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                                    isDone ? 'bg-success border-success text-white' : 'border-surface-300 dark:border-white/20'
                                  }`}>
                                    {isDone && <Check size={12} strokeWidth={3.5} />}
                                  </div>
                                  <span className="text-[11px] leading-normal font-medium">{topic}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 4: Interview Questions (Accordions) */}
                    {activeTab === 'questions' && (
                      <motion.div
                        key="questions"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
                            Frequently Asked Questions
                          </h3>
                          <p className="text-[10px] text-surface-450 dark:text-surface-500">
                            Sample interview questions from verified student reviews. Click to view recommended answers.
                          </p>
                        </div>

                        <div className="divide-y divide-surface-200 dark:divide-white/[0.06]">
                          {selectedCompany.questions.map((q, idx) => {
                            const isExpanded = expandedQuestionIdx === idx;
                            return (
                              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                                <button
                                  type="button"
                                  onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                                  className="w-full flex items-center justify-between text-left font-bold text-xs text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors focus:outline-none cursor-pointer"
                                >
                                  <span>Q{idx + 1}. {q.q}</span>
                                  <motion.span
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-surface-400 dark:text-surface-500 shrink-0 ml-4"
                                  >
                                    <ChevronDown size={14} />
                                  </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-3 p-4 rounded-xl bg-surface-100/50 dark:bg-white/5 border border-surface-200 dark:border-white/10 text-[11px] leading-relaxed text-surface-500 dark:text-surface-400 font-medium pl-4 border-l-2 border-l-indigo-500">
                                        {q.a}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 5: Strategic Placement Tips */}
                    {activeTab === 'tips' && (
                      <motion.div
                        key="tips"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
                            Placement Strategy & Tips
                          </h3>
                          <p className="text-[10px] text-surface-450 dark:text-surface-500">
                            Expert recommendations to secure placement at {selectedCompany.name}.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {selectedCompany.tips.map((tip, idx) => (
                            <div
                              key={idx}
                              className="flex gap-4 p-4 rounded-2xl bg-white/40 border border-surface-200 dark:bg-white/[0.02] dark:border-white/[0.04] border-l-4 border-l-warning"
                            >
                              <div className="p-2 rounded-xl bg-warning/10 text-warning shrink-0 mt-0.5">
                                <Lightbulb size={16} />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                                  Senior Recommendation #{idx + 1}
                                </h4>
                                <p className="text-[11px] leading-relaxed text-surface-500 dark:text-surface-400 font-sans">
                                  {tip}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Guide Footer */}
                  <div className="mt-8 pt-4 border-t border-surface-150 dark:border-white/[0.05] flex items-center justify-between text-[10px] text-surface-400 dark:text-surface-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      Guide updated 1 week ago
                    </span>
                    <span className="flex items-center gap-1 text-indigo-500 font-bold hover:underline cursor-pointer">
                      Official Career Page
                      <ExternalLink size={10} />
                    </span>
                  </div>
                </Card>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render comparison modal overlay */}
      {renderComparisonModal()}
    </div>
  );
}
