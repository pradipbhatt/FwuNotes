import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import logo from '../../../public/fwu.png'; // Adjust the import path as necessary
import Navbar from '../Navbar';
import Tilt from 'react-parallax-tilt'; // Correct import for react-parallax-tilt
import imgTree from '../../assets/bg.jpg'; // Adjusted import for your image

const years = [2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081];

const Mock = () => {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600,
      easing: 'ease-in-sine',
      once: true,
    });

    // Retrieve current year from localStorage on component mount
    const storedYear = localStorage.getItem('currentYear');
    if (storedYear && years.includes(parseInt(storedYear))) {
      setCurrentYear(parseInt(storedYear));
    }

    // AOS initialization for scroll events
    window.addEventListener('scroll', AOS.refresh);

    return () => {
      window.removeEventListener('scroll', AOS.refresh);
    };
  }, []);

  const handleTestNowClick = (year) => {
    setCurrentYear(year);
    // Store current year in localStorage
    localStorage.setItem('currentYear', year.toString());
  };

  return (
    <div className="relative">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `url(${imgTree})`,
          backgroundSize: 'cover',
          filter: 'blur(8px)', // Adjust blur intensity as needed
        }}
      ></div>

      {/* Transparent Overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto text-center mt-20 p-4">
          <div className="header mb-4" data-aos="fade-right">
            <img src={logo} alt="University Logo" className="mx-auto w-32 h-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">FAR WESTERN UNIVERSITY</h1>
            <h2 className="text-xl text-white">Faculty of Engineering</h2>
            <h3 className="text-lg text-white">Mahendranagar, Kanchanpur, Nepal</h3>
            <h3 className="text-lg text-white">BE Entrance Examination</h3>
          </div>
        </div>

        {/* Admission Guidelines Card */}
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 mb-8 relative z-10">
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
        <div className="flex-grow flex justify-center items-center mt-8 mb-8 
         m-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20" >
            {years.map((year, index) => (
              <Tilt
                key={year}
                className="parallax-effect-img"
                tiltMaxAngleX={30}
                tiltMaxAngleY={30}
                perspective={1400}
                transitionSpeed={2500}
                scale={1.1}
                gyroscope={true}
              >
                <div
                  className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8 relative"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 300}`} // Adjust delay timing (in milliseconds)
                >
                  <div className="relative z-10 p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">Entrance paper of {year}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-12 w-12 mb-4" viewBox="0 0 16 16">
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <p className="mb-4 text-center text-sm font-medium text-gray-600">
                      Unlock your potential with our entrance papers!
                    </p>
                    <Link to={`/Mock${index}/`}>
                      <button
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-400 ease-in-out shadow-inner"
                        onClick={() => handleTestNowClick(year)}
                      >
                       Take a test Now 
                      </button>
                    </Link>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>

        {/* Uncomment Footer if implemented */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Mock;
