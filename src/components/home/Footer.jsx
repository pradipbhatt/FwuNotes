import React from 'react';
import { HiHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-200 dark:bg-slate-900 text-gray-700 dark:text-gray-300 pt-10 pb-6">
    <div className="max-w-screen-xl mx-auto px-6">
      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-8 border-b border-gray-300 dark:border-slate-700">
        {/* Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">SOE Notes</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Study resources for FWU School of Engineering students — notes, mock tests, and more.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide text-xs">Explore</p>
            <nav className="flex flex-col gap-1.5">
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/showbook">BCT Notes</Link>
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/books-uploaded-civil">BCE Notes</Link>
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/mock">Mock Tests</Link>
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/AdmissionGuidelines">Admission Guide</Link>
            </nav>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide text-xs">Info</p>
            <nav className="flex flex-col gap-1.5">
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/About">About</Link>
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/gallary1">Gallery</Link>
              <Link className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" to="/chat">AI Chat</Link>
            </nav>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide text-xs">Follow</p>
          <div className="flex gap-3">
            <a href="https://x.com/Pradipbhatt11" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 rounded-lg bg-gray-300 dark:bg-slate-700 hover:bg-blue-500 dark:hover:bg-blue-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCJPegHPc48MjKjw3NIwchOg" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 rounded-lg bg-gray-300 dark:bg-slate-700 hover:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100042276667958" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 rounded-lg bg-gray-300 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 text-sm text-gray-500 dark:text-gray-500">
        <p>© {new Date().getFullYear()} FWU-SOE Notes. All rights reserved.</p>
        <p className="flex items-center gap-1">Built with <HiHeart className="w-3.5 h-3.5 text-red-500" /> by the i-CEC team</p>
      </div>
    </div>
  </footer>
);

export default Footer;
