# Placify — Your Placement Coach

Placify is a comprehensive placement preparation platform designed to help graduates navigate their hiring processes. It serves as a personalized AI placement coach, offering resume auditing, skill gap analyses, streaks trackers, company guides, and a highly customized **Mock Interview & Assessment Engine** supporting MCQ tests, typed theory prompts, and mixed assessments.

---

## 🚀 Key Features

* **Multi-Mode Mock Interview Studio**:
  * **Theory Interview**: Type written responses to Technical, CS, HR, and Communication prompts. Evaluated using a keyword matching engine with dynamic follow-up questions.
  * **MCQ Assessment**: Timed, single-selection assessments covering Programming Languages, CS Core subjects, and Aptitude tests. Features randomized questions, shuffled options, and varied difficulty levels.
  * **Mixed Mode**: Alternates MCQs with Theory entries to simulate real-world company screening tests.
* **Review Answers Grid**: Interactive workspace drawer to track flagged, unattempted, and completed questions and jump instantly to any card.
* **Resume Analyzer**: Upload resumes, extract key terms, and calculate alignment matches.
* **Skill Gap Analyzer**: Match active competencies with targeted industry profiles.
* **Placement Roadmap**: Dynamically structured modules outlining progress trackers for targeted roles.
* **Progress Tracker & Heatmap**: Streaks trackers, total interview logs, and O(1)-memoized calendar heatmap grids logging daily achievements.
* **Company Prep Hub**: Outlines hiring processes, company-specific FAQs, and launchboards for TCS, Infosys, Accenture, Cognizant, Wipro, Capgemini, Deloitte, Cisco, Amazon, and Microsoft mocks.

---

## 🛠 Tech Stack

* **Frontend**:
  * **Core**: React 19 & React Router v7
  * **Styles**: Tailwind CSS v4 (Vanilla design tokens, CSS variables configuration)
  * **Animations**: Framer Motion (micro-interactions, transitions, page loads)
  * **Icons**: Lucide Icons
  * **Requests**: Axios
* **Backend**:
  * **Server**: Flask (Python)
  * **Database**: SQLite (default local fallback for zero-setup offline run) / MySQL
  * **ORM**: SQLAlchemy

---

## 📦 Directory Structure

```
placify/
├── backend/                  # Python Flask backend
│   ├── routes/               # Modular API endpoint routers
│   ├── database/             # SQLite storage and database layers
│   ├── config.py             # Config secrets loading
│   └── app.py                # Server entry point
├── src/                      # React frontend
│   ├── components/           # UI elements & Dashboard pages
│   ├── pages/                # Authentication & Main routes
│   ├── lib/                  # AuthContext, API, and styling controllers
│   ├── App.jsx               # Navigation router
│   └── main.jsx              # DOM entrypoint
├── public/                   # Static assets
├── vercel.json               # Vercel SPA redirects
├── .gitignore                # Git exclusions
├── .env.example              # Frontend template variables
└── README.md                 # Project documentation
```

---

## 🔧 Installation & Running Locally

### 1. Prerequisites
Ensure you have the following installed:
* Node.js (v18+ recommended)
* Python (v3.9+ recommended)

### 2. Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables. Duplicate `.env.example` as `.env` and configure your settings:
   ```bash
   cp .env.example .env
   ```
5. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will start at `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate back to the root `placify/` directory:
   ```bash
   cd ..
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Configure frontend environment settings. Duplicate the root `.env.example` as `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will start locally at `http://localhost:5173`.

---

## 🔐 Environment Configurations

### Frontend Settings (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

### Backend Settings (`backend/.env`)
```env
FLASK_APP=app.py
FLASK_ENV=development
PORT=5000
JWT_SECRET_KEY=your-jwt-secret-key-goes-here
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/placementor_db
GEMINI_API_KEY=your-gemini-api-key-here
```

---

## ⚡ Deployment Instructions (Vercel)

Placify is configured to run out-of-the-box as a static Single Page Application (SPA) on Vercel.

1. **GitHub Import**: Push your code to a GitHub repository.
2. **Vercel Project Setup**:
   * Connect your GitHub account and select the **Placify** repository.
   * Under **Build & Development Settings**, set the Build Command to `npm run build` and Output Directory to `dist`.
3. **Environment Variables**: Add `VITE_API_URL` to Vercel's environment settings. (If no backend is connected, the app transparently handles request failures and runs in local storage offline mock mode).
4. **Vercel Rewrites**: The repository includes a `vercel.json` routing configuration to ensure all page refreshes redirect to `index.html` seamlessly without returning 404 errors.

---

## 📸 Interface Preview

* **Mode Selection Hub**: Choose between standard theory interviews, multiple-choice tests, or mixed placement simulations.
* **Streaks Heatmap**: Visualise daily performance metrics on the custom tracker calendar.
* **Review Panel Drawer**: Keep track of completed question lists using responsive grid numbers.

---

## 🔮 Future Enhancements

* **WebRTC Voice Mocking**: Record speech inputs, evaluate voice fluency, and score communications.
* **Advanced Code Editor IDE**: Interactive coding assessments checking compiling logic directly.
* **PDF Report Exports**: Download detailed scoring profiles for sharing on LinkedIn or job applications.
