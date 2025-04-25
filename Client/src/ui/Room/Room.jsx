import React, { useEffect, useState } from "react";
import { Video, Users, Clock, Plus, Search, X } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import socket from "../../utils/socket";
import axios from "axios";
import { BASE_URL } from "../../config/baseurl";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Room = () => {
  // Mock data for rooms
  const [room, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const store = useSelector((store) => store.Users);
  // console.log(store);

  useEffect(() => {
    socket.connect(); // or connect only after auth
    socket.on("connect", () => console.log("Connected: ", socket.id));

    const getRoom = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/room/all-rooms`, {
          withCredentials: true,
        });
        console.log(res.data.allRooms);
        setRooms(res.data.allRooms);
      } catch (error) {
        console.error(error);
      }
      return () => {
        socket.disconnect(); // cleanup on unmount
      };
    };
    getRoom();
  }, []);

  const userId = "6802426423f623fad9dd9728";

  const roomCreationHandler = async (e) => {
    console.log("Handler triggered", e);
    if (e) {
      e.preventDefault();
      console.log("Default prevented");
    }

    console.log("clicked");

    // Make sure socket is connected before emitting
    if (!socket.connected) {
      console.log("Socket not connected, attempting to connect...");
      socket.connect();
    }

    // Add error handling
    try {
      socket.emit("create-room", {
        title,
        userId,
      });
      console.log("Room creation event emitted");

      setShowModal(false);

      setTitle("");
      setDescription("");
      setTags([]);
      console.log("Done");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const createRoomHandler = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatDuration = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      // Parse the timestamp into a Date object
      const createdAt = new Date(timestamp);
      const now = new Date();

      // Calculate the difference in milliseconds
      const diffMs = now - createdAt;

      // Convert to hours and minutes
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      // Format the output
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    } catch (error) {
      console.error("Error formatting duration:", error);
      return "N/A";
    }
  };

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      if (tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

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
            <button
              onClick={createRoomHandler}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-md hover:shadow-xl w-full sm:w-fit"
            >
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
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Rooms grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {room.map((room) => (
              <div
                key={room._id}
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
                    Hosted by{" "}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {room.host}
                    </span>
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
                      <span>
                        {room.createdAt
                          ? formatDuration(room.createdAt)
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Join button */}
                  <Link to={"/editor/" + room.roomId}>
                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Video size={16} />
                      Join Room
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state (hidden when rooms exist) */}
          {room.length === 0 && (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Video size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No active rooms
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Be the first to create a live room and start the discussion!
              </p>
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-md hover:shadow-xl">
                <Plus size={18} />
                Create Room
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Room Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden transition-all">
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Room
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <form
                id="room-creation-form"
                onSubmit={roomCreationHandler}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="room-title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Room Title
                  </label>
                  <input
                    id="room-title"
                    type="text"
                    placeholder="Enter a descriptive title"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="room-language"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Programming Language
                  </label>
                  <select
                    id="room-language"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select a language</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="ruby">Ruby</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="room-tags"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tags
                  </label>
                  <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <input
                      id="room-tags"
                      type="text"
                      placeholder="Add tags and press Enter"
                      className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 py-1"
                      value={tagInput}
                      onChange={handleTagInput}
                      onKeyDown={handleTagKeyDown}
                      disabled={tags.length >= 5}
                    />
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1.5 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {tags.length >= 5
                      ? "Maximum of 5 tags reached"
                      : `Add up to ${
                          5 - tags.length
                        } more tags to help others find your room`}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="room-description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="room-description"
                    rows="3"
                    placeholder="What will you discuss in this room?"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    id="room-private"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="room-private"
                    className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Make this room private
                  </label>
                </div>
              </form>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={roomCreationHandler} // Direct click handler as backup
                type="button" // Changed from "submit" to ensure the click handler works
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
