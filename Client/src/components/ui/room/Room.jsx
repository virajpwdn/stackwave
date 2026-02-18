import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import axios from "axios";
import { Clock, Plus, Search, Users, Video, X } from "lucide-react";

import Sidebar from "../../../components/Sidebar";
import { BASE_URL } from "../../../config/baseurl";
import socket from "../../../utils/socket";

// import { Link, useNavigate } from "react-router";

const Room = () => {
  // Mock data for rooms
  const [room, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");

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
    <div className="flex min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
      {/* Sidebar component - 25% width */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content - 75% width */}
      <main className="w-full px-4 py-8 transition-all sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
              Live Rooms
            </h1>
            <button
              onClick={createRoomHandler}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-xl sm:w-fit"
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
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 pl-10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Rooms grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {room.map((room) => (
              <div
                key={room._id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                {/* Room header with live indicator */}
                <div className="relative">
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  {room.isLive && (
                    <span className="absolute right-3 top-3 flex items-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                      <span className="mr-1 h-2 w-2 animate-pulse rounded-full bg-white"></span>
                      LIVE
                    </span>
                  )}
                </div>

                {/* Room content */}
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {room.title}
                  </h3>

                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    Hosted by{" "}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {room.host}
                    </span>
                  </p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {room.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Room stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
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
                  <Link to={"/editor/" + room?.roomId}>
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700">
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
            <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center dark:border-gray-700 dark:bg-gray-800">
              <Video size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                No active rooms
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Be the first to create a live room and start the discussion!
              </p>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-xl">
                <Plus size={18} />
                Create Room
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Room Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl transition-all dark:bg-gray-900">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Room
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
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
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
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-700 dark:bg-gray-800">
                    <input
                      id="room-tags"
                      type="text"
                      placeholder="Add tags and press Enter"
                      className="min-w-[120px] flex-1 border-none bg-transparent py-1 text-gray-900 placeholder-gray-500 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      value={tagInput}
                      onChange={handleTagInput}
                      onKeyDown={handleTagKeyDown}
                      disabled={tags.length >= 5}
                    />
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    id="room-private"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
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
            <div className="flex justify-end gap-3 border-t border-gray-200 p-4 dark:border-gray-800">
              <button
                onClick={closeModal}
                className="rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={roomCreationHandler} // Direct click handler as backup
                type="button" // Changed from "submit" to ensure the click handler works
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
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
