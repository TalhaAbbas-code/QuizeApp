export interface QuizQuestion {
    questionId: number;
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export interface Quiz {
    id: number;
    title: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    questions: QuizQuestion[];
  }
  