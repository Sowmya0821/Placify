import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  FileSearch,
  BrainCircuit,
  MessageSquareText,
  Building2,
  TrendingUp,
  Compass,
  ArrowRight,
  Play,
  Sparkles,
  Star,
  ChevronDown,
  Check,
  Zap,
  Mic,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { Button, Card } from '@/components/ui';

/* ================================================================
   ANIMATION PRESETS
   ================================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ================================================================
   FLOATING SHAPES
   ================================================================ */
function FloatingShape({ className, size, delay, duration, x, y }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -25, 0],
        x: [0, 15, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: duration || 8,
        delay: delay || 0,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ================================================================
   INTERACTIVE ILLUSTRATION (HERO MOCKUP WIDGETS)
   ================================================================ */
function InteractiveIllustration() {
  const [score, setScore] = useState(65);

  // Trigger score update animation on hover/click
  const handleScoreGlow = () => {
    setScore(88);
    setTimeout(() => setScore(65), 5000);
  };

  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto flex items-center justify-center">
      {/* Glow effect background */}
      <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Widget 1: Resume Scoring Card */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        whileHover={{ scale: 1.04, zIndex: 30 }}
        className="glass absolute top-4 left-4 w-72 p-5 rounded-2xl border border-white/15 dark:border-white/10 shadow-2xl z-20 cursor-pointer"
        onClick={handleScoreGlow}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <FileCheck size={18} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              ATS Reviewer
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
            Active
          </span>
        </div>

        <div className="flex items-center gap-5">
          {/* Progress circle */}
          <div className="relative flex items-center justify-center h-16 w-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-gray-200 dark:stroke-white/[0.08]"
                strokeWidth="5"
                fill="transparent"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-indigo-600 dark:stroke-indigo-400"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={176}
                animate={{ strokeDashoffset: 176 - (176 * score) / 100 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-base font-bold text-gray-900 dark:text-white">
              {score}%
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Resume Strength
            </h4>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              Target: Software Engineer
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t border-gray-100 dark:border-white/[0.08] pt-3 text-[11px]">
          <div className="flex items-center gap-2 text-success">
            <Check size={12} strokeWidth={3} />
            <span>Found 12 quantifiable impact metrics</span>
          </div>
          <div className="flex items-center gap-2 text-warning">
            <AlertCircle size={12} />
            <span>Missing key terms: "System Design", "AWS"</span>
          </div>
        </div>
      </motion.div>

      {/* Widget 2: AI Mock Interview Voice Coach */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
        whileHover={{ scale: 1.04, zIndex: 30 }}
        className="glass absolute bottom-8 right-0 w-80 p-5 rounded-2xl border border-white/15 dark:border-white/10 shadow-2xl z-10"
      >
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
              <Mic size={18} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              AI Mock Coach
            </span>
          </div>
          <div className="flex gap-1 items-center">
            {/* Animated mic pulsing wave */}
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-ping" />
            <span className="text-[10px] text-pink-500 font-bold">REC</span>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-white/[0.03] rounded-xl p-3 border border-gray-100 dark:border-white/[0.05] mb-3">
          <p className="text-[11px] text-gray-500 dark:text-gray-400 italic font-mono leading-relaxed">
            "Tell me about a time you solved a complex technical bottleneck..."
          </p>
        </div>

        {/* Custom Audio Waveform Animation */}
        <div className="flex items-center justify-center gap-1 h-12 mb-4 bg-gray-50/20 dark:bg-white/[0.01] rounded-lg">
          {[8, 20, 32, 14, 40, 24, 36, 12, 28, 16, 22, 6].map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 to-pink-500"
              animate={{
                height: [h, h * 0.4, h * 1.3, h],
              }}
              transition={{
                duration: 1 + (i % 3) * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
              style={{ height: h }}
            />
          ))}
        </div>

        <div className="flex items-start gap-2 bg-indigo-500/5 p-2.5 rounded-xl border border-indigo-500/10">
          <Sparkles size={14} className="text-indigo-500 mt-0.5 shrink-0" />
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 leading-snug">
            <strong>STAR Feedback:</strong> Strong Situation & Task, but add details on how you calculated metrics.
          </p>
        </div>
      </motion.div>

      {/* Widget 3: Skill Match Radar card */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
        whileHover={{ scale: 1.04, zIndex: 30 }}
        className="glass absolute bottom-4 left-0 w-64 p-4 rounded-2xl border border-white/15 dark:border-white/10 shadow-2xl z-0"
      >
        <h4 className="text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-3">
          Skill Coverage
        </h4>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium">Data Structures</span>
              <span className="text-indigo-500 font-bold">92%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium">System Design</span>
              <span className="text-indigo-500 font-bold">78%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.5, delay: 0.9 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium">Communication</span>
              <span className="text-indigo-500 font-bold">85%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   STATISTICS SECTION ROW
   ================================================================ */
const STATS = [
  { value: '95%', label: 'Placement Success Rate', desc: 'Average package increase of 45%' },
  { value: '10K+', label: 'Students Placed', desc: 'From top tier engineering schools' },
  { value: '500+', label: 'Companies Active', desc: 'Global startups & tech giants hiring' },
];

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-20 px-6 bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-950 dark:to-surface-900/50">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass p-8 rounded-3xl text-center border border-white/10 dark:border-white/[0.05] shadow-xl relative overflow-hidden group"
            >
              {/* Glow element */}
              <div className="absolute inset-0 bg-indigo-500/[0.01] group-hover:bg-indigo-500/[0.03] transition-colors duration-300" />
              <div className="relative z-10">
                <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
                  {stat.label}
                </h3>
                <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURES SECTION
   ================================================================ */
const FEATURES = [
  {
    icon: FileSearch,
    title: 'Resume Analyzer',
    desc: 'AI parses your resume to check against target ATS screening systems, formatting conventions, and suggests key terms to add.',
  },
  {
    icon: BrainCircuit,
    title: 'Skill Gap Analysis',
    desc: 'Upload target job descriptions, and our AI maps your profile to diagnose skill deficiencies, curating study schedules.',
  },
  {
    icon: MessageSquareText,
    title: 'AI Interview Preparation',
    desc: 'Engage with custom audio mock interviewers that challenge you with technical or behavioral sessions and provide transcripts.',
  },
  {
    icon: Compass,
    title: 'Placement Roadmap',
    desc: 'Generate interactive timelines structured for specific hiring periods and companies to cover vital prep stages.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    desc: 'Detailed reporting charts on your readiness scores, DSA coverage, and mock ratings that track performance over time.',
  },
  {
    icon: Building2,
    title: 'Company Preparation Hub',
    desc: 'Deep dives into hiring pipelines, past assessments, and interview summaries from over 500 tech companies.',
  },
];

function FeatureCard({ icon: Icon, title, desc, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="glass group relative rounded-3xl p-8 cursor-default border border-white/10 dark:border-white/[0.05] shadow-lg"
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 transition-colors duration-300 group-hover:bg-indigo-500/20">
        <Icon size={24} strokeWidth={1.8} />
      </div>

      <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {desc}
      </p>
    </motion.div>
  );
}

/* ================================================================
   TESTIMONIALS SECTION
   ================================================================ */
const TESTIMONIALS = [
  {
    name: 'Rohan Mehta',
    role: 'Software Engineer',
    company: 'Google',
    avatar: 'RM',
    gradient: 'from-pink-500 to-indigo-500',
    university: 'BITS Pilani',
    quote: 'The AI Mock Interviews were scary realistic. The structured STAR-method breakdowns helped me clean up my answers and express my architectural ideas with confidence.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Software Dev',
    company: 'Microsoft',
    avatar: 'PS',
    gradient: 'from-blue-500 to-teal-500',
    university: 'IIT Delhi',
    quote: 'The Skill Gap Analysis pointed out exactly what I was lacking in System Design. The generated roadmap helped me focus my study plan on high-impact areas.',
    rating: 5,
  },
  {
    name: 'Aditya Sen',
    role: 'Backend Developer',
    company: 'Amazon',
    avatar: 'AS',
    gradient: 'from-amber-500 to-rose-500',
    university: 'NIT Trichy',
    quote: "Placify's Resume Analyzer boosted my screening rate from 10% to 80%. It helped me write clear, action-verb-driven impact metrics that caught recruiters' eyes.",
    rating: 5,
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-7xl h-96 bg-indigo-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-indigo-500">
            Success Stories
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
            Trusted by Students Placed at{' '}
            <span className="gradient-text">Top Companies</span>
          </h2>
          <p className="mt-4 text-base text-surface-500 dark:text-surface-400">
            Read how other students used our AI mentoring features to unlock competitive careers in tech.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass p-8 rounded-3xl border border-white/10 dark:border-white/[0.05] shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-surface-600 dark:text-surface-300">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-white/[0.05]">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${t.gradient} shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                    {t.role} @ <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{t.company}</strong> ({t.university})
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FAQ SECTION (ACCORDION)
   ================================================================ */
const FAQS = [
  {
    q: 'How does the AI Resume Analyzer score my profile?',
    a: 'It scans your resume against thousands of high-scoring resumes and job parameters in our database. It evaluates formatting constraints, action verbs, keyword densities, and quantifiability to generate a tailored ATS score and detailed feedback lists.',
  },
  {
    q: 'Are the AI mock interviews customized for specific companies?',
    a: 'Yes! You can choose from standard job positions (e.g. SDE-1, Cloud Architect) or input specific company names. The AI adapts its tone, questions, and complexity based on that company’s actual historical placement interview formats.',
  },
  {
    q: 'Can I track my progress over multiple semesters?',
    a: 'Absolutely. Your dashboard stores all past assessments, mock interview recordings, and score grids. You can visualize your progress chart over weeks or months to see where your skill indicators have improved.',
  },
  {
    q: 'Is my data secure?',
    a: 'Security is a priority. Your resumes, profiles, and interview transcripts are encrypted, and we never share your personal information with external organizations without your consent.',
  },
];

function FAQItem({ q, a, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200/60 dark:border-white/[0.08] last:border-b-0 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 focus-visible:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base pr-4">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-surface-400 shrink-0"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 pt-1 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-950 dark:to-surface-900/40">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-indigo-500">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            Have Questions? We’ve Got Answers
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass p-6 sm:p-10 rounded-3xl border border-white/10 dark:border-white/[0.05] shadow-xl"
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} {...faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   UNIVERSITY BRAND ROW
   ================================================================ */
const UNIVERSITIES = [
  'IIT Delhi',
  'IIT Bombay',
  'NIT Trichy',
  'BITS Pilani',
  'IIT Madras',
  'NIT Warangal',
  'IIT Kanpur',
  'IIIT Hyderabad',
];

function UniversityLogos() {
  return (
    <section className="relative py-20 px-6 border-y border-gray-200/50 dark:border-white/[0.05] bg-surface-50/50 dark:bg-surface-950/20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-10 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Trusted by students from top institutions
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {UNIVERSITIES.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl border cursor-default select-none transition-colors duration-300
                         bg-white border-gray-200/85 shadow-sm text-slate-800
                         dark:bg-[#1B2338]/90 dark:border-white/[0.08] dark:shadow-md dark:shadow-black/20 dark:text-slate-100 dark:hover:border-indigo-500/40 dark:hover:shadow-indigo-500/10"
            >
              {/* Logo / Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-inner">
                <GraduationCap size={16} strokeWidth={2.2} />
              </div>

              {/* Text */}
              <span className="text-sm font-semibold tracking-wide text-left truncate">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN HOME PAGE VIEW
   ================================================================ */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
          ────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden min-h-[92vh] flex items-center pt-24 pb-16 px-6"
      >
        {/* Mesh background */}
        <div className="bg-mesh absolute inset-0 -z-20" aria-hidden="true" />

        {/* Radial overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.58 0.22 275 / 0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />        {/* Floating background shape blur graphics (Vibrant gradient orbs) */}
        <FloatingShape className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] opacity-35 dark:opacity-20 blur-3xl" size={280} x="5%" y="10%" delay={0} duration={15} />
        <FloatingShape className="bg-gradient-to-br from-[#06B6D4] to-[#22D3EE] opacity-25 dark:opacity-15 blur-2xl" size={320} x="75%" y="15%" delay={3} duration={18} />
        <FloatingShape className="bg-gradient-to-br from-[#EC4899] to-[#A855F7] opacity-20 dark:opacity-10 blur-3xl" size={240} x="40%" y="65%" delay={1.5} duration={12} />

        {/* Floating AI Particles */}
        {[...Array(6)].map((_, i) => (
          <FloatingShape
            key={i}
            className="bg-indigo-400/30 dark:bg-cyan-400/20 blur-[2px] rounded-full"
            size={i % 2 === 0 ? 8 : 12}
            x={`${15 + i * 12}%`}
            y={`${20 + (i % 3) * 20}%`}
            delay={i * 0.8}
            duration={6 + i * 2}
          />
        ))}

        {/* Dots background layer */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl w-full grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Text Column */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="lg:col-span-7 text-left flex flex-col justify-center"
          >
            {/* AI badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 self-start inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 px-4.5 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 backdrop-blur-sm shadow-sm"
            >
              <Sparkles size={13} className="text-primary-500 animate-pulse" />
              Empowering Next-Gen Engineers
            </motion.div>

            {/* Giant Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl text-gray-900 dark:text-white"
            >
              Prepare Smarter. Interview Better.{' '}
              <span className="gradient-text animate-shimmer">
                Get Placed Faster.
              </span>
            </motion.h1>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base leading-relaxed text-indigo-600 dark:text-indigo-400 sm:text-lg max-w-xl italic font-semibold border-l-2 border-indigo-500 pl-4"
            >
              "From Learning to Landing — Your Placement Journey Starts Here."
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-base leading-relaxed text-surface-600 dark:text-surface-400 sm:text-lg max-w-xl"
            >
              Land your dream software or analytics role with Placify, your personal AI placement coach. Tailored resume reviews, real-time mock interviews, and personalized study roadmaps.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button size="lg" rightIcon={ArrowRight} className="cursor-pointer">
                Start Free Trial
              </Button>
              <Button variant="ghost" size="lg" leftIcon={<Play size={16} />} className="cursor-pointer">
                Watch Demo
              </Button>
            </motion.div>

            {/* Micro stats tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400"
            >
              <Zap size={14} className="text-amber-500" />
              <span>Free tier includes 3 resume reviews & 1 mock session.</span>
            </motion.div>
          </motion.div>

          {/* Right Mockup Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <InteractiveIllustration />
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          UNIVERSITY TRUST LOGOS
          ────────────────────────────────────────────────────────── */}
      <UniversityLogos />

      {/* ──────────────────────────────────────────────────────────
          STATISTICS SECTION
          ────────────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ──────────────────────────────────────────────────────────
          FEATURES SECTION
          ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-indigo-500">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
              Everything You Need to{' '}
              <span className="gradient-text">Excel in Placement Season</span>
            </h2>
            <p className="mt-4 text-base text-surface-500 dark:text-surface-400">
              Stop guessing. Use precise algorithmic diagnostics to track your readiness and address preparation gaps.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          TESTIMONIALS SECTION
          ────────────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ──────────────────────────────────────────────────────────
          FAQ SECTION
          ────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ──────────────────────────────────────────────────────────
          BOTTOM HERO-CTA SECTION
          ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-500/10 shadow-2xl">
          {/* Background layout */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700"
            aria-hidden="true"
          />

          <div
            className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 -z-[5] opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Accelerate Your Career?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 leading-relaxed">
              Join thousands of students who built killer profiles and secured engineering roles at their dream companies.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <Button
                size="lg"
                className="bg-white! text-indigo-700! hover:bg-white/90! shadow-xl shadow-indigo-900/30 border-white/20!"
                rightIcon={ArrowRight}
              >
                Sign Up for Free
              </Button>
              <span className="text-xs text-white/60">
                Start preparing in 30 seconds. No card details required.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
