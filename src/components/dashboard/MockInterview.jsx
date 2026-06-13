import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Terminal,
  Cpu,
  User,
  MessageSquare,
  Building,
  CheckSquare,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RefreshCw,
  Zap,
  TrendingUp,
  Info,
  Sparkles,
  BookOpen,
  HelpCircle,
  Activity,
  ArrowLeft,
  ChevronRight,
  Plus,
  Compass,
  Bookmark,
  ChevronLeft,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import {
  LANGUAGE_QUESTIONS,
  FUNDAMENTAL_QUESTIONS,
  HR_QUESTIONS,
  COMMUNICATION_QUESTIONS,
  COMPANY_DATA,
  APTITUDE_QUESTIONS
} from './interviewQuestions';
import { MCQ_QUESTIONS } from './mcqQuestions';

// --- HELPER FUNCTION: REALISTIC SCORING ENGINE ---
const evaluateAnswerScore = (answer = '', keywords = [], questionText = '', questionTip = '') => {
  const trimmed = answer.trim();

  // Guard against empty or placeholder answers: strictly 0
  if (!trimmed || trimmed.toLowerCase() === 'no answer provided.' || trimmed.length < 15) {
    return 0;
  }

  // Count keyword coverage
  let finalKeywords = [...keywords];
  if (finalKeywords.length === 0) {
    const sourceText = questionTip || questionText || '';
    if (sourceText) {
      const stopwords = new Set(['would', 'should', 'about', 'above', 'after', 'again', 'against', 'all', 'and', 'any', 'are', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'you', 'your', 'yours', 'yourself', 'yourselves', 'explain', 'detail', 'architecture', 'design', 'question', 'answer']);
      const words = sourceText
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/);
      const candidates = words.filter(w => w.length > 3 && !stopwords.has(w));
      finalKeywords = Array.from(new Set(candidates)).slice(0, 6);
    }
  }

  let matchCount = 0;
  finalKeywords.forEach((kw) => {
    const cleanKw = kw.replace(/[()]/g, '');
    const regex = new RegExp(`\\b${cleanKw}\\b`, 'i');
    if (regex.test(trimmed)) {
      matchCount++;
    }
  });

  const ratio = finalKeywords.length > 0 ? matchCount / finalKeywords.length : 0.4;
  let score = 40; // baseline for completed sentence

  if (ratio === 0) {
    score = Math.floor(Math.random() * 15) + 30; // 30-45
  } else if (ratio >= 0.7 && trimmed.length > 180) {
    score = Math.min(100, Math.floor(Math.random() * 10) + 90); // 90-100
  } else if (ratio >= 0.3) {
    score = Math.floor(Math.random() * 15) + 70; // 70-85
  } else {
    score = Math.floor(Math.random() * 20) + 50; // 50-70
  }

  return score;
};

// --- NORMALIZE QUESTION HELPER ---
const normalizeQuestion = (qObj, type, category, topic) => {
  const id = qObj.id || `${type}-${category}-${topic}-${Math.random().toString(36).substring(2, 9)}`;
  
  if (type === 'mcq') {
    const originalOptions = qObj.options || [];
    let correctValue = '';
    if (typeof qObj.correct === 'number') {
      correctValue = originalOptions[qObj.correct] || '';
    } else if (typeof qObj.correct === 'string') {
      correctValue = qObj.correct;
    }
    
    // Shuffle options to satisfy requirements
    const optionsWithIndices = originalOptions.map((opt, index) => ({ opt, index }));
    const shuffledOptionsObj = [...optionsWithIndices].sort(() => 0.5 - Math.random());
    const options = shuffledOptionsObj.map(item => item.opt);
    
    // Find new correctIndex
    let correctIndex = options.indexOf(correctValue);
    if (correctIndex === -1) {
      correctIndex = 0;
    }

    return {
      id,
      q: qObj.q || qObj.question_text || '',
      options,
      correctIndex,
      explanation: qObj.explanation || 'No explanation provided.',
      type: 'mcq',
      category: category || 'MCQ',
      topic: topic || '',
      difficulty: qObj.difficulty || 'Intermediate'
    };
  } else {
    // Theory question
    return {
      id,
      q: qObj.q || qObj.question_text || '',
      tip: qObj.tip || qObj.answer_key || 'Provide a detailed explanation. Mention key architectural details or code syntaxes.',
      keywords: qObj.keywords || [],
      type: 'theory',
      category: category || 'Theory',
      topic: topic || '',
      difficulty: qObj.difficulty || 'Intermediate'
    };
  }
};

