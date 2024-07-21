import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBook() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookTitle: '',
    createdBy: '',
    image: '',
    pdfLink: '',
    semester: ''
  });
  const [editingBookId, setEditingBookId] = useState(null); // State to manage the book being edited

  // Function to fetch books from the backend
  const getBooks = () => {
    fetch('https://fwu-soe.onrender.com/book/getBook')
      .then(response => response.json())
      .then(data => {
        const sortedBooks = data.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
        setBooks(sortedBooks);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    getBooks();
  }, []);

  // Function to open PDF link in a new tab
  const handleShowPDF = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };

  // Function to delete a book by ID
  const handleDeleteBook = (id) => {
    fetch(`https://fwu-soe.onrender.com/book/deleteBook/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
        toast.success('Book deleted successfully!');
      } else {
        toast.error('Failed to delete book');
      }
    })
    .catch(error => toast.error('Error:', error));
  };

  // Function to handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBookId) {
      // Update existing book
      fetch(`https://fwu-soe.onrender.com/book/updateBook/${editingBookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        setBooks(books.map(book => (book._id === editingBookId ? data : book)));
        setFormData({
          bookTitle: '',
          createdBy: '',
          image: '',
          pdfLink: '',
          semester: ''
        });
        setEditingBookId(null);
        toast.success('Book updated successfully!');
        document.getElementById('book-form').scrollIntoView({ behavior: 'smooth' });
      })
      .catch(error => toast.error('Error:', error));
    } else {
      // Add new book
      fetch('https://fwu-soe.onrender.com/book/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        setBooks([...books, data]);
        setFormData({
          bookTitle: '',
          createdBy: '',
          image: '',
          pdfLink: '',
          semester: ''
        });
        toast.success('Book added successfully!');
      })
      .catch(error => toast.error('Error:', error));
    }
  };

  // Function to handle editing a book
  const handleEditBook = (book) => {
    setFormData({
      bookTitle: book.bookTitle,
      createdBy: book.createdBy,
      image: book.image,
      pdfLink: book.pdfLink,
      semester: book.semester
    });
    setEditingBookId(book._id);
    document.getElementById('book-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Function to group books by semester
  const groupBooksBySemester = () => {
    const groupedBooks = {};
    books.forEach(book => {
      if (!groupedBooks[book.semester]) {
        groupedBooks[book.semester] = [];
      }
      groupedBooks[book.semester].push(book);
    });
    return groupedBooks;
  };

  const groupedBooks = groupBooksBySemester();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">Books Uploaded</h1>

        {/* Form to add or edit a book */}
        <form id="book-form" onSubmit={handleSubmit} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{editingBookId ? 'Edit Book' : 'Add New Book'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-800">Book Title</label>
              <input type="text" id="bookTitle" name="bookTitle" value={formData.bookTitle} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black" />
            </div>
            <div>
              <label htmlFor="createdBy" className="block text-sm font-medium text-gray-800">Created By</label>
              <input type="text" id="createdBy" name="createdBy" value={formData.createdBy} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-800">Image URL</label>
              <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black" />
            </div>
            <div>
              <label htmlFor="pdfLink" className="block text-sm font-medium text-gray-800">PDF Link</label>
              <input type="url" id="pdfLink" name="pdfLink" value={formData.pdfLink} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black" />
            </div>
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-800">Semester</label>
              <input type="text" id="semester" name="semester" value={formData.semester} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black" />
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button type="submit" className="bg-blue-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300">
              {editingBookId ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>

        {/* Display uploaded books */}
        {Object.keys(groupedBooks).map((semester, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Semester {semester} Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {groupedBooks[semester].map((book, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300">
                  <img src={book.image} alt={book.bookTitle} className="w-full h-48 object-cover mb-4 rounded-md hover:scale-110 transition duration-500" />
                  <h3 className="text-lg font-semibold mb-2">{book.bookTitle}</h3>
                  <p className="text-sm text-gray-600 mb-2">Created By: {book.createdBy}</p>
                  <button
                    onClick={() => handleShowPDF(book.pdfLink)}
                    className="bg-green-500 text-white font-bold py-1 px-2 rounded mb-2 hover:bg-green-600 transition duration-300"
                  >
                    View PDF
                  </button>
                  <button
                    onClick={() => handleEditBook(book)}
                    className="bg-yellow-500 text-white font-bold py-1 px-2 rounded mb-2 hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default AddBook;
