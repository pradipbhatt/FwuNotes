import React, { useState, useEffect } from "react";
import notice from '../../../public/notice.jpg'; // Adjust the path to your image

const PopupNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Retrieve last shown timestamp from localStorage
    const lastShownTimestamp = localStorage.getItem("popupLastShown");
    const currentTime = new Date().getTime();
    
    // If no timestamp is found, show the popup
    if (!lastShownTimestamp) {
      setIsVisible(true);
    } else {
      const elapsedTime = currentTime - parseInt(lastShownTimestamp, 10);
      const twelveHoursInMs = 12 * 60 * 60 * 1000;

      // Show popup if 12 hours have passed
      if (elapsedTime > twelveHoursInMs) {
        setIsVisible(true);
      }
    }
  }, []);

  const closePopup = () => {
    // Hide popup and update timestamp in localStorage
    setIsVisible(false);
    localStorage.setItem("popupLastShown", new Date().getTime().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl relative max-w-md mx-auto">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          Important Notice
        </h2>
        <img
          src={notice}
          alt="Notice"
          className="w-full h-auto rounded-lg shadow-md mb-4"
        />
        <p className="text-gray-800 dark:text-gray-300">
          This is an important notice for all users. Please read the instructions carefully.
        </p>
      </div>
    </div>
  );
};

export default PopupNotice;
