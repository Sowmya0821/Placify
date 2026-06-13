import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/layout';
import { Home, Features, Pricing, About, Dashboard, Login, Register, ForgotPassword, Onboarding } from '@/pages';

/**
 * Root application component.
 * Sets up theme context, auth context, client-side routing, and layout.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
          <Routes>
            {/* Public layout routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="features" element={<Features />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="about" element={<About />} />
            </Route>

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Alias /get-started to register for clean UX */}
            <Route path="/get-started" element={<Navigate to="/register" replace />} />

            {/* Protected dashboard route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-analyzer" element={<Dashboard />} />
              <Route path="/skill-gap" element={<Dashboard />} />
              <Route path="/roadmap" element={<Dashboard />} />
              <Route path="/interview" element={<Dashboard />} />
              <Route path="/company-hub" element={<Dashboard />} />
              <Route path="/progress" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
  );
}

