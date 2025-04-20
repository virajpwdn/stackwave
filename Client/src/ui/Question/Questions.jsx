import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { gsap } from "gsap";
import { BASE_URL } from "../../config/baseurl";
import { Menu } from "lucide-react";

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();

  const createQuestionHandler = () => {
    navigate("/ask-question");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + "/questions/all-questions?limit=5");
        setQuestions((res.data.data && res.data.data.flat()) || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        {
          y: 20,
          opacity: 0,
        },
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

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="min-h-screen flex bg-white text-black">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`
        fixed lg:static lg:block top-0 left-0 h-full w-64 
        bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out z-40
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-10 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Newest Questions</h1>
          <button
            onClick={createQuestionHandler}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-xl w-full sm:w-fit text-center"
          >
            Ask Question
          </button>
        </div>

        {/* Subheader */}
        <p className="text-gray-500 text-sm mb-6 font-medium">
          Showing the latest questions asked by our developers
        </p>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Questions List */}
        {!loading && !error && (
          <div ref={containerRef} className="flex flex-col gap-6">
            {questions.map((question) => (
              <div
                key={question._id}
                className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <h2 className="text-xl font-semibold group-hover:text-blue-600 break-words">
                  {question.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm break-words">
                  {question.content.length > 150
                    ? question.content.substring(0, 150) + "..."
                    : question.content}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {question.tags && question.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-blue-600 flex justify-between items-center">
                  <span>Asked by {question.author?.username || "Anonymous"}</span>
                  <span className="text-gray-500 text-xs">
                    {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}

            {questions.length === 0 && !loading && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-500 mb-4">No questions found.</p>
                <button
                  onClick={createQuestionHandler}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  Be the first to ask a question
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;
