/**
 * PlaceMentor AI — Placement Preparation Center Question Library
 * Stores question banks, metadata, and assessment criteria for Technical, Language,
 * Fundamentals, HR, Communication, Company-Specific, and Aptitude prep tracks.
 */

export const LANGUAGE_QUESTIONS = {
  java: {
    Beginner: [
      { q: "What is the JVM? How does it differ from JDK and JRE?", tip: "Explain Java Virtual Machine (execution), Java Runtime Environment (libs), and Java Development Kit (tools).", keywords: ["jvm", "jre", "jdk", "virtual machine", "compiler"] },
      { q: "What does the 'static' keyword mean in Java? Can we overload static methods?", tip: "Static belongs to the class rather than instance. Static methods can be overloaded but cannot be overridden.", keywords: ["static", "class", "overload", "override", "memory"] },
      { q: "Explain the difference between path and classpath.", tip: "Path is an environment variable to locate executables. Classpath locates .class files.", keywords: ["path", "classpath", "environment", "variable", "binary"] },
      { q: "What are the default values of object references and primitive variables in Java?", tip: "Instance object references default to null. Primitives have defaults like 0, 0.0, or false.", keywords: ["default", "primitive", "reference", "null", "instance"] },
      { q: "What is a constructor? Does Java support default constructors?", tip: "A constructor initializes objects. If none is defined, compiler adds a default no-argument constructor.", keywords: ["constructor", "default", "initialize", "object", "argument"] },
      { q: "Why is String immutable in Java?", tip: "For security, caching in String Pool, synchronization, and hashcode caching.", keywords: ["immutable", "string pool", "caching", "security", "thread-safe"] },
      { q: "What is the difference between equals() and == in Java?", tip: "== compares references (memory addresses). equals() compares actual value content.", keywords: ["equals", "==", "reference", "content", "address"] },
      { q: "What is wrapper class? Why do we need it?", tip: "Wrappers convert primitives into objects. Necessary for Collections framework.", keywords: ["wrapper", "primitive", "object", "collections", "boxing"] },
      { q: "What is package in Java? How do we use import?", tip: "Packages organize classes into namespaces to avoid naming conflicts.", keywords: ["package", "import", "namespace", "conflict", "organize"] },
      { q: "Explain the access modifiers in Java (private, default, protected, public).", tip: "Private is class-only. Default is package-only. Protected adds subclasses. Public is project-wide.", keywords: ["modifier", "private", "protected", "public", "default"] }
    ],
    Intermediate: [
      { q: "How does HashMap work internally in Java? What is collision resolution?", tip: "Uses array of nodes. Resolves collisions using LinkedList, transitioning to Red-Black tree in Java 8.", keywords: ["hashmap", "collision", "linkedlist", "red-black tree", "hashcode", "equals"] },
      { q: "What is the difference between Checked and Unchecked exceptions?", tip: "Checked are verified at compile-time (extend Exception). Unchecked are at runtime (extend RuntimeException).", keywords: ["checked", "unchecked", "runtimeexception", "compile-time", "throws"] },
      { q: "Explain the difference between final, finally, and finalize.", tip: "final is modifier (classes/methods/vars). finally is try-catch block. finalize is garbage collection method.", keywords: ["final", "finally", "finalize", "gc", "block"] },
      { q: "Compare ArrayList vs LinkedList in terms of time complexity.", tip: "ArrayList: O(1) random access, O(N) shift on add/remove. LinkedList: O(N) search, O(1) add/remove nodes.", keywords: ["arraylist", "linkedlist", "complexity", "random access", "node"] },
      { q: "What is garbage collection in Java? How does System.gc() work?", tip: "Automatic memory manager reclaiming heap. System.gc() suggests collection but does not guarantee immediate run.", keywords: ["garbage", "gc", "heap", "memory", "system.gc"] },
      { q: "What is thread synchronization? What is a synchronized block?", tip: "Prevents thread interference and memory consistency errors. synchronized blocks lock specific objects.", keywords: ["synchronization", "thread", "lock", "block", "thread-safe"] },
      { q: "What is the Java String Pool? How does intern() work?", tip: "Special storage region in heap. intern() adds a string to pool or returns its reference if exists.", keywords: ["pool", "string pool", "intern", "heap", "reference"] },
      { q: "Explain the difference between Abstract Class and Interface in Java 8/9.", tip: "Abstract class can hold instance state. Interfaces support default/static/private methods but no instance fields.", keywords: ["abstract", "interface", "default", "multiple inheritance", "extend"] },
      { q: "What is the difference between Comparable and Comparator?", tip: "Comparable defines natural ordering (compareTo). Comparator defines custom external sorting (compare).", keywords: ["comparable", "comparator", "sorting", "compareto", "natural"] },
      { q: "What is functional interface? Name some built-in ones.", tip: "Interface with exactly one abstract method. Examples: Runnable, Callable, Consumer, Predicate.", keywords: ["functional", "lambda", "runnable", "predicate", "consumer"] }
    ],
    Advanced: [
      { q: "What is the Java Memory Model (JMM)? What does 'happens-before' guarantee?", tip: "Specifies how threads interact through memory. Guarantee visibility and execution ordering.", keywords: ["jmm", "happens-before", "thread", "volatile", "memory"] },
      { q: "Explain G1 GC vs ZGC. When would you prefer ZGC?", tip: "G1 partitions heap. ZGC is concurrent, low latency, processing multi-terabyte heaps with sub-millisecond pauses.", keywords: ["g1", "zgc", "latency", "pause", "garbage collector"] },
      { q: "What are volatile variables? How do they prevent instruction reordering?", tip: "Guarantees direct read/write to main memory, preventing thread caching and compiler instruction reordering.", keywords: ["volatile", "reordering", "memory", "cache", "barrier"] },
      { q: "How does ConcurrentHashMap achieve concurrency without locking the entire table?", tip: "Java 8 uses synchronized nodes and CAS (Compare-And-Swap) operations on bucket heads.", keywords: ["concurrenthashmap", "cas", "synchronized", "bucket", "lock"] },
      { q: "What are Virtual Threads (Project Loom)? How do they differ from platform threads?", tip: "Lightweight threads managed by JVM. Millions can run concurrently without operating system thread overhead.", keywords: ["virtual thread", "loom", "carrier", "platform thread", "blocking"] },
      { q: "What is ClassLoader? Explain delegation hierarchy.", tip: "Loads classes into JVM. Delegation hierarchy: Bootstrap -> Extension -> Application ClassLoader.", keywords: ["classloader", "delegation", "parent", "hierarchy", "bootstrap"] },
      { q: "What is JIT compiler? How does it optimize bytecode at runtime?", tip: "Just-In-Time compiler. Translates hot bytecode into native machine code. Performs inlining and loop optimization.", keywords: ["jit", "inlining", "hotspot", "bytecode", "native"] },
      { q: "Explain the Diamond Problem in Multiple Inheritance. How does Java solve it with default methods?", tip: "Ambiguity when two parent interfaces define same default method. Solver class must override default method.", keywords: ["diamond", "multiple inheritance", "default", "interface", "ambiguity"] },
      { q: "What is Type Erasure in Java Generics?", tip: "Compiler replaces type parameters with bounds or Object, removing type metadata before bytecode output.", keywords: ["generics", "type erasure", "compiler", "cast", "object"] },
      { q: "What is Reflection API? What are its drawbacks?", tip: "Allows inspection/modification of runtime classes. Drawbacks: performance overhead, security breaches.", keywords: ["reflection", "inspection", "drawback", "performance", "security"] }
    ]
  },
  c: {
    Beginner: [
      { q: "What are local, global, and static variables in C?", tip: "Local is stack-bounded. Global is data-segment wide. Static retains value across function calls.", keywords: ["local", "global", "static", "scope", "lifetime"] },
      { q: "What is a pointer? How do you declare and initialize it?", tip: "A pointer stores memory address of another variable. Declared with * and initialized with &.", keywords: ["pointer", "address", "ampersand", "dereference", "memory"] },
      { q: "What is the difference between malloc() and calloc()?", tip: "malloc allocate raw memory. calloc allocate and initialize blocks to zero.", keywords: ["malloc", "calloc", "initialize", "zero", "bytes"] },
      { q: "What is a structure in C? How does it differ from an array?", tip: "Structure aggregates different data types. Array aggregates identical data types.", keywords: ["structure", "struct", "array", "type", "member"] },
      { q: "Explain the purpose of the header files (e.g., stdio.h, stdlib.h).", tip: "Declare standard functions. stdio.h handles I/O, stdlib.h handles memory and conversions.", keywords: ["header", "include", "stdio", "stdlib", "declaration"] },
      { q: "What is preprocessor directive in C?", tip: "Commands starting with # executed by preprocessor before compiling (e.g., #define, #include).", keywords: ["preprocessor", "#define", "#include", "macro", "compile"] },
      { q: "What is a NULL pointer? How is it different from a void pointer?", tip: "NULL pointer points to address 0. Void pointer is generic pointer with no associated data type.", keywords: ["null", "void", "generic", "pointer", "address"] },
      { q: "Explain the difference between ++i and i++.", tip: "++i increments first and then returns. i++ returns value first and then increments.", keywords: ["increment", "pre-increment", "post-increment", "unary"] },
      { q: "What is the purpose of main() function in C?", tip: "Starting execution point of any C program. Returns exit status to the operating system.", keywords: ["main", "execution", "exit", "return", "program"] },
      { q: "What is recursion? Write down the base condition role.", tip: "Function calling itself. Base condition stops the recursion to avoid stack overflow.", keywords: ["recursion", "base condition", "stack", "call", "overflow"] }
    ],
    Intermediate: [
      { q: "What is the difference between structure and union in C?", tip: "Structure allocates memory for all members. Union shares same memory block among all members.", keywords: ["structure", "union", "memory", "share", "size"] },
      { q: "Explain pointer arithmetic in C. What happens when you add an integer to a pointer?", tip: "Moves pointer by integer * size of data type it points to.", keywords: ["pointer", "arithmetic", "size", "offset", "address"] },
      { q: "What is dynamic memory allocation? How do you prevent memory leaks?", tip: "Allocating heap memory at runtime. Prevent leaks by calling free() on allocated pointers.", keywords: ["dynamic", "heap", "leak", "free", "alloc"] },
      { q: "What is a dangling pointer? How can you avoid it?", tip: "Pointer referencing memory that has been deallocated. Avoid by setting to NULL after freeing.", keywords: ["dangling", "free", "null", "deallocated", "pointer"] },
      { q: "What is the difference between call by value and call by reference in C?", tip: "Value passes copy of variable. Reference passes variable address, allowing modification of original value.", keywords: ["value", "reference", "copy", "address", "argument"] },
      { q: "Explain storage classes in C (auto, register, static, extern).", tip: "Determine scope, lifetime, and storage location (CPU register, stack, static data segment).", keywords: ["storage", "extern", "register", "static", "auto"] },
      { q: "What is a file pointer? How do you open and close files in C?", tip: "FILE * structures tracking stream state. Use fopen() to open, fclose() to release.", keywords: ["file", "fopen", "fclose", "pointer", "stream"] },
      { q: "What is command line arguments in C? Explain argc and argv.", tip: "Parameters passed on execution. argc is count, argv is array of string pointers.", keywords: ["arguments", "argc", "argv", "command", "args"] },
      { q: "Explain macro expansion vs function calls.", tip: "Macros are inline replaced by preprocessor (no call overhead). Functions compile to jumps with stack frames.", keywords: ["macro", "preprocessor", "inline", "overhead", "function"] },
      { q: "What is string copy validation? Why is strcpy dangerous?", tip: "strcpy doesn't check bounds. Can cause buffer overflow. Use strncpy instead.", keywords: ["strcpy", "strncpy", "overflow", "buffer", "bounds"] }
    ],
    Advanced: [
      { q: "What is a function pointer in C? Write its declaration and typical usage.", tip: "Pointer storing code start address. Used for callbacks and event handlers.", keywords: ["function pointer", "callback", "address", "signature", "declaration"] },
      { q: "What is structure padding and alignment in C? How does it affect structure size?", tip: "Compiler inserts empty bytes to align fields to CPU word boundaries, maximizing access speed.", keywords: ["padding", "alignment", "word", "compiler", "boundary"] },
      { q: "What is memory segmentation? Contrast Stack, Heap, Data, and Text segments.", tip: "Stack (locals), Heap (dynamic), Data (globals/statics), Text (compiled instructions).", keywords: ["segmentation", "stack", "heap", "data", "text"] },
      { q: "Explain the 'volatile' keyword in C. When is it necessary?", tip: "Tells compiler variable can change externally (e.g. hardware register). Prevents compiler optimizations.", keywords: ["volatile", "optimization", "register", "hardware", "compiler"] },
      { q: "What is a memory leak? How do tools like Valgrind detect memory leak anomalies?", tip: "Allocated memory never freed. Valgrind tracks malloc/free calls to report leaks and invalid accesses.", keywords: ["leak", "valgrind", "malloc", "free", "pointer"] },
      { q: "Explain bit fields in C structures. How do they optimize space?", tip: "Declaring structure fields with explicit bit sizes, allowing tight packing of bit-flags.", keywords: ["bit field", "struct", "flag", "packing", "bits"] },
      { q: "What is the difference between inline functions and standard functions in C?", tip: "inline suggests compiler inline replacement to avoid call stack overhead, resolved at compile-time.", keywords: ["inline", "overhead", "stack", "compiler", "replacement"] },
      { q: "How do you implement custom memory allocators in C using sbrk or mmap?", tip: "Requests memory blocks from OS kernel, managing free list blocks using boundary tags.", keywords: ["allocator", "sbrk", "mmap", "kernel", "free list"] },
      { q: "Explain assembly inlining inside C programs.", tip: "Allows placing raw CPU instructions directly inside C source blocks using __asm__ macros.", keywords: ["assembly", "inline", "instruction", "__asm__", "cpu"] },
      { q: "What is undefined behavior in C? Give three examples.", tip: "Operations compiler makes no guarantees on: out-of-bounds array access, null pointer dereference, signed overflow.", keywords: ["undefined", "overflow", "bounds", "dereference", "garbage"] }
    ]
  },
  cpp: {
    Beginner: [
      { q: "What is C++? How does it differ from C?", tip: "C++ is superset of C, introducing object-oriented programming (classes, inheritance, polymorphism).", keywords: ["cpp", "c++", "object-oriented", "class", "superset"] },
      { q: "Explain references in C++. How do they differ from pointers?", tip: "Reference is alias to variable. Cannot be null, must be initialized, cannot be reassigned.", keywords: ["reference", "pointer", "alias", "null", "reassigned"] },
      { q: "What is method overloading? Write a code sample schema.", tip: "Multiple functions with same name but different argument counts or types.", keywords: ["overloading", "signature", "arguments", "compile-time", "polymorphism"] },
      { q: "What is a class and an object in C++?", tip: "Class is user-defined blueprint (member variables and functions). Object is class instance.", keywords: ["class", "object", "blueprint", "instance", "oop"] },
      { q: "Explain the role of access specifiers (private, protected, public) in C++.", tip: "Private: class-only. Protected: class and subclasses. Public: accessible from anywhere.", keywords: ["specifier", "private", "protected", "public", "access"] },
      { q: "What is namespace? Why is 'using namespace std;' discouraged in large projects?", tip: "Prevents naming conflicts. Discouraged in headers to avoid introducing naming clashes.", keywords: ["namespace", "std", "clash", "conflict", "scope"] },
      { q: "What is a default argument? Can it be placed anywhere in parameters list?", tip: "Value used if argument is omitted. Must be placed at end of parameters list.", keywords: ["default", "argument", "parameter", "trailing", "omitted"] },
      { q: "What is standard template library (STL)?", tip: "C++ library providing container classes, algorithms, and iterators (e.g. vector, map).", keywords: ["stl", "template", "vector", "containers", "algorithm"] },
      { q: "Explain memory allocation using new and delete in C++.", tip: "new allocates memory on heap. delete releases it. (Never mix with malloc/free).", keywords: ["new", "delete", "heap", "deallocate", "malloc"] },
      { q: "What is C++ inline function? When is it used?", tip: "Suggests inline substitution. Used for small, frequently called helper methods.", keywords: ["inline", "overhead", "substitution", "compile-time", "function"] }
    ],
    Intermediate: [
      { q: "Explain constructors and destructors. What is a copy constructor?", tip: "Constructor initializes objects. Destructor cleans resources. Copy constructor clones existing object.", keywords: ["constructor", "destructor", "copy constructor", "initialize", "clone"] },
      { q: "What is function overriding? How is it different from function overloading?", tip: "Overriding: redefining parent virtual function in child. Overloading: same scope, different signatures.", keywords: ["overriding", "overloading", "virtual", "polymorphism", "redefining"] },
      { q: "What is virtual function in C++? Why do we need it?", tip: "Allows child method execution during runtime dynamic dispatch (runtime polymorphism).", keywords: ["virtual", "polymorphism", "runtime", "dispatch", "override"] },
      { q: "What is a pure virtual function? What is an abstract class?", tip: "Pure virtual has no implementation (= 0). Class containing at least one is abstract.", keywords: ["pure virtual", "abstract class", "interface", "instance", "override"] },
      { q: "Explain friendship in C++ (friend class and friend function).", tip: "Allows external class/function to access private and protected members of class.", keywords: ["friend", "private", "protected", "access", "member"] },
      { q: "What is operator overloading in C++?", tip: "Redefining C++ operators (e.g. +, <<) to perform custom operations on user-defined objects.", keywords: ["operator", "overloading", "custom", "object", "redefine"] },
      { q: "What is object slicing in C++?", tip: "Occurs when a child object is assigned to parent class object, stripping away child attributes.", keywords: ["slicing", "parent", "child", "assign", "strip"] },
      { q: "What is exception handling? Explain try, catch, throw in C++.", tip: "try block wraps runtime operations. throw launches error. catch handles specified error type.", keywords: ["exception", "try", "catch", "throw", "runtime"] },
      { q: "Explain templates in C++. What are function templates and class templates?", tip: "Generic programming components. Compiler generates actual class/function code based on template type.", keywords: ["template", "generic", "compiler", "type", "class"] },
      { q: "What is the difference between deep copy and shallow copy?", tip: "Shallow copy copies pointers (shares address). Deep copy allocates new memory and duplicates data.", keywords: ["shallow", "deep copy", "pointer", "address", "duplicate"] }
    ],
    Advanced: [
      { q: "What is the Virtual Table (Vtable) and Virtual Table Pointer (Vptr)? How do they implement dynamic dispatch?", tip: "Vtable is array of virtual function pointers. Vptr points to vtable. Used at runtime to resolve calls.", keywords: ["vtable", "vptr", "dynamic dispatch", "polymorphism", "runtime"] },
      { q: "Explain Smart Pointers in C++11 (unique_ptr, shared_ptr, weak_ptr).", tip: "Manage heap lifetime automatically. unique (single owner), shared (ref-counted), weak (cycles resolver).", keywords: ["smart pointer", "unique_ptr", "shared_ptr", "weak_ptr", "ref-count"] },
      { q: "What is RAII (Resource Acquisition Is Initialization) in C++?", tip: "Resource lifetime bound to object lifetime. Constructor allocates, destructor automatically releases.", keywords: ["raii", "resource", "constructor", "destructor", "lifetime"] },
      { q: "What is move semantics and rvalue reference (&&)? How do they optimize performance?", tip: "Allows transferring resources from temporary rvalues without expensive deep copy operations.", keywords: ["move", "rvalue", "transfer", "copy", "performance"] },
      { q: "What is multiple inheritance? Explain virtual inheritance to solve the Diamond Problem.", tip: "Inheriting from multiple parents. Virtual inheritance ensures only one copy of base parent is created.", keywords: ["diamond", "virtual inheritance", "multiple", "base class", "ambiguity"] },
      { q: "What is Rule of Three, Five, and Zero in C++?", tip: "If you define destructor/copy-constructor/copy-assignment, define all 3 (or 5 for moves), or rely on compiler defaults (0).", keywords: ["rule of three", "rule of five", "destructor", "assignment", "compiler"] },
      { q: "Explain template metaprogramming. How is it executed at compile-time?", tip: "Using templates to generate code or compute values at compile-time (e.g. constant expressions).", keywords: ["metaprogramming", "compile-time", "template", "consteval", "compute"] },
      { q: "What is copy elision and Return Value Optimization (RVO)?", tip: "Compiler optimizations omitting copy/move constructors when returning objects from functions.", keywords: ["elision", "rvo", "optimization", "constructor", "copy"] },
      { q: "What is std::move? Does it actually move anything?", tip: "Casts lvalue reference to rvalue reference. Doesn't move data; enables target to use move constructor.", keywords: ["std::move", "cast", "rvalue", "constructor", "reference"] },
      { q: "Explain memory ordering and atomic variables in C++ multithreading.", tip: "Guarantees thread-safe lock-free modifications, coordinating instruction caching across cores.", keywords: ["atomic", "memory ordering", "multithreading", "lock-free", "cache"] }
    ]
  },
  python: {
    Beginner: [
      { q: "What is Python? Explain dynamic typing.", tip: "High-level interpreted language. Dynamic typing means variable types are checked at runtime.", keywords: ["python", "interpreted", "dynamic typing", "runtime", "types"] },
      { q: "What are Python data structures? (List, Tuple, Set, Dict).", tip: "List (ordered, mutable), Tuple (ordered, immutable), Set (unordered, unique), Dict (key-value pairs).", keywords: ["list", "tuple", "set", "dict", "mutable"] },
      { q: "Explain the difference between mutable and immutable types.", tip: "Mutable (lists, dicts, sets) can change value. Immutable (tuples, strings, numbers) cannot.", keywords: ["mutable", "immutable", "tuple", "string", "modify"] },
      { q: "What is list comprehension? Write a syntax snippet.", tip: "Shorthand syntax to build lists: [x**2 for x in items if x > 0].", keywords: ["comprehension", "list", "syntax", "filter", "transform"] },
      { q: "How does exception handling work in Python? (try, except, finally).", tip: "try wraps statements. except catches exceptions. finally runs cleanups regardless of error.", keywords: ["try", "except", "finally", "exception", "catch"] },
      { q: "What are PEP 8 standards? Why are they used?", tip: "Official Python style guide. Promotes codebase readability and standard formatting.", keywords: ["pep 8", "style", "formatting", "readability", "indentation"] },
      { q: "Explain the difference between local and global variables.", tip: "Local is defined inside function. Global is module-wide (can override with global keyword).", keywords: ["local", "global", "scope", "function", "module"] },
      { q: "What is __init__ in Python classes?", tip: "Constructor initializer method. Invoked automatically when a new object is created.", keywords: ["__init__", "constructor", "initializer", "class", "instance"] },
      { q: "Explain the difference between 'is' and '==' in Python.", tip: "== compares values (equality). is compares identity (memory addresses).", keywords: ["is", "==", "identity", "equality", "memory"] },
      { q: "What is docstring in Python? How is it defined?", tip: "Triple-quoted strings documenting functions or modules. Accessible via __doc__.", keywords: ["docstring", "documentation", "triple-quote", "__doc__", "comment"] }
    ],
    Intermediate: [
      { q: "What is a decorator in Python? Write a mock decorator structure.", tip: "Function taking another function and expanding its behavior without changing code.", keywords: ["decorator", "wrapper", "function", "higher-order", "extend"] },
      { q: "Explain generators and yield keyword in Python.", tip: "Functions returning iterators. yield yields value and pauses execution state.", keywords: ["generator", "yield", "iterator", "pause", "memory"] },
      { q: "What is the Global Interpreter Lock (GIL)? How does it affect multithreading?", tip: "Mutex preventing multiple threads from executing python bytecodes simultaneously.", keywords: ["gil", "mutex", "thread", "multithreading", "concurrency"] },
      { q: "What is the difference between deepcopy and copy in Python?", tip: "copy creates shallow copy (shares sub-objects). deepcopy duplicates sub-objects recursively.", keywords: ["copy", "deepcopy", "shallow", "nested", "duplicate"] },
      { q: "Explain *args and **kwargs in function definitions.", tip: "*args collects positional arguments as tuple. **kwargs collects keyword arguments as dict.", keywords: ["*args", "**kwargs", "tuple", "dict", "arguments"] },
      { q: "What are lambda functions? When are they preferred?", tip: "Anonymous single-line functions. Preferred for quick callbacks (e.g. map, filter).", keywords: ["lambda", "anonymous", "single-line", "callback", "map"] },
      { q: "What is list slicing? Explain the start, stop, and step parameters.", tip: "Extracting elements: list[start:stop:step]. Default step is 1.", keywords: ["slice", "slicing", "step", "range", "extract"] },
      { q: "Explain list indexing vs dictionary lookup speeds.", tip: "List index: O(1). List search: O(N). Dictionary key lookup: average O(1) using hash table.", keywords: ["indexing", "lookup", "speed", "hash", "dict"] },
      { q: "What is method resolution order (MRO) in Python multiple inheritance?", tip: "MRO determines class lookup hierarchy. Computed using C3 Linearization algorithm.", keywords: ["mro", "inheritance", "lookup", "c3 linearization", "super"] },
      { q: "What are context managers and 'with' statement?", tip: "Simplify resource management. Use __enter__ and __exit__ (e.g. file close).", keywords: ["context", "with", "__enter__", "__exit__", "resource"] }
    ],
    Advanced: [
      { q: "How does garbage collection work in Python? Explain Reference Counting and Generational GC.", tip: "Ref count reclaims objects. Generational GC detects cyclic references using thresholds.", keywords: ["gc", "garbage collection", "reference counting", "generation", "cyclic"] },
      { q: "Explain metaclasses in Python. What is the role of '__new__' and '__init__' in type creation?", tip: "Metaclass is class of class. __new__ creates class object, __init__ initializes class parameters.", keywords: ["metaclass", "__new__", "__init__", "type", "class creation"] },
      { q: "What is descriptor protocol in Python? Explain __get__, __set__, and __delete__.", tip: "Objects overriding attribute access protocol. Enables custom property, methods behaviors.", keywords: ["descriptor", "__get__", "__set__", "__delete__", "attribute"] },
      { q: "How do you bypass GIL for parallel computing? Compare multiprocessing vs threading.", tip: "Bypass using multiprocessing (separate processes) or native extensions (C-types, NumPy).", keywords: ["gil", "multiprocessing", "threading", "process", "bypass"] },
      { q: "What is async/await and asyncio in Python? Explain the event loop.", tip: "Asynchronous programming patterns. Event loop schedules non-blocking coroutines.", keywords: ["asyncio", "async", "await", "event loop", "non-blocking"] },
      { q: "Explain slots (__slots__) in Python classes. How do they optimize memory usage?", tip: "Bypasses __dict__ namespace creation for instance fields, optimizing RAM allocation.", keywords: ["__slots__", "__dict__", "memory", "attribute", "class"] },
      { q: "What is monkey patching in Python? What are its risks?", tip: "Modifying module/class structures dynamically at runtime. Risk: debugging complexity.", keywords: ["monkey patching", "runtime", "modification", "override", "module"] },
      { q: "Explain weak references (weakref module). When is it useful?", tip: "References that don't prevent object collection. Useful for caches and mappings.", keywords: ["weakref", "garbage", "reference", "cache", "lifecycle"] },
      { q: "What is the difference between bytecode and source code execution in CPython?", tip: "CPython compiles source code to .pyc bytecodes, then executes them inside VM loop.", keywords: ["bytecode", "cpython", "vm", "compiler", "source"] },
      { q: "How does C-API integration work in Python using ctypes or Cython?", tip: "Allows wrapping low-level C libraries and calling them directly in Python scripts.", keywords: ["ctypes", "cython", "c-api", "compilation", "native"] }
    ]
  },
  javascript: {
    Beginner: [
      { q: "What are JS data types? Compare null vs undefined.", tip: "null is intentional empty value. undefined means variable declared but not initialized.", keywords: ["types", "null", "undefined", "object", "type"] },
      { q: "What is the DOM in web development?", tip: "Document Object Model. Programming interface representing HTML elements structure as a tree.", keywords: ["dom", "tree", "html", "element", "browser"] },
      { q: "Explain the difference between let, const, and var.", tip: "var is function-scoped. let/const are block-scoped. const variables cannot be reassigned.", keywords: ["let", "const", "var", "scope", "reassign"] },
      { q: "What is arrow function? How does it handle 'this' context?", tip: "Shorthand syntax. Arrow functions do not bind 'this'; they inherit it lexically.", keywords: ["arrow", "function", "lexical", "this", "syntax"] },
      { q: "Explain the difference between == and === in JavaScript.", tip: "== compares value (performs coercion). === compares both value and type.", keywords: ["==", "===", "coercion", "equality", "strict"] },
      { q: "What is array map() vs filter()?", tip: "map() transforms all array elements. filter() returns sub-array satisfying condition.", keywords: ["map", "filter", "array", "transform", "condition"] },
      { q: "What is template literals in ES6?", tip: "Backtick string syntax supporting embedded expressions: `${varName}`.", keywords: ["template", "backtick", "interpolation", "es6", "string"] },
      { q: "What is local storage vs session storage?", tip: "Local storage persists permanently. Session storage clears when tab/browser closes.", keywords: ["localstorage", "sessionstorage", "persist", "cookie", "storage"] },
      { q: "How do you handle clicks in JavaScript? (Event listeners).", tip: "Use addEventListener('click', callback) on selected DOM elements.", keywords: ["event", "listener", "click", "callback", "dom"] },
      { q: "What is standard JSON object format?", tip: "Javascript Object Notation. Shorthand data interchange syntax mapping keys to values.", keywords: ["json", "serialization", "keys", "values", "format"] }
    ],
    Intermediate: [
      { q: "What is a Promise in JavaScript? Explain its states.", tip: "Object representing async operation result. States: Pending, Fulfilled, Rejected.", keywords: ["promise", "pending", "fulfilled", "rejected", "async"] },
      { q: "Explain closures in JavaScript. Write a simple closure scenario.", tip: "Function retaining access to its lexical parent scope variables even after parent execution.", keywords: ["closure", "lexical", "scope", "function", "variable"] },
      { q: "What is prototype inheritance in JavaScript?", tip: "Objects link to parent prototypes to share methods/properties without cloning code.", keywords: ["prototype", "inheritance", "lookup", "link", "object"] },
      { q: "Explain event bubbling vs event capturing.", tip: "Bubbling: event propagates up parent nodes. Capturing: propagates down target node.", keywords: ["bubbling", "capturing", "propagation", "event", "dom"] },
      { q: "What is 'this' keyword binding? Compare call, apply, and bind.", tip: "this refers to execution context. call/apply invoke instantly. bind returns bound function.", keywords: ["this", "call", "apply", "bind", "context"] },
      { q: "Explain hoisting in JavaScript (variable vs function hoisting).", tip: "Declarations are moved to top of scope before execution. var is initialized to undefined, let/const are not.", keywords: ["hoisting", "var", "let", "declaration", "scope"] },
      { q: "What is asynchronous Javascript? Explain event loop.", tip: "Single-threaded execution model. Event loop executes tasks from task/microtask queues.", keywords: ["async", "event loop", "thread", "queue", "callback"] },
      { q: "What is destructured assignment in ES6?", tip: "Unpacking properties from objects/arrays into variables: const {x} = obj.", keywords: ["destructuring", "unpack", "es6", "assignment", "object"] },
      { q: "Explain strict mode ('use strict'). What are its benefits?", tip: "Opt-in restricted JavaScript mode. Catches silent syntax faults, blocks eval variable leaks.", keywords: ["strict", "use strict", "syntax", "eval", "restricted"] },
      { q: "Explain local callbacks vs Promises in async operations.", tip: "Callbacks can lead to nested 'Callback Hell'. Promises resolve with chaining (.then).", keywords: ["callback", "promise", "chaining", "callback hell", "async"] }
    ],
    Advanced: [
      { q: "Explain the JavaScript Event Loop, Macro-tasks, and Micro-tasks.", tip: "Micro-tasks (Promises) run before Macro-tasks (setTimeout) at the end of stack loops.", keywords: ["event loop", "microtask", "macrotask", "promise", "stack"] },
      { q: "What is Prototypal Chain? How does Object.create() work?", tip: "Chain of __proto__ links ending at null. Object.create() makes new object with custom prototype.", keywords: ["prototype", "chain", "object.create", "__proto__", "lookup"] },
      { q: "What are generator functions and yield keyword in JavaScript?", tip: "Functions that return iterator objects. Pause execution on yield statements.", keywords: ["generator", "yield", "iterator", "pause", "next"] },
      { q: "Explain memory leak scopes in JavaScript (closures, detached DOM nodes, global leaks).", tip: "Detached DOM variables or active timers retaining closures reference lead to memory leaks.", keywords: ["memory leak", "detached dom", "garbage", "leak", "closure"] },
      { q: "What is Debouncing and Throttling? Write an implementation outline.", tip: "Debounce: executes after delay. Throttle: limits calls to max once per interval.", keywords: ["debounce", "throttle", "frequency", "delay", "limit"] },
      { q: "Explain WeakMap vs Map. How does garbage collection handle keys in WeakMap?", tip: "WeakMap keys must be objects and are held weakly, allowing garbage collection if no references exist.", keywords: ["weakmap", "map", "keys", "garbage collection", "reference"] },
      { q: "Explain the Virtual DOM diffing reconciliation concept.", tip: "Compares Virtual DOM tree state changes to batch actual DOM updates, improving speed.", keywords: ["virtual dom", "diffing", "reconciliation", "batch", "render"] },
      { q: "What is Web Worker? When would you use it?", tip: "Background browser script running on a separate thread, preventing main UI freeze.", keywords: ["web worker", "thread", "background", "computation", "ui"] },
      { q: "What is Currying in functional programming?", tip: "Translating function with multiple arguments into sequence of single-argument functions.", keywords: ["currying", "functional", "sequence", "arguments", "closure"] },
      { q: "Explain Shadow DOM and CSS variables isolation.", tip: "Scoped DOM tree isolated inside custom elements. CSS/JS doesn't leak out of shadow boundaries.", keywords: ["shadow dom", "isolation", "scoped", "web component", "encapsulate"] }
    ]
  },
  sql: {
    Beginner: [
      { q: "What is SQL? What are its subdivisions (DDL, DML, DCL)?", tip: "Structured Query Language. DDL (data definition), DML (manipulation), DCL (control).", keywords: ["sql", "ddl", "dml", "dcl", "language"] },
      { q: "What is a primary key? How does it differ from a unique key?", tip: "Primary Key uniquely identifies rows and cannot be null. Unique key allows one null.", keywords: ["primary key", "unique key", "null", "foreign key", "identify"] },
      { q: "Explain the SELECT query syntax and WHERE clause.", tip: "SELECT lists target columns. WHERE filters rows matching defined constraints.", keywords: ["select", "where", "filter", "constraint", "column"] },
      { q: "What is database normalization? Explain 1NF.", tip: "Organizing columns/tables to reduce redundancy. 1NF: atomic values in each cell.", keywords: ["normalization", "redundancy", "1nf", "atomic", "cell"] },
      { q: "What is a Foreign Key? What are its benefits?", tip: "Column linking two tables. Enforces referential integrity constraints between records.", keywords: ["foreign key", "integrity", "referential", "relationship", "constraint"] },
      { q: "What are SQL joins? List basic types.", tip: "Combines table rows. Types: INNER, LEFT, RIGHT, FULL outer joins.", keywords: ["join", "inner", "left", "right", "outer"] },
      { q: "What is the purpose of GROUP BY clause?", tip: "Aggregates matching rows (e.g. SUM, COUNT) sharing common column values.", keywords: ["group by", "aggregate", "sum", "count", "having"] },
      { q: "Explain the difference between WHERE and HAVING.", tip: "WHERE filters rows before aggregation. HAVING filters aggregated groups.", keywords: ["where", "having", "filter", "aggregate", "group"] },
      { q: "What is the difference between DELETE and TRUNCATE?", tip: "DELETE removes rows (DML, rollback allowed). TRUNCATE drops table storage (DDL, no rollback).", keywords: ["delete", "truncate", "ddl", "dml", "rollback"] },
      { q: "What is index? Why do we use indexes?", tip: "Database search structure. Speeds up data retrieval at cost of additional write overhead.", keywords: ["index", "retrieval", "search", "speed", "overhead"] }
    ],
    Intermediate: [
      { q: "What are ACID properties in database transactions?", tip: "Atomicity (all or nothing), Consistency, Isolation (concurrency), Durability (persisted).", keywords: ["acid", "atomicity", "consistency", "isolation", "durability"] },
      { q: "Explain Clustered vs Non-Clustered index.", tip: "Clustered: physical row order (one per table). Non-clustered: index pointer lookup.", keywords: ["clustered", "non-clustered", "index", "pointer", "lookup"] },
      { q: "What is subquery? Contrast correlated vs non-correlated subqueries.", tip: "Query inside query. Correlated references outer query fields (evaluated per row).", keywords: ["subquery", "correlated", "non-correlated", "outer", "evaluate"] },
      { q: "What is a view? Why is it useful?", tip: "Virtual table stored as query. Simplifies query structure and restricts access.", keywords: ["view", "virtual table", "query", "access", "restrict"] },
      { q: "Explain database normalization up to 3NF.", tip: "1NF (atomic), 2NF (remove partial dependencies), 3NF (remove transitive dependencies).", keywords: ["normalization", "1nf", "2nf", "3nf", "dependency"] },
      { q: "What are triggers in SQL? What are their disadvantages?", tip: "Stored scripts executing automatically on events (insert/update). Disadvantage: hidden complexity.", keywords: ["trigger", "disadvantage", "automatic", "hidden", "event"] },
      { q: "What is self join? Write a query scenario.", tip: "Joining a table with itself (e.g., matching employees to managers in employee table).", keywords: ["self join", "join", "employee", "alias", "table"] },
      { q: "What is constraint? List standard constraints.", tip: "Rules enforced on columns: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT.", keywords: ["constraint", "check", "default", "rule", "not null"] },
      { q: "Explain transaction isolation levels.", tip: "Read Uncommitted, Read Committed, Repeatable Read, Serializable (prevents dirty/phantom reads).", keywords: ["isolation", "transaction", "serializable", "dirty read", "phantom"] },
      { q: "Compare SQL vs NoSQL databases.", tip: "SQL: relational, structured schemas, ACID, vertical scaling. NoSQL: non-relational, dynamic schema, horizontally scales.", keywords: ["sql", "nosql", "relational", "schema", "scale"] }
    ],
    Advanced: [
      { q: "What is Multi-Version Concurrency Control (MVCC)? How does it support read consistency?", tip: "Writes create new versions of rows instead of locking. Readers access snapshot version.", keywords: ["mvcc", "concurrency", "lock", "version", "snapshot"] },
      { q: "Explain SQL Window Functions (e.g. ROW_NUMBER, DENSE_RANK, LEAD, LAG).", tip: "Perform calculations across set of rows related to current row, using OVER() clause.", keywords: ["window function", "over", "dense_rank", "lead", "lag"] },
      { q: "What is query optimizer? How do you read an EXPLAIN plan?", tip: "Generates optimal execution paths. EXPLAIN shows table scan patterns and index usage.", keywords: ["explain", "optimizer", "execution plan", "scan", "index"] },
      { q: "Explain deadlock in database transactions. How do engines detect it?", tip: "Two transactions hold locks the other needs. Engine runs cycle-detection on dependency graph.", keywords: ["deadlock", "lock", "cycle", "graph", "rollback"] },
      { q: "What are partitioned tables? Contrast horizontal vs vertical partitioning.", tip: "Splitting big tables. Horizontal splits rows (ranges). Vertical splits columns.", keywords: ["partitioning", "horizontal", "vertical", "split", "range"] },
      { q: "Explain indexes types: B-Tree, Hash, and GIN indexes.", tip: "B-Tree (ranges/sorting), Hash (equality lookups), GIN (inverted index for arrays/JSON).", keywords: ["b-tree", "hash", "gin", "index type", "lookup"] },
      { q: "What is CAP theorem? How does it apply to distributed datastores?", tip: "Consistency, Availability, Partition Tolerance. Distributed systems can pick max 2.", keywords: ["cap theorem", "consistency", "availability", "partition", "distributed"] },
      { q: "How do you optimize slow query containing massive JOIN operations?", tip: "Check indexes on foreign keys, avoid SELECT *, rewrite subqueries, use materialized views.", keywords: ["optimize", "join", "explain", "materialized view", "index"] },
      { q: "Explain database replication: Master-Slave vs Multi-Master setups.", tip: "Master-slave (reads scale, write to master). Multi-master (write conflicts risk).", keywords: ["replication", "master-slave", "multi-master", "conflict", "scale"] },
      { q: "What is two-phase commit protocol (2PC) in distributed transactions?", tip: "Commit mechanism: 1. Prepare phase (all vote), 2. Commit phase (all write).", keywords: ["2pc", "distributed", "commit", "prepare", "transaction"] }
    ]
  }
};

