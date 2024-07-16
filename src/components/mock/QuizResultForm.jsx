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
    fetch('https://fwu-soe.onrender.com/api/quiz-results/')
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
      fetch('https://fwu-soe.onrender.com/api/quiz-results/', {
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
      fetch(`https://fwu-soe.onrender.com/api/quiz-results/${selectedQuizResultId}`, {
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

  const handleSelectQuizResult = (quizResult) => {
    // Set form mode to 'update' and populate form data with selected quiz result
    setFormMode('update');
    setSelectedQuizResultId(quizResult._id);
    setFormData({
      userName: quizResult.userName,
      engineeringField: quizResult.engineeringField,
      review: quizResult.review,
      rating: quizResult.rating,
      totalQuestions: quizResult.totalQuestions,
      solvedQuestions: quizResult.solvedQuestions
    });
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
                <p className="text-gray-700 mb-1">Review: {result.review}</p>
                <p className="text-gray-700 mb-1">Rating: {result.rating}</p>
                <p className="text-gray-700 mb-1">Total Questions: {result.totalQuestions}</p>
                <p className="text-gray-700 mb-1">Solved Questions: {result.solvedQuestions}</p>
                <button onClick={() => handleSelectQuizResult(result)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No quiz results found.</p>
          )}
        </div>

        {/* Quiz result form */}
        <form onSubmit={handleSubmit} className="mt-8">
          <label>
            User Name:
            <input type="text" name="userName" value={formData.userName} readOnly className="ml-2 border rounded px-2 py-1" />
          </label>
          <br />
          <label>
            Engineering Field:
            <div className="ml-2">
              <label>
                <input type="radio" name="engineeringField" value="Computer" checked={formData.engineeringField === 'Computer'} onChange={handleInputChange} className="mr-2" />
                Computer
              </label>
              <label className="ml-4">
                <input type="radio" name="engineeringField" value="Civil" checked={formData.engineeringField === 'Civil'} onChange={handleInputChange} className="mr-2" />
                Civil
              </label>
            </div>
          </label>
          <br />
          <label>
            Review:
            <input type="text" name="review" value={formData.review} onChange={handleInputChange} className="ml-2 border rounded px-2 py-1" />
          </label>
          <br />
          <label>
            Rating:
            <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} className="ml-2 border rounded px-2 py-1" />
          </label>
          <br />
          <label>
            Total Questions:
            <input type="number" name="totalQuestions" value={formData.totalQuestions} onChange={handleInputChange} className="ml-2 border rounded px-2 py-1" />
          </label>
          <br />
          <label>
            Solved Questions:
            <input type="number" name="solvedQuestions" value={formData.solvedQuestions} onChange={handleInputChange} className="ml-2 border rounded px-2 py-1" />
          </label>
          <br />
          <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {formMode === 'add' ? 'Submit Quiz Result' : 'Update Quiz Result'}
          </button>
        </form>
      </div>
    </>
  );
};

export default QuizResultForm;
