import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Lock,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  Sliders,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, Button, Input, useToast } from '@/components/ui';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();

  const [notifications, setNotifications] = useState({
    interviews: true,
    streakReminders: true,
    resumeScans: false,
    emailMarketing: false
  });

  // Toggle notification checkbox handler
  const handleNotifyToggle = (key, label) => {
    setNotifications(prev => {
      const next = !prev[key];
      toast.success(`${label} notifications ${next ? 'enabled' : 'disabled'}.`);
      return { ...prev, [key]: next };
    });
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} Mode!`);
  };

  // Password States
  const [passwords, setPasswords] = useState({
    old: '',
    newPass: '',
    confirm: ''
  });
  const [showPass, setShowPass] = useState({
    old: false,
    newPass: false,
    confirm: false
  });

  // Preference states
  const [preferences, setPreferences] = useState({
    targetGradYear: '2027',
    targetIndustry: 'Software Product Companies',
    primaryLanguage: 'Java'
  });

  // Password submission handler
  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!passwords.old) {
      toast.error('Please enter your current password.');
      return;
    }
    if (passwords.newPass.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      toast.error('New passwords do not match.');
      return;
    }

    // Simulate password updates
    toast.success('Password changed successfully! Keep note of your credentials.');
    setPasswords({ old: '', newPass: '', confirm: '' });
  };

  // Preference save handler
  const handleSavePreferences = (e) => {
    e.preventDefault();
    toast.success('Preferences saved successfully! Placement algorithms updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">
          Account Settings
        </h2>
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
          Adjust theme preferences, update notification configs, and secure account credentials.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* SIDE BAR BUTTON OPTIONS */}
        <div className="md:col-span-1 space-y-4">
          
          {/* Card: Dark Mode switch */}
          <Card variant="default" className="p-5" hoverable={false}>
            <h4 className="text-xs font-bold text-surface-450 dark:text-surface-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Moon size={14} className="text-indigo-500" />
              Theme Configuration
            </h4>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-semibold text-gray-700 dark:text-surface-300">
                {theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
              </span>

              {/* Custom Switch Toggle */}
              <button
                onClick={handleThemeToggle}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer outline-none ${
                  theme === 'dark' ? 'bg-indigo-600' : 'bg-surface-200'
                }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px]"
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  animate={{ x: theme === 'dark' ? 20 : 0 }}
                >
                  {theme === 'dark' ? <Moon size={10} className="text-indigo-600" /> : <Sun size={10} className="text-amber-500" />}
                </motion.div>
              </button>
            </div>
            
            <p className="text-[10px] text-surface-400 dark:text-surface-500 mt-3 leading-normal">
              Toggle to dark theme to reduce eye strain during late-night practice drills.
            </p>
          </Card>

          {/* Card: Quick Notification Preferences Summary */}
          <Card variant="default" className="p-5" hoverable={false}>
            <h4 className="text-xs font-bold text-surface-450 dark:text-surface-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Bell size={14} className="text-indigo-500" />
              Notifications
            </h4>
            
            <div className="space-y-3 mt-4">
              
              {/* Interview Reminders */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-surface-300">
                  Interview Reminders
                </span>
                <button
                  type="button"
                  onClick={() => handleNotifyToggle('interviews', 'Interview Reminders')}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none ${
                    notifications.interviews ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-surface-200 dark:bg-white/10'
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    animate={{ x: notifications.interviews ? 16 : 0 }}
                  />
                </button>
              </div>

              {/* Streak Reminders */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-surface-300">
                  Streak Reminders
                </span>
                <button
                  type="button"
                  onClick={() => handleNotifyToggle('streakReminders', 'Streak Reminders')}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none ${
                    notifications.streakReminders ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-surface-200 dark:bg-white/10'
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    animate={{ x: notifications.streakReminders ? 16 : 0 }}
                  />
                </button>
              </div>

              {/* Weekly Reports */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-surface-300">
                  Weekly Reports
                </span>
                <button
                  type="button"
                  onClick={() => handleNotifyToggle('resumeScans', 'Weekly Reports')}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none ${
                    notifications.resumeScans ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-surface-200 dark:bg-white/10'
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    animate={{ x: notifications.resumeScans ? 16 : 0 }}
                  />
                </button>
              </div>

            </div>
          </Card>
        </div>

        {/* DETAILS INPUT FORMS */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card: Account Preferences */}
          <Card variant="default" className="p-6" hoverable={false}>
            <div className="border-b border-surface-150 dark:border-white/[0.05] pb-4 mb-5">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sliders size={18} className="text-indigo-500" />
                Placement Preferences
              </h3>
              <p className="text-xs text-surface-450 dark:text-surface-500">
                Configure your target parameters to receive optimized roadmaps
              </p>
            </div>

            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                
                {/* Graduation Year */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">
                    Target Graduation Year
                  </label>
                  <div className="relative">
                    <select
                      value={preferences.targetGradYear}
                      onChange={(e) => setPreferences(prev => ({ ...prev, targetGradYear: e.target.value }))}
                      className="w-full rounded-xl bg-surface-100/50 dark:bg-white/5 backdrop-blur-sm border text-surface-900 dark:text-white text-sm leading-6 py-2.5 outline-none transition-all duration-200 focus:bg-white dark:focus:bg-white/[0.08] pl-4 pr-10 border-surface-200 hover:border-surface-300 focus:border-primary dark:border-white/10 dark:hover:border-white/20 dark:focus:border-primary font-semibold appearance-none"
                    >
                      <option value="2026" className="dark:bg-slate-800 dark:text-white">2026</option>
                      <option value="2027" className="dark:bg-slate-800 dark:text-white">2027</option>
                      <option value="2028" className="dark:bg-slate-800 dark:text-white">2028</option>
                      <option value="2029" className="dark:bg-slate-800 dark:text-white">2029</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Primary coding language */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">
                    Primary Coding Language
                  </label>
                  <div className="relative">
                    <select
                      value={preferences.primaryLanguage}
                      onChange={(e) => setPreferences(prev => ({ ...prev, primaryLanguage: e.target.value }))}
                      className="w-full rounded-xl bg-surface-100/50 dark:bg-white/5 backdrop-blur-sm border text-surface-900 dark:text-white text-sm leading-6 py-2.5 outline-none transition-all duration-200 focus:bg-white dark:focus:bg-white/[0.08] pl-4 pr-10 border-surface-200 hover:border-surface-300 focus:border-primary dark:border-white/10 dark:hover:border-white/20 dark:focus:border-primary font-semibold appearance-none"
                    >
                      <option value="Java" className="dark:bg-slate-800 dark:text-white">Java Programming</option>
                      <option value="Python" className="dark:bg-slate-800 dark:text-white">Python Basics</option>
                      <option value="C++" className="dark:bg-slate-800 dark:text-white">C++ Core</option>
                      <option value="JavaScript" className="dark:bg-slate-800 dark:text-white">JavaScript Web</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Target Industry preference */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-surface-600 dark:text-surface-400">
                  Target Company Type
                </label>
                <div className="relative">
                  <select
                    value={preferences.targetIndustry}
                    onChange={(e) => setPreferences(prev => ({ ...prev, targetIndustry: e.target.value }))}
                    className="w-full rounded-xl bg-surface-100/50 dark:bg-white/5 backdrop-blur-sm border text-surface-900 dark:text-white text-sm leading-6 py-2.5 outline-none transition-all duration-200 focus:bg-white dark:focus:bg-white/[0.08] pl-4 pr-10 border-surface-200 hover:border-surface-300 focus:border-primary dark:border-white/10 dark:hover:border-white/20 dark:focus:border-primary font-semibold appearance-none"
                  >
                    <option value="Software Product Companies" className="dark:bg-slate-800 dark:text-white">Software Product Companies (Tier 1/2 e.g. Amazon, Microsoft)</option>
                    <option value="Mass Recruiters" className="dark:bg-slate-800 dark:text-white">Mass Recruiters & Services (Tier 3 e.g. TCS, Wipro, Infosys)</option>
                    <option value="Investment Banking & Fintech" className="dark:bg-slate-800 dark:text-white">Investment Banking & Fintech (e.g. Goldman Sachs, Vanguard)</option>
                    <option value="Early-Stage Startups" className="dark:bg-slate-800 dark:text-white">Early-Stage Tech Startups</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  leftIcon={Check}
                >
                  Save Preferences
                </Button>
              </div>
            </form>
          </Card>

          {/* Card: Password Change Form */}
          <Card variant="default" className="p-6" hoverable={false}>
            <div className="border-b border-surface-150 dark:border-white/[0.05] pb-4 mb-5">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock size={18} className="text-indigo-500" />
                Change Password
              </h3>
              <p className="text-xs text-surface-450 dark:text-surface-500">
                Secure your credentials with regular password checks
              </p>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              
              {/* Current Password */}
              <Input
                label="Current Password"
                type={showPass.old ? 'text' : 'password'}
                value={passwords.old}
                onChange={(e) => setPasswords(prev => ({ ...prev, old: e.target.value }))}
                placeholder="••••••••"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPass(prev => ({ ...prev, old: !prev.old }))}
                    className="pointer-events-auto text-surface-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
                  >
                    {showPass.old ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              {/* New Password & Confirmation */}
              <div className="grid gap-4 sm:grid-cols-2">
                
                {/* New Password */}
                <Input
                  label="New Password"
                  type={showPass.newPass ? 'text' : 'password'}
                  value={passwords.newPass}
                  onChange={(e) => setPasswords(prev => ({ ...prev, newPass: e.target.value }))}
                  placeholder="••••••••"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, newPass: !prev.newPass }))}
                      className="pointer-events-auto text-surface-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
                    >
                      {showPass.newPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />

                {/* Confirm Password */}
                <Input
                  label="Confirm New Password"
                  type={showPass.confirm ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  placeholder="••••••••"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="pointer-events-auto text-surface-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
                    >
                      {showPass.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />

              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  leftIcon={Lock}
                >
                  Update Credentials
                </Button>
              </div>
            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}
