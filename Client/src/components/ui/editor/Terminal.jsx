import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import socket from "../../../utils/socket";

const Terminal = ({ output }) => {
  const [terminalOutput, setTerminalOutput] = useState(output);
  const user = useSelector((store) => store.user.user);
  const userId = user._id;

  useEffect(() => {
    socket.connect();
    socket.on("terminal-output", ({ terminalOutput }) => {
      if (userId !== user._id) {
        setTerminalOutput(terminalOutput);
      }
      console.log(terminalOutput);
    });

    return () => {
      socket.off("terminal-output"); // cleanup
    };
  }, []);
  console.log("State output" + output);
  return (
    <div className="h-[50%] w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="flex h-8 items-center justify-between border-b border-gray-300 bg-gray-200 px-4 dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Terminal
        </span>
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="h-screen overflow-y-auto bg-white p-4 font-mono text-sm text-gray-800 dark:bg-gray-950 dark:text-gray-200">
        {output ? (
          <pre className="whitespace-pre-wrap">{output || terminalOutput}</pre>
        ) : (
          <div className="flex">
            <span className="mr-2 text-green-600 dark:text-green-400">$</span>
            <span className="text-gray-800 dark:text-gray-200">
              {terminalOutput}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
