import React from "react";
import { Link, useNavigate } from "react-router";
import { Navigate } from "react-router";

import section4Img from "../../../assets/images/aicoderefactor.png";
import heroImage from "../../../assets/images/herodeveloper.webp";
import section3Img from "../../../assets/images/livecodeeditor.png";
import section2Img from "../../../assets/images/stackwave questions.png";

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
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-10">
      <div className="section1 flex flex-col-reverse items-center md:flex-row">
        {/* Left Section */}
        <div className="left flex w-full flex-col max-md:items-center md:w-1/2">
          {/* Desktop Heading */}
          <h1 className="mt-10 text-6xl font-bold text-gray-900 dark:text-white max-md:hidden max-md:text-3xl md:mt-16">
            One Stop for <br /> All Your <br /> Development <br /> Challenges
          </h1>

          {/* Mobile Heading */}
          <h1 className="mt-10 hidden text-6xl font-bold text-gray-900 dark:text-white max-md:inline-block max-md:text-center max-md:text-3xl md:mt-16">
            One Stop for All Your <br /> Development Challenges
          </h1>

          <h2 className="mt-5 max-w-md text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-md:text-center">
            Tired of constantly switching between VS Code, Stack Overflow,
            ChatGPT, and Reddit just to resolve a single coding doubt? StackWave
            brings everything you need into one powerful platform.
          </h2>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <button
              onClick={() => {
                createAccountHandler("signup");
              }}
              className="rounded-md bg-[#2463EB] px-6 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-[#20c7ff] max-sm:px-5"
            >
              Create Account
            </button>
            <button
              onClick={createAccountHandler}
              className="rounded-md border border-zinc-700 px-6 py-2 text-gray-900 transition-all duration-300 hover:bg-slate-100 dark:border-gray-500 dark:text-white dark:hover:bg-zinc-800"
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right mt-20 w-full md:mt-5 md:w-1/2">
          <div className="h-[400px] w-full md:h-[600px]">
            <img
              className="h-full w-full rounded-xl object-cover"
              src={heroImage}
              alt="Developer Illustration"
            />
          </div>
        </div>
      </div>

      {data.map((elem) => {
        return (
          <div key={elem.idx} className="section2 mt-40">
            <h1 className="flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-300 to-blue-500 bg-clip-text text-center text-6xl font-bold text-transparent max-sm:mb-5 max-sm:text-4xl">
              {elem.title}
            </h1>
            <p className="mx-auto mt-5 w-[500px] text-center text-sm">
              {elem.content}
            </p>
            <div className="p-20 max-sm:p-5">
              <img
                className="h-full w-full rounded-xl object-cover shadow-lg shadow-zinc-400 max-md:p-0"
                src={elem.photo}
                alt="ask live question"
              />
            </div>
          </div>
        );
      })}

      <p className="mt-32 text-center">
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
