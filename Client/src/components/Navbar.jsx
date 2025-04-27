
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Search, Video } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-white dark:bg-black text-black dark:text-white shadow-md w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                STACKWAVE
              </h1>
            </Link>
          </div>

          {/* Center section - search bar (hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Right section - theme toggle and create live room button */}
          <div className="flex items-center mr-10">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Create Live Room button - hidden on mobile */}
            <button onClick={()=>navigate('/live-rooms')} className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-4">
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

