import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDownload, AiOutlineClose } from 'react-icons/ai';

function DownloadButton() {
  const [showNotification, setShowNotification] = useState(false);

  const handleDownload = () => {
    const apkUrl = "public/base.apk"; // Path to your APK file in the public directory
    window.location.href = apkUrl;
    setShowNotification(true);
  };

  const closeModal = () => setShowNotification(false);

  useEffect(() => {
    let timer;
    if (showNotification) {
      // Automatically close the notification after 5 seconds
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // 5 seconds
    }

    // Clear the timer if the component unmounts or if the notification is manually closed
    return () => clearTimeout(timer);
  }, [showNotification]);

  return (
    <div className="relative">
      {/* Button to trigger download */}
      <button
        onClick={handleDownload}
        className="fixed bottom-20 left-6 bg-blue-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800 z-50"
        aria-label="Download APK"
      >
        <AiOutlineDownload className="text-2xl" />
        <span className="ml-2">APK</span>
      </button>

      {/* Notification Modal */}
      {showNotification && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full dark:bg-gray-900 dark:text-white relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 p-2 bg-gray-200 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Close notification"
            >
              <AiOutlineClose className="text-xl" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Download Started</h2>
            <p className="mb-4">The APK file is downloading. Once downloaded, open the file to install it.</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default DownloadButton;
