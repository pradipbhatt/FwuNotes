import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { FaCheck, FaArrowRight, FaTimes } from "react-icons/fa";
import backgroundImage from "../../../src/assets/bg-image.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

const NUM_QUESTIONS = 75;
const QUESTION_TIME = 2 * 60;
const TOTAL_TIME = NUM_QUESTIONS * QUESTION_TIME;

const Mock1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    parseInt(localStorage.getItem("currentQuestion")) || 0
  );
  const [score, setScore] = useState(() =>
    parseInt(localStorage.getItem("score")) || 0
  );
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [timer, setTimer] = useState(() =>
    parseInt(localStorage.getItem("timer")) || TOTAL_TIME
  );
  const [questionTimer, setQuestionTimer] = useState(() => QUESTION_TIME);
  const [quizData, setQuizData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showTitles, setShowTitles] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    engineeringField: "Computer",
    review: "",
    rating: "",
  });

  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          "https://fwu-soe.onrender.com/api/quizzes/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredData = data.filter((quiz) => quiz.yearID === 2074);
        setQuizData(filteredData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setShowLoader(false);
        setShowTitles(true);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    let countdown;
    if (timer > 0 && !showScore) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          localStorage.setItem("timer", prevTimer - 1);
          return prevTimer - 1;
        });
      }, 1000);
    } else if (timer === 0) {
      setShowScore(true);
      setShowForm(true);
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("score");
      localStorage.removeItem("timer");
    }

    return () => clearInterval(countdown);
  }, [timer, showScore]);

  useEffect(() => {
    let questionCountdown;
    if (questionTimer > 0 && !showScore && selectedAnswer === null) {
      questionCountdown = setInterval(() => {
        setQuestionTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (questionTimer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(questionCountdown);
  }, [questionTimer, showScore, selectedAnswer]);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("score", score.toString());
  }, [currentQuestion, score]);

  useEffect(() => {
    const titlesTimer = setTimeout(() => {
      setShowTitles(false);
    }, 4000);

    return () => clearTimeout(titlesTimer);
  }, [showTitles]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleAnswerOptionClick = (answerOption) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answerOption);
      const correct = quizData[currentQuestion].answers.find(
        (option) => option.correct
      );
      setCorrectAnswer(correct);

      const isCorrect = answerOption.correct;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      setSubmittedAnswers((prev) => [
        ...prev,
        {
          question: quizData[currentQuestion].question,
          userAnswer: answerOption.text,
          correctAnswer: correct.text,
          explanation: quizData[currentQuestion].explanation || "No explanation provided.",
        },
      ]);

      setTimeout(() => {
        handleNextQuestion();
      }, 700);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setQuestionTimer(QUESTION_TIME);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setShowForm(true);
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("score");
      localStorage.removeItem("timer");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setTimer(TOTAL_TIME);
    setQuestionTimer(QUESTION_TIME);
    setSubmittedAnswers([]);
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("score");
    localStorage.removeItem("timer");
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fwu-soe.onrender.com/api/quiz-results/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            totalQuestions: quizData.length,
            solvedQuestions: score,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Quiz result submitted successfully!");
      setFormData({
        userName: "",
        engineeringField: "",
        review: "",
        rating: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting quiz result:", error);
      alert("Failed to submit quiz result. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <img
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          src={backgroundImage}
          alt="Background Image"
        />
        <div className="relative bg-opacity-75 bg-gray-800 py-20">
          <div className="container mx-auto text-center">
            {showLoader && (
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mt-12">
                  Loading questions wait few time ...
                </h4>
              </div>
            )}
            {!showLoader && (
              <>
                {showTitles && (
                  <>
                    <div className="header mb-4">
                      <h1 className="text-3xl font-bold text-white">
                        Quiz Title
                      </h1>
                      <p className="text-lg text-gray-300">
                        Quiz Description
                      </p>
                    </div>
                    <div className="exam-info mb-4">
                      <p className="text-md text-white">
                        Time Remaining: {formatTime(timer)}
                      </p>
                    </div>
                  </>
                )}
                {!showTitles && (
                  <div className="exam-info mb-4">
                    <p className="text-md text-white">
                      Time Remaining: {formatTime(timer)}
                    </p>
                    <p className="text-md text-white">
                      Time Remaining for Question: {formatTime(questionTimer)}
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <div className="max-w-4xl w-full bg-gray-100 p-6 rounded-lg shadow-lg">
                    {showScore ? (
                      <div className="text-center">
                        <h2 className="text-2xl font-bold">
                          Your Score: {score}
                        </h2>
                        <button
                          onClick={handleRestartQuiz}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Restart Quiz
                        </button>
                        <div className="mt-8">
                          <h3 className="text-xl font-bold mb-4">
                            Quiz Summary & Explanations
                          </h3>
                          {submittedAnswers.map((answer, index) => (
                            <div
                              key={index}
                              className="border rounded p-4 mb-4 bg-white"
                            >
                              <h4 className="font-semibold">
                                {index + 1}. {answer.question}
                              </h4>
                              <p>
                                <span className="font-semibold">Your Answer:</span>{" "}
                                {answer.userAnswer}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Correct Answer:
                                </span>{" "}
                                {answer.correctAnswer}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Explanation:
                                </span>{" "}
                                {answer.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-xl font-semibold mb-4 text-center text-black">
                          Question {currentQuestion + 1}
                        </div>
                        <div className="text-lg font-bold mb-4 text-black">
                          {quizData[currentQuestion]?.question}
                        </div>
                        {quizData[currentQuestion]?.answers.map(
                          (answerOption) => (
                            <div
                              key={answerOption.id}
                              className={`cursor-pointer px-4 py-2 mb-2 rounded border flex items-center transform transition-transform duration-200 ease-in-out text-black ${
                                selectedAnswer === answerOption
                                  ? answerOption.correct
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                  : correctAnswer === answerOption
                                  ? "bg-green-200"
                                  : "bg-white"
                              }`}
                              onClick={() => handleAnswerOptionClick(answerOption)}
                            >
                              {selectedAnswer === answerOption && (
                                <FaCheck className="text-black mr-3" />
                              )}
                              <span className="text-lg">{answerOption.text}</span>
                            </div>
                          )
                        )}

                        <div className="flex justify-between mt-4">
                          <button
                            onClick={handleRestartQuiz}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Restart Quiz
                          </button>
                          <button
                            onClick={handleNextQuestion}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center transform transition-transform duration-200 ease-in-out"
                          >
                            Next <FaArrowRight className="ml-2" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {showForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div className="bg-white dark:bg-gray-200 p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-600"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-black">
        Submit Quiz Result
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-900">Name:</label>
          <input
            type="text"
            placeholder="Enter your name here "
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded text-gray-900 bg-blue-100 dark:bg-gray-700 dark:text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-900">
            Engineering Field:
          </label>
          <select
            name="engineeringField"
            value={formData.engineeringField}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded text-gray-900 bg-blue-100 dark:bg-gray-700 dark:text-gray-200"
            required
          >
            <option value="Computer">Computer</option>
            <option value="Civil">Civil</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-900">Review:</label>
          <textarea
           placeholder="Give your feedbacks !"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded text-gray-900 bg-blue-100 dark:bg-gray-700 dark:text-gray-200"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-900">Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="Rate from 0-5"
            value={formData.rating}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded text-gray-900 bg-blue-100 dark:bg-gray-700 dark:text-gray-200"
            min="1"
            max="5"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default Mock1;
