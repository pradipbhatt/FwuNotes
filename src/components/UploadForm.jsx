import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const UploadForm = ({ getPdf }) => {
  const [bookId, setBookId] = useState("1");
  const [bookTitle, setBookTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("Pradip Bhatt");
  const [image, setImage] = useState("https://pradipbhatt.com.np/medias/parry.jpg");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !bookId || !bookTitle || !createdBy || !semester) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("bookTitle", bookTitle);
    formData.append("createdBy", createdBy);
    formData.append("image", image);
    formData.append("semester", semester);
    formData.append("file", file);

    try {
      await axios.post("https://soe-notes-pdf-backend.onrender.com/upload-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError(""); // Clear any previous errors
      setBookId("");
      setBookTitle("");
      setCreatedBy("");
      setImage("");
      setSemester("");
      setFile(null);
      getPdf(); // Refresh the list
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while uploading the file. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-orange-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-full max-w-md"
      >
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
          placeholder="Note Name"
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
          className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
          className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="border rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:shadow-xl transition-shadow"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color={"#ffffff"} loading={isLoading} size={20} />
              <span className="ml-2">Uploading...</span>
            </div>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
