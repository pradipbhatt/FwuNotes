import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../../public/fwu.png'; // Adjust import path
import Navbar from '../Navbar';
import Footer from '../home/Footer';
import Chat from '../AI/Chat';

const years = [
  { year: 2081, slogan: "The future starts here! 🌟" },
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
    <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div
    className="relative py-20" // Added margin-top class for 50px top margin
    style={{
      background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(100, 200, 255, 0.5) 50%, rgba(255, 100, 200, 0.5))', // Softer neon gradient // Light white to neon gradient
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundBlendMode: 'overlay', // Ensure proper blending
    }}
  >


      <div className="relative z-10"> 

          {/* Mock Papers Cards 2081 setA */}
        <div className="flex-grow flex justify-center items-center mt-8 mb-8 mx-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {years.map((item, index) => (
              <div
                key={item.year}
                className="max-w-sm mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-8 relative"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`} // Adjust delay timing
              >
               
                  <div className="relative z-10 p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">📝 Mock test 2081</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      <span className="font-medium"></span> Test the mock 2081 set A
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-12 w-12 mb-4 text-gray-700 dark:text-gray-300" viewBox="0 0 16 16">
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.5A2.5 2.5 0 0 1 9.5 10h4.5A2.5 2.5 0 0 1 16 12.5v.793c.026.009.051.02.076.032L16 13v-7h1a1.5 1.5 0 0 0 1.5-1.5V4.5A1.5 1.5 0 0 0 17 3H2.5zM1 7.5V4.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 17 4.5v3a2.5 2.5 0 0 1-2.5 2.5H2.5A2.5 2.5 0 0 1 1 7.5zm6 2.622a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v2.378a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-2.378z"/>
                    </svg>
                    <button
  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out
             shadow-lg shadow-blue-500 hover:shadow-2xl dark:shadow-blue-600 dark:hover:shadow-2xl hover:shadow-blue-600 dark:hover:shadow-blue-700
             text-lg font-semibold"
  onClick={() => handleTestNowClick(item.year)}
>
  Start Test
</button>
                  </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Mock;
