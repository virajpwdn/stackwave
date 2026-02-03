import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Send } from "lucide-react";

import { BASE_URL } from "../../config/baseurl";
import socket from "../../utils/socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user.user);
  const { roomId } = useParams();
  console.log(roomId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(
        BASE_URL + "/message/all-messages/" + roomId,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setMessages(response.data.data);
    };

    getMessages();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect to socket
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("chat-message", ({ userId, text, senderName, avatar }) => {
      if (userId !== user._id) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: senderName,
            text: text,
            senderName,
            avatar: avatar,
          },
        ]);
      }
    });

    return () => {
      socket.off("chat-message");
    };
  }, [messages, roomId, user._id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add message to local state
    const messageObj = {
      id: Date.now(),
      senderId: user._id,
      text: newMessage,
      sender: user.firstName || "You",
      avatar: user.avatar,
    };
    setMessages((prev) => [...prev, messageObj]);

    // Send to socket
    socket.emit("send-message", {
      userId: user._id,
      text: newMessage,
      senderName: user.firstName || "Anonymous",
      avatar: user.avatar,
      roomKey: roomId,
    });

    setNewMessage("");
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 transition-colors duration-200 dark:bg-gray-800">
      {/* Chat header */}
      <div className="border-b border-gray-200 bg-white p-3 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Chat
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Room: {roomId}
        </p>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages?.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${
                message.senderId === user._id ? "justify-end" : "justify-start"
              }`}
            >
              {message.senderId !== user._id && (
                <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                  {/* {message.senderName.charAt(0).toUpperCase()} */}
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={message.avatar}
                    alt={message.senderName}
                  />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.senderId === user._id
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                } shadow-sm`}
              >
                {message.senderId !== user._id && (
                  <p className="mb-1 text-xs font-medium opacity-75">
                    {/* add sender name */}
                    {message.senderName}
                  </p>
                )}
                <p className="break-words">{message.text}</p>
              </div>

              {message.senderId === user._id && (
                <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-white">
                  {/* {message.senderName.charAt(0).toUpperCase()} */}
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={message.avatar}
                    alt={message.senderName}
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 bg-white p-3 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 bg-white p-2 text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 p-2 text-white transition-colors duration-200 hover:bg-blue-700"
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
