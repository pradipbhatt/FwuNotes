import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ getPdf }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

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
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="file"
          accept="application/pdf"
          required
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
