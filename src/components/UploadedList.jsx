import React, { useState } from "react";
import axios from "axios";
import PdfComp from "./PdfComp";

const UploadedList = ({ allImage, showPdf, getPdf, hideDeleteButton }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://soe-notes-pdf-backend.onrender.com/${id}`);
      getPdf(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="max-w-full mx-auto p-1 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
      {allImage &&
        allImage.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-xl cursor-pointer relative flex flex-col"
            style={{ aspectRatio: "1 / 1", width: "370px" }} // Smaller cards
          >
            <img
              src={item.image}
              alt={item.bookTitle}
              className="w-full h-2/3 object-cover"
              onClick={() => handlePdfClick(item.pdf)}
            />
            <div className="p-2 flex-grow">
              <h2 className="text-sm font-bold mb-2 text-orange-900">{item.bookTitle}</h2>
              <p className="text-xs text-orange-900">By: {item.createdBy}</p>
              <p className="text-xs text-orange-900">
                {new Date(item.createdTime).toLocaleString()}
              </p>
            </div>
            <div className="p-2 flex justify-between">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md"
                onClick={() => handlePdfClick(item.pdf)}
              >
                Read Now
              </button>
              {!hideDeleteButton && (
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the PDF view
                    handleDelete(item._id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      {selectedPdf && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 overflow-y-auto pdf-container">
          <div className="w-full sm:w-3/4 lg:w-full h-full bg-gray-100 rounded-lg shadow-lg overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Inline styles for hiding scrollbar
          >
            <div className="flex justify-end p-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleClosePdf}
              >
                Close PDF
              </button>
            </div>
            <PdfComp pdfFile={`https://soe-notes-pdf-backend.onrender.com/files/${selectedPdf}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedList;
