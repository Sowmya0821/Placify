// Placify — Company Preparation Hub Expanded Database
// Classified into: Service-Based, Product-Based, Indian Product Companies

export const COMPANY_DATA = {
  tcs: {
    id: 'tcs',
    name: 'TCS',
    fullName: 'Tata Consultancy Services',
    type: 'service',
    description: 'India\'s largest multinational IT services company, hiring through the TCS NQT system.',
    industry: 'IT Services & Consulting',
    size: '600,000+ Employees',
    headquarters: 'Mumbai, Maharashtra, India',
    indiaPresence: 'Major offices in Mumbai, Pune, Bangalore, Chennai, Hyderabad, Noida, Kolkata, and Hyderabad.',
    locations: ['Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad', 'Noida', 'Kolkata'],
    roles: ['Systems Engineer', 'Associate Software Engineer', 'Graduate Engineer Trainee', 'Analyst'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-blue-600 dark:text-blue-400',
    theme: {
      from: 'from-blue-600 to-indigo-800',
      text: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-500/10 dark:bg-blue-500/5',
      border: 'border-blue-500/20 dark:border-blue-500/10',
      accent: 'border-l-blue-500 dark:border-l-blue-400',
      pill: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-surface-50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-blue-500/5'
    },
    difficulty: 'Easy-Medium',
    package: '3.6 - 7.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '15-20%',
      employees: '600k+',
      roleType: 'Ninja / Digital / Prime'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% in B.Tech, 10th, and 12th',
      backlogs: 'Maximum 1 active backlog allowed at the time of application',
      gaps: 'Not more than 2 years of academic gap allowed',
      branches: 'All Engineering branches eligible (CS/IT/ECE/Mechanical/Civil, etc.)'
    },
    hiringProcess: [
      { round: 'Round 1: Online Test (TCS NQT)', description: 'Consists of Cognitive skills (Numerical, Verbal, Reasoning) and Technical section (Coding & MCQs).' },
      { round: 'Round 2: Technical Interview', description: 'Deep dive into resume projects, programming fundamentals (Java/C++/Python), DBMS/SQL, and Data Structures.' },
      { round: 'Round 3: HR & Managerial Interview', description: 'Behavioral assessment, communication skills, career goals, shift flexibility, and location preferences.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'DSA', 'Java', 'Python', 'C++', 'SQL'],
    aptitudeTopics: ['Aptitude', 'Verbal', 'Programming Fundamentals'],
    questions: [
      {
        q: 'What is a foreign key, and what is its purpose in a relational database?',
        a: 'A foreign key is a field in one table that refers to the primary key in another table. Its purpose is to establish and enforce a link between the data in the two tables, ensuring referential integrity.'
      },
      {
        q: 'What is the difference between local variables and instance variables in Java?',
        a: 'Local variables are declared inside a method/constructor and are only visible within it. Instance variables are declared in a class but outside methods; they are accessible by all class methods.'
      }
    ],
    tips: [
      'Speed is crucial in the TCS NQT cognitive section; practice shortcuts for mental math.',
      'Be ready to explain every single project listed on your resume in detail.',
      'Maintain strong communication skills; the MR round focuses on adaptability and learning mindset.'
    ]
  },
  infosys: {
    id: 'infosys',
    name: 'Infosys',
    fullName: 'Infosys Limited',
    type: 'service',
    description: 'A global leader in next-generation digital services and consulting, hiring via system tests and certifications.',
    industry: 'IT Services & Consulting',
    size: '330,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Major hubs in Bangalore, Pune, Hyderabad, Chennai, Mysore, and Chandigarh.',
    locations: ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Mumbai'],
    roles: ['Systems Engineer', 'Associate Software Engineer', 'Analyst'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-sky-600 dark:text-sky-400',
    theme: {
      from: 'from-sky-600 to-blue-800',
      text: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/10 dark:bg-sky-500/5',
      border: 'border-sky-500/20 dark:border-sky-500/10',
      accent: 'border-l-sky-500 dark:border-l-sky-400',
      pill: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/20',
      gradient: 'from-sky-500/10 via-blue-500/5 to-surface-50 dark:from-sky-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-sky-500/5'
    },
    difficulty: 'Medium',
    package: '3.6 - 8.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '12-18%',
      employees: '330k+',
      roleType: 'SE / Specialist / Power Programmer'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% in B.Tech/M.Tech. No active backlogs.',
      backlogs: 'Zero active backlogs at the time of recruitment.',
      gaps: 'Up to 2 years of educational gap is permissible.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA, M.Sc (CS/IT/Electronics).'
    },
    hiringProcess: [
      { round: 'Round 1: Online System Test', description: 'Covers Mathematical Reasoning, Cryptarithmetic, Verbal Ability, Pseudocode, and Puzzle-solving sections.' },
      { round: 'Round 2: Technical Interview', description: 'Focuses on core programming logic (Java, Python, C++), DBMS, OOPs, and basic data structures.' },
      { round: 'Round 3: HR Round', description: 'Assesses soft skills, cultural compatibility, behavioral scenarios, and project reviews.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'DSA', 'SQL'],
    aptitudeTopics: ['Cryptarithmetic', 'Logical Puzzles', 'Verbal Ability'],
    questions: [
      {
        q: 'What is the difference between Abstract Class and Interface?',
        a: 'An abstract class can have abstract and concrete methods, support constructor creation, and allow state variables. An interface can only have abstract methods (prior to Java 8), static/final variables, and multiple interfaces can be implemented by a single class.'
      },
      {
        q: 'Explain ACID properties in Database Management Systems.',
        a: 'ACID stands for Atomicity (all or nothing transactions), Consistency (data state transition is valid), Isolation (concurrent transactions execute independently), and Durability (successful transactions persist).'
      }
    ],
    tips: [
      'Cryptarithmetic is a heavy elimination step in round 1; practice standard sum structures.',
      'Brush up on pseudocode parsing, as the test contains code snippets to trace outputs.',
      'Be highly prepared to draft SQL queries live during the technical interview.'
    ]
  },
  wipro: {
    id: 'wipro',
    name: 'Wipro',
    fullName: 'Wipro Limited',
    type: 'service',
    description: 'A leading technology services and consulting company, hiring through national talent hunt assessments.',
    industry: 'IT Services & Consulting',
    size: '250,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Major offices in Bangalore, Pune, Chennai, Hyderabad, Delhi NCR, and Kochi.',
    locations: ['Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Gurugram'],
    roles: ['Systems Engineer', 'Associate Software Engineer', 'Graduate Engineer Trainee'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-violet-600 dark:text-violet-400',
    theme: {
      from: 'from-violet-600 to-purple-800',
      text: 'text-violet-500 dark:text-violet-400',
      bg: 'bg-violet-500/10 dark:bg-violet-500/5',
      border: 'border-violet-500/20 dark:border-violet-500/10',
      accent: 'border-l-violet-500 dark:border-l-violet-400',
      pill: 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 border-violet-500/20',
      gradient: 'from-violet-500/10 via-purple-500/5 to-surface-50 dark:from-violet-950/20 dark:via-purple-950/10 dark:to-surface-950',
      glow: 'shadow-violet-500/5'
    },
    difficulty: 'Easy-Medium',
    package: '3.5 - 6.5 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '15-20%',
      employees: '250k+',
      roleType: 'Elite NTH / Turbo'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% in B.Tech, 10th, and 12th',
      backlogs: 'Maximum 1 active backlog allowed at the time of recruitment',
      gaps: 'Up to 3 years of academic gap is permissible',
      branches: 'BE, B.Tech, ME, M.Tech, MCA, M.Sc (Integrated CS/IT)'
    },
    hiringProcess: [
      { round: 'Round 1: Wipro Elite NTH Test', description: 'Aptitude sections (Quantitative, Logical, Verbal), Written English test (Essay Writing), and a Coding section (2 questions).' },
      { round: 'Round 2: Technical Interview', description: 'Covers core programming logic, basic data structures (Stack, Queue), SQL syntax, and resume projects.' },
      { round: 'Round 3: HR Round', description: 'Assesses document checks, location preferences, relocation flexibility, and communication skills.' }
    ],
    technicalTopics: ['OOP', 'DSA', 'DBMS', 'SQL'],
    aptitudeTopics: ['Essay Writing', 'Aptitude', 'Logical Reasoning'],
    questions: [
      {
        q: 'Write a program to find the factorial of a number using recursion.',
        a: 'The base case is: if n is 0 or 1, return 1. The recursive step is: return n multiplied by factorial of (n - 1).'
      },
      {
        q: 'What is SDLC? What is the difference between Waterfall and Agile models?',
        a: 'SDLC is a structured process to build software. Waterfall is a sequential model where each phase must finish before the next starts. Agile is an iterative model focusing on continuous integration and feedback through short sprints.'
      }
    ],
    tips: [
      'The automated essay grader checks grammar and punctuation; keep sentences short and correct.',
      'Prepare fundamental concepts of C/C++ or Java; Wipro technical rounds focus heavily on basics.',
      'Maintain clear documentation for all projects and certificates.'
    ]
  },
  cognizant: {
    id: 'cognizant',
    name: 'Cognizant',
    fullName: 'Cognizant Technology Solutions',
    type: 'service',
    description: 'A premier provider of IT, consulting, and business process outsourcing services globally.',
    industry: 'IT Services & Consulting',
    size: '350,000+ Employees',
    headquarters: 'Teaneck, New Jersey, USA',
    indiaPresence: 'Huge engineering centers in Chennai, Bangalore, Hyderabad, Pune, Kolkata, and Mumbai.',
    locations: ['Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Kolkata', 'Mumbai'],
    roles: ['Systems Engineer', 'Associate Software Engineer', 'Analyst'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-teal-600 dark:text-teal-400',
    theme: {
      from: 'from-teal-600 to-cyan-800',
      text: 'text-teal-500 dark:text-teal-400',
      bg: 'bg-teal-500/10 dark:bg-teal-500/5',
      border: 'border-teal-500/20 dark:border-teal-500/10',
      accent: 'border-l-teal-500 dark:border-l-teal-400',
      pill: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/20',
      gradient: 'from-teal-500/10 via-cyan-500/5 to-surface-50 dark:from-teal-950/20 dark:via-cyan-950/10 dark:to-surface-950',
      glow: 'shadow-teal-500/5'
    },
    difficulty: 'Medium',
    package: '4.0 - 8.5 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '15-22%',
      employees: '350k+',
      roleType: 'GenC / GenC Elevate / GenC Next'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% in B.Tech, 10th, and 12th',
      backlogs: 'Zero active backlogs allowed at the time of recruitment',
      gaps: 'Not more than 2 years of educational gap permitted',
      branches: 'CS, IT, ECE, EEE, EIE, MCA, M.Sc (CS/IT)'
    },
    hiringProcess: [
      { round: 'Round 1: Online Aptitude & Tech MCQ', description: 'Covers logical reasoning, quantitative aptitude, and core computer science MCQs.' },
      { round: 'Round 2: Coding Assessment', description: 'Solve 2 moderate difficulty coding questions (recursion, sorting, graphs, or matrices).' },
      { round: 'Round 3: Technical Interview', description: 'Checks core domain skills, relational database queries (SQL), OOPs, and project design.' },
      { round: 'Round 4: HR Interview', description: 'Verifies documents, communication checks, adaptability, and shift flexibilities.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'OS', 'SQL'],
    aptitudeTopics: ['Quantitative Aptitude', 'Logical Reasoning', 'Data Sufficiency'],
    questions: [
      {
        q: 'What is the difference between GET and POST HTTP methods?',
        a: 'GET requests parameters inside the URL path, are cached, and have length restrictions. POST requests send data inside the request body, are not cached, have no size limits, and are suitable for sensitive information.'
      },
      {
        q: 'What is a database JOIN? Explain the difference between INNER JOIN and LEFT JOIN.',
        a: 'INNER JOIN returns records that have matching values in both tables. LEFT JOIN returns all records from the left table, and the matched records from the right table, filling with NULL values on the right side if no match exists.'
      }
    ],
    tips: [
      'Ensure you practice writing SQL query syntax by hand; the interviewer will ask you to write queries.',
      'Be clear about your technical electives (e.g. if you mention Web Dev, know the CSS box model and Javascript variables).',
      'Explain your logic step-by-step during coding assessments rather than just writing the code.'
    ]
  },
  accenture: {
    id: 'accenture',
    name: 'Accenture',
    fullName: 'Accenture plc',
    type: 'service',
    description: 'A global professional services company with leading capabilities in digital, cloud, and security.',
    industry: 'Management Consulting & IT',
    size: '730,000+ Employees',
    headquarters: 'Dublin, Ireland',
    indiaPresence: 'Huge footprint in Bangalore, Hyderabad, Pune, Mumbai, Chennai, and Gurugram.',
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Chennai', 'Gurugram'],
    roles: ['Associate Software Engineer', 'Systems Engineer', 'Analyst'],
    cgpa: 6.5,
    cgpaRange: '6.5+',
    logoColor: 'text-amber-500 dark:text-amber-400',
    theme: {
      from: 'from-amber-500 to-orange-700',
      text: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-500/5',
      border: 'border-amber-500/20 dark:border-amber-500/10',
      accent: 'border-l-amber-500 dark:border-l-amber-400',
      pill: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/20',
      gradient: 'from-amber-500/10 via-orange-500/5 to-surface-50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-surface-950',
      glow: 'shadow-amber-500/5'
    },
    difficulty: 'Medium',
    package: '4.5 - 6.5 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '18-25%',
      employees: '730k+',
      roleType: 'ASE / FASE / Advanced App Associate'
    },
    eligibility: {
      cgpa: '6.5 CGPA or 65% minimum throughout academics',
      backlogs: 'Maximum 1 active backlog allowed during application',
      gaps: 'Not more than 1 year of academic gap is permissible',
      branches: 'Open to all engineering streams (CS, IT, ECE, EEE, Mechanical, Biotech, etc.)'
    },
    hiringProcess: [
      { round: 'Round 1: Cognitive & Technical Assessment', description: 'Covers English, Critical Reasoning, Abstract Reasoning, MS Office basics, and Network/Cloud basics (non-eliminator but combined score counts).' },
      { round: 'Round 2: Coding Assessment', description: 'Consists of 2 coding problems (Arrays, Strings, Matrices, Trees) to be solved within 45 minutes.' },
      { round: 'Round 3: Communication Assessment', description: 'Interactive AI-driven oral evaluation testing reading aloud, repeat sentences, conversations, and story retelling.' },
      { round: 'Round 4: Technical & HR Interview', description: 'Detailed review of projects, teamwork scenarios, basic coding concepts, and behavioral evaluations.' }
    ],
    technicalTopics: ['OOP', 'SQL', 'Git', 'Cloud Basics'],
    aptitudeTopics: ['Critical Reasoning', 'Abstract Reasoning', 'English Communication'],
    questions: [
      {
        q: 'What is Cloud Computing? What are the differences between IaaS, PaaS, and SaaS?',
        a: 'Cloud Computing is the delivery of computing services over the internet. IaaS provides raw storage/servers (e.g. AWS EC2). PaaS provides a framework to deploy apps (e.g. Heroku). SaaS delivers ready-to-use software applications (e.g. Gmail).'
      },
      {
        q: 'Explain polymorphism with a real-world software design scenario.',
        a: 'Polymorphism is the ability of an object to take on many forms. For example, a base class "Payment" has a method "process()". Subclasses like "CreditCardPayment" and "UPIPayment" override "process()" to implement their respective logics.'
      }
    ],
    tips: [
      'Practice pseudocode tracing; this contains logical bitwise operations which can be tricky.',
      'The Communication Assessment requires a quiet environment; speak loudly, clearly, and naturally.',
      'Be ready to discuss project team coordination, conflicts, and resolutions during the final interview.'
    ]
  },
  capgemini: {
    id: 'capgemini',
    name: 'Capgemini',
    fullName: 'Capgemini SE',
    type: 'service',
    description: 'A global leader in partnering with companies to transform and manage their business by harnessing technology.',
    industry: 'IT Services & Consulting',
    size: '350,000+ Employees',
    headquarters: 'Paris, France',
    indiaPresence: 'Huge campuses in Bangalore, Mumbai, Pune, Hyderabad, Gurgaon, Chennai, and Kolkata.',
    locations: ['Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Gurugram', 'Chennai', 'Kolkata'],
    roles: ['Associate Software Engineer', 'Analyst', 'Systems Engineer'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-blue-500 dark:text-blue-300',
    theme: {
      from: 'from-blue-500 to-indigo-900',
      text: 'text-blue-500 dark:text-blue-300',
      bg: 'bg-blue-500/10 dark:bg-blue-500/5',
      border: 'border-blue-500/20 dark:border-blue-500/10',
      accent: 'border-l-blue-500 dark:border-l-blue-300',
      pill: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-surface-50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-blue-500/5'
    },
    difficulty: 'Easy-Medium',
    package: '4.0 - 7.5 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '15-20%',
      employees: '350k+',
      roleType: 'Analyst / Senior Analyst'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% in B.Tech, 10th, and 12th',
      backlogs: 'Zero active backlogs at the time of joining',
      gaps: 'Not more than 1 year of academic gap is permissible',
      branches: 'CS, IT, ECE, EEE, EIE and related branches'
    },
    hiringProcess: [
      { round: 'Round 1: Pseudo-Code & English Test', description: 'Covers logical pseudocode flow questions, data structures, and grammatical proficiency.' },
      { round: 'Round 2: Game-Based & Behavioral Test', description: 'Interactive puzzle game rounds testing cognitive speed, memory, and logical pattern matching.' },
      { round: 'Round 3: Technical & HR Interview', description: 'Deep dive into object-oriented concepts, database joins, resume projects, and behavioral scenarios.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'Java', 'Python', 'C++'],
    aptitudeTopics: ['Logical Puzzles', 'Pseudocode Tracing', 'English Verbal'],
    questions: [
      {
        q: 'What is inheritance, and why do we use it in software programming?',
        a: 'Inheritance is a mechanism in OOP where a new class (subclass) inherits properties and behaviors from an existing class (superclass). It promotes code reusability and builds hierarchical relationships.'
      },
      {
        q: 'Write a query to find the second highest salary from an Employee table.',
        a: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);'
      }
    ],
    tips: [
      'The game-based cognitive tests require absolute focus; practice pattern recognition puzzles online.',
      'Pseudocode questions are based on basic C/C++ logical loops and recursive steps.',
      'Show positive energy and enthusiasm for digital transformation during the technical interview.'
    ]
  },
  techmahindra: {
    id: 'techmahindra',
    name: 'Tech Mahindra',
    fullName: 'Tech Mahindra Limited',
    type: 'service',
    description: 'An Indian multinational information technology services and consulting company, part of the Mahindra Group.',
    industry: 'IT Services & Consulting',
    size: '150,000+ Employees',
    headquarters: 'Pune, Maharashtra, India',
    indiaPresence: 'Offices in Pune, Bangalore, Hyderabad, Chennai, Mumbai, Noida, and Kolkata.',
    locations: ['Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Noida', 'Kolkata'],
    roles: ['Associate Software Engineer', 'Systems Engineer', 'Support Engineer'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-red-500 dark:text-red-400',
    theme: {
      from: 'from-red-500 to-rose-700',
      text: 'text-red-500 dark:text-red-400',
      bg: 'bg-red-500/10 dark:bg-red-500/5',
      border: 'border-red-500/20 dark:border-red-500/10',
      accent: 'border-l-red-500 dark:border-l-red-400',
      pill: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/20',
      gradient: 'from-red-500/10 via-rose-500/5 to-surface-50 dark:from-red-950/20 dark:via-rose-950/10 dark:to-surface-950',
      glow: 'shadow-red-500/5'
    },
    difficulty: 'Easy',
    package: '3.25 - 5.5 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '20-25%',
      employees: '150k+',
      roleType: 'Software Engineer Trainee'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% throughout B.Tech, 10th, and 12th',
      backlogs: 'Zero active backlogs allowed at the time of assessment',
      gaps: 'Max 1 year academic gap is allowed',
      branches: 'CS, IT, ECE, EEE, Telecom, MCA, MSc (CS)'
    },
    hiringProcess: [
      { round: 'Round 1: Cognitive and Technical MCQ', description: 'Covers logical reasoning, quantitative aptitude, verbal skills, and basic computer science questions.' },
      { round: 'Round 2: Coding Assessment', description: 'Includes 1 or 2 simple coding questions (string manipulation, logic checks).' },
      { round: 'Round 3: Technical and HR Interview', description: 'Discussion on projects, base algorithms, SQL database keys, and location preferences.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'SQL', 'C', 'Java'],
    aptitudeTopics: ['Aptitude', 'Logical Reasoning', 'Verbal Skills'],
    questions: [
      {
        q: 'What is a primary key constraint in SQL databases?',
        a: 'A primary key is a field that uniquely identifies each record in a table. It must contain unique values and cannot contain NULL values.'
      },
      {
        q: 'Explain the difference between call by value and call by reference.',
        a: 'In call by value, a copy of the actual parameter value is passed to the function; modifications do not affect original data. In call by reference, the address of the variable is passed; changes affect the original variable.'
      }
    ],
    tips: [
      'Focus heavily on basic aptitude calculations; speed is key here.',
      'Prepare basic explanations of all database schemas used in your college projects.',
      'Show flexibility regarding night shifts and office relocations.'
    ]
  },
  hcltech: {
    id: 'hcltech',
    name: 'HCLTech',
    fullName: 'HCL Technologies Limited',
    type: 'service',
    description: 'A next-generation global technology company helping enterprises re-imagine their businesses for the digital age.',
    industry: 'IT Services & Consulting',
    size: '220,000+ Employees',
    headquarters: 'Noida, Uttar Pradesh, India',
    indiaPresence: 'Large software campus in Noida, Chennai, Bangalore, Lucknow, Madurai, and Hyderabad.',
    locations: ['Noida', 'Chennai', 'Bangalore', 'Hyderabad', 'Mumbai'],
    roles: ['Systems Engineer', 'Graduate Engineer Trainee', 'Support Engineer', 'Data Analyst'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-indigo-600 dark:text-indigo-400',
    theme: {
      from: 'from-indigo-600 to-blue-700',
      text: 'text-indigo-500 dark:text-indigo-400',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/5',
      border: 'border-indigo-500/20 dark:border-indigo-500/10',
      accent: 'border-l-indigo-500 dark:border-l-indigo-400',
      pill: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-500/20',
      gradient: 'from-indigo-500/10 via-blue-500/5 to-surface-50 dark:from-indigo-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-indigo-500/5'
    },
    difficulty: 'Easy-Medium',
    package: '3.6 - 6.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '15-22%',
      employees: '220k+',
      roleType: 'Software Engineer / Graduate Trainee'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% in B.Tech, 10th, and 12th',
      backlogs: 'Zero active backlogs at the time of recruitment',
      gaps: 'Max 2 years academic gap permitted',
      branches: 'All engineering branches (CS, IT, ECE, EEE, Mechanical, Civil, etc.)'
    },
    hiringProcess: [
      { round: 'Round 1: Online Aptitude & Technical MCQ', description: 'Covers logical reasoning, quantitative skills, computer networks, and fundamental pseudocode.' },
      { round: 'Round 2: Technical Interview', description: 'Reviews core projects, basics of databases (SQL), operating systems (processes, threads), and memory.' },
      { round: 'Round 3: HR Interview', description: 'Assesses communication skills, behavioral aspects, career goals, and relocations.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Java', 'Python'],
    aptitudeTopics: ['Aptitude', 'Reasoning', 'Verbal Ability'],
    questions: [
      {
        q: 'What is a process and what is a thread?',
        a: 'A process is an executing instance of an application with its own memory space. A thread is a path of execution within a process; multiple threads share the same process memory space.'
      },
      {
        q: 'What is encapsulation in Object-Oriented Programming?',
        a: 'Encapsulation is the process of wrapping code and data together into a single unit (class) and hiding internal data details using private variables and public getter/setter methods.'
      }
    ],
    tips: [
      'Brush up on fundamental concepts of Computer Networks (TCP/IP model, OSI layers).',
      'Speak clearly in the HR round; they test your general communication proficiency.',
      'Have 2 basic programming codes (like palindrome check, factorial) fully memorized.'
    ]
  },
  ltimindtree: {
    id: 'ltimindtree',
    name: 'LTIMindtree',
    fullName: 'LTIMindtree Limited',
    type: 'service',
    description: 'A global technology consulting and digital solutions company, helping businesses optimize operations.',
    industry: 'IT Services & Consulting',
    size: '85,000+ Employees',
    headquarters: 'Mumbai, Maharashtra, India',
    indiaPresence: 'Engineering offices in Mumbai, Bangalore, Pune, Hyderabad, Chennai, and Kolkata.',
    locations: ['Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Analyst'],
    cgpa: 6.5,
    cgpaRange: '6.5+',
    logoColor: 'text-amber-600 dark:text-amber-400',
    theme: {
      from: 'from-amber-600 to-yellow-800',
      text: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-500/5',
      border: 'border-amber-500/20 dark:border-amber-500/10',
      accent: 'border-l-amber-500 dark:border-l-amber-400',
      pill: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/20',
      gradient: 'from-amber-500/10 via-yellow-500/5 to-surface-50 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-surface-950',
      glow: 'shadow-amber-500/5'
    },
    difficulty: 'Medium',
    package: '4.0 - 8.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '12-18%',
      employees: '85k+',
      roleType: 'ASE / Graduate Engineer'
    },
    eligibility: {
      cgpa: '6.5 CGPA or 65% minimum throughout B.Tech',
      backlogs: 'Zero active backlogs allowed during recruitment',
      gaps: 'Max 1 year of academic gap is permissible',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE, Telecom, MCA'
    },
    hiringProcess: [
      { round: 'Round 1: Cognitive, Technical & Coding Assessment', description: 'Covers logical reasoning, quantitative analysis, pseudocode, computer networks, and 2 programming questions.' },
      { round: 'Round 2: Technical Interview', description: 'Checks object-oriented concepts, data structures (linked list, trees), SQL queries, and system architectures.' },
      { round: 'Round 3: HR & Management Interview', description: 'Soft skills check, career goals, shift availability, and relocation verification.' }
    ],
    technicalTopics: ['OOP', 'DSA', 'DBMS', 'SQL', 'Computer Networks', 'Java', 'C++'],
    aptitudeTopics: ['Quantitative Analysis', 'Logical reasoning', 'Pseudocode Debugging'],
    questions: [
      {
        q: 'How does a stack differ from a queue data structure?',
        a: 'A stack operates on a LIFO (Last In First Out) basis, where insertion and deletion occur at the same end. A queue operates on a FIFO (First In First Out) basis, where insertion occurs at the rear and deletion at the front.'
      },
      {
        q: 'What is database normalization, and why is it important?',
        a: 'Database normalization is the process of organizing data tables to reduce redundancy and improve data integrity. It splits large tables into smaller related tables and creates relationships between them.'
      }
    ],
    tips: [
      'Focus on basic database tables; LTIMindtree interviewers frequently ask you to write joins.',
      'Be ready to explain the logic of your code and trace variable states step by step.',
      'Be clear about your final year project framework and tools used.'
    ]
  },
  deloitte: {
    id: 'deloitte',
    name: 'Deloitte',
    fullName: 'Deloitte Touche Tohmatsu Limited',
    type: 'service',
    description: 'One of the "Big Four" global accounting and consulting firms, offering audit, tax, consulting, and advisory services.',
    industry: 'Management Consulting & Advisory',
    size: '415,000+ Employees',
    headquarters: 'London, United Kingdom',
    indiaPresence: 'Huge advisory offices in Hyderabad, Bangalore, Mumbai, Gurgaon, Pune, and Chennai.',
    locations: ['Hyderabad', 'Bangalore', 'Mumbai', 'Gurugram', 'Pune', 'Chennai'],
    roles: ['Analyst', 'Data Analyst', 'Associate Software Engineer'],
    cgpa: 6.5,
    cgpaRange: '6.5+',
    logoColor: 'text-green-600 dark:text-green-400',
    theme: {
      from: 'from-green-600 to-emerald-800',
      text: 'text-green-500 dark:text-green-400',
      bg: 'bg-green-500/10 dark:bg-green-500/5',
      border: 'border-green-500/20 dark:border-green-500/10',
      accent: 'border-l-green-500 dark:border-l-green-400',
      pill: 'bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-300 border-green-500/20',
      gradient: 'from-green-500/10 via-emerald-500/5 to-surface-50 dark:from-green-950/20 dark:via-emerald-950/10 dark:to-surface-950',
      glow: 'shadow-green-500/5'
    },
    difficulty: 'Medium',
    package: '4.5 - 8.5 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '10-15%',
      employees: '415k+',
      roleType: 'Consulting Analyst / Advisory'
    },
    eligibility: {
      cgpa: '6.5 CGPA or 65% minimum throughout B.Tech and academics',
      backlogs: 'Zero active backlogs allowed during recruitment',
      gaps: 'No specific restrictions, but gaps must be justified',
      branches: 'BE, B.Tech, ME, M.Tech, MCA, MBA (all branches eligible depending on role)'
    },
    hiringProcess: [
      { round: 'Round 1: Deloitte Aptitude & English Assessment', description: 'Hosted on platforms like AMCAT, testing Logical Reasoning, Quantitative Ability, and Business English.' },
      { round: 'Round 2: Group Discussion / Case Study', description: 'Assesses business problem-solving logic, communication skills, and collaborative reasoning.' },
      { round: 'Round 3: Technical & HR Interview', description: 'Discussion on project designs, basic DBMS/SQL commands, coding logic, and situational judgment questions.' }
    ],
    technicalTopics: ['DBMS', 'SQL', 'Data Analyst', 'Java', 'Python', 'OOP'],
    aptitudeTopics: ['Aptitude', 'Business Cases', 'Verbal Communication'],
    questions: [
      {
        q: 'Write a SQL query to find duplicate rows in an Employee table.',
        a: 'SELECT email, COUNT(email) FROM Employee GROUP BY email HAVING COUNT(email) > 1;'
      },
      {
        q: 'What is a SQL View, and when would you use it?',
        a: 'A View is a virtual table based on the result-set of an SQL statement. It is used to simplify complex queries, enforce security controls, and isolate data structures from applications.'
      }
    ],
    tips: [
      'Deloitte values communication and presentation skills extremely highly; practice public speaking and structured debates.',
      'Be highly prepared for situational logic or case-study questions in the interview.',
      'Brush up on fundamental data analysis keywords (pivot tables, aggregations, database joins).'
    ]
  },
  ibm_india: {
    id: 'ibm_india',
    name: 'IBM India',
    fullName: 'IBM India Private Limited',
    type: 'service',
    description: 'The Indian subsidiary of IBM, offering technology services, system engineering, and research.',
    industry: 'Technology & Cloud Consulting',
    size: '100,000+ Employees in India',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Huge software laboratories in Bangalore, Kochi, Hyderabad, Pune, Mumbai, Gurgaon, and Noida.',
    locations: ['Bangalore', 'Kochi', 'Hyderabad', 'Pune', 'Mumbai', 'Gurugram', 'Noida'],
    roles: ['Associate Software Engineer', 'Systems Engineer', 'Data Analyst', 'Support Engineer'],
    cgpa: 6.5,
    cgpaRange: '6.5+',
    logoColor: 'text-blue-700 dark:text-blue-400',
    theme: {
      from: 'from-blue-700 to-indigo-800',
      text: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-500/10 dark:bg-blue-500/5',
      border: 'border-blue-500/20 dark:border-blue-500/10',
      accent: 'border-l-blue-500 dark:border-l-blue-400',
      pill: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-surface-50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-blue-500/5'
    },
    difficulty: 'Medium',
    package: '4.5 - 9.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '10-15%',
      employees: '100k+ in India',
      roleType: 'Associate System Engineer / Developer'
    },
    eligibility: {
      cgpa: '6.5 CGPA or 65% minimum. No active backlogs.',
      backlogs: 'Zero active backlogs at the time of recruitment.',
      gaps: 'Max 1 year academic gap is allowed.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA in CS, IT, ECE, EEE and related streams.'
    },
    hiringProcess: [
      { round: 'Round 1: Cognitive Ability & English Assessment', description: 'Covers logical games, verbal ability, and mathematical calculations.' },
      { round: 'Round 2: Coding Assessment', description: 'Consists of 1 coding problem (Arrays/Strings) to be solved within 30 minutes.' },
      { round: 'Round 3: Technical & HR Interview', description: 'Covers object-oriented logic, data structures, SQL commands, cloud concepts, and resume projects.' }
    ],
    technicalTopics: ['OOP', 'DSA', 'DBMS', 'SQL', 'Operating Systems', 'Computer Networks'],
    aptitudeTopics: ['Cognitive Games', 'Quantitative Skills', 'Verbal Communication'],
    questions: [
      {
        q: 'What is a constructor in object-oriented programming, and what is its purpose?',
        a: 'A constructor is a special method used to initialize objects of a class. It is called automatically when an object is created and usually shares the same name as the class.'
      },
      {
        q: 'Explain the difference between local storage and session storage in browsers.',
        a: 'Local storage persists data indefinitely until explicitly cleared. Session storage holds data only for the duration of the browser tab session, clearing automatically when tab is closed.'
      }
    ],
    tips: [
      'Focus on basic database tables; IBM interviewers check fundamental queries.',
      'Be clear about your final year project architecture and your contribution.',
      'Prepare fundamental concepts of Computer Networks and Cloud (IaaS, PaaS, SaaS).'
    ]
  },
  dxc_technology: {
    id: 'dxc_technology',
    name: 'DXC Technology',
    fullName: 'DXC Technology Company',
    type: 'service',
    description: 'An American multinational information technology services and consulting company.',
    industry: 'IT Services & Consulting',
    size: '130,000+ Employees',
    headquarters: 'Ashburn, Virginia, USA',
    indiaPresence: 'Engineering locations in Bangalore, Chennai, Hyderabad, Noida, Pune, Mumbai, and Kolkata.',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Noida', 'Pune', 'Mumbai', 'Kolkata'],
    roles: ['Associate Software Engineer', 'Graduate Engineer Trainee', 'Support Engineer'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-purple-600 dark:text-purple-400',
    theme: {
      from: 'from-purple-600 to-indigo-800',
      text: 'text-purple-500 dark:text-purple-400',
      bg: 'bg-purple-500/10 dark:bg-purple-500/5',
      border: 'border-purple-500/20 dark:border-purple-500/10',
      accent: 'border-l-purple-500 dark:border-l-purple-400',
      pill: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/20',
      gradient: 'from-purple-500/10 via-indigo-500/5 to-surface-50 dark:from-purple-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-purple-500/5'
    },
    difficulty: 'Easy',
    package: '3.4 - 5.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '20-25%',
      employees: '130k+',
      roleType: 'Software Associate'
    },
    eligibility: {
      cgpa: '6.0 CGPA or 60% throughout academics',
      backlogs: 'Zero active backlogs at the time of recruitment',
      gaps: 'Max 2 years educational gap permissible',
      branches: 'BE, B.Tech, MCA, MSc (CS/IT)'
    },
    hiringProcess: [
      { round: 'Round 1: DXC AMCAT Assessment', description: 'Covers Quantitative Aptitude, Logical Reasoning, Verbal English, and Computer Programming MCQs.' },
      { round: 'Round 2: Technical Interview', description: 'Discussion on basic programming logic, SQL queries, OOPs concepts, and resume verification.' },
      { round: 'Round 3: HR Interview', description: 'Behavioral checks, career goals, shift availability, and document checks.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'SQL', 'Java', 'C++'],
    aptitudeTopics: ['Aptitude', 'Logical Reasoning', 'Verbal English'],
    questions: [
      {
        q: 'What is method overloading and method overriding in OOP?',
        a: 'Method overloading occurs when multiple methods in the same class share the same name but have different parameters (compile-time polymorphism). Method overriding occurs when a subclass provides a specific implementation for a method declared in its superclass (run-time polymorphism).'
      },
      {
        q: 'Write a program to reverse a number in Java/C++.',
        a: 'Extract digits one by one using modulo (%) 10, multiply the reverse variable by 10 and add the extracted digit, then divide the number by 10. Repeat until number becomes 0.'
      }
    ],
    tips: [
      'AMCAT test platform questions get harder with correct answers; maintain accuracy over speed.',
      'Be very confident about basic technical terms in OOPs and DBMS.',
      'Show adaptability regarding relocations and rotational shifts.'
    ]
  },

  // PRODUCT-BASED COMPANIES
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    fullName: 'Microsoft Corporation',
    type: 'product',
    description: 'A pioneer in personal computing and cloud computing (Azure), hiring software engineers for core systems and cloud services.',
    industry: 'Technology / Cloud / Software',
    size: '220,000+ Employees',
    headquarters: 'Redmond, Washington, USA',
    indiaPresence: 'Major R&D centers in Hyderabad, Bangalore, and Noida.',
    locations: ['Hyderabad', 'Bangalore', 'Noida'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-indigo-650 dark:text-indigo-400',
    theme: {
      from: 'from-indigo-600 to-sky-800',
      text: 'text-indigo-500 dark:text-indigo-400',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/5',
      border: 'border-indigo-500/20 dark:border-indigo-500/10',
      accent: 'border-l-indigo-500 dark:border-l-indigo-400',
      pill: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-500/20',
      gradient: 'from-indigo-500/10 via-sky-500/5 to-surface-50 dark:from-indigo-950/20 dark:via-sky-950/10 dark:to-surface-950',
      glow: 'shadow-indigo-500/5'
    },
    difficulty: 'Hard',
    package: '12.0 - 40.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '220k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% minimum. No active backlogs.',
      backlogs: 'Zero active backlogs allowed during recruitment.',
      gaps: 'Up to 1 year of academic gap is permissible.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA, M.Sc (CS/IT/ECE).'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Usually hosted on Codility, consisting of 2-3 coding problems (medium difficulty) focused on array manipulation, logic, and efficiency.' },
      { round: 'Round 2: Technical Interview - Coding & Design fundamentals', description: 'Review of coding test solutions, deep dive into algorithms, and design questions like hash maps, memory allocation, or file parsing.' },
      { round: 'Round 3: Advanced Technical Interview', description: 'Algorithmic problems on Trees, Graphs, Backtracking, and low-level system architecture concepts.' },
      { round: 'Round 4: Technical & Cultural Alignment (AA Round)', description: 'Conducted by a senior manager (As-Appropriate interviewer) to evaluate problem-solving process, engineering values, and collaboration.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'OS', 'Computer Networks', 'Java', 'Python', 'C++'],
    aptitudeTopics: ['Logical Reasoning', 'Pattern Recognition'],
    questions: [
      {
        q: 'How do you detect a cycle in a linked list, and how do you find the starting node of the cycle?',
        a: 'Use Floyd\'s Cycle Detection (Tortoise and Hare algorithm). Set two pointers, slow (1 step) and fast (2 steps). If they meet, a cycle exists. To find the start node, reset slow pointer to head, keep fast pointer at meeting point, and move both 1 step at a time; their meeting point is the start of the cycle.'
      },
      {
        q: 'What is a deadlock? What are the four necessary conditions for a deadlock to occur?',
        a: 'A deadlock is a state where a set of threads are blocked because each holds a resource and waits for another resource held by another thread. The conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.'
      }
    ],
    tips: [
      'Microsoft focuses heavily on writing extremely clean, production-grade code. Write readable variables, check boundary cases (NULL, overflow), and modularize.',
      'Be highly communicative; explain your design choices aloud as you write them on the board.',
      'Practice questions related to Trees, Bit manipulation, and recursion, which are popular in Microsoft rounds.'
    ]
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    fullName: 'Amazon.com, Inc.',
    type: 'product',
    description: 'A global technology giant focusing on e-commerce, cloud computing (AWS), and digital streaming.',
    industry: 'E-commerce & Cloud Computing',
    size: '1,500,000+ Employees',
    headquarters: 'Seattle, Washington, USA',
    indiaPresence: 'Huge corporate offices in Hyderabad, Bangalore, Chennai, Delhi NCR, and Pune.',
    locations: ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Pune'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst', 'Support Engineer'],
    cgpa: 6.5,
    cgpaRange: '6.5+',
    logoColor: 'text-orange-500 dark:text-orange-400',
    theme: {
      from: 'from-orange-500 to-amber-700',
      text: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-500/10 dark:bg-orange-500/5',
      border: 'border-orange-500/20 dark:border-orange-500/10',
      accent: 'border-l-orange-500 dark:border-l-orange-400',
      pill: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border-orange-500/20',
      gradient: 'from-orange-500/10 via-amber-500/5 to-surface-50 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-surface-950',
      glow: 'shadow-orange-500/5'
    },
    difficulty: 'Hard',
    package: '12.0 - 45.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-5%',
      employees: '1.5M+',
      roleType: 'SDE-1 / Software Dev Engineer'
    },
    eligibility: {
      cgpa: '6.5 CGPA or 65% minimum. No active backlogs.',
      backlogs: 'Zero active backlogs allowed during recruitment.',
      gaps: 'Not more than 1 year of academic gap is preferred.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA, M.Sc (CS/IT/ECE).'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Assessment (OA)', description: 'Consists of 2 coding problems (medium to hard) and an explanation of approach, plus work style/behavioral questions.' },
      { round: 'Round 2: Technical Interview - DS & Algorithmic Problem Solving', description: 'Deep dive into coding problems focusing on Trees, Graphs, Dynamic Programming, and Heap data structures.' },
      { round: 'Round 3: System Design / Logical & Object-Oriented Design', description: 'Focuses on designing scalable systems (like an URL shortener, parking lot, or reservation system) and writing clean code.' },
      { round: 'Round 4: Bar Raiser Interview (Technical + Leadership)', description: 'Rigorous assessment testing technical skills and deep alignment with Amazon\'s 16 Leadership Principles.' }
    ],
    technicalTopics: ['DSA', 'System Design Basics', 'Java', 'Python', 'C++', 'SQL', 'OOP', 'DBMS'],
    aptitudeTopics: ['Behavioral Questions', 'Work Style Assessment', 'Aptitude'],
    questions: [
      {
        q: 'How would you find the longest path between any two nodes in a binary tree (Diameter of a Binary Tree)?',
        a: 'Use a post-order traversal function. For each node, calculate the height of its left and right subtrees. The diameter through the current node is (left_height + right_height). Recursively return (1 + max(left_height, right_height)) to calculate height, updating a global maximum diameter variable at each node.'
      },
      {
        q: 'Explain Amazon\'s leadership principle "Customer Obsession" and how you have applied it in a project.',
        a: 'Customer Obsession means starting with the customer and working backward. Describe a project where you gathered user feedback, identified a friction point, prioritized fixing that, and measured the positive impact.'
      }
    ],
    tips: [
      'Every interview round has at least 50% weight on Amazon\'s 16 Leadership Principles; frame all behavioral answers around them using STAR.',
      'Be extremely proficient in explaining time and space complexity (Big O) for every line of code you write.',
      'Focus on scalable system design basics; know when to partition databases and how to use message queues.'
    ]
  },
  google: {
    id: 'google',
    name: 'Google',
    fullName: 'Google LLC',
    type: 'product',
    description: 'A global technology giant focusing on search engine technology, online advertising, cloud computing, and computer software.',
    industry: 'Technology / Cloud / Software',
    size: '150,000+ Employees',
    headquarters: 'Mountain View, California, USA',
    indiaPresence: 'Major software development centers in Bangalore, Hyderabad, Pune, and Gurugram.',
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Gurugram'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 8.0,
    cgpaRange: '8.0+',
    logoColor: 'text-red-500 dark:text-red-400',
    theme: {
      from: 'from-red-500 via-yellow-500 to-blue-600',
      text: 'text-red-500 dark:text-red-400',
      bg: 'bg-red-500/10 dark:bg-red-500/5',
      border: 'border-red-500/20 dark:border-red-500/10',
      accent: 'border-l-red-500 dark:border-l-red-400',
      pill: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/20',
      gradient: 'from-red-500/10 via-blue-500/5 to-surface-50 dark:from-red-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-red-500/5'
    },
    difficulty: 'Hard',
    package: '18.0 - 50.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '1-3%',
      employees: '150k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '8.0+ CGPA with no active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Not more than 1 year of academic gap.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA, Dual Degree (CS/IT/ECE/Maths).'
    },
    hiringProcess: [
      { round: 'Round 1: Online Assessment (OA)', description: 'Consists of 2 complex coding questions based on Advanced Data Structures and Algorithms.' },
      { round: 'Round 2: Technical Interview 1 (DSA)', description: 'Deep dive into graph theory, dynamic programming, and complexity bounds optimization.' },
      { round: 'Round 3: Technical Interview 2 (System Design / DSA)', description: 'System design fundamentals or object-oriented design patterns, along with a coding problem.' },
      { round: 'Round 4: Googleyness & Leadership Round', description: 'Behavioral assessments testing alignment with Google\'s core principles, communication, and work culture.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Java', 'Python', 'C++'],
    aptitudeTopics: ['Logical Reasoning', 'Quantitative Aptitude'],
    questions: [
      {
        q: 'How do you find the median of a running stream of integers?',
        a: 'Use a Max-Heap and a Min-Heap. The Max-Heap stores the lower half of the numbers, and the Min-Heap stores the upper half. Balance the heaps so their sizes differ by at most 1. The median is either the root of the larger heap, or the average of both roots if sizes are equal.'
      },
      {
        q: 'What is a B-Tree and how is it used in relational databases?',
        a: 'A B-Tree is a self-balancing search tree that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. It is optimized for databases that read and write large blocks of data.'
      }
    ],
    tips: [
      'Focus heavily on graphs, trees, and dynamic programming. Google interviews are known for strict algorithm optimization checks.',
      'Always talk out loud while coding. The interviewer is assessing your thinking process and how you handle constraints.',
      'Be highly prepared to write clean code on a whiteboard or shared document without syntax highlighting.'
    ]
  },
  oracle: {
    id: 'oracle',
    name: 'Oracle',
    fullName: 'Oracle Financial Services Software',
    type: 'product',
    description: 'A global computer technology corporation known for its database software and technology, cloud engineered systems, and enterprise software products.',
    industry: 'Enterprise Software & Database',
    size: '140,000+ Employees',
    headquarters: 'Austin, Texas, USA',
    indiaPresence: 'Large software engineering units in Bangalore, Hyderabad, Pune, Noida, and Mumbai.',
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Noida', 'Mumbai'],
    roles: ['Software Developer', 'Associate Software Engineer', 'Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-rose-600 dark:text-rose-400',
    theme: {
      from: 'from-rose-600 to-red-800',
      text: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/10 dark:bg-rose-500/5',
      border: 'border-rose-500/20 dark:border-rose-500/10',
      accent: 'border-l-rose-500 dark:border-l-rose-400',
      pill: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/20',
      gradient: 'from-rose-500/10 via-red-500/5 to-surface-50 dark:from-rose-950/20 dark:via-red-950/10 dark:to-surface-950',
      glow: 'shadow-rose-500/5'
    },
    difficulty: 'Medium-Hard',
    package: '8.0 - 18.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '5-10%',
      employees: '140k+',
      roleType: 'Member Technical Staff'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs at the time of recruitment.',
      gaps: 'Max 1 year educational gap permissible.',
      branches: 'BE, B.Tech, MCA, MSc (CS/IT/ECE)'
    },
    hiringProcess: [
      { round: 'Round 1: Oracle Online Test', description: 'Covers Quantitative Aptitude, Verbal, Logical, SQL queries, and core computer science concepts (OS, Networks, DSA).' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep dive into databases (normalization, transactions, indexes, SQL coding), OOPs, and basic data structures.' },
      { round: 'Round 3: Technical Interview 2 & HR', description: 'Coding questions, project design discussions, system structures, and final behavioral review.' }
    ],
    technicalTopics: ['DBMS', 'SQL', 'OOP', 'DSA', 'Operating Systems', 'Computer Networks', 'Java'],
    aptitudeTopics: ['Aptitude', 'Logical Reasoning', 'CS Core Theory'],
    questions: [
      {
        q: 'What is the difference between Clustered and Non-Clustered Indexes?',
        a: 'A Clustered Index determines the physical order of data in a table; there can be only one clustered index. A Non-Clustered Index contains pointers to the physical rows, stored separately from the data; multiple non-clustered indexes are allowed.'
      },
      {
        q: 'Explain the concept of method overloading and method overriding in Java.',
        a: 'Overloading (compile-time) happens when methods in the same class have the same name but different parameters. Overriding (runtime) occurs when a subclass provides a specific implementation for a method declared in its parent class.'
      }
    ],
    tips: [
      'Oracle interviews focus heavily on Database Management Systems (DBMS) and SQL. Know SQL queries inside out.',
      'Be highly prepared to write database schemas and queries on a shared editor.',
      'Revise operating systems concepts like paging, virtual memory, and process synchronizations.'
    ]
  },
  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    fullName: 'Salesforce, Inc.',
    type: 'product',
    description: 'A global cloud computing company known for its CRM (Customer Relationship Management) products, hiring software engineers for cloud products and platform scaling.',
    industry: 'CRM & Cloud Computing',
    size: '80,000+ Employees',
    headquarters: 'San Francisco, California, USA',
    indiaPresence: 'Large development centers in Hyderabad and Bangalore.',
    locations: ['Hyderabad', 'Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-sky-500 dark:text-sky-450',
    theme: {
      from: 'from-sky-500 to-blue-700',
      text: 'text-sky-500 dark:text-sky-450',
      bg: 'bg-sky-500/10 dark:bg-sky-500/5',
      border: 'border-sky-500/20 dark:border-sky-500/10',
      accent: 'border-l-sky-500 dark:border-l-sky-400',
      pill: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/20',
      gradient: 'from-sky-500/10 via-blue-500/5 to-surface-50 dark:from-sky-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-sky-500/5'
    },
    difficulty: 'Hard',
    package: '15.0 - 36.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-5%',
      employees: '80k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Salesforce cultural values (Trust, Success, Innovation).' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to find the lowest common ancestor (LCA) in a Binary Tree.',
        a: 'Recursively search the left and right subtrees. If a node matches target p or q, return it. If both left and right searches return non-null, the current node is the LCA. Otherwise, return the non-null result from left or right.'
      },
      {
        q: 'What is a RESTful API? What are its primary design constraints?',
        a: 'A RESTful API is an architectural style for network requests. Design constraints include: Client-Server architecture, Statelessness, Cacheability, Uniform Interface, and Layered System.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Align your answers with Salesforce principles like Innovation, Equal Opportunity, and Customer Success.'
    ]
  },
  adobe: {
    id: 'adobe',
    name: 'Adobe',
    fullName: 'Adobe Systems India Private Limited',
    type: 'product',
    description: 'A global leader in creative software and digital experiences, hiring software developers for creative applications and cloud platform services.',
    industry: 'Software & Digital Media',
    size: '30,000+ Employees',
    headquarters: 'San Jose, California, USA',
    indiaPresence: 'Large development campuses in Noida and Bangalore.',
    locations: ['Noida', 'Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-red-600 dark:text-red-400',
    theme: {
      from: 'from-red-600 to-rose-800',
      text: 'text-red-650 dark:text-red-400',
      bg: 'bg-red-500/10 dark:bg-red-500/5',
      border: 'border-red-500/20 dark:border-red-500/10',
      accent: 'border-l-red-500 dark:border-l-red-400',
      pill: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/20',
      gradient: 'from-red-500/10 via-rose-500/5 to-surface-50 dark:from-red-950/20 dark:via-rose-950/10 dark:to-surface-950',
      glow: 'shadow-red-500/5'
    },
    difficulty: 'Hard',
    package: '14.0 - 42.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-4%',
      employees: '30k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs at the time of recruitment.',
      gaps: 'Max 1 year educational gap permissible.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA in CS, IT, Electronics.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Hosted on HackerRank, consists of 3-4 coding questions (medium to hard) and CS theory questions.' },
      { round: 'Round 2: Technical Interview 1', description: 'Checks core coding logic, sorting algorithms, memory allocation, and OS processes.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced graph algorithms, data structures (heaps, trees), and Low-Level Design (LLD).' },
      { round: 'Round 4: Hiring Manager & HR Round', description: 'Focuses on architectural decisions, past project hurdles, behavioral check, and relocation.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'Operating Systems', 'Computer Networks', 'Java', 'Python', 'C++'],
    aptitudeTopics: ['Logical Reasoning', 'Mathematical Aptitude'],
    questions: [
      {
        q: 'Write a program to solve the Knight\'s Tour problem on a chessboard.',
        a: 'This is a backtracking problem. Create a recursive utility to move the knight to all possible squares. If a valid path visits all squares exactly once, return true. Otherwise, backtrack by resetting the cell value.'
      },
      {
        q: 'What is virtual memory? How is page replacement handled in operating systems?',
        a: 'Virtual memory is a memory management technique that allows execution of processes that are not completely in physical memory. Page replacement algorithms (FIFO, LRU, Optimal) determine which memory pages to swap out when new memory blocks must be allocated.'
      }
    ],
    tips: [
      'Adobe tests heavy programming and mathematical logic. Focus on recursion, backtracking, and complexity bounds.',
      'Be highly proficient with object-oriented design and writing design patterns (like Singleton, Factory).',
      'Explain your algorithm optimizations (e.g. from O(N^2) to O(N log N)) clearly during coding rounds.'
    ]
  },
  cisco: {
    id: 'cisco',
    name: 'Cisco',
    fullName: 'Cisco Systems, Inc.',
    type: 'product',
    description: 'A global technology leader in networking, security, and cloud collaborations, hiring engineers for network software and cloud stacks.',
    industry: 'Computer Networking & Security',
    size: '80,000+ Employees',
    headquarters: 'San Jose, California, USA',
    indiaPresence: 'Large engineering campus in Bangalore.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Support Engineer'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-cyan-600 dark:text-cyan-400',
    theme: {
      from: 'from-cyan-600 to-blue-800',
      text: 'text-cyan-500 dark:text-cyan-400',
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/5',
      border: 'border-cyan-500/20 dark:border-cyan-500/10',
      accent: 'border-l-cyan-500 dark:border-l-cyan-400',
      pill: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/20',
      gradient: 'from-cyan-500/10 via-blue-500/5 to-surface-50 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-cyan-500/5'
    },
    difficulty: 'Medium-Hard',
    package: '10.0 - 24.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '5-8%',
      employees: '80k+',
      roleType: 'Software Engineer / NetAcad Trainee'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap is permissible.',
      branches: 'CS, IT, ECE, EEE, Telecom and related branches.'
    },
    hiringProcess: [
      { round: 'Round 1: Cisco Online Test', description: 'Covers Aptitude, Logical Reasoning, Computer Networks (crucial), and 2 coding questions.' },
      { round: 'Round 2: Technical Interview', description: 'Heavy focus on network protocols (TCP/UDP, routing, DNS, subnetting), Operating Systems (multithreading), and OOPs.' },
      { round: 'Round 3: HR & Managerial Round', description: 'Assesses project alignment, collaboration, soft skills, and location configurations.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'Operating Systems', 'Computer Networks', 'Git', 'Java', 'Python', 'C++'],
    aptitudeTopics: ['Aptitude', 'Networking concepts'],
    questions: [
      {
        q: 'What is the difference between TCP and UDP? Give real-world application examples.',
        a: 'TCP is connection-oriented, reliable, orders packets, and performs flow control (e.g. HTTP, Email). UDP is connectionless, fast, unreliable, and has no flow control (e.g. DNS, Live Video Streaming).'
      },
      {
        q: 'What is Subnetting and how is a subnet mask used?',
        a: 'Subnetting is the practice of dividing a network into smaller, manageable subnetworks. A subnet mask hides the host part of an IP address, separating it into network address and host address bits.'
      }
    ],
    tips: [
      'You MUST know computer networking protocols inside out. Cisco interviews depend heavily on routing, socket connections, and TCP protocols.',
      'Be highly prepared to explain your resume projects and the network configurations used in them.',
      'Practice writing simple coding solutions (e.g., checks, reversing lists) under time constraints.'
    ]
  },
  sap: {
    id: 'sap',
    name: 'SAP',
    fullName: 'SAP SE',
    type: 'product',
    description: 'A German multinational software corporation that develops enterprise software to manage business operations and customer relations.',
    industry: 'Enterprise Software & ERP',
    size: '110,000+ Employees',
    headquarters: 'Walldorf, Germany',
    indiaPresence: 'Huge development labs in Bangalore, Pune, and Mumbai.',
    locations: ['Bangalore', 'Pune', 'Mumbai'],
    roles: ['Software Developer', 'Associate Software Engineer', 'Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-blue-700 dark:text-blue-400',
    theme: {
      from: 'from-blue-700 to-indigo-800',
      text: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-500/10 dark:bg-blue-500/5',
      border: 'border-blue-500/20 dark:border-blue-500/10',
      accent: 'border-l-blue-500 dark:border-l-blue-400',
      pill: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-surface-50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-blue-500/5'
    },
    difficulty: 'Medium-Hard',
    package: '8.0 - 20.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '5-8%',
      employees: '110k+',
      roleType: 'Developer Associate'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% minimum. No active backlogs.',
      backlogs: 'Zero active backlogs allowed during recruitment.',
      gaps: 'Max 1 year educational gap permissible.',
      branches: 'BE, B.Tech, ME, M.Tech, MCA in CS, IT, Electronics.'
    },
    hiringProcess: [
      { round: 'Round 1: SAP Online Assessment', description: 'Covers Quantitative Aptitude, Logical Reasoning, and 2 coding questions (HackerRank).' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on object-oriented programming (C++ or Java), databases (SQL Joins, ACID), and core coding logic.' },
      { round: 'Round 3: Technical & HR Round 2', description: 'Discussion on final year project, system design basics, teamwork, and relocation flexibility.' }
    ],
    technicalTopics: ['OOP', 'DBMS', 'SQL', 'DSA', 'Operating Systems', 'Java', 'Python'],
    aptitudeTopics: ['Aptitude', 'Logical Reasoning'],
    questions: [
      {
        q: 'What is runtime polymorphism and how is it implemented in Java/C++?',
        a: 'Runtime polymorphism (method overriding) occurs when a call to an overridden method is resolved at runtime rather than compile-time. It is achieved using inheritances and virtual functions.'
      },
      {
        q: 'What is database normalization? Describe 1NF, 2NF, and 3NF.',
        a: 'Normalization is the process of organizing database tables to reduce redundancy. 1NF removes duplicate columns and ensures atomic values. 2NF meets 1NF and removes partial dependencies. 3NF meets 2NF and removes transitive dependencies.'
      }
    ],
    tips: [
      'Focus heavily on database tables and writing SQL commands during coding screens.',
      'Explain your logic step-by-step during coding assessments.',
      'Be very clear about project architectures and ERP systems if you have done any courses.'
    ]
  },
  servicenow: {
    id: 'servicenow',
    name: 'ServiceNow',
    fullName: 'ServiceNow, Inc.',
    type: 'product',
    description: 'A software company that provides a cloud computing platform to help companies manage digital workflows for enterprise operations.',
    industry: 'Enterprise Cloud & Digital Workflows',
    size: '22,000+ Employees',
    headquarters: 'Santa Clara, California, USA',
    indiaPresence: 'Major development units in Hyderabad and Bangalore.',
    locations: ['Hyderabad', 'Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Support Engineer'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-emerald-600 dark:text-emerald-400',
    theme: {
      from: 'from-emerald-600 to-teal-800',
      text: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/5',
      border: 'border-emerald-500/20 dark:border-emerald-500/10',
      accent: 'border-l-emerald-500 dark:border-l-emerald-400',
      pill: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
      gradient: 'from-emerald-500/10 via-teal-500/5 to-surface-50 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-surface-950',
      glow: 'shadow-emerald-500/5'
    },
    difficulty: 'Hard',
    package: '14.0 - 32.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-5%',
      employees: '22k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with ServiceNow values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'What is a binary search tree? How do you check if a binary tree is a BST?',
        a: 'A BST is a tree where for each node, left child elements are smaller and right child elements are larger. To validate, recursively pass range bounds [min, max] down, ensuring each node value falls strictly within bounds.'
      },
      {
        q: 'Describe garbage collection in Java. How does it work?',
        a: 'Garbage collection is an automatic memory management process that identifies and deletes unused objects on the heap, freeing up memory space.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  zoho: {
    id: 'zoho',
    name: 'Zoho',
    fullName: 'Zoho Corporation Private Limited',
    type: 'indian-product', // Listed in both Product and Indian Product. Will be mapped to 'indian-product' type.
    description: 'An Indian multinational technology company that makes web-based business tools and computer software.',
    industry: 'Software & SaaS',
    size: '15,000+ Employees',
    headquarters: 'Chennai, Tamil Nadu, India',
    indiaPresence: 'Huge global development center in Chennai, Tenkasi, and other rural offices in Tamil Nadu.',
    locations: ['Chennai', 'Tenkasi', 'Bangalore', 'Coimbatore'],
    roles: ['Software Developer', 'Associate Software Engineer', 'Support Engineer', 'Data Analyst'],
    cgpa: 6.0,
    cgpaRange: '6.0+',
    logoColor: 'text-yellow-600 dark:text-yellow-450',
    theme: {
      from: 'from-yellow-500 via-red-500 to-blue-600',
      text: 'text-yellow-500 dark:text-yellow-450',
      bg: 'bg-yellow-500/10 dark:bg-yellow-500/5',
      border: 'border-yellow-500/20 dark:border-yellow-500/10',
      accent: 'border-l-yellow-500 dark:border-l-yellow-400',
      pill: 'bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border-yellow-500/20',
      gradient: 'from-yellow-500/10 via-red-500/5 to-surface-50 dark:from-yellow-950/20 dark:via-red-950/10 dark:to-surface-950',
      glow: 'shadow-yellow-500/5'
    },
    difficulty: 'Medium-Hard',
    package: '5.6 - 12.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '5-8%',
      employees: '15k+',
      roleType: 'Software Developer / Analyst'
    },
    eligibility: {
      cgpa: 'No strict CGPA criteria (welcomes all students, open skill-based selection).',
      backlogs: 'Active backlogs allowed (evaluated on skill only).',
      gaps: 'No restrictions on academic gaps.',
      branches: 'All branches eligible (open to non-engineering degrees as well).'
    },
    hiringProcess: [
      { round: 'Round 1: Written Test (Aptitude & C Programming)', description: 'Covers logical riddles, mathematical calculation, and C programming output debugging.' },
      { round: 'Round 2: Written Coding Test (DSA)', description: 'Solve 5-6 coding questions on paper or local editors focusing on arrays, matrices, and recursion.' },
      { round: 'Round 3: Advanced Programming Round', description: 'Design a terminal console application (like a Railway Reservation System or Parking Lot) within 3 hours.' },
      { round: 'Round 4: Technical & HR Interviews', description: 'Review of advanced coding files, OOPs design rules, and behavioral assessment.' }
    ],
    technicalTopics: ['C Programming Output', 'DSA', 'OOP', 'DBMS', 'SQL'],
    aptitudeTopics: ['Aptitude', 'Logical riddles'],
    questions: [
      {
        q: 'Write a program to print a matrix in spiral order.',
        a: 'Maintain four pointers: top, bottom, left, right. Loop and traverse top row (left to right), right column (top to bottom), bottom row (right to left), and left column (bottom to top), updating boundaries after each traversal.'
      },
      {
        q: 'Design a console-based Railway Ticket Reservation System with book, cancel, and booking status display operations.',
        a: 'Use object-oriented design. Create classes for Passenger, Ticket, and BookingSystem. Manage booking lists, waiting lists, and RAC lists using collections. Set limits and run actions in a terminal loop.'
      }
    ],
    tips: [
      'Zoho tests heavy C programming logic in Round 1. Master pointer variables and loop tracing.',
      'For the Advanced Programming Round, make sure you write modular code with OOPs structure.',
      'Show passion for solving coding problems rather than just talking about theory.'
    ]
  },
  atlassian: {
    id: 'atlassian',
    name: 'Atlassian',
    fullName: 'Atlassian Corporation Plc',
    type: 'product',
    description: 'An Australian software company that develops products for software developers, project managers, and content managers (Jira, Confluence).',
    industry: 'Software & Productivity Tools',
    size: '10,000+ Employees',
    headquarters: 'Sydney, Australia',
    indiaPresence: 'Large development office in Bangalore, hiring extensively for remote roles too.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-blue-500 dark:text-blue-450',
    theme: {
      from: 'from-blue-500 to-indigo-750',
      text: 'text-blue-500 dark:text-blue-450',
      bg: 'bg-blue-500/10 dark:bg-blue-500/5',
      border: 'border-blue-500/20 dark:border-blue-500/10',
      accent: 'border-l-blue-500 dark:border-l-blue-400',
      pill: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-surface-50 dark:from-indigo-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-blue-500/5'
    },
    difficulty: 'Hard',
    package: '20.0 - 55.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '1-3%',
      employees: '10k+',
      roleType: 'Software Engineer Graduate'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Assessment (OA)', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Atlassian values (e.g. Open company, no bullshit).' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Longest Common Subsequence (LCS) problem.',
        a: 'Use dynamic programming. Create a 2D table where dp[i][j] represents the length of LCS of prefixes string1[0..i-1] and string2[0..j-1]. If characters match, dp[i][j] = 1 + dp[i-1][j-1]. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).'
      },
      {
        q: 'What is a Rate Limiter? Design a basic sliding window rate limiter.',
        a: 'A Rate Limiter controls the rate of traffic sent by a client. A sliding window rate limiter tracks requests in a sliding window interval, keeping count in a sorted set (like Redis ZSET) of timestamps.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  intuit: {
    id: 'intuit',
    name: 'Intuit',
    fullName: 'Intuit India Technology Product Guide',
    type: 'product',
    description: 'A global technology platform that helps consumers and small businesses prosper (TurboTax, QuickBooks, Mint, Mailchimp).',
    industry: 'Financial Software & Fintech',
    size: '17,000+ Employees',
    headquarters: 'Mountain View, California, USA',
    indiaPresence: 'Major development center in Bangalore.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-blue-600 dark:text-blue-450',
    theme: {
      from: 'from-blue-600 to-indigo-750',
      text: 'text-blue-500 dark:text-blue-450',
      bg: 'bg-blue-500/10 dark:bg-blue-500/5',
      border: 'border-blue-500/20 dark:border-blue-500/10',
      accent: 'border-l-blue-500 dark:border-l-blue-400',
      pill: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-surface-50 dark:from-indigo-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-blue-500/5'
    },
    difficulty: 'Hard',
    package: '14.0 - 32.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '17k+',
      roleType: 'Software Engineer Graduate'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Intuit values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Word Search problem in a grid.',
        a: 'This is a backtracking problem. Iterate through the grid to find the starting letter, then perform a DFS in all four directions. Mark visited cells to prevent loops, and backtrack if the path fails.'
      },
      {
        q: 'What is a load balancer? Explain round-robin vs least connections algorithm.',
        a: 'A load balancer distributes incoming traffic across multiple servers. Round-robin sends requests sequentially. Least connections routes requests to the server with active connections.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  nvidia: {
    id: 'nvidia',
    name: 'Nvidia',
    fullName: 'NVIDIA Corporation',
    type: 'product',
    description: 'A global leader in artificial intelligence hardware and software, GPU engineering, and high-performance computing.',
    industry: 'Semiconductors & AI Hardware',
    size: '26,000+ Employees',
    headquarters: 'Santa Clara, California, USA',
    indiaPresence: 'Engineering locations in Bangalore, Pune, and Hyderabad.',
    locations: ['Bangalore', 'Pune', 'Hyderabad'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Support Engineer'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-lime-500 dark:text-lime-450',
    theme: {
      from: 'from-lime-500 to-green-700',
      text: 'text-lime-500 dark:text-lime-450',
      bg: 'bg-lime-500/10 dark:bg-lime-500/5',
      border: 'border-lime-500/20 dark:border-lime-500/10',
      accent: 'border-l-lime-500 dark:border-l-lime-400',
      pill: 'bg-lime-500/10 dark:bg-lime-500/20 text-lime-600 dark:text-lime-300 border-lime-500/20',
      gradient: 'from-lime-500/10 via-green-500/5 to-surface-50 dark:from-green-950/20 dark:via-green-950/10 dark:to-surface-950',
      glow: 'shadow-lime-500/5'
    },
    difficulty: 'Hard',
    package: '16.0 - 45.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-4%',
      employees: '26k+',
      roleType: 'Software Engineer / Compiler Dev'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Nvidia values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Graph Coloring problem.',
        a: 'This is a backtracking problem. Assign colors to vertices one by one, checking if adjacent vertices have the same color. If a valid configuration is found, return true. Otherwise, backtrack.'
      },
      {
        q: 'What is a cache? Explain cache hit ratio and cache write-through vs write-back.',
        a: 'A cache stores copy of data for fast read/writes. Hit ratio is the fraction of accesses that find data in cache. Write-through updates both cache and backing store immediately. Write-back updates backing store only when cache line is evicted.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },

  // INDIAN PRODUCT COMPANIES
  freshworks: {
    id: 'freshworks',
    name: 'Freshworks',
    fullName: 'Freshworks Technologies Private Limited',
    type: 'indian-product',
    description: 'An Indian-founded software company that develops business software, helpdesk, and CRM tools, listed on NASDAQ.',
    industry: 'Software & SaaS',
    size: '5,000+ Employees',
    headquarters: 'San Mateo, California, USA (founded in Chennai, India)',
    indiaPresence: 'Huge engineering units in Chennai and Bangalore.',
    locations: ['Chennai', 'Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-teal-600 dark:text-teal-400',
    theme: {
      from: 'from-teal-600 to-cyan-800',
      text: 'text-teal-500 dark:text-teal-400',
      bg: 'bg-teal-500/10 dark:bg-teal-500/5',
      border: 'border-teal-500/20 dark:border-teal-500/10',
      accent: 'border-l-teal-500 dark:border-l-teal-400',
      pill: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/20',
      gradient: 'from-teal-500/10 via-cyan-500/5 to-surface-50 dark:from-teal-950/20 dark:via-cyan-950/10 dark:to-surface-950',
      glow: 'shadow-teal-500/5'
    },
    difficulty: 'Medium-Hard',
    package: '8.0 - 18.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '4-8%',
      employees: '5k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year educational gap permissible.',
      branches: 'BE, B.Tech, MCA, MSc (CS/IT)'
    },
    hiringProcess: [
      { round: 'Round 1: Online Assessment (Coding + Aptitude)', description: 'Covers logical, verbal, and 2 medium coding questions.' },
      { round: 'Round 2: Technical Interview 1', description: 'Checks core coding logic, sorting algorithms, memory allocation, and OS processes.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced graph algorithms, data structures (heaps, trees), and Low-Level Design (LLD).' },
      { round: 'Round 4: Management & HR Round', description: 'Assesses communication skills, behavioral aspects, career goals, and relocations.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'SQL', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Aptitude', 'Logical Reasoning'],
    questions: [
      {
        q: 'Write a program to implement a hash map from scratch.',
        a: 'Use an array of linked lists (chaining method). Create a hash function to map keys to indices. Implement put(key, value), get(key), and remove(key) operations, handling collisions appropriately.'
      },
      {
        q: 'Explain the difference between SQL and NoSQL databases.',
        a: 'SQL databases are relational, table-based, structured, and use SQL syntax. NoSQL databases are non-relational, document-based, unstructured, and have dynamic schemas.'
      }
    ],
    tips: [
      'Focus heavily on database tables and writing SQL commands during coding screens.',
      'Explain your logic step-by-step during coding assessments.',
      'Be very clear about project architectures and SaaS systems if you have done any courses.'
    ]
  },
  phonepe: {
    id: 'phonepe',
    name: 'PhonePe',
    fullName: 'PhonePe Private Limited',
    type: 'indian-product',
    description: 'An Indian digital payments and financial services company, known for its widely used UPI payments application.',
    industry: 'Fintech & Digital Payments',
    size: '4,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Large development office in Bangalore, Pune, and Mumbai.',
    locations: ['Bangalore', 'Pune', 'Mumbai'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-purple-600 dark:text-purple-400',
    theme: {
      from: 'from-purple-600 to-indigo-800',
      text: 'text-purple-500 dark:text-purple-400',
      bg: 'bg-purple-500/10 dark:bg-purple-500/5',
      border: 'border-purple-500/20 dark:border-purple-500/10',
      accent: 'border-l-purple-500 dark:border-l-purple-400',
      pill: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/20',
      gradient: 'from-purple-500/10 via-indigo-500/5 to-surface-50 dark:from-purple-950/20 dark:via-indigo-950/10 dark:to-surface-950',
      glow: 'shadow-purple-500/5'
    },
    difficulty: 'Hard',
    package: '14.0 - 32.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-5%',
      employees: '4k+',
      roleType: 'Software Engineer Graduate'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with PhonePe values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Knapsack problem using dynamic programming.',
        a: 'Create a 2D table where dp[i][w] represents the maximum value that can be attained with weight limit w using items up to index i. If item weight is <= w, dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]). Otherwise, dp[i][w] = dp[i-1][w].'
      },
      {
        q: 'What is a distributed system? Explain consistency, availability, and partition tolerance (CAP theorem).',
        a: 'CAP theorem states that in a distributed system, you can only guarantee two out of the three properties: Consistency, Availability, and Partition Tolerance.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  razorpay: {
    id: 'razorpay',
    name: 'Razorpay',
    fullName: 'Razorpay Software Private Limited',
    type: 'indian-product',
    description: 'An Indian fintech company providing payment gateway and financial solutions to merchants.',
    industry: 'Fintech & Digital Payments',
    size: '3,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Major corporate office in Bangalore, hiring engineers for payment infrastructure.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-indigo-655 dark:text-indigo-400',
    theme: {
      from: 'from-indigo-600 to-sky-800',
      text: 'text-indigo-500 dark:text-indigo-400',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/5',
      border: 'border-indigo-500/20 dark:border-indigo-500/10',
      accent: 'border-l-indigo-500 dark:border-l-indigo-400',
      pill: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-500/20',
      gradient: 'from-indigo-500/10 via-sky-500/5 to-surface-50 dark:from-indigo-950/20 dark:via-sky-950/10 dark:to-surface-950',
      glow: 'shadow-indigo-500/5'
    },
    difficulty: 'Hard',
    package: '12.0 - 28.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '3k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Razorpay values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the N-Queens problem.',
        a: 'This is a backtracking problem. Place queens one by one in different columns, checking if a queen can be safely placed in the current row. If all queens are placed, return true. Otherwise, backtrack.'
      },
      {
        q: 'What is a distributed lock? How does it work?',
        a: 'A distributed lock ensures mutual exclusion across multiple servers. It is usually implemented using Redis (Redlock algorithm) or Zookeeper.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  paytm: {
    id: 'paytm',
    name: 'Paytm',
    fullName: 'One97 Communications Limited',
    type: 'indian-product',
    description: 'An Indian multinational financial technology company, known for its payment, banking, and wallet services.',
    industry: 'Fintech & Digital Payments',
    size: '20,000+ Employees',
    headquarters: 'Noida, Uttar Pradesh, India',
    indiaPresence: 'Major corporate office in Noida and development center in Bangalore.',
    locations: ['Noida', 'Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 6.5,
    cgpaRange: '6.5+',
    logoColor: 'text-cyan-600 dark:text-cyan-400',
    theme: {
      from: 'from-cyan-600 to-blue-800',
      text: 'text-cyan-500 dark:text-cyan-400',
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/5',
      border: 'border-cyan-500/20 dark:border-cyan-500/10',
      accent: 'border-l-cyan-500 dark:border-l-cyan-400',
      pill: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/20',
      gradient: 'from-cyan-500/10 via-blue-500/5 to-surface-50 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-cyan-500/5'
    },
    difficulty: 'Medium-Hard',
    package: '8.0 - 18.0 LPA',
    roundsCount: 3,
    stats: {
      acceptanceRate: '5-10%',
      employees: '20k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '6.5 CGPA or 65% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical & HR Interview', description: 'Advanced algorithm coding and behavioral review.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Sudoku Solver problem.',
        a: 'This is a backtracking problem. Place numbers 1-9 in empty cells one by one, checking if the number is valid in the current row, column, and 3x3 sub-grid. If Sudoku is solved, return true. Otherwise, backtrack.'
      },
      {
        q: 'What is a distributed transaction? Explain 2-phase commit (2PC) protocol.',
        a: 'A distributed transaction is a database transaction involving multiple databases. 2PC coordinates a transaction to commit or abort across all databases in two phases: Prepare and Commit.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  cred: {
    id: 'cred',
    name: 'CRED',
    fullName: 'Dreamplug Technologies Private Limited',
    type: 'indian-product',
    description: 'An Indian fintech company providing a member-only credit card bill payments platform.',
    industry: 'Fintech & Digital Payments',
    size: '1,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Corporate office in Bangalore, hiring software developers for backend systems.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.5,
    cgpaRange: '7.5+',
    logoColor: 'text-slate-800 dark:text-slate-200',
    theme: {
      from: 'from-slate-800 to-zinc-900',
      text: 'text-slate-500 dark:text-slate-300',
      bg: 'bg-slate-500/10 dark:bg-slate-500/5',
      border: 'border-slate-500/20 dark:border-slate-500/10',
      accent: 'border-l-slate-550 dark:border-l-slate-400',
      pill: 'bg-slate-500/10 dark:bg-slate-500/20 text-slate-600 dark:text-slate-300 border-slate-500/20',
      gradient: 'from-slate-500/10 via-zinc-500/5 to-surface-50 dark:from-zinc-950/20 dark:via-zinc-950/10 dark:to-surface-950',
      glow: 'shadow-slate-500/5'
    },
    difficulty: 'Hard',
    package: '15.0 - 36.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '1-3%',
      employees: '1k+',
      roleType: 'Software Engineer Graduate'
    },
    eligibility: {
      cgpa: '7.5+ CGPA or 75% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with CRED values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Longest Increasing Subsequence (LIS) problem.',
        a: 'Use dynamic programming. Create an array dp of size N, where dp[i] represents the length of LIS ending at index i. For each i, loop from 0 to i-1; if element[i] > element[j], dp[i] = max(dp[i], 1 + dp[j]).'
      },
      {
        q: 'What is a distributed cache? Explain cache hit ratio and cache eviction policies.',
        a: 'A distributed cache stores data in-memory across multiple servers for fast access. Policies include LRU, LFU, and FIFO.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  groww: {
    id: 'groww',
    name: 'Groww',
    fullName: 'Nextbillion Technology Private Limited',
    type: 'indian-product',
    description: 'An Indian online investment platform offering mutual funds, stocks, and direct financial products.',
    industry: 'Fintech & Wealth Management',
    size: '2,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Large development office in Bangalore, hiring engineers for trading infrastructure.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-emerald-500 dark:text-emerald-450',
    theme: {
      from: 'from-emerald-500 to-teal-700',
      text: 'text-emerald-500 dark:text-emerald-450',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/5',
      border: 'border-emerald-500/20 dark:border-emerald-500/10',
      accent: 'border-l-emerald-500 dark:border-l-emerald-400',
      pill: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
      gradient: 'from-emerald-500/10 via-teal-500/5 to-surface-50 dark:from-teal-950/20 dark:via-teal-950/10 dark:to-surface-950',
      glow: 'shadow-emerald-500/5'
    },
    difficulty: 'Hard',
    package: '12.0 - 28.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '2k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Groww values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Graph Bipartite problem.',
        a: 'A graph is bipartite if we can color vertices with 2 colors such that no adjacent vertices share the same color. Use BFS/DFS. Traverse vertices and assign color; if adjacent vertex has same color, graph is not bipartite.'
      },
      {
        q: 'What is a distributed lock? How does it work?',
        a: 'A distributed lock ensures mutual exclusion across multiple servers. It is usually implemented using Redis (Redlock algorithm) or Zookeeper.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  swiggy: {
    id: 'swiggy',
    name: 'Swiggy',
    fullName: 'Bundl Technologies Private Limited',
    type: 'indian-product',
    description: 'An Indian online food ordering and delivery platform, expanding into instant commerce (Instamart).',
    industry: 'Logistics & Food Delivery',
    size: '8,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Development units in Bangalore and Gurgaon.',
    locations: ['Bangalore', 'Gurugram'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-orange-500 dark:text-orange-450',
    theme: {
      from: 'from-orange-500 to-amber-700',
      text: 'text-orange-500 dark:text-orange-455',
      bg: 'bg-orange-500/10 dark:bg-orange-500/5',
      border: 'border-orange-500/20 dark:border-orange-500/10',
      accent: 'border-l-orange-500 dark:border-l-orange-400',
      pill: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border-orange-500/20',
      gradient: 'from-orange-500/10 via-amber-500/5 to-surface-50 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-surface-950',
      glow: 'shadow-orange-500/5'
    },
    difficulty: 'Hard',
    package: '10.0 - 25.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '8k+',
      roleType: 'Software Engineer Graduate'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Swiggy values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Graph Shortest Path in an unweighted graph.',
        a: 'Use BFS. Maintain a queue and distance array. Traverse vertices; distance of adjacent vertex is 1 + distance of current vertex. Repeat until destination is reached.'
      },
      {
        q: 'What is database partitioning? Explain horizontal vs vertical partitioning.',
        a: 'Partitioning splits database tables into smaller parts. Horizontal partitioning splits rows across tables. Vertical partitioning splits columns across tables.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  zomato: {
    id: 'zomato',
    name: 'Zomato',
    fullName: 'Zomato Limited',
    type: 'indian-product',
    description: 'An Indian food delivery and restaurant aggregator company, known for its quick delivery service.',
    industry: 'Logistics & Food Delivery',
    size: '5,000+ Employees',
    headquarters: 'Gurugram, Haryana, India',
    indiaPresence: 'Major corporate office in Gurugram, development centers in Bangalore.',
    locations: ['Gurugram', 'Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-red-500 dark:text-red-450',
    theme: {
      from: 'from-red-500 to-rose-700',
      text: 'text-red-500 dark:text-red-455',
      bg: 'bg-red-500/10 dark:bg-red-500/5',
      border: 'border-red-500/20 dark:border-red-500/10',
      accent: 'border-l-red-500 dark:border-l-red-400',
      pill: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/20',
      gradient: 'from-red-500/10 via-rose-500/5 to-surface-50 dark:from-rose-950/20 dark:via-rose-950/10 dark:to-surface-950',
      glow: 'shadow-red-500/5'
    },
    difficulty: 'Hard',
    package: '10.0 - 26.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '5k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Zomato values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Graph Cycle Detection in a directed graph.',
        a: 'Use DFS. Maintain visited and recursion stack array. If a vertex is visited and present in the recursion stack, a cycle exists.'
      },
      {
        q: 'What is database sharding? How does it differ from replication?',
        a: 'Sharding distributes data rows across multiple servers. Replication copies the entire database across multiple servers.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart',
    fullName: 'Flipkart Private Limited',
    type: 'indian-product',
    description: 'An Indian e-commerce giant acquired by Walmart, known for its massive scale and supply chain systems.',
    industry: 'E-commerce & Logistics',
    size: '15,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Huge corporate headquarters in Bangalore.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-yellow-600 dark:text-yellow-450',
    theme: {
      from: 'from-yellow-500 via-blue-500 to-indigo-600',
      text: 'text-yellow-500 dark:text-yellow-455',
      bg: 'bg-yellow-500/10 dark:bg-yellow-500/5',
      border: 'border-yellow-500/20 dark:border-yellow-500/10',
      accent: 'border-l-yellow-500 dark:border-l-yellow-400',
      pill: 'bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border-yellow-500/20',
      gradient: 'from-yellow-500/10 via-blue-500/5 to-surface-50 dark:from-blue-950/20 dark:via-blue-950/10 dark:to-surface-950',
      glow: 'shadow-yellow-500/5'
    },
    difficulty: 'Hard',
    package: '12.0 - 32.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '2-5%',
      employees: '15k+',
      roleType: 'Software Engineer Graduate'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Flipkart values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Graph Connected Components problem.',
        a: 'Use BFS/DFS. Traverse vertices and call DFS for unvisited nodes; increment count of connected components after each complete DFS call.'
      },
      {
        q: 'What is database locking? Explain shared vs exclusive locks.',
        a: 'Locking prevents data conflict. Shared locks allow read access. Exclusive locks allow write access.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  },
  meesho: {
    id: 'meesho',
    name: 'Meesho',
    fullName: 'Fashnear Technologies Private Limited',
    type: 'indian-product',
    description: 'An Indian social commerce and e-commerce platform offering online retail for smaller merchants.',
    industry: 'E-commerce & Social Commerce',
    size: '3,000+ Employees',
    headquarters: 'Bangalore, Karnataka, India',
    indiaPresence: 'Corporate office in Bangalore, hiring engineers for platform expansion.',
    locations: ['Bangalore'],
    roles: ['Software Engineer', 'Associate Software Engineer', 'Data Analyst'],
    cgpa: 7.0,
    cgpaRange: '7.0+',
    logoColor: 'text-pink-500 dark:text-pink-450',
    theme: {
      from: 'from-pink-500 to-purple-700',
      text: 'text-pink-500 dark:text-pink-455',
      bg: 'bg-pink-500/10 dark:bg-pink-500/5',
      border: 'border-pink-500/20 dark:border-pink-500/10',
      accent: 'border-l-pink-500 dark:border-l-pink-400',
      pill: 'bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 border-pink-500/20',
      gradient: 'from-pink-500/10 via-purple-500/5 to-surface-50 dark:from-purple-950/20 dark:via-purple-950/10 dark:to-surface-950',
      glow: 'shadow-pink-500/5'
    },
    difficulty: 'Hard',
    package: '12.0 - 28.0 LPA',
    roundsCount: 4,
    stats: {
      acceptanceRate: '3-6%',
      employees: '3k+',
      roleType: 'Software Engineer'
    },
    eligibility: {
      cgpa: '7.0 CGPA or 70% in graduation. No active backlogs.',
      backlogs: 'Zero active backlogs allowed.',
      gaps: 'Max 1 year academic gap.',
      branches: 'BE, B.Tech in CS, IT, ECE, EEE or MCA.'
    },
    hiringProcess: [
      { round: 'Round 1: Online Coding Test', description: 'Consists of 3 coding questions (medium to hard) covering Arrays, Trees, or Graphs on HackerRank.' },
      { round: 'Round 2: Technical Interview 1', description: 'Deep check on code optimization, system design basics, and object-oriented programming.' },
      { round: 'Round 3: Technical Interview 2', description: 'Advanced algorithm coding (Graphs, Dynamic Programming) and system components configuration.' },
      { round: 'Round 4: Management & HR Interview', description: 'Assesses behavioral alignment with Meesho values.' }
    ],
    technicalTopics: ['DSA', 'OOP', 'DBMS', 'System Design Basics', 'Git', 'Java', 'Python'],
    aptitudeTopics: ['Logical Reasoning', 'Behavioral Scenarios'],
    questions: [
      {
        q: 'Write a program to solve the Graph Topological Sort problem.',
        a: 'Topological sort is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u -> v, u comes before v. Use DFS + stack, or Kahn\'s algorithm (BFS + in-degrees).'
      },
      {
        q: 'What is database replication? Explain master-slave replication.',
        a: 'Replication copies data across servers. Master-slave replication writes to master database and replicates updates to slave databases.'
      }
    ],
    tips: [
      'Practice writing clean Java or C++ code with strict attention to object-oriented design patterns.',
      'Understand cloud concepts, API rates, and distributed database basics.',
      'Be highly prepared to discuss your project team coordination, conflicts, and resolutions.'
    ]
  }
};
