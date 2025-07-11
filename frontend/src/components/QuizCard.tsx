import React from "react";

interface QuizCardProps {
  title: string;
  category: string;
  difficulty: string;
  onClick?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, category, difficulty,onClick }) => {
  return (
    <div onClick={onClick}  className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <h1 className="text-xl font-bold text-gray-800 mb-3">{title}</h1>
      <div className="text-sm text-gray-600 flex flex-col gap-1">
        <p>
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          {category}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Difficulty:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium
              ${
                difficulty === "easy"
                  ? "bg-green-100 text-green-700"
                  : difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
          >
            {difficulty}
          </span>
        </p>
      </div>
    </div>
  );
};

export default QuizCard;
