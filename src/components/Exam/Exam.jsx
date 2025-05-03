import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Exam.css";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Exam() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const {
    questions,
    questionIndex: initialIndex,
    package_name,
    package_id,
  } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialIndex || 0
  );
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [time, setTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  // console.log("package info", package_name, package_id);
  const submitExam = async (examData) => {
    try {
      const response = await axios.post(
        "https://language-learning-platform-server.onrender.com/submit-exam",
        examData
      );
      console.log("Exam submitted successfully:", response.data);
    } catch (error) {
      console.error("Failed to submit exam:", error);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleAnswerSelection = (answer) => {
    if (currentQuestion) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion.id]: answer,
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const handleFinish = () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      const selected = selectedAnswers[question.id];
      // Handle reading questions
      if (question.type === "reading") {
        const correct = question.options?.find((opt) => opt.isCorrect);
        if (selected && correct && selected.option_id === correct.option_id) {
          calculatedScore += 1;
        }
      }
      // Handle listening questions
      if (question.type === "listening") {
        const correctAnswer = question.answer;
        if (
          selected &&
          selected.toLowerCase() === correctAnswer.toLowerCase()
        ) {
          calculatedScore += 1;
        }
      }
    });

    const roundedScore = Math.round((calculatedScore / questions.length) * 100);

    setIsActive(false);
    setTotalTime(seconds);

    setScore(roundedScore);
    setShowResult(true);
    const generateExamId = () => {
      const random = Math.floor(1000 + Math.random() * 9000); // random 4 digits
      return `exam${random}`;
    };

    // setting student performance data
    const examData = {
      student_id: currentUser?.email,
      exam_id: generateExamId(),
      package_id: package_id,
      package_name: package_name,
      total_questions: questions.length,
      total_correct_answers: calculatedScore,
      time_taken: totalTime,
      score: roundedScore,
      date: new Date().toISOString().split("T")[0],
      status: roundedScore >= 60 ? "passed" : "failed",
    };
    console.log("examData", examData);
    submitExam(examData);
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <nav className="flex justify-between w-full">
          <div className="p-4">
            <Link to={`/questions`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4">
                Back
              </button>
            </Link>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
              <p className="text-lg">Time: </p>
              <p>{new Date(time * 1000).toISOString().substr(11, 8)}</p>
            </div>
          </div>
        </nav>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>

        {/* Question and Options */}
        <p className="text-3xl text-center font-serif font-semibold">
          Q-{currentQuestionIndex + 1}: {currentQuestion?.questionText}
        </p>

        {/* Conditionally Render Based on Question Type */}
        {currentQuestion?.type === "reading" ? (
          <>
            <p className="text-xl text-center font-serif font-semibold">
              Clue: {currentQuestion?.clue}
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 m-8">
              <div className="flex w-2/5 items-center justify-center">
                <div className="text-2xl text-center">
                  <img
                    className="w-3/4 h-3/4"
                    src={
                      currentQuestion?.imageUrl
                        ? `https://language-learning-platform-server.onrender.com${currentQuestion?.imageUrl}`
                        : `${null}`
                    }
                    alt="Context - picture/audio"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-center items-center">
                <div className="p-4 w-full flex flex-col gap-4">
                  <div className="flex flex-col leftSlider gap-4">
                    {currentQuestion?.options?.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center border ${
                          // selectedAnswers[currentQuestionIndex]?.option_id ===
                          // option.option_id
                          selectedAnswers[currentQuestion?.id]?.option_id ===
                          option.option_id
                            ? "border-green-400 shadow-lg shadow-green-200 bg-green-200"
                            : "border-blue-400"
                        } rounded-md cursor-pointer transform transition-transform hover:scale-105`}
                        onClick={() => handleAnswerSelection(option)}
                      >
                        <div className="w-[50px] rounded-l-md p-3 bg-blue-300 text-center">
                          {index + 1}
                        </div>
                        <div className="p-3">{option.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentQuestion?.type === "listening" ? (
          <div className="flex flex-col justify-center items-center gap-4 m-8">
            <div className="flex justify-center">
              <audio controls>
                <source
                  src={
                    currentQuestion?.audioUrl
                      ? `https://language-learning-platform-server.onrender.com${currentQuestion?.audioUrl}`
                      : `${null}`
                  }
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="flex w-full flex-col justify-center items-center">
              <div className="p-4 w-full flex flex-col gap-4">
                <input
                  type="text"
                  className="border p-4 rounded-md w-full"
                  placeholder="Fill in the gap..."
                  onChange={(e) => handleAnswerSelection(e.target.value)}
                  value={
                    selectedAnswers[questions[currentQuestionIndex].id] || ""
                  }
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center lg:fixed left-0 right-0 bottom-0 p-4 w-full">
          <div className="flex items-center sm:mb-2 border rounded border-blue-800">
            <p className="text-blue-700 p-2">
              {currentQuestionIndex + 1}/{questions.length} questions
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
              onClick={handlePrevious}
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-8"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-8"
                onClick={handleFinish}
              >
                Finish Exam
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-4">Exam Finished!</h2>
            <p className="text-lg mb-4">You scored {score} out of 100</p>
            <div className="text-lg font-semibold mt-2">
              Time Taken: {Math.floor(totalTime / 60)}m {totalTime % 60}s
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                onClick={() =>
                  navigate("/review-exam", {
                    state: { selectedAnswers, questions },
                  })
                }
              >
                Review Answers
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  navigate("/dashboard");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-6"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
