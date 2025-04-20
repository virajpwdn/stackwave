import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { gsap } from "gsap";
import { BASE_URL } from "../../config/baseurl";

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const containerRef = useRef();

  const createQuestionHandler = ()=>{
    try {
        
    } catch (error) {
        
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(BASE_URL + "/questions/all-questions?limit=5");
        console.log(res.data.data);
        setQuestions((res.data.data && res.data.data.flat()) || []);
        console.log(questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black dark:bg-[#0e0e0e] dark:text-white transition-all">
      {/* Sidebar */}
      <div className="lg:w-64 w-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Newest Questions</h1>
          <Link
            onClick={createQuestionHandler}
            to="/ask"
            className="bg-blue-600 text-white dark:bg-blue-500 px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shadow-md hover:shadow-xl w-full sm:w-fit text-center"
          >
            Ask Question
          </Link>
        </div>

        {/* Subheader */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-medium">
          Showing the latest 5 questions asked by our developers
        </p>

        {/* Questions List */}
        <div ref={containerRef} className="flex flex-col gap-6">
          {questions.map((question) => (
            <div
              key={question._id}
              className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <h2 className="text-xl font-semibold group-hover:underline break-words">
                {question.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm break-words">
                {question.content.length > 150
                  ? question.content.substring(0, 150) + "..."
                  : question.content}
              </p>
              <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                Asked by {question.author?.username || "Anonymous"}
              </div>
            </div>
          ))}

          {questions.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center">No questions found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Feed;