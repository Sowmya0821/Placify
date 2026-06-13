import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  RefreshCw,
  Eye,
  Award,
  Check,
  Info,
  FileText,
  Search
} from 'lucide-react';
import { Button, Card, useToast } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { resumeAPI } from '@/lib/api';

// Actionable suggestions sample data

const SUGGESTIONS = [
  {
    id: 1,
    title: 'Quantify impact in the experience section',
    desc: 'Rewrite project points using the XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]". For example: "Reduced API latency by 35% through implementing Redis caching layers in the backend Node.js microservice."'
  },
  {
    id: 2,
    title: 'Integrate target DevOps keywords',
    desc: 'Your resume lacks references to container systems despite applying for Backend roles. Integrate terms like "Docker", "Kubernetes", or "CI/CD Pipeline" to align with automated resume parsers.'
  },
  {
    id: 3,
    title: 'Refine header contact formatting',
    desc: 'Ensure your GitHub and LinkedIn profile links are clickable hyperlinks. Avoid placing phone numbers in header columns that confuse older parser layouts.'
  }
];

// Highlighted resume sections data
const RESUME_SECTIONS = {
  name: 'SOWMYA REDDY',
  contact: 'sowmya.reddy@nit.edu | +91 9876543210 | Bangalore, India',
  github: 'https://github.com/sowmyareddy',
  education: {
    college: 'National Institute of Technology (NIT)',
    degree: 'B.Tech in Computer Science & Engineering',
    timeline: '2022 - 2026',
    cgpa: '9.2 / 10.0'
  },
  experience: {
    role: 'Backend Engineering Intern',
    company: 'TechCorp Solutions',
    timeline: 'Jun 2025 - Aug 2025',
    bullets: [
      { text: 'Developed and optimized data models using ', highlight: 'Java', type: 'present' },
      { text: 'Built script engines using ', highlight: 'Python', type: 'present' },
      { text: 'Structured complex relational table indexes in ', highlight: 'SQL', type: 'present' },
      { text: 'Lacks container references like Docker or Kubernetes', type: 'missing' }
    ]
  },
  projects: {
    title: 'Placify AI Platform',
    bullets: [
      { text: 'Designed responsive interfaces using ', highlight: 'HTML', type: 'present' },
      { text: 'Customized web styles using ', highlight: 'CSS', type: 'present' }
    ]
  }
};

