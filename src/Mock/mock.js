
  
  // mockData.js
export const mockTeachers1 = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@school.edu",
    subject: "Mathematics",
    department: "Science",
    phone: "555-123-4567"
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@school.edu",
    subject: "English Literature",
    department: "Humanities",
    phone: "555-234-5678"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@school.edu",
    subject: "Physics",
    department: "Science",
    phone: "555-345-6789"
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@school.edu",
    subject: "History",
    department: "Humanities",
    phone: "555-456-7890"
  },
  {
    id: 5,
    name: "David Rodriguez",
    email: "david.rodriguez@school.edu",
    subject: "Computer Science",
    department: "Technology",
    phone: "555-567-8901"
  }
];

export const mockQuizzes = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    description: "Basic algebra concepts and problem-solving",
    courseCode: "MATH101",
    difficulty: "Normal",
    topic: "Algebra",
    teacherId: 1,
    published: true
  },
  {
    id: 2,
    title: "Shakespeare's Works",
    description: "Analysis of major plays and sonnets",
    courseCode: "ENG201",
    difficulty: "Hard",
    topic: "Literature",
    teacherId: 2,
    published: true
  },
  {
    id: 3,
    title: "Newton's Laws",
    description: "Understanding classical physics principles",
    courseCode: "PHY101",
    difficulty: "Normal",
    topic: "Physics",
    teacherId: 3,
    published: false
  },
  {
    id: 4,
    title: "World War II",
    description: "Major events and figures of WWII",
    courseCode: "HIST202",
    difficulty: "Hard",
    topic: "Modern History",
    teacherId: 4,
    published: true
  },
  {
    id: 5,
    title: "Introduction to Programming",
    description: "Basic programming concepts and syntax",
    courseCode: "CS101",
    difficulty: "Easy",
    topic: "Programming",
    teacherId: 5,
    published: true
  },
  {
    id: 6,
    title: "Calculus Basics",
    description: "Introduction to differential calculus",
    courseCode: "MATH201",
    difficulty: "Hard",
    topic: "Calculus",
    teacherId: 1,
    published: false
  }
];

export const mockQuestions = [
  {
    id: 1,
    quizId: 1,
    content: "What is the solution to x + 5 = 12?",
    difficulty: "Easy"
  },
  {
    id: 2,
    quizId: 1,
    content: "Solve for y: 3y - 6 = 15",
    difficulty: "Normal"
  },
  {
    id: 3,
    quizId: 2,
    content: "Who is the protagonist in 'Hamlet'?",
    difficulty: "Easy"
  },
  {
    id: 4,
    quizId: 3,
    content: "State Newton's Third Law of Motion.",
    difficulty: "Normal"
  },
  {
    id: 5,
    quizId: 4,
    content: "When did World War II end in Europe?",
    difficulty: "Normal"
  }
];

export const mockAnswers = [
  {
    id: 1,
    questionId: 1,
    content: "x = 7",
    isCorrect: true
  },
  {
    id: 2,
    questionId: 1,
    content: "x = 5",
    isCorrect: false
  },
  {
    id: 3,
    questionId: 2,
    content: "y = 7",
    isCorrect: true
  },
  {
    id: 4,
    questionId: 3,
    content: "Hamlet",
    isCorrect: true
  },
  {
    id: 5,
    questionId: 3,
    content: "Ophelia",
    isCorrect: false
  }
];