import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import UploadedList from "./UploadedList";
import PdfComp from "./PdfComp";
import Navbar from "../Navbar";

const PdfUploadPage = () => {
  const [allImage, setAllImage] = useState([]);

  const getPdf = async () => {
    try {
      const res = await axios.get("https://soe-notes-pdf-backend.onrender.com/get-files");
      setAllImage(res.data.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    getPdf();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-orange-900">Upload PDFs</h1>
        <UploadForm getPdf={getPdf} />
        <h2 className="text-xl font-bold mt-8 mb-4 text-orange-900">Uploaded PDFs</h2>
        <UploadedList allImage={allImage} getPdf={getPdf} />
      </div>
    </div>
  );
};

export default PdfUploadPage;
