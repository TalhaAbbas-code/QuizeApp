import React, { useEffect, useState } from "react";
import { Quiz, QuizQuestion } from "../types/Quiz";
import {
  createQuiz,
  deleteQuizById,
  fetchQuizzes,
  updateQuizById,
  
} from "../services";
import Button from "../components/button";
import QuizFormModal from "../components/QuizFormModal";
import QuizEditModal from "../components/QuizEditModal";


const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  const loadQuizzes = async () => {
    const data = await fetchQuizzes();
    setQuizzes(data);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteQuizById(id);
    loadQuizzes();
  };

  const handleCreate = async (quiz: Quiz) => {
    await createQuiz(quiz);
    setShowCreateModal(false);
    loadQuizzes();
  };

  const handleEditSave = async (updatedQuiz: Quiz) => {
    await updateQuizById(updatedQuiz);
    setEditingQuiz(null);
    loadQuizzes();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Quiz Dashboard</h1>
      <Button
        title="Add New Quiz"
        onClick={() => setShowCreateModal(true)}
        className="mb-6"
        bgFill
      />

      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-4 border rounded-lg bg-white shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-sm text-gray-600">
                Category: {quiz.category} | Difficulty: {quiz.difficulty}
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  title="Edit"
                  onClick={() => setEditingQuiz(quiz)}
                  bgFill
                />
                <Button title="Delete" onClick={() => handleDelete(quiz.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <QuizFormModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreate}
        />
      )}

      {editingQuiz && (
        <QuizEditModal
          quiz={editingQuiz}
          onClose={() => setEditingQuiz(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
