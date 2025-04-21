import React, { useEffect } from 'react';
import { Video, Users, Clock, Plus, Search } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import socket from '../../utils/socket';

const Room = () => {
  // Mock data for rooms

  useEffect(() => {
    socket.connect(); // or connect only after auth
    socket.on("connect", () => console.log("Connected: ", socket.id));
  
    return () => {
      socket.disconnect(); // cleanup on unmount
    };
  }, []);



  const mockRooms = [
    {
      id: 1,
      title: "JavaScript Fundamentals Discussion",
      host: "Sarah Johnson",
      participants: 12,
      tags: ["JavaScript", "Web Development", "Beginners"],
      duration: "1h 20m",
      isLive: true
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      host: "Michael Chen",
      participants: 8,
      tags: ["React", "Hooks", "Frontend"],
      duration: "45m",
      isLive: true
    },
    {
      id: 3,
      title: "Building RESTful APIs with Node.js",
      host: "Alex Rodriguez",
      participants: 15,
      tags: ["Node.js", "API", "Backend"],
      duration: "2h 5m",
      isLive: true
    },
    {
      id: 4,
      title: "Data Structures for Coding Interviews",
      host: "Priya Patel",
      participants: 20,
      tags: ["Algorithms", "Data Structures", "Interviews"],
      duration: "1h 30m",
      isLive: true
    },
    {
      id: 5,
      title: "Introduction to TypeScript",
      host: "David Wilson",
      participants: 6,
      tags: ["TypeScript", "JavaScript", "Web Development"],
      duration: "55m",
      isLive: true
    }
  ];

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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Live Rooms
            </h1>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-md hover:shadow-xl w-full sm:w-fit">
              <Plus size={18} />
              Create Room
            </button>
          </div>

          {/* Search and filter */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
            </div>
          </div>

          {/* Rooms grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Room header with live indicator */}
                <div className="relative">
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  {room.isLive && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                </div>
                
                {/* Room content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {room.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Hosted by <span className="font-medium text-blue-600 dark:text-blue-400">{room.host}</span>
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Room stats */}
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{room.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{room.duration}</span>
                    </div>
                  </div>
                  
                  {/* Join button */}
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Video size={16} />
                    Join Room
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state (hidden when rooms exist) */}
          {mockRooms.length === 0 && (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Video size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No active rooms</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Be the first to create a live room and start the discussion!</p>
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-md hover:shadow-xl">
                <Plus size={18} />
                Create Room
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Room;
