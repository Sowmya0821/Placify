import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Root layout shell that wraps every page.
 * Renders a semantic <main> around the routed page content with Navbar and Footer.
 */
export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-50 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
