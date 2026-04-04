import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

import axios from "axios";

import { BASE_URL } from "../../../config/baseurl";
import Container from "../../Container";
import MarkdownRenderer from "./MarkDownRenderer";

const RAG = () => {
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  // const [textareaHeight, setTextareaHeight] = useState(44);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleTextChange = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const maxHeight = 200;
    const newHeight = Math.min(maxHeight, textarea.scrollHeight);
    textarea.style.height = `${newHeight}px`;
    // setTextareaHeight(newHeight);
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const formSubmitHandler = async () => {
    try {
      if (!text.trim()) return alert("Input text is empty");
      setMessages((prev) => [...prev, { senderType: "user", content: text }]);
      setText("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
        // setTextareaHeight(44);
      }

      const response = await axios.post(
        `${BASE_URL}/ai/retrival`,
        {
          query: text,
          // user_id: "a4bc04e0-24f3-4916-a167-ac5b51fe303d",
          // pesona_id: "6edf44cf-6b93-4d84-8177-5c2b89ddd92a",
          // role: "user",
        },
        { withCredentials: true }
      );

      console.log("response of AI -> ", response);
      setMessages((prev) => [
        ...prev,
        {
          content: response.data.response.llmResponse,
          senderType: "assistant",
        },
      ]);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  // Auto scroll to bottom when new messages arrive

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formSubmitHandler();
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(BASE_URL + "/ai/llm-chat", {
        withCredentials: true,
      });
      const rawMessages = response.data.data.results;

      // Transform each DB doc into two messages
      const formatted = rawMessages.flatMap((msg) => [
        { senderType: "user", content: msg.userQuery },
        { senderType: "assistant", content: msg.aiResponse },
      ]);

      setMessages(formatted);
    };
    getMessages();
  }, []);
  console.log("messages - ", messages);

  return (
    <Container size="sm" className="relative">
      <div className="flex h-screen flex-col">
        {/* Messages — takes all remaining space, scrolls internally */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-4">
            {messages.length <= 0 ? (
              <div className="flex h-full items-center justify-center text-gray-400">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 flex ${
                    msg.senderType === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-sm rounded-lg px-4 py-2 text-[17px] lg:max-w-md ${
                      msg.senderType === "user"
                        ? "rounded-br-none bg-gray-600 text-white"
                        : "min-w-full rounded-bl-none bg-transparent text-black"
                    }`}
                  >
                    <div className="break-words">
                      {msg.senderType === "user" ? (
                        msg.content
                      ) : (
                        <MarkdownRenderer mdContent={msg.content} />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input — naturally pinned to bottom, never overlaps */}
        <div className="w-full shrink-0">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-4">
            {/* Video background */}
            <video
              src={"/gradient.mp4"}
              className="absolute bottom-0 left-1/2 z-20 mb-5 h-44 w-full -translate-x-1/2 rounded-2xl object-cover"
              autoPlay
              loop
              muted
            />

            {/* TextArea */}
            <div
              className="relative z-30 mb-5 box-border rounded-2xl bg-gray-100"
              style={{ width: "calc(100% - 2rem)" }}
            >
              <div className="flex flex-col-reverse p-4">
                <textarea
                  onInput={handleTextChange}
                  ref={textareaRef}
                  placeholder="Ask your doubts"
                  className="w-full resize-none px-4 pt-2 font-sans text-black outline-none"
                  style={{
                    minHeight: "44px",
                    maxHeight: "200px",
                    overflow: "hidden",
                  }}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    handleTextChange();
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex w-full items-center justify-end px-4 py-2 sm:py-3">
                <button className="rounded-md bg-sky-500 px-2 py-1 transition-colors hover:bg-sky-600">
                  <IoMdSend className="text-xl text-white" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-sm">
            Ask doubts related to C++, SQL, DevOps, HTML, Git
          </p>
        </div>
      </div>
    </Container>
  );
};
export default RAG;
