// src/pages/BooksUploaded.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';
import arrowUp from '../../public/up-arrow.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import coverImage from '../assets/pkr.jpg'; // Import the cover image
import Chat from '../components/AI/Chat';
import SearchComponent from '../components/SearchComponent'; // Import the SearchComponent
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from 'react-share';

function BooksUploadedCivil() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to manage selected book for PDF
  const location = useLocation();
  const navigate = useNavigate();

  const getBooks = () => {
    fetch('https://fwu-soe.vercel.app/book/getBook')
      .then(response => response.json())
      .then(data => {
        // Filter books where faculty is "Computer"
        const filteredData = data.filter(book => book.faculty === "Civil");
        const sortedBooks = filteredData.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
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
    navigate(`/books-uploaded-civil?semester=${newPage}`); // Update URL with new semester
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (book) => {
    const currentUrl = book.pdfLink; // Using the book's PDF link as the URL to share
    const shareText = `Check out this PDF: ${book.bookTitle}\n${currentUrl}`;
    const encodedText = encodeURIComponent(shareText);
    const waUrl = `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 overflow-hidden relative">
        {/* Cover Section Behind Cards */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(100, 200, 255, 0.5) 50%, rgba(255, 100, 200, 0.5))', // Softer neon gradient
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'overlay',
          }}
        ></div>

        {/* Search Component */}
        <SearchComponent
          books={books}
          setFilteredBooks={setFilteredBooks}
          setShowSuggestions={setShowSuggestions}
          setSelectedBook={setSelectedBook}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-700 mt-4">Hold on, notes are loading...</p>
          </div>
        ) : (
          <>
            {semesters.length > 0 && (
              <div className="mb-8" data-aos="zoom-in-left">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Semester {currentPage} Notes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {groupedBooks[currentPage]?.map((book, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl px-6"
                      data-aos="fade-up"
                    >
                      <img
                        src={book.image}
                        alt={book.bookTitle}
                        className="w-full h-48 object-cover mb-4 rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-s font-bold mb-2 text-blue-600 dark:text-blue-400">
                          {book.bookTitle}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">By: {book.createdBy}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Faculty: {book.faculty}</p> {/* Added faculty information */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Semester: {book.semester}</p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                          <button
                            onClick={() => handleShowPDF(book.pdfLink)}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500 dark:shadow-blue-600 dark:hover:shadow-blue-700 text-base font-semibold w-full sm:w-auto"
                          >
                            Read
                          </button>
                          <button
                            onClick={() => handleShare(book)}
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out shadow-lg shadow-green-500 dark:shadow-green-600 dark:hover:shadow-green-700 text-base font-semibold w-full sm:w-auto"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* <Chat /> */}
    
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-16 left-2 bg-blue-500 text-white p-2 rounded-full shadow-lg focus:outline-none"
          >
            <img src={arrowUp} alt="Scroll to top" className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 sm:space-x-1 flex-wrap">
                    {Array.from({ length: totalSemesters }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`border-2 py-1 px-4 sm:py-2 sm:px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-300 ease-in-out shadow-md text-sm sm:text-base ${currentPage === index
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
                          }`}
                      >
                        {index}
                      </button>
                    ))}
                  </div>

                  <Footer />
    </>
  );
}

export default BooksUploadedCivil;
