-- Placify Complete Database Schema

CREATE DATABASE IF NOT EXISTS placify_db;
USE placify_db;

-- Drop existing tables to ensure a clean database setup (order is important for foreign keys)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS question_companies;
DROP TABLE IF EXISTS target_companies;
DROP TABLE IF EXISTS progress_tracking;
DROP TABLE IF EXISTS interview_questions;
DROP TABLE IF EXISTS roadmap_items;
DROP TABLE IF EXISTS roadmaps;
DROP TABLE IF EXISTS resumes;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Profiles Table
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    full_name VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    current_role VARCHAR(100) DEFAULT NULL,
    target_role VARCHAR(100) DEFAULT NULL,
    experience_level VARCHAR(50) DEFAULT NULL, -- 'Entry', 'Mid', 'Senior'
    github_url VARCHAR(255) DEFAULT NULL,
    linkedin_url VARCHAR(255) DEFAULT NULL,
    college_name VARCHAR(255) DEFAULT NULL,
    branch VARCHAR(255) DEFAULT NULL,
    cgpa VARCHAR(20) DEFAULT NULL,
    readiness_score INT DEFAULT 0 CHECK (readiness_score BETWEEN 0 AND 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Skills Table
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50) DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_skill (user_id, skill_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Resumes Table
CREATE TABLE resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    parsed_content LONGTEXT DEFAULT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Roadmaps Table
CREATE TABLE roadmaps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    target_role VARCHAR(100) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Roadmap Items Table (Milestones)
CREATE TABLE roadmap_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roadmap_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Interview Questions Table (Master Bank)
CREATE TABLE interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    answer_key TEXT DEFAULT NULL,
    difficulty VARCHAR(50) DEFAULT 'Medium', -- 'Easy', 'Medium', 'Hard'
    category VARCHAR(100) DEFAULT 'Technical', -- 'Technical', 'Behavioral', 'System Design'
    role_tag VARCHAR(100) DEFAULT NULL, -- 'Frontend Developer', 'Backend Developer', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Target Companies Table
CREATE TABLE target_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    application_status VARCHAR(50) DEFAULT 'dream', -- 'dream', 'applied', 'interviewing', 'offered', 'rejected'
    application_date DATE DEFAULT NULL,
    job_title VARCHAR(100) DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Progress Tracking Table (Aggregated tracker for user milestones/questions)
CREATE TABLE progress_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_type VARCHAR(50) NOT NULL, -- 'roadmap_item', 'interview_question'
    item_id INT NOT NULL, -- references roadmap_items.id or interview_questions.id
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_item (user_id, item_type, item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Question Companies Mapping Table (Many-to-Many for Question -> Company tagging)
CREATE TABLE question_companies (
    question_id INT NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (question_id, company_name),
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==================== INDEXES FOR PERFORMANCE OPTIMIZATION ====================

-- Index on Users email (already handled by UNIQUE, but good practice to record)
CREATE INDEX idx_users_email ON users(email);

-- Composite Index on User Skills for fast matching
CREATE INDEX idx_skills_user_name ON skills(user_id, skill_name);

-- Index on Resumes for quick lookup by owner
CREATE INDEX idx_resumes_user ON resumes(user_id);

-- Index on Roadmaps for quick lookup by owner
CREATE INDEX idx_roadmaps_user ON roadmaps(user_id);

-- Index on Roadmap Items for ordering
CREATE INDEX idx_roadmap_items_rm ON roadmap_items(roadmap_id, order_index);

-- Index on Interview Questions for fast filter/search
CREATE INDEX idx_questions_diff_cat ON interview_questions(difficulty, category);

-- Composite Index on Target Companies to track application stages
CREATE INDEX idx_companies_user_status ON target_companies(user_id, application_status);

-- Composite Index on Progress Tracking
CREATE INDEX idx_progress_user_item ON progress_tracking(user_id, item_type, item_id);


-- ==================== REALISTIC SAMPLE DATA SEEDING ====================

-- 1. Seed Users (passwords are 'Password123' hashed using pbkdf2:sha256 as sample)
INSERT INTO users (id, email, password_hash) VALUES 
(1, 'sowmy.sharma@example.com', 'scrypt:32768:8:1$7DkE$f234bf1687d00f7ea89408b0c8efc30f4e3be538435d8868c66e2c05051a804a'),
(2, 'john.doe@example.com', 'scrypt:32768:8:1$7DkE$f234bf1687d00f7ea89408b0c8efc30f4e3be538435d8868c66e2c05051a804a'),
(3, 'alice.smith@example.com', 'scrypt:32768:8:1$7DkE$f234bf1687d00f7ea89408b0c8efc30f4e3be538435d8868c66e2c05051a804a');

-- 2. Seed Profiles
INSERT INTO profiles (user_id, full_name, phone, bio, current_role, target_role, experience_level, github_url, linkedin_url, college_name, branch, cgpa, readiness_score) VALUES 
(1, 'Sowmya Sharma', '+919876543210', 'Aspiring software developer interested in backend systems and distributed platforms.', 'Student', 'Backend Developer', 'Entry', 'https://github.com/sowmyasharma', 'https://linkedin.com/in/sowmyasharma', 'National Institute of Technology', 'Computer Science and Engineering', '9.2', 45),
(2, 'John Doe', '+15550199', 'Frontend engineer with 2 years of experience seeking to upgrade to React Architect.', 'Frontend Engineer', 'Frontend Developer', 'Mid', 'https://github.com/johndoe', 'https://linkedin.com/in/johndoe', 'Demo Institute of Technology', 'Information Technology', '8.5', 60),
(3, 'Alice Smith', '+15550144', 'Data analyst transitioning to machine learning systems.', 'Data Analyst', 'Data Scientist', 'Entry', 'https://github.com/alicesmith', 'https://linkedin.com/in/alicesmith', 'Science University', 'Mathematics', '9.0', 30);

-- 3. Seed Skills
INSERT INTO skills (user_id, skill_name, proficiency) VALUES 
(1, 'Python', 'Intermediate'),
(1, 'SQL', 'Intermediate'),
(1, 'Flask', 'Beginner'),
(2, 'HTML5 & CSS3', 'Advanced'),
(2, 'JavaScript', 'Advanced'),
(2, 'React', 'Intermediate'),
(2, 'Redux', 'Beginner'),
(3, 'Python', 'Advanced'),
(3, 'Pandas', 'Intermediate'),
(3, 'Scikit-Learn', 'Beginner');

-- 4. Seed Resumes
INSERT INTO resumes (user_id, file_name, file_path, parsed_content) VALUES 
(1, 'Sowmya_Resume.pdf', 'uploads/user_1_Sowmya_Resume.pdf', 'Sowmya Sharma Backend Developer. Skills: Python, Flask, MySQL, Git. Education: B.Tech in CSE.'),
(2, 'John_Doe_CV.pdf', 'uploads/user_2_John_Doe_CV.pdf', 'John Doe Frontend Engineer. Experience: 2 years. React, Javascript, Tailwind CSS, HTML5, Agile.');

-- 5. Seed Roadmaps
INSERT INTO roadmaps (id, user_id, title, target_role, description) VALUES 
(1, 1, 'Backend Engineering Path', 'Backend Developer', 'Curriculum to master servers, database designs, APIs, and scalable infrastructure.'),
(2, 2, 'React Developer Milestone', 'Frontend Developer', 'Track covering React core features, styling tools, state systems, and build packages.');

-- 6. Seed Roadmap Items
INSERT INTO roadmap_items (id, roadmap_id, title, description, status, order_index) VALUES 
(1, 1, 'Programming Language Proficiency', 'Master basic structures in Python or Go.', 'completed', 1),
(2, 1, 'Database Schema Design & SQL', 'Learn relational designs, index optimization, and constraints.', 'in_progress', 2),
(3, 1, 'REST API Development', 'Implement controllers, validation structures, and JWT authentication.', 'pending', 3),
(4, 1, 'System Design & Architecture', 'Understand caching layers (Redis), queue patterns, and scaling structures.', 'pending', 4),
(5, 2, 'HTML, CSS & Web Layouts', 'Build responsive mobile-friendly layouts.', 'completed', 1),
(6, 2, 'JavaScript Fundamentals', 'Learn async-await patterns and DOM handling.', 'completed', 2),
(7, 2, 'ReactJS Core Components', 'Create component hierarchies, lifecycle hooks, and context settings.', 'in_progress', 3),
(8, 2, 'State Management Systems', 'Understand Redux Toolkit or Recoil libraries.', 'pending', 4);

-- 7. Seed Interview Questions
INSERT INTO interview_questions (id, question_text, answer_key, difficulty, category, role_tag) VALUES 
(1, 'What is a Foreign Key constraint in MySQL and how does CASCADE work?', 'A foreign key links tables together. ON DELETE CASCADE automatically deletes child records when parent is deleted.', 'Easy', 'Technical', 'Backend Developer'),
(2, 'Explain the difference between optimistic and pessimistic locking.', 'Optimistic locking checks for version conflicts before writing. Pessimistic locking locks rows immediately.', 'Hard', 'Technical', 'Backend Developer'),
(3, 'What are React hooks, and what rules must they follow?', 'Hooks allow functional components to store state. Rule 1: Only call hooks at the top level. Rule 2: Only call hooks from React function components.', 'Medium', 'Technical', 'Frontend Developer'),
(4, 'Tell me about a time you had a conflict with a team member and how you resolved it.', 'Use the STAR methodology. Explain situation, task, actions taken to communicate, and the collaborative result.', 'Medium', 'Behavioral', 'Any');

-- 8. Seed Question-Company mappings (Many-to-Many)
INSERT INTO question_companies (question_id, company_name) VALUES 
(1, 'Amazon'),
(1, 'Oracle'),
(2, 'Google'),
(2, 'Uber'),
(3, 'Meta'),
(3, 'Netflix'),
(4, 'Microsoft'),
(4, 'Apple');

-- 9. Seed Target Companies applications
INSERT INTO target_companies (user_id, company_name, application_status, application_date, job_title, notes) VALUES 
(1, 'Google', 'dream', NULL, 'Associate Backend Engineer', 'High bar on DSA and system design.'),
(1, 'Microsoft', 'applied', '2026-06-01', 'Software Engineer I', 'Referral submitted by senior engineer.'),
(1, 'Amazon', 'interviewing', '2026-06-05', 'Cloud Support Associate', 'Technical screening scheduled next week.'),
(2, 'Meta', 'applied', '2026-06-03', 'Frontend Engineer', 'Applied via job board. Focused on React expert role.');

-- 10. Seed Progress Tracking entries
INSERT INTO progress_tracking (user_id, item_type, item_id, status) VALUES 
(1, 'roadmap_item', 1, 'completed'),
(1, 'roadmap_item', 2, 'in_progress'),
(2, 'roadmap_item', 5, 'completed'),
(2, 'roadmap_item', 6, 'completed'),
(2, 'roadmap_item', 7, 'in_progress');
