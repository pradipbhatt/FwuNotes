import React, { useState } from "react";
import PdfComp from "./PdfComp";

const UploadedList = ({ allImage, showPdf }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="max-w-full mx-auto p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
      {allImage &&
        allImage.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-xl cursor-pointer relative flex flex-col"
            onClick={() => handlePdfClick(item.pdf)}
            style={{ aspectRatio: "1 / 1", width: "320px" }} // Smaller cards
          >
            <img
              src={`https://picsum.photos/seed/${item.id}/100/100`} // Random image based on item.id
              alt={item.title}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-2 flex-grow">
              <h2 className="text-sm font-bold mb-2">{item.title}</h2>
            </div>
            <div className="p-2 flex justify-center">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md"
                onClick={() => handlePdfClick(item.pdf)}
              >
                Read Now
              </button>
            </div>
          </div>
        ))}
      {selectedPdf && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 overflow-y-auto">
          <div className="w-full sm:w-3/4 lg:w-full h-full bg-gray-100 rounded-lg shadow-lg overflow-y-auto">
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
