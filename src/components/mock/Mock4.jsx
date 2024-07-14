import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import logo from "../../../public/fwu.png";
import { FaCheck } from "react-icons/fa"; // Importing check icon from react-icons/fa

// Total number of questions and time per question in seconds
const NUM_QUESTIONS = 75; // Assuming 75 questions
const QUESTION_TIME = 2 * 60; // 2 minutes per question in seconds

const TOTAL_TIME = NUM_QUESTIONS * QUESTION_TIME; // Total time in seconds

const Mock4 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return parseInt(localStorage.getItem("currentQuestion")) || 0;
  });
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem("score")) || 0;
  });
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(() => {
    return parseInt(localStorage.getItem("timer")) || TOTAL_TIME;
  });
  const [questionTimer, setQuestionTimer] = useState(() => QUESTION_TIME);
  const [quizData, setQuizData] = useState([]);
  const [showLoader, setShowLoader] = useState(true); // State to control the loader
  const [showTitles, setShowTitles] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("https://fwu-soe.onrender.com/api/quizzes/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Filter quizzes where yearID is 2073
        const filteredData = data.filter(quiz => quiz.yearID === 2074);
        setQuizData(filteredData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data
        setShowLoader(false); // Hide the loader after data is fetched
        setShowTitles(true); // Show titles once data is loaded
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
        setQuestionTimer((prevTimer) => {
          return prevTimer - 1;
        });
      }, 1000);
    }

    if (questionTimer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(questionCountdown);
  }, [questionTimer, showScore, selectedAnswer]);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("score", score);
  }, [currentQuestion, score]);

  useEffect(() => {
    const titlesTimer = setTimeout(() => {
      setShowTitles(false);
    }, 5000); // Hide titles after 5 seconds

    return () => clearTimeout(titlesTimer);
  }, [showTitles]);

  useEffect(() => {
    const handleUnload = (event) => {
      if (!showScore) {
        event.preventDefault();
        event.returnValue = "";
        const attemptedQuestions = currentQuestion + 1;
        const correctAnswers = score;
        const confirmationMessage = `You have attempted ${attemptedQuestions} questions with ${correctAnswers} correct answers. Are you sure you want to leave? Your progress will be lost.`;
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [currentQuestion, score, showScore]);

  const handleAnswerOptionClick = (answerOption) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answerOption);
      if (answerOption.correct) {
        setScore(score + 1);
      }
      setTimeout(() => {
        handleNextQuestion();
      }, 4000); // wait for 4 seconds before moving to the next question
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setQuestionTimer(QUESTION_TIME); // Reset question timer for next question
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto text-center mt-20 p-4">
        {showLoader && (
          <div className="text-center">
            <h4 className="text-2xl font-bold mt-12">Loading questions...</h4>
          </div>
        )}
        {!showLoader && (
          <>
            {showTitles && (
              <>
                <div className="header mb-4">
                  <img src={logo} alt="University Logo" className="mx-auto w-32 h-auto mb-4 mt-5" />
                  <h1 className="text-lg font-bold" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}>FAR WESTERN UNIVERSITY</h1>
                  <h2 className="text-md" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}>Faculty of Engineering</h2>
                  <h3 className="text-sm" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}>Mahendranagar, Kanchanpur, Nepal</h3>
                  <h3 className="text-sm" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}>BE Entrance Examination</h3>
                </div>
                <div className="exam-info mb-4">
                  <p className="text-md" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}><strong>Full Marks: 150</strong></p>
                  <p className="text-md" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}><strong>Time: {formatTime(timer)}</strong></p>
                </div>
                <div className="instructions text-left mx-auto w-full mb-6" style={{ fontFamily: 'Times New Roman', fontSize: '12px', color: 'darkblue' }}>
                  <p className="font-bold">Attempt all questions:</p>
                  <p className="mb-2">Read the following questions and click the correct option <strong>a, b, c,</strong> or <strong>d</strong> in the answer sheet provided. In section I, each question carries <strong>1 (one) mark</strong> and in section II, each question carries <strong>2 (two) marks</strong>.</p>
                </div>
              </>
            )}
            {!showTitles && (
              <div className="exam-info mb-4">
                <p className="text-md" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}><strong>Time Remaining: {formatTime(timer)}</strong></p>
                <p className="text-md" style={{ fontFamily: 'Times New Roman', color: 'darkblue' }}><strong>Time Remaining for Question: {formatTime(questionTimer)}</strong></p>
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 text-gray-800">
                <div className="w-full max-w-4xl">
                  {showScore ? (
                    <div className="text-center">
                      <h4 className="text-2xl font-bold mt-12 w-full">Quiz Completed</h4>
                      <h5 className="text-xl mb-4">
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
                      <div className="grid grid-cols-1 gap-4"> {/* Changed grid-cols-2 to grid-cols-1 for single column */}
                        {quizData[currentQuestion]?.answers.map((answerOption, index) => (
                          <button
                            key={index}
                            className={`w-full px-4 py-2 flex items-center justify-between rounded ${
                              selectedAnswer && selectedAnswer.text === answerOption.text
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
                            {selectedAnswer && selectedAnswer.text === answerOption.text && ( // Display check mark if selected
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Mock4;
