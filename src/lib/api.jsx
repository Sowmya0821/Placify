import axios from 'axios';

// Create a single Axios instance for application-wide request configurations
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach authorization headers dynamically if token is found in storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('placify_token') || sessionStorage.getItem('placify_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: standardize error responses and hook expired token cleanups
api.interceptors.response.use(
  (response) => {
    // Return standard response body
    return response.data;
  },
  (error) => {
    // Clean storage if backend reports token expired or unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('placify_token');
      localStorage.removeItem('placify_user');
      sessionStorage.removeItem('placify_token');
      sessionStorage.removeItem('placify_user');
      
      // Optionally redirect to login page (avoid loop if already on login)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?expired=true';
      }
    }
    
    // Parse message
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    const parsedError = new Error(message);
    parsedError.response = error.response;
    parsedError.code = error.code;
    return Promise.reject(parsedError);
  }
);

// Helpers for mock database in localStorage
const getMockUserEmail = () => {
  const token = localStorage.getItem('placify_token') || sessionStorage.getItem('placify_token');
  if (token && token.startsWith('mock-token-')) {
    return token.replace('mock-token-', '');
  }
  return null;
};

const getMockUser = () => {
  const email = getMockUserEmail();
  if (!email) return null;
  const users = JSON.parse(localStorage.getItem('placify_mock_users') || '[]');
  return users.find(u => u.email === email) || null;
};

const saveMockUser = (userObj) => {
  const users = JSON.parse(localStorage.getItem('placify_mock_users') || '[]');
  const index = users.findIndex(u => u.email === userObj.email);
  if (index !== -1) {
    users[index] = userObj;
  } else {
    users.push(userObj);
  }
  localStorage.setItem('placify_mock_users', JSON.stringify(users));
};

// Mock Implementations for Offline/Mock Mode
const mockRegister = (email, password) => {
  const users = JSON.parse(localStorage.getItem('placify_mock_users') || '[]');
  if (users.find(u => u.email === email)) {
    throw new Error("User already exists");
  }
  const newUser = {
    email,
    password,
    profile: {
      user_id: Date.now(),
      full_name: '',
      phone: '',
      bio: '',
      college_name: '',
      branch: '',
      cgpa: '',
      target_role: '',
      experience_level: 'Beginner',
      github_url: '',
      linkedin_url: '',
      resume_path: null,
      readiness_score: 0
    },
    skills: [],
    roadmap: [],
    resumes: [],
    target_companies: []
  };
  users.push(newUser);
  localStorage.setItem('placify_mock_users', JSON.stringify(users));
  return { success: true, message: "User registered successfully", data: { user: { email } } };
};

const mockLogin = (email, password) => {
  const users = JSON.parse(localStorage.getItem('placify_mock_users') || '[]');
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error("Incorrect email or user does not exist");
  }
  if (user.password !== password) {
    throw new Error("Incorrect password");
  }
  return {
    success: true,
    message: "Login successful",
    data: {
      access_token: 'mock-token-' + email,
      user: { email }
    }
  };
};

const mockForgotPassword = (email) => {
  const users = JSON.parse(localStorage.getItem('placify_mock_users') || '[]');
  const user = users.find(u => u.email === email);
  if (!user) {
    return { success: true, message: "If the email exists, a password reset link has been sent." };
  }
  return { success: true, message: "Password reset email sent. (MOCK: Link sent successfully to user email)" };
};

const mockResetPassword = (email, password) => {
  const users = JSON.parse(localStorage.getItem('placify_mock_users') || '[]');
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error("Incorrect email or user does not exist");
  }
  user.password = password;
  saveMockUser(user);
  return { success: true, message: "Password reset successfully! Please log in with your new password." };
};

const mockGetProfile = () => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  return { success: true, data: user.profile };
};

const mockUpdateProfile = (profileData) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  user.profile = {
    ...user.profile,
    full_name: profileData.full_name !== undefined ? profileData.full_name : user.profile.full_name,
    phone: profileData.phone !== undefined ? profileData.phone : user.profile.phone,
    bio: profileData.bio !== undefined ? profileData.bio : user.profile.bio,
    target_role: profileData.target_role !== undefined ? profileData.target_role : user.profile.target_role,
    experience_level: profileData.experience_level !== undefined ? profileData.experience_level : user.profile.experience_level,
    github_url: profileData.github_url !== undefined ? profileData.github_url : user.profile.github_url,
    linkedin_url: profileData.linkedin_url !== undefined ? profileData.linkedin_url : user.profile.linkedin_url,
    college_name: profileData.college_name !== undefined ? profileData.college_name : user.profile.college_name,
    branch: profileData.branch !== undefined ? profileData.branch : user.profile.branch,
    cgpa: profileData.cgpa !== undefined ? profileData.cgpa : user.profile.cgpa,
  };
  
  // Recalculate readiness score in mock
  let score = 50;
  if (user.profile.full_name && user.profile.target_role) score += 15;
  if (user.skills && user.skills.length >= 3) score += 15;
  if (user.resumes && user.resumes.length > 0) score += 20;
  user.profile.readiness_score = Math.min(100, score);
  
  saveMockUser(user);
  return { success: true, message: "Profile updated successfully", data: user.profile };
};

