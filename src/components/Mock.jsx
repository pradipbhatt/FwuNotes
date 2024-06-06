import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from '@mui/material';
import logo from '../../public/logo1.png'; // Adjust the import path as necessary

const years = [2075,2076,2077, 2078, 2079, 2080];
// const years = [2077, 2078, 2079, 2080, 2081]; if you wamt to add more cards add by this.

const Mock = () => {
  const [currentYear, setCurrentYear] = useState(null);

  const handleTestNowClick = (year) => {
    setCurrentYear(year);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-8">
        <img src={logo} alt="Logo" className="sm:w-full md:w-1/2 md:h-32 md:w-1/2 md:h-30 mt-20" />
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
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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
          {years.map((year) => (
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
                <Link to={`/Mock${year - 2075}/`}>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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

      {/* Test Sets Cards */}
      <div className="flex-grow flex justify-center items-center mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2079 Mock Test Set A</h2>
              <p className="text-gray-600 mb-6">
                This mock test set is designed to help students prepare for the entrance exam of Far Western University's Faculty of Engineering. It includes a comprehensive set of questions that cover all the topics that are typically tested in the exam.
              </p>
              <Link to={`/Mock3/`}>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => handleTestNowClick()}
                >
                  Give Test Now
                </button>
              </Link>
            </div>
          </div>
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2079 Mock Test Set B</h2>
              <p className="text-gray-600 mb-6">
                This mock test set is designed to help students prepare for the entrance exam of Far Western University's Faculty of Engineering. It includes a comprehensive set of questions that cover all the topics that are typically tested in the exam.
              </p>
              <Link to={`/Mock6/`}>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => handleTestNowClick()}
                >
                  Give test now
                </button>
              </Link>
            </div>
          </div>
         

          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2080 Mock Test Set Sample</h2>
              <p className="text-gray-600 mb-6">
                This mock test set is designed to help students prepare for the entrance exam of Far Western University's Faculty of Engineering. It includes a comprehensive set of questions that cover all the topics that are typically tested in the exam.
              </p>
              <Link to={`/Mock7/`}>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => handleTestNowClick()}
                >
                  Give test now
                </button>
              </Link>
            </div>
          </div>
         
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Mock;