import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import { FaCheck, FaRedo, FaArrowRight, FaTimes } from "react-icons/fa";
import backgroundImage from "../../../public/fwu.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from '../../../public/fwu.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MathJax from 'react-mathjax2';

const NUM_QUESTIONS = 75;
const QUESTION_TIME = 2 * 60; // 2 minutes in seconds
const TOTAL_TIME = NUM_QUESTIONS * QUESTION_TIME;

const Mock1 = () => {
  // State variables
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

  // Fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("https://fwu-soe.vercel.app/api/quizzes/");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const filteredData = data.filter((quiz) => quiz.yearID === 2075);

        const processedData = filteredData.map(quiz => {
          const answersWithIds = quiz.answers.map((answer, index) => ({
            ...answer,
            _id: `answer_${index}_${Math.random().toString(36).substr(2, 9)}`
          }));
          return {
            ...quiz,
            answers: answersWithIds.sort(() => Math.random() - 0.5)
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

  // Timer functionality
  useEffect(() => {
    const countdown = timer > 0 && !showScore
      ? setInterval(() => {
          setTimer(prevTimer => {
            localStorage.setItem("timer", prevTimer - 1);
            return prevTimer - 1;
          });
        }, 1000)
      : null;

    if (timer === 0) {
      setShowScore(true);
      setShowForm(true);
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("score");
      localStorage.removeItem("timer");
    }

    return () => clearInterval(countdown);
  }, [timer, showScore]);

  // Question timer
  useEffect(() => {
    const questionCountdown = questionTimer > 0 && !showScore && selectedAnswer === null
      ? setInterval(() => {
          setQuestionTimer(prevTimer => prevTimer - 1);
        }, 1000)
      : null;

    if (questionTimer === 0) handleNextQuestion();

    return () => clearInterval(questionCountdown);
  }, [questionTimer, showScore, selectedAnswer]);

  // Update localStorage
  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("score", score.toString());
  }, [currentQuestion, score]);

  // Hide titles after 10 seconds
  useEffect(() => {
    if (showTitles) {
      const titlesTimer = setTimeout(() => setShowTitles(false), 10000);
      return () => clearTimeout(titlesTimer);
    }
  }, [showTitles]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handlers
  const handleAnswerOptionClick = (answerOption) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answerOption);

    const correct = quizData[currentQuestion].answers.find(option => option.correct);
    setCorrectAnswer(correct);

    const isCorrect = answerOption.correct;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setShowPopup("success");
    } else {
      setShowPopup("fail");
    }

    setSubmittedAnswers(prev => [
      ...prev,
      {
        question: quizData[currentQuestion].question,
        userAnswer: answerOption.text,
        correctAnswer: correct.text,
        explanation: quizData[currentQuestion].explanation || "No explanation provided.",
      }
    ]);

    setTimeout(() => {
      setShowPopup(null);
      handleNextQuestion();
    }, 4000);
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

  const handleFinishQuiz = () => {
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setQuestionTimer(QUESTION_TIME);
    setShowScore(true);
    setShowForm(true);
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("score");
    localStorage.removeItem("timer");
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
      const response = await fetch("https://fwu-soe.vercel.app/api/quiz-results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalQuestions: quizData.length,
          solvedQuestions: score,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      toast.success("Quiz result submitted successfully!");
      setIsFormSubmitted(true);
      setFormData({
        userName: "",
        engineeringField: "Computer",
        review: "Any feedback or suggestions?",
        rating: "5",
      });
      setShowForm(false);
    } catch (error) {
      toast.error("There was an error submitting the form.");
      setShowForm(false);
    }
  };

  // Check if quizData and currentQuestion are valid
  const currentQuestionData = quizData[currentQuestion] || { question: '', answers: [], explanation: '' };

  // Function to determine if the question is mathematical
  const isMathQuestion = (question) => /[\+\-\*\/\=\(\)\^]/.test(question);
  const isMath = isMathQuestion(currentQuestionData.question);
  return (
    <>
      <Navbar />
      <div className="relative">
        <div
          className="relative py-20 mt-[0px]" // Added margin-top class for 50px top margin
          style={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(100, 200, 255, 0.5) 50%, rgba(255, 100, 200, 0.5))', // Softer neon gradient // Light white to neon gradient
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'overlay', // Ensure proper blending
          }}
        >
          <div className="container mx-auto text-center px-4 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              {
                showTitles && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center text-white mb-12 px-4"
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-32 w-auto mx-auto mb-6"
                    />
                    <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-600">
                      Entrance Exam Preparation Test
                    </h1>
                    <h2 className="text-2xl font-semibold mb-2  text-gray-600">
                      Attempt all the questions.
                    </h2>
                    <h3 className="text-lg mb-6  text-gray-600">
                      Read the following questions carefully and tick the correct answer.
                    </h3>
                  </motion.div>
                )
              }
              {showLoader && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="w-full max-w-md mx-auto mb-8 mt-20"
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
                <div className="relative w-full max-w-3xl mx-auto bg-white bg-opacity-70 dark:bg-opacity-20 dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg dark:shadow-gray-700 mt-4 scrollbar-hidden">
                  <div className="absolute inset-0 bg-white bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-60 filter blur-sm rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 tracking-wider">
                        Q{currentQuestion + 1} of {quizData.length}
                      </h2>
                      <div className="flex items-center space-x-4 text-xs">
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Time: {formatTime(questionTimer)}
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Total Time: {String(Math.floor(timer / 60)).padStart(2, '0')}:
                          {String(timer % 60).padStart(2, '0')}
                        </p>
                      </div>
                    </div>


                    <div className="text-base md:text-lg lg:text-xl font-medium mb-6 text-gray-800 dark:text-gray-200 tracking-wider">
                      {isMath ? (
                        <div className="w-full break-words overflow-scroll scrollbar-hidden">
                          <MathJax.Context input="tex">
                            <MathJax.Node
                              className="whitespace-pre-wrap"
                              style={{
                                letterSpacing: '0.05em',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                fontSize: 'calc(0.5rem + 0.5vw)', // Adjust font size as needed
                              }}
                            >
                              {`\\scriptsize \\displaystyle ${currentQuestionData.question.replace(/ /g, '\\hspace{0.3em}').replace(/\n/g, '\\newline ')}`}
                            </MathJax.Node>
                          </MathJax.Context>
                        </div>


                      ) : (
                        <p
                          className="whitespace-pre-wrap break-words scrollbar-hidden"
                          style={{
                            letterSpacing: '0.05em',
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            fontSize: 'calc(0.875rem + 0.2vw)', // Responsive font size
                          }}
                        >
                          {currentQuestionData.question}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {currentQuestionData.answers.map((answer) => (
                        <motion.button
                          key={answer._id}
                          onClick={() => handleAnswerOptionClick(answer)}
                          className={`w-full p-3 rounded-lg flex items-center justify-start transition-transform duration-300 ease-in-out ${selectedAnswer
                            ? answer.correct
                              ? 'bg-gradient-to-r from-green-500 to-green-700 dark:from-green-300 dark:to-green-500 text-white shadow-md shadow-green-400' // Correct answer background
                              : answer === selectedAnswer
                                ? 'bg-gradient-to-r from-red-500 to-red-700 dark:from-red-300 dark:to-red-500 text-white shadow-md shadow-red-400' // Incorrect selected answer background
                                : 'bg-gray-600 dark:bg-gray-700 text-gray-200 dark:text-gray-400 shadow-md shadow-gray-500' // Non-selected answer background
                            : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 dark:from-blue-300 dark:to-blue-500 dark:hover:from-blue-400 dark:hover:to-blue-600 text-white shadow-md shadow-blue-400' // Default background
                            } shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {selectedAnswer === answer && (
                            <span className="mr-2 flex items-center">
                              {answer.correct ? (
                                <FaCheck className="w-4 h-4 text-green-200 dark:text-green-100" />
                              ) : (
                                <FaTimes className="w-4 h-4 text-red-200 dark:text-red-100" />
                              )}
                            </span>
                          )}
                          <span
                            className={isMath ? 'font-math' : 'font-normal'}
                            style={{
                              fontSize: '0.875rem', // Smaller font size
                              letterSpacing: '0.02em',
                              overflowWrap: 'break-word',
                              wordWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {isMath ? (
                              <MathJax.Context input='tex'>
                                <MathJax.Node
                                  className="whitespace-pre-wrap break-words"
                                  style={{ letterSpacing: '0.02em' }}
                                >
                                  {answer.text}
                                </MathJax.Node>
                              </MathJax.Context>
                            ) : (
                              answer.text
                            )}
                          </span>
                        </motion.button>
                      ))}


                    </div>
                    {/* <div className="flex justify-end p-4"> 
<button
  onClick={handleNextQuestion}
  className="flex items-center justify-center p-3 bg-blue-500 dark:bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 transition-transform transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
>
  <span className="text-lg font-semibold">&gt;</span> 
</button>
</div> */}

                    {selectedAnswer && (
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-base font-semibold mb-2 tracking-wider flex flex-col space-y-2">
                          {selectedAnswer?.correct ? (
                            <span className="text-green-600 dark:text-green-500 flex items-center">
                              <span className="mr-2">✔️</span> Correct!
                            </span>
                          ) : (
                            <>
                              <span className="text-red-600 dark:text-red-500 flex items-center">
                                <span className="mr-2">❌</span> Incorrect.
                              </span>
                              <span className="text-gray-800 dark:text-gray-300 flex items-center">
                              <span className="mr-1 sm:text-[10px]">🔍</span>correct =
                                {isMath ? (
                                  <MathJax.Context input='tex'>
                                    <MathJax.Node
                                      className="ml-2 text-green-600 dark:text-green-500 font-semibold"
                                      style={{ fontSize: 'calc(0.65rem + 0.2vw)' }} // Adjusted for a slightly smaller responsive font size
                                    >
                                      {correctAnswer?.text
                                        ? `\\displaystyle ${correctAnswer.text.replace(/ /g, '\\hspace{0.5em}').replace(/\n/g, '\\newline ')}`
                                        : "No correct answer provided."}
                                    </MathJax.Node>
                                  </MathJax.Context>

                                ) : (
                                  <span className="ml-2 text-green-600 dark:text-green-500 font-semibold">
                                    {correctAnswer?.text || "No correct answer provided."}
                                  </span>
                                )}
                              </span>
                            </>
                          )}
                        </p>
                        <p
                          className="w-full bg-white dark:bg-gray-100 p-6 rounded-xl shadow-lg dark:shadow-gray-900 overflow-scroll scrollbar-hidden text-black dark:text-gray-900"
                          style={{
                            letterSpacing: '0.05em',
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            fontSize: 'calc(0.75rem + 0.2vw)', // Responsive font size
                          }}
                        >
                          {isMath ? (
                            <MathJax.Context input='tex'>
                              <MathJax.Node
                                className="whitespace-pre-wrap break-words"
                                style={{
                                  letterSpacing: '0.05em',          // Slight space between letters
                                  overflowWrap: 'break-word',       // Break long words
                                  wordWrap: 'break-word',           // Break words at the end of the line
                                  whiteSpace: 'pre-wrap',           // Preserve whitespace
                                  fontSize: 'calc(0.65rem + 0.2vw)', // Smaller responsive font size
                                  color: 'inherit'                  // Inherit text color
                                }}
                              >
                                {currentQuestionData.explanation
                                  ? `\\displaystyle ${currentQuestionData.explanation.replace(/ /g, '\\hspace{0.5em}').replace(/\n/g, '\\newline ')}`
                                  : "No explanation provided."}
                              </MathJax.Node>
                            </MathJax.Context>

                          ) : (
                            <span
                              style={{
                                letterSpacing: '0.05em',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                fontSize: 'calc(0.75rem + 0.2vw)', // Responsive font size
                                color: 'inherit' // Inherit text color
                              }}
                            >
                              {currentQuestionData.explanation || "No explanation provided."}
                            </span>
                          )}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}


              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 ">
                <button
                  onClick={handleRestartQuiz}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-l-lg rounded-tr-lg hover:bg-[#172554] dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-xl transition-colors duration-300 ease-in-out space-x-2"
                  style={{ borderRadius: '1.5rem 0.5rem 0.5rem 1.5rem' }} // Custom border-radius for one edge more curved
                >
                  <FaRedo className="w-5 h-5" />
                  <span>Restart</span>
                </button>

                <button
                  onClick={handleFinishQuiz}
                  className="flex items-center justify-center px-6 py-3 bg-[#84cc16] text-white rounded-r-lg rounded-bl-lg hover:bg-[#172554] dark:bg-green-500 dark:hover:bg-green-600 shadow-lg hover:shadow-xl transition-colors duration-300 ease-in-out space-x-2"
                  style={{ borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem' }} // Custom border-radius for one edge more curved
                >
                  <FaArrowRight className="w-5 h-5" />
                  <span>Finish</span>
                </button>
              </div>

              {showScore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-full mx-auto mt-8 p-0  rounded-lg shadow-xl "
                >
                  <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-900">Entrance Completed!</h2>
                  <p className="text-xl mb-8 text-gray-800 dark:text-gray-300">
                    You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold text-indigo-600">{quizData.length}</span>.
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="bg-white bg-opacity-80 dark:bg-opacity-80 dark:bg-gray-900  rounded-lg shadow-lg dark:shadow-gray-700 sm:w-full">
                      <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Scoreboard</h2>
                      <ul className="space-y-4">
                        {submittedAnswers.map((answer, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className=""
                          >
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">Question {index + 1}:</p>

                            <p
                              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md text-gray-900 dark:text-gray-200 break-words overflow-scroll scrollbar-hidden"
                              style={{
                                letterSpacing: '0.05em',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                fontSize: 'calc(0.85rem + 0.2vw)',
                              }}
                            >
                              {isMathQuestion(answer.question) ? (
                                <MathJax.Context input="tex">
                                  <MathJax.Node>{answer.question}</MathJax.Node>
                                </MathJax.Context>
                              ) : (
                                <span>{answer.question || "No question provided."}</span>
                              )}
                            </p>

                            <p
                              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md text-gray-900 dark:text-gray-200 mt-2"
                              style={{
                                letterSpacing: '0.05em',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                fontSize: 'calc(0.85rem + 0.2vw)',
                              }}
                            >
                              <strong>Your Answer:</strong>{' '}
                              {isMathQuestion(answer.userAnswer) ? (
                                <MathJax.Context input="tex">
                                  <MathJax.Node>{answer.userAnswer}</MathJax.Node>
                                </MathJax.Context>
                              ) : (
                                <span>{answer.userAnswer || "No answer provided."}</span>
                              )}
                            </p>

                            <p
                              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md text-gray-900 dark:text-gray-200 mt-2"
                              style={{
                                letterSpacing: '0.05em',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                fontSize: 'calc(0.85rem + 0.2vw)',
                              }}
                            >
                              <strong>Correct Answer:</strong>{' '}
                              {isMathQuestion(answer.correctAnswer) ? (
                                <MathJax.Context input="tex">
                                  <MathJax.Node>{answer.correctAnswer}</MathJax.Node>
                                </MathJax.Context>
                              ) : (
                                <span>{answer.correctAnswer || "No correct answer provided."}</span>
                              )}
                            </p>

                            <p
                              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md text-gray-900 dark:text-gray-200 mt-2 tracking-wider overflow-scroll scrollbar-hidden"
                              style={{
                                letterSpacing: '0.05em',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                fontSize: 'calc(0.85rem + 0.2vw)',
                              }}
                            >
                              <strong>Explanation:</strong>{' '}
                              {isMathQuestion(answer.explanation) ? (
                                <MathJax.Context input="tex">
                                  <MathJax.Node>{answer.explanation}</MathJax.Node>
                                </MathJax.Context>
                              ) : (
                                <span>{answer.explanation || "No explanation provided."}</span>
                              )}
                            </p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              )}



              {showForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70 bg-blur-sm flex items-center justify-center p-4"
                >
                  <div className="bg-white dark:bg-gray-900 bg-opacity-30 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md relative">
                    {/* Enhanced Close Icon */}
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
                    >
                      <FaTimes size={24} />
                    </button>

                    {/* Improved Instructions */}
                    <h3 className="font-semibold mb-4 text-black dark:text-white text-left text-lg sm:text-base">
                      ✨ **Please complete the form with your correct details** ✨
                    </h3>
                    <p className="text-sm text-gray-900 dark:text-gray-400 mb-4">
                      🚀 Your information helps us provide the best service.
                      Please make sure to fill out all fields accurately.
                      If you need any help, feel free to contact us! 😊
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4 sm:flex sm:space-x-2">
                        <label className="block text-sm font-medium mb-2 text-black dark:text-white text-left sm:w-1/3">
                          👤 Name:
                        </label>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white dark:text-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-300 focus:scale-105"
                        />
                      </div>
                      <div className="mb-4 sm:flex sm:space-x-2">
                        <label className="block text-sm font-medium mb-2 text-black dark:text-white text-left sm:w-1/3">
                          🛠️ Engineering Field:
                        </label>
                        <select
                          name="engineeringField"
                          value={formData.engineeringField}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white dark:text-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-300 focus:scale-105"
                        >
                          <option value="Computer">Computer</option>
                          <option value="Civil">Civil</option>
                          <option value="Architecture">Architecture</option>
                        </select>
                      </div>
                      <div className="mb-4 sm:flex sm:space-x-2">
                        <label className="block text-sm font-medium mb-2 text-black dark:text-white text-left sm:w-1/3">
                          📝 Review:
                        </label>
                        <textarea
                          name="review"
                          value={formData.review}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white dark:text-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-300 focus:scale-105"
                        />
                      </div>
                      <div className="flex flex-col">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="fixed bottom-16 right-4 z-50 hidden lg:block"> {/* Hide on mobile and show on laptops and larger screens */}
        <button
          onClick={handleNextQuestion}
          className="flex items-center justify-center p-3 bg-opacity-10 bg-blue-500 dark:bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 transition-transform transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-1 focus:ring-blue-400 "
        >
          <span className="text-lg font-semibold">&gt;</span> {/* Enhanced text styling */}
        </button>
      </div>
    </>
  );
};

export default Mock1;
