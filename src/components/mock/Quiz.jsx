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
    }, 200); // Adjust debounce delay as needed (e.g., 200ms)
    
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
    return quizzes.filter(quiz => quiz.yearID === currentYear);
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
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editMode ? 'Update Quiz' : (isLoading ? (
                  <div className="flex items-center">
                    <ClipLoader color={'#ffffff'} loading={isLoading} size={20} />
                    <span className="ml-2">Uploading...</span>
                  </div>
                ) : 'Submit Quiz')}
              </button>
            </div>
          </form>


          <div className="fixed bottom-20 right-5 z-10 flex justify-end w-full mt-10 ">
  <button
    onClick={handleGoToBottom}
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-3 rounded-full focus:outline-none focus:shadow-outline ml-2"
  >
    <FaArrowCircleDown className="text-3xl" />
  </button>
  <button
    onClick={handleGoToTop}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full focus:outline-none focus:shadow-outline ml-2"
  >
    <FaArrowCircleUp className="text-3xl" />
  </button>
</div>

            
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Quiz List</h2>
            {quizzes.length === 0 ? (
              <p className="text-gray-700">No quizzes available.</p>
            ) : (
              <div className="space-y-4">
                {paginatedQuizzes().map((quiz, index) => (
                  <div key={quiz._id} className="bg-white shadow-md rounded px-8 py-6">
                    <p className="text-lg font-bold">{`Question ${index + 1}: ${quiz.question}`}</p>
                    <ul className="list-disc list-inside mt-2">
                      {quiz.answers.map((answer, ansIndex) => (
                        <li key={answer._id} className={`${answer.correct ? 'text-green-500' : 'text-gray-700'}`}>
                          {answer.text}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-2">{`Explanation: ${quiz.explanation}`}</p>
                    <p className="text-sm">{`Year ID: ${quiz.yearID}`}</p>
                    <div className="flex mt-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={() => handleEditQuiz(quiz)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteQuiz(quiz._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center mb-10">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed mr-20"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages() - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed mr-20"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Quiz;
// make next and previous bottom working