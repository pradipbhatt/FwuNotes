import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { 
  HiMenu, HiX, HiSun, HiMoon, HiSearch, 
  HiHome, HiBookOpen, HiClipboardList, HiUserCircle 
} from "react-icons/hi";
import axios from "axios";

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [showMenuLeft, setShowMenuLeft] = useState(false);
  const [showMenuRight, setShowMenuRight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const profileRef = useRef(null);
  const [sticky, setSticky] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeTab, setActiveTab] = useState("home");

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
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Simplified function to only handle redirect
  const fetchSearchResults = () => {
    navigate("/mock"); // Redirect to /mock
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const navItems = (
    <>
      <li>
        <a href="/" className="hover:text-orange-500">
          Home
        </a>
      </li>
      <li>
        <a href="/showbook" className="hover:text-orange-500">
          SoeNotes
        </a>
      </li>
      <li
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <a href="/mock" className="hover:text-orange-500">
          Entrance Test
        </a>
        {showDropdown && (
          <ul className="absolute left-0 mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-slate-700 dark:text-white">
            {Array.from({ length: 11 }, (_, i) => 2071 + i).map((year) => (
              <li key={year} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                <Link to={`/mock${year - 2071}`}>{year}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li>
        <a href="/quizresult" className="hover:text-orange-500">
          Entrance Results
        </a>
      </li>
      <li>
        <a href="/about" className="hover:text-orange-500">
          About
        </a>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out  
      ${sticky ? "bg-slate-300 shadow-md dark:bg-slate-300" : "bg-slate-200"}`}
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
                  {showMenuLeft ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
                </div>
                {showMenuLeft && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-slate-700 dark:text-white"
                    onClick={() => setShowMenuLeft(false)}
                  >
                    {navItems}
                  </ul>
                )}
              </div>
              <Link to="/" className="text-2xl font-serif cursor-pointer text-gray-900 dark:text-black">
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
                <label className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-100 dark:bg-slate-300">
                  <input
                    type="text"
                    className="grow outline-none rounded-md px-1 bg-gray-100 dark:bg-slate-300 dark:text-black"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <HiSearch className="w-4 h-4 opacity-70" />
                </label>
              </form>
              <label className="swap swap-rotate">
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
                    className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
                    onClick={() => setShowMenuRight(!showMenuRight)}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://cdn.onlinewebfonts.com/svg/img_206976.png"
                      alt="Your profile"
                    />
                  </button>
                  {showMenuRight && (
                    <ul className="dropdown-content absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-slate-700 dark:text-white">
                      <li className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                        <Link to="/">About Us</Link>
                      </li>
                      <li className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                        <Link to="/">Settings</Link>
                      </li>
                      <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-600">
                        <Logout />
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div className="">
                  <a
                    className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-700 duration-300 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
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
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform transform ${
          sticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full bg-slate-300 dark:bg-slate-500 shadow-md py-2 flex justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "home" ? "text-orange-500" : "text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <HiHome className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/showbook"
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "soenotes" ? "text-orange-500" : "text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("soenotes")}
          >
            <HiBookOpen className="w-6 h-6" />
            <span className="text-xs">SoeNotes</span>
          </Link>
          <Link
            to="/mock"
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "entrance" ? "text-orange-500" : "text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("entrance")}
          >
            <HiClipboardList className="w-6 h-6" />
            <span className="text-xs">Entrance Test</span>
          </Link>
          <Link
            to="/quizresult"
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "results" ? "text-orange-500" : "text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("results")}
          >
            <HiUserCircle className="w-6 h-6" />
            <span className="text-xs">Results</span>
          </Link>
          <Link
            to="/about"
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "about" ? "text-orange-500" : "text-gray-700 dark:text-gray-300"
            }`}
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
