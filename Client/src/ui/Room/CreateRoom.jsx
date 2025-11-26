import React, { useState } from 'react'
import { X } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const CreateRoom = () => {
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-all">
      {/* Sidebar component - 25% width */}
      <div className="w-1/4 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content - 75% width */}
      <main className="w-full md:w-3/4 px-4 py-8 sm:px-6 lg:px-8 transition-all">
        {/* Your existing content */}
        
        {/* Button to open modal */}
        <button 
          onClick={openModal}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Open Modal
        </button>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden transition-all">
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modal Title</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-6">
              {/* Add your content here */}
              <p className="text-gray-700 dark:text-gray-300">Modal content goes here</p>
            </div>
            
            {/* Modal footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-800">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateRoom
