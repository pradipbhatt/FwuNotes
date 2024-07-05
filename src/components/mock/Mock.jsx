import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/fwu.png'; // Adjust the import path as necessary
import Navbar from '../Navbar';
import Footer from '../Footer';

const years = [2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080];

const Mock = () => {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    // Retrieve current year from localStorage on component mount
    const storedYear = localStorage.getItem('currentYear');
    if (storedYear && years.includes(parseInt(storedYear))) {
      setCurrentYear(parseInt(storedYear));
    }
  }, []);

  const handleTestNowClick = (year) => {
    setCurrentYear(year);
    // Store current year in localStorage
    localStorage.setItem('currentYear', year.toString());
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto text-center mt-20 p-4">
        <div className="header mb-4">
          <img src={logo} alt="University Logo" className="mx-auto w-32 h-auto mb-4" />
          <h1 className="text-2xl font-bold">FAR WESTERN UNIVERSITY</h1>
          <h2 className="text-xl">Faculty of Engineering</h2>
          <h3 className="text-lg">Mahendranagar, Kanchanpur, Nepal</h3>
          <h3 className="text-lg">BE Entrance Examination</h3>
        </div>
        <div className="exam-info mb-4">
          <p className="text-lg"><strong>Full Marks: 150</strong></p>
          <p className="text-lg"><strong>Time: 3 hours</strong></p>
        </div>
        <div className="instructions text-left mx-auto max-w-xl">
          <p className="font-bold mb-2">Attempt all questions:</p>
          <p className="mb-2">Read the following questions and write down the correct option <strong>a, b, c,</strong> or <strong>d</strong> in the answer sheet provided. In section I each question carries <strong>1 (one) mark</strong> and in section II each question carries <strong>2 (two) marks</strong>.</p>
        </div>
      </div>

      {/* Admission Guidelines Card */}
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Admission Guidelines</h2>
          <p className="text-gray-600 mb-6">
            The admission guidelines for Far Western University's Faculty of Engineering are designed to provide a comprehensive overview of the admission process. The guidelines cover the eligibility criteria, application procedure, and other important details that prospective students need to know.
          </p>
          <Link to={`/AdmissionGuidelines/`}>
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-400 ease-in-out shadow-inner"
              onClick={() => handleTestNowClick()}
            >
              View Guidelines
            </button>
          </Link>
        </div>
      </div>

      {/* Entrance Papers Cards */}
      <div className="flex-grow flex justify-center items-center bg-gray-800 p-4 dark:bg-gray-100 mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {years.map((year, index) => (
            <div key={year} className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
              <div className="p-6 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">Entrance paper of {year}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-12 w-12 mb-4" viewBox="0 0 16 16">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <p className="mb-4 text-center text-sm font-medium text-gray-600">
                  Unlock your potential with our mock tests!
                </p>
                <Link to={`/Mock${index + 1}/`}>
                  <button
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-400 ease-in-out shadow-inner"
                    onClick={() => handleTestNowClick(year)}
                  >
                    Test Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Test Sets Cards */}
      <div className="flex-grow flex justify-center items-center bg-gray-800 p-4 dark:bg-gray-100 mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Mock Test Card 1 */}
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2080 Mock Test Set Sample</h2>
              <p className="text-gray-600 mb-6">
                This mock test set is designed to help students prepare for the entrance exam of Far Western University's Faculty of Engineering. It includes a comprehensive set of questions that cover all the topics that are typically tested in the exam.
              </p>
              <Link to={`/Mock9/`}>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-400 ease-in-out shadow-inner"
                  onClick={() => handleTestNowClick()}
                >
                  Give Test Now
                </button>
              </Link>
            </div>
          </div>

          {/* Mock Test Card 2 */}
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2079 Mock Test Set Sample</h2>
              <p className="text-gray-600 mb-6">
                This mock test set is designed to help students prepare for the entrance exam of Far Western University's Faculty of Engineering. It includes a comprehensive set of questions that cover all the topics that are typically tested in the exam.
              </p>
              <Link to={`/Mock8/`}>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-400 ease-in-out shadow-inner"
                  onClick={() => handleTestNowClick()}
                >
                  Give Test Now
                </button>
              </Link>
            </div>
          </div>

          {/* Mock Test Card 3 */}
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2078 Mock Test Set Sample</h2>
              <p className="text-gray-600 mb-6">
                This mock test set is designed to help students prepare for the entrance exam of Far Western University's Faculty of Engineering. It includes a comprehensive set of questions that cover all the topics that are typically tested in the exam.
              </p>
              <Link to={`/Mock7/`}>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-400 ease-in-out shadow-inner"
                  onClick={() => handleTestNowClick()}
                  style={{ transition: 'all 1s' }}
                >
                  Give Test Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Mock;
