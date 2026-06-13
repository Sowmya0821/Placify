export { default as Home } from './Home';
export { default as Dashboard } from './Dashboard';
export { default as Login } from './Login';
export { default as Register } from './Register';
export { default as ForgotPassword } from './ForgotPassword';
export { default as Onboarding } from './Onboarding';

// ── Placeholder pages ────────────────────────────────────────
import Placeholder from './Placeholder';

export const Features = () => (
  <Placeholder
    title="Features"
    description="Discover all the tools and capabilities that will supercharge your placement preparation."
  />
);

export const Pricing = () => (
  <Placeholder
    title="Pricing"
    description="Simple, transparent pricing that scales with your preparation journey."
  />
);

export const About = () => (
  <Placeholder
    title="About"
    description="Learn about our mission to democratize placement preparation with AI."
  />
);
