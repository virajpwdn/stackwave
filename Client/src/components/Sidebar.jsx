import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for both mobile and desktop */}
      <aside 
        className={`
          fixed md:static top-0 left-0 h-screen w-64 
          bg-gray-100 dark:bg-black 
          text-black dark:text-white 
          p-4 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          z-40 md:z-auto
          shadow-lg md:shadow-none
          overflow-y-auto
        `}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-bold mb-6 md:hidden">Menu</h2>
          <nav className="flex flex-col gap-4 flex-grow">
            <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>🏠 Home</Link>
            <Link to="/questions" className="hover:underline" onClick={() => setIsOpen(false)}>💬 Questions</Link>
            <Link to="/tags" className="hover:underline" onClick={() => setIsOpen(false)}>🏷️ Tags</Link>
            <Link to="/saves" className="hover:underline" onClick={() => setIsOpen(false)}>💾 Saves</Link>
            <Link to="/chat" className="hover:underline" onClick={() => setIsOpen(false)}>💬 Chat</Link>
            <hr className="my-4 border-gray-400 dark:border-gray-700" />
            <p>Answers</p>
            <p>Questions</p>
            <p>Upvotes</p>
            <p>Downvotes</p>
            <p>Comments</p>
          </nav>
          <div className="mt-auto pt-4 border-t border-gray-400 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2023 StackWave</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
