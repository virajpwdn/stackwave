import React, { useState } from "react";

import { X } from "lucide-react";

import Sidebar from "../../../components/Sidebar";

const CreateRoom = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
      {/* Sidebar component - 25% width */}
      <div className="hidden w-1/4 md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content - 75% width */}
      <main className="w-full px-4 py-8 transition-all sm:px-6 md:w-3/4 lg:px-8">
        {/* Your existing content */}

        {/* Button to open modal */}
        <button
          onClick={openModal}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Open Modal
        </button>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl transition-all dark:bg-gray-900">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Modal Title
              </h3>
              <button
                onClick={closeModal}
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              {/* Add your content here */}
              <p className="text-gray-700 dark:text-gray-300">
                Modal content goes here
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 p-4 dark:border-gray-800">
              <button
                onClick={closeModal}
                className="rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
