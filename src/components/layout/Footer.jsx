import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Send } from 'lucide-react';

const footerLinks = {
  product: {
    heading: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Changelog', to: '/changelog' },
    ],
  },
  resources: {
    heading: 'Resources',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Blog', to: '/blog' },
      { label: 'Community', to: '/community' },
      { label: 'Support', to: '/support' },
    ],
  },
  company: {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

/**
 * A single column of footer links.
 */
function FooterColumn({ heading, links }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        {heading}
      </h3>
      <ul role="list" className="space-y-3">
        {links.map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white no-underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Polished, modern footer with brand section, link columns,
 * newsletter signup, and social icons.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      role="contentinfo"
      className="relative bg-gray-900 text-gray-300 dark:bg-gray-950"
    >
      {/* ── Gradient divider ───────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* ── Main grid ────────────────────────────────────────── */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link
              to="/"
              id="footer-logo"
              className="group mb-5 inline-flex items-center gap-2.5 no-underline"
              aria-label="Placify — Go to homepage"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25">
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
              <span className="flex items-center gap-1.5">
                <span
                  className="text-lg font-bold tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Placify
                </span>
                <span className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-white shadow-sm">
                  AI
                </span>
              </span>
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-400">
              Your AI-powered placement coach. Ace interviews, build killer
              resumes, and land your dream role — all guided by intelligent
              mentorship.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  id={`footer-social-${label.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-xl',
                    'bg-white/5 text-gray-400',
                    'transition-all duration-200',
                    'hover:bg-indigo-500/15 hover:text-indigo-400',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  ].join(' ')}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, column]) => (
            <FooterColumn key={key} {...column} />
          ))}
        </div>

        {/* ── Newsletter ───────────────────────────────────────── */}
        <div className="mt-14 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3
                className="text-base font-semibold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Stay in the loop
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Get the latest updates, tips, and resources delivered to your
                inbox.
              </p>
            </div>

            <form
              id="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md gap-2 sm:w-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className={[
                  'min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5',
                  'px-4 py-2.5 text-sm text-white placeholder-gray-500',
                  'backdrop-blur-sm outline-none transition-all duration-200',
                  'hover:border-white/20 focus:border-indigo-500/60 focus:bg-white/[0.08]',
                  'focus:ring-2 focus:ring-indigo-500/30',
                ].join(' ')}
              />
              <button
                id="newsletter-submit"
                type="submit"
                aria-label="Subscribe to newsletter"
                className={[
                  'inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5',
                  'bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white',
                  'shadow-md shadow-indigo-500/25',
                  'hover:shadow-lg hover:shadow-indigo-500/40',
                  'hover:from-indigo-500 hover:to-violet-500',
                  'transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
                  'cursor-pointer',
                ].join(' ')}
              >
                Subscribe
                <Send size={14} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Placify. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/terms"
              className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-300 no-underline"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-300 no-underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-300 no-underline"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
