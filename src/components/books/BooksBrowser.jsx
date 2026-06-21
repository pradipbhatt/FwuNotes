import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { API_BASE_URL } from '../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchComponent from '../SearchComponent';
import BookCard from './BookCard';
import { HiChevronUp } from 'react-icons/hi';

const SEM_LABELS = {
  0: 'Pre-Entrance',
  1: 'Semester 1', 2: 'Semester 2', 3: 'Semester 3',
  4: 'Semester 4', 5: 'Semester 5', 6: 'Semester 6',
  7: 'Semester 7', 8: 'Semester 8',
};

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-100 dark:ring-gray-700 animate-pulse">
      <div className="h-44 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-2">
        <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1" />
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function BooksBrowser({ faculty = 'Computer', routeBase = '/showbook' }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryPage = useCallback(() => {
    const p = parseInt(new URLSearchParams(location.search).get('semester') ?? '1', 10);
    return Number.isFinite(p) && p >= 0 && p <= 8 ? p : 1;
  }, [location.search]);

  const [currentPage, setCurrentPage] = useState(queryPage);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/book/getBook`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        const sorted = data
          .filter(b => b.faculty === faculty)
          .sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
        setBooks(sorted);
        setFilteredBooks(sorted);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [faculty]);

  useEffect(() => { setCurrentPage(queryPage()); }, [location.search]);

  useEffect(() => {
    if (selectedBook) {
      window.open(selectedBook.pdfLink, '_blank', 'noopener,noreferrer');
      setSelectedBook(null);
    }
  }, [selectedBook]);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const groupedBooks = useMemo(() => filteredBooks.reduce((acc, book) => {
    const sem = book.semester;
    if (!acc[sem]) acc[sem] = [];
    acc[sem].push(book);
    return acc;
  }, {}), [filteredBooks]);

  const availableSems = useMemo(
    () => Object.keys(groupedBooks).map(Number).sort((a, b) => a - b),
    [groupedBooks]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    navigate(`${routeBase}?semester=${page}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, routeBase]);

  const currentBooks = groupedBooks[currentPage] ?? [];

  return (
    <div className="bg-gray-100 dark:bg-slate-900 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <SearchComponent
          books={books}
          setFilteredBooks={setFilteredBooks}
          setSelectedBook={setSelectedBook}
        />

        {error && (
          <div className="text-center py-16 text-red-500 dark:text-red-400">
            <p className="text-lg font-medium">Failed to load notes</p>
            <p className="text-sm mt-1 opacity-75">{error}</p>
          </div>
        )}

        {!error && (
          <div className="flex flex-wrap gap-2 mb-6">
            {(loading ? Array.from({ length: 5 }) : availableSems).map((sem, i) => (
              loading ? (
                <div key={i} className="h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ) : (
                <button
                  key={sem}
                  onClick={() => handlePageChange(sem)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    currentPage === sem
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {SEM_LABELS[sem] ?? `Semester ${sem}`}
                </button>
              )
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {SEM_LABELS[currentPage] ?? `Semester ${currentPage}`} Notes
              <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                ({currentBooks.length} {currentBooks.length === 1 ? 'resource' : 'resources'})
              </span>
            </h2>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : currentBooks.length > 0
              ? currentBooks.map((book) => (
                  <BookCard key={book._id || book.bookTitle} book={book} />
                ))
              : !error && (
                  <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400 dark:text-gray-500">
                    <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-lg font-medium">No notes found</p>
                    <p className="text-sm mt-1">Try a different semester or search term.</p>
                  </div>
                )
          }
        </div>
      </div>

      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-40 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <HiChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
