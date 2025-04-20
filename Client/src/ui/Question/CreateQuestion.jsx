import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, Tag, HelpCircle } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const formRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    console.log({ title, content, tags });
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
    setTags(tags.filter(tag => tag !== tagToRemove));
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
    <div className="min-h-screen flex bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-all">
      {/* Sidebar component - 25% width */}
      <div className="w-1/4 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar (full width when open) */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content - 75% width */}
      <main className="w-full md:w-3/4 px-4 py-8 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">Ask a Question</h1>
          
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-700 dark:text-blue-300">Tips for a great question</h3>
                <ul className="mt-2 text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• Be specific and provide details</li>
                  <li>• Explain what you've tried so far</li>
                  <li>• Include code examples if relevant</li>
                </ul>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Question Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to center a div in CSS?"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="content"
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Include all the information someone would need to answer your question..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm flex items-center">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
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
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tags (e.g. javascript, react, css)"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-l-xl bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <Tag className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all w-full sm:w-fit"
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
