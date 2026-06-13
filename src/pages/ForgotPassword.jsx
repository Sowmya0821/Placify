import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Input, Button } from '@/components/ui';

export default function ForgotPassword() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter email, 2: Reset password
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick email format regex check
  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.message || 'Failed to verify email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(email, password);
      if (response.success) {
        setSuccess(response.message || 'Password reset successfully! Please sign in with your new credentials.');
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordVal = password || '';
  const checks = {
    length: passwordVal.length >= 8,
    uppercase: /[A-Z]/.test(passwordVal),
    lowercase: /[a-z]/.test(passwordVal),
    number: /[0-9]/.test(passwordVal),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-12 relative overflow-hidden">
      {/* Decorative blurred circles for glassmorphism layout */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 border border-surface-200/50 dark:border-white/[0.08] shadow-2xl relative">
          
          {/* Logo Mark */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25">
                <svg
                  width="22"
                  height="22"
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
              <span className="text-xl font-bold tracking-tight text-surface-900 dark:text-white font-heading shrink-0">
                Placify
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
              Reset Password
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-450 mt-2">
              {step === 1 
                ? "Enter your email address to initiate the password reset verification." 
                : `Specify a new password for your account: ${email}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-success-light/10 border border-success-light/20 rounded-2xl p-5 text-center mb-6"
              >
                <div className="flex justify-center text-success mb-3">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-base font-bold text-success-dark dark:text-success mb-1">
                  Password Updated
                </h3>
                <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed">
                  {success}
                </p>
                <div className="mt-5">
                  <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
                    Go to Login
                  </Button>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 bg-danger-light/10 border border-danger/20 text-danger-dark dark:text-danger rounded-xl p-3 text-xs"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="name@university.edu"
                    leftIcon={Mail}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={isLoading}
                >
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 bg-danger-light/10 border border-danger/20 text-danger-dark dark:text-danger rounded-xl p-3 text-xs"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div>
                  <Input
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="••••••••"
                    leftIcon={Lock}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="pointer-events-auto cursor-pointer text-surface-400 dark:text-surface-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Input
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="••••••••"
                    leftIcon={Lock}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="pointer-events-auto cursor-pointer text-surface-400 dark:text-surface-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password requirements checklist */}
                <div className="mt-1 space-y-1.5 bg-surface-100/50 dark:bg-white/[0.02] p-3.5 rounded-2xl border border-surface-200/50 dark:border-white/[0.05]">
                  <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">Password Requirements:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <div className={`flex items-center gap-2 text-xs transition-colors ${checks.length ? 'text-success' : 'text-surface-400 dark:text-surface-500'}`}>
                      <span>{checks.length ? '✓' : '○'}</span>
                      <span>Min 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs transition-colors ${checks.uppercase ? 'text-success' : 'text-surface-400 dark:text-surface-500'}`}>
                      <span>{checks.uppercase ? '✓' : '○'}</span>
                      <span>1 uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs transition-colors ${checks.lowercase ? 'text-success' : 'text-surface-400 dark:text-surface-500'}`}>
                      <span>{checks.lowercase ? '✓' : '○'}</span>
                      <span>1 lowercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs transition-colors ${checks.number ? 'text-success' : 'text-surface-400 dark:text-surface-500'}`}>
                      <span>{checks.number ? '✓' : '○'}</span>
                      <span>1 number</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 justify-center"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-[2] justify-center"
                    isLoading={isLoading}
                  >
                    Reset Password
                  </Button>
                </div>
              </form>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-surface-200/50 dark:border-white/[0.05] text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
