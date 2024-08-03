import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../../public/fwu.png'; // Adjust import path
import Navbar from '../Navbar';
import Tilt from 'react-parallax-tilt'; // Adjust import path for tilt effect
import imgTree from '../../../public/fwu.jpeg'; // Adjusted import path for background image
import Footer from '../Footer';

const years = [
  { year: 2071, slogan: "Your gateway to success! 🚀" },
  { year: 2072, slogan: "The future starts here! 🌟" },
  { year: 2073, slogan: "Achieve your dreams with us! 🎯" },
  { year: 2074, slogan: "Innovation and excellence await! ✨" },
  { year: 2075, slogan: "Excel in your path to success! 🏆" },
  { year: 2076, slogan: "Unlock your potential! 🔓" },
  { year: 2077, slogan: "Shape your future with knowledge! 📚" },
  { year: 2078, slogan: "Lead the way to success! 🌟" },
  { year: 2079, slogan: "Your journey to greatness begins here! 🛤️" },
  { year: 2080, slogan: "Set your sights on success! 🎓" }
];

const Mock = () => {
  const [currentYear, setCurrentYear] = useState(null);
  const [showNotice, setShowNotice] = useState(true);
  const [musicUrl, setMusicUrl] = useState(''); // State for music URL
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

    // Set the music URL dynamically (for example, based on some condition or API)
    setMusicUrl('public/simple-notification-152054.mp3'); // Replace with actual URL

    // Request notification permission and set reminders
    requestNotificationPermission();
    scheduleDailyNotifications();
  }, []);

  useEffect(() => {
    // Play music if URL is set
    if (audioRef.current && musicUrl) {
      audioRef.current.play();
    }
  }, [musicUrl]);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleTestNowClick = (year) => {
    setCurrentYear(year);
    sessionStorage.setItem('currentYear', year.toString());
    navigate(`/Mock${year - 2071}`);
  };

  const handleDismissNotice = () => {
    setShowNotice(false);
    sessionStorage.setItem('noticeDismissed', 'true');
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      });
    }
  };

  const scheduleDailyNotifications = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const now = new Date();
      const morningTime = new Date();
      morningTime.setHours(7, 0, 0); // Schedule for 8:00 AM
      const eveningTime = new Date();
      eveningTime.setHours(7, 52, 0); // Schedule for 12:52 AM
  
      const notify = (title, body) => {
        new Notification(title, {
          body: body,
          icon: logo // Add your icon here
        });
      };
  
      const scheduleNotification = (time, title, body) => {
        const delay = time.getTime() - now.getTime();
        if (delay > 0) {
          setTimeout(() => {
            notify(title, body);
            // Schedule the next notification
            scheduleNotification(new Date(time.getTime() + 24 * 60 * 60 * 1000), title, body);
          }, delay);
        }
      };
  
      scheduleNotification(morningTime, 'Practice Reminder', 'Time to practice for the entrance exam!');
      scheduleNotification(eveningTime, 'Evening Reminder', 'Don’t forget to review your notes before bed!');
    }
  };
  

  return (
    <>
    <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Background Image with Subtle Blur Effect */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `url(${imgTree})`,
          backgroundSize: '100%',
          filter: 'blur(4px)',
        }}
      ></div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-800 dark:bg-gray-900 opacity-40"></div>

      <div className="relative z-10">
        <Navbar />

        {showNotice && (
          <div className="fixed top-0 left-0 right-0 bg-gray-800 dark:bg-gray-700 text-white p-4 z-50 shadow-lg flex justify-between items-center rounded-b-lg">
            <div className="font-bold">
              <p className="text-lg">
                After completing the test, please fill out the form with your real name.
              </p>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleDismissNotice}
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="container mx-auto text-center mt-20 p-4 text-gray-100">
          <div className="header mb-8" data-aos="fade-right">
            <img src={logo} alt="University Logo" className="mx-auto w-24 h-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Far Western University</h1>
            <h2 className="text-xl mb-2">Faculty of Engineering</h2>
            <h3 className="text-lg mb-4">Mahendranagar, Kanchanpur, Nepal</h3>
            <h4 className="text-lg">BE Entrance Examination</h4>
          </div>
        </div>

        {/* Admission Guidelines Card */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mt-8 mb-8 relative z-10">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📚 Admission Guidelines</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The admission guidelines for Far Western University's Faculty of Engineering provide a comprehensive overview of the admission process, including eligibility criteria, application procedures, and other important details.
            </p>
            <Link to={`/AdmissionGuidelines/`}>
              <button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out shadow-lg"
                onClick={() => handleTestNowClick()}
              >
                View Guidelines
              </button>
            </Link>
          </div>
        </div>

        {/* Entrance Papers Cards */}
        <div className="flex-grow flex justify-center items-center mt-8 mb-8 mx-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {years.map((item, index) => (
              <div
                key={item.year}
                className="max-w-sm mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-8 relative"
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
                    <h2 className="text-xl font-bold mb-2">📝 Entrance Paper of {item.year}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      <span className="font-medium"></span> {item.slogan}
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-12 w-12 mb-4 text-gray-700 dark:text-gray-300" viewBox="0 0 16 16">
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.5A2.5 2.5 0 0 1 9.5 10h4.5A2.5 2.5 0 0 1 16 12.5v.793c.026.009.051.02.076.032L16 13v-7h1a1.5 1.5 0 0 0 1.5-1.5V4.5A1.5 1.5 0 0 0 17 3H2.5zM1 7.5V4.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 17 4.5v3a2.5 2.5 0 0 1-2.5 2.5H2.5A2.5 2.5 0 0 1 1 7.5zm6 2.622a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v2.378a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-2.378z"/>
                    </svg>
                    <button
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out shadow-lg"
                      onClick={() => handleTestNowClick(item.year)}
                    >
                      Start Test
                    </button>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {musicUrl && (
        <audio ref={audioRef} src={musicUrl} preload="auto" />
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Mock;
