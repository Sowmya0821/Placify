import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { 
  User, 
  Mail, 
  GraduationCap, 
  School, 
  Award, 
  Edit2, 
  Check, 
  Camera, 
  Info, 
  ShieldCheck,
  AlertCircle,
  Plus,
  Upload,
  Building,
  Target,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Card, Button, Input, useToast } from '@/components/ui';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
];

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

export default function Profile() {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); // personal, career, skills
  const [customSkill, setCustomSkill] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Initial State from Context
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    branch: user?.branch || 'Computer Science & Engineering',
    collegeName: user?.collegeName || '',
    cgpa: user?.cgpa || '',
    avatar: user?.avatar || PRESET_AVATARS[0],
    dreamRole: user?.dreamRole || 'Software Engineer',
    experienceLevel: user?.experienceLevel || 'Intermediate',
    targetCompanies: user?.targetCompanies || [],
    skills: user?.skills || [],
    resumeFile: user?.resumeFile || null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    if (!isEditing) return;
    setFormData(prev => ({ ...prev, dreamRole: role }));
  };

  const handleCompanyToggle = (company) => {
    if (!isEditing) return;
    setFormData(prev => {
      const active = prev.targetCompanies.includes(company);
      const targetCompanies = active 
        ? prev.targetCompanies.filter(c => c !== company)
        : [...prev.targetCompanies, company];
      return { ...prev, targetCompanies };
    });
  };

  const handleSkillToggle = (skill) => {
    if (!isEditing) return;
    setFormData(prev => {
      const active = prev.skills.includes(skill);
      const skills = active 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!isEditing) return;
    const clean = customSkill.trim();
    if (!clean) return;
    if (formData.skills.includes(clean)) {
      toast.error('Skill already selected.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, clean]
    }));
    setCustomSkill('');
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF document.');
        return;
      }
      setIsUploading(true);
      setTimeout(() => {
        setFormData(prev => ({ ...prev, resumeFile: file.name }));
        setIsUploading(false);
        toast.success(`Parsed ${file.name} successfully! Click Save to apply.`);
      }, 1500);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }
    if (!formData.collegeName.trim()) {
      toast.error('College name cannot be empty.');
      return;
    }
    const cgpaVal = parseFloat(formData.cgpa);
    if (isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 10) {
      toast.error('CGPA must be a number between 0.0 and 10.0.');
      return;
    }
    if (formData.skills.length === 0) {
      toast.error('Please select or add at least one skill.');
      return;
    }
    if (formData.targetCompanies.length === 0) {
      toast.error('Please select at least one target company.');
      return;
    }

    // Dynamic calculations for readiness score
    const skillCount = formData.skills.length;
    const cgpaScore = (cgpaVal / 10) * 35; // max 35
    const skillScore = Math.min((skillCount / 8) * 35, 35); // max 35
    const expWeight = formData.experienceLevel === 'Beginner' ? 10 : formData.experienceLevel === 'Intermediate' ? 20 : 30; // max 30
    const resumeBonus = formData.resumeFile ? 10 : 0;
    const finalReadiness = Math.min(Math.round(cgpaScore + skillScore + expWeight + resumeBonus), 100);

    const nextUser = {
      ...formData,
      readinessScore: finalReadiness
    };

    updateUser(nextUser);
    toast.success('Profile and placement benchmarks synced successfully!');
    setIsEditing(false);
  };

  const selectAvatar = (url) => {
    setFormData(prev => ({ ...prev, avatar: url }));
    if (!isEditing) {
      updateUser({ ...formData, avatar: url });
      toast.success('Avatar updated!');
    }
    setShowAvatarPicker(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary font-heading">
            Student Profile Management
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Maintain your official academic records, contact info, dream role, and verified skills.
          </p>
        </div>
        <Button
          variant={isEditing ? 'danger' : 'primary'}
          size="sm"
          onClick={() => {
            if (isEditing) {
              // Reset to current context
              setFormData({
                name: user?.name || '',
                email: user?.email || '',
                branch: user?.branch || 'Computer Science & Engineering',
                collegeName: user?.collegeName || '',
                cgpa: user?.cgpa || '',
                avatar: user?.avatar || PRESET_AVATARS[0],
                dreamRole: user?.dreamRole || 'Software Engineer',
                experienceLevel: user?.experienceLevel || 'Intermediate',
                targetCompanies: user?.targetCompanies || [],
                skills: user?.skills || [],
                resumeFile: user?.resumeFile || null
              });
            }
            setIsEditing(!isEditing);
          }}
          leftIcon={isEditing ? undefined : Edit2}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Summary Widget */}
        <div className="md:col-span-1 space-y-6">
          <Card variant="default" className="p-6 flex flex-col items-center text-center relative overflow-hidden" hoverable={false}>
            {/* Top decorative gradient */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

            {/* Avatar Photo */}
            <div className="relative mt-8">
              <div className="h-28 w-28 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden shadow-lg bg-surface-100 flex items-center justify-center">
                {formData.avatar ? (
                  <img src={formData.avatar} alt={formData.name} className="h-full w-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(true)}
                className="absolute bottom-1 right-1 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-md border-2 border-white dark:border-gray-900 cursor-pointer transition-colors"
                title="Change Photo"
              >
                <Camera size={12} />
              </button>
            </div>

            <h3 className="text-base font-bold text-text-primary mt-4 font-heading">
              {formData.name || 'Set Name'}
            </h3>
            <span className="text-[10px] text-text-muted font-bold tracking-wide uppercase mt-1">
              {formData.branch}
            </span>

            <div className="mt-6 pt-4 border-t border-gray-150 dark:border-white/[0.05] w-full text-left space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Readiness Score</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {user?.readinessScore || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Dream Role</span>
                <span className="font-semibold text-text-primary">{formData.dreamRole}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Exp Level</span>
                <span className="font-semibold text-text-primary">{formData.experienceLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">CGPA</span>
                <span className="font-bold text-success flex items-center gap-0.5">
                  {formData.cgpa || '0.0'} / 10
                  <ShieldCheck size={13} className="text-success" />
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Dynamic Form Fields and Tabs */}
        <div className="md:col-span-2 space-y-6">
          {/* Tab Selection */}
          <div className="flex border-b border-gray-200 dark:border-white/[0.08] gap-1">
            {[
              { id: 'personal', label: 'Academic & Personal', icon: User },
              { id: 'career', label: 'Placement Goals', icon: Target },
              { id: 'skills', label: 'Skills & Resume', icon: BookOpen }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isActive 
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                      : 'border-transparent text-text-muted hover:text-text-secondary'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <Card variant="default" className="p-6" hoverable={false}>
              <AnimatePresence mode="wait">
                
                {/* TAB 1: PERSONAL & ACADEMIC */}
                {activeTab === 'personal' && (
                  <motion.div
                    key="personal-tab"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-2">
                      Academic Details
                    </h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Sowmya Reddy"
                        leftIcon={User}
                        required
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        disabled={true} // Email is locked to prevent sync breaks
                        placeholder="sowmya@university.edu"
                        leftIcon={Mail}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="College / University"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="National Institute of Technology"
                        leftIcon={School}
                        required
                      />
                      
                      <Input
                        label="Current CGPA"
                        name="cgpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={formData.cgpa}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="9.25"
                        leftIcon={Award}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        Academic Department / Branch
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.03] border text-text-primary text-xs py-2.5 outline-none transition-all pl-4 pr-10 border-gray-200 dark:border-white/[0.08] disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
                      >
                        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                        <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: PLACEMENT GOALS */}
                {activeTab === 'career' && (
                  <motion.div
                    key="career-tab"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Dream Role selection */}
                    <div>
                      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">
                        Target Dream Role
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {ROLES.map(role => {
                          const isSelected = formData.dreamRole === role;
                          return (
                            <button
                              key={role}
                              type="button"
                              disabled={!isEditing}
                              onClick={() => handleRoleSelect(role)}
                              className={`px-3 py-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                                isSelected 
                                  ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                  : 'bg-slate-50 dark:bg-white/[0.01] border-gray-200 dark:border-white/[0.08] text-text-secondary hover:border-gray-300 disabled:opacity-60'
                              }`}
                            >
                              {role}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Experience Level selection */}
                    <div>
                      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">
                        Experience Level
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(lvl => {
                          const isSelected = formData.experienceLevel === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              disabled={!isEditing}
                              onClick={() => {
                                if (isEditing) setFormData(prev => ({ ...prev, experienceLevel: lvl }));
                              }}
                              className={`px-3 py-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                                isSelected 
                                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                                  : 'bg-slate-50 dark:bg-white/[0.01] border-gray-200 dark:border-white/[0.08] text-text-secondary hover:border-gray-300 disabled:opacity-60'
                              }`}
                            >
                              {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Target Companies checklist */}
                    <div>
                      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">
                        Target Companies (Select Multiple)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {COMPANIES.map(company => {
                          const isSelected = formData.targetCompanies.includes(company);
                          return (
                            <button
                              key={company}
                              type="button"
                              disabled={!isEditing}
                              onClick={() => handleCompanyToggle(company)}
                              className={`px-3 py-2 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                                isSelected 
                                  ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                  : 'bg-slate-50 dark:bg-white/[0.01] border-gray-200 dark:border-white/[0.08] text-text-muted hover:border-gray-300 disabled:opacity-60'
                              }`}
                            >
                              <Building size={12} />
                              {company}
                              {isSelected && <Check size={10} className="text-indigo-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: SKILLS AND RESUME */}
                {activeTab === 'skills' && (
                  <motion.div
                    key="skills-tab"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Skills suggestion list */}
                    <div>
                      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">
                        Suggested Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                        {SUGGESTED_SKILLS.map(skill => {
                          const isSelected = formData.skills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              disabled={!isEditing}
                              onClick={() => handleSkillToggle(skill)}
                              className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all ${
                                isSelected 
                                  ? 'bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                                  : 'bg-slate-50 dark:bg-white/[0.01] border-gray-200 dark:border-white/[0.08] text-text-secondary hover:border-gray-300 disabled:opacity-60'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom skill insert */}
                    {isEditing && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          placeholder="Add custom skill..."
                          className="flex-1 bg-slate-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-text-primary outline-none focus:border-indigo-500"
                        />
                        <Button 
                          type="button"
                          variant="secondary"
                          size="sm"
                          leftIcon={Plus}
                          onClick={handleAddCustomSkill}
                        >
                          Add
                        </Button>
                      </div>
                    )}

                    {/* Selected Skills summary */}
                    <div>
                      <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wide block mb-2">
                        Current Skills ({formData.skills.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.skills.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold flex items-center gap-1">
                            {s}
                            {isEditing && (
                              <button 
                                type="button" 
                                onClick={() => handleSkillToggle(s)}
                                className="hover:text-red-500 font-bold ml-1"
                              >
                                ✕
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resume Upload Box */}
                    <div>
                      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-2.5">
                        Resume File
                      </h3>
                      <div className="relative border-2 border-dashed border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 text-center hover:border-indigo-500 transition-colors">
                        <input 
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeUpload}
                          disabled={!isEditing || isUploading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            formData.resumeFile ? 'bg-success/10 text-success' : 'bg-indigo-500/10 text-indigo-500'
                          }`}>
                            {isUploading ? (
                              <div className="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            ) : formData.resumeFile ? (
                              <Check size={18} strokeWidth={2.5} />
                            ) : (
                              <Upload size={16} />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-text-primary truncate max-w-xs mx-auto">
                              {formData.resumeFile || "No Resume File Uploaded"}
                            </p>
                            <p className="text-[10px] text-text-muted mt-0.5">
                              {isEditing 
                                ? "Drag & drop or click to replace (PDF only, Max 5MB)"
                                : "Click 'Edit Profile' to replace/upload new resume"
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Action Buttons */}
              {isEditing && (
                <div className="mt-6 pt-4 border-t border-gray-150 dark:border-white/[0.05] flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        branch: user?.branch || 'Computer Science & Engineering',
                        collegeName: user?.collegeName || '',
                        cgpa: user?.cgpa || '',
                        avatar: user?.avatar || PRESET_AVATARS[0],
                        dreamRole: user?.dreamRole || 'Software Engineer',
                        experienceLevel: user?.experienceLevel || 'Intermediate',
                        targetCompanies: user?.targetCompanies || [],
                        skills: user?.skills || [],
                        resumeFile: user?.resumeFile || null
                      });
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    leftIcon={Check}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </Card>
          </form>
        </div>
      </div>

      {/* Preset Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-950 w-full max-w-sm rounded-3xl border border-gray-200 dark:border-white/[0.08] shadow-2xl p-6 relative overflow-hidden"
            >
              <h3 className="text-sm font-bold text-text-primary font-heading mb-4">
                Select Profile Photo Preset
              </h3>

              <div className="grid grid-cols-3 gap-3 my-4">
                {PRESET_AVATARS.map((url, i) => (
                  <div
                    key={i}
                    onClick={() => selectAvatar(url)}
                    className="h-20 w-20 rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-500 hover:scale-105 transition-all shadow-sm"
                  >
                    <img src={url} alt={`Avatar Preset ${i}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAvatarPicker(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
