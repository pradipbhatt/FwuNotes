import React, { useState, useEffect } from 'react';

const QuizResultForm = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    engineeringField: 'Computer',
    review: 'Challenging but fun! and too easy',
    rating: 4,
    totalQuestions: 15,
    solvedQuestions: 12
  });
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'
  const [selectedQuizResultId, setSelectedQuizResultId] = useState(null);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = () => {
    fetch('https://fwu-soe.vercel.app/api/quiz-results/')
      .then(response => response.json())
      .then(data => {
        setQuizResults(data);
      })
      .catch(error => console.error('Error fetching quiz results:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formMode === 'add') {
      // Add new quiz result
      fetch('https://fwu-soe.vercel.app/api/quiz-results/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Quiz result submitted successfully:', data);
        fetchQuizResults(); // Fetch updated quiz results after submission
      })
      .catch(error => console.error('Error submitting quiz result:', error));
    } else if (formMode === 'update' && selectedQuizResultId) {
      // Update existing quiz result
      fetch(`https://fwu-soe.vercel.app/api/quiz-results/${selectedQuizResultId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Quiz result updated successfully:', data);
        fetchQuizResults(); // Fetch updated quiz results after update
        setFormMode('add'); // Reset form mode to 'add' after update
        setSelectedQuizResultId(null); // Reset selected quiz result ID
      })
      .catch(error => console.error('Error updating quiz result:', error));
    }

    // Reset form data
    setFormData({
      userName: '',
      engineeringField: 'Computer',
      review: 'Challenging but fun! and too easy',
      rating: 4,
      totalQuestions: 15,
      solvedQuestions: 12
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDeleteQuizResult = (id) => {
    fetch(`https://fwu-soe.vercel.app/api/quiz-results/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log(`Quiz result with ID ${id} deleted successfully.`);
        fetchQuizResults(); // Fetch updated quiz results after deletion
      } else {
        throw new Error('Failed to delete quiz result.');
      }
    })
    .catch(error => console.error('Error deleting quiz result:', error));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">User Quiz Results</h1>

        {/* Display quiz results */}
        <div>
          {quizResults.length > 0 ? (
            quizResults.map((result, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 mb-4">
                <h3 className="text-lg font-semibold mb-2">Quiz Result {index + 1}</h3>
                <p className="text-gray-700 mb-1">User Name: {result.userName}</p>
                <p className="text-gray-700 mb-1">Engineering Field: {result.engineeringField}</p>
                <p className="text-gray-700 mb-1">Total Questions: {result.totalQuestions}</p>
                <p className="text-gray-700 mb-1">Correct Answers: {result.solvedQuestions}</p>
                <p className="text-gray-700 mb-1">Review: {result.review}</p>
                <p className="text-gray-700 mb-1">Rating: {result.rating}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
                  onClick={() => handleDeleteQuizResult(result._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No quiz results found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizResultForm;
