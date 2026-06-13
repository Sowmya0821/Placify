import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, profileAPI, resumeAPI, skillsAPI } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to map backend profile data schema to React frontend user states
  const mapProfileToUser = (profile, email) => {
    return {
      id: profile.user_id,
      name: profile.full_name || '',
      email: email || '',
      phone: profile.phone || '',
      bio: profile.bio || '',
      collegeName: profile.college_name || '',
      branch: profile.branch || '',
      cgpa: profile.cgpa || '',
      dreamRole: profile.target_role || '',
      experienceLevel: profile.experience_level || 'Beginner',
      githubUrl: profile.github_url || '',
      linkedinUrl: profile.linkedin_url || '',
      resumePath: profile.resume_path || null,
      resumeFile: profile.resume_path ? profile.resume_path.split(/[/\\]/).pop() : null,
      readinessScore: profile.readiness_score || 0,
      // If full_name and target_role are set, they are onboarded
      isOnboarded: !!(profile.full_name && profile.target_role),
    };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('placify_token') || sessionStorage.getItem('placify_token');
      const savedUser = localStorage.getItem('placify_user') || sessionStorage.getItem('placify_user');
      
      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          // Sync fresh state from backend on page load
          const profileRes = await profileAPI.get();
          if (profileRes.success) {
            const freshUser = mapProfileToUser(profileRes.data, parsedUser.email);
            setUser(freshUser);
            
            const storage = localStorage.getItem('placify_token') ? localStorage : sessionStorage;
            storage.setItem('placify_user', JSON.stringify(freshUser));
          } else {
            logout();
          }
        } catch (err) {
          // If it is a network error (backend down/offline), preserve the local user state instead of logging out!
          const isNetErr = err.message && (
            err.message.includes('Network Error') ||
            err.message.includes('NetworkError') ||
            err.message.includes('ERR_CONNECTION_REFUSED') ||
            err.message.includes('Failed to fetch') ||
            err.message.includes('localhost:5000') ||
            !err.response
          );

          if (isNetErr) {
            console.warn('Backend is offline. Using local session data.');
            setUser(JSON.parse(savedUser));
          } else {
            console.error('Failed to initialize session from backend, resetting', err);
            logout();
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);


  const login = async (email, password, rememberMe) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      const { access_token, user: userData } = response.data;
      const storage = rememberMe ? localStorage : sessionStorage;
      
      // Store token
      storage.setItem('placify_token', access_token);

      // Fetch full profile info for complete user context setup
      const profileRes = await profileAPI.get();
      if (!profileRes.success) {
        throw new Error('Failed to retrieve user profile after login');
      }

      const mappedUser = mapProfileToUser(profileRes.data, userData.email);
      setUser(mappedUser);
      storage.setItem('placify_user', JSON.stringify(mappedUser));

      return { success: true };
    } catch (err) {
      throw new Error(err.message || 'Invalid email or password');
    }
  };

  const register = async (userData) => {
    try {
      // 1. Hit register endpoint
      const regRes = await authAPI.register(userData.email, userData.password);
      if (!regRes.success) {
        throw new Error(regRes.message || 'Registration failed');
      }

      // 2. Perform automatic login to fetch token
      const loginRes = await authAPI.login(userData.email, userData.password);
      if (!loginRes.success) {
        throw new Error('Authentication failed after registration');
      }

      const { access_token, user: rawUser } = loginRes.data;
      
      // Automatically save to sessionStorage on register
      sessionStorage.setItem('placify_token', access_token);

      // 3. Write onboarding details to profile in database
      const profileUpdates = {
        full_name: userData.name,
        college_name: userData.collegeName,
        branch: userData.branch,
        cgpa: userData.cgpa,
      };
      
      await profileAPI.update(profileUpdates);

      // 4. Fetch the full, newly populated profile
      const profileRes = await profileAPI.get();
      if (!profileRes.success) {
        throw new Error('Profile synchronization failed');
      }

      const mappedUser = mapProfileToUser(profileRes.data, rawUser.email);
      setUser(mappedUser);
      sessionStorage.setItem('placify_user', JSON.stringify(mappedUser));

      return { success: true };
    } catch (err) {
      throw new Error(err.message || 'Failed to complete registration');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('placify_token');
    localStorage.removeItem('placify_user');
    sessionStorage.removeItem('placify_token');
    sessionStorage.removeItem('placify_user');
  };

  const updateUser = async (updatedData) => {
    try {
      // Map frontend keys back to database naming expectations
      const backendData = {};
      if (updatedData.name !== undefined) backendData.full_name = updatedData.name;
      if (updatedData.phone !== undefined) backendData.phone = updatedData.phone;
      if (updatedData.bio !== undefined) backendData.bio = updatedData.bio;
      if (updatedData.dreamRole !== undefined) backendData.target_role = updatedData.dreamRole;
      if (updatedData.experienceLevel !== undefined) backendData.experience_level = updatedData.experienceLevel;
      if (updatedData.collegeName !== undefined) backendData.college_name = updatedData.collegeName;
      if (updatedData.branch !== undefined) backendData.branch = updatedData.branch;
      if (updatedData.cgpa !== undefined) backendData.cgpa = updatedData.cgpa;
      if (updatedData.githubUrl !== undefined) backendData.github_url = updatedData.githubUrl;
      if (updatedData.linkedinUrl !== undefined) backendData.linkedin_url = updatedData.linkedinUrl;

      // Submit changes
      const updateRes = await profileAPI.update(backendData);
      if (!updateRes.success) {
        throw new Error(updateRes.message || 'Failed to save changes');
      }

      // Upload resume file if provided
      if (updatedData.resumeFileObject) {
        try {
          await resumeAPI.upload(updatedData.resumeFileObject);
        } catch (uploadErr) {
          console.error('Failed to upload resume during profile update:', uploadErr);
        }
      }

      // Add skills if provided
      if (updatedData.skills && Array.isArray(updatedData.skills)) {
        try {
          const existingSkillsRes = await skillsAPI.getAll();
          const existingNames = new Set(
            existingSkillsRes.success && existingSkillsRes.data
              ? existingSkillsRes.data.map(s => s.skill_name.toLowerCase())
              : []
          );
          
          for (const skill of updatedData.skills) {
            if (!existingNames.has(skill.toLowerCase())) {
              await skillsAPI.add(skill, 'Beginner');
            }
          }
        } catch (skillsErr) {
          console.error('Failed to sync skills during profile update:', skillsErr);
        }
      }

      // Re-fetch profile for fresh calculations
      const profileRes = await profileAPI.get();
      if (profileRes.success) {
        const freshUser = mapProfileToUser(profileRes.data, user.email);
        setUser(freshUser);
        
        const storage = localStorage.getItem('placify_token') ? localStorage : sessionStorage;
        storage.setItem('placify_user', JSON.stringify(freshUser));
      }
    } catch (err) {
      console.error('Failed to update user profile in backend', err);
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword(email);
      if (!response.success) {
        throw new Error(response.message || 'Reset request failed');
      }
      return { success: true, message: response.message };
    } catch (err) {
      throw new Error(err.message || 'Could not trigger reset email');
    }
  };

  const resetPassword = async (email, password) => {
    try {
      const response = await authAPI.resetPassword(email, password);
      if (!response.success) {
        throw new Error(response.message || 'Reset password failed');
      }
      return { success: true, message: response.message };
    } catch (err) {
      throw new Error(err.message || 'Could not reset password');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, resetPassword, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
