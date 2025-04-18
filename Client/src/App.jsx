import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Signup = () => {
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800 transition-colors">
      <form
        ref={formRef}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-xl p-8 space-y-6 transition-colors"
      >
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
          <span className="text-transparent bg-gradient-to-br from-blue-700 via-blue-300 to to-blue-500 bg-clip-text">StackWave</span> | Signup
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="developer@gmail.com"
            className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 shadow-sm"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
