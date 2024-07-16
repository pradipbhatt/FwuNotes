import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import backgroundImage from "../../../src/assets/bg-image.jpeg"; // Replace with your Unsplash image URL
import AOS from "aos";
import "aos/dist/aos.css";

const NUM_QUESTIONS = 75;
const QUESTION_TIME = 2 * 60;
const TOTAL_TIME = NUM_QUESTIONS * QUESTION_TIME;

const Mock1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() => parseInt(localStorage.getItem("currentQuestion")) || 0);
  const [score, setScore] = useState(() => parseInt(localStorage.getItem("score")) || 0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(() => parseInt(localStorage.getItem("timer")) || TOTAL_TIME);
  const [questionTimer, setQuestionTimer] = useState(() => QUESTION_TIME);
  const [quizData, setQuizData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showTitles, setShowTitles] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    engineeringField: "",
    review: "",
    rating: "",
    totalQuestions: NUM_QUESTIONS,
    solvedQuestions: 0,
  });
  const [formMode, setFormMode] = useState("add");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("https://fwu-soe.onrender.com/api/quizzes/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredData = data.filter((quiz) => quiz.yearID === 2072);
        setQuizData(filteredData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setShowLoader(false);
        setShowTitles(true); // Assuming you want to show titles after loading
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
    }, 5000);

    return () => clearTimeout(titlesTimer);
  }, [showTitles]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  const handleAnswerOptionClick = (answerOption) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answerOption);
      if (answerOption.correct) {
        setScore((prevScore) => prevScore + 1);
      }
      setTimeout(() => {
        handleNextQuestion();
      }, 4000);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setQuestionTimer(QUESTION_TIME);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("score");
      localStorage.removeItem("timer");
    }
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null);
    setQuestionTimer(QUESTION_TIME);
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimer(TOTAL_TIME);
    setQuestionTimer(QUESTION_TIME);
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
      const response = await fetch("https://fwu-soe.onrender.com/api/quiz-results/", {
        method: formMode === "add" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalQuestions: quizData.length,
          solvedQuestions: score, // Using score directly from state
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert(
        formMode === "add"
          ? "Quiz result submitted successfully!"
          : "Quiz result updated successfully!"
      );
      // Reset form after successful submission
      setFormData({
        userName: "",
        engineeringField: "",
        review: "",
        rating: "",
        totalQuestions: NUM_QUESTIONS,
        solvedQuestions: 0,
      });
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
          className="absolute inset-0 w-full h-full object-cover filter blur-lg"
          src={backgroundImage}
          alt="Background Image"
        />


<div className="relative bg-opacity-75 bg-gray-900 py-20">
          <div className="container mx-auto text-center">
            {showLoader && (
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mt-12">Loading questions...</h4>
              </div>
            )}
            {!showLoader && (
              <>
                {showTitles && (
                  <>
                    <div className="header mb-4">
                      <h1 className="text-3xl font-bold text-white">Quiz Title</h1>
                      <p className="text-lg text-gray-200">Quiz Description</p>
                    </div>
                    <div className="exam-info mb-4">
                      <p className="text-md text-white">Time Remaining: {formatTime(timer)}</p>
                    </div>
                  </>
                )}
                {!showTitles && (
                  <div className="exam-info mb-4">
                    <p className="text-md text-white">Time Remaining: {formatTime(timer)}</p>
                    <p className="text-md text-white">Time Remaining for Question: {formatTime(questionTimer)}</p>
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <div className="max-w-4xl w-full bg-gray-100 p-4 text-gray-800 rounded-lg shadow-lg">
                    {showScore ? (
                      <div className="text-center">
                        <h4 className="text-2xl font-bold mt-12 w-full text-gray-800">Quiz Completed</h4>
                        <h5 className="text-xl mb-4 text-gray-800">
                          You scored {score} out of {quizData.length}
                        </h5>
                        <div className="mt-4 text-left">
                          {quizData.map((question, index) => (
                            <div key={index} className="mb-4">
                              <h6 className="text-lg">{question.question}</h6>
                              <p className="text-sm text-gray-800">
                                {question.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                        <button
                          className="px-4 py-2 mt-4 mb-10 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          onClick={handleRestartQuiz}
                        >
                          Restart Quiz
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4">
                          <h5 className="text-xl mb-2">
                            Question {currentQuestion + 1}/{quizData.length}
                          </h5>
                          <p className="text-base mb-10">
                            {quizData[currentQuestion]?.question}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {quizData[currentQuestion]?.answers.map((answerOption, index) => (
                            <button
                              key={index}
                              className={`w-full px-4 py-2 flex items-center justify-between rounded ${
                                selectedAnswer &&
                                selectedAnswer.text === answerOption.text
                                  ? answerOption.correct
                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                  : selectedAnswer && answerOption.correct
                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                              }`}
                              onClick={() => handleAnswerOptionClick(answerOption)}
                              disabled={!!selectedAnswer}
                            >
                              <span>{`${String.fromCharCode(65 + index)}. ${answerOption.text}`}</span>
                              {selectedAnswer && selectedAnswer.text === answerOption.text && (
                                <FaCheck className="text-xl text-green-500" />
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                          <button
                            className="w-1/3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded disabled:bg-gray-400"
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer}
                          >
                            Next
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
      </div>


      <div className="container mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-500 dark:text-gray-500"
            >
              Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
              className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-200 text-white" 
              disabled={formMode === "edit"}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="engineeringField"
              className="block text-sm font-medium text-gray-500"
            >
              Engineering Field
            </label>
            <select
              id="engineeringField"
              name="engineeringField"
              value={formData.engineeringField}
              onChange={handleInputChange}
              required
              className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-200"
              disabled={formMode === "edit"}
            >
              <option value="">Select Engineering Field</option>
              <option value="Computer">Computer</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-500"
            >
              Review
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-100"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              required
              className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
            />
          </div>
          <input
            type="hidden"
            id="totalQuestions"
            name="totalQuestions"
            value={formData.totalQuestions}
          />
          <input
            type="hidden"
            id="solvedQuestions"
            name="solvedQuestions"
            value={score} // Set solvedQuestions directly from state
          />
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Mock1;
