import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../../public/fwu.png'; // Adjust import path
import Navbar from '../Navbar';
import Tilt from 'react-parallax-tilt'; // Adjust import path for tilt effect
import imgTree from '../../../public/fwu.jpeg'; // Adjusted import path for background image
import Footer from '../home/Footer';
import Chat from '../AI/Chat';
import Mocktest from "./Mocktest";

const years = [
  { year: 2071, slogan: "Your gateway to success" },
  { year: 2072, slogan: "The future starts here" },
  { year: 2073, slogan: "Achieve your dreams" },
  { year: 2074, slogan: "Innovation and excellence" },
  { year: 2075, slogan: "Excel in your path" },
  { year: 2076, slogan: "Unlock your potential" },
  { year: 2077, slogan: "Shape your future" },
  { year: 2078, slogan: "Lead the way to success" },
  { year: 2079, slogan: "Your journey to greatness" },
  { year: 2080, slogan: "Set your sights on success" }
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
    setMusicUrl('/simple-notification-152054.mp3'); // Replace with actual URL

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-24">
          {/* Header */}
          <div className="text-center mb-10" data-aos="fade-down">
            <img src={logo} alt="FWU Logo" className="mx-auto w-20 h-auto mb-4 drop-shadow" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">Far Western University</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Faculty of Engineering · Mahendranagar, Kanchanpur</p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide">
              BE Entrance Examination
            </span>
          </div>

          {/* Admission Guidelines */}
          <div className="mb-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm" data-aos="fade-up">
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Admission Guidelines</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Eligibility criteria, application procedures, and important details for FWU Faculty of Engineering admissions.
              </p>
            </div>
            <Link
              to="/AdmissionGuidelines"
              className="shrink-0 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              View Guidelines
            </Link>
          </div>

          {/* Year cards */}
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Select Entrance Paper</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {years.map((item, index) => (
              <button
                key={item.year}
                data-aos="fade-up"
                data-aos-delay={`${index * 50}`}
                onClick={() => handleTestNowClick(item.year)}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100">{item.year}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{item.slogan.split("!")[0]}</p>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">Start Test →</span>
              </button>
            ))}
          </div>
        </div>

        <Mocktest />
      </div>
      <Chat />
      <Footer />
    </>
  );
};

export default Mock;
