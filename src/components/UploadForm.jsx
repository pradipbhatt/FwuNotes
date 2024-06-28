import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ getPdf }) => {
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("bookTitle", bookTitle);
    formData.append("createdBy", createdBy);
    formData.append("image", image);
    formData.append("file", file);

    try {
      await axios.post("https://soe-notes-pdf-backend.onrender.com/upload-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError(""); // Clear any previous errors
      getPdf(); // Refresh the list
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while uploading the file. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-20">
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        required
        className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <input
        type="text"
        placeholder="Book Title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        required
        className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <input
        type="text"
        placeholder="Created By"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        required
        className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
        className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <button type="submit" className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
