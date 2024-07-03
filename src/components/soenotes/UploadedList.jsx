import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfComp from "./PdfComp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadedList = ({ hideDeleteButton }) => {
  const [pdfList, setPdfList] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPdfId, setSelectedPdfId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://soe-notes-pdf-backend.onrender.com/get-files");
      const sortedPdfList = response.data.data.sort((a, b) => a.semester - b.semester);
      setPdfList(sortedPdfList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePdfClick = (pdf, id) => {
    setSelectedPdf(pdf);
    setSelectedPdfId(id);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
    setSelectedPdfId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://soe-notes-pdf-backend.onrender.com/delete-file/${id}`);
      setPdfList(prevPdfList => prevPdfList.filter(item => item._id !== id));
      handleClosePdf();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleUpload = async (formData) => {
    try {
      const response = await axios.post("https://soe-notes-pdf-backend.onrender.com/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchData();
      toast.success("PDF uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSelectedPdf(null);
      setSelectedPdfId(null);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to group pdfList by semester
  const groupPdfBySemester = () => {
    let groupedPdf = {};
    pdfList.forEach(item => {
      if (!groupedPdf[item.semester]) {
        groupedPdf[item.semester] = [];
      }
      groupedPdf[item.semester].push(item);
    });
    return groupedPdf;
  };

  const groupedPdf = groupPdfBySemester();

  return (
    <div className="max-w-full mx-auto p-1 mt-8">
      <ToastContainer />
      {Object.keys(groupedPdf).map((semester, index) => (
        <div key={index} className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-orange-900">
            Semester {semester}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {groupedPdf[semester].map(item => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-2xl cursor-pointer relative flex flex-col"
                style={{
                  aspectRatio: "1 / 1",
                  width: "90%",
                  marginBottom: "1rem",
                  height: "260px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.bookTitle}
                  className="w-full h-20 object-cover"
                  onClick={() => handlePdfClick(item.pdf, item._id)}
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-sm font-bold mb-1 text-orange-900">
                      {item.bookTitle}
                    </h2>
                    <p className="text-xs text-orange-900">By: {item.createdBy}</p>
                    <p className="text-xs text-orange-900">
                      {new Date(item.createdTime).toLocaleString()}
                    </p>
                    <p className="text-xs text-orange-900">Semester: {item.semester}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                      onClick={() => handlePdfClick(item.pdf, item._id)}
                    >
                      Read
                    </button>
                    {!hideDeleteButton && (
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedPdf && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 overflow-y-auto pdf-container">
          <div
            className="w-full sm:w-3/4 lg:w-full h-full bg-gray-100 rounded-lg shadow-lg overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex justify-end p-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleClosePdf}
              >
                Close PDF
              </button>
            </div>
            <PdfComp pdfFile={`${selectedPdf}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedList;
