import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "./home/Logout";
import { useAuth } from "../context/AuthProvider";
import {
  HiMenu, HiX, HiSun, HiMoon, HiHome, HiBookOpen,
  HiClipboardList, HiChartBar, HiInformationCircle, HiUser, HiChevronDown,
} from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faFileAlt, faBell, faChartBar } from "@fortawesome/free-solid-svg-icons";

const SEMS = Array.from({ length: 9 }, (_, i) => i);

function Navbar() {
  const [authUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null); // 'civil' | 'bct' | 'entrance' | null
  const [isLg, setIsLg] = useState(window.innerWidth >= 1024);

  const dropRef = useRef(null);

  // Active tab for mobile bottom nav
  const path = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      document.body.classList.add("dark");
      html.setAttribute("data-theme", "dark"); // sync DaisyUI theme
    } else {
      html.classList.remove("dark");
      document.body.classList.remove("dark");
      html.setAttribute("data-theme", "light"); // sync DaisyUI theme
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpenDrop(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setOpenDrop(null); }, [location.pathname]);

  const DEFAULT_AVATAR = "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png";
  const userImage = authUser?.userImage || DEFAULT_AVATAR;
  const userFullname = authUser?.fullname || "";

  const isActive = (href) => path === href || path.startsWith(href + "?");

  const linkCls = (href) =>
    `relative text-sm font-medium transition-colors duration-200 py-1 ${
      isActive(href)
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  const DropdownMenu = ({ label, href, items, id }) => (
    <li
      className="relative"
      onMouseEnter={() => setOpenDrop(id)}
      onMouseLeave={() => setOpenDrop(null)}
    >
      <Link
        to={href}
        className={`${linkCls(href)} flex items-center gap-1`}
      >
        {label}
        <HiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDrop === id ? "rotate-180" : ""}`} />
      </Link>
      {openDrop === id && (
        <ul className="absolute left-0 top-full pt-2 w-44 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 overflow-hidden">
            {items.map(({ label: l, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpenDrop(null)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {l}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      )}
    </li>
  );

  const navLinks = (
    <>
      <li>
        <Link to="/" className={linkCls("/")}>Home</Link>
      </li>
      <DropdownMenu
        id="civil"
        label="Civil Notes"
        href="/books-uploaded-civil"
        items={SEMS.map(s => ({ label: s === 0 ? "Pre-Entrance" : `Semester ${s}`, to: `/books-uploaded-civil?semester=${s}` }))}
      />
      <DropdownMenu
        id="bct"
        label="Computer Notes"
        href="/showbook"
        items={SEMS.map(s => ({ label: s === 0 ? "Pre-Entrance" : `Semester ${s}`, to: `/showbook?semester=${s}` }))}
      />
      <DropdownMenu
        id="entrance"
        label="Entrance Test"
        href="/mock"
        items={Array.from({ length: 10 }, (_, i) => ({ label: `${2071 + i}`, to: `/Mock${i}` }))}
      />
      <li>
        <Link to="/quizresult" className={linkCls("/quizresult")}>Results</Link>
      </li>
      <li>
        <Link to="/About" className={linkCls("/About")}>About</Link>
      </li>
    </>
  );

  return (
    <>
      {/* ── Top Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700"
            : "bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-0.5 shrink-0 select-none">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 leading-none">SOE</span>
            <span className="text-2xl font-light text-gray-400 dark:text-gray-500 leading-none">notes</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center" ref={dropRef}>
            <ul className="flex items-center gap-6">
              {navLinks}
            </ul>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>

            {/* Auth */}
            {authUser ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="hidden sm:flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 transition-colors">
                  <img
                    src={userImage}
                    alt={userFullname}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/30"
                    onError={e => { e.currentTarget.src = DEFAULT_AVATAR; }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate hidden md:block">
                    {userFullname}
                  </span>
                </Link>
                <Logout />
              </div>
            ) : (
              <button
                onClick={() => document.getElementById("my_modal_3").showModal()}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Login
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Open menu"
            >
              {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Login modal */}
      {!authUser && <Login />}

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="absolute top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <Link to="/" className="flex items-center gap-0.5">
                <span className="text-xl font-bold text-blue-600">SOE</span>
                <span className="text-xl font-light text-gray-400">notes</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
              <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <HiHome className="w-5 h-5 text-gray-400" /> Home
              </Link>
              {/* Civil Notes */}
              <details className="group">
                <summary className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer list-none transition-colors">
                  <HiBookOpen className="w-5 h-5 text-gray-400" /> Civil Notes
                  <HiChevronDown className="w-4 h-4 text-gray-400 ml-auto group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-0.5 ml-8 space-y-0.5">
                  {SEMS.map(s => (
                    <Link key={s} to={`/books-uploaded-civil?semester=${s}`}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {s === 0 ? "Pre-Entrance" : `Semester ${s}`}
                    </Link>
                  ))}
                </div>
              </details>
              {/* Computer Notes */}
              <details className="group">
                <summary className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer list-none transition-colors">
                  <HiBookOpen className="w-5 h-5 text-gray-400" /> Computer Notes
                  <HiChevronDown className="w-4 h-4 text-gray-400 ml-auto group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-0.5 ml-8 space-y-0.5">
                  {SEMS.map(s => (
                    <Link key={s} to={`/showbook?semester=${s}`}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {s === 0 ? "Pre-Entrance" : `Semester ${s}`}
                    </Link>
                  ))}
                </div>
              </details>
              {/* Entrance Test */}
              <details className="group">
                <summary className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer list-none transition-colors">
                  <HiClipboardList className="w-5 h-5 text-gray-400" /> Entrance Test
                  <HiChevronDown className="w-4 h-4 text-gray-400 ml-auto group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-0.5 ml-8 space-y-0.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Link key={i} to={`/Mock${i}`}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {2071 + i}
                    </Link>
                  ))}
                </div>
              </details>

              <Link to="/quizresult" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <HiChartBar className="w-5 h-5 text-gray-400" /> Test Results
              </Link>
              <Link to="/About" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <HiInformationCircle className="w-5 h-5 text-gray-400" /> About
              </Link>
              <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <HiUser className="w-5 h-5 text-gray-400" /> Profile
              </Link>
            </nav>

            {/* User section */}
            <div className="border-t border-gray-100 dark:border-gray-800 p-4">
              {authUser ? (
                <div className="flex items-center gap-3">
                  <img src={userImage} alt={userFullname}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                    onError={e => { e.currentTarget.src = DEFAULT_AVATAR; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{userFullname}</p>
                    <Link to="/profile" className="text-xs text-blue-500 hover:underline">View profile</Link>
                  </div>
                  <Logout />
                </div>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); document.getElementById("my_modal_3").showModal(); }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Mobile Navigation ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-14">
          {[
            { to: "/", icon: faHome, label: "Home" },
            { to: "/showbook", icon: faBook, label: "BCT" },
            { to: "/books-uploaded-civil", icon: faBook, label: "BCE" },
            { to: "/mock", icon: faFileAlt, label: "Mock" },
            { to: "/AdmissionGuidelines", icon: faBell, label: "Notice" },
          ].map(({ to, icon, label }) => {
            const active = path === to || path.startsWith(to + "?") || (to !== "/" && path.startsWith(to));
            return (
              <Link key={to} to={to}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                  active ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
