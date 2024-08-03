import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { 
  HiMenu, HiX, HiSun, HiMoon, HiSearch, 
  HiHome, HiBookOpen, HiClipboardList, HiUserCircle 
} from "react-icons/hi";

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;
  const navigate = useNavigate();

  const [showMenuLeft, setShowMenuLeft] = useState(false);
  const [showMenuRight, setShowMenuRight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);

  const profileRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const [userData, setUserData] = useState({
    userImage: 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png'
  });

  useEffect(() => {
    // Fetch user data from local storage
    const storedUsers = localStorage.getItem('Users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      if (users && users.userImage) {
        setUserData({ userImage: users.userImage });
      }
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        event.target.closest(".navbar-end") === null
      ) {
        setShowMenuRight(false);
        setShowSemesterDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchSearchResults = () => {
    navigate("/mock");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const handleSemesterClick = (semester) => {
    navigate(`/showbook?semester=${semester}`);
    setShowSemesterDropdown(false);
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="hover:text-orange-500 text-gray-900 dark:text-gray-100">
          Home
        </Link>
      </li>
      <li
        className="relative"
        onMouseEnter={() => setShowSemesterDropdown(true)}
        onMouseLeave={() => setShowSemesterDropdown(false)}
      >
        <Link to="/showbook" className="hover:text-orange-500 text-gray-900 dark:text-gray-100">
          SoeNotes
        </Link>
        {showSemesterDropdown && (
          <ul className="absolute left-0 mt-8 mb-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-10 dark:bg-slate-700 text-gray-900 dark:text-gray-100 backdrop-blur-md">
            {Array.from({ length: 9 }, (_, i) => i).map((semester) => (
              <li
                key={semester}
                className="block px-4 py-2 mt-4 mb-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                style={{ textShadow: "0 0 2px rgba(255, 165, 0, 0.6)" }}
                onClick={() => handleSemesterClick(semester)}
              >
                Semester {semester}
              </li>
            ))}
          </ul>
        )}
      </li>
      <li
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <Link to="/mock" className="hover:text-orange-500 text-gray-900 dark:text-gray-100">
          Entrance Test
        </Link>
        {showDropdown && (
          <ul className="absolute left-0 mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-slate-700 text-gray-900 dark:text-gray-100">
            {Array.from({ length: 10 }, (_, i) => 2071 + i).map((year) => (
              <li key={year} className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                <Link to={`/mock${year - 2071}`}>{year}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li>
        <Link to="/quizresult" className="hover:text-orange-500 text-gray-900 dark:text-gray-100">
          Entrance Results
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:text-orange-500 text-gray-900 dark:text-gray-100">
          About
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
        ${sticky ? "bg-slate-200 shadow-md dark:bg-slate-900" : "dark:bg-slate-900 bg-slate-100"}`}
      >
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
          <div className="navbar flex justify-between items-center py-4">
            <div className="navbar-start flex items-center">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                  onClick={() => setShowMenuLeft(!showMenuLeft)}
                >
                  {showMenuLeft ? (
                    <HiX className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
                  ) : (
                    <HiMenu className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
                  )}
                </div>
                {showMenuLeft && (
                  <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 transition-transform duration-300 ease-in-out z-50 ${showMenuLeft ? 'translate-x-0' : '-translate-x-full'}`}
                  >
                    <div className="flex justify-between items-center p-4 border-b dark:border-slate-600">
                      <Link to="/" className="text-2xl font-serif text-gray-900 dark:text-gray-100">
                        SoeNotes
                      </Link>
                      <button
                        className="text-gray-900 dark:text-gray-100"
                        onClick={() => setShowMenuLeft(false)}
                      >
                        <HiX className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
                      </button>
                    </div>
                    <ul className="mt-4 space-y-2 p-4">
                      {navItems}
                    </ul>
                  </div>
                )}
              </div>
              <Link to="/" className="text-2xl font-serif cursor-pointer text-gray-900 dark:text-gray-100">
                SoeNotes
              </Link>
            </div>
            <div className="navbar-end flex items-center space-x-3">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-gray-900 dark:text-black">
                  {navItems}
                </ul>
              </div>
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-slate-800">
                  <input
                    type="text"
                    className="outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <HiSearch className="w-4 h-4 opacity-70" />
                </label>
              </form>
              <label className="swap swap-rotate text-gray-900 dark:text-gray-100">
                <input
                  type="checkbox"
                  className="theme-controller"
                  checked={theme === "dark"}
                  onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
                {theme === "light" ? (
                  <HiSun className="swap-off fill-current w-7 h-7" />
                ) : (
                  <HiMoon className="swap-on fill-current w-7 h-7" />
                )}
              </label>
              {authUser ? (
                <div className="relative" ref={profileRef}>
                  <button
                    className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white text-gray-900 dark:text-gray-100"
                    onClick={() => setShowMenuRight(!showMenuRight)}
                  >
                    <img
                      className="h-full w-full object-cover text-gray-900 dark:text-gray-100"
                      src={userData.userImage}
                      alt="User Avatar"
                    />
                  </button>
                  {showMenuRight && (
                    <ul className="dropdown-content absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-slate-700 dark:text-white">
                      <li className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                        <Logout />
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div>
                  <a
                    className="bg-orange-500 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md hover:bg-orange-700 duration-300 cursor-pointer"
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                  >
                    Login
                  </a>
                  <Login />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-100 text-black shadow-lg">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center ${activeTab === "home" ? "text-orange-500" : "text-gray-400"}`}
            onClick={() => setActiveTab("home")}
          >
            <HiHome className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/showbook"
            className={`flex flex-col items-center ${activeTab === "soenotes" ? "text-orange-500" : "text-gray-400"}`}
            onClick={() => setActiveTab("soenotes")}
          >
            <HiBookOpen className="w-6 h-6" />
            <span className="text-xs">Notes</span>
          </Link>
          <Link
            to="/mock"
            className={`flex flex-col items-center ${activeTab === "entrance" ? "text-orange-500" : "text-gray-400"}`}
            onClick={() => setActiveTab("entrance")}
          >
            <HiClipboardList className="w-6 h-6" />
            <span className="text-xs">Entrance Test</span>
          </Link>
          <Link
            to="/quizresult"
            className={`flex flex-col items-center ${activeTab === "entrance" ? "text-orange-500" : "text-gray-400"}`}
            onClick={() => setActiveTab("entrance")}
          >
            <HiClipboardList className="w-6 h-6" />
            <span className="text-xs">TestResults</span>
          </Link>
          <Link
            to="/about"
            className={`flex flex-col items-center ${activeTab === "about" ? "text-orange-500" : "text-gray-400"}`}
            onClick={() => setActiveTab("about")}
          >
            <HiUserCircle className="w-6 h-6" />
            <span className="text-xs">About</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
