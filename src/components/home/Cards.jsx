import React from "react";
import { FaBook, FaTag, FaExternalLinkAlt } from "react-icons/fa";

function Cards({ item }) {
  const handleReadNowClick = () => {
    window.open(item.pdfUrl, "_blank");
  };

  return (
    <div className="mt-4 my-3 p-3 w-full">
      <div className="card w-full h-full bg-white dark:bg-slate-900 shadow-lg border rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300">
        
        {/* Image Section */}
        <figure className="h-48 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-xl">
          <img src={item.image} alt={item.name} className="h-full object-contain" />
        </figure>

        {/* Card Body */}
        <div className="card-body p-5">
          {/* Title & Category */}
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FaBook className="text-orange-500" /> {item.name}
          </h2>
          <div className="flex items-center gap-2 text-sm text-green-500 font-semibold">
            <FaTag className="text-green-500" /> {item.Category}
          </div>

          {/* Price & Read Now */}
          <div className="card-actions flex justify-between items-center mt-4">
            <div className="text-lg font-bold text-orange-600 flex items-center gap-2">
              <FaTag className="text-orange-500" /> ${item.Price}
            </div>
            <button
              onClick={handleReadNowClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
            >
              <span className="text-sm font-semibold">Read</span>
              <FaExternalLinkAlt className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
