import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Theme context for dark / light mode toggling.
 *
 * Supports three resolution strategies (highest → lowest priority):
 *   1. Explicit user choice persisted in localStorage
 *   2. System preference via `prefers-color-scheme`
 *   3. Fallback to 'light'
 */
const ThemeContext = createContext(undefined);

/**
 * Resolve the initial theme value.
 * Reads localStorage first, then falls back to the OS preference.
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Apply or remove the `.dark` class on `<html>` and update
 * the `color-scheme` meta so browser chrome adapts too.
 */
function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }

  root.style.colorScheme = theme;
}

/**
 * ThemeProvider — wrap your app with this to enable theme toggling.
 *
 * @example
 * ```jsx
 * import { ThemeProvider } from './lib/theme';
 *
 * createRoot(document.getElementById('root')).render(
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 * );
 * ```
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Apply .dark / .light on mount and every time `theme` changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for OS-level preference changes (only when user hasn't
  // explicitly chosen a theme via the toggle)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange(e) {
      // Only sync if there's no explicit localStorage override
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    }

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  /** Explicitly set the theme and persist to localStorage. */
  const setTheme = useCallback((value) => {
    const next = typeof value === 'function' ? value(theme) : value;
    localStorage.setItem('theme', next);
    setThemeState(next);
  }, [theme]);

  /** Toggle between light ↔ dark. */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return (
    <ThemeContext value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}

/**
 * useTheme — access the current theme and controls.
 *
 * @returns {{ theme: 'light'|'dark', setTheme: Function, toggleTheme: Function }}
 *
 * @example
 * ```jsx
 * const { theme, toggleTheme } = useTheme();
 * ```
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (ctx === undefined) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }

  return ctx;
}

export { ThemeContext };
