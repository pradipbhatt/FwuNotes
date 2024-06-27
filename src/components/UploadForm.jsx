import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ getPdf }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const submitImage = async (e) => {
    e.preventDefault();
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
    <form className="formStyle" onSubmit={submitImage}>
      <h4>Upload PDF</h4>
      <input
        type="text"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadForm;
