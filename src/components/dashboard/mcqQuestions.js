export const MCQ_QUESTIONS = {
  languages: {
    java: [
      {
        q: "Which of the following is true about String immutability in Java?",
        options: [
          "It improves security and allows String Pool caching",
          "It makes string operations faster",
          "It is required by the JVM for garbage collection",
          "It prevents strings from being cloned"
        ],
        correct: 0,
        explanation: "Immutability allows sharing of string objects in the String Pool safely, prevents security vulnerabilities in network parameters, and guarantees thread-safety."
      },
      {
        q: "Which keyword is used to prevent method overriding in Java?",
        options: ["static", "final", "abstract", "transient"],
        correct: 1,
        explanation: "Declaring a method 'final' prevents subclasses from overriding it. Declaring a class 'final' prevents it from being inherited."
      },
      {
        q: "What is the time complexity of retrieving an element from HashMap in the best case?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correct: 0,
        explanation: "In the best case (no hash collisions), element retrieval is a direct lookup based on the hash key, which takes O(1) time."
      },
      {
        q: "Which garbage collector is the default in Java 17?",
        options: ["Serial GC", "Parallel GC", "G1 GC", "ZGC"],
        correct: 2,
        explanation: "Garbage-First (G1) Garbage Collector has been the default collector for multi-processor machines since Java 9."
      }
    ],
    c: [
      {
        q: "What does malloc() return if it fails to allocate memory?",
        options: ["0", "NULL", "-1", "Void pointer"],
        correct: 1,
        explanation: "If malloc cannot find enough contiguous space in the heap, it returns NULL to signal memory exhaustion."
      },
      {
        q: "Which storage class in C stores variables in CPU registers instead of RAM?",
        options: ["static", "register", "auto", "extern"],
        correct: 1,
        explanation: "The 'register' keyword suggests that the compiler store the variable in a CPU register for high-speed access."
      },
      {
        q: "What is the size of a union in C?",
        options: [
          "Sum of sizes of all its members",
          "Size of its largest member",
          "Size of its smallest member",
          "Determined by the compiler at runtime"
        ],
        correct: 1,
        explanation: "Union members share the same memory location. The size of the union is therefore the size of its largest member."
      },
      {
        q: "What happens when a pointer is incremented by 1 (e.g. ptr++)?",
        options: [
          "Its address increments by 1 byte",
          "Its address increments by the size of the data type it points to",
          "Its value increments by 1",
          "It points to the next byte in memory"
        ],
        correct: 1,
        explanation: "Pointer arithmetic automatically scales the offset based on the byte-size of the underlying data type."
      }
    ],
    cpp: [
      {
        q: "Which pointer type in C++11 represents exclusive ownership of a resource?",
        options: ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr"],
        correct: 2,
        explanation: "std::unique_ptr holds exclusive ownership of a pointer. Copying is disabled; ownership must be transferred via std::move."
      },
      {
        q: "What is a virtual destructor used for in C++?",
        options: [
          "To make a class abstract",
          "To ensure derived class destructors are called when deleting via base pointer",
          "To speed up heap deletion",
          "To prevent class inheritance"
        ],
        correct: 1,
        explanation: "Without a virtual destructor, deleting a derived object via a base pointer causes undefined behavior, often leaking derived resources."
      },
      {
        q: "What is object slicing in C++?",
        options: [
          "Splitting objects across multiple memory segments",
          "Deleting half of an object from heap",
          "Converting a derived class object into a base class object, losing derived attributes",
          "Allocating heap block for array of objects"
        ],
        correct: 2,
        explanation: "Object slicing occurs when a derived object is assigned by value to a base object. The derived attributes are stripped away."
      }
    ],
    python: [
      {
        q: "What is the Global Interpreter Lock (GIL) in Python?",
        options: [
          "A thread lock that prevents running bytecode in multiple threads concurrently",
          "A security lock for the file system",
          "A database lock for transactions",
          "A compile-time optimization lock"
        ],
        correct: 0,
        explanation: "GIL ensures only one thread executes Python bytecode at a time, limiting CPU-bound multithreaded performance."
      },
      {
        q: "Which of the following data types is immutable in Python?",
        options: ["List", "Dictionary", "Set", "Tuple"],
        correct: 3,
        explanation: "Tuples, Strings, and Numbers are immutable in Python. Lists, Dictionaries, and Sets are mutable."
      },
      {
        q: "How do you copy a nested list in Python so that modifications to sub-lists don't affect the original?",
        options: ["list.copy()", "copy.copy(list)", "copy.deepcopy(list)", "list[:]"],
        correct: 2,
        explanation: "deepcopy recursively duplicates all nested items, preventing shared reference mutations."
      }
    ],
    javascript: [
      {
        q: "Which of the following is true about closures in JavaScript?",
        options: [
          "They are functions that retain access to their outer scope variables even after the outer function finishes executing",
          "They prevent variables from being garbage collected forever",
          "They are used to create classes in ES6",
          "They run asynchronous tasks in a background thread"
        ],
        correct: 0,
        explanation: "Closures combine a function with references to its surrounding state (lexical environment), allowing private variables state."
      },
      {
        q: "What is the difference between '==' and '===' in JavaScript?",
        options: [
          "'===' compares values only, '==' compares values and types",
          "'==' compares values only (coercing types), '===' compares values and types strictly",
          "They are identical in modern ES6",
          "'==' is for strings, '===' is for numbers"
        ],
        correct: 1,
        explanation: "== performs type coercion before comparing values, whereas === compares both type and value strictly without coercion."
      },
      {
        q: "Which Promise state represents a completed operation?",
        options: ["Pending", "Settled", "Fulfilled", "Resolved"],
        correct: 2,
        explanation: "A Promise is 'Fulfilled' when the operation completes successfully. It is 'Rejected' if the operation fails."
      }
    ],
    sql: [
      {
        q: "Which of the following properties ensures database transactions are 'all-or-nothing'?",
        options: ["Isolation", "Durability", "Consistency", "Atomicity"],
        correct: 3,
        explanation: "Atomicity guarantees that if any part of a transaction fails, the entire transaction is rolled back as if nothing happened."
      },
      {
        q: "What is the difference between WHERE and HAVING clauses?",
        options: [
          "WHERE filters rows before grouping, HAVING filters grouped rows",
          "HAVING filters rows before grouping, WHERE filters grouped rows",
          "WHERE is for strings, HAVING is for aggregates",
          "They are completely interchangeable"
        ],
        correct: 0,
        explanation: "WHERE applies constraints to individual rows before GROUP BY aggregates them. HAVING applies constraints to the groups."
      },
      {
        q: "Which join returns all matching rows and all non-matching rows from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
        explanation: "FULL OUTER JOIN combines the results of both LEFT and RIGHT joins, returning all matching and non-matching rows."
      }
    ]
  },
  fundamentals: {
    dsa: [
      {
        q: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(N log N)", "O(N)", "O(N^2)", "O(log N)"],
        correct: 2,
        explanation: "Worst case occurs when the pivot is always the smallest or largest element (e.g. sorted arrays), yielding O(N^2) complexity."
      },
      {
        q: "Which data structure is used to implement Breadth-First Search (BFS)?",
        options: ["Stack", "Queue", "Tree", "Hash Map"],
        correct: 1,
        explanation: "BFS explores elements level-by-level, requiring a FIFO queue to process node neighbors in order of discovery."
      },
      {
        q: "What is the time complexity of searching for an element in a balanced Binary Search Tree?",
        options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
        correct: 2,
        explanation: "A balanced BST (like AVL or Red-Black Tree) halves the search pool in each step, guaranteeing O(log N) search operations."
      }
    ],
    oop: [
      {
        q: "What does encapsulation hide?",
        options: [
          "Code implementation details",
          "Class names",
          "Object state variables (attributes) using private access modifiers",
          "Memory addresses"
        ],
        correct: 2,
        explanation: "Encapsulation restricts direct access to object attributes, requiring changes via public getter/setter methods."
      },
      {
        q: "What is the Diamond Problem in Multiple Inheritance?",
        options: [
          "A deadlock in class memory",
          "Ambiguity when a class inherits from two classes that have a common parent class",
          "A compilation error when using too many interfaces",
          "An optimization warning in virtual tables"
        ],
        correct: 1,
        explanation: "If class A has parent classes B and C, which both override a method in class D, A inherits two conflicting definitions."
      },
      {
        q: "In SOLID design principles, what does the 'L' stand for?",
        options: ["Loose Coupling", "Logical Design", "Liskov Substitution Principle", "Layered Architecture"],
        correct: 2,
        explanation: "Liskov Substitution states that subclasses must be replaceable by their base class instances without breaking correctness."
      }
    ],
    dbms: [
      {
        q: "What is the highest level of database normalization that removes transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correct: 2,
        explanation: "Third Normal Form (3NF) requires the table to be in 2NF, and no non-prime attribute should be transitively dependent on the primary key."
      },
      {
        q: "In ACID transactions, what does 'Durability' guarantee?",
        options: [
          "Transactions are fast",
          "Transactions are not interrupted by concurrent queries",
          "Committed transactions are permanently saved even in a power failure",
          "Data schema is strictly enforced"
        ],
        correct: 2,
        explanation: "Durability ensures that once a transaction commits, its effects survive system crashes and are permanently saved in non-volatile storage."
      },
      {
        q: "Which database lock level provides the highest concurrency but the highest overhead?",
        options: ["Database lock", "Table lock", "Row lock", "Page lock"],
        correct: 2,
        explanation: "Row-level locking locks only the modified row, allowing other transactions to modify adjacent rows, but requires significant tracking overhead."
      }
    ],
    os: [
      {
        q: "What is a page fault?",
        options: [
          "A compiler syntax error in paging",
          "A hardware failure in RAM",
          "Occurs when a process requests a page that is not currently loaded in physical RAM",
          "A corrupted disk block"
        ],
        correct: 2,
        explanation: "A page fault triggers an interrupt, prompting the OS kernel to fetch the missing page from disk swap space into RAM."
      },
      {
        q: "Which of the following conditions is NOT required for a deadlock to occur?",
        options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"],
        correct: 2,
        explanation: "No Preemption is required for deadlock. If preemption is allowed (meaning resources can be taken away), deadlocks can be resolved."
      },
      {
        q: "What is thrashing in an operating system?",
        options: [
          "Excessive CPU usage by user processes",
          "OS spending more time swapping pages in/out of virtual memory than executing processes",
          "Hard disk writing garbage data",
          "Paging algorithm crash"
        ],
        correct: 1,
        explanation: "Thrashing occurs when memory is overcommitted, causing page replacement algorithms to continuously swap blocks, locking up CPU execution."
      }
    ],
    cn: [
      {
        q: "Which layer of the OSI model does the IP protocol operate on?",
        options: ["Transport Layer", "Data Link Layer", "Network Layer", "Session Layer"],
        correct: 2,
        explanation: "The Network Layer is responsible for addressing and routing packets across different network boundaries (e.g. IP routing)."
      },
      {
        q: "What is the correct sequence of messages in the TCP three-way handshake?",
        options: ["SYN -> ACK -> SYN-ACK", "SYN -> SYN-ACK -> ACK", "ACK -> SYN -> SYN-ACK", "SYN-ACK -> SYN -> ACK"],
        correct: 1,
        explanation: "The client sends a SYN packet, the server responds with a SYN-ACK, and the client sends an ACK to establish a stable session."
      },
      {
        q: "Which port does HTTPS operate on by default?",
        options: ["80", "8080", "443", "22"],
        correct: 2,
        explanation: "HTTPS (HTTP Secure) uses TLS encryption and defaults to port 443, while standard HTTP defaults to port 80."
      }
    ],
    se: [
      {
        q: "Which software development model is iterative and highly adaptable to client feedback?",
        options: ["Waterfall Model", "Agile Model", "Spiral Model", "V-Model"],
        correct: 1,
        explanation: "Agile values responding to change over following a plan, delivering functional iterations in short sprints."
      },
      {
        q: "Which git command is used to complete a merge conflict resolution?",
        options: ["git merge --abort", "git commit after manual conflict resolution", "git push --force", "git fetch"],
        correct: 1,
        explanation: "After manually editing conflicting files and staging them via git add, you must run git commit to save the merge commit."
      },
      {
        q: "What does YAGNI stand for in software engineering clean coding?",
        options: [
          "You Are Going Next Indeed",
          "You Aren't Gonna Need It",
          "Yet Another Group Network Interface",
          "Yielding Assets Gives New Interest"
        ],
        correct: 1,
        explanation: "YAGNI is a XP (Extreme Programming) rule stating that programmer should not add functionality until deemed necessary."
      }
    ]
  },
  company: {
    tcs: [
      {
        q: "TCS Assessment: If 15 men can reap a field in 28 days, in how many days will 5 men reap it?",
        options: ["56 days", "64 days", "84 days", "90 days"],
        correct: 2,
        explanation: "Total work = 15 * 28 = 420 man-days. Days required for 5 men = 420 / 5 = 84 days."
      },
      {
        q: "TCS Assessment: What is the main memory difference between C and Java?",
        options: [
          "Java has manual memory management, C has garbage collection",
          "C has manual memory management (malloc/free), Java has automatic garbage collection",
          "Both have automatic garbage collection",
          "C uses virtual threads, Java does not"
        ],
        correct: 1,
        explanation: "C requires developers to explicitly allocate/deallocate memory. Java uses an automatic Garbage Collector (GC)."
      },
      {
        q: "TCS Assessment: Choose the synonym of 'CANDID'.",
        options: ["Secretive", "Frank", "Insincere", "Ambiguous"],
        correct: 1,
        explanation: "Candid means honest, outspoken, or frank."
      }
    ],
    infosys: [
      {
        q: "Infosys Assessment: What is a virtual destructor in C++? Why do we need it?",
        options: [
          "To make a class abstract",
          "To ensure derived class destructor runs when deleted via base pointer",
          "To speed up heap deletion",
          "To prevent class inheritance"
        ],
        correct: 1,
        explanation: "A virtual destructor guarantees that the complete object hierarchy is cleaned up properly when polymorphic objects are deleted."
      },
      {
        q: "Infosys Assessment: How do you resolve bucket collisions in a HashMap?",
        options: [
          "By rehashing the keys and dropping values",
          "Using LinkedList chains, transitioning to trees in high density buckets",
          "By blocking concurrent threads",
          "By storing values in heap memory segments"
        ],
        correct: 1,
        explanation: "HashMap handles collisions using separate chaining (LinkedList bins), converting to Red-Black trees in Java 8+ if keys count >= 8."
      }
    ],
    accenture: [
      {
        q: "Accenture Assessment: Explain the difference between Abstract Class and Interface in Java.",
        options: [
          "Abstract classes can hold instance fields (state); interfaces cannot",
          "Interfaces support multiple inheritance; abstract classes do not",
          "Both A and B are correct",
          "Abstract classes cannot have default methods"
        ],
        correct: 2,
        explanation: "Interfaces allow multiple class implementations (multiple inheritance of type) and are stateless. Abstract classes can preserve instance state variables."
      },
      {
        q: "Accenture Assessment: Explain cloud computing deployment models.",
        options: [
          "Public, Private, Hybrid",
          "SaaS, PaaS, IaaS",
          "Frontend, Backend, Database",
          "Serverless and Managed"
        ],
        correct: 0,
        explanation: "Deployment models define location and ownership of cloud servers: Public (shared provider), Private (isolated host), Hybrid (mixed)."
      }
    ],
    cognizant: [
      {
        q: "Cognizant Assessment: What is the difference between INNER JOIN and LEFT JOIN in SQL?",
        options: [
          "INNER JOIN returns matching rows; LEFT JOIN returns matching rows plus all non-matching rows from left table",
          "LEFT JOIN returns matching rows only; INNER JOIN returns left values",
          "They are identical in SQL Server",
          "INNER JOIN handles Null values; LEFT JOIN does not"
        ],
        correct: 0,
        explanation: "INNER JOIN yields only matching rows. LEFT JOIN returns all rows from the left table, inserting NULLs for missing right table matches."
      }
    ],
    wipro: [
      {
        q: "Wipro Assessment: What is a transaction deadlock in DBMS?",
        options: [
          "A circular dependency where transactions block each other from acquiring locks",
          "A hard crash of the SQL engine",
          "A query running too slow",
          "Deleting table indexes during selection"
        ],
        correct: 0,
        explanation: "Deadlock occurs when Transaction 1 holds Lock A and requests B, while Transaction 2 holds B and requests A."
      }
    ],
    capgemini: [
      {
        q: "Capgemini Assessment: What is a memory leak? How do you prevent it in C++?",
        options: [
          "Allocating memory and forgetting to delete it; prevented by calling delete or using smart pointers",
          "A physical hardware RAM slot crash",
          "Writing too much data to files",
          "Stack overflow recursively"
        ],
        correct: 0,
        explanation: "Memory leaks occur when heap allocations are lost. Prevented using RAII containers or smart pointers (unique_ptr/shared_ptr)."
      }
    ],
    deloitte: [
      {
        q: "Deloitte Assessment: In database transactions, what does 'Isolation' represent in ACID?",
        options: [
          "Preventing concurrent transactions from seeing uncommitted modifications (dirty reads)",
          "Saving data permanently to hard drive",
          "Making sure queries run fast",
          "Bypassing indexes during search"
        ],
        correct: 0,
        explanation: "Isolation guarantees that concurrent transactions execute as if they are running sequentially, preventing anomalies."
      }
    ],
    cisco: [
      {
        q: "Cisco Assessment: Which data structure is used by network routers to store IP prefix routing tables?",
        options: ["Stack", "Queue", "Trie (Prefix Tree)", "Linked List"],
        correct: 2,
        explanation: "Tries support longest prefix matching efficiently, which is the core search required during IP routing table lookups."
      },
      {
        q: "Cisco Assessment: What is the primary difference between TCP and UDP?",
        options: [
          "TCP is connection-oriented, reliable, and uses flow control; UDP is connectionless and fast",
          "UDP is connection-oriented and reliable; TCP is connectionless",
          "They operate at different OSI layers",
          "TCP is only for websites; UDP is only for databases"
        ],
        correct: 0,
        explanation: "TCP establishes a handshake and guarantees packet ordering. UDP streams packets immediately without handshakes."
      }
    ],
    amazon: [
      {
        q: "Amazon Assessment: What is the time complexity of operations in an LRU Cache implemented with HashMap and Doubly LinkedList?",
        options: ["O(log N)", "O(1)", "O(N)", "O(N log N)"],
        correct: 1,
        explanation: "HashMap handles O(1) key node lookup. Doubly LinkedList handles O(1) node detachment and head placement, achieving O(1) overall."
      },
      {
        q: "Amazon Assessment: Which Amazon Leadership Principle highlights 'bias for action'?",
        options: [
          "Bias for Action: speed matters in business, many decisions are reversible",
          "Customer Obsession",
          "Invent and Simplify",
          "Frugality"
        ],
        correct: 0,
        explanation: "Bias for Action emphasizes that taking calculated risks quickly is superior to slow analysis paralysis."
      }
    ],
    microsoft: [
      {
        q: "Microsoft Assessment: Given a graph of dependencies, which algorithm resolves compilation orders?",
        options: ["Binary Search", "Dijkstra's Algorithm", "Topological Sort", "Kruskal's Algorithm"],
        correct: 2,
        explanation: "Topological Sort of a Directed Acyclic Graph (DAG) sequences vertices linearly matching edge constraints (e.g. dependencies)."
      }
    ]
  }
};
