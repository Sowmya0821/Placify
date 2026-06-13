import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui';


const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

/**
 * Placify brand logo with SVG icon and gradient AI badge.
 */
function Logo() {
  return (
    <Link
      to="/"
      id="navbar-logo"
      className="group flex items-center gap-2 sm:gap-2.5 no-underline flex-nowrap shrink-0"
      aria-label="Placify — Go to homepage"
    >
      {/* Icon mark */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 transition-shadow duration-300 group-hover:shadow-indigo-500/40">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-hidden="true"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Wordmark */}
      <span className="flex items-center gap-1.5">
        <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
          Placify
        </span>
        <span className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-white shadow-sm">
          AI
        </span>
      </span>
    </Link>
  );
}

/**
 * Individual navigation link with active state indicator.
 */
function NavItem({ label, to }) {
  return (
    <li>
      <NavLink
        to={to}
        id={`nav-link-${label.toLowerCase()}`}
        className={({ isActive }) =>
          [
            'relative px-4 py-1.5 text-sm font-semibold transition-all duration-300 rounded-xl',
            'hover:text-indigo-600 dark:hover:text-indigo-300',
            isActive
              ? 'text-indigo-600 dark:text-indigo-300'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-white/5',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            {label}
            {isActive && (
              <motion.span
                layoutId="navbar-active-indicator"
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </>
        )}
      </NavLink>
    </li>
  );
}

/**
 * Mobile navigation link.
 */
function MobileNavItem({ label, to, onClose, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
    >
      <NavLink
        to={to}
        id={`mobile-nav-link-${label.toLowerCase()}`}
        onClick={onClose}
        className={({ isActive }) =>
          [
            'block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
            'hover:bg-indigo-50 dark:hover:bg-white/5',
            isActive
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300',
          ].join(' ')
        }
      >
        {label}
      </NavLink>
    </motion.li>
  );
}

/**
 * Premium glassmorphism navigation bar.
 *
 * Fixed at the top of the viewport. Adapts between desktop and mobile
 * layouts with an animated slide-down menu for smaller screens.
 */
export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully.');
  };


  /* ── Scroll listener for border reveal ──────────────────────── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Lock body scroll when mobile menu is open ──────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      id="main-navbar"
      role="navigation"
      aria-label="Main navigation"
      className={[
        'fixed inset-x-2 sm:inset-x-4 z-50 max-w-7xl mx-auto rounded-2xl border transition-all duration-300',
        scrolled
          ? 'top-3 bg-white/80 dark:bg-[#151B2D]/80 border-gray-200/60 dark:border-white/[0.08] shadow-lg shadow-gray-200/5 dark:shadow-black/40 backdrop-blur-xl backdrop-saturate-150'
          : 'top-5 bg-white/40 dark:bg-[#0B1020]/40 border-transparent backdrop-blur-md',
      ].join(' ')}
    >
      {/* ── Desktop & mobile bar ──────────────────────────────── */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </ul>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={[
              'relative flex h-9 w-9 items-center justify-center rounded-xl',
              'text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-white/10',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              'cursor-pointer',
            ].join(' ')}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={18} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* CTA — Desktop only */}
          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/dashboard"
                id="navbar-dashboard-cta"
                className={[
                  'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold',
                  'border border-indigo-500/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10',
                  'transition-all duration-300 no-underline',
                ].join(' ')}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                id="navbar-signout"
                className={[
                  'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold',
                  'bg-danger-light/10 text-danger hover:bg-danger/20 transition-all duration-300 cursor-pointer',
                ].join(' ')}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3.5 md:flex">
              <Link
                to="/login"
                id="navbar-login"
                className={[
                  'text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400',
                  'transition-colors no-underline',
                ].join(' ')}
              >
                Sign In
              </Link>
              <Link
                to="/get-started"
                id="navbar-cta"
                className={[
                  'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold',
                  'bg-gradient-to-r from-indigo-600 to-violet-600 text-white',
                  'shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40',
                  'hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 no-underline',
                ].join(' ')}
              >
                Get Started
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          )}


          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={[
              'relative flex h-9 w-9 items-center justify-center rounded-xl md:hidden',
              'text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-white/10',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              'cursor-pointer',
            ].join(' ')}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gray-200/60 dark:border-white/[0.08] md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-3">
              <ul role="list" className="space-y-1">
                {navLinks.map((link, i) => (
                  <MobileNavItem
                    key={link.to}
                    {...link}
                    index={i}
                    onClose={closeMobile}
                  />
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                className="pt-3"
              >
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      id="mobile-navbar-dashboard-cta"
                      onClick={closeMobile}
                      className={[
                        'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold',
                        'border border-indigo-500/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10',
                        'transition-all duration-300 no-underline',
                      ].join(' ')}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobile();
                      }}
                      className={[
                        'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold',
                        'bg-danger-light/10 text-danger hover:bg-danger/20 transition-all duration-300 cursor-pointer',
                      ].join(' ')}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={closeMobile}
                      className={[
                        'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold',
                        'bg-surface-100 hover:bg-surface-200 dark:bg-white/5 border border-surface-200 dark:border-white/10 text-surface-700 dark:text-gray-300 transition-all duration-300 no-underline',
                      ].join(' ')}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/get-started"
                      id="mobile-navbar-cta"
                      onClick={closeMobile}
                      className={[
                        'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold',
                        'bg-gradient-to-r from-indigo-600 to-violet-600 text-white',
                        'shadow-md shadow-indigo-500/25',
                        'transition-all duration-300',
                        'no-underline',
                      ].join(' ')}
                    >
                      Get Started
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
