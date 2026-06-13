import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Check, 
  Plus, 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Award, 
  Sparkles,
  Building,
  Target
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Card, Button, Input, useToast } from '@/components/ui';

const ROLES = [
  'Software Engineer',
  'Data Analyst',
  'Data Scientist',
  'Full Stack Developer',
  'AI Engineer',
  'Cybersecurity Analyst'
];

const COMPANIES = [
  'TCS',
  'Infosys',
  'Accenture',
  'Cognizant',
  'Wipro',
  'Amazon',
  'Microsoft'
];

const SUGGESTED_SKILLS = [
  'Java', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS', 
  'React', 'Node.js', 'Data Structures & Algorithms', 'C++', 
  'Machine Learning', 'System Design', 'Git', 'Linux'
];

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    collegeName: user?.collegeName || '',
    branch: user?.branch || '',
    gradYear: user?.gradYear || '2027',
    cgpa: user?.cgpa || ''
  });

  const [careerGoal, setCareerGoal] = useState({
    dreamRole: '',
    experienceLevel: 'Intermediate',
    targetCompanies: []
  });

  const [skillsInfo, setSkillsInfo] = useState({
    selectedSkills: [],
    customSkill: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handler helpers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setCareerGoal(prev => ({ ...prev, dreamRole: role }));
  };

  const handleCompanyToggle = (company) => {
    setCareerGoal(prev => {
      const active = prev.targetCompanies.includes(company);
      const targetCompanies = active 
        ? prev.targetCompanies.filter(c => c !== company)
        : [...prev.targetCompanies, company];
      return { ...prev, targetCompanies };
    });
  };

  const handleSkillToggle = (skill) => {
    setSkillsInfo(prev => {
      const active = prev.selectedSkills.includes(skill);
      const selectedSkills = active 
        ? prev.selectedSkills.filter(s => s !== skill)
        : [...prev.selectedSkills, skill];
      return { ...prev, selectedSkills };
    });
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const clean = skillsInfo.customSkill.trim();
    if (!clean) return;
    if (skillsInfo.selectedSkills.includes(clean)) {
      toast.error('Skill already selected.');
      return;
    }
    setSkillsInfo(prev => ({
      selectedSkills: [...prev.selectedSkills, clean],
      customSkill: ''
    }));
  };

  const handleResumeDrop = (e) => {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF document.');
        return;
      }
      setIsUploading(true);
      setTimeout(() => {
        setResumeFile(file);
        setIsUploading(false);
        toast.success(`Parsed ${file.name} successfully!`);
      }, 1500);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!personalInfo.name || !personalInfo.collegeName || !personalInfo.branch || !personalInfo.cgpa) {
        toast.error('Please fill in all personal information fields.');
        return;
      }
      const parsed = parseFloat(personalInfo.cgpa);
      if (isNaN(parsed) || parsed < 0 || parsed > 10) {
        toast.error('CGPA must be a number between 0.0 and 10.0.');
        return;
      }
    }
    if (step === 2) {
      if (!careerGoal.dreamRole) {
        toast.error('Please select your target dream role.');
        return;
      }
      if (careerGoal.targetCompanies.length === 0) {
        toast.error('Please select at least one target company.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (skillsInfo.selectedSkills.length === 0) {
      toast.error('Please select or enter at least one skill.');
      return;
    }

    setIsUploading(true);
    try {
      // Dynamic calculations for initial readiness score
      const skillCount = skillsInfo.selectedSkills.length;
      const cgpaScore = (parseFloat(personalInfo.cgpa) / 10) * 35; // max 35
      const skillScore = Math.min((skillCount / 8) * 35, 35); // max 35
      const expWeight = careerGoal.experienceLevel === 'Beginner' ? 10 : careerGoal.experienceLevel === 'Intermediate' ? 20 : 30; // max 30
      const resumeBonus = resumeFile ? 10 : 0;
      const initialReadiness = Math.min(Math.round(cgpaScore + skillScore + expWeight + resumeBonus), 100);

      const onboardedUser = {
        ...personalInfo,
        ...careerGoal,
        skills: skillsInfo.selectedSkills,
        resumeFile: resumeFile ? resumeFile.name : null,
        resumeFileObject: resumeFile || null,
        readinessScore: initialReadiness,
        isOnboarded: true
      };

      await updateUser(onboardedUser);
      toast.success('Onboarding complete! Your personalized Placify dashboard is ready.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Failed to complete profile onboarding.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-12 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl z-10">
        
        {/* Onboarding Progress Indicators */}
        <div className="flex justify-between items-center max-w-md mx-auto mb-8 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-white/[0.08] -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 -z-10" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          {[
            { s: 1, label: 'Profile', icon: User },
            { s: 2, label: 'Career', icon: Target },
            { s: 3, label: 'Skills & Resume', icon: Award }
          ].map(item => (
            <div key={item.s} className="flex flex-col items-center">
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md ${
                  step === item.s 
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-400 text-white scale-110 ring-4 ring-indigo-500/10'
                    : step > item.s 
                      ? 'bg-success border-success text-white'
                      : 'bg-white border-gray-200 dark:bg-[#151B2D] dark:border-white/[0.08] text-gray-500 dark:text-gray-400'
                }`}
              >
                {step > item.s ? <Check size={16} strokeWidth={3} /> : <item.icon size={16} />}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${
                step === item.s ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <Card variant="default" className="p-8 md:p-10 border border-gray-200/50 dark:border-white/[0.08] shadow-2xl relative bg-white dark:bg-[#151B2D]/85 backdrop-blur-xl">
          
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15">
            <Sparkles size={12} className="animate-pulse" />
            AI Placement Assistant Setup
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: PERSONAL INFORMATION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Let's build your profile</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">First, let's verify your background details to align with corporate screening guidelines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input 
                    label="Full Name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalChange}
                    placeholder="Sowmya Reddy"
                    leftIcon={User}
                    required
                  />
                  <Input 
                    label="Email Address"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalChange}
                    placeholder="sowmya@university.edu"
                    required
                    disabled
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input 
                    label="College / Institution Name"
                    name="collegeName"
                    value={personalInfo.collegeName}
                    onChange={handlePersonalChange}
                    placeholder="National Institute of Technology"
                    leftIcon={GraduationCap}
                    required
                  />
                  <Input 
                    label="Academic Branch / Major"
                    name="branch"
                    value={personalInfo.branch}
                    onChange={handlePersonalChange}
                    placeholder="Computer Science and Engineering"
                    leftIcon={BookOpen}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      Target Graduation Year
                    </label>
                    <select
                      name="gradYear"
                      value={personalInfo.gradYear}
                      onChange={handlePersonalChange}
                      className="w-full bg-slate-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                    >
                      {['2025', '2026', '2027', '2028', '2029', '2030'].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <Input 
                    label="Current CGPA"
                    name="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={personalInfo.cgpa}
                    onChange={handlePersonalChange}
                    placeholder="9.25"
                    required
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    rightIcon={ChevronRight}
                    onClick={handleNextStep}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CAREER GOALS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Align your career path</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Select your target dream role and companies to personalize practice metrics.</p>
                </div>

                {/* Dream Role Picker */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                    Target Dream Role
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ROLES.map(role => {
                      const isSelected = careerGoal.dreamRole === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className={`px-4 py-3 rounded-2xl border text-xs font-bold text-center cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 shadow-inner'
                              : 'bg-slate-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/10'
                          }`}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                    Current Experience Level in Role
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
                      const isSelected = careerGoal.experienceLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setCareerGoal(prev => ({ ...prev, experienceLevel: lvl }))}
                          className={`px-4 py-3 rounded-2xl border text-xs font-bold text-center cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                              : 'bg-slate-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:border-gray-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Companies */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                    Select Target Companies (Multiple)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {COMPANIES.map(company => {
                      const isSelected = careerGoal.targetCompanies.includes(company);
                      return (
                        <button
                          key={company}
                          type="button"
                          onClick={() => handleCompanyToggle(company)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                              : 'bg-slate-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-gray-300'
                          }`}
                        >
                          <Building size={14} />
                          {company}
                          {isSelected && <Check size={12} className="text-indigo-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="ghost"
                    leftIcon={ChevronLeft}
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button 
                    rightIcon={ChevronRight}
                    onClick={handleNextStep}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SKILLS AND RESUME */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Map your skills & resume</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Select your existing skills or add custom ones, and optionally upload a PDF resume for AI parsing.</p>
                </div>

                {/* Skill Selection Grid */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                    Select Your Skills
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
                    {SUGGESTED_SKILLS.map(skill => {
                      const isSelected = skillsInfo.selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                              : 'bg-slate-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-gray-300'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add Custom Skill */}
                <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={skillsInfo.customSkill}
                    onChange={(e) => setSkillsInfo(prev => ({ ...prev, customSkill: e.target.value }))}
                    placeholder="Add a custom skill (e.g. Docker, GraphQL, Kubernetes)"
                    className="flex-1 min-w-0 bg-slate-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-indigo-500"
                  />
                  <Button 
                    type="submit"
                    variant="secondary"
                    size="sm"
                    leftIcon={Plus}
                  >
                    Add
                  </Button>
                </form>

                {/* Selected Skills Summary */}
                {skillsInfo.selectedSkills.length > 0 && (
                  <div className="bg-slate-50/50 dark:bg-white/[0.01] border border-gray-150 dark:border-white/[0.04] p-3 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-2">Selected ({skillsInfo.selectedSkills.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsInfo.selectedSkills.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold flex items-center gap-1">
                          {s}
                          <button 
                            type="button" 
                            onClick={() => handleSkillToggle(s)}
                            className="hover:text-red-500 font-bold ml-1"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drag and Drop Resume Box */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2.5">
                    Upload Resume (Optional, PDF only)
                  </label>
                  <div className="relative border-2 border-dashed border-gray-250 dark:border-white/[0.08] rounded-2xl p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-colors">
                    <input 
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeDrop}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center ${
                        resumeFile ? 'bg-success/10 text-success' : 'bg-indigo-500/10 text-indigo-500'
                      }`}>
                        {isUploading ? (
                          <div className="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        ) : resumeFile ? (
                          <Check size={20} strokeWidth={2.5} />
                        ) : (
                          <Upload size={18} />
                        )}
                      </div>

                      {resumeFile ? (
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-md">
                            {resumeFile.name}
                          </p>
                          <p className="text-[10px] text-success font-semibold mt-0.5">
                            Resume uploaded and parsed successfully!
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            PDF format only (Max 5MB). AI will analyze it to suggest skill modifications.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="ghost"
                    leftIcon={ChevronLeft}
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button 
                    rightIcon={Sparkles}
                    onClick={handleSubmit}
                  >
                    Build Dashboard
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </Card>
      </div>
    </div>
  );
}
