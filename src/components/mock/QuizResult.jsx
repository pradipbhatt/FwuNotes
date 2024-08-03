import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from '../../../public/fwu.png'; // Ensure this path is correct

const QuizResult = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    engineeringField: 'Computer',
    review: 'Challenging but fun! and too easy',
    rating: 4,
    totalQuestions: 15,
    solvedQuestions: 12
  });
  const [formMode, setFormMode] = useState('add');
  const [selectedQuizResultId, setSelectedQuizResultId] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;
    if (loading) {
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
  }, [loading]);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  useEffect(() => {
    if (!loading) {
      calculateTopPerformers();
    }
  }, [quizResults, loading]);

  const fetchQuizResults = () => {
    fetch('https://fwu-soe.onrender.com/api/quiz-results/')
      .then(response => response.json())
      .then(data => {
        setQuizResults(data);
        setLoading(false);
        setProgress(100); // Set progress to 100% once data is loaded
      })
      .catch(error => {
        console.error('Error fetching quiz results:', error);
        setLoading(false);
        setProgress(100); // Ensure progress is set to 100% even on error
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formMode === 'add') {
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
        fetchQuizResults();
      })
      .catch(error => console.error('Error submitting quiz result:', error));
    } else if (formMode === 'update' && selectedQuizResultId) {
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
        fetchQuizResults();
        setFormMode('add');
        setSelectedQuizResultId(null);
      })
      .catch(error => console.error('Error updating quiz result:', error));
    }

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
    fetch(`https://fwu-soe.onrender.com/api/quiz-results/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log(`Quiz result with ID ${id} deleted successfully.`);
        fetchQuizResults();
      } else {
        throw new Error('Failed to delete quiz result.');
      }
    })
    .catch(error => console.error('Error deleting quiz result:', error));
  };

  const calculateTopPerformers = () => {
    // Calculate percentage of correct answers
    const resultsWithPercentages = quizResults.map(result => ({
      ...result,
      percentage: (result.solvedQuestions / result.totalQuestions) * 100
    }));

    // Sort by percentage in descending order
    const sortedResults = resultsWithPercentages.sort((a, b) => b.percentage - a.percentage);

    // Get the top 20 performers
    const topPerformersList = sortedResults.slice(0, 20);
    setTopPerformers(topPerformersList);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-12 mt-20 bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg shadow-lg">
        {/* Formal Header */}
        <div className="text-center mb-12">
          <img src={logo} alt="University Logo" className="mx-auto w-40 h-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">Far Western University</h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Faculty of Engineering</h2>
          <h3 className="text-xl text-gray-600 dark:text-gray-400 mb-4">Mahendranagar, Kanchanpur, Nepal</h3>
          <h4 className="text-xl font-medium text-gray-600 dark:text-gray-300">BE Entrance Examination</h4>
        </div>

        {/* Results Section */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">🎓 Entrance Test Results</h1>
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="radial-progress" style={{ "--value": progress }} role="progressbar">{progress}%</div>
            <p className="mt-4 text-gray-700 dark:text-gray-400">Results are loading...</p>
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🏆 Top Performers</h2>
            {topPerformers.length > 0 ? (
              topPerformers.map((performer, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-4 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Rank {index + 1}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">User Name:</span> {performer.userName}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Engineering Field:</span> {performer.engineeringField}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Total Questions:</span> {performer.totalQuestions}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Correct Answers:</span> {performer.solvedQuestions}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Percentage:</span> {performer.percentage.toFixed(2)}%</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-400">No top performers found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default QuizResult;
