import { useState } from "react";

import { Send } from "lucide-react";

const DocChat = () => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([
    {
      content:
        "Welcome to Dokyu Chat, ask your doubts related to the following topics",
      type: "ai",
    },
    { content: "DevOps", type: "ai" },
    { content: "Java", type: "user" },
  ]);

  const chatSubmitHandler = () => {
    if (chat.trim().length === 0) return;
    setMessages((prev) => {
      return [
        ...prev,
        {
          content: chat,
          type: "user",
        },
      ];
    });
    setChat("");
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute -right-1 bottom-[80px] flex h-[450px] w-80 flex-col rounded-md bg-[#C0B7B1] text-white shadow-md"
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mt-2 flex">
            {msg.type === "ai" ? (
              <div className="mr-auto max-w-[75%]">
                <p className="rounded-md bg-gray-700 p-2 text-base">
                  {msg.content}
                </p>
              </div>
            ) : (
              <div className="ml-auto max-w-[75%]">
                <p className="rounded-md bg-blue-500 p-2 text-base">
                  {msg.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-white/20 p-2">
        <input
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              chatSubmitHandler();
            }
          }}
          className="h-11 flex-1 rounded-md bg-gray-100 px-3 text-sm text-black outline-none"
          placeholder="Enter your message"
        />

        <button
          onClick={chatSubmitHandler}
          className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-500"
        >
          <Send size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
};
export default DocChat;
