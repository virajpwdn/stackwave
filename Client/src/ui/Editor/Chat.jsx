import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../config/baseurl";

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

    socket.on(
      "chat-message",
      ({ userId, text, senderName, avatar }) => {
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
      }
    );

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
      avatar: user.avatar
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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      {/* Chat header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Chat
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Room: {roomId}
        </p>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages?.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${
                message.senderId === user._id ? "justify-end" : "justify-start"
              }`}
            >
              {message.senderId !== user._id && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2">
                  {/* {message.senderName.charAt(0).toUpperCase()} */}
                  <img
                    className="rounded-full h-full w-full object-cover"
                    src={message.avatar}
                    alt={message.senderName}
                  />
                </div>
              )}

              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                  message.senderId === user._id
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                } shadow-sm`}
              >
                {message.senderId !== user._id && (
                  <p className="text-xs font-medium mb-1 opacity-75">
                    {/* add sender name */}
                    {message.senderName}
                  </p>
                )}
                <p className="break-words">{message.text}</p>
              </div>

              {message.senderId === user._id && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium ml-2">
                  {/* {message.senderName.charAt(0).toUpperCase()} */}
                  <img
                    className="rounded-full h-full w-full object-cover"
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
        className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
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
