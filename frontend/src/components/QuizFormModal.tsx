import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Quiz, QuizQuestion } from "../types/Quiz";
import InputField from "./InputField";
import Button from "./button";

interface Props {
  onClose: () => void;
  onSave: (quiz: Quiz) => void;
}

const QuizFormModal: React.FC<Props> = ({ onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionId: Date.now(),
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof QuizQuestion,
    value: string
  ) => {
    const updated = [...questions];
    if (field === "question" || field === "correctAnswer") {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const onSubmit = (data: any) => {
    const newQuiz: Quiz = {
      id: Date.now(),
      title: data.title,
      category: data.category,
      difficulty,
      questions,
    };
    onSave(newQuiz);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Create Quiz</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Title"
            registerField="title"
            register={register}
            validation={{ required: "Title is required" }}
            error={errors.title}
          />

          <InputField
            label="Category"
            registerField="category"
            register={register}
            validation={{ required: "Category is required" }}
            error={errors.category}
          />

          <div>
            <label className="block mb-1 text-primary">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full p-2 border border-secondary rounded-md text-secondary"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Questions</h3>
            {questions.map((q, index) => (
              <div
                key={q.questionId}
                className="mb-6 p-4 border border-gray-200 rounded"
              >
                <InputField
                  label={`Question ${index + 1}`}
                  registerField={`question_${index}`}
                  register={register}
                  validation={{}}
                  error={undefined}
                  type="text"
                  onToggle={() => {}}
                />

                {q.options.map((opt, i) => (
                  <input
                    key={i}
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(index, i, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded mt-2 px-2 py-1"
                  />
                ))}

                <input
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                  className="w-full border border-green-400 mt-2 rounded px-2 py-1"
                />
              </div>
            ))}
          </div>
          <Button title="Add Question" type="button" onClick={handleAddQuestion} />

          <div className="flex justify-end mt-4 gap-4">
            <Button title="Save Quiz" type="submit" />
            <Button title="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizFormModal;
