import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ getPdf }) => {
  // Define state variables for title and file
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title); // Append title to form data
    formData.append("file", file); // Append file to form data

    try {
      const result = await axios.post(
        "https://soe-notes-pdf-backend.onrender.com/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        getPdf(); // Call the getPdf function to refresh the list of PDFs
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Format: SubjectName_BatchName_AuthorName"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 p-3 w-full border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 p-3 w-full border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
