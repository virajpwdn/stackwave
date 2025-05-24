import React from "react";
import heroImage from "../../assets/images/herodeveloper.webp";
import section2Img from "../../assets/images/stackwave questions.png";
import section3Img from "../../assets/images/livecodeeditor.png";
import section4Img from "../../assets/images/aicoderefactor.png";
import { Link, useNavigate } from "react-router";
import { Navigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  const data = [
    {
      title: "Ask Live Question",
      content:
        "Got stuck while coding? Don’t wait for answers—get instant help by asking your question live. Whether it’s a bug, a concept you're struggling with, or a quick code review, connect with developers in real time and get solutions faster than ever",
      photo: section2Img,
      idx: 1,
    },
    {
      title: "Collaborative Code Editor",
      content:
        "Fix coding errors together in real time using our collaborative code editor. Share your code with others, get instant feedback, and resolve bugs faster—all in a live, synced environment designed to streamline debugging and learning.",
      photo: section3Img,
      idx: 2,
    },
    {
      title: "Ask AI for Suggestions",
      content:
        "No active members online? No problem. Use our integrated AI assistant to get help anytime. From code refactorization to syntax fixes and best practice suggestions, the AI is always available to support you when you need guidance the most.",
      photo: section4Img,
      idx: 3,
    },
  ];

  const createAccountHandler = (type) => {
    if (type === "signup") navigate("/signup");
    else navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      <div className="section1 flex flex-col-reverse md:flex-row items-center">
        {/* Left Section */}
        <div className="left w-full md:w-1/2 flex flex-col max-md:items-center">
          {/* Desktop Heading */}
          <h1 className="text-6xl font-bold mt-10 md:mt-16 max-md:text-3xl text-gray-900 dark:text-white max-md:hidden">
            One Stop for <br /> All Your <br /> Development <br /> Challenges
          </h1>

          {/* Mobile Heading */}
          <h1
            className="text-6xl font-bold mt-10 md:mt-16 max-md:text-3xl text-gray-900 dark:text-white hidden
         max-md:inline-block max-md:text-center"
          >
            One Stop for All Your <br /> Development Challenges
          </h1>

          <h2 className="text-lg mt-5 leading-relaxed max-w-md text-gray-700 dark:text-gray-300 max-md:text-center">
            Tired of constantly switching between VS Code, Stack Overflow,
            ChatGPT, and Reddit just to resolve a single coding doubt? StackWave
            brings everything you need into one powerful platform.
          </h2>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button
              onClick={() => {
                createAccountHandler("signup");
              }}
              className="bg-[#2463EB] hover:bg-[#20c7ff] text-white font-medium transition-all duration-300 ease-in-out px-6 py-2 rounded-md max-sm:px-5"
            >
              Create Account
            </button>
            <button onClick={createAccountHandler} className="border border-zinc-700 dark:border-gray-500 text-gray-900 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-300 px-6 py-2 rounded-md">
              Login
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full md:w-1/2 mt-20 md:mt-5">
          <div className="w-full h-[400px] md:h-[600px]">
            <img
              className="h-full w-full object-cover rounded-xl"
              src={heroImage}
              alt="Developer Illustration"
            />
          </div>
        </div>
      </div>

      {data.map((elem) => {
        return (
          <div key={elem.idx} className="section2 mt-40">
            <h1 className="font-bold text-6xl text-center text-transparent bg-gradient-to-br from-blue-700 via-blue-300 to-blue-500 bg-clip-text max-sm:text-4xl max-sm:mb-5 flex items-center justify-center">
              {elem.title}
            </h1>
            <p className="w-[500px] mx-auto text-center mt-5 text-sm">
              {elem.content}
            </p>
            <div className="p-20 max-sm:p-5">
              <img
                className="h-full max-md:p-0 w-full object-cover rounded-xl shadow-lg shadow-zinc-400"
                src={elem.photo}
                alt="ask live question"
              />
            </div>
          </div>
        );
      })}

      <p className="text-center mt-32">
        © StackWave 2025 – All Rights Reserved
      </p>
    </div>
  );
};

export default Hero;

{
  /**
          <div className="section2 mt-40">
        <h1 className="font-bold text-6xl text-center text-transparent bg-gradient-to-br from-blue-700 via-blue-300 to-blue-500 bg-clip-text max-sm:text-4xl max-sm:mb-5">
          Collaborative Code Editor
        </h1>
        <div className="p-20 max-sm:p-5">
          <img
            className="h-full rounded-xl max-md:p-0 w-full object-cover shadow-lg shadow-zinc-400"
            src={section3Img}
            alt="live code editor"
          />
        </div>
      </div>

      <div className="section2 mt-40">
        <h1 className="font-bold text-6xl text-center text-transparent bg-gradient-to-br from-blue-700 via-blue-300 to-blue-500 bg-clip-text max-sm:text-4xl max-sm:mb-5">
          Ask AI for Suggestions
        </h1>
        <div className="p-20 max-sm:p-5">
          <img
            className="h-full rounded-xl max-md:p-0 w-full object-cover shadow-lg shadow-zinc-400"
            src={section4Img}
            alt="Ask Ai"
          />
        </div>
      </div>    
*/
}
