import React, { useEffect, useState } from 'react'
import socket from '../../utils/socket';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Terminal = ({output}) => {
  const [terminalOutput, setTerminalOutput] = useState(output);
  const user = useSelector((store) => store.user.user);
  const params = useParams();
  const roomKey = params.roomId || "";

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    
    socket.on("terminal-output", ({ userId, terminalOutput, roomKey: messageRoomKey }) => {
      // Only update if message is from another user and for this room
      if (userId !== user._id && messageRoomKey === roomKey) {
        setTerminalOutput(terminalOutput);
      }
      console.log(terminalOutput);
    });

    return () => {
      socket.off("terminal-output"); // cleanup
    };
  }, [user._id, roomKey]);

  // Update terminal output when prop changes
  useEffect(() => {
    setTerminalOutput(output);
  }, [output]);

  return (
    <div className="w-full h-[35%] bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between h-8 px-4 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Terminal</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-4 h-[calc(100%-2rem)] overflow-y-auto font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950">
        {terminalOutput ? (
          <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
        ) : (
          <div className="flex">
            <span className="text-green-600 dark:text-green-400 mr-2">$</span>
            <span className="text-gray-800 dark:text-gray-200">_</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
