import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';

const SearchComponent = ({ books, setFilteredBooks, setSelectedBook }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced filter — runs 300 ms after the user stops typing
  useEffect(() => {
    const id = setTimeout(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        setFilteredBooks(books);
        setOpen(false);
        return;
      }
      const results = books
        .filter(b => b.bookTitle.toLowerCase().includes(q))
        .sort((a, b) => {
          const aS = a.bookTitle.toLowerCase().startsWith(q);
          const bS = b.bookTitle.toLowerCase().startsWith(q);
          if (aS && !bS) return -1;
          if (!aS && bS) return 1;
          return a.bookTitle.localeCompare(b.bookTitle);
        });
      setFilteredBooks(results);
      setOpen(results.length > 0);
    }, 300);
    return () => clearTimeout(id);
  }, [query, books, setFilteredBooks]);

  // Dropdown suggestions — same computation, memoised separately for the list
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return books
      .filter(b => b.bookTitle.toLowerCase().includes(q))
      .sort((a, b) => {
        const aS = a.bookTitle.toLowerCase().startsWith(q);
        const bS = b.bookTitle.toLowerCase().startsWith(q);
        if (aS && !bS) return -1;
        if (!aS && bS) return 1;
        return a.bookTitle.localeCompare(b.bookTitle);
      })
      .slice(0, 8);
  }, [query, books]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (book) => {
    setSelectedBook(book);
    setQuery('');
    setOpen(false);
  };

  const clear = () => {
    setQuery('');
    setFilteredBooks(books);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative z-30 max-w-xl mx-auto mt-20 mb-6">
      {/* Input */}
      <div className="relative">
        <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Search notes by title…"
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <HiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-full mt-1.5 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl divide-y divide-gray-50 dark:divide-gray-700"
        >
          {suggestions.map((book) => (
            <li
              key={book._id}
              role="option"
              aria-selected="false"
              onClick={() => handleSelect(book)}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              {book.image && (
                <img
                  src={book.image}
                  alt=""
                  className="w-8 h-8 rounded object-cover shrink-0"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <div className="min-w-0">
                <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{book.bookTitle}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Semester {book.semester}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
