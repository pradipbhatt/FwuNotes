import React, { useEffect, useRef, useState, useCallback } from "react";
import Typewriter from "typewriter-effect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fwu from "../../../public/fwu.jpeg";
import studentImage from "../../../public/sis.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function Banner() {
  const [typewriterVisible, setTypewriterVisible] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".banner-image",
      { y: "0%" },
      { y: "40%", duration: 10, ease: "none", scrollTrigger: {
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
      { y: "-10%", duration: 20, ease: "none", scrollTrigger: {
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
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", scrollTrigger: {
          trigger: bannerRef.current,
          start: "top center",
          toggleActions: "play none none none"
        }
      }
    );

    const timer = setTimeout(() => {
      setTypewriterVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(email.trim())) {
      localStorage.setItem("userEmail", email.trim());
      navigate('/mock');
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const renderTextWithHoverEffect = useCallback((text) => (
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
          {wordIndex < text.split(" ").length - 1 && <span className="inline-block mr-2"> </span>}
        </span>
      ))}
    </span>
  ), []);

  return (
    <div ref={bannerRef} className="banner-container max-w-screen-2xl container mx-auto md:px-20 px-4 relative w-full h-screen md:h-3/4 lg:h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Desktop and Tablet view */}
      <div className="hidden md:block relative h-screen">
        {/* <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Ivj-XiyUB-o?si=hwZcDlpM5j9EVOa9&autoplay=1&mute=1&loop=1&playlist=Ivj-XiyUB-o"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', top: '80px', left: '1px', right: '1px', bottom: '0' }}
          ></iframe>
        </div> */}
       

       {/* video comment out and image set as the bg */}
        <img src={fwu} className="banner-image absolute inset-0 w-full h-full object-cover z-0" />
        <img src={studentImage} alt="Student" className="student-image absolute right-0 top-1/2 w-2/2 z-10 opacity-85" />
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-70 bg-opacity-10 flex flex-col justify-center items-center text-center z-20">
          <div className="banner-content p-8 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight">
              {renderTextWithHoverEffect("Welcome to SoeNotes")}
              <motion.span
                className="relative text-yellow-500 font-bold text-4xl"
                whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(255, 215, 0, 0.8)' }}
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                Far Western University <span className="text-blue-700 font-extrabold">School of Engineering</span> <span className="text-orange-500 font-bold text-xl">Online Entrance Test Portal!</span>
              </motion.span>
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
                      delay: 50,
                    }}
                  />
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 w-full max-w-md mx-auto">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 flex items-center">
                  <label className="flex items-center gap-2 bg-white bg-opacity-30 p-2 rounded-md w-full border border-transparent">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow p-2 bg-transparent border-none text-white placeholder-white text-sm"
                      placeholder="Email"
                    />
                  </label>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full">
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden relative h-screen">
        <img src={fwu} className="banner-image absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center z-20 px-4">
          <div className="banner-content px-8 text-white text-center">
            <h5 className="text-xs sm:text-sm md:text-md lg:text-lg mb-2 leading-tight">{renderTextWithHoverEffect("Welcome to SoeNotes")}</h5>
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Far Western University</h4>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">School of Engineering</h3>
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-400">Online Entrance Test Portal!</h2>
            {typewriterVisible && (
              <Typewriter
                options={{
                  strings: [
                    "Access all resources to excel in studies.",
                    "Get notes, books, and guidance.",
                    "Prepare for Mock Tests & more.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                }}
              />
            )}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 w-full max-w-xs mx-auto">
              <label className="flex items-center gap-2 bg-white bg-opacity-30 p-2 rounded-md w-full border border-transparent">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow p-2 bg-transparent border-none text-white placeholder-white text-sm"
                  placeholder="Email"
                />
              </label>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full">Get Started</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}

export default Banner;
