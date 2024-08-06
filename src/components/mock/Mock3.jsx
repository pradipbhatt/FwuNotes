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
        const filteredData = data.filter((quiz) => quiz.yearID === 2074);

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
      }, 3000);
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
    return `${minutes} minutes ${seconds} seconds`;
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
        <div className="relative bg-gray-800 bg-opacity-80 py-20">
          <div className="container mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-32 w-auto mb-6"
              />
              <h1 className="text-4xl font-bold text-white mb-4">
                Entrance Exam Prepration Test
              </h1>
              {showTitles && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-lg text-white mb-8"
                >
                  <h2>Attempt all the questions.</h2>
                  <h3>Read the following questions carefully and tick the correct answer.</h3>
                </motion.div>
              )}
              {showLoader && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="w-full max-w-md mx-auto mb-8"
                >
                  <div className="w-full max-w-5xl bg-gray-700 h-2 rounded">
                    <motion.div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-white text-sm text-center mt-2">
                    Loading quiz data...
                  </p>
                </motion.div>
              )}
              {!showLoader && quizData.length > 0 && !showScore && (
                <div className="w-full max-w-4xl h-screen flex items-center justify-center rounded-2xl shadow-lg  bg-gray-100 dark:bg-gray-800">
                  <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-gray-700">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                      Question {currentQuestion + 1} of {quizData.length}
                    </h2>
                    <p className="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200">
                      {quizData[currentQuestion].question}
                    </p>
                    {quizData[currentQuestion].answers.map((answer) => (
                      <motion.button
                        key={answer._id}
                        onClick={() => handleAnswerOptionClick(answer)}
                        className={`w-full p-4 mb-3 rounded-lg text-white ${selectedAnswer === answer ? (answer.correct ? 'bg-green-700 dark:bg-green-600' : 'bg-red-700 dark:bg-red-600') : 'bg-blue-600 dark:bg-blue-500'} shadow-md transform transition-transform duration-300 ease-in-out flex items-center ring-2 ring-transparent hover:ring-4 hover:ring-opacity-70 hover:ring-blue-300 dark:hover:ring-blue-400`}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                      >
                        {selectedAnswer === answer && (
                          <span className="mr-3">
                            {answer.correct ? (
                              <FaCheck className="text-green-400 dark:text-green-300" />
                            ) : (
                              <FaTimes className="text-red-400 dark:text-red-300" />
                            )}
                          </span>
                        )}
                        {answer.text}
                      </motion.button>
                    ))}
                    {selectedAnswer && (
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className={`text-lg font-semibold ${correctAnswer && selectedAnswer.correct ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          {selectedAnswer.correct ? 'Correct!' : `Incorrect. The correct answer is: ${correctAnswer?.text}`}
                        </p>
                        <p className="text-md font-medium text-brinjal dark:text-gray-300 mt-2 p-3 border border-brinjal dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                          {quizData[currentQuestion]?.explanation || "No explanation provided."}
                        </p>

                      </motion.div>
                    )}
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handleRestartQuiz}
                        className="px-6 py-3 bg-gray-700 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 shadow-lg hover:shadow-xl ring-2 ring-transparent hover:ring-4 hover:ring-opacity-60 hover:ring-gray-400 dark:hover:ring-gray-500"
                      >
                        Restart
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 bg-blue-700 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-500 shadow-lg hover:shadow-xl ring-2 ring-transparent hover:ring-4 hover:ring-opacity-60 hover:ring-blue-400 dark:hover:ring-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}



              {showScore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg"
                >
                  <h2 className="text-4xl font-bold mb-6 text-left text-gray-800">Quiz Completed!</h2>
                  <p className="text-xl mb-8 text-left text-gray-700">You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold text-blue-600">{quizData.length}</span>.</p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                      <h2 className="text-3xl font-semibold mb-4 text-left text-gray-800">Scoreboard</h2>
                      <ul className="space-y-4">
                        {submittedAnswers.map((answer, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white p-6 rounded-lg shadow-md"
                          >
                            <p className="text-lg font-semibold text-gray-800">Question {index + 1}:</p>
                            <p className="text-gray-600"><strong>Question:</strong> {answer.question}</p>
                            <p className="text-gray-600"><strong>Your Answer:</strong> {answer.userAnswer}</p>
                            <p className="text-gray-600"><strong>Correct Answer:</strong> {answer.correctAnswer}</p>
                            <p className="text-gray-600"><strong>Explanation:</strong> {answer.explanation}</p>
                          </motion.div>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <button
                    onClick={handleRestartQuiz}
                    className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Restart
                  </button>
                </motion.div>
              )}


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
            </motion.div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Mock1;