// --- SHUFFLE & GET DYNAMIC QUESTION BANK ---
const loadQuestionsPool = (mode, category, topic, count) => {
  let pool = [];
  
  if (mode === 'theory') {
    if (category === 'technical') {
      const langs = ['java', 'c', 'cpp', 'python', 'javascript', 'sql'];
      langs.forEach(l => {
        const diffs = ['Beginner', 'Intermediate', 'Advanced'];
        diffs.forEach(d => {
          const qs = LANGUAGE_QUESTIONS[l]?.[d] || [];
          qs.forEach(q => pool.push(normalizeQuestion(q, 'theory', 'Technical', l)));
        });
      });
    } else if (category === 'languages') {
      const diffs = ['Beginner', 'Intermediate', 'Advanced'];
      diffs.forEach(d => {
        const qs = LANGUAGE_QUESTIONS[topic]?.[d] || [];
        qs.forEach(q => pool.push(normalizeQuestion(q, 'theory', `Language (${topic.toUpperCase()})`, topic)));
      });
    } else if (category === 'fundamentals') {
      const qs = FUNDAMENTAL_QUESTIONS[topic] || [];
      qs.forEach(q => pool.push(normalizeQuestion(q, 'theory', `CS Fundamentals (${topic.toUpperCase()})`, topic)));
    } else if (category === 'hr') {
      const subcats = Object.keys(HR_QUESTIONS);
      subcats.forEach(sub => {
        const qs = HR_QUESTIONS[sub] || [];
        qs.forEach(q => pool.push(normalizeQuestion(q, 'theory', `HR Behavioral`, sub)));
      });
    } else if (category === 'communication') {
      COMMUNICATION_QUESTIONS.forEach(q => pool.push(normalizeQuestion(q, 'theory', 'Communication', 'general')));
    } else if (category === 'company') {
      const compData = COMPANY_DATA[topic];
      if (compData) {
        compData.techQuestions.forEach(q => pool.push(normalizeQuestion({ q }, 'theory', `${compData.name} Tech`, topic)));
        compData.hrQuestions.forEach(q => pool.push(normalizeQuestion({ q }, 'theory', `${compData.name} HR`, topic)));
      }
    }
  } else if (mode === 'mcq') {
    if (category === 'languages') {
      const qs = MCQ_QUESTIONS.languages[topic] || [];
      qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `Language MCQ (${topic.toUpperCase()})`, topic)));
    } else if (category === 'fundamentals') {
      const qs = MCQ_QUESTIONS.fundamentals[topic] || [];
      qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `CS MCQ (${topic.toUpperCase()})`, topic)));
    } else if (category === 'aptitude') {
      const qs = APTITUDE_QUESTIONS[topic] || [];
      qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `Aptitude MCQ (${topic.toUpperCase()})`, topic)));
    } else if (category === 'company') {
      const qs = MCQ_QUESTIONS.company[topic] || [];
      qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `${topic.toUpperCase()} MCQ`, topic)));
    }
  } else if (mode === 'mixed') {
    if (topic === 'general') {
      // General mixed placement prep
      const aptTopics = ['quant', 'logical', 'verbal', 'di'];
      aptTopics.forEach(t => {
        const qs = APTITUDE_QUESTIONS[t] || [];
        qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `Aptitude MCQ (${t.toUpperCase()})`, t)));
      });
      const langTopics = ['java', 'c', 'cpp', 'python', 'javascript', 'sql'];
      langTopics.forEach(t => {
        const qs = MCQ_QUESTIONS.languages[t] || [];
        qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `Language MCQ (${t.toUpperCase()})`, t)));
      });
      const csTopics = ['dsa', 'oop', 'dbms', 'os', 'cn', 'se'];
      csTopics.forEach(t => {
        const qs = MCQ_QUESTIONS.fundamentals[t] || [];
        qs.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `CS MCQ (${t.toUpperCase()})`, t)));
      });
      const hrCats = Object.keys(HR_QUESTIONS);
      hrCats.forEach(cat => {
        const qs = HR_QUESTIONS[cat] || [];
        qs.forEach(q => pool.push(normalizeQuestion(q, 'theory', `HR Behavioral`, cat)));
      });
      COMMUNICATION_QUESTIONS.forEach(q => pool.push(normalizeQuestion(q, 'theory', 'Communication', 'general')));
    } else {
      // Company specific blueprints
      if (topic === 'tcs') {
        (APTITUDE_QUESTIONS.quant || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'TCS Aptitude MCQ', 'quant')));
        (APTITUDE_QUESTIONS.verbal || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'TCS Verbal MCQ', 'verbal')));
        (MCQ_QUESTIONS.company.tcs || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'TCS Technical MCQ', 'tcs')));
        const hrQs = [...HR_QUESTIONS["Tell me about yourself"], ...HR_QUESTIONS["Placement readiness"]];
        hrQs.forEach(q => pool.push(normalizeQuestion(q, 'theory', 'TCS HR Behavioral', 'hr')));
      } else if (topic === 'cisco') {
        (MCQ_QUESTIONS.fundamentals.dsa || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'Cisco DSA MCQ', 'dsa')));
        (MCQ_QUESTIONS.languages.java || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'Cisco Java MCQ', 'java')));
        (MCQ_QUESTIONS.fundamentals.cn || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'Cisco Network MCQ', 'cn')));
        const comp = COMPANY_DATA.cisco;
        if (comp) {
          comp.techQuestions.forEach(q => pool.push(normalizeQuestion({ q }, 'theory', 'Cisco Technical Theory', 'cisco')));
        }
      } else if (topic === 'amazon') {
        (MCQ_QUESTIONS.fundamentals.dsa || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'Amazon DSA MCQ', 'dsa')));
        (MCQ_QUESTIONS.fundamentals.oop || []).forEach(q => pool.push(normalizeQuestion(q, 'mcq', 'Amazon OOP MCQ', 'oop')));
        const hrQs = [...HR_QUESTIONS["Leadership"], ...HR_QUESTIONS["Conflict resolution"]];
        hrQs.forEach(q => pool.push(normalizeQuestion(q, 'theory', 'Amazon Behavioral HR', 'hr')));
      } else {
        // Generic mix
        const comp = COMPANY_DATA[topic];
        const mcqPool = MCQ_QUESTIONS.company[topic] || [];
        mcqPool.forEach(q => pool.push(normalizeQuestion(q, 'mcq', `${comp?.name || topic} MCQ`, topic)));
        if (comp) {
          comp.techQuestions.forEach(q => pool.push(normalizeQuestion({ q }, 'theory', `${comp.name} Tech Theory`, topic)));
          comp.hrQuestions.forEach(q => pool.push(normalizeQuestion({ q }, 'theory', `${comp.name} HR Behavioral`, topic)));
        }
      }
    }
  }

  // Supplement if pool size is too small for the selected count
  if (pool.length < count) {
    if (mode === 'theory') {
      const langs = ['java', 'c', 'cpp', 'python', 'javascript', 'sql'];
      langs.forEach(l => {
        const diffs = ['Beginner', 'Intermediate', 'Advanced'];
        diffs.forEach(d => {
          const qs = LANGUAGE_QUESTIONS[l]?.[d] || [];
          qs.forEach(q => {
            const norm = normalizeQuestion(q, 'theory', 'Technical Core', l);
            if (!pool.some(item => item.q === norm.q)) {
              pool.push(norm);
            }
          });
        });
      });
    } else if (mode === 'mcq') {
      if (category === 'languages') {
        const otherLangs = ['java', 'c', 'cpp', 'python', 'javascript', 'sql'].filter(l => l !== topic);
        otherLangs.forEach(ot => {
          const qs = MCQ_QUESTIONS.languages[ot] || [];
          qs.forEach(q => {
            const norm = normalizeQuestion(q, 'mcq', `Language MCQ (${ot.toUpperCase()})`, ot);
            if (!pool.some(item => item.q === norm.q)) {
              pool.push(norm);
            }
          });
        });
      } else if (category === 'fundamentals') {
        const otherCs = ['dsa', 'oop', 'dbms', 'os', 'cn', 'se'].filter(t => t !== topic);
        otherCs.forEach(ot => {
          const qs = MCQ_QUESTIONS.fundamentals[ot] || [];
          qs.forEach(q => {
            const norm = normalizeQuestion(q, 'mcq', `CS MCQ (${ot.toUpperCase()})`, ot);
            if (!pool.some(item => item.q === norm.q)) {
              pool.push(norm);
            }
          });
        });
      } else if (category === 'aptitude') {
        const otherApt = ['quant', 'logical', 'verbal', 'di'].filter(t => t !== topic);
        otherApt.forEach(ot => {
          const qs = APTITUDE_QUESTIONS[ot] || [];
          qs.forEach(q => {
            const norm = normalizeQuestion(q, 'mcq', `Aptitude MCQ (${ot.toUpperCase()})`, ot);
            if (!pool.some(item => item.q === norm.q)) {
              pool.push(norm);
            }
          });
        });
      } else if (category === 'company') {
        const otherComp = Object.keys(MCQ_QUESTIONS.company).filter(c => c !== topic);
        otherComp.forEach(oc => {
          const qs = MCQ_QUESTIONS.company[oc] || [];
          qs.forEach(q => {
            const norm = normalizeQuestion(q, 'mcq', `${oc.toUpperCase()} MCQ`, oc);
            if (!pool.some(item => item.q === norm.q)) {
              pool.push(norm);
            }
          });
        });
      }
    }
  }

  // Shuffle overall pool
  let shuffled = [...pool].sort(() => 0.5 - Math.random());

  // Alternate in Mixed mode
  if (mode === 'mixed') {
    const mcqs = shuffled.filter(q => q.type === 'mcq');
    const theories = shuffled.filter(q => q.type === 'theory');
    const mixed = [];
    const len = Math.max(mcqs.length, theories.length);
    for (let i = 0; i < len; i++) {
      if (i < mcqs.length) mixed.push(mcqs[i]);
      if (i < theories.length) mixed.push(theories[i]);
    }
    shuffled = mixed;
  }

  // Pick exact count (and assign a mock difficulty layout)
  const results = shuffled.slice(0, count);
  results.forEach(r => {
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    r.difficulty = r.difficulty || difficulties[Math.floor(Math.random() * difficulties.length)];
  });

  return results;
};

