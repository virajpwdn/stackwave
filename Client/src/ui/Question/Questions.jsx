import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { gsap } from "gsap";

import Sidebar from "../../components/Sidebar";
import { BASE_URL } from "../../config/baseurl";

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
        const res = await axios.get(
          `${BASE_URL}/questions/all-questions?limit=5`
        );
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
          ease: "power3.out",
        }
      );
    }
  }, [questions]);

  // Removed toggleSidebar function and isSidebarOpen state
  // Removed useEffect for sidebar animation

  const renderQuestionCard = (question) => (
    <div
      key={question._id}
      className="group cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
      onClick={() => navigate(`/view-question/${question._id}`)}
    >
      <h2 className="break-words text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {question.title}
      </h2>
      <p className="mt-2 break-words text-sm text-gray-600 dark:text-gray-300">
        {question.content?.length > 150
          ? `${question.content.substring(0, 150)}...`
          : question.content}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-blue-600 dark:text-blue-400">
          Asked by {question.author?.username || "Anonymous"}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

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

      {/* Removed mobile sidebar toggle button */}
      {/* Removed sidebarRef and related animation code */}

      {/* Main Content - 75% width */}
      <main className="w-full px-4 py-8 transition-all sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Newest Questions
            </h1>
            <button
              onClick={createQuestionHandler}
              className="w-full rounded-xl bg-blue-600 px-5 py-2 text-center font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-xl dark:bg-blue-700 dark:hover:bg-blue-600 sm:w-fit"
            >
              Ask Question
            </button>
          </div>

          {/* Subheader */}
          <p className="mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing the latest questions asked by our developers
          </p>

          {/* Loading state */}
          {loading && (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600 dark:border-blue-400"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Questions List */}
          {!loading && !error && (
            <div ref={containerRef} className="flex flex-col gap-6">
              {questions.length > 0 ? (
                questions.map(renderQuestionCard)
              ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800">
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    No questions found.
                  </p>
                  <button
                    onClick={createQuestionHandler}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
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
