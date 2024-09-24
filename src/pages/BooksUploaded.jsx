import { motion } from 'framer-motion';
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
import './styles.css';

function BooksUploaded() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch books from the server
  const getBooks = async () => {
    try {
      const response = await fetch('https://fwu-soe.vercel.app/book/getBook');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Filter and sort books where faculty is "Computer"
      const filteredData = data.filter(book => book.faculty === "Computer");
      const sortedBooks = filteredData.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));

      setBooks(sortedBooks);
      setFilteredBooks(sortedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Handle scroll to show/hide scroll-to-top button
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

  // Update current page based on URL query parameters
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

  // Open selected book's PDF link
  useEffect(() => {
    if (selectedBook) {
      window.open(selectedBook.pdfLink, '_blank');
      setSelectedBook(null); // Clear selection after opening
    }
  }, [selectedBook]);

  const handleShowPDF = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };

  // Group books by semester
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
      <div className="relative min-h-screen">
        {/* Gradient and Bubbles Background */}
        <div className="absolute inset-0 z-[-1]">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Cover Section Behind Cards */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(100, 200, 255, 0.5) 50%, rgba(255, 100, 200, 0.5))', // Softer neon gradient
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              backgroundBlendMode: 'overlay',
              zIndex: -1, // Ensure it's behind other content
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
                <div className="w-12 h-12 border-4 border-t-4 border-sky-blue border-opacity-50 rounded-full animate-spin"></div>
              </div>
              <p className="text-dark-blue mt-4">Hold on, notes are loading...</p>
            </div>
          ) : (
            <>
              {semesters.length > 0 && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                >
                  <h2 className="text-4xl font-bold mb-6 text-blue-800">
                    Semester {currentPage} Notes
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {groupedBooks[currentPage]?.map((book, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 px-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <div className="relative overflow-hidden rounded-t-lg">
                          <motion.img
                            src={book.image}
                            alt={book.bookTitle}
                            className="w-full h-48 object-cover mb-4 transform transition-transform duration-500 hover:scale-110"
                            whileHover={{ scale: 1.1 }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-semibold mb-2 text-blue-700">
                            {book.bookTitle}
                          </h3>
                          <p className="text-sm text-gray-800 mb-2">By: {book.createdBy}</p>
                          <p className="text-sm text-gray-800 mb-2">Faculty: {book.faculty}</p>
                          <p className="text-sm text-gray-800 mb-4">Semester: {book.semester}</p>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <motion.button
                              onClick={() => handleShowPDF(book.pdfLink)}
                              className="border-2 border-blue-600 text-blue-600 bg-transparent py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-300 ease-in-out shadow-md hover:bg-blue-600 hover:text-white"
                              whileHover={{ scale: 1.05 }}
                            >
                              View PDF
                            </motion.button>
                            <motion.button
                              onClick={() => handleShare(book)}
                              className="border-2 border-blue-500 text-blue-500 bg-transparent py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-300 ease-in-out shadow-md hover:bg-blue-500 hover:text-white"
                              whileHover={{ scale: 1.05 }}
                            >
                              Share
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-8 space-x-2 sm:space-x-4 flex-wrap">
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

                </motion.div>
              )}
              <Chat />
            </>
          )}
        </div>
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-sky-blue hover:bg-sky-blue text-white p-3 rounded-full shadow-lg transition-transform duration-300 ease-in-out"
          >
            <img src={arrowUp} alt="Scroll to top" className="w-6 h-6" />
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}

export default BooksUploaded;
