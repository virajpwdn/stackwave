import React from "react";

import Chat from "./Chat";
import Code from "./Code";

const CodeEditor = () => {
  return (
    <div className="mx-auto h-screen w-full overflow-hidden rounded-lg shadow-lg transition-colors duration-200 dark:bg-gray-900">
      <div className="flex h-full flex-col md:flex-row">
        {/* Left panel - 25% width on desktop, full width on mobile */}
        <div className="h-1/2 w-full border-b border-gray-200 bg-gray-100 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800 md:h-full md:w-1/4 md:border-b-0 md:border-r">
          {/* Left panel content will go here */}
          <Chat />
        </div>

        {/* Right panel - 75% width on desktop, full width on mobile */}
        <div className="dark:bg-gray-850 h-1/2 w-full bg-gray-50 md:h-full md:w-3/4">
          {/* Right panel content will go here */}
          <Code />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
