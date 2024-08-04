import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { FaCheck, FaArrowRight, FaTimes } from "react-icons/fa";
import backgroundImage from "../../../public/fwu.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from '../../../public/fwu.png'; // Adjust import path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

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
    review: "Any feedbacks or suggetions ?",
    rating: "5",
  });

  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [progress, setProgress] = useState(0); // Progress for loading indicator

  useEffect(() => {
    let progressInterval;
    if (showLoader) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) {
            return prev + 1; // Gradually increase progress
          } else {
            return prev; // Hold at 90% until data is fetched
          }
        });
      }, 100); // Interval duration can be adjusted as needed
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
        const filteredData = data.filter((quiz) => quiz.yearID === 2076);

        // Add _id to answers and randomize options
        const processedData = filteredData.map(quiz => {
          // Add _id to each answer
          const answersWithIds = quiz.answers.map((answer, index) => ({
            ...answer,
            _id: `answer_${index}_${Math.random().toString(36).substr(2, 9)}` // Generate unique _id
          }));

          // Shuffle answers
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
        setProgress(100); // Set progress to 100% once data is loaded
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
      toast.success("Quiz result submitted successfully!"); // Show success toast
      setFormData({
        userName: "",
        engineeringField: "Computer",
        review: "Any feedbacks or Suggetions ?",
        rating: "5", // Reset rating to default
      });
    } catch (error) {
      toast.error("There was an error submitting the form."); // Show error toast
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
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        {showLoader && (
          <div className="flex flex-col items-center">
            <div className="radial-progress" style={{ "--value": progress }} role="progressbar">
              {progress}%
            </div>
            <h4 className="text-2xl font-semibold text-white mt-8">
              Loading questions, please wait...
            </h4>
          </div>
        )}
        {!showLoader && (
          <>
            {showTitles && (
              <>
                <div className="header mb-8 ">
                  <img src={logo} alt="University Logo" className="mx-auto w-24 h-auto mb-4" />
                  <h1 className="text-4xl font-extrabold text-white mb-2">Far Western University</h1>
                  <h2 className="text-2xl text-gray-300 mb-2">Faculty of Engineering</h2>
                  <h3 className="text-xl text-gray-400 mb-4">Mahendranagar, Kanchanpur, Nepal</h3>
                  <h4 className="text-xl text-gray-300">BE Entrance Examination</h4>
                </div>
                <div className="exam-info mb-8">
                  <p className="text-lg text-gray-300">
                    Time Remaining: {formatTime(timer)}
                  </p>
                </div>
              </>
            )}
            {!showTitles && (
              <div className="exam-info mb-2">
                <p className="text-lg text-gray-300">
                  Time Remaining: {formatTime(timer)}
                </p>
                <p className="text-lg text-gray-300">
                  Time Remaining for Question: {formatTime(questionTimer)}
                </p>
              </div>
            )}
            <div className="flex flex-col items-center ">
              <div className="max-w-4xl w-full bg-gray-100 p-8 rounded-xl shadow-4xl dark:bg-gray-800 dark:bg-opacity-90">
                {showScore ? (
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-black dark:text-white">
                      Your Score: {score}
                    </h2>
                    <button
                      onClick={handleRestartQuiz}
                      className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                    >
                      Restart Quiz
                    </button>
                    <div className="mt-10">
                      <h3 className="text-2xl font-bold text-black mb-4 text-black dark:text-white">
                        Quiz Summary & Explanations
                      </h3>
                      {submittedAnswers.map((answer, index) => (
                        <div
                          key={index}
                          className="border border-gray-700 rounded-lg p-6 mb-4 bg-gray-800 text-gray-300 shadow-lg"
                        >
                          <h4 className="font-semibold text-white">
                            {index + 1}. {answer.question}
                          </h4>
                          <p>
                            <span className="font-semibold text-white">Your Answer:</span> {answer.userAnswer}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Correct Answer:</span> {answer.correctAnswer}
                          </p>
                          <p>
                            <span className="font-semibold text-white">Explanation:</span> {answer.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8 px-4 sm:px-6 md:px-8  dark:bg-gray-800 dark:bg-opacity-90">
                      <div className="text-2xl font-bold mb-2 text-black dark:text-white">
                        Question {currentQuestion + 1}
                      </div>
                      <div className="text-xl font-semibold mb-4 text-black dark:text-white">
                        {quizData[currentQuestion]?.question}
                      </div>
                      {quizData[currentQuestion]?.answers.map((answerOption) => (
                        <div
                          key={answerOption._id}
                          className={`cursor-pointer px-4 py-4 mb-3 rounded-lg border-2 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md ${selectedAnswer === answerOption
                            ? answerOption.correct
                              ? "bg-green-600 border-green-300  dark:text-black shadow-inner shadow-green-500 "
                              : "bg-red-600 border-red-300 text-black dark:text-black shadow-inner shadow-red-500"
                            : correctAnswer === answerOption
                              ? "bg-green-300 border-green-300 text-gray-800 dark:text-gray-900 shadow-inner shadow-green-200"
                              : "bg-white border-gray-300 dark:bg-gray-700 dark:text-gray-200 shadow-inner shadow-black-900"
                          }`}
                          onClick={() => handleAnswerOptionClick(answerOption)}
                        >
                          {selectedAnswer === answerOption && (
                            <FaCheck className="text-white mr-3" />
                          )}
                          <span className="text-base">{answerOption.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handleRestartQuiz}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                      >
                        Restart Quiz
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 relative">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Submit Quiz Result
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-100">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name here"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-lg text-gray-800 dark:text-gray-900 bg-gray-100 dark:bg-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-100">
                Engineering Field:
              </label>
              <select
                name="engineeringField"
                value={formData.engineeringField}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
                required
              >
                <option value="Computer">Computer</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-100">
                Review:
              </label>
              <textarea
                placeholder="Give your feedback here!"
                name="review"
                value={formData.review || "Any feedback or suggestions?"}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )}
    <ToastContainer />
  </div>
</>

  );
};

export default Mock1;
