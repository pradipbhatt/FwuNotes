import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'; // Importing icons
import Navbar from '../Navbar';
// import Footer from '../Footer'; Uncomment if you have a Footer component

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false }
  ]);
  const [explanation, setExplanation] = useState('');
  const [yearID, setYearID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const quizzesPerPage = 10;
  const [showButtons, setShowButtons] = useState(true); // State to manage button visibility

  useEffect(() => {
    fetchQuizzes();
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => window.removeEventListener('scroll', handleScroll); // Clean up on unmount
  }, []);

  // Function to handle scroll events
  const handleScroll = () => {
    clearTimeout(); // Clear any existing timeout to debounce the scroll event
    setTimeout(() => {
      setShowButtons(true); // Show buttons when scrolling stops
    }, 100); // Adjust debounce delay as needed (e.g., 200ms)
    
    // Hide buttons after 3 seconds of no scroll activity
    setTimeout(() => {
      setShowButtons(false);
    }, 3000); // Adjust hiding delay as needed (e.g., 3000ms)
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('https://fwu-soe.onrender.com/api/quizzes/');
      const sortedQuizzes = response.data.sort((a, b) => a.yearID - b.yearID);
      setQuizzes(sortedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setError('Failed to fetch quizzes. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || !answers.every(answer => answer.text && (answer.correct === true || answer.correct === false)) || !explanation || !yearID) {
      setError('Please fill out all required fields.');
      return;
    }

    setIsLoading(true); // Start loading
    const quizData = {
      question,
      answers,
      explanation,
      yearID
    };

    try {
      if (editMode) {
        await axios.put(`https://fwu-soe.onrender.com/api/quizzes/${currentQuiz._id}`, quizData);
        setError(''); // Clear any previous errors
        setEditMode(false);
      } else {
        await axios.post('https://fwu-soe.onrender.com/api/quizzes/', quizData);
        setError(''); // Clear any previous errors
      }
      setQuestion('');
      setAnswers([
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false }
      ]);
      setExplanation('');
      setYearID('');
      fetchQuizzes(); // Refresh the list
    } catch (error) {
      console.error('Error posting or updating quiz data:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleAnswerChange = (index, newText) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = newText;
    setAnswers(updatedAnswers);
  };

  const handleCorrectChange = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers.forEach((answer, i) => {
      updatedAnswers[i].correct = i === index;
    });
    setAnswers(updatedAnswers);
  };

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuestion(quiz.question);
    setAnswers(quiz.answers);
    setExplanation(quiz.explanation);
    setYearID(quiz.yearID);
    setEditMode(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`https://fwu-soe.onrender.com/api/quizzes/${quizId}`);
      fetchQuizzes(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting quiz:', error);
      setError('An error occurred while deleting the quiz. Please try again.');
    }
  };

  const paginatedQuizzes = () => {
    const years = [...new Set(quizzes.map(quiz => quiz.yearID))].sort((a, b) => a - b);
    const currentYear = years[currentPage];
    return quizzes.filter(quiz => quiz.yearID === currentYear && quiz.question.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const totalPages = () => {
    const years = [...new Set(quizzes.map(quiz => quiz.yearID))];
    return years.length;
  };

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl font-bold mb-4">Quiz Management</h2>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Question:
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-transparent text-gray-500"
                placeholder="Enter question"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answers">
                Answers:
              </label>
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-transparent text-gray-500"
                    placeholder={`Enter answer ${index + 1}`}
                    required
                  />
                  <label className="ml-2">
                    Correct:
                    <input
                      type="radio"
                      checked={answer.correct}
                      onChange={() => handleCorrectChange(index)}
                      className="ml-1"
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="explanation">
                Explanation:
              </label>
              <textarea
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-transparent text-gray-500 h-40"
                placeholder="Enter explanation"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearID">
                Year ID:
              </label>
              <input
                type="number"
                id="yearID"
                value={yearID}
                onChange={(e) => setYearID(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-transparent text-gray-500"
                placeholder="Enter year ID"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editMode ? 'Update Quiz' : 'Add Quiz'}
              </button>
            </div>
          </form>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
              Search Questions:
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-transparent text-gray-500"
              placeholder="Search for a question"
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color="blue" loading={isLoading} size={50} />
            </div>
          ) : (
            <div>
              {paginatedQuizzes().map((quiz) => (
                <div key={quiz._id} className="mb-4 p-4 border border-gray-300 rounded">
                  <h3 className="text-lg font-semibold">{quiz.question}</h3>
                  <ul className="list-disc pl-5">
                    {quiz.answers.map((answer, index) => (
                      <li key={index} className={`${answer.correct ? 'text-green-500' : 'text-gray-700'}`}>
                        {answer.text}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 mt-2">Explanation: {quiz.explanation}</p>
                  <p className="text-gray-600 mt-2">Year ID: {quiz.yearID}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEditQuiz(quiz)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {totalPages() > 1 && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Previous
                  </button>
                  <span className="text-lg font-semibold">
                    Page {currentPage + 1} of {totalPages()}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages() - 1))}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Next
                  </button>
                </div>
              )}

              <div className={`fixed bottom-0 left-0 w-full flex justify-between p-4 ${showButtons ? '' : 'hidden'}`}>
                <button
                  onClick={handleGoToTop}
                  className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  <FaArrowCircleUp />
                </button>
                <button
                  onClick={handleGoToBottom}
                  className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  <FaArrowCircleDown />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> Uncomment if you have a Footer component */}
    </>
  );
};

export default Quiz;
