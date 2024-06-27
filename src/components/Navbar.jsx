import React, { useEffect, useState, useRef } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { HiMenu, HiX, HiSun, HiMoon, HiSearch } from "react-icons/hi"; // Import icons from react-icons

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  const [showMenuLeft, setShowMenuLeft] = useState(false); // State for left dropdown menu
  const [showMenuRight, setShowMenuRight] = useState(false); // State for right dropdown menu

  const profileRef = useRef(null); // Ref for the profile dropdown

  // Apply the selected theme to the document element and body
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

  const [sticky, setSticky] = useState(false);

  // Add sticky class to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        event.target.closest(".navbar-end") === null // Check if the click is outside of the .navbar-end section
      ) {
        setShowMenuRight(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Define navigation items
  const navItems = (
    <>
      <li>
        <a href="/" className="hover:text-orange-500">
          Home
        </a>
      </li>
      <li>
        <a href="/notes-uploaded" className="hover:text-orange-500">
          Course
        </a>
      </li>
      <li>
        <a href="/mock" className="hover:text-orange-500">
          Mock Test
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
            <a className="text-2xl font-serif cursor-pointer text-gray-900 dark:text-black">
              SoeNotes
            </a>
          </div>
          <div className="navbar-end flex items-center space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-gray-900 dark:text-black">
                {navItems}
              </ul>
            </div>
            <div className="hidden md:flex items-center">
              <label className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-100 dark:bg-slate-300">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 bg-gray-100 dark:bg-slate-300 dark:text-black"
                  placeholder="Search"
                />
                <HiSearch className="w-4 h-4 opacity-70" />
              </label>
            </div>
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
                      Profile
                    </li>
                    <li className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600">
                      Settings
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
  );
}

export default Navbar;