export default function ResumeAnalyzer() {
  const { updateUser } = useAuth();
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);
  const [hoveredKeyword, setHoveredKeyword] = useState(null);
  
  const fileInputRef = useRef(null);
  const toast = useToast();

  // Drag handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Actual API Upload routine
  const processFile = async (selectedFile) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the 5MB limit. Please upload a smaller file.');
      return;
    }

    toast.info(`Uploading ${selectedFile.name}...`);
    setFile(selectedFile);
    setIsAnalyzing(true);
    setProgress(0);

    // Increment progress visual up to 90% while uploading
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 100);

    try {
      const response = await resumeAPI.upload(selectedFile);
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        
        // Update user state context
        updateUser({ 
          resumeFile: selectedFile.name, 
          resumePath: response.data.resume_path 
        });
        
        toast.success('Resume parsed and analyzed successfully! ATS score updated.');
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setFile(null);
      toast.error(err.message || 'Failed to upload resume to server');
    }
  };

  const resetAnalyzer = () => {
    setFile(null);
    setAnalysisComplete(false);
    setProgress(0);
    setExpandedSuggestion(null);
    setHoveredKeyword(null);
    toast.info('Analyzer reset. Ready for a new upload.');
  };

  const triggerBrowse = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          AI Resume Analyzer
        </h2>
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
          Scan your resume against automated recruitment parsers (ATS) to identify weaknesses and keyword gaps.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Upload Drop-zone */}
        {!isAnalyzing && !analysisComplete && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerBrowse}
              className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden group ${
                isDragActive
                  ? 'border-indigo-500 bg-indigo-500/5 shadow-inner scale-[0.99]'
                  : 'border-surface-200 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/30 bg-white/40 dark:bg-white/[0.01]'
              }`}
            >
              {/* Background gradient hint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <UploadCloud size={30} />
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Drag and drop your resume here
              </h3>
              <p className="text-xs text-surface-400 dark:text-surface-500 mt-2 max-w-sm">
                Supports PDF, DOCX, or DOC formats. Maximum file size 5MB.
              </p>
              
              <Button variant="secondary" size="sm" className="mt-6 pointer-events-none">
                Browse Files
              </Button>
            </div>
          </motion.div>
        )}

        {/* State 2: Simulated Scanning */}
        {isAnalyzing && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass border border-surface-200 dark:border-white/[0.04] p-10 rounded-3xl text-center flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden"
          >
            {/* Animated Laser Scanning Bar */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative flex items-center justify-center h-20 w-20 mb-6">
              <span className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping" />
              <div className="relative h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center animate-pulse">
                <FileCheck size={26} />
              </div>
            </div>

            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Parsing with Placify AI
            </h3>
            <p className="text-xs text-surface-450 dark:text-surface-400 mt-1">
              Analyzing text syntax, verifying hierarchies, and scoring formatting...
            </p>

            {/* Progress Bar */}
            <div className="mt-8 w-full max-w-md bg-surface-200 dark:bg-white/[0.08] h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-3">
              {progress}% scanned
            </span>
          </motion.div>
        )}

        {/* State 3: Analysis Results layout */}
        {analysisComplete && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 lg:grid-cols-3 items-start"
          >
            
            {/* LEFT PANE: Simulated Resume Preview */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-1.5">
                  <Eye size={16} className="text-indigo-500" />
                  Parser Preview
                </h3>
                <span className="text-[10px] text-surface-400 dark:text-surface-500">
                  Highlighting keywords
                </span>
              </div>

              <Card variant="default" className="p-6 relative overflow-hidden bg-white dark:bg-surface-900 border border-surface-200 dark:border-white/[0.08] shadow-lg font-sans max-h-[560px] overflow-y-auto" hoverable={false}>
                {/* Paper header style */}
                <div className="text-center border-b border-surface-200 dark:border-white/[0.06] pb-4 mb-4">
                  <h4 className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                    {RESUME_SECTIONS.name}
                  </h4>
                  <p className="text-[9px] text-surface-500 dark:text-surface-400 mt-1 leading-normal">
                    {RESUME_SECTIONS.contact}
                  </p>
                  
                  {/* Dotted Warning wrapper for unlinked profiles */}
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-dashed border-warning/40 bg-warning/5 text-[9px] text-warning-dark dark:text-warning select-none">
                    <AlertTriangle size={10} />
                    <span>Unlinked Link: {RESUME_SECTIONS.github}</span>
                  </div>
                </div>

                {/* Section: Education */}
                <div className="mb-4">
                  <h5 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border-b border-surface-150 dark:border-white/[0.04] pb-0.5 mb-1.5">
                    Education
                  </h5>
                  <div className="flex justify-between items-start text-[9px] text-gray-900 dark:text-white font-semibold">
                    <span>{RESUME_SECTIONS.education.college}</span>
                    <span className="text-indigo-500 dark:text-indigo-400">{RESUME_SECTIONS.education.cgpa}</span>
                  </div>
                  <div className="flex justify-between text-[8px] text-surface-500 dark:text-surface-400 font-medium">
                    <span>{RESUME_SECTIONS.education.degree}</span>
                    <span>{RESUME_SECTIONS.education.timeline}</span>
                  </div>
                </div>

                {/* Section: Experience */}
                <div className="mb-4">
                  <h5 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border-b border-surface-150 dark:border-white/[0.04] pb-0.5 mb-1.5">
                    Experience
                  </h5>
                  <div className="flex justify-between items-start text-[9px] text-gray-900 dark:text-white font-semibold">
                    <span>{RESUME_SECTIONS.experience.role}</span>
                    <span className="text-surface-400 dark:text-surface-500">{RESUME_SECTIONS.experience.timeline}</span>
                  </div>
                  <div className="text-[8px] text-surface-500 dark:text-surface-400 font-bold mb-1">
                    {RESUME_SECTIONS.experience.company}
                  </div>
                  
                  <ul className="space-y-1.5 pl-2 text-[8px] text-surface-600 dark:text-surface-305 list-disc leading-relaxed">
                    {RESUME_SECTIONS.experience.bullets.map((b, idx) => (
                      <li key={idx} className="relative">
                        {b.type === 'present' ? (
                          <span>
                            {b.text}
                            <span className="px-1.5 py-0.5 rounded bg-success/15 border border-success/20 text-success font-bold font-mono text-[7px] inline-block uppercase">
                              {b.highlight}
                            </span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-danger border-b border-dashed border-danger/30 pb-0.5">
                            <AlertTriangle size={8} />
                            Missing keyword optimization here
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section: Projects */}
                <div>
                  <h5 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border-b border-surface-150 dark:border-white/[0.04] pb-0.5 mb-1.5">
                    Academic Projects
                  </h5>
                  <div className="text-[9px] font-bold text-gray-900 dark:text-white">
                    {RESUME_SECTIONS.projects.title}
                  </div>
                  <ul className="space-y-1 pl-2 text-[8px] text-surface-600 dark:text-surface-305 list-disc leading-relaxed mt-1">
                    {RESUME_SECTIONS.projects.bullets.map((b, idx) => (
                      <li key={idx}>
                        {b.text}
                        <span className="px-1.5 py-0.5 rounded bg-success/15 border border-success/20 text-success font-bold font-mono text-[7px] inline-block uppercase">
                          {b.highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>

            {/* RIGHT PANE: Score analysis details */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Score card */}
              <Card variant="default" className="p-6 relative overflow-hidden" hoverable={false}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Circle Score meter */}
                    <div className="relative flex items-center justify-center h-24 w-24">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          className="stroke-surface-100 dark:stroke-white/[0.06]"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="42"
                          className="stroke-indigo-600 dark:stroke-indigo-400 svg-glow-primary"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={263.8}
                          initial={{ strokeDashoffset: 263.8 }}
                          animate={{ strokeDashoffset: 263.8 - (263.8 * 85) / 100 }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-black text-gray-900 dark:text-white">85</span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-surface-400">Score</span>
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {file ? file.name : "Sowmya_Reddy_Resume.pdf"}
                        </h3>
                        <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-success/10 border border-success/20 text-success font-bold">
                          ATS Compliant
                        </span>
                      </div>
                      <p className="text-xs text-surface-555 dark:text-surface-400 mt-1.5 max-w-md">
                        Your format structure has passed primary layout guidelines. Resolve keyword gaps to push the index past 90%.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Button variant="secondary" size="sm" className="bg-surface-100 border border-surface-200 text-surface-650 hover:bg-surface-150 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10" leftIcon={<RefreshCw size={14} />} onClick={resetAnalyzer}>
                      Rescan File
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Strengths & Weaknesses Columns */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Strengths */}
                <Card variant="default" className="p-6 border-l-4 border-l-success" hoverable={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-success/15 border border-success/20 text-success">
                      <CheckCircle2 size={16} />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Resume Strengths
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-1 text-[11px] text-surface-600 dark:text-surface-300">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-success shrink-0 mt-0.5" />
                      <span>**Layout Parser Compatibility**: Standard columns read correctly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-success shrink-0 mt-0.5" />
                      <span>**Quantitative Proof**: Quantified bullets highlight metrics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-success shrink-0 mt-0.5" />
                      <span>**Clean Typo Check**: No common parsing vocabulary errors detected.</span>
                    </li>
                  </ul>
                </Card>

                {/* Weaknesses */}
                <Card variant="default" className="p-6 border-l-4 border-l-danger" hoverable={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-danger/15 border border-danger/20 text-danger">
                      <AlertTriangle size={16} />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Resume Weaknesses
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-1 text-[11px] text-surface-600 dark:text-surface-300">
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-danger shrink-0 mt-0.5" />
                      <span>**DevOps Keywords**: Lacks referencing to Docker or Kubernetes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-danger shrink-0 mt-0.5" />
                      <span>**Hyperlink issues**: Profile headings are texts and not hyperlinks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-danger shrink-0 mt-0.5" />
                      <span>**Objective profile**: Missing a core introductory pitch block.</span>
                    </li>
                  </ul>
                </Card>
              </div>

              {/* NEW: Missing Keywords Tag Panel */}
              <Card variant="default" className="p-6" hoverable={false}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-550 border border-indigo-500/15">
                    <Award size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none">
                      Keywords Analyzer
                    </h3>
                    <span className="text-[10px] text-surface-450 dark:text-surface-500 mt-1.5 block">
                      Target role gaps detected
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Missing Core Section */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-danger mb-2.5 block">
                      Core Missing (Critically low match)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Docker', 'Kubernetes', 'CI/CD Pipeline', 'System Design', 'Aptitude'].map((kw) => (
                        <span key={kw} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-danger/5 border border-danger/20 text-danger">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detected Strengths */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-success mb-2.5 block">
                      Detected Competencies (Strength)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Java', 'Python', 'SQL', 'HTML', 'CSS', 'React'].map((kw) => (
                        <span key={kw} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-success/10 border border-success/25 text-success">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actionable Suggestions */}
              <Card variant="default" className="p-6" hoverable={false}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-550 border border-indigo-500/15">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Improvement Suggestions
                  </h3>
                </div>

                <div className="divide-y divide-surface-200 dark:divide-white/[0.06]">
                  {SUGGESTIONS.map((s) => {
                    const isExpanded = expandedSuggestion === s.id;
                    return (
                      <div key={s.id} className="py-4 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => setExpandedSuggestion(isExpanded ? null : s.id)}
                          className="w-full flex items-center justify-between text-left font-bold text-xs text-surface-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors focus:outline-none cursor-pointer"
                        >
                          <span>{s.id}. {s.title}</span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-surface-400"
                          >
                            <ChevronDown size={14} />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 text-[11px] text-surface-555 dark:text-surface-400 leading-relaxed pl-3 border-l border-indigo-500/30">
                                {s.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Card>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
