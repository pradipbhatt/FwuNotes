import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';
import arrowUp from '../../public/up-arrow.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import coverImage from '../assets/pkr.jpg'; // Import the cover image
import Chat from '../components/AI/Chat';

function BooksUploaded() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to manage selected book for PDF
  const location = useLocation();
  const navigate = useNavigate();

  const getBooks = () => {
    fetch('https://fwu-soe.onrender.com/book/getBook')
      .then(response => response.json())
      .then(data => {
        const sortedBooks = data.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
        setBooks(sortedBooks);
        setFilteredBooks(sortedBooks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBooks();
    AOS.init({
      duration: 1000,
      once: true,
    });

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

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const semester = query.get("semester");
    if (semester) {
      const semesterNumber = parseInt(semester, 10);
      if (semesterNumber >= 0 && semesterNumber <= 8) {
        setCurrentPage(semesterNumber);
      } else {
        setCurrentPage(0);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
      setShowSuggestions(false);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = books.filter(book =>
        book.bookTitle.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredBooks(filtered);
      setShowSuggestions(true);
    }
  }, [searchQuery, books]);

  useEffect(() => {
    if (selectedBook) {
      window.open(selectedBook.pdfLink, '_blank');
      setSelectedBook(null); // Clear selection after opening
    }
  }, [selectedBook]);

  const handleShowPDF = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };


  const groupBooksBySemester = () => {
    const groupedBooks = {};
    filteredBooks.forEach(book => {
      if (!groupedBooks[book.semester]) {
        groupedBooks[book.semester] = [];
      }
      groupedBooks[book.semester].push(book);
    });
    return groupedBooks;
  };

  const groupedBooks = groupBooksBySemester();
  const semesters = Object.keys(groupedBooks);
  const totalSemesters = 9; // 9 semesters including Semester 0

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/showbook?semester=${newPage}`); // Update URL with new semester
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20 overflow-hidden relative">
        {/* Cover Section Behind Cards */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImage})`,
            filter: 'blur(8px)', // Apply the blur effect
          }}
        ></div>

        <div className="relative z-10 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by book title..."
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
          />
          {showSuggestions && (
            <ul className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-700 shadow-lg rounded-md max-h-60 overflow-auto">
              {filteredBooks.map((book) => (
                <li
                  key={book._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600"
                  onClick={() => {
                    setSelectedBook(book); // Set selected book to open PDF
                    setSearchQuery(''); // Clear search query
                    setShowSuggestions(false); // Hide suggestions
                  }}
                >
                  {book.bookTitle}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-700 mt-4">Hold on, notes are loading...</p>
          </div>
        ) : (
          <>
            {semesters.map((semester, index) => (
              index === currentPage && (
                <div key={index} className="mb-8" data-aos="zoom-in-left">
                  <h2 className="text-2xl font-semibold mb-4">Semester {semester} Notes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {groupedBooks[semester].map((book, idx) => (
                      <div key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105" data-aos="fade-up">
                        <img src={book.image} alt={book.bookTitle} className="w-full h-48 object-cover mb-4" />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{book.bookTitle}</h3>
                          <p className="text-gray-600 mb-2">By: {book.createdBy}</p>
                          <p className="text-gray-600 mb-4">Semester: {book.semester}</p>
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => handleShowPDF(book.pdfLink)}
                              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 hover:bg-blue-600"
                            >
                              Show PDF
                            </button>
                            {/* <button
                              onClick={() => handleDeleteBook(book._id)}
                              className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 hover:bg-red-600"
                            >
                              Delete
                            </button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>
      <div className="flex justify-center mt-8 mb-10">
        {Array.from({ length: totalSemesters }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`mx-1 px-2 py-2 rounded ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {index} {/* Displaying the semester number */}
          </button>
        ))}
      </div>
     <Chat/>
      <Footer />
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-10 bg-blue-500 text-white p-2 rounded-full shadow-lg focus:outline-none"
        >
          <img src={arrowUp} alt="Scroll to top" className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

export default BooksUploaded;
