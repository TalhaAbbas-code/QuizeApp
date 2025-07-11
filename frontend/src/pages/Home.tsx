import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthenticatedUser } from "../types/User";
import QuizCard from "../components/QuizCard";
import { fetchQuizzes } from "../services";
import { Quiz } from "../types/Quiz";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);

  if (!useAuth) {
    return (
      <div>
        Error: AuthContext not found. Make sure you're inside AuthProvider.
      </div>
    );
  }

  const { user, setUser } = useAuth;

 
  useEffect(() => {
    const GetAllQuizzes = async () => {
      try {
        const res = await fetchQuizzes();
        setQuizzes(res);
        setFilteredQuizzes(res); 
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    GetAllQuizzes();
  }, []);


  useEffect(() => {
    let filtered = quizzes;

    if (selectedCategory) {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    setFilteredQuizzes(filtered);
  }, [selectedCategory, selectedDifficulty, quizzes]);

 
  const handleQuizClick = (quiz: Quiz) => {
    navigate(`/quiz/${quiz.id}`, { state: { quiz } });
  };

  
  const allCategories = Array.from(new Set(quizzes.map((q) => q.category)));

  return (
    <div>
      <Navbar user={user} />

      <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Available Quizzes
        </h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-2  py-2 rounded text-gray-700"
          >
            <option value="">All Categories</option>
            {allCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="border px-2 py-2 rounded text-gray-700"
          >
            <option value="">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Quiz Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              No quizzes found for selected filters.
            </p>
          ) : (
            filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                category={quiz.category}
                difficulty={quiz.difficulty}
                onClick={() => handleQuizClick(quiz)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
