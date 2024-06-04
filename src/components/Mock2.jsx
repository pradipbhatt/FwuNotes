import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";


const quizData2077 = [ // Define quiz data for 2077
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ],
    explanation: "Paris is the capital city of France."
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false }
    ],
    explanation: "William Shakespeare wrote 'Romeo and Juliet'."
  },
  // Add more quiz data as needed
];

const Mock2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(60); // 60 seconds for each question

  useEffect(() => {
    let countdown;
    if (timer > 0 && !showScore) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(countdown);
  }, [timer, showScore]);

  const handleAnswerOptionClick = (correct, text) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(text);
    setTimeout(() => {
      handleNextQuestion();
    }, 1000); // wait for 1 second before moving to the next question
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimer(60);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData2077.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
      setSelectedAnswer(null);
      setTimer(60);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimer(60);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 mt-3 text-gray-800">
        <div className="w-1/2 mt-10">
          {showScore ? (
            <div className="text-center">
              <h4 className="text-2xl font-bold mt-12 w-full ">Quiz Completed</h4>
              <h5 className="text-xl mb-4">
                You scored {score} out of {quizData2077.length}
              </h5>
              <div className="mt-4 text-left">
                {quizData2077.map((question, index) => (
                  <div key={index} className="mb-4">
                    <h6 className="text-lg">{question.question}</h6>
                    <p className="text-sm text-gray-800">
                      {question.explanation}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className="px-4 py-2 mt-4 bg-orange-500 hover:bg-orange-500 text-white rounded"
                onClick={handleRestartQuiz}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h5 className="text-xl mb-2">
                  Question {currentQuestion + 1}/{quizData2077.length}
                </h5>
                <p className="text-base mb-2">
                  {quizData2077[currentQuestion].question}
                </p>
                <p className="text-sm text-red-600">
                  Time remaining: {timer} seconds
                </p>
              </div>
              <div className="space-y-2">
                {quizData2077[currentQuestion].answers.map(
                  (answerOption, index) => (
                    <button
                      key={index}
                      className={`w-full px-4 py-2 rounded ${
                        selectedAnswer === answerOption.text
                          ? answerOption.correct
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      onClick={() =>
                        handleAnswerOptionClick(
                          answerOption.correct,
                          answerOption.text
                        )
                      }
                      disabled={selectedAnswer !== null}
                    >
                      {answerOption.text}
                    </button>
                  )
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  className="w-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded disabled:bg-gray-400"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="w-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-400"
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mock2;

