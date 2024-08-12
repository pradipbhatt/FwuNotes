import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "./home/Logout";
import { useAuth } from "../../src/context/AuthProvider";
import {
  HiMenu, HiX, HiSun, HiMoon, HiSearch,
  HiHome, HiBookOpen, HiClipboardList, HiUserCircle
} from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faClipboard, faChartBar, faFileAlt, faUserCircle ,faBell} from '@fortawesome/free-solid-svg-icons';


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
  // const [activeTab, setActiveTab] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <Link to="/" className="hover:text-[#4338ca] text-gray-900 dark:text-gray-100 dark:hover:text-[#6d28d9]">
          Home
        </Link>
      </li>
      <li
        className="relative"
        onMouseEnter={() => setShowSemesterDropdown(true)}
        onMouseLeave={() => setShowSemesterDropdown(false)}
      >
        <Link to="/showbook" className="hover:text-[#6d28d9] text-gray-900 dark:text-gray-100 dark:hover:text-[#a78bfa]">
          SoeNotes
        </Link>
        {showSemesterDropdown && (
          <ul className="absolute left-0 mt-8 mb-8 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-10 dark:bg-slate-700 text-gray-900 dark:text-gray-100 backdrop-blur-md dark:hover:text-[#6d28d9]">
            {Array.from({ length: 9 }, (_, i) => i).map((semester) => (
              <li
                key={semester}
                className="block px-4 py-2 mt-4 mb-2 text-sm text-gray-900 dark:text-[#ede9fe] hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-[#6d28d9] dark:hover:text-[#6d28d9] transition-colors duration-200"
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
        <Link to="/mock" className="hover:text-[#6d28d9] text-gray-900 dark:text-gray-100 dark:hover:text-[#6d28d9]">
          Entrance Test
        </Link>
        {showDropdown && (
          <ul className="absolute left-0 mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-slate-700 text-gray-900 dark:text-gray-100 ">
            {Array.from({ length: 10 }, (_, i) => 2071 + i).map((year) => (
              <li key={year} className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-[#6d28d9]">
                <Link to={`/mock${year - 2071}`}>{year}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li>
        <Link to="/quizresult" className="hover:text-[#6d28d9] text-gray-900 dark:text-gray-100 dark:hover:text-[#6d28d9]">
          Entrance Results
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:text-[#6d28d9] text-gray-900 dark:text-gray-100 dark:hover:text-[#6d28d9]">
          About
        </Link>
      </li>
    </>
  );

  

  return (
    <>
   <div
  className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
  ${sticky ? "bg-slate-200 shadow-md dark:bg-slate-900" : "dark:bg-slate-900 bg-slate-100"} 
  ${window.innerWidth >= 1024 ? 'h-17' : 'h-16'}`} // Navbar height adjustment
>
  <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
    <div className={`navbar flex justify-between items-center py-2 ${window.innerWidth >= 1024 ? 'py-4' : 'py-2'}`}>
      <div className="navbar-start flex items-center">
      <div className="dropdown">
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost lg:hidden flex items-center justify-center w-14 h-14 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
    onClick={() => setShowMenuLeft(!showMenuLeft)}
  >
    {showMenuLeft ? (
      <HiX
        className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-black"} transition-all duration-300 ease-in-out transform hover:scale-110`}
      />
    ) : (
      <HiMenu
        className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-black"} transition-all duration-300 ease-in-out transform hover:scale-110`}
      />
    )}
  </div>
  {showMenuLeft && (
  <div
    className={`fixed top-0 left-0 w-64 h-screen bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 transition-transform duration-300 ease-in-out z-50 ${showMenuLeft ? 'translate-x-0' : '-translate-x-full'} backdrop-blur-md shadow-lg`}
  >
    <div className="flex items-center justify-between p-4 border-b dark:border-slate-600 bg-gray-50 dark:bg-slate-700">
    <button
  className="btn btn-ghost flex items-center justify-center w-16 h-16 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
  onClick={() => setShowMenuLeft(false)}
>
  <HiX className={`h-10 w-10 ${theme === "dark" ? "text-white" : "text-black"} transition-transform duration-300 ease-in-out transform hover:scale-125`} />
</button>

      <Link
        to="/"
        className="flex items-center space-x-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        <span className="text-2xl font-semibold text-blue-500 dark:text-blue-400 transition-all duration-300 ease-in-out hover:text-blue-400">
          SOE
        </span>
        <span className="text-lg text-gray-900 dark:text-gray-100 font-serif">
          notes
        </span>
      </Link>
    </div>

    <ul className="mt-4 space-y-2 p-4 overflow-y-auto">
      {navItems}
    </ul>
  </div>
)}

</div>


<Link
  to="/"
  className="relative flex items-center space-x-2 text-gray-900 dark:text-gray-100 transition-transform duration-300 ease-in-out transform hover:scale-105"
>
  <span className="relative text-4xl font-serif text-blue-500 group transition-all duration-300 ease-in-out">
    SOE
    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 blur-sm transition-opacity duration-300 ease-in-out group-hover:opacity-50 group-hover:blur-sm"></span>
  </span>
  <span className="text-2xl font-serif text-gray-900 dark:text-gray-100">
    notes
  </span>
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
        <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className="relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center p-1 transition-colors duration-300">
        <div
          className={`absolute w-7 h-7 flex items-center justify-center transition-transform duration-300 ${theme === "dark" ? 'left-1' : 'right-1'}`}
        >
          <HiMoon className={`text-gray-100 ${theme === "dark" ? 'block' : 'hidden'}`} />
          <HiSun className={`text-gray-900 ${theme === "dark" ? 'hidden' : 'block'}`} />
        </div>
        <div
          className={`absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300 ${theme === "dark" ? 'translate-x-8' : 'translate-x-0'}`}
        ></div>
      </div>
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
              className="bg-[#60a5fa] text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md hover:bg-[#4338ca] duration-300 cursor-pointer"
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
      <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-100 text-black shadow-lg dark:bg-gray-900 dark:text-gray-100 transition-transform duration-300 ease-in-out ${
        isVisible ? "transform translate-y-0" : "transform translate-y-full"
      }`}
      style={{ height: "50px" }}
    >
      <div className="flex justify-around py-1">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none ${
            activeTab === "home" ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/showbook"
          className={`flex flex-col items-center p-2 transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none ${
            activeTab === "soenotes" ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("soenotes")}
        >
          <FontAwesomeIcon icon={faBook} className="w-5 h-5" />
          <span className="text-xs mt-1">Books</span>
        </Link>
        <Link
          to="/mock"
          className={`flex flex-col items-center p-2 transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none ${
            activeTab === "entrance" ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("entrance")}
        >
          <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
          <span className="text-xs mt-1">Mock</span>
        </Link>
        <Link
          to="/quizresult"
          className={`flex flex-col items-center p-2 transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none ${
            activeTab === "results" ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("results")}
        >
          <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />
          <span className="text-xs mt-1">Results</span>
        </Link>
        <Link
          to="/AdmissionGuidelines"
          className={`flex flex-col items-center p-2 transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none ${
            activeTab === "notice" ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("notice")}
        >
          <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
          <span className="text-xs mt-1">Notice</span>
        </Link>
      </div>
    </div>
    </>
  );
}

export default Navbar;
