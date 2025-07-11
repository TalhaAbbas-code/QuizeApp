// utils/calculateQuizResult.ts
import { Quiz } from"../../types/Quiz";

export const calculateQuizResult = (
  quiz: Quiz,
  selectedAnswers: { [id: number]: string }
) => {
  const total = quiz.questions.length;
  let correct = 0;

  quiz.questions.forEach((question) => {
    if (selectedAnswers[question.questionId] === question.correctAnswer) {
      correct++;
    }
  });

  const percentage = Math.round((correct / total) * 100);

  return { correct, total, percentage };
};
