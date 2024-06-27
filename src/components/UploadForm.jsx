import React, { useState } from "react";

const UploadForm = ({ getPdf }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://soe-notes-pdf-backend.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getPdf();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 p-2 w-full border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
