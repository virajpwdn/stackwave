import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Menu, Moon, Search, Sun, Video, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const store = useSelector((store) => store.user.user);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };
  const redirectTo = store && store._id ? "/feed" : "/";
  return (
    <nav className="w-full bg-white text-black shadow-md dark:bg-black dark:text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={redirectTo} className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 md:text-2xl">
                STACKWAVE
              </h1>
            </Link>
          </div>

          {/* Center section - search bar (hidden on mobile) */}
          <div className="mx-auto hidden max-w-lg flex-1 items-center justify-center px-4 md:flex">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Right section - theme toggle and create live room button */}
          <div className="mr-10 flex items-center">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Create Live Room button - hidden on mobile */}
            <button
              onClick={() => navigate("/live-rooms")}
              className="ml-4 hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 md:flex"
            >
              <Video size={18} />
              Create Live Room
            </button>
          </div>
        </div>
      </div>

      {/* Remove mobile menu section completely */}
    </nav>
  );
};

export default Navbar;
