export const mockTeachers = [
    { id: 1, name: "John Smith", email: "john@haaga-helia.fi" },
    { id: 2, name: "Maria Garcia", email: "maria@haaga-helia.fi" }
  ];
  
  export const mockQuizzes = [
    {
      id: 1,
      title: "React Basics",
      description: "Introduction to React concepts",
      courseCode: "HH1234",
      published: true,
      difficulty: "Normal",
      topic: "Web Development",
      teacherId: 1
    },
    {
      id: 2,
      title: "Spring Boot Fundamentals",
      description: "Backend development with Spring",
      courseCode: "HH5678",
      published: false,
      difficulty: "Easy",
      topic: "Backend Development",
      teacherId: 2
    }
  ];
  
  export const mockQuestions = [
    {
      id: 1,
      quizId: 1,
      content: "What is JSX?",
      difficulty: "Easy"
    },
    {
      id: 2,
      quizId: 1,
      content: "Explain React hooks",
      difficulty: "Normal"
    }
  ];
  
  export const mockAnswers = [
    {
      id: 1,
      questionId: 1,
      content: "JavaScript XML",
      isCorrect: true
    },
    {
      id: 2,
      questionId: 1,
      content: "Java Syntax Extension",
      isCorrect: false
    }
  ];
  
  export const mockCategories = [
    { id: 1, name: "Web Development", description: "Frontend technologies" },
    { id: 2, name: "Backend", description: "Server-side programming" }
  ];