export default function MockInterview() {
  const { user } = useAuth();
  
  // Selection Hub configurations
  const [selectedMode, setSelectedMode] = useState('theory'); // theory, mcq, mixed
  const [selectedCount, setSelectedCount] = useState(10); // 5, 10, 20, 30, 50
  const [selectedDifficulty, setSelectedDifficulty] = useState('Intermediate'); // Beginner, Intermediate, Advanced
  
  // Custom Focus states
  const [theoryCategory, setTheoryCategory] = useState('technical'); // technical, languages, fundamentals, hr, communication, company
  const [theoryTopic, setTheoryTopic] = useState('java');
  
  const [mcqCategory, setMcqCategory] = useState('languages'); // languages, fundamentals, aptitude, company
  const [mcqTopic, setMcqTopic] = useState('java');
  
  const [mixedTopic, setMixedTopic] = useState('general'); // general, tcs, cisco, amazon, infosys, wipro, etc.
  
  // Active Assessment States
  const [sessionState, setSessionState] = useState('selection'); // selection, scanning, active, evaluating, completed
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: optionIndex / text }
  const [currentAnswer, setCurrentAnswer] = useState(''); // current text input for theory
  const [markedForReview, setMarkedForReview] = useState({}); // { [idx]: boolean }
  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false);
  
  // Follow Up state (Theory only)
  const [isFollowUpActive, setIsFollowUpActive] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState(null);

  // Dynamic Timer States
  const [timeLeft, setTimeLeft] = useState(60); // question-level timer (seconds)
  const [globalTimeLeft, setGlobalTimeLeft] = useState(600); // overall test-level timer (seconds)
  const timerRef = useRef(null);
  const globalTimerRef = useRef(null);

  // Final Reports state
  const [report, setReport] = useState(null);

  // Synchronize dynamic lists when category changes
  useEffect(() => {
    if (selectedMode === 'theory') {
      if (theoryCategory === 'languages') setTheoryTopic('java');
      else if (theoryCategory === 'fundamentals') setTheoryTopic('oop');
      else if (theoryCategory === 'company') setTheoryTopic('tcs');
    } else if (selectedMode === 'mcq') {
      if (mcqCategory === 'languages') setMcqTopic('java');
      else if (mcqCategory === 'fundamentals') setMcqTopic('oop');
      else if (mcqCategory === 'aptitude') setMcqTopic('quant');
      else if (mcqCategory === 'company') setMcqTopic('tcs');
    }
  }, [theoryCategory, mcqCategory, selectedMode]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    };
  }, []);

  // --- TIMER MECHANICS ---
  const startPerQuestionTimer = (secondsLimit) => {
    setTimeLeft(secondsLimit);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleQuestionTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startGlobalTestTimer = (secondsLimit) => {
    setGlobalTimeLeft(secondsLimit);
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    globalTimerRef.current = setInterval(() => {
      setGlobalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(globalTimerRef.current);
          // Auto submit overall assessment
          handleAutoSubmitOnExpiry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleQuestionTimeOut = () => {
    const currentQ = activeQuestions[currentIdx];
    if (currentQ.type === 'theory') {
      // Save theory answer as blank/timed out
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentAnswer || 'No answer provided due to time limit.' }));
      setCurrentAnswer('');
    } else {
      // MCQ skipped or not updated
      if (answers[currentQ.id] === undefined) {
        setAnswers(prev => ({ ...prev, [currentQ.id]: '' }));
      }
    }

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      startPerQuestionTimer(60);
    } else {
      submitAssessment();
    }
  };

  const handleAutoSubmitOnExpiry = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    submitAssessment();
  };

  // --- ASSESSMENT RUNTIME FLOW ---
  const launchAssessment = () => {
    setSessionState('scanning');
    
    // Choose focus topic parameters
    let focusCategory = '';
    let focusTopic = '';

    if (selectedMode === 'theory') {
      focusCategory = theoryCategory;
      focusTopic = (theoryCategory === 'technical' || theoryCategory === 'hr' || theoryCategory === 'communication') ? 'general' : theoryTopic;
    } else if (selectedMode === 'mcq') {
      focusCategory = mcqCategory;
      focusTopic = mcqTopic;
    } else {
      focusCategory = 'mixed';
      focusTopic = mixedTopic;
    }

    setTimeout(() => {
      const questions = loadQuestionsPool(selectedMode, focusCategory, focusTopic, selectedCount);
      setActiveQuestions(questions);
      setCurrentIdx(0);
      setAnswers({});
      setCurrentAnswer('');
      setMarkedForReview({});
      setIsReviewDrawerOpen(false);
      setIsFollowUpActive(false);
      setFollowUpQuestion(null);
      setSessionState('active');

      if (selectedMode === 'mcq') {
        // Timed assessment: 60s per question overall
        const totalTime = selectedCount * 60;
        startGlobalTestTimer(totalTime);
        startPerQuestionTimer(60); // question clock also runs for micro-pressure
      } else {
        // Theory or Mixed: strictly per-question limit of 60s
        startPerQuestionTimer(selectedMode === 'theory' && focusCategory === 'communication' ? 75 : 60);
      }
    }, 1500);
  };

  const handleAnswerSelection = (optionIndex) => {
    const currentQ = activeQuestions[currentIdx];
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleTheoryTextSubmit = (e) => {
    if (e) e.preventDefault();
    const currentQ = activeQuestions[currentIdx];
    const userResponse = currentAnswer;
    
    // Save response
    setAnswers(prev => ({ ...prev, [currentQ.id]: userResponse }));
    setCurrentAnswer('');

    // Dynamic Follow-Up Check (OOP or DSA theory questions only)
    if (selectedMode === 'theory' && !isFollowUpActive && userResponse.length > 25) {
      const matchText = userResponse.toLowerCase();
      let triggered = null;

      if (focusIsOOP() && (matchText.includes('interface') || matchText.includes('abstract'))) {
        triggered = {
          id: `q-followup-${Date.now()}`,
          category: 'Fundamentals Follow-Up',
          q: "You mentioned interfaces and abstraction. What are the key compilation and runtime differences between inheriting a class versus implementing an interface in your choice language?",
          tip: "Focus on multiple inheritance constraints and runtime abstract method tables (vtables).",
          keywords: ["vtable", "multiple inheritance", "implementation", "state"]
        };
      } else if (focusIsDSA() && (matchText.includes('search') || matchText.includes('graph') || matchText.includes('tree'))) {
        triggered = {
          id: `q-followup-${Date.now()}`,
          category: 'Fundamentals Follow-Up',
          q: "Since you referenced search traversals, compare the auxiliary memory limits of stack pointers in DFS against queue buffers in BFS.",
          tip: "Contrast deep call-stack memory frame allocation with breadth boundary queues.",
          keywords: ["stack", "queue", "bfs", "dfs", "memory"]
        };
      }

      if (triggered) {
        setIsFollowUpActive(true);
        setFollowUpQuestion(triggered);
        startPerQuestionTimer(60);
        return;
      }
    }

    // Reset follow up states
    if (isFollowUpActive) {
      setIsFollowUpActive(false);
      setFollowUpQuestion(null);
    }

    goToNext();
  };

  const focusIsOOP = () => {
    return theoryCategory === 'fundamentals' && theoryTopic === 'oop';
  };

  const focusIsDSA = () => {
    return theoryCategory === 'fundamentals' && theoryTopic === 'dsa';
  };

  const goToNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      // Determine timer time limits
      let limit = 60;
      if (activeQuestions[currentIdx + 1]?.category === 'Communication') {
        limit = 75;
      }
      startPerQuestionTimer(limit);
    } else {
      submitAssessment();
    }
  };

  const goToPrev = () => {
    if (currentIdx > 0) {
      // Save current answer text if we are in theory mode before going back
      const currentQ = activeQuestions[currentIdx];
      if (currentQ.type === 'theory' && currentAnswer) {
        setAnswers(prev => ({ ...prev, [currentQ.id]: currentAnswer }));
      }
      
      setCurrentIdx(prev => prev - 1);
      
      // Load previous answer text if exists
      const prevQ = activeQuestions[currentIdx - 1];
      if (prevQ.type === 'theory') {
        setCurrentAnswer(answers[prevQ.id] || '');
      }
      
      startPerQuestionTimer(prevQ.category === 'Communication' ? 75 : 60);
    }
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentIdx]: !prev[currentIdx]
    }));
  };

  const jumpToQuestion = (idx) => {
    // Save current theory answer if typing
    const currentQ = activeQuestions[currentIdx];
    if (currentQ.type === 'theory' && currentAnswer) {
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentAnswer }));
    }

    setCurrentIdx(idx);
    const nextQ = activeQuestions[idx];
    if (nextQ.type === 'theory') {
      setCurrentAnswer(answers[nextQ.id] || '');
    }
    
    setIsReviewDrawerOpen(false);
    startPerQuestionTimer(nextQ.category === 'Communication' ? 75 : 60);
  };

  const submitAssessment = () => {
    // Save final current text if in theory mode
    let finalAnswers = { ...answers };
    const currentQ = activeQuestions[currentIdx];
    if (currentQ && currentQ.type === 'theory' && currentAnswer) {
      finalAnswers[currentQ.id] = currentAnswer;
      setAnswers(finalAnswers);
    }

    if (timerRef.current) clearInterval(timerRef.current);
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    
    // Evaluate answers
    setSessionState('evaluating');
    
    setTimeout(() => {
      let correct = 0;
      let wrong = 0;
      let unattempted = 0;
      let totalMCQ = 0;
      
      let theorySum = 0;
      let theoryCount = 0;
      
      const topicScores = {};

      const questionResults = activeQuestions.map((q, idx) => {
        const ans = finalAnswers[q.id];
        const topicKey = q.topic || 'General';
        if (!topicScores[topicKey]) {
          topicScores[topicKey] = { total: 0, correct: 0, sum: 0, count: 0 };
        }

        if (q.type === 'mcq') {
          totalMCQ++;
          const hasAnswered = ans !== undefined && ans !== null && ans !== '';
          let isCorrect = false;
          let selectedOpt = 'Unattempted';
          
          if (hasAnswered) {
            const index = Number(ans);
            selectedOpt = q.options[index] || 'Unattempted';
            if (index === q.correctIndex) {
              correct++;
              isCorrect = true;
              topicScores[topicKey].correct++;
            } else {
              wrong++;
            }
          } else {
            unattempted++;
          }
          topicScores[topicKey].total++;

          return {
            q: q.q,
            type: 'mcq',
            answer: selectedOpt,
            correctAnswer: q.options[q.correctIndex],
            isCorrect,
            explanation: q.explanation || 'No explanation available.',
            score: isCorrect ? 100 : 0
          };
        } else {
          // Theory evaluation
          theoryCount++;
          const textAns = ans || '';
          const score = evaluateAnswerScore(textAns, q.keywords, q.q, q.tip);
          theorySum += score;
          
          topicScores[topicKey].sum += score;
          topicScores[topicKey].count++;

          return {
            q: q.q,
            type: 'theory',
            answer: textAns || 'No answer provided.',
            score,
            tip: q.tip,
            keywords: q.keywords
          };
        }
      });

      // Scoring formulas
      const accuracy = totalMCQ > 0 ? Math.round((correct / totalMCQ) * 100) : 0;
      const mcqScore = totalMCQ > 0 ? Math.round((correct / totalMCQ) * 100) : 0;
      const theoryScore = theoryCount > 0 ? Math.round(theorySum / theoryCount) : 0;

      let overallReady = 0;
      if (selectedMode === 'theory') {
        overallReady = theoryScore;
      } else if (selectedMode === 'mcq') {
        overallReady = mcqScore;
      } else {
        overallReady = Math.round((mcqScore + theoryScore) / 2);
      }

      let performanceLevel = 'Needs Practice';
      if (overallReady >= 90) performanceLevel = 'Elite';
      else if (overallReady >= 75) performanceLevel = 'Specialist';
      else if (overallReady >= 50) performanceLevel = 'Ninja';

      // Distribute to subscores
      let techSum = 0, techCount = 0;
      let aptSum = 0, aptCount = 0;
      let hrSum = 0, hrCount = 0;
      let commSum = 0, commCount = 0;

      activeQuestions.forEach((q, idx) => {
        const score = questionResults[idx].score;
        const cat = (q.category || '').toLowerCase();
        if (cat.includes('tech') || cat.includes('lang') || cat.includes('cs') || cat.includes('fund')) {
          techSum += score;
          techCount++;
        } else if (cat.includes('apt') || q.topic === 'quant' || q.topic === 'logical' || q.topic === 'verbal' || q.topic === 'di') {
          aptSum += score;
          aptCount++;
        } else if (cat.includes('hr') || cat.includes('behavioral') || q.topic === 'hr') {
          hrSum += score;
          hrCount++;
        } else if (cat.includes('comm')) {
          commSum += score;
          commCount++;
        } else {
          if (q.type === 'mcq') {
            aptSum += score;
            aptCount++;
          } else {
            techSum += score;
            techCount++;
          }
        }
      });

      const subScores = {
        technical: techCount > 0 ? Math.round(techSum / techCount) : (selectedMode === 'mcq' ? 70 : 65),
        aptitude: aptCount > 0 ? Math.round(aptSum / aptCount) : (selectedMode === 'theory' ? 60 : 70),
        hr: hrCount > 0 ? Math.round(hrSum / hrCount) : 75,
        communication: commCount > 0 ? Math.round(commSum / commCount) : 68
      };

      const strongTopics = [];
      const weakTopics = [];
      const recommendedTopics = [];
      const suggestions = [];

      Object.keys(topicScores).forEach(topic => {
        const stats = topicScores[topic];
        let score = 0;
        if (stats.total > 0) {
          score = Math.round((stats.correct / stats.total) * 100);
        } else if (stats.count > 0) {
          score = Math.round(stats.sum / stats.count);
        }
        const label = topic.toUpperCase();

        if (score >= 80) {
          strongTopics.push(label);
        } else {
          weakTopics.push(label);
          recommendedTopics.push(label);
        }
      });

      // Guard list outputs
      if (strongTopics.length === 0) strongTopics.push("Logical Reasoning", "Self Presentation");
      if (weakTopics.length === 0) {
        weakTopics.push("Time Management");
        recommendedTopics.push("Advanced Memory Models");
      }

      if (overallReady < 60) {
        suggestions.push("Focus on core vocabulary. Start with shorter 5-question MCQ tests to build momentum.");
        suggestions.push("Study common programming keywords and read the explanation templates in the CS Fundamentals library.");
      } else if (overallReady < 80) {
        suggestions.push("Solid foundation! Practice typing longer, more structured responses (incorporating technical keywords) in the Theory mode.");
        suggestions.push("Improve your MCQ speed to clear strict coding-screening test time bounds.");
      } else {
        suggestions.push("Excellent work! You show strong command over both MCQs and conceptual written prompts.");
        suggestions.push("Try taking advanced mock placement tests to practice high-pressure multi-context shifts.");
      }

      setReport({
        score: overallReady,
        totalQuestions: activeQuestions.length,
        correctAnswers: correct,
        wrongAnswers: wrong,
        unattemptedQuestions: unattempted,
        accuracyPercentage: accuracy,
        performanceLevel,
        subScores,
        strongTopics,
        weakTopics,
        recommendedTopics,
        suggestions,
        questions: questionResults
      });

      // Save statistics inside LocalStorage
      const suffix = user?.email ? `_${user.email}` : '';
      const solvedCount = parseInt(localStorage.getItem(`placify_questions_solved${suffix}`) || '0') + activeQuestions.length;
      const sessionCount = parseInt(localStorage.getItem(`placify_mock_sessions${suffix}`) || '0') + 1;
      localStorage.setItem(`placify_questions_solved${suffix}`, solvedCount.toString());
      localStorage.setItem(`placify_mock_sessions${suffix}`, sessionCount.toString());

      try {
        const historyVal = localStorage.getItem(`placify_interview_sessions${suffix}`);
        const history = historyVal ? JSON.parse(historyVal) : [];
        history.push({
          id: `sess-${Date.now()}`,
          type: selectedMode === 'theory' ? 'Theory Interview' : selectedMode === 'mcq' ? 'MCQ Assessment' : 'Mixed Interview',
          score: overallReady,
          questionsCount: activeQuestions.length,
          completedAt: new Date().toISOString()
        });
        localStorage.setItem(`placify_interview_sessions${suffix}`, JSON.stringify(history));
      } catch (e) {
        console.error(e);
      }

      window.dispatchEvent(new Event('placify_data_update'));
      setSessionState('completed');
    }, 1800);
  };

  const resetWorkspace = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    setSessionState('selection');
    setReport(null);
    setActiveQuestions([]);
    setAnswers({});
    setCurrentAnswer('');
    setCurrentIdx(0);
    setMarkedForReview({});
    setIsReviewDrawerOpen(false);
    setIsFollowUpActive(false);
    setFollowUpQuestion(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Brain className="text-indigo-500 animate-pulse" size={24} />
          Placement Preparation Center
        </h2>
        <p className="text-xs text-surface-555 dark:text-surface-400 mt-1">
          Simulate official recruitment tests using structured multiple-choice questions, written conceptual interviews, and automated performance reviews.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Selection Configuration Hub */}
        {sessionState === 'selection' && (
          <motion.div
            key="config-hub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Mode Selector Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  id: 'theory',
                  title: 'Theory Interview',
                  desc: 'Test your conceptual explanation skills. Type answers and receive real-time follow-up questions and keyword scoring.',
                  icon: MessageSquare,
                  badge: 'Interactive'
                },
                {
                  id: 'mcq',
                  title: 'MCQ Assessment',
                  desc: 'Timed online assessments with single-choice options covering programming, CS subjects, and corporate aptitude tests.',
                  icon: CheckSquare,
                  badge: 'Standardized'
                },
                {
                  id: 'mixed',
                  title: 'Mixed Interview',
                  desc: 'The ultimate company test simulator. Alternates between conceptual text entries and logical multiple-choice questions.',
                  icon: Sparkles,
                  badge: 'Placement Mode'
                }
              ].map(mode => {
                const Icon = mode.icon;
                const isSelected = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[170px] cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-500/10 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30'
                        : 'border-surface-200 dark:border-white/[0.06] bg-card-bg hover:border-surface-300 dark:hover:border-white/[0.12] hover:shadow-sm'
                    }`}
                  >
                    <div className="absolute top-2 right-2 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {mode.badge}
                    </div>
                    <div>
                      <div className={`p-2 w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-surface-100 dark:bg-white/[0.04] text-text-muted'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1">{mode.title}</h4>
                      <p className="text-[10px] text-text-muted leading-relaxed line-clamp-3">{mode.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sub-config Panels */}
            <Card className="p-6 border border-surface-200 dark:border-white/[0.06] bg-card-bg shadow-xl rounded-2xl">
              <div className="space-y-6">
                
                {/* 1. FOCUS SELECTIONS */}
                {selectedMode === 'theory' && (
                  <div className="space-y-4">
                    <div className="flex border-b border-surface-200 dark:border-white/[0.06] gap-1 overflow-x-auto pb-1">
                      {[
                        { id: 'technical', label: 'Technical Screening', icon: Cpu },
                        { id: 'languages', label: 'Languages Track', icon: Terminal },
                        { id: 'fundamentals', label: 'CS Fundamentals', icon: BookOpen },
                        { id: 'hr', label: 'HR Behavioral', icon: User },
                        { id: 'communication', label: 'Communication Prompt', icon: MessageSquare },
                        { id: 'company', label: 'Company Custom', icon: Building }
                      ].map(tab => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setTheoryCategory(tab.id)}
                            className={`px-3 py-1.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                              theoryCategory === tab.id
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-text-muted hover:text-text-secondary'
                            }`}
                          >
                            <Icon size={13} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      {theoryCategory === 'languages' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select Programming Language</label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {['java', 'c', 'cpp', 'python', 'javascript', 'sql'].map(lang => (
                              <button
                                key={lang}
                                onClick={() => setTheoryTopic(lang)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all uppercase ${
                                  theoryTopic === lang
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {lang === 'cpp' ? 'C++' : lang}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {theoryCategory === 'fundamentals' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select Computer Science Topic</label>
                          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                            {[
                              { id: 'oop', name: 'OOPs' },
                              { id: 'dsa', name: 'DSA' },
                              { id: 'dbms', name: 'DBMS' },
                              { id: 'os', name: 'Operating Systems' },
                              { id: 'cn', name: 'Networks' },
                              { id: 'se', name: 'Software Eng.' }
                            ].map(cs => (
                              <button
                                key={cs.id}
                                onClick={() => setTheoryTopic(cs.id)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                                  theoryTopic === cs.id
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {cs.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {theoryCategory === 'company' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select Company Blueprint</label>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {Object.keys(COMPANY_DATA).map(comp => (
                              <button
                                key={comp}
                                onClick={() => setTheoryTopic(comp)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all uppercase ${
                                  theoryTopic === comp
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {comp}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {theoryCategory === 'technical' && (
                        <p className="text-xs text-text-muted leading-relaxed">Runs a random technical screening query spanning Java, Python, SQL databases, and general web design architectures.</p>
                      )}
                      {theoryCategory === 'hr' && (
                        <p className="text-xs text-text-muted leading-relaxed">Simulates standard HR queries regarding conflict resolution, career milestones, strengths, and weaknesses.</p>
                      )}
                      {theoryCategory === 'communication' && (
                        <p className="text-xs text-text-muted leading-relaxed">Tests verbal capability, persuasive vocabulary, and professional email draft formatting.</p>
                      )}
                    </div>
                  </div>
                )}

                {selectedMode === 'mcq' && (
                  <div className="space-y-4">
                    <div className="flex border-b border-surface-200 dark:border-white/[0.06] gap-1 overflow-x-auto pb-1">
                      {[
                        { id: 'languages', label: 'Programming MCQ', icon: Terminal },
                        { id: 'fundamentals', label: 'CS Subjects MCQ', icon: BookOpen },
                        { id: 'aptitude', label: 'Aptitude & Logic', icon: CheckSquare },
                        { id: 'company', label: 'Company Assessments', icon: Building }
                      ].map(tab => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setMcqCategory(tab.id)}
                            className={`px-3 py-1.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                              mcqCategory === tab.id
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-text-muted hover:text-text-secondary'
                            }`}
                          >
                            <Icon size={13} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      {mcqCategory === 'languages' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select Language Pool</label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {['java', 'c', 'cpp', 'python', 'javascript', 'sql'].map(lang => (
                              <button
                                key={lang}
                                onClick={() => setMcqTopic(lang)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all uppercase ${
                                  mcqTopic === lang
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {lang === 'cpp' ? 'C++' : lang}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {mcqCategory === 'fundamentals' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select CS Subject</label>
                          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                            {[
                              { id: 'dsa', name: 'Data Structures' },
                              { id: 'oop', name: 'OOP Principles' },
                              { id: 'dbms', name: 'DBMS / SQL' },
                              { id: 'os', name: 'Operating Systems' },
                              { id: 'cn', name: 'Networks' },
                              { id: 'se', name: 'Software Eng.' }
                            ].map(cs => (
                              <button
                                key={cs.id}
                                onClick={() => setMcqTopic(cs.id)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                                  mcqTopic === cs.id
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {cs.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {mcqCategory === 'aptitude' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select Aptitude Track</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: 'quant', name: 'Quantitative Aptitude' },
                              { id: 'logical', name: 'Logical Reasoning' },
                              { id: 'verbal', name: 'Verbal Ability' },
                              { id: 'di', name: 'Data Interpretation' }
                            ].map(apt => (
                              <button
                                key={apt.id}
                                onClick={() => setMcqTopic(apt.id)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                                  mcqTopic === apt.id
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {apt.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {mcqCategory === 'company' && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-muted uppercase">Select Target Company Test</label>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {['tcs', 'infosys', 'accenture', 'cognizant', 'wipro', 'capgemini', 'deloitte', 'cisco', 'amazon', 'microsoft'].map(comp => (
                              <button
                                key={comp}
                                onClick={() => setMcqTopic(comp)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all uppercase ${
                                  mcqTopic === comp
                                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                                }`}
                              >
                                {comp}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedMode === 'mixed' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-text-muted uppercase">Choose Mixed Simulator Blueprint</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'general', name: 'General Placement Prep' },
                        { id: 'tcs', name: 'TCS MCQ + HR Drive' },
                        { id: 'cisco', name: 'Cisco DSA + Networks' },
                        { id: 'amazon', name: 'Amazon DSA + Leadership' }
                      ].map(mix => (
                        <button
                          key={mix.id}
                          onClick={() => setMixedTopic(mix.id)}
                          className={`py-2.5 px-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                            mixedTopic === mix.id
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                              : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                          }`}
                        >
                          {mix.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. QUESTION COUNT SELECTOR */}
                <div className="space-y-2 pt-2 border-t border-surface-200 dark:border-white/[0.06]">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Select Question Count</label>
                  <div className="flex gap-2">
                    {[5, 10, 20, 30, 50].map(count => (
                      <button
                        key={count}
                        onClick={() => setSelectedCount(count)}
                        className={`w-12 py-2 rounded-xl border text-xs font-extrabold transition-all ${
                          selectedCount === count
                            ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                            : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <div className="pt-4">
                  <Button variant="primary" size="sm" onClick={launchAssessment} className="w-full sm:w-auto flex items-center justify-center gap-1.5">
                    <Play size={14} fill="currentColor" />
                    Launch Placement Practice Studio
                  </Button>
                </div>

              </div>
            </Card>
          </motion.div>
        )}

        {/* State 2: Simulated setup scanning */}
        {sessionState === 'scanning' && (
          <motion.div
            key="scanning-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass border border-surface-200 dark:border-white/[0.04] p-12 rounded-3xl text-center flex flex-col items-center justify-center min-h-[340px] bg-card-bg"
          >
            <div className="relative flex items-center justify-center h-20 w-20 mb-6">
              <span className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 animate-ping" />
              <div className="relative h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-lg">
                <Brain size={26} className="animate-pulse text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
              Shuffling Dynamic Pools...
            </h3>
            <p className="text-xs text-text-muted mt-1.5 max-w-sm leading-relaxed">
              Randomizing questions, shuffling option layouts, and loading performance rules to configure your workspace.
            </p>
          </motion.div>
        )}

        {/* State 3: Active Workspace */}
        {sessionState === 'active' && activeQuestions.length > 0 && (
          <motion.div
            key="active-state"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-4 relative"
          >
            {/* Sidebar info */}
            <div className="md:col-span-1 space-y-6">
              <Card className="p-5 border border-surface-200 dark:border-white/[0.06] bg-card-bg rounded-2xl" hoverable={false}>
                
                {/* 1. Timer indicator */}
                {selectedMode === 'mcq' ? (
                  <div className="text-center pb-4 border-b border-surface-200 dark:border-white/[0.06]">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted block">Test Clock</span>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <Clock size={16} className={globalTimeLeft <= 60 ? 'text-danger animate-pulse' : 'text-indigo-500'} />
                      <span className={`text-2xl font-black font-mono tracking-tight leading-none ${
                        globalTimeLeft <= 60 ? 'text-danger' : 'text-gray-900 dark:text-white'
                      }`}>
                        {Math.floor(globalTimeLeft / 60)}:{(globalTimeLeft % 60) < 10 ? `0${globalTimeLeft % 60}` : globalTimeLeft % 60}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center pb-4 border-b border-surface-200 dark:border-white/[0.06]">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted block">Question Timer</span>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <Clock size={16} className={timeLeft <= 15 ? 'text-danger animate-pulse' : 'text-indigo-500'} />
                      <span className={`text-2xl font-black font-mono tracking-tight leading-none ${
                        timeLeft <= 15 ? 'text-danger' : 'text-gray-900 dark:text-white'
                      }`}>
                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Progress Tracker */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
                    <span>Progress</span>
                    <span>Q {currentIdx + 1} of {activeQuestions.length}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-100 dark:bg-white/[0.04] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 3. Review Drawer Toggle Button */}
                <button
                  onClick={() => setIsReviewDrawerOpen(!isReviewDrawerOpen)}
                  className="mt-5 w-full flex items-center justify-between p-2.5 rounded-xl border border-surface-200 dark:border-white/[0.06] text-xs font-bold text-text-secondary hover:bg-surface-50 dark:hover:bg-white/[0.02] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Bookmark size={13} className="text-indigo-500" />
                    Review Answers Grid
                  </span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-md font-extrabold">
                    {Object.keys(answers).length} / {activeQuestions.length}
                  </span>
                </button>

              </Card>

              <Button variant="ghost" size="sm" onClick={resetWorkspace} className="w-full justify-center text-text-muted hover:text-gray-900 dark:hover:text-white">
                <ChevronLeft size={14} />
                Exit Assessment
              </Button>
            </div>

            {/* Main workspace area */}
            <div className="md:col-span-3 space-y-6">
              
              {/* Review answers overlay drawer */}
              {isReviewDrawerOpen && (
                <Card className="p-5 border border-indigo-500/20 bg-card-bg shadow-2xl rounded-2xl relative z-20">
                  <div className="flex justify-between items-center pb-3 border-b border-surface-200 dark:border-white/[0.06] mb-4">
                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">Review Panel Grid</span>
                    <button onClick={() => setIsReviewDrawerOpen(false)} className="text-text-muted hover:text-text-primary p-1 cursor-pointer">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {activeQuestions.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
                      const isMarked = markedForReview[idx];
                      return (
                        <button
                          key={idx}
                          onClick={() => jumpToQuestion(idx)}
                          className={`h-9 rounded-xl border flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                            currentIdx === idx
                              ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-500/10 text-indigo-600'
                              : isMarked
                              ? 'border-warning/80 bg-warning/5 text-warning font-extrabold'
                              : isAnswered
                              ? 'border-indigo-500/50 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400'
                              : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-text-muted font-semibold mt-4 pt-3 border-t border-surface-200 dark:border-white/[0.06]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-500/10 border border-indigo-500/30" /> Answered</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-warning/5 border border-warning" /> Marked Review</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded border border-surface-200" /> Unattempted</span>
                  </div>
                </Card>
              )}

              <Card className="p-6 border border-surface-200 dark:border-white/[0.06] bg-card-bg rounded-2xl" hoverable={false}>
                
                {/* Active Question Body */}
                <div className="space-y-6">
                  
                  {/* Meta Tags */}
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-600 border border-indigo-500/15 uppercase tracking-wide">
                        {isFollowUpActive ? 'Follow-Up' : activeQuestions[currentIdx].category}
                      </span>
                      <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold border uppercase tracking-wide ${
                        activeQuestions[currentIdx].difficulty === 'Advanced'
                          ? 'border-danger/20 bg-danger/5 text-danger'
                          : activeQuestions[currentIdx].difficulty === 'Intermediate'
                          ? 'border-warning/20 bg-warning/5 text-warning'
                          : 'border-success/20 bg-success/5 text-success'
                      }`}>
                        {activeQuestions[currentIdx].difficulty}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
                      {activeQuestions[currentIdx].topic.toUpperCase()}
                    </span>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white leading-relaxed pt-2">
                    Q{currentIdx + 1}. {isFollowUpActive ? followUpQuestion.q : activeQuestions[currentIdx].q}
                  </h3>

                  {/* Workspace Render Mode A: MCQ Selection Options */}
                  {(!isFollowUpActive && activeQuestions[currentIdx].type === 'mcq') ? (
                    <div className="grid gap-3 pt-2">
                      {activeQuestions[currentIdx].options.map((opt, i) => {
                        const isSelected = answers[activeQuestions[currentIdx].id] === i;
                        const labelOption = String.fromCharCode(65 + i); // A, B, C, D
                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswerSelection(i)}
                            className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-500/10 border-indigo-500/80 text-indigo-600 dark:text-indigo-400 font-extrabold shadow-sm'
                                : 'border-surface-200 dark:border-white/[0.06] text-text-secondary hover:border-surface-300 dark:hover:border-white/[0.12]'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border ${
                              isSelected ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-surface-100 dark:bg-white/[0.04] text-text-muted'
                            }`}>
                              {labelOption}
                            </span>
                            <span className="font-semibold">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Workspace Render Mode B: Written Theory Prompt Input */
                    <div className="space-y-4 pt-2">
                      {/* Hint tip panel */}
                      <div className="flex gap-2 p-3 bg-surface-50 dark:bg-white/[0.01] border border-surface-200 dark:border-white/[0.06] rounded-xl text-[10px] leading-relaxed text-text-muted">
                        <Info size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-text-secondary block mb-0.5">Evaluation Hint / Tip:</span>
                          {isFollowUpActive ? followUpQuestion.tip : activeQuestions[currentIdx].tip}
                        </div>
                      </div>

                      {/* Answer Entry */}
                      <div className="space-y-2">
                        <textarea
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          placeholder="Type your explanation. Include conceptual terms, code models, keywords, and logic structures to obtain full score accuracy..."
                          className="w-full min-h-[160px] rounded-2xl bg-surface-50 dark:bg-white/[0.01] border border-surface-200 dark:border-white/[0.06] p-4 text-xs text-text-primary outline-none focus:border-indigo-500 dark:focus:border-indigo-450 transition-colors resize-none font-sans"
                          required
                        />
                        <div className="flex justify-between items-center text-[10px] text-text-muted">
                          <span>Length check: <b className={currentAnswer.length >= 15 ? 'text-success' : 'text-danger'}>{currentAnswer.length} chars</b> (min 15 required)</span>
                          {activeQuestions[currentIdx].keywords && activeQuestions[currentIdx].keywords.length > 0 && (
                            <span className="hidden sm:inline">Target keywords: {activeQuestions[currentIdx].keywords.slice(0, 3).join(', ')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Workspace Controls */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-5 border-t border-surface-200 dark:border-white/[0.06]">
                    
                    {/* Mark for review toggle */}
                    <button
                      onClick={toggleMarkForReview}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                        markedForReview[currentIdx]
                          ? 'border-warning/50 bg-warning/10 text-warning'
                          : 'border-surface-200 dark:border-white/[0.06] text-text-muted hover:border-surface-300'
                      }`}
                    >
                      <Bookmark size={12} fill={markedForReview[currentIdx] ? "currentColor" : "none"} />
                      {markedForReview[currentIdx] ? 'Marked Review' : 'Mark for Review'}
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {currentIdx > 0 && (
                        <Button variant="ghost" size="sm" onClick={goToPrev}>
                          Back
                        </Button>
                      )}
                      
                      {/* Submitting check */}
                      {currentIdx < activeQuestions.length - 1 ? (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={activeQuestions[currentIdx].type === 'theory' || isFollowUpActive ? handleTheoryTextSubmit : goToNext}
                        >
                          Next Question
                        </Button>
                      ) : (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={submitAssessment}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          Submit Assessment
                        </Button>
                      )}
                    </div>

                  </div>

                </div>

              </Card>
            </div>

          </motion.div>
        )}

        {/* State 4: Evaluating Report Screen */}
        {sessionState === 'evaluating' && (
          <motion.div
            key="evaluating-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass border border-surface-200 dark:border-white/[0.04] p-12 rounded-3xl text-center flex flex-col items-center justify-center min-h-[340px] bg-card-bg"
          >
            <div className="relative flex items-center justify-center h-20 w-20 mb-6">
              <span className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 animate-ping" />
              <div className="relative h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-lg">
                <RefreshCw size={26} className="animate-spin text-indigo-600" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
              Evaluating Assessment Scores
            </h3>
            <p className="text-xs text-text-muted mt-1.5 max-w-sm leading-relaxed">
              Evaluating option correctness, analyzing keyword density on written prompts, and calculating placement readiness averages...
            </p>
          </motion.div>
        )}

        {/* State 5: Completed Report Screen */}
        {sessionState === 'completed' && report && (
          <motion.div
            key="completed-state"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header overview scorecard */}
            <Card className="p-6 relative overflow-hidden border border-surface-200 dark:border-white/[0.06] bg-card-bg shadow-xl rounded-2xl" hoverable={false}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Score circle gauge */}
                  <div className="relative flex items-center justify-center h-24 w-24 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="42" className="stroke-surface-100 dark:stroke-white/[0.04]" strokeWidth="6" fill="transparent" />
                      <circle cx="48" cy="48" r="42" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="6" fill="transparent" strokeDasharray={263.8} strokeDashoffset={263.8 - (263.8 * report.score) / 100} />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">{report.score}%</span>
                      <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Readiness</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-left">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
                      report.performanceLevel === 'Elite'
                        ? 'border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : report.performanceLevel === 'Specialist'
                        ? 'border-success/20 bg-success/10 text-success'
                        : 'border-warning/20 bg-warning/10 text-warning'
                    }`}>
                      <Award size={13} />
                      {report.performanceLevel} Level Candidate
                    </span>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white font-heading">
                      Placement Readiness Scorecard
                    </h3>
                    <p className="text-xs text-text-muted mt-1 max-w-lg leading-relaxed">
                      Your assessment answers were compiled and assessed. Review your metrics, strong topics, and study recommendations.
                    </p>
                  </div>
                </div>

                <Button variant="primary" size="sm" onClick={resetWorkspace}>
                  Back to Hub
                </Button>
              </div>
            </Card>

            {/* Performance break down layout */}
            <div className="grid gap-6 md:grid-cols-3">
              
              {/* Left Column: Stats & Subscores */}
              <div className="md:col-span-1 space-y-6">
                
                {/* MCQ details panel */}
                {selectedMode !== 'theory' && (
                  <Card className="p-5 border border-surface-200 dark:border-white/[0.06]" hoverable={false}>
                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4">MCQ Performance Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-surface-50 dark:bg-white/[0.01] rounded-xl border border-surface-200 dark:border-white/[0.04]">
                        <span className="text-[8px] font-bold text-text-muted uppercase">Correct</span>
                        <span className="block text-lg font-black text-success mt-0.5">{report.correctAnswers}</span>
                      </div>
                      <div className="p-3 bg-surface-50 dark:bg-white/[0.01] rounded-xl border border-surface-200 dark:border-white/[0.04]">
                        <span className="text-[8px] font-bold text-text-muted uppercase">Wrong</span>
                        <span className="block text-lg font-black text-danger mt-0.5">{report.wrongAnswers}</span>
                      </div>
                      <div className="p-3 bg-surface-50 dark:bg-white/[0.01] rounded-xl border border-surface-200 dark:border-white/[0.04]">
                        <span className="text-[8px] font-bold text-text-muted uppercase">Unattempted</span>
                        <span className="block text-lg font-black text-text-secondary mt-0.5">{report.unattemptedQuestions}</span>
                      </div>
                      <div className="p-3 bg-surface-50 dark:bg-white/[0.01] rounded-xl border border-surface-200 dark:border-white/[0.04]">
                        <span className="text-[8px] font-bold text-text-muted uppercase">Accuracy</span>
                        <span className="block text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">{report.accuracyPercentage}%</span>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Subscores */}
                <Card className="p-5 border border-surface-200 dark:border-white/[0.06]" hoverable={false}>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4">Placement Dimension Scores</h4>
                  <div className="space-y-3.5">
                    {[
                      { name: 'Technical Core', val: report.subScores.technical, col: 'bg-indigo-600' },
                      { name: 'Aptitude & Logical', val: report.subScores.aptitude, col: 'bg-purple-600' },
                      { name: 'HR / Behavioral', val: report.subScores.hr, col: 'bg-success' },
                      { name: 'Communication Style', val: report.subScores.communication, col: 'bg-indigo-500' }
                    ].map(sc => (
                      <div key={sc.name}>
                        <div className="flex justify-between text-[11px] font-bold mb-1">
                          <span className="text-text-secondary">{sc.name}</span>
                          <span className="text-text-primary">{sc.val}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-100 dark:bg-white/[0.04] rounded-full overflow-hidden">
                          <div className={`h-full ${sc.col} rounded-full`} style={{ width: `${sc.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>

              {/* Right Column: Strengths / Weaknesses / Topic Review */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Strong vs Weak Analysis */}
                <Card className="p-5 border border-surface-200 dark:border-white/[0.06]" hoverable={false}>
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4">Performance Analysis</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-success uppercase block">Strong Topics</span>
                      <div className="flex flex-wrap gap-1.5">
                        {report.strongTopics.map((top, i) => (
                          <span key={i} className="px-2.5 py-0.5 text-[9px] font-bold rounded-lg border border-success/15 bg-success/5 text-success">
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-danger uppercase block">Weak / Review Topics</span>
                      <div className="flex flex-wrap gap-1.5">
                        {report.weakTopics.map((top, i) => (
                          <span key={i} className="px-2.5 py-0.5 text-[9px] font-bold rounded-lg border border-danger/15 bg-danger/5 text-danger">
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-surface-200 dark:border-white/[0.06]">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase block mb-2">Recommended Study focus</span>
                    <p className="text-[11px] leading-relaxed text-text-muted">
                      Your response matrices suggest reviewing study material for: <b className="text-text-primary">{report.recommendedTopics.join(', ')}</b>.
                    </p>
                  </div>
                </Card>

                {/* Suggestions */}
                <Card className="p-5 border border-surface-200 dark:border-white/[0.06]" hoverable={false}>
                  <h4 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">Improvement Suggestions</h4>
                  <div className="space-y-3">
                    {report.suggestions.map((sug, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 bg-surface-50 dark:bg-white/[0.01] border border-surface-200 dark:border-white/[0.04] rounded-xl text-xs">
                        <span className="h-5 w-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                        <span className="leading-normal text-text-secondary font-medium">{sug}</span>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>
            </div>

            {/* Bottom Section: Question Breakdown reviews */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Detailed Responses Check</h4>
              <div className="grid gap-4">
                {report.questions.map((qResult, idx) => (
                  <Card key={idx} className="p-5 border border-surface-200 dark:border-white/[0.06]" hoverable={false}>
                    
                    <div className="flex justify-between items-start gap-4 pb-3 border-b border-surface-200 dark:border-white/[0.04] mb-3">
                      <span className="text-xs font-bold text-gray-900 dark:text-white leading-relaxed">Q{idx + 1}. {qResult.q}</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border shrink-0 uppercase tracking-wider ${
                        qResult.score >= 70 ? 'border-success/20 bg-success/5 text-success' : 'border-warning/20 bg-warning/5 text-warning'
                      }`}>
                        Score: {qResult.score}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold text-text-secondary block mb-1">Your Submission:</span>
                        <p className="italic text-text-muted bg-surface-50 dark:bg-white/[0.01] p-3 rounded-xl border border-surface-200 dark:border-white/[0.04]">
                          "{qResult.answer}"
                        </p>
                      </div>

                      {qResult.type === 'mcq' ? (
                        <div className="text-[11px] flex flex-col sm:flex-row gap-2 sm:gap-6 pt-1">
                          <span>Correct Answer: <b className="text-success">{qResult.correctAnswer}</b></span>
                          <span className="text-text-muted">Explanation: {qResult.explanation}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] pt-1">
                          <span className="font-bold text-text-secondary block mb-1">Review Criteria Tip:</span>
                          <p className="text-text-muted">{qResult.tip}</p>
                        </div>
                      )}
                    </div>

                  </Card>
                ))}
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
