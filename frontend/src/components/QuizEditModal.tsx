import React, { useState } from "react";
import { Quiz, QuizQuestion } from "../types/Quiz";
import InputField from "./InputField";
import Button from "./button";

interface Props {
  quiz: Quiz;
  onClose: () => void;
  onSave: (quiz: Quiz) => void;
}

const QuizEditModal: React.FC<Props> = ({ quiz, onClose, onSave }) => {
  const [editedQuiz, setEditedQuiz] = useState<Quiz>({ ...quiz });

  const handleChangeQuestion = (
    index: number,
    field: keyof QuizQuestion,
    value: string
  ) => {
    const newQuestions = [...editedQuiz.questions];
    newQuestions[field] = value;
    setEditedQuiz({ ...editedQuiz, questions: newQuestions });
  };

  const handleChangeOption = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const newQuestions = [...editedQuiz.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setEditedQuiz({ ...editedQuiz, questions: newQuestions });
  };

  const handleSave = () => {
    onSave(editedQuiz);
  };

  const handleAddQuestion = () => {
    setEditedQuiz({
      ...editedQuiz,
      questions: [
        ...editedQuiz.questions,
        {
          questionId: Date.now(),
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setEditedQuiz({
      ...editedQuiz,
      questions: editedQuiz.questions.filter((q) => q.questionId !== id),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Quiz</h2>

        <div className="space-y-4">
          <input
            value={editedQuiz.title}
            onChange={(e) =>
              setEditedQuiz({ ...editedQuiz, title: e.target.value })
            }
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            value={editedQuiz.category}
            onChange={(e) =>
              setEditedQuiz({ ...editedQuiz, category: e.target.value })
            }
            placeholder="Category"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <div>
            <label className="block mb-1 text-primary">Difficulty</label>
            <select
              value={editedQuiz.difficulty}
              onChange={(e) =>
                setEditedQuiz({
                  ...editedQuiz,
                  difficulty: e.target.value as "easy" | "medium" | "hard",
                })
              }
              className="w-full p-2 border border-secondary rounded text-secondary"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <hr className="my-4" />
          <h3 className="font-semibold text-lg">Questions</h3>

          {editedQuiz.questions.map((q, index) => (
            <div
              key={q.questionId}
              className="mb-6 p-4 border border-gray-200 rounded"
            >
              <input
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleChangeQuestion(index, "question", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />

              {q.options.map((opt, i) => (
                <input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleChangeOption(index, i, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              ))}

              <input
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleChangeQuestion(index, "correctAnswer", e.target.value)
                }
                className="w-full p-2 border border-green-400 rounded mb-2"
              />

              <Button
                title="Delete Question"
                className="bg-red-500 mt-2"
                onClick={() => handleDeleteQuestion(q.questionId)}
              />
            </div>
          ))}

          <Button title="Add Question" onClick={handleAddQuestion} />
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <Button title="Cancel" onClick={onClose} />
          <Button title="Save Changes" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default QuizEditModal;
