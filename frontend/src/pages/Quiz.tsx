import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Quiz } from "../types/Quiz";
import Button from "../components/button";
import StepperComponent from "../components/StepperComponent";
import ResultModal from "../components/ResultModal";
import { calculateQuizResult } from "../assets/utils/calculateQuizResult";


const QuizPage = () => {
  const location = useLocation();
  const quiz: Quiz = location.state?.quiz;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState({
    correct: 0,
    total: 0,
    percentage: 0,
  });
  const handleFinishQuiz = () => {
    const quizResult = calculateQuizResult(quiz, selectedAnswers);
    setResult(quizResult);
    setIsModalOpen(true);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [id: number]: string;
  }>({});
  const completed: { [key: number]: boolean } = {};
    quiz.questions.forEach((question, index) => {
    if (selectedAnswers[question.questionId]) {
      completed[index] = true;
    }
  });




  if (!quiz) {
    return <p>No quiz data found.</p>;
  }

  const currentQuestion = quiz.questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const quizResult = calculateQuizResult(quiz, selectedAnswers);
      setResult(quizResult);
      setIsModalOpen(true);
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="px-[10%] py-[2%] h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      <p className="text-gray-600 mb-10">
        Category: {quiz.category} <br /> Difficulty: {quiz.difficulty}
      </p>
      <div className="flex flex-col justify-between h-full">
        <div className="mb-6">
          <StepperComponent
            activeStep={currentIndex}
            totalSteps={quiz.questions.length}
            onStepClick={(step) => setCurrentIndex(step)}
            completed={completed}
          />
          <div className="bg-secondary text-center text-white p-10 rounded">
            <p className="text-4xl font-semibold">{currentQuestion.question}</p>
          </div>

          <div className="flex justify-center gap-10 my-10">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="ml-4 mt-2">
                <Button
                  title={option}
                  onClick={() =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.questionId]: option,
                    }))
                  }
                  className={`!px-7 !py-7 ${
                    selectedAnswers[currentQuestion.questionId] === option
                      ? "bg-green-500 text-white hover:bg-green-500"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Button title="< Previous" onClick={handlePrevious} />
          <div className="flex gap-10">
            <Button
              title={
                currentIndex < quiz.questions.length - 1
                  ? "Next Question >"
                  : "Finish Quiz"
              }
              onClick={handleNext}
            />
            <Button title="Skip " />
          </div>
        </div>
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          correct={result.correct}
          total={result.total}
          percentage={result.percentage}
        />
      </div>
    </div>
  );
};

export default QuizPage;