const mockUploadResume = (file) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  const newResume = {
    id: Date.now(),
    filename: file.name,
    uploaded_at: new Date().toISOString()
  };
  user.resumes.push(newResume);
  user.profile.resume_path = file.name;
  
  let score = 50;
  if (user.profile.full_name && user.profile.target_role) score += 15;
  if (user.skills && user.skills.length >= 3) score += 15;
  if (user.resumes.length > 0) score += 20;
  user.profile.readiness_score = Math.min(100, score);
  
  saveMockUser(user);
  return { success: true, message: "Resume uploaded successfully", data: newResume };
};

const mockGetSkills = () => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  return { success: true, data: user.skills };
};

const mockAddSkill = (skillName, proficiency) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  const newSkill = {
    id: Date.now(),
    skill_name: skillName,
    proficiency: proficiency || 'Beginner'
  };
  user.skills.push(newSkill);
  
  let score = 50;
  if (user.profile.full_name && user.profile.target_role) score += 15;
  if (user.skills.length >= 3) score += 15;
  if (user.resumes && user.resumes.length > 0) score += 20;
  user.profile.readiness_score = Math.min(100, score);
  
  saveMockUser(user);
  return { success: true, message: "Skill added successfully", data: newSkill };
};

const mockUpdateSkill = (id, skillName, proficiency) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  const skill = user.skills.find(s => s.id === id);
  if (skill) {
    skill.skill_name = skillName;
    skill.proficiency = proficiency;
    saveMockUser(user);
  }
  return { success: true, message: "Skill updated successfully", data: skill };
};

const mockDeleteSkill = (id) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  user.skills = user.skills.filter(s => s.id !== id);
  
  let score = 50;
  if (user.profile.full_name && user.profile.target_role) score += 15;
  if (user.skills.length >= 3) score += 15;
  if (user.resumes && user.resumes.length > 0) score += 20;
  user.profile.readiness_score = Math.min(100, score);
  
  saveMockUser(user);
  return { success: true, message: "Skill deleted successfully" };
};

const mockGetRoadmap = () => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  if (user.roadmap.length === 0) {
    const role = user.profile.target_role || 'Software Engineer';
    user.roadmap = [
      { id: 1, title: "Core Foundations & Concepts", description: `Master basic parameters and initial frameworks syntax for ${role}.`, order_index: 1, status: "in_progress" },
      { id: 2, title: "Intermediate Modules & Structures", description: "Design components database mappings and route queries.", order_index: 2, status: "not_started" },
      { id: 3, title: "System Design & Scaling", description: "Cover caching systems, containers setups and deploy files.", order_index: 3, status: "not_started" },
      { id: 4, title: "Mock Interviews & Job Preparation", description: "Practice coding algorithms, format resume and review behavioral STAR answers.", order_index: 4, status: "not_started" }
    ];
    saveMockUser(user);
  }
  return { success: true, data: { items: user.roadmap } };
};

const mockCreateRoadmap = (title, targetRole, description) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  user.roadmap = [
    { id: 1, title: "Core Foundations & Concepts", description: `Master basic parameters and initial frameworks syntax for ${targetRole}.`, order_index: 1, status: "in_progress" },
    { id: 2, title: "Intermediate Modules & Structures", description: "Design components database mappings and route queries.", order_index: 2, status: "not_started" },
    { id: 3, title: "System Design & Scaling", description: "Cover caching systems, containers setups and deploy files.", order_index: 3, status: "not_started" },
    { id: 4, title: "Mock Interviews & Job Preparation", description: "Practice coding algorithms, format resume and review behavioral STAR answers.", order_index: 4, status: "not_started" }
  ];
  saveMockUser(user);
  return { success: true, data: { items: user.roadmap } };
};

const mockUpdateRoadmapItem = (itemId, status) => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  const item = user.roadmap.find(i => i.id === itemId);
  if (item) {
    item.status = status;
    saveMockUser(user);
  }
  return { success: true, data: item };
};