export const FUNDAMENTAL_QUESTIONS = {
  oop: [
    { q: "What are the four pillars of OOP? Explain encapsulation.", tip: "Encapsulation (data hiding), Inheritance (reuse), Polymorphism (overriding), Abstraction (interfaces).", keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction"] },
    { q: "What is the difference between abstraction and encapsulation?", tip: "Abstraction hides implementation complexity. Encapsulation hides state data using private/public scopes.", keywords: ["abstraction", "encapsulation", "hidden", "scope", "state"] },
    { q: "Explain method overloading vs method overriding.", tip: "Overloading: compile-time, same name, different signatures. Overriding: runtime dynamic dispatch, redefining parent class method.", keywords: ["overloading", "overriding", "compile-time", "runtime", "signature"] },
    { q: "What is multiple inheritance? Explain Diamond Problem.", tip: "Inheriting from multiple parent classes. Causes compiler ambiguity (Diamond Problem).", keywords: ["multiple", "inheritance", "diamond", "ambiguity", "parent"] },
    { q: "What is polymorphism? Contrast static vs dynamic polymorphism.", tip: "Polymorphism is single interface, multiple forms. Static is resolved at compile time, dynamic at runtime.", keywords: ["polymorphism", "static", "dynamic", "compile", "runtime"] },
    { q: "What is abstract class? How does it differ from interface?", tip: "Abstract class can hold state variables and constructors. Interface holds only defaults and static methods.", keywords: ["abstract", "interface", "constructor", "state", "instance"] },
    { q: "Explain composition vs inheritance. Why is composition preferred?", tip: "Inheritance is 'is-a' relationship. Composition is 'has-a' (loose coupling, easier runtime modifications).", keywords: ["composition", "inheritance", "has-a", "is-a", "coupling"] },
    { q: "What is constructor? Explain default, copy, and parameterized constructors.", tip: "Initializes object. Default has no arguments, copy clones object, parameterized accepts custom bounds.", keywords: ["constructor", "default", "copy", "parameter", "initialize"] },
    { q: "What is dynamic binding? How does it relate to virtual methods?", tip: "Determining target method to call at runtime based on object instance type.", keywords: ["dynamic binding", "virtual", "dispatch", "runtime", "resolve"] },
    { q: "What are SOLID design principles?", tip: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.", keywords: ["solid", "responsibility", "liskov", "dependency", "segregation"] }
  ],
  dsa: [
    { q: "Compare array vs linked list in terms of access, search, and insertion.", tip: "Array: O(1) index access, O(N) insertion (shifting). Linked List: O(N) access/search, O(1) node insertion.", keywords: ["array", "linked list", "access", "search", "insertion"] },
    { q: "What is a stack? How is it different from a queue?", tip: "Stack is LIFO (Last In First Out). Queue is FIFO (First In First Out).", keywords: ["stack", "queue", "lifo", "fifo", "push"] },
    { q: "How does binary search work? What is its time complexity?", tip: "Requires sorted array. Halves search window recursively. Complexity: O(log N).", keywords: ["binary search", "sorted", "complexity", "halves", "log"] },
    { q: "Explain difference between tree and graph.", tip: "Tree is hierarchical, acyclic connected graph. Graph can contain cycles and isolated nodes.", keywords: ["tree", "graph", "cycle", "directed", "hierarchical"] },
    { q: "What is hashing? How are bucket collisions resolved?", tip: "Mapping keys to indexes. Collisions resolved by chaining (LinkedList) or open addressing (linear probing).", keywords: ["hashing", "collision", "chaining", "probing", "bucket"] },
    { q: "Explain Quick Sort algorithm. What is its worst-case complexity?", tip: "Divide-and-conquer using pivot partition. Worst case: O(N^2) (e.g. sorted arrays), average: O(N log N).", keywords: ["quick sort", "pivot", "partition", "worst-case", "complexity"] },
    { q: "What is binary search tree (BST)? How does balance affect complexity?", tip: "Left child < parent < right child. Unbalanced BST degrades to O(N) linked list. Balanced (AVL, Red-Black) keeps O(log N).", keywords: ["bst", "binary search tree", "balanced", "avl", "red-black"] },
    { q: "Explain Dijkstra's algorithm. What is its time complexity?", tip: "Finds single-source shortest path in weighted graph. Time complexity: O((V + E) log V).", keywords: ["dijkstra", "shortest path", "weighted", "graph", "complexity"] },
    { q: "What is dynamic programming? How does it differ from divide-and-conquer?", tip: "DP solves overlapping subproblems, memoizing results. Divide-and-conquer solves independent subproblems.", keywords: ["dynamic programming", "memoization", "overlapping", "independent", "subproblems"] },
    { q: "What are BFS and DFS? Compare memory usage.", tip: "BFS (queue, level-order, uses more memory on wide trees). DFS (stack, depth-order).", keywords: ["bfs", "dfs", "queue", "stack", "memory"] }
  ],
  dbms: [
    { q: "What is database normalization? Explain 1NF, 2NF, and 3NF.", tip: "Reducing redundancy. 1NF (atomic), 2NF (remove partial keys dependency), 3NF (remove transitive dependency).", keywords: ["normalization", "redundancy", "dependency", "3nf", "transitive"] },
    { q: "Explain ACID properties in transactions.", tip: "Atomicity, Consistency, Isolation, Durability. Fundamental to consistency guarantees.", keywords: ["acid", "atomicity", "consistency", "isolation", "durability"] },
    { q: "What is clustered vs non-clustered index?", tip: "Clustered physically orders table rows. Non-clustered stores pointer index list.", keywords: ["clustered", "non-clustered", "index", "pointer", "lookup"] },
    { q: "What is a transaction deadlock? How is it resolved?", tip: "Circular dependency where transactions block each other. Resolved by engine rolling back one transaction.", keywords: ["deadlock", "transaction", "circular", "rollback", "dependency"] },
    { q: "Compare SQL vs NoSQL databases in terms of scaling and transactions.", tip: "SQL scales vertically (ACID). NoSQL scales horizontally (BASE model, eventual consistency).", keywords: ["sql", "nosql", "scaling", "acid", "relational"] },
    { q: "Explain transaction isolation levels and concurrency anomalies.", tip: "Dirty read (Read Uncommitted), Non-repeatable read (Read Committed), Phantom read (Repeatable Read).", keywords: ["isolation", "concurrency", "dirty read", "phantom", "serializable"] },
    { q: "What is referential integrity? How is it enforced?", tip: "Ensuring relationships between tables remain consistent. Enforced using Foreign Key constraints.", keywords: ["referential", "integrity", "foreign key", "constraint", "relationship"] },
    { q: "What is a database view? Contrast dynamic views vs materialized views.", tip: "View is stored query. Materialized view caches actual result data to disk, updated periodically.", keywords: ["view", "materialized view", "query", "cache", "result"] },
    { q: "Explain locking mechanisms: shared locks vs exclusive locks.", tip: "Shared lock (allows reading, blocks writes). Exclusive lock (blocks both reading and writing).", keywords: ["lock", "shared", "exclusive", "read", "write"] },
    { q: "What is two-phase locking (2PL)?", tip: "Concurrency control protocol: Growing phase (acquires locks) and Shrinking phase (releases locks).", keywords: ["2pl", "two-phase locking", "concurrency", "growing", "shrinking"] }
  ],
  os: [
    { q: "What is a process? How does it differ from a thread?", tip: "Process is execution program with dedicated address space. Thread is lightweight child sharing memory.", keywords: ["process", "thread", "address space", "memory", "lightweight"] },
    { q: "Explain the concept of virtual memory in operating systems.", tip: "Mapping hardware RAM to virtual address spaces using paging, allowing process execution beyond RAM limits.", keywords: ["virtual memory", "paging", "ram", "mapping", "address space"] },
    { q: "What is a deadlock? List the four Coffman conditions.", tip: "Coffman: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.", keywords: ["deadlock", "coffman", "mutual exclusion", "circular wait", "hold and wait"] },
    { q: "What is thrashing? How can it be prevented?", tip: "OS spends more time swapping pages than executing instructions. Prevent by adding RAM or limiting concurrency.", keywords: ["thrashing", "swapping", "paging", "ram", "cpu"] },
    { q: "Explain process scheduling algorithms in OS.", tip: "First Come First Serve, Shortest Job First, Round Robin (time slicing), Priority Scheduling.", keywords: ["scheduling", "round robin", "priority", "fcfs", "sjf"] },
    { q: "What is context switching? What overhead is involved?", tip: "Saving state of running process/thread and loading another. Overhead: CPU cycles and cache invalidation.", keywords: ["context switch", "overhead", "state", "cpu", "cache"] },
    { q: "What is paging? What is a Page Fault?", tip: "Fixed-size memory allocation. Page Fault occurs when requested page is not in physical RAM.", keywords: ["paging", "page fault", "ram", "disk", "allocation"] },
    { q: "Explain critical section problem and Semaphores vs Mutex.", tip: "Shared code region. Mutex is locking mechanism (ownership). Semaphore is signaling counter.", keywords: ["critical section", "mutex", "semaphore", "lock", "thread"] },
    { q: "What is a kernel? Contrast Monolithic vs Microkernel.", tip: "Core of OS. Monolithic (all drivers/filesystem in kernel space). Microkernel (moves modules to user space).", keywords: ["kernel", "monolithic", "microkernel", "drivers", "user space"] },
    { q: "Explain user mode vs kernel mode.", tip: "User mode has restricted CPU instructions (applications). Kernel mode has absolute access (OS core code).", keywords: ["user mode", "kernel mode", "restricted", "instruction", "privilege"] }
  ],
  cn: [
    { q: "Explain the OSI Reference Model layers.", tip: "Physical, Data Link, Network (IP), Transport (TCP), Session, Presentation, Application (HTTP).", keywords: ["osi", "layers", "network", "transport", "physical"] },
    { q: "Describe the TCP three-way handshake process.", tip: "SYN (client to server) -> SYN-ACK (server response) -> ACK (client confirmation). Connection is established.", keywords: ["handshake", "syn", "ack", "syn-ack", "connection"] },
    { q: "Compare TCP vs UDP protocols.", tip: "TCP (connection-oriented, reliable, window flow control). UDP (connectionless, fast, unreliable streaming).", keywords: ["tcp", "udp", "reliable", "connectionless", "streaming"] },
    { q: "What is IP address? Contrast IPv4 vs IPv6.", tip: "Logical address. IPv4 (32-bit, decimal dot notation). IPv6 (128-bit, hexadecimal colon notation).", keywords: ["ipv4", "ipv6", "bits", "address", "hexadecimal"] },
    { q: "How does DNS work? Explain resolution hierarchy.", tip: "Translates domains to IPs. Path: Local Cache -> Resolver -> Root Server -> TLD Server -> Authoritative DNS.", keywords: ["dns", "domain", "resolver", "root", "tld"] },
    { q: "What is the purpose of ARP (Address Resolution Protocol)?", tip: "Resolves dynamic Network Layer IP addresses to physical Link Layer MAC addresses.", keywords: ["arp", "mac", "ip", "address", "resolution"] },
    { q: "Explain flow control vs congestion control in TCP.", tip: "Flow control (prevents client overwhelming buffer). Congestion control (prevents network choke, e.g., slow start).", keywords: ["flow control", "congestion", "buffer", "slow start", "sliding window"] },
    { q: "What is DHCP? How does it assign IP addresses?", tip: "Dynamic Host Configuration Protocol. Automatically leases IPs using DORA process.", keywords: ["dhcp", "ip lease", "dora", "automatic", "configuration"] },
    { q: "What is HTTP? Explain the difference between HTTP and HTTPS.", tip: "HyperText Transfer Protocol. HTTPS adds TLS/SSL encryption over TCP port 443.", keywords: ["http", "https", "tls", "ssl", "encryption"] },
    { q: "Explain routing vs switching.", tip: "Switching operates on Local Network MAC addresses. Routing forwards packets across networks using IP.", keywords: ["routing", "switching", "mac", "ip", "packet"] }
  ],
  se: [
    { q: "Compare Agile vs Waterfall software development methodologies.", tip: "Waterfall is sequential and rigid. Agile is iterative, adapting to changing user feedback.", keywords: ["agile", "waterfall", "iterative", "sequential", "feedback"] },
    { q: "What are design patterns? List standard categories.", tip: "Reusable architectural solutions. Categories: Creational (Singleton), Structural (Adapter), Behavioral (Observer).", keywords: ["design pattern", "creational", "structural", "behavioral", "singleton"] },
    { q: "What is git? Explain branching and merge conflict.", tip: "Version control tool. Conflict occurs when changes merge on the same line of the same file.", keywords: ["git", "branch", "conflict", "merge", "version control"] },
    { q: "What is unit testing? Contrast black-box vs white-box testing.", tip: "Testing small code scopes. Black-box checks input/output boundaries. White-box inspects logic execution.", keywords: ["testing", "unit test", "black-box", "white-box", "logic"] },
    { q: "Explain CI/CD pipeline benefits.", tip: "Continuous Integration automates builds/tests. Continuous Deployment automates production delivery.", keywords: ["ci/cd", "integration", "deployment", "pipeline", "automation"] },
    { q: "What is Software Development Life Cycle (SDLC)?", tip: "Requirements analysis -> Design -> Implementation -> Testing -> Deployment -> Maintenance.", keywords: ["sdlc", "lifecycle", "design", "testing", "maintenance"] },
    { q: "Explain MVC architecture pattern.", tip: "Model (data logic) -> View (UI output representation) -> Controller (requests router dispatcher).", keywords: ["mvc", "model", "view", "controller", "architecture"] },
    { q: "What is regression testing? When is it executed?", tip: "Re-running test suites after changes to ensure no side-effect breakages occurred.", keywords: ["regression", "testing", "changes", "test suite", "verification"] },
    { q: "What is the difference between validation and verification in software testing?", tip: "Verification: 'Are we building the product right?'. Validation: 'Are we building the right product?'.", keywords: ["validation", "verification", "testing", "product", "requirements"] },
    { q: "Explain clean code principles: DRY, KISS, YAGNI.", tip: "DRY (Don't Repeat Yourself), KISS (Keep It Simple Stupid), YAGNI (You Aren't Gonna Need It).", keywords: ["dry", "kiss", "yagni", "clean code", "redundancy"] }
  ]
};

export const HR_QUESTIONS = {
  "Tell me about yourself": [
    { q: "Walk me through your resume and key technical milestones.", tip: "Brief summary of college, major projects, code languages, and targeted role.", keywords: ["project", "college", "career", "skills", "experience"] },
    { q: "How would your engineering peers describe you in three words?", tip: "Highlight collaborative, eager learner, problem solver with supporting logic.", keywords: ["words", "peer", "collaborative", "learner", "problem solver"] },
    { q: "Why did you choose engineering/computer science as a career path?", tip: "Relate to passion for building products and logical algorithmic debugging.", keywords: ["career", "engineering", "passion", "algorithms", "building"] }
  ],
  "Strengths and weaknesses": [
    { q: "What is your greatest professional strength and how do you apply it?", tip: "Provide concrete example (e.g. quick debugging, debugging under stress).", keywords: ["strength", "example", "problem-solving", "analytical", "communication"] },
    { q: "What is your biggest weakness and what steps are you taking to improve?", tip: "Mention a real but non-fatal weakness (e.g. public speaking) and steps taken.", keywords: ["weakness", "improve", "public speaking", "delegation", "time management"] },
    { q: "Tell me about a time you made a mistake. How did you correct it?", tip: "Acknowledge error, take accountability, and focus on resolutions.", keywords: ["mistake", "error", "accountability", "resolution", "correction"] }
  ],
  "Leadership": [
    { q: "Describe a scenario where you had to lead a project with tight deadlines.", tip: "Star method: task, delegation, milestones planning, execution under pressure.", keywords: ["lead", "delegation", "deadline", "star", "timeline"] },
    { q: "How do you motivate team members who are disengaged or falling behind?", tip: "Active listening, peer debugging sessions, and positive encouragement.", keywords: ["motivate", "listening", "encouragement", "support", "goals"] },
    { q: "What does leadership mean to you in a software engineering setup?", tip: "Empowering peers, clear goal setting, and technical mentorship.", keywords: ["leadership", "mentorship", "empower", "engineering", "collaboration"] }
  ],
  "Teamwork": [
    { q: "Tell me about a successful group project. What was your contribution?", tip: "Clarify role, git task sharing, and overall group delivery metrics.", keywords: ["group", "contribution", "git", "collaboration", "delivery"] },
    { q: "How do you handle working with someone whose work style is different?", tip: "Adapting communication, establishing clear parameters, respecting styles.", keywords: ["style", "different", "adapt", "communication", "boundaries"] },
    { q: "What steps do you take to align team goals on collaborative code projects?", tip: "Regular checkins, clear documentation, pull request reviews, milestones.", keywords: ["align", "goals", "documentation", "pull request", "checkin"] }
  ],
  "Conflict resolution": [
    { q: "Describe a time you had a technical disagreement with a team member.", tip: "Explain focus on code facts, profiling comparisons, and open peer debate.", keywords: ["disagreement", "technical", "debate", "resolution", "compromise"] },
    { q: "How do you handle feedback or criticism from a project coordinator?", tip: "Keep objective, seek clarification, and write down improvement targets.", keywords: ["criticism", "feedback", "improve", "objective", "clarification"] },
    { q: "What would you do if a peer refuses to follow git guidelines?", tip: "Private constructive discussion explaining risk of git merge conflicts.", keywords: ["guidelines", "git", "discussion", "conflict", "merge"] }
  ],
  "Career goals": [
    { q: "Where do you see yourself in five years within this industry?", tip: "Senior technical developer or architect leading modular product stacks.", keywords: ["years", "industry", "architect", "senior", "growth"] },
    { q: "What target skills do you hope to acquire in your first year here?", tip: "Mastering cloud deployment frameworks, CI/CD pipelines, scaling parameters.", keywords: ["skills", "cloud", "ci/cd", "scaling", "pipelines"] },
    { q: "Why do you want to join our organization specifically?", tip: "Relate to core products, engineering culture, and growth markets.", keywords: ["join", "organization", "culture", "products", "growth"] }
  ],
  "Project discussion": [
    { q: "Explain the architecture of your final-year academic project.", tip: "Database choices, frontend framework, routing layer, and hosting parameters.", keywords: ["architecture", "project", "database", "framework", "hosting"] },
    { q: "What was the most challenging bug in your codebase and how did you fix it?", tip: "Detail profiling logs, trace analysis, and specific code resolutions.", keywords: ["bug", "resolution", "profiling", "logs", "trace"] },
    { q: "How did you verify the scaling and performance of your projects?", tip: "Discuss mock load testing, query indexing, cache layer implementations.", keywords: ["performance", "scaling", "caching", "indexing", "load"] }
  ],
  "Placement readiness": [
    { q: "How have you prepared yourself for corporate engineering interviews?", tip: "Solved DSA problems, built full-stack mock code bases, reviewed core CS theory.", keywords: ["prepared", "interview", "dsa", "theory", "codebase"] },
    { q: "What is your strategy for adapting to a new codebase and stack quickly?", tip: "Read tests, run local builds, review documentation, ask structural questions.", keywords: ["adapting", "stack", "tests", "documentation", "builds"] },
    { q: "Are you open to relocation or shifts in target tech roles?", tip: "Eagerness to adapt to company parameters to maximize project value.", keywords: ["relocation", "shift", "adapt", "roles", "project"] }
  ]
};

export const COMMUNICATION_QUESTIONS = [
  { q: "Explain a complex technical concept (like recursion or caching) as if explaining to a non-technical peer.", tip: "Assess simple analogy selection, vocabulary accessibility, and logical flow.", keywords: ["analogy", "recursion", "caching", "simple", "non-technical"] },
  { q: "Convince our engineering committee why we should invest in migrating to a cloud database.", tip: "Assess professional terminology, persuasive arguments layout, and structured delivery.", keywords: ["cloud", "migrate", "database", "investment", "persuasion"] },
  { q: "Describe a project deadline failure. What would you write in a client status update?", tip: "Assess email tone, clear explanation of delays, and resolution roadmap presentation.", keywords: ["email", "status", "delays", "resolution", "client"] },
  { q: "Describe your dream software product. What core problem does it solve?", tip: "Assess passion, structured presentation of modules, and clear explanation of value.", keywords: ["product", "problem", "solution", "architecture", "value"] },
  { q: "How would you handle explaining a regression bug to a senior product director?", tip: "Assess accountability, technical clarity, and focus on deployment fix schedule.", keywords: ["regression", "bug", "director", "accountability", "fix"] }
];

export const COMPANY_DATA = {
  tcs: {
    name: "TCS (Tata Consultancy Services)",
    hiringProcess: "1. TCS NQT (National Qualifier Test) - Aptitude & Coding\n2. Technical Interview (DSA, OOP, SQL, Java/C++)\n3. Managerial Interview (Project discussions & scenario-based)\n4. HR Round (Relocation, document review, package discussion)",
    techQuestions: [
      "What is the difference between C and Java? (Memory allocation, compilation vs execution).",
      "Explain normalization and why 3NF is commonly preferred in banking database designs.",
      "Write a query to locate the second-highest salary from an Employee table."
    ],
    hrQuestions: [
      "TCS has projects in multiple locations. Are you willing to relocate?",
      "How do you handle working in a strict project timeline with changing requirements?"
    ],
    aptitudeQuestions: [
      "Quantitative: Time and Work, Percentages, Permutations.\nLogical: Series completion, blood relationships, syllogisms."
    ],
    faqs: [
      { q: "What is TCS Digital vs TCS Ninja?", a: "Ninja is the standard entry package (3.6 LPA) while Digital is the premium package (7.0 LPA) awarded for high performance in NQT and coding interviews." }
    ]
  },
  infosys: {
    name: "Infosys",
    hiringProcess: "1. Online Test (Aptitude, Verbal, Puzzle Solving, Coding)\n2. Technical Interview (OOP, DBMS, DSA basics, Project overview)\n3. HR Round",
    techQuestions: [
      "What is a virtual destructor in C++? Why do we need it?",
      "Explain the difference between GET and POST requests in REST API architecture.",
      "How do you resolve bucket collisions in a HashMap?"
    ],
    hrQuestions: [
      "Why Infosys? What do you know about our global delivery model?",
      "Describe a team project conflict and how you managed it."
    ],
    aptitudeQuestions: [
      "Quantitative: Speed & Distance, Probability.\nLogical: Cryptarithmetic puzzles, data sufficiency."
    ],
    faqs: [
      { q: "What is SP vs DSE roles?", a: "Specialist Programmer (SP) is the highest dev package (9.5 LPA) focusing on complex algorithms. Digital Specialist Engineer (DSE) is 6.25 LPA." }
    ]
  },
  accenture: {
    name: "Accenture",
    hiringProcess: "1. Cognitive & Technical Assessment (Aptitude, MS Office, Networking basics)\n2. Coding Assessment (2 coding questions)\n3. Communication Assessment (Automated speaking/grammar check)\n4. Technical & HR Interview",
    techQuestions: [
      "What is the difference between Abstract Class and Interface in C# / Java?",
      "Explain Cloud Computing deployment models (Public, Private, Hybrid).",
      "Write a function to check if a string is a palindrome."
    ],
    hrQuestions: [
      "Accenture works heavily in consulting. How are your client communication skills?",
      "Tell me about a time you had to learn a technology from scratch quickly."
    ],
    aptitudeQuestions: [
      "Quantitative: Ratios, Mixtures, Mensuration.\nLogical: Visual reasoning, flowcharts."
    ],
    faqs: [
      { q: "What is ASE vs SE roles?", a: "Associate Software Engineer (ASE) is standard (4.5 LPA). Software Engineer (SE) is premium (6.5 LPA)." }
    ]
  },
  cognizant: {
    name: "Cognizant",
    hiringProcess: "1. Online Aptitude & Coding Test\n2. Technical Screening (DBMS, SQL queries, DSA traversal algorithms)\n3. HR Interview",
    techQuestions: [
      "What is difference between joins: INNER JOIN vs LEFT JOIN vs RIGHT JOIN?",
      "Explain JVM memory partitions. Where are static variables stored?",
      "Write code to reverse a Singly Linked List."
    ],
    hrQuestions: [
      "Are you open to working in night shifts based on client locations?",
      "What are your expectations from your first corporate role?"
    ],
    aptitudeQuestions: [
      "Quantitative: Profit & Loss, Simple Interest.\nLogical: Coding-Decoding, direction sense."
    ],
    faqs: [
      { q: "What is GenC vs GenC Elevate?", a: "GenC is standard SDE path. GenC Elevate offers premium packages for demonstrating high coding ability in advanced rounds." }
    ]
  },
  wipro: {
    name: "Wipro",
    hiringProcess: "1. Wipro Elite National Talent Hunt - Online Test (Aptitude + Coding + Essay)\n2. Technical Interview (OOP, DSA, DBMS basics)\n3. HR Round",
    techQuestions: [
      "What is recursion? Explain stack overflow in recursion with an example.",
      "What is primary key vs foreign key? Explain with database examples.",
      "How do volatile variables work in multithreading?"
    ],
    hrQuestions: [
      "Why should we hire you? What makes you unique?",
      "Are you comfortable signing a service agreement?"
    ],
    aptitudeQuestions: [
      "Quantitative: Averages, Number System.\nLogical: Analogy, seating arrangements."
    ],
    faqs: [
      { q: "What is Wipro Elite vs Turbo?", a: "Elite is standard (3.5 LPA). Turbo is the upgraded track (6.5 LPA) unlocked through training credentials and coding tests." }
    ]
  },
  capgemini: {
    name: "Capgemini",
    hiringProcess: "1. Online Test (Pseudo-code, English communication, Game-based aptitude, Behavioral)\n2. Technical Interview (DSA, DBMS, OS)\n3. HR Round",
    techQuestions: [
      "What is a memory leak? How do you prevent it in C++ vs Java?",
      "Explain indexing in databases. What is a clustered index?",
      "Write a query to locate duplicates in a database table."
    ],
    hrQuestions: [
      "Tell me about your final-year academic project. What did you write?",
      "How do you handle feedback or structural criticism on your work?"
    ],
    aptitudeQuestions: [
      "Quantitative: Time, Speed, Work.\nLogical: Game-based reasoning patterns."
    ],
    faqs: [
      { q: "What is the game-based test?", a: "An interactive assessment measuring cognitive ability, concentration, and spatial awareness through puzzle games." }
    ]
  },
  deloitte: {
    name: "Deloitte",
    hiringProcess: "1. Online Assessment (Aptitude, Verbal, Coding)\n2. Group Discussion / Jam Session\n3. Technical & Case Study Interview\n4. Partner / HR Round",
    techQuestions: [
      "What are ACID properties? Explain isolation with transaction examples.",
      "Explain the difference between monolithic and microservice architecture.",
      "How does DNS resolve domain name queries to IPs?"
    ],
    hrQuestions: [
      "How would you explain a technical error to a non-technical corporate client?",
      "Deloitte values consulting. Describe your leadership style."
    ],
    aptitudeQuestions: [
      "Quantitative: Data interpretation charts.\nLogical: Logical flowcharts, syllogisms."
    ],
    faqs: [
      { q: "What is the Deloitte US India (USI) role?", a: "It focuses on providing consulting and technical solution architectures for clients located in North America." }
    ]
  },
  amazon: {
    name: "Amazon",
    hiringProcess: "1. Online Assessment (2 Coding questions, System design, Work style simulation)\n2. Technical Round 1 (Hard DSA, Array/Tree/DP)\n3. Technical Round 2 (System Design - Low Level / High Level)\n4. Bar Raiser Round (Deep Behavioral based on Leadership Principles)",
    techQuestions: [
      "Given a binary tree, find the maximum path sum between any two nodes.",
      "Design a rate limiter system for a distributed REST API gateway.",
      "Implement a Least Recently Used (LRU) Cache with O(1) access and modification."
    ],
    hrQuestions: [
      "Describe a time you had to deliver a project on time but had to make tradeoffs (Customer Obsession).",
      "Tell me about a time you disagreed with your coordinator but committed to a decision (Have Backbone; Disagree & Commit)."
    ],
    aptitudeQuestions: [
      "Complex analytical reasoning, binary strings permutations, matrices traversal."
    ],
    faqs: [
      { q: "What is the Bar Raiser?", a: "An objective evaluator external to the hiring team checking if the candidate is better than 50% of current Amazonians in that role." }
    ]
  },
  microsoft: {
    name: "Microsoft",
    hiringProcess: "1. Codility Coding Round (3 Algorithmic questions)\n2. Technical Round 1 (DSA, dynamic programming, arrays/graphs)\n3. Technical Round 2 (System Design, OS memory structures, concurrency)\n4. Asappropriate/HR Round (System architecture, culture, fit)",
    techQuestions: [
      "Write a multithreaded queue that supports thread-safe push and pop operations.",
      "Given a graph of dependencies, write a topological sort algorithm.",
      "Explain virtual memory, paging, and how page replacement algorithms work."
    ],
    hrQuestions: [
      "How do you prioritize learning new stacks vs meeting deadlines?",
      "Describe a project you worked on where you demonstrated a Growth Mindset."
    ],
    aptitudeQuestions: [
      "Advanced logical matrices, permutations, probability distributions."
    ],
    faqs: [
      { q: "What is Codility?", a: "A highly strict online screening platform testing algorithmic efficiency (time and space complexity boundaries)." }
    ]
  }
};

export const APTITUDE_QUESTIONS = {
  quant: [
    { id: "q1", q: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:", options: ["1/4", "1/10", "7/15", "8/15"], correct: "8/15", explanation: "A's 1 day work = 1/15, B's = 1/20. Together = 1/15 + 1/20 = 7/60. In 4 days = 4 * 7/60 = 7/15. Left = 1 - 7/15 = 8/15." },
    { id: "q2", q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 metres", "150 metres", "180 metres", "324 metres"], correct: "150 metres", explanation: "Speed = 60 * (5/18) = 50/3 m/s. Length = Speed * Time = (50/3) * 9 = 150 metres." },
    { id: "q3", q: "A sum of money at simple interest amounts to $815 in 3 years and to $854 in 4 years. The sum is:", options: ["$650", "$690", "$698", "$700"], correct: "$698", explanation: "S.I. for 1 year = 854 - 815 = $39. S.I. for 3 years = 39 * 3 = $117. Principal = 815 - 117 = $698." },
    { id: "q4", q: "Find the average of all prime numbers between 30 and 50.", options: ["37.8", "39.8", "41.8", "43.8"], correct: "39.8", explanation: "Primes are 31, 37, 41, 43, 47. Sum = 199. Count = 5. Average = 199 / 5 = 39.8." },
    { id: "q5", q: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?", options: ["3", "4", "5", "6"], correct: "5", explanation: "C.P. of 6 toffees = $1. S.P. of 6 toffees to gain 20% = $1.20. For $1, he must sell 6 / 1.20 = 5 toffees." },
    { id: "q6", q: "If 15 men can reap a field in 28 days, in how many days will 5 men reap it?", options: ["56 days", "64 days", "84 days", "90 days"], correct: "84 days", explanation: "M1*D1 = M2*D2 => 15 * 28 = 5 * D2 => D2 = (15 * 28) / 5 = 84 days." },
    { id: "q7", q: "What is the probability of getting a sum 9 from two throws of a dice?", options: ["1/6", "1/8", "1/9", "1/12"], correct: "1/9", explanation: "Favorable outcomes: (3,6), (4,5), (5,4), (6,3) = 4. Total = 36. Probability = 4 / 36 = 1/9." },
    { id: "q8", q: "A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:", options: ["588 apples", "600 apples", "700 apples", "725 apples"], correct: "700 apples", explanation: "Let original count be X. Left = 60% of X = 420 => X = (420 * 100) / 60 = 700." },
    { id: "q9", q: "If the ratio of areas of two squares is 9:1, ratio of their perimeters is:", options: ["9:1", "3:1", "3.4:1", "1:3"], correct: "3:1", explanation: "Ratio of areas = a1^2 / a2^2 = 9/1 => ratio of sides a1/a2 = 3/1. Ratio of perimeters = 4a1 / 4a2 = 3/1." },
    { id: "q10", q: "In how many different ways can the letters of the word 'LEADING' be arranged in such a way that the vowels always come together?", options: ["360", "480", "720", "5040"], correct: "720", explanation: "Vowels: E, A, I (grouped as 1). Consonants: L, D, N, G (4). Total letters to arrange = 5! = 120. Arrange vowels inside group = 3! = 6. Total arrangements = 120 * 6 = 720." }
  ],
  logical: [
    { id: "l1", q: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?", options: ["1/3", "1/8", "2/8", "1/16"], correct: "1/8", explanation: "This is a geometric series where each term is multiplied by 1/2. Next = 1/4 * 1/2 = 1/8." },
    { id: "l2", q: "SCD, TEF, UGH, ____, WKL. Find the missing term.", options: ["CMN", "UJI", "VIJ", "IJT"], correct: "VIJ", explanation: "First letters: S, T, U, V, W. Second letters: C, E, G, I, K. Third letters: D, F, H, J, L. Result: VIJ." },
    { id: "l3", q: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?", options: ["His nephew's", "His son's", "His father's", "His own"], correct: "His son's", explanation: "'My father's son' who has no brother or sister is the man himself. So, that man's father is the speaker. The photo is his son's." },
    { id: "l4", q: "If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that code?", options: ["CPNCBZ", "CPNCPY", "CPNCBX", "CQOCBZ"], correct: "CPNCBZ", explanation: "Each letter is shifted to its immediate next alphabetical letter (+1). B->C, O->P, M->N, B->C, A->B, Y->Z." },
    { id: "l5", q: "A man walks 2 km North, then turns East and walks 10 km. After this he turns North and walks 3 km. How far is he from his starting point?", options: ["10 km", "11.18 km", "13 km", "15 km"], correct: "11.18 km", explanation: "Net North movement = 2 + 3 = 5 km. Net East movement = 10 km. Distance = sqrt(5^2 + 10^2) = sqrt(125) = 11.18 km." },
    { id: "l6", q: "Choose the word which is least like the other words in the group.", options: ["Zebra", "Lion", "Tiger", "Horse"], correct: "Horse", explanation: "Zebra, Lion, and Tiger are wild animals, while Horse is a domesticated animal." },
    { id: "l7", q: "Statements: All bags are pockets. All pockets are envelopes. Conclusions: I. All bags are envelopes. II. Some envelopes are pockets.", options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"], correct: "Both I and II follow", explanation: "Since bags are subset of pockets, and pockets subset of envelopes, bags are subset of envelopes (I follows). Since pockets are envelopes, envelopes must overlap with pockets (II follows)." },
    { id: "l8", q: "Find the odd number in the sequence: 3, 5, 7, 12, 17, 19.", options: ["7", "12", "17", "19"], correct: "12", explanation: "All numbers in the sequence are prime numbers except 12, which is a composite even number." },
    { id: "l9", q: "A, B, C, D and E are sitting on a bench. A is next to B, C is next to D, D is not sitting with E who is on the left end of the bench. C is second position from right. A is on the right of B and E. A and C are sitting together. In which position is A sitting?", options: ["Between B and C", "Between B and D", "Between E and B", "Between C and D"], correct: "Between B and C", explanation: "Bench order left to right: E, B, A, C, D. A is sitting between B and C." },
    { id: "l10", q: "If '+' means '*', '*' means '/', '/' means '-' and '-' means '+', then: 8 + 4 - 6 * 3 / 4 = ?", options: ["12", "30", "42", "48"], correct: "30", explanation: "Rewrite equation: 8 * 4 + 6 / 3 - 4. According to BODMAS: 8 * 4 + 2 - 4 = 32 + 2 - 4 = 30." }
  ],
  verbal: [
    { id: "v1", q: "Choose the synonym of 'CANDID'.", options: ["Secretive", "Frank", "Insincere", "Ambiguous"], correct: "Frank", explanation: "Candid means truthful, straightforward, or frank." },
    { id: "v2", q: "Select the antonym of 'TRANSITORY'.", options: ["Temporary", "Permanent", "Brief", "Fascinating"], correct: "Permanent", explanation: "Transitory means temporary or short-lived. Antonym is permanent." },
    { id: "v3", q: "Identify the word with the correct spelling.", options: ["Accomodate", "Accommodate", "Acomodate", "Acommodate"], correct: "Accommodate", explanation: "Accommodate is spelled with double 'c' and double 'm'." },
    { id: "v4", q: "Fill in the blank: The manager was so ________ with the report that he promoted the analyst immediately.", options: ["disappointed", "satisfied", "furious", "skeptical"], correct: "satisfied", explanation: "A promotion immediately implies a positive evaluation, matching 'satisfied'." },
    { id: "v5", q: "Choose the option that corrects the underlined part: 'He is *more stronger* than his competitor.'", options: ["stronger", "more strong", "most strongest", "No correction needed"], correct: "stronger", explanation: "Double comparatives (more stronger) are incorrect. Stronger alone is correct." },
    { id: "v6", q: "What does the idiom 'Spill the beans' mean?", options: ["To make a mess", "To tell a secret", "To buy groceries", "To cook food"], correct: "To tell a secret", explanation: "Spill the beans is a common idiom meaning to disclose secret information prematurely." },
    { id: "v7", q: "Identify the part of speech of the underlined word: 'She sang *sweetly*.'", options: ["Noun", "Adjective", "Adverb", "Verb"], correct: "Adverb", explanation: "Sweetly modifies the verb 'sang', describing how she sang. Thus it is an adverb." },
    { id: "v8", q: "Select the sentence with correct grammatical structure.", options: ["Each of the girls have brought their books.", "Each of the girls has brought her books.", "Each of the girls brought their books.", "All of the girls has brought her books."], correct: "Each of the girls has brought her books.", explanation: "'Each' is a singular pronoun and requires a singular verb (has) and singular possessive pronoun (her)." },
    { id: "v9", q: "Choose the word closest in meaning to 'ABUNDANT'.", options: ["Scarce", "Plentiful", "Deficient", "Meager"], correct: "Plentiful", explanation: "Abundant means present in great quantity or plentiful." },
    { id: "v10", q: "Fill in the blank: Neither the teacher nor the students ________ present in the auditorium yesterday.", options: ["was", "were", "is", "are"], correct: "were", explanation: "When joining singular and plural nouns using 'neither... nor', the verb agrees with the closer noun (students, plural => were)." }
  ],
  di: [
    { id: "d1", q: "Refer to chart: Sales of Company X in 2020: Q1: $20k, Q2: $40k, Q3: $30k, Q4: $60k. What is percentage increase in sales from Q3 to Q4?", options: ["50%", "75%", "100%", "125%"], correct: "100%", explanation: "Q3 sales = $30k. Q4 sales = $60k. Increase = 60 - 30 = 30. Percentage = (30/30) * 100 = 100%." },
    { id: "d2", q: "Refer to average sales: Q1: $20k, Q2: $40k, Q3: $30k, Q4: $60k. What is the average sales per quarter?", options: ["$35k", "$37.5k", "$40k", "$42.5k"], correct: "$37.5k", explanation: "Sum = 20 + 40 + 30 + 60 = 150k. Count = 4. Average = 150 / 4 = $37.5k." },
    { id: "d3", q: "Refer to student grades: 5 students scored 90, 8 scored 80, 7 scored 70. What is percentage of students who scored 90?", options: ["20%", "25%", "30%", "35%"], correct: "25%", explanation: "Students with 90 = 5. Total = 5 + 8 + 7 = 20. Percentage = (5 / 20) * 100 = 25%." },
    { id: "d4", q: "In a pie chart representing expense budget: Rent (30%), Food (25%), Utilities (15%), Savings (20%), Entertainment (10%). What is the central angle for Rent?", options: ["90 degrees", "108 degrees", "120 degrees", "135 degrees"], correct: "108 degrees", explanation: "Central Angle = percentage * 3.6 = 30 * 3.6 = 108 degrees." },
    { id: "d5", q: "In a company of 150 employees, ratio of developers to designers is 4:1. How many developers are in the company?", options: ["90", "100", "120", "130"], correct: "120", explanation: "Total ratio units = 4 + 1 = 5. Developers count = 150 * (4/5) = 120." }
  ]
};
