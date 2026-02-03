import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import axios from "axios";
import gsap from "gsap";

import { BASE_URL } from "../../config/baseurl";
import { setUser } from "../../store/user.slice";

const Login = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

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
      dispatch(setUser(res.data.data));
      naviagte("/questions");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-neutral-200 px-4 transition-colors dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800">
      <form
        ref={formRef}
        onSubmit={loginHandler}
        className="w-full max-w-md space-y-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-xl transition-colors dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h2 className="text-center text-3xl font-bold text-neutral-900 dark:text-white">
          <span className="bg-gradient-to-br from-blue-700 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            StackWave
          </span>{" "}
          | Login
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-900 transition placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-900 transition placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700"
        >
          Log In
        </button>

        {/* Extra UX */}
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-600 transition hover:text-blue-700"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
