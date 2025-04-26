import React, { useEffect, useState } from 'react'
import socket from '../../utils/socket';
import { useSelector } from 'react-redux';

const Terminal = ({output}) => {
  const [terminalOutput, setTerminalOutput] = useState(output);
  const user = useSelector((store) => store.user.user);
  const userId = user._id;

  useEffect(()=>{
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
  },[])
  console.log("State output" + output);
  return (
    <div className="w-full h-[50%] bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center  justify-between h-8 px-4 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Terminal</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-4 h-screen overflow-y-auto font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950">
        {output ? (
          <pre className="whitespace-pre-wrap">{output || terminalOutput }</pre>
        ) : (
          <div className="flex">
            <span className="text-green-600 dark:text-green-400 mr-2">$</span>
            <span className="text-gray-800 dark:text-gray-200">{terminalOutput}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
