import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Input, Button } from '@/components/ui';

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.successMessage || '';

  useEffect(() => {
    if (user && !loading) {
      if (user.isOnboarded) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate form fields
  const validateForm = () => {
    if (!email) {
      return 'Email is required';
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }
    if (!password) {
      return 'Password is required';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await login(email, password, rememberMe);
      if (response.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-12 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 border border-surface-200/50 dark:border-white/[0.08] shadow-2xl relative">
          
          {/* Logo Brand Header */}
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

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-450 mt-2">
              Log in to your account to resume your preparation.
            </p>
            <p className="text-xs italic text-indigo-600 dark:text-indigo-400 mt-2.5 font-medium leading-relaxed max-w-xs mx-auto">
              "From Learning to Landing — Your Placement Journey Starts Here."
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 bg-danger-light/10 border border-danger/20 text-danger-dark dark:text-danger rounded-xl p-3 text-xs mb-5"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && !error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 bg-success/10 border border-success/20 text-success rounded-xl p-3 text-xs mb-5"
            >
              <span className="shrink-0 font-semibold text-xs text-success">✓</span>
              <span className="font-semibold">{successMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <Input
                label="Password"
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
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="sr-only"
                />
                <div
                  className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-surface-300 dark:border-white/20 bg-transparent group-hover:border-surface-450 dark:group-hover:border-white/40'
                  }`}
                >
                  {rememberMe && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1.5 4L4 6.5L8.5 1.5" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-medium text-surface-600 dark:text-surface-400 select-none">
                  Remember Me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-surface-200/50 dark:border-white/[0.06]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-50 dark:bg-[#151522] px-3 text-surface-500 dark:text-surface-400 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Google */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 hover:border-surface-300 bg-white/40 dark:border-white/10 dark:hover:border-white/20 dark:bg-white/[0.02] text-xs font-semibold text-surface-700 dark:text-surface-300 transition-all hover:bg-white dark:hover:bg-white/5 cursor-pointer shadow-sm hover:shadow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 hover:border-surface-300 bg-white/40 dark:border-white/10 dark:hover:border-white/20 dark:bg-white/[0.02] text-xs font-semibold text-surface-700 dark:text-surface-300 transition-all hover:bg-white dark:hover:bg-white/5 cursor-pointer shadow-sm hover:shadow"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="shrink-0">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-surface-200/50 dark:border-white/[0.05] text-center text-xs">
            <span className="text-surface-500 dark:text-surface-450">
              New to Placify?{' '}
            </span>
            <Link
              to="/register"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline transition-colors"
            >
              Create an account
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
