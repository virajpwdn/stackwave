import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";
import { gsap } from "gsap";
import {
  Bold,
  Bookmark,
  Code,
  Italic,
  List,
  MessageSquare,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import { BASE_URL } from "../../config/baseurl";

const ViewQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  const contentRef = useRef(null);
  const answerFormRef = useRef(null);
  const answersRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  const upvoteHandler = async (type, targetId, targetType) => {
    try {
      const response = await axios.post(
        BASE_URL + "/questions/vote",
        { type, targetId, targetType },
        { withCredentials: true }
      );
      const vote = response.data.data.votes;
      setQuestion({
        ...question,
        upVote: vote.upVoteCount,
        downVote: vote.downVote,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitComment = async (targetId, targetType) => {
    if (!commentContent.trim()) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/questions/comment`,
        {
          content: commentContent,
          authorId: user._id,
          targetId,
          targetType,
        },
        { withCredentials: true }
      );

      // Update UI based on target type
      if (targetType === "question") {
        setQuestion({
          ...question,
          comments: [...(question.comments || []), res.data.data],
        });
      } else if (targetType === "answer") {
        setAnswers(
          answers.map((answer) =>
            answer._id === targetId
              ? {
                  ...answer,
                  comments: [...(answer.comments || []), res.data.data],
                }
              : answer
          )
        );
      }

      setCommentContent("");
      setActiveCommentId(null);
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/questions/view/question/${id}`,
          { withCredentials: true }
        );
        console.log("RES -> ", res);
        setQuestion(res.data.data);
      } catch (err) {
        console.error("Failed to fetch question:", err);
        setError("Failed to load question details. Please try again later.");
      }
    };

    const fetchAnswers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/questions/get/answer/${id}`, {
          withCredentials: true,
        });
        console.log("Answers fetched:", res.data.data);
        // ✅ FIX: Set answers directly, don't use spread operator
        setAnswers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch answers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestionDetails();
      fetchAnswers();
    }
  }, [id]);

  useEffect(() => {
    if (!loading && question && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      if (answerFormRef.current) {
        gsap.fromTo(
          answerFormRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      if (answersRef.current && answersRef.current.children.length > 0) {
        gsap.fromTo(
          answersRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out",
          }
        );
      }
    }
  }, [loading, question, answers]);

  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById("answer-content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = answerContent.substring(start, end);
    let newText;

    switch (syntax) {
      case "bold":
        newText =
          answerContent.substring(0, start) +
          `**${selectedText || "bold text"}**` +
          answerContent.substring(end);
        break;
      case "italic":
        newText =
          answerContent.substring(0, start) +
          `*${selectedText || "italic text"}*` +
          answerContent.substring(end);
        break;
      case "code":
        newText =
          answerContent.substring(0, start) +
          `\`\`\`\n${selectedText || "// code here"}\n\`\`\`` +
          answerContent.substring(end);
        break;
      case "list":
        newText =
          answerContent.substring(0, start) +
          `\n- ${selectedText || "list item"}\n- another item\n` +
          answerContent.substring(end);
        break;
      default:
        newText = answerContent;
    }

    setAnswerContent(newText);
    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerContent.trim()) {
      alert("Please write an answer before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/questions/answer/create/${id}`,
        {
          content: answerContent,
          authorId: user._id,
        },
        { withCredentials: true }
      );

      setAnswers([...answers, res.data.data]);
      setAnswerContent("");
      setPreviewMode(false);

      setTimeout(() => {
        const newAnswer = document.getElementById(
          `answer-${res.data.data._id}`
        );
        if (newAnswer) {
          newAnswer.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      console.error("Failed to submit answer:", err);
      alert("Failed to submit your answer. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
        <div className="hidden w-1/4 md:block">
          <Sidebar />
        </div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        <main className="flex w-full items-center justify-center md:w-3/4">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600 dark:border-blue-400"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
        <div className="hidden w-1/4 md:block">
          <Sidebar />
        </div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        <main className="flex w-full items-center justify-center md:w-3/4">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
      <div className="hidden w-1/4 md:block">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <Sidebar />
      </div>

      <main className="w-full px-4 py-8 transition-all sm:px-6 md:w-3/4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {question && (
            <>
              {/* Question section */}
              <div ref={contentRef} className="mb-10">
                <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                  {question.title}
                </h1>
                <div className="mb-6 flex flex-wrap gap-2">
                  {question.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  <ReactMarkdown
                    components={{
                      code({ inline, className, children, ...props }) {
                        return (
                          <code
                            className={`${className || ""} ${
                              inline
                                ? ""
                                : "block rounded bg-gray-100 p-2 dark:bg-gray-800"
                            }`}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {question.content || ""}
                  </ReactMarkdown>
                </div>
                <div className="mb-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    Asked by{" "}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {question.author?.username || "Anonymous"}
                    </span>
                  </div>
                  <div>
                    {new Date(question.createdAt).toLocaleDateString()} at{" "}
                    {new Date(question.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div className="mb-6 flex items-center gap-4">
                  <button
                    onClick={() => {
                      upvoteHandler("upvote", question._id, "question");
                    }}
                    className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{question.upVote || 0}</span>
                  </button>
                  <button
                    onClick={() => {
                      upvoteHandler("downvote", question._id, "question");
                    }}
                    className="flex items-center gap-1 text-gray-600 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <ThumbsDown className="h-5 w-5" />
                    <span>{question.downVote || 0}</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveCommentId(
                        activeCommentId === "question" ? null : "question"
                      )
                    }
                    className="flex items-center gap-1 text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>{question.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 transition-colors hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {activeCommentId === "question" && (
                <div className="mb-10 mt-4 w-full">
                  <div className="flex flex-col space-y-3">
                    {question.comments?.map((comment, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-gray-50 p-3 text-sm dark:bg-gray-800/50"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {comment.author?.username || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-grow rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      />
                      <button
                        onClick={() =>
                          handleSubmitComment(question._id, "question")
                        }
                        className="rounded-r-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Answers section */}
              <div className="mb-10">
                <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-bold dark:border-gray-700">
                  {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
                </h2>
                <div ref={answersRef} className="space-y-6">
                  {answers.map((answer) => {
                    return (
                      <div
                        key={answer._id}
                        id={`answer-${answer._id}`}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/30"
                      >
                        <div className="prose dark:prose-invert mb-4 max-w-none">
                          <ReactMarkdown
                            components={{
                              code({ inline, className, children, ...props }) {
                                return (
                                  <code
                                    className={`${className || ""} ${
                                      inline
                                        ? ""
                                        : "block rounded bg-gray-100 p-2 dark:bg-gray-800"
                                    }`}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {answer.content || "No content"}
                          </ReactMarkdown>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            Answered by{" "}
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              {answer.authorId || "Anonymous"}
                            </span>
                          </div>
                          <div>
                            {new Date(answer.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{answer.upvoteCount || 0}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{answer.downVoteCount || 0}</span>
                          </button>
                          <button
                            onClick={() =>
                              setActiveCommentId(
                                activeCommentId === answer._id
                                  ? null
                                  : answer._id
                              )
                            }
                            className="flex items-center gap-1 text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>{answer.comments?.length || 0}</span>
                          </button>
                        </div>

                        {activeCommentId === answer._id && (
                          <div className="mt-4 w-full">
                            <div className="flex flex-col space-y-3">
                              {answer.comments?.map((comment, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg bg-gray-50 p-3 text-sm dark:bg-gray-800/50"
                                >
                                  <div className="flex justify-between">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">
                                      {comment.author?.username || "Anonymous"}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {new Date(
                                        comment.createdAt
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                                    {comment.content}
                                  </p>
                                </div>
                              ))}
                              <div className="mt-2 flex">
                                <input
                                  type="text"
                                  value={commentContent}
                                  onChange={(e) =>
                                    setCommentContent(e.target.value)
                                  }
                                  placeholder="Add a comment..."
                                  className="flex-grow rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                                />
                                <button
                                  onClick={() =>
                                    handleSubmitComment(answer._id, "answer")
                                  }
                                  className="rounded-r-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Answer form */}
              <div ref={answerFormRef} className="mb-10">
                <h2 className="mb-6 text-xl font-bold">Your Answer</h2>
                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                  <div className="mb-2 flex items-center space-x-2 rounded-t-xl border border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
                    <button
                      type="button"
                      onClick={() => insertMarkdown("bold")}
                      className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("italic")}
                      className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("code")}
                      className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Code Block"
                    >
                      <Code className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("list")}
                      className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="List"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <div className="flex-1"></div>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      {previewMode ? "Edit" : "Preview"}
                    </button>
                  </div>

                  {previewMode ? (
                    <div className="prose dark:prose-invert min-h-[200px] w-full max-w-none rounded-b-xl border border-gray-300 bg-white px-4 py-3 text-black dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white">
                      <ReactMarkdown
                        components={{
                          code({ inline, className, children, ...props }) {
                            return (
                              <code
                                className={`${className || ""} ${
                                  inline
                                    ? ""
                                    : "block rounded bg-gray-100 p-2 dark:bg-gray-800"
                                }`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {answerContent || ""}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <textarea
                      id="answer-content"
                      rows={8}
                      value={answerContent}
                      onChange={(e) => setAnswerContent(e.target.value)}
                      placeholder="Write your answer here... (Markdown supported)"
                      className="w-full resize-none rounded-b-xl border border-gray-300 bg-white px-4 py-3 font-mono text-black placeholder-gray-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-500"
                    />
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-xl sm:w-fit"
                  >
                    Post Your Answer
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewQuestion;
