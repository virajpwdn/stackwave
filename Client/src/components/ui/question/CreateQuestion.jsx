import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

import axios from "axios";
import { gsap } from "gsap";
import { Bold, Code, HelpCircle, Italic, List, Menu, Tag } from "lucide-react";

import Sidebar from "../../../components/Sidebar";
import { BASE_URL } from "../../../config/baseurl";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const formRef = useRef(null);
  const sidebarRef = useRef(null);
  const store = useSelector((state) => state.user.user);

  const authorId = store._id;

  // Function to insert markdown syntax
  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById("content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText;
    switch (syntax) {
      case "bold":
        newText =
          content.substring(0, start) +
          `**${selectedText || "bold text"}**` +
          content.substring(end);
        break;
      case "italic":
        newText =
          content.substring(0, start) +
          `*${selectedText || "italic text"}*` +
          content.substring(end);
        break;
      case "code":
        newText =
          content.substring(0, start) +
          `\`\`\`\n${selectedText || "code here"}\n\`\`\`` +
          content.substring(end);
        break;
      case "list":
        newText =
          content.substring(0, start) +
          `\n- ${selectedText || "list item"}\n- another item\n` +
          content.substring(end);
        break;
      default:
        newText = content;
    }

    setContent(newText);
    // Focus back on textarea after button click
    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    console.log({ title, content, tags });
    axios
      .post(
        BASE_URL + "/questions/create-question",
        { title, content, tags, authorId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      });
    setTitle("");
    setContent("");
    setTags([]);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (sidebarRef.current) {
      if (isSidebarOpen) {
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        gsap.to(sidebarRef.current, {
          x: "-100%",
          duration: 0.3,
          ease: "power3.in",
        });
      }
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
      {/* Sidebar component - 25% width */}
      <div className="hidden w-1/4 md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar (full width when open) */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content - 75% width */}
      <main className="w-full px-4 py-8 transition-all sm:px-6 md:w-3/4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-2xl font-bold sm:text-3xl md:mb-8 md:text-4xl">
            Ask a Question
          </h1>

          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <div className="flex items-start gap-3">
              <HelpCircle className="mt-0.5 h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium text-blue-700 dark:text-blue-300">
                  Tips for a great question
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  <li>• Be specific and provide details</li>
                  <li>• Explain what you've tried so far</li>
                  <li>• Include code examples if relevant</li>
                </ul>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Question Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to center a div in CSS?"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              {/* Markdown toolbar */}
              <div className="mb-2 flex items-center space-x-2 rounded-t-xl border border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
                <button
                  type="button"
                  onClick={() => insertMarkdown("bold")}
                  className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("italic")}
                  className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("code")}
                  className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Code Block"
                >
                  <Code className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("list")}
                  className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="List"
                >
                  <List className="h-4 w-4" />
                </button>
                <div className="flex-1"></div>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  {previewMode ? "Edit" : "Preview"}
                </button>
              </div>

              {/* Editor/Preview toggle */}
              {previewMode ? (
                <div className="prose dark:prose-invert min-h-[200px] w-full max-w-none rounded-b-xl border border-gray-300 bg-white px-4 py-3 text-black dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  id="content"
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Include all the information someone would need to answer your question... (Markdown supported)"
                  className="w-full resize-none rounded-b-xl border border-gray-300 bg-white px-4 py-3 font-mono text-black placeholder-gray-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-500"
                />
              )}
            </div>

            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium">
                Tags
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="Add tags (e.g. javascript, react, css)"
                  className="flex-1 rounded-l-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-r-xl border border-l-0 border-gray-300 bg-gray-100 px-4 py-3 transition-all hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <Tag className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-xl sm:w-fit"
              >
                Submit Question
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AskQuestion;
