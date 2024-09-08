import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fwu from "../../../public/fwu.jpeg";
import studentImage from "../../../public/sis.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { motion } from 'framer-motion';


gsap.registerPlugin(ScrollTrigger);

function Banner() {
  const [typewriterVisible, setTypewriterVisible] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animations for the parallax effect
    gsap.fromTo(
      ".banner-image",
      { y: "0%" },
      {
        y: "40%", duration: 10, ease: "none", scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      ".student-image",
      { y: "0%" },
      {
        y: "-10%", duration: 20, ease: "none", scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      ".banner-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top center",
          toggleActions: "play none none none"
        }
      }
    );

    // Show typewriter effect after a delay (e.g., 1 second)
    const timer = setTimeout(() => {
      setTypewriterVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      localStorage.setItem("userEmail", email);
      navigate('/mock');
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const renderTextWithHoverEffect = (text) => {
    return (
      <span className="flex flex-nowrap justify-center">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-2">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={`inline-block transition-transform duration-300 transform text-xs sm:text-sm md:text-base lg:text-xl ${charIndex === 0 ? "text-orange-500 font-bold" : "text-[#f59e0b]"} hover:scale-125 hover:text-[#fdba74]`}
              >
                {char}
              </span>
            ))}
            {wordIndex < text.split(" ").length - 1 && (
              <span className="inline-block mr-2"> </span> // Adds space between words
            )}
          </span>
        ))}
      </span>
    );
  };
  

  return (
    <div
      // ref={bannerRef}
      className="banner-container max-w-screen-2xl container mx-auto md:px-20 px-4 relative w-full h-screen md:h-3/4 lg:h-screen overflow-hidden bg-gray-100 dark:bg-gray-900  bg-opacity-100 dark:bg-opacity-80"
    >
      {/* Desktop and Tablet view */}
      <div className="hidden md:block relative h-screen ">
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
  <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/Ivj-XiyUB-o?si=hwZcDlpM5j9EVOa9&autoplay=1&mute=1&loop=1&playlist=Ivj-XiyUB-o"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ position: 'absolute', top: '80px', left: '1px', right: '1px', bottom: '0', border: 'none' }}
      ></iframe>
</div>


        <img
        
          src={studentImage}
          alt="Student"
          className="student-image absolute right-0 top-1/2 w-2/2 z-10 opacity-85"
        />
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-70 bg-opacity-10 flex flex-col justify-center items-center text-center z-20">
          <div className="banner-content  p-8 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight">
              {renderTextWithHoverEffect("Welcome to SoeNotes")}
              <span className="relative block text-2xl md:text-3xl font-cursive font-bold text-blue-700 mt-4 cursor-pointer group">
                <span className="absolute inset-0 w-full h-full  opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                <motion.span
                className="relative text-yellow-500 font-bold text-4xl"
                whileHover={{
                  scale: 1.05,
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.8)' // Golden glowing text effect
                }}
                style={{ fontFamily: 'Times New Roman, serif' }} // Applying the chosen font
              >
                Far Western University <span className="text-blue-700 font-extrabold">School of Engineering</span> <span className="text-orange-500 font-bold text-xl">Online Entrance Test Portal!</span>
              </motion.span>
              </span>
            </h1>
            <div className="text-center mt-4">
              {typewriterVisible && (
               <div className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
               <Typewriter
                 options={{
                   strings: [
                     "Access all the resources you need to excel in your studies.",
                     "Find notes, tutorials, books, solutions, and guidance from seniors.",
                     "Prepare for Mock Tests and more.",
                   ],
                   autoStart: true,
                   loop: true,
                   delay: 50, // Adjust delay for typing effect speed
                 }}
               />
             </div>
             
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 w-full max-w-md mx-auto">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 flex items-center">
                  <label className="flex items-center gap-2 bg-white bg-opacity-30 p-2 rounded-md w-full border border-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-5 h-5 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow p-2 bg-transparent border-none text-white placeholder-white text-sm"
                      placeholder="Email"
                    />
                  </label>
                </div>
                <div className="flex-shrink-0">
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out
             shadow-lg shadow-blue-500 hover:shadow-2xl dark:shadow-blue-600 dark:hover:shadow-2xl hover:shadow-blue-600 dark:hover:shadow-blue-700
             text-lg font-semibold">
                    Get Started
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden relative h-screen">
        <img
          src={fwu}
          className="banner-image absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          // src={studentImage}
          className="student-image absolute right-0 top-1 w-full h-1/2 z-100 opacity-100"
        />
       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center z-20 px-4">
  <div className="banner-content px-8 text-white text-center">
    
{/* Smallest font */}
<h5 className="text-xs sm:text-sm md:text-md lg:text-lg mb-2 leading-tight">
  {renderTextWithHoverEffect("Welcome to SoeNotes")}
</h5>

    
    {/* Larger font */}
    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
      Far Western University
    </h4>
    
    {/* Largest font */}
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
      School of Engineering
    </h3>
    
    {/* Medium size */}
    <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-400">
      Online Entrance Test Portal!
    </h2>
    
    {typewriterVisible && (
      <Typewriter
        options={{
          strings: [
            "Access all the resources you need to excel in your studies.",
            "Find notes, tutorials, books, solutions, and guidance from seniors.",
            "Prepare for Mock Tests and more.",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    )}
    
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 w-full max-w-sm mx-auto">
      <div className="flex flex-col md:flex-row md:space-x-4">
        
        <div className="flex-1 md:mr-2">
          <label className="input input-bordered flex items-center gap-2 bg-white bg-opacity-30 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="grow p-2 bg-transparent border-none text-white placeholder-white text-sm"
              placeholder="Email"
            />
          </label>
        </div>
        
        <div>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out
              shadow-lg shadow-blue-500 hover:shadow-2xl dark:shadow-blue-600 dark:hover:shadow-2xl hover:shadow-blue-600 dark:hover:shadow-blue-700
              text-lg font-semibold"
          >
            Get Started
          </button>
        </div>
        
      </div>
    </form>
    
  </div>
</div>

      </div>

      <ToastContainer />
    </div>
  );
}

export default Banner;
