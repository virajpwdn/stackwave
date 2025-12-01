import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Tag,
  Save,
  MessageSquare,
  Video,
  ThumbsUp,
  ThumbsDown,
  FileText,
  MessageSquareText,
  Menu,
  X,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Hamburger menu button - always visible on mobile, fixed on right side */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="absolute top-3 right-4 z-50 p-2 rounded-md bg-blue-600 text-white md:hidden"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay - visible only when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar for both mobile and desktop */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:sticky top-0 left-0 h-screen w-64 
          bg-gray-100 dark:bg-black 
          text-black dark:text-white 
          p-4 
          transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
          z-40 md:z-auto
          shadow-lg md:shadow-none
          overflow-y-auto
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            {/* <h2 className="text-xl font-bold">Menu</h2> */}
            {/* Removed the extra close button that was here */}
          </div>

          {/* Main navigation */}
          <nav className="flex flex-col gap-3 flex-grow">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={20} className="text-blue-600 dark:text-blue-400" />
              <span>Home</span>
            </Link>

            <Link
              to="/questions"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
              <span>Questions</span>
            </Link>

            <Link
              to="/tags"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Tag size={20} className="text-blue-600 dark:text-blue-400" />
              <span>Tags</span>
            </Link>

            <Link
              to="/live-rooms"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Video size={20} className="text-blue-600 dark:text-blue-400" />
              <span>Live Rooms</span>
            </Link>

            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            {/* User activity section */}
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 mb-2">
              YOUR ACTIVITY
            </h3>

            <Link
              to="/my-answers"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquareText
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Answers</span>
            </Link>

            <Link
              to="/my-questions"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Questions</span>
            </Link>

            <Link
              to="/my-upvotes"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ThumbsUp
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Upvotes</span>
            </Link>

            <Link
              to="/my-downvotes"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ThumbsDown
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Downvotes</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2023 StackWave
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
