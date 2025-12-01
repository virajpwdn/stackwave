import React from "react";
import Code from "./Code";
import Chat from "./Chat";

const CodeEditor = () => {
  return (
    <div className="w-full mx-auto h-screen dark:bg-gray-900 overflow-hidden rounded-lg shadow-lg transition-colors duration-200">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left panel - 25% width on desktop, full width on mobile */}
        <div className="w-full md:w-1/4 h-1/2 md:h-full bg-gray-100 dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
          {/* Left panel content will go here */}
          <Chat />
        </div>

        {/* Right panel - 75% width on desktop, full width on mobile */}
        <div className="w-full md:w-3/4 h-1/2 md:h-full bg-gray-50 dark:bg-gray-850">
          {/* Right panel content will go here */}
          <Code />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
