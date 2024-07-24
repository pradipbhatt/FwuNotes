import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../../public/fwu.png'; // Adjust import path
import Navbar from '../Navbar';
import Tilt from 'react-parallax-tilt'; // Adjust import path for tilt effect
import imgTree from '../../assets/bg.jpg'; // Adjusted import path for background image

const years = [2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081];

const Mock = () => {
  const [currentYear, setCurrentYear] = useState(null);
  const [showNotice, setShowNotice] = useState(true);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600,
      easing: 'ease-in-sine',
      once: true,
    });

    // Ensure notice is shown on page refresh
    sessionStorage.setItem('noticeShown', 'true');
    playNotificationSound();
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleTestNowClick = (year) => {
    setCurrentYear(year);
    sessionStorage.setItem('currentYear', year.toString());
    navigate(`/Mock${year - 2070}`);
  };

  const handleDismissNotice = () => {
    setShowNotice(false);
    sessionStorage.setItem('noticeDismissed', 'true');
  };

  return (
    <div className="relative">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `url(${imgTree})`,
          backgroundSize: 'cover',
          filter: 'blur(8px)',
        }}
      ></div>

      {/* Transparent Overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>

      <div className="relative z-10">
        <Navbar />

        {showNotice && (
          <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 z-50 shadow-lg flex justify-between items-center rounded-b-lg animate__animated animate__fadeInDown">
            <div className="font-bold">
              <p className="text-lg">
                After completing the test, please fill out the form with your real name.
              </p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleDismissNotice}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="container mx-auto text-center mt-20 p-4">
          <div className="header mb-4" data-aos="fade-right">
            <img src={logo} alt="University Logo" className="mx-auto w-32 h-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Far Western University</h1>
            <h2 className="text-xl text-white mb-2">Faculty of Engineering</h2>
            <h3 className="text-lg text-white mb-4">Mahendranagar, Kanchanpur, Nepal</h3>
            <h4 className="text-lg text-white">BE Entrance Examination</h4>
          </div>
        </div>

        {/* Admission Guidelines Card */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 mb-8 relative z-10">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admission Guidelines</h2>
            <p className="text-gray-700 mb-6">
              The admission guidelines for Far Western University's Faculty of Engineering provide a comprehensive overview of the admission process, including eligibility criteria, application procedures, and other important details.
            </p>
            <Link to={`/AdmissionGuidelines/`}>
              <button
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out shadow-lg"
                onClick={() => handleTestNowClick()}
              >
                View Guidelines
              </button>
            </Link>
          </div>
        </div>

        {/* Entrance Papers Cards */}
        <div className="flex-grow flex justify-center items-center mt-8 mb-8 mx-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {years.map((year, index) => (
              <div
                key={year}
                className="max-w-sm mx-auto bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-8 relative"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`} // Adjust delay timing
              >
                <Tilt
                  className="parallax-effect-img"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1500}
                  transitionSpeed={100}
                  scale={1.1}
                  gyroscope={true}
                >
                  <div className="relative z-10 p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">Entrance Paper of {year}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-12 w-12 mb-4 text-gray-700" viewBox="0 0 16 16">
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.5A2.5 2.5 0 0 1 9.5 10h4.5A2.5 2.5 0 0 1 16 12.5v.793c.026.009.051.02.076.032L16 13v-7h1a1.5 1.5 0 0 0 1.5-1.5V4.5A1.5 1.5 0 0 0 17 3H2.5zM1 7.5V4.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 17 4.5v3a2.5 2.5 0 0 1-2.5 2.5H2.5A2.5 2.5 0 0 1 1 7.5zm6 2.622a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v2.378a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-2.378z"/>
                    </svg>
                    <button
                      className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out shadow-lg"
                      onClick={() => handleTestNowClick(year)}
                    >
                      Start Test
                    </button>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>

        <audio ref={audioRef} src="../../public/simple-notification-152054.mp3" preload="auto" />
      </div>
    </div>
  );
};

export default Mock;
