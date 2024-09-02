import React, { useState, useEffect } from 'react';

const SearchComponent = ({ books, setFilteredBooks, setShowSuggestions, setSelectedBook }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
      setShowSuggestions(false);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();

      const filtered = books
        .filter(book => book.bookTitle.toLowerCase().includes(lowercasedQuery))
        .sort((a, b) => {
          const aTitle = a.bookTitle.toLowerCase();
          const bTitle = b.bookTitle.toLowerCase();
          
          // Sort by whether title starts with the search query
          const aStartsWithQuery = aTitle.startsWith(lowercasedQuery);
          const bStartsWithQuery = bTitle.startsWith(lowercasedQuery);

          if (aStartsWithQuery && !bStartsWithQuery) return -1;
          if (!aStartsWithQuery && bStartsWithQuery) return 1;

          // Sort alphabetically if both or neither start with the query
          return aTitle.localeCompare(bTitle);
        });

      setFilteredBooks(filtered);
      setShowSuggestions(true);
    }
  }, [searchQuery, books, setFilteredBooks, setShowSuggestions]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative z-10 mt-16 sm:mt-20 md:mt-28 lg:mt-32 max-w-2xl mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search any Book..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition duration-300 ease-in-out shadow-md dark:shadow-sm"
      />

      {searchQuery && (
        <ul className="absolute z-20 w-full mt-2 bg-white bg-opacity-70 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-70 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600 h-64 overflow-auto ring-1 ring-gray-300 dark:ring-gray-600">
          {books
            .filter(book => book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
              const lowercasedQuery = searchQuery.toLowerCase();
              const aTitle = a.bookTitle.toLowerCase();
              const bTitle = b.bookTitle.toLowerCase();

              // Sort by whether title starts with the search query
              const aStartsWithQuery = aTitle.startsWith(lowercasedQuery);
              const bStartsWithQuery = bTitle.startsWith(lowercasedQuery);

              if (aStartsWithQuery && !bStartsWithQuery) return -1;
              if (!aStartsWithQuery && bStartsWithQuery) return 1;

              // Sort alphabetically if both or neither start with the query
              return aTitle.localeCompare(bTitle);
            })
            .map((book) => (
              <li
                key={book._id}
                className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out focus:outline-none text-gray-900 dark:text-white"
                onClick={() => handleSelectBook(book)}
                role="option"
                aria-selected="false"
              >
                {book.bookTitle}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
