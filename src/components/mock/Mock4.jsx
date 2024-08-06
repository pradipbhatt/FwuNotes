import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import { FaCheck, FaArrowRight, FaTimes } from "react-icons/fa";
import backgroundImage from "../../../public/fwu.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from '../../../public/fwu.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NUM_QUESTIONS = 75;
const QUESTION_TIME = 2 * 60; // 2 minutes per question
const TOTAL_TIME = NUM_QUESTIONS * QUESTION_TIME; // Total time for all questions

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
    review: "Any feedback or suggestions?",
    rating: "5",
  });
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(null);

  useEffect(() => {
    let progressInterval;
    if (showLoader) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      }, 100);
    }
    return () => clearInterval(progressInterval);
  }, [showLoader]);

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
        const filteredData = data.filter((quiz) => quiz.yearID === 2075);

        const processedData = filteredData.map(quiz => {
          const answersWithIds = quiz.answers.map((answer, index) => ({
            ...answer,
            _id: `answer_${index}_${Math.random().toString(36).substr(2, 9)}`
          }));

          const shuffledAnswers = answersWithIds.sort(() => Math.random() - 0.5);

          return {
            ...quiz,
            answers: shuffledAnswers
          };
        });

        setQuizData(processedData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setShowLoader(false);
        setShowTitles(true);
        setProgress(100);
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
    }, 10000);

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
        setShowPopup("success");
      } else {
        setShowPopup("fail");
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

      // Show the popup animation for a few seconds before auto-advancing
      setTimeout(() => {
        setShowPopup(null);
        handleNextQuestion();
      }, 2000);
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
    setIsFormSubmitted(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} m ${seconds} s`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormSubmitted) {
      toast.info("You have already submitted the form.");
      return;
    }

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
      toast.success("Quiz result submitted successfully!");
      setIsFormSubmitted(true);
      setFormData({
        userName: "",
        engineeringField: "Computer",
        review: "Any feedback or suggestions?",
        rating: "5",
      });
      setShowForm(false); // Close the form after successful submission
    } catch (error) {
      toast.error("There was an error submitting the form.");
      setShowForm(false); // Optionally close the form on error
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <img
          className="absolute inset-0 w-full h-full object-cover filter blur-md"
          src={backgroundImage}
          alt="Background Image"
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-2 px-4 bg-gray-100 dark:bg-gray-900 mt-8">
          <motion.div
            className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 bg-gray-100 dark:bg-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base lg:mt-10 sm:text-sm text-gray-900 dark:text-gray-100">
              <span className="font-semibold">Total Time Left:</span> {formatTime(timer)}
            </p>
            <p className="text-base sm:text-sm text-gray-900 dark:text-gray-100">
              <span className="font-semibold">Time Left for Question:</span> {formatTime(questionTimer)}
            </p>



            {!showScore ? (
              <>
                {quizData.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <div className="mb-4 text-center">
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          Question {currentQuestion + 1} of {quizData.length}
                        </p>
                      </div>
                      <p className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        {quizData[currentQuestion].question}
                      </p>
                      <div className="space-y-4">
                        {quizData[currentQuestion].answers.map((answer) => (
                          <motion.div
                            key={answer._id}
                            className={`p-4 border rounded-md shadow-md transition-transform duration-300 ease-in-out transform ${selectedAnswer === answer
                              ? answer.correct
                                ? "bg-green-200 border-green-400 shadow-lg"
                                : "bg-red-200 border-red-400 shadow-lg"
                              : "bg-white border-gray-300 shadow-sm"
                              } hover:scale-105 cursor-pointer`}
                            onClick={() => handleAnswerOptionClick(answer)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {answer.text}
                            {selectedAnswer === answer && (
                              <span className="ml-2">
                                {answer.correct ? (
                                  <FaCheck className="text-green-600" />
                                ) : (
                                  <FaTimes className="text-red-600" />
                                )}
                              </span>
                            )}

                          </motion.div>
                        ))}
                        <button
                          onClick={handleRestartQuiz}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 mt-4 sm:mt-0"
                        >
                          Restart
                        </button>
                      </div>
                    </div>

                  </>
                ) : (
                  <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center sm:mx-4 mt-4 sm:mt-12 space-y-4 sm:space-y-0 text-left sm:text-center">
                    <motion.img
                      src={logo}
                      alt="Logo"
                      className="w-24 h-24 sm:w-28 sm:h-28"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: [0, 20, -20, 20, 0] }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <div className="sm:ml-4">
                      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                        School of Engineering <span className="text-blue-600">Far Western University</span>
                      </h1>
                    </div>
                    <p>Loading questions...</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-left mt-0 bg-white dark:bg-gray-900 dark:bg-opacity-10 p-4 sm:p-6">
                {showScore && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full sm:max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  >
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Quiz Completed!</h2>
                    <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                      You scored <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of{' '}
                      <span className="font-bold text-blue-600 dark:text-blue-400">{quizData.length}</span>.
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      {submittedAnswers.map((answer, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg"
                        >
                          <p className="text-md font-semibold text-gray-800 dark:text-gray-100">Question {index + 1}:</p>
                          <p className="text-gray-600 dark:text-gray-300"><strong>Question:</strong> {answer.question}</p>
                          <p className="text-gray-600 dark:text-gray-300"><strong>Your Answer:</strong> {answer.userAnswer}</p>
                          <p className="text-gray-600 dark:text-gray-300"><strong>Correct Answer:</strong> {answer.correctAnswer}</p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>Explanation:</strong>{' '}
                            <span className="font-serif text-purple-600 dark:text-purple-400">{answer.explanation}</span>
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>

                    <button
                      onClick={handleRestartQuiz}
                      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                    >
                      Restart
                    </button>
                  </motion.div>
                )}
              </div>


            )}

            {showPopup === "success" && (
              <motion.div
                className="fixed inset-y-0 right-0 flex items-center mt-20 pt-10 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-4 bg-transparent backdrop-filter backdrop-blur-lg border border-green-300 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">✅</span>
                    <h2 className="text-xl font-semibold">Correct Answer!</h2>
                  </div>
                  <p>Your answer is correct.</p>
                </div>
              </motion.div>
            )}
            {showPopup === "fail" && (
              <motion.div
                className="fixed inset-y-0 right-0 flex items-center mt-20 mb-10 pt-10 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 bg-transparent backdrop-filter backdrop-blur-lg border border-red-300 rounded-lg shadow-lg max-w-sm w-full">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">🚫</span>
                    <h2 className="text-xl font-semibold">Incorrect Answer!</h2>
                  </div>
                  <p className="text-lg mb-4">
                    <span role="img" aria-label="warning">⚠️</span> Oops! Your answer was incorrect. <br />
                    The correct answer is <strong className="text-red-600">{correctAnswer?.text}</strong>.
                  </p>
                  <button
                    onClick={() => setShowPopup(null)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h3 className=" font-semibold mb-4 text-black  dark:text-white">Requested to fill form with your Correct Name</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">Name:</label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white dark:text-white dark:bg-gray-900 "
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">Engineering Field:</label>
                    <select
                      name="engineeringField"
                      value={formData.engineeringField}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white dark:text-white dark:bg-gray-900"
                    >
                      <option value="Computer">Computer</option>

                      <option value="Civil">Civil</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">Review:</label>
                    <textarea
                      name="review"
                      value={formData.review}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  {/* <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Rating:</label>
                        <input
                          type="hidden"
                          name="rating"
                          value="5"
                          onChange={handleInputChange}
                        />
                        <p className="text-sm">Rating: 5 (hidden)</p>
                      </div> */}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                </form>
              </div>
            </motion.div>
          )}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Mock1;
