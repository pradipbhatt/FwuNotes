import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../home/Footer";
import logo from '../../../public/fwu.png'; // Ensure this path is correct
import Chat from '../AI/Chat';
import { motion } from "framer-motion";
import FacebookComments from "../FacebookComments"

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
  const pageUrl = "https://www.soenotes.com/"; // Replace with your actual page URL



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
    const topPerformersList = sortedResults.slice(0, 30);
    setTopPerformers(topPerformersList);
  };



  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 sm:mt-0 mt-10 bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg">
        {/* Formal Header */}
        <motion.div
          className="container mx-auto text-center mt-1 p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 relative rounded-3xl w-full sm:w-1/2 bg-opacity-40 dark:bg-opacity-30 shadow-lg lg:mt-20"
          initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move up from 50px below
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
          transition={{ duration: 0.8, ease: "easeOut" }} // Control the duration and easing of the animation
        >
          <motion.div
            className="header mb-8"
            initial={{ opacity: 0, x: -50 }} // Fade in from the left
            animate={{ opacity: 1, x: 0 }} // Move to the original position
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.img
              src={logo}
              alt="University Logo"
              className="mx-auto w-24 h-auto mb-4"
              initial={{ rotate: -180, opacity: 0 }} // Rotate in and fade in
              animate={{ rotate: 0, opacity: 1 }} // Rotate back to original and fade in
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <h1 className="text-2xl font-bold mb-2">Far Western University</h1>
            <h2 className="text-xl mb-2">School of Engineering</h2>
            <h3 className="text-lg mb-4">Mahendranagar, Kanchanpur, Nepal</h3>
            <h4 className="text-lg">BE Test Examination Results</h4>
          </motion.div>
        </motion.div>



        {/* Results Section */}


        {loading ? (
          <div className="flex flex-col items-center">
            <div className="radial-progress" style={{ "--value": progress }} role="progressbar">{progress}%</div>
            <p className="mt-4 text-gray-700 dark:text-gray-400">Results are loading...</p>
          </div>
        ) : (
          <div className="mt-8 px-4 md:px-8 lg:px-16">
            <motion.h2
              className="text-2xl sm:text-md font-extrabold text-gray-900 dark:text-white mb-8"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              🏆 Top Performers
            </motion.h2>

            {topPerformers.length > 0 ? (
              topPerformers.map((performer, index) => (
                <motion.div
                key={performer._id} // Assuming _id is the unique identifier
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 border border-gray-300 dark:border-gray-600 hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }} // Staggered animation for each result
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🥇 Rank {index + 1}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">User Name:</span>{" "}
                  <span className="font-semibold text-blue-500 dark:text-blue-400">{performer.userName}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Engineering Field:</span>{" "}
                  <span className="font-semibold text-green-500 dark:text-green-400">{performer.engineeringField}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Total Questions:</span>{" "}
                  <span className="font-semibold text-orange-500 dark:text-orange-400">{performer.totalQuestions}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Correct Answers:</span>{" "}
                  <span className="font-semibold text-purple-500 dark:text-purple-400">{performer.solvedQuestions}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Percentage:</span>{" "}
                  <span className="font-semibold text-red-500 dark:text-red-400">{((performer.solvedQuestions / performer.totalQuestions) * 100).toFixed(2)}%</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Created Time:</span>{" "}
                  <span className="font-semibold text-gray-500 dark:text-gray-400">{new Date(performer.createdAt).toLocaleString()}</span>
                </p>
              </motion.div>
              ))
            ) : (
              <motion.p
                className="text-gray-700 dark:text-gray-400 text-center text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                No top performers found.
              </motion.p>
            )}
            {/* Add fomr here */}
            <div className="container mx-auto text-center mt-8 p-4">
              <motion.h3
                className="text-md sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                >
                  🌟 Only the Top 30 Performers Will Be Displayed Here! 🌟
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                  🎯 Give it your best shot and aim to be among the top 30 achievers! 🚀
                </motion.span>
              </motion.h3>

            </div>
          </div>
        )}
      </div>
      <FacebookComments pageUrl={pageUrl} />
      <Chat />

      <Footer />
    </>
  );
};

export default QuizResult;
