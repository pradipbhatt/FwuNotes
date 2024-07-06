import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import arrowUp from '../../public/up-arrow.png'; // Make sure to import your arrow image

function BooksUploaded() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const [showScroll, setShowScroll] = useState(false); // State to show/hide scroll-to-top button

  // Function to fetch books from the backend
  const getBooks = () => {
    fetch('https://fwu-soe.onrender.com/book/getBook')
      .then(response => response.json())
      .then(data => {
        const sortedBooks = data.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
        setBooks(sortedBooks);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  };

  useEffect(() => {
    getBooks();

    // Show or hide the scroll button based on the scroll position
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        // Remove deleted book from state
        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      } else {
        console.error('Failed to delete book');
      }
    })
    .catch(error => console.error('Error:', error));
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

  // Get the total number of semesters
  const totalSemesters = Object.keys(groupedBooks).length;

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4">Books Uploaded</h1>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500"></div>
              <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500 animation-delay-200"></div>
              <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500 animation-delay-400"></div>
            </div>
            <p className="text-gray-700 mt-4">Please wait, notes are loading...</p>
          </div>
        ) : (
          <>
            {Object.keys(groupedBooks).map((semester, index) => (
              index === currentPage && (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">Semester {semester} Notes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {groupedBooks[semester].map((book, index) => (
                      <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300">
                        <img src={book.image} alt={book.bookTitle} className="w-full h-48 object-cover mb-4 rounded-md hover:scale-110 transition duration-500" />
                        <h3 className="text-lg font-semibold mb-2">{book.bookTitle}</h3>
                        <p className="text-gray-700 mb-1">By: {book.createdBy}</p>
                        <p className="text-gray-700 mb-1">Semester: {book.semester}</p>
                        <div className="flex justify-between mt-4">
                          <button
                            onClick={() => handleShowPDF(book.pdfLink)}
                            className="bg-blue-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 text-xs md:text-sm"
                            style={{
                              height: '32px',
                              padding: '0 10px',
                              backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)',
                              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                              transition: 'background-image 3s ease, transform 1s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundImage = 'linear-gradient(to right, #45f2fe, #4facfe)';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundImage = 'linear-gradient(to right, #4facfe, #00f2fe)';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            Show PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}

            <div className="flex justify-center mt-8">
              {Array.from({ length: totalSemesters + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`mx-1 px-3 py-2 rounded ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {index}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-2 rounded-full shadow-lg focus:outline-none"
        >
          <img src={arrowUp} alt="Scroll to top" className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

export default BooksUploaded;
