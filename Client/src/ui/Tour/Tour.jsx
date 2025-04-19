import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tour = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.utils.toArray(".fade-up").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const handleAccept = () => {
    navigate("/signup");
  };

  const handleDecline = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10 md:px-20 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 fade-up">
          👋 Welcome to StackWave Tour
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-gray-800 dark:text-gray-200">
          <p className="fade-up">
            StackWave is a platform where you can <strong>ask and answer technical questions</strong>. It's a knowledge-sharing community designed to help developers grow.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 fade-up">🏷️ Tags Section</h2>
          <p className="fade-up">
            Use tags to categorize your questions. This helps others discover and answer them more easily. Choose relevant tags to increase your chances of getting helpful answers.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 fade-up">💬 Asking Questions</h2>
          <p className="fade-up">
            Be clear and concise. Provide enough context and code snippets if needed. The better your question, the quicker you'll get valuable responses.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 fade-up">🎖️ Badge System</h2>
          <ul className="list-disc ml-6 space-y-2 fade-up">
            <li>You start with a <span className="text-yellow-700 dark:text-yellow-400 font-semibold">Bronze</span> badge.</li>
            <li>Answer 10 questions to earn a <span className="text-gray-500 dark:text-gray-300 font-semibold">Silver</span> badge.</li>
            <li>Answer 50 questions to unlock the prestigious <span className="text-yellow-500 dark:text-yellow-300 font-semibold">Gold</span> badge.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 fade-up">🚫 Respect Guidelines</h2>
          <p className="fade-up">
            Be respectful to other users. Use of abusive or harmful language will result in a permanent ban from the platform.
          </p>

          <div className="mt-10 p-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-900 fade-up">
            <p className="mb-4 text-gray-900 dark:text-white">
              ✅ Accept the terms to continue using StackWave.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Accept & Continue
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Click here if you do not accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;