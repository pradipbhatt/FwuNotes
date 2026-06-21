import React, { useState } from 'react';
import { HiExternalLink, HiShare } from 'react-icons/hi';

const FALLBACK = 'https://placehold.co/400x240/e2e8f0/94a3b8?text=No+Cover';

export default function BookCard({ book, onShare }) {
  const [imgError, setImgError] = useState(false);

  const share = () => {
    const text = `Check out "${book.bookTitle}"\n${book.pdfLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onShare?.(book);
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl ring-1 ring-gray-100 dark:ring-gray-700 hover:ring-blue-300 dark:hover:ring-blue-600 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
        <img
          src={imgError || !book.image ? FALLBACK : book.image}
          alt={book.bookTitle}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Semester badge */}
        <span className="absolute top-2 left-2 text-xs font-semibold bg-blue-600/90 text-white px-2 py-0.5 rounded-full shadow">
          Sem {book.semester}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1 min-h-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug mb-1">
            {book.bookTitle}
          </h3>
          {book.createdBy && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {book.createdBy}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={book.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm hover:shadow transition-all"
          >
            <HiExternalLink className="w-3.5 h-3.5" />
            Open PDF
          </a>
          <button
            onClick={share}
            className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium transition-all"
            aria-label="Share"
          >
            <HiShare className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
