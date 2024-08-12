// src/components/FacebookComments.jsx
import React, { useEffect } from 'react';

const FacebookComments = ({ pageUrl }) => {
  useEffect(() => {
    // Load the Facebook SDK if not already loaded
    if (!window.FB) {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    } else {
      window.FB.XFBML.parse(); // Re-parse the comments plugin
    }
  }, []);

  return (
    <div className="w-full my-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold text-gray-100 dark:text-gray-900 mb-4">
        💬 Discussion Forum
      </h2>
      <div 
        className="fb-comments bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        data-href={pageUrl} // URL where comments will be linked
        data-numposts="5" // Number of comments to show
        data-width="100%" // Full width
      ></div>
    </div>
  );
};

export default FacebookComments;
