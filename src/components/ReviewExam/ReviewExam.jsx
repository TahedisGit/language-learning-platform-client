import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReviewExam() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAnswers, questions } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions?.[currentIndex];
  const userAnswer = selectedAnswers?.[currentQuestion?.id];

  const getOptionStyle = (option) => {
    const isSelected = option.option_id === userAnswer?.option_id;
    if (isSelected && option.isCorrect) return "bg-green-200 border-green-600";
    if (isSelected && !option.isCorrect) return "bg-red-200 border-red-600";
    if (option.isCorrect) return "bg-green-100 border-green-400";
    return "bg-gray-100 border-gray-300";
  };

  if (!questions || !selectedAnswers) {
    return (
      <div className="text-center mt-10 text-xl">No review data available.</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Review Your Exam</h1>

      <div className="mb-4 text-lg font-semibold">
        Question {currentIndex + 1} of {questions.length}
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="text-xl font-medium mb-2">
          Q-{currentIndex + 1}: {currentQuestion?.questionText}
        </p>

        {currentQuestion?.clue && (
          <p className="italic mb-2">Clue: {currentQuestion.clue}</p>
        )}

        {currentQuestion?.contextImage && (
          <img
            src={currentQuestion.contextImage}
            alt="context"
            className="max-w-md w-full mx-auto mb-4"
          />
        )}

        {currentQuestion?.type === "reading" ? (
          <div className="flex flex-col gap-3">
            {currentQuestion?.options?.map((option, idx) => (
              <div
                key={idx}
                className={`p-3 border rounded-md ${getOptionStyle(option)}`}
              >
                {idx + 1}. {option.text}
              </div>
            ))}
            <div className="mt-6 p-4 border-t text-sm text-gray-600">
              <p>
                <span className="text-green-600 font-semibold">Green:</span>{" "}
                Correct answer
              </p>
              <p>
                <span className="text-red-600 font-semibold">Red:</span>{" "}
                Incorrect answer
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="mb-2">
              <strong>Your Answer:</strong>{" "}
              {selectedAnswers?.[currentQuestion.id] || "(Not answered)"}
            </p>
            <p className="mb-2">
              <strong>Correct Answer:</strong> {currentQuestion.answer}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          onClick={() =>
            setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
          }
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() =>
            navigate("/exam", {
              state: { questions: questions, questionIndex: 0 },
            })
          }
        >
          Retake Exam
        </button>
      </div>
    </div>
  );
}
