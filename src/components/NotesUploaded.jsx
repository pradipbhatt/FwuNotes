import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadedList from "./UploadedList";
import PdfComp from "./PdfComp";
import Navbar from "./Navbar";

const NotesUploaded = () => {
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("https://soe-notes-pdf-backend.onrender.com/get-files");
      setAllImage(result.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
      setLoading(false);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`https://soe-notes-pdf-backend.onrender.com/files/${pdf}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <UploadedList allImage={allImage} showPdf={showPdf} getPdf={getPdf} hideDeleteButton={true} />
        )}
        {pdfFile && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center w-full h-full">
            <div className="relative w-full h-full flex flex-col items-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md absolute top-4 right-4 z-10"
                onClick={() => setPdfFile(null)}
              >
                Close PDF
              </button>
              <div className="w-full h-full overflow-auto flex justify-center items-center p-4">
                <PdfComp pdfFile={pdfFile} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotesUploaded;
