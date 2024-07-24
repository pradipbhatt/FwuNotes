import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fwu from "../../public/fwu.jpeg";
import studentImage from "../../public/university-student.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

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
      { y: "20%", duration: 10, ease: "none", scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }}
    );

    gsap.fromTo(
      ".student-image",
      { y: "0%" },
      { y: "-10%", duration: 20, ease: "none", scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }}
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
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block transition-transform duration-300 transform hover:scale-125 hover:text-orange-500"
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      ref={bannerRef}
      className="banner-container max-w-screen-2xl container mx-auto md:px-20 px-4 relative w-full h-screen md:h-3/4 lg:h-screen overflow-hidden"
    >
      {/* Desktop and Tablet view */}
      <div className="hidden md:block relative h-screen">
        <img
          src={fwu}
          alt="Desktop background"
          className="banner-image absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          src={studentImage}
          alt="Student"
          className="student-image absolute right-0 top-1/2 w-1/4 z-10 opacity-100 "
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center z-20">
          <div className="banner-content max-w-screen-lg mx-auto p-8 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight">
              {renderTextWithHoverEffect("Welcome to SoeNotes")}
              <span className="text-orange-500 block text-sm md:text-base font-cursive mt-2">
                Far Western University School of Engineering Notes & Online Entrance Test Portal!
              </span>
            </h1>
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
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 w-full max-w-md mx-auto">
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
                  <button className="bg-orange-500 text-white px-4 py-2 w-full rounded-md hover:bg-orange-700 transition duration-300 mt-4 md:mt-0">
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
          src={studentImage}
          className="student-image absolute right-0 top-1/2 w-full h-1/2 z-100 opacity-100"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center z-20">
          <div className="banner-content max-w-screen-lg mx-auto p-8 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight">
              {renderTextWithHoverEffect("Welcome to SoeNotes")}
              <span className="text-orange-500 block text-sm md:text-base font-cursive mt-2">
                Far Western University School of Engineering Notes & Mock Test Portal!
              </span>
            </h1>
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
                  <button className="bg-orange-500 text-white px-4 py-2 w-full rounded-md hover:bg-orange-700 transition duration-300 mt-4 md:mt-0">
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
