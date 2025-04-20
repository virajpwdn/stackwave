import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { BASE_URL } from "../../config/baseurl";
import Sidebar from "../../components/Sidebar";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef();
  const navigate = useNavigate();

  const createQuestionHandler = () => {
    navigate("/ask-question");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/questions/all-questions?limit=5`);
        setQuestions(Array.isArray(res.data.data) ? res.data.data.flat() : []);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: "power3.out" 
        }
      );
    }
  }, [questions]);

  // Removed toggleSidebar function and isSidebarOpen state
  // Removed useEffect for sidebar animation

  const renderQuestionCard = (question) => (
    <div
      key={question._id}
      className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => navigate(`/view-question/${question._id}`)}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 break-words">
        {question.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm break-words">
        {question.content?.length > 150
          ? `${question.content.substring(0, 150)}...`
          : question.content}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags?.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 text-sm flex justify-between items-center">
        <span className="text-blue-600 dark:text-blue-400">Asked by {question.author?.username || "Anonymous"}</span>
        <span className="text-gray-500 dark:text-gray-400 text-xs">
          {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

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

      {/* Removed mobile sidebar toggle button */}
      {/* Removed sidebarRef and related animation code */}

      {/* Main Content - 75% width */}
      <main className="w-full md:w-3/4 px-4 py-8 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Newest Questions
            </h1>
            <button
              onClick={createQuestionHandler}
              className="bg-blue-600 dark:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md hover:shadow-xl w-full sm:w-fit text-center"
            >
              Ask Question
            </button>
          </div>

          {/* Subheader */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-medium">
            Showing the latest questions asked by our developers
          </p>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Questions List */}
          {!loading && !error && (
            <div ref={containerRef} className="flex flex-col gap-6">
              {questions.length > 0 ? (
                questions.map(renderQuestionCard)
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No questions found.</p>
                  <button
                    onClick={createQuestionHandler}
                    className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
                  >
                    Be the first to ask a question
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Questions;
