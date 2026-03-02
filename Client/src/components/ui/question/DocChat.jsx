import { useState } from "react";
import { Link } from "react-router";

import { Send } from "lucide-react";

const DocChat = () => {
  const [chat, setChat] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [messages, setMessages] = useState([
    // {
    //   content:
    //     "Welcome to Dokyu Chat, ask your doubts related to the following topics",
    //   type: "ai",
    // },
    // { content: "DevOps", type: "ai" },
    // { content: "Java", type: "user" },
  ]);

  const chatSubmitHandler = () => {
    if (chat.trim().length === 0) return;
    setIsNew(false);
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
      {!isNew ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center gap-20">
          <div>
            <p className="pt-3 text-center text-4xl font-semibold">🌊</p>
            <h1 className="pt-3 text-xl font-semibold">
              Welcome to{" "}
              <span className="rounded-md border border-black p-1 text-black">
                Dockyu Chat
              </span>
            </h1>
          </div>
          <div className="block text-center">
            <Link className="block">Learn C++</Link>
            <Link className="block">How to setup nginx</Link>
            <Link className="block">How to containerised application</Link>
            <Link className="block">How to create branch on github</Link>
          </div>
        </div>
      )}

      {/* Input */}
      <div
        className={`flex items-center gap-2 border-t border-white/20 p-2 ${isNew && "absolute bottom-0 w-full"}`}
      >
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
