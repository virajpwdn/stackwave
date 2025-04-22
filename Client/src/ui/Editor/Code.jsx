import React from 'react';

const Code = () => {
  return (
    <div className="w-full mx-auto h-screen bg-white dark:bg-gray-900 overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-col h-full">
        {/* Top div - 20% height */}
        <div className="w-ful max-sm:h-1/4 h-[8%] bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Top section with two divs */}
          <div className="flex max-sm:flex-col gap-4 justify-between items-center p-4 h-full">
            {/* Left div */}
            <div className="flex items-center">
              <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>
            </div>
            
            {/* Right div with two buttons */}
            <div className="flex space-x-3">
              <div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                  AI Refactorization
                </button>
              </div>
              <div>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md transition-colors">
                  View AI Code
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom div - 80% height */}
        <div className="w-full max-sm:min-h-screen h-[92%] bg-gray-50 dark:bg-gray-800">
          {/* Bottom div content will go here */}
        </div>
      </div>
    </div>
  );
};

export default Code;
