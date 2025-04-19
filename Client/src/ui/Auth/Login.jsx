import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { BASE_URL } from "../../config/baseurl";

const Login = () => {
  const formRef = useRef(null);

  const [email, setEmail] = useState("user12@gmail.com");
  const [password, setPassword] = useState("User@123");

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      // Redirect or set auth context here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800 transition-colors">
      <form
        ref={formRef}
        onSubmit={loginHandler}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-xl p-8 space-y-6 transition-colors"
      >
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
          <span className="text-transparent bg-gradient-to-br from-blue-700 via-blue-300 to-blue-500 bg-clip-text">
            StackWave
          </span>{" "}
          | Login
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 shadow-sm"
        >
          Log In
        </button>

        {/* Extra UX */}
        <p className="text-sm text-center text-neutral-500 dark:text-neutral-400">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
