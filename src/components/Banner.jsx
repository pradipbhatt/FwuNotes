import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";

function Banner() {
  const [typewriterVisible, setTypewriterVisible] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 2000,
      easing: "ease-in-sine",
      once: true,
    });

    // Show typewriter effect after a delay (e.g., 1 second)
    const timer = setTimeout(() => {
      setTypewriterVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 relative w-full h-screen md:h-3/4 lg:h-screen overflow-hidden">
      {/* Desktop and Tablet view (image covering screen) */}
      <div className="hidden md:block relative h-screen">
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipPzfh964Fkk34H5Zb0uRbCviPMnWVutO4wO1CAd=s0"
          alt="Desktop background"
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center z-10">
          <div className="max-w-screen-lg mx-auto p-8 text-white" data-aos="fade-up">
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
            <form className="mt-8 space-y-4 w-full max-w-md mx-auto">
              <div className="flex flex-col md:flex-row md:space-x-4" data-aos="fade-right">
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
                      className="grow p-2 bg-transparent border-none text-white placeholder-white text-sm"
                      placeholder="Email"
                    />
                  </label>
                </div>
                <div>
                  <button className="bg-orange-500 text-white px-4 py-2 w-full rounded-md hover:bg-orange-700 transition duration-300 mt-4 md:mt-0" data-aos="fade-left">
                    Get Started
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile view (image covering screen) */}
      <div className="md:hidden relative h-screen">
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipPzfh964Fkk34H5Zb0uRbCviPMnWVutO4wO1CAd=s0"
          alt="Mobile background"
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center z-10">
          <div className="max-w-screen-lg mx-auto p-8 text-white" data-aos="fade-up">
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
            <form className="mt-8 space-y-4 w-full max-w-md mx-auto">
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
    </div>
  );
}

export default Banner;