const mockGetDashboard = () => {
  const user = getMockUser();
  if (!user) throw new Error("Unauthorized");
  return {
    success: true,
    data: {
      readiness_score: user.profile.readiness_score || 0,
      skills_count: user.skills.length,
      resumes_count: user.resumes.length,
      roadmap_progress: user.roadmap.length > 0 
        ? Math.round((user.roadmap.filter(i => i.status === 'completed').length / user.roadmap.length) * 100)
        : 0
    }
  };
};

const mockGetInterviewQuestions = (category) => {
  const user = getMockUser();
  const role = user?.profile?.target_role || 'Software Engineer';
  return {
    success: true,
    data: [
      {
        id: 1,
        question_text: `What is a primary scaling pattern you would use in a ${role} architecture?`,
        answer_key: "Look for answers mentioning load balancing, microservices separations, or caching layers.",
        difficulty: "Medium",
        category: category || "Technical",
        role_tag: role
      },
      {
        id: 2,
        question_text: "Describe a complex technical challenge you faced and how you overcame it.",
        answer_key: "Verify STAR method responses, technical debugging steps, and communication qualities.",
        difficulty: "Medium",
        category: category || "Technical",
        role_tag: role
      }
    ]
  };
};

// Standard request helper to transparently route between mock and real API modes
const handleRequest = async (requestFn, mockFn) => {
  const token = localStorage.getItem('placify_token') || sessionStorage.getItem('placify_token');
  const isMock = token && token.startsWith('mock-token-');
  
  if (isMock && mockFn) {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate mock latency
    return mockFn();
  }

  try {
    return await requestFn();
  } catch (error) {
    // Check if network error (e.g. backend down) and route to mock fallback
    const isNetErr = error.message && (
      error.message.includes('Network Error') ||
      error.message.includes('NetworkError') ||
      error.message.includes('ERR_CONNECTION_REFUSED') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('localhost:5000') ||
      !error.response
    );

    if (isNetErr && mockFn) {
      console.warn("Backend is not connected. Executing mock storage fallback.");
      return mockFn();
    }
    throw error;
  }
};

// 1. Authentication Endpoints
export const authAPI = {
  register: (email, password) => handleRequest(() => api.post('/api/auth/register', { email, password }), () => mockRegister(email, password)),
  login: (email, password) => handleRequest(() => api.post('/api/auth/login', { email, password }), () => mockLogin(email, password)),
  forgotPassword: (email) => handleRequest(() => api.post('/api/auth/forgot-password', { email }), () => mockForgotPassword(email)),
  resetPassword: (email, password) => handleRequest(() => api.post('/api/auth/reset-password', { email, password }), () => mockResetPassword(email, password)),
};

// 2. Profile Endpoints
export const profileAPI = {
  get: () => handleRequest(() => api.get('/api/profile'), () => mockGetProfile()),
  update: (profileData) => handleRequest(() => api.put('/api/profile', profileData), () => mockUpdateProfile(profileData)),
};

// 3. Resume Upload Endpoints
export const resumeAPI = {
  upload: (file) => handleRequest(
    () => {
      const formData = new FormData();
      formData.append('resume', file);
      return api.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    () => mockUploadResume(file)
  ),
};

// 4. Skills Endpoints
export const skillsAPI = {
  getAll: () => handleRequest(() => api.get('/api/skills'), () => mockGetSkills()),
  add: (skillName, proficiency) => handleRequest(() => api.post('/api/skills', { skill_name: skillName, proficiency }), () => mockAddSkill(skillName, proficiency)),
  update: (id, skillName, proficiency) => handleRequest(() => api.put(`/api/skills/${id}`, { skill_name: skillName, proficiency }), () => mockUpdateSkill(id, skillName, proficiency)),
  delete: (id) => handleRequest(() => api.delete(`/api/skills/${id}`), () => mockDeleteSkill(id)),
};

// 5. Roadmap Endpoints
export const roadmapAPI = {
  getAll: () => handleRequest(() => api.get('/api/roadmap'), () => mockGetRoadmap()),
  create: (title, targetRole, description) => handleRequest(() => api.post('/api/roadmap', { title, target_role: targetRole, description }), () => mockCreateRoadmap(title, targetRole, description)),
  updateItemStatus: (itemId, status) => handleRequest(() => api.put(`/api/roadmap/item/${itemId}`, { status }), () => mockUpdateRoadmapItem(itemId, status)),
};

// 6. Dashboard Endpoints
export const dashboardAPI = {
  get: () => handleRequest(() => api.get('/api/dashboard'), () => mockGetDashboard()),
};

// 7. Interview Endpoints
export const interviewAPI = {
  getQuestions: (category) => handleRequest(() => api.get('/api/interview/questions', { params: { category } }), () => mockGetInterviewQuestions(category)),
};

export default api;
