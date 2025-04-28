import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Code,
  Bold,
  Italic,
  List,
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
      console.log(response.data);
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
          targetType
        },
        { withCredentials: true }
      );
      console.log(res.data);
      // Update UI based on target type
      if (targetType === "question") {
        setQuestion({
          ...question,
          comments: [...(question.comments || []), res.data.data]
        });
      } else if (targetType === "answer") {
        setAnswers(answers.map(answer => 
          answer._id === targetId 
            ? { ...answer, comments: [...(answer.comments || []), res.data.data] }
            : answer
        ));
      }
      
      // Reset comment state
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
        setQuestion(res.data.data);
        setAnswers(res.data.data.answers || []);
      } catch (err) {
        console.error("Failed to fetch question:", err);
        setError("Failed to load question details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    //! TODO -> Create a aggeration pipeline on backend in one query you should get both questions and answers
    const fetchAnswers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/questions/get/answer/${id}`, {
          withCredentials: true,
        });
        console.log(res);
        setAnswers([...answers, res.data.data]);
        console.log(answers);
      } catch (error) {
        console.error("Failed to fetch question:", err);
        setError("Failed to load question details. Please try again later.");
      }
    };

    fetchAnswers();

    if (id) {
      fetchQuestionDetails();
    }
  }, [id]);

  useEffect(() => {
    if (!loading && question && contentRef.current) {
      // Animate question content
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

      // Animate answer form
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

      // Animate answers
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

  // Function to insert markdown syntax
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
          `\`\`\`\n${
            selectedText || "// code here with preserved formatting"
          }\n\`\`\`` +
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
    // Focus back on textarea after button click
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

      // Add the new answer to the list
      setAnswers([...answers, res.data.data]);
      setAnswerContent("");
      setPreviewMode(false);

      // Scroll to the new answer
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
      <div className="min-h-screen flex bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-all">
        <div className="w-1/4 hidden md:block">
          <Sidebar />
        </div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        <main className="w-full md:w-3/4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-all">
        <div className="w-1/4 hidden md:block">
          <Sidebar />
        </div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        <main className="w-full md:w-3/4 flex justify-center items-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-all">
      {/* Sidebar component - 25% width */}
      <div className="w-1/4 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sidebar />
      </div>

      {/* Main Content - 75% width */}
      <main className="w-full md:w-3/4 px-4 py-8 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-3xl mx-auto">
          {question && (
            <>
              {/* Question section */}
              <div ref={contentRef} className="mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {question.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {question.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        return (
                          <code
                            className={`${className || ""} ${
                              inline
                                ? ""
                                : "block p-2 bg-gray-100 dark:bg-gray-800 rounded"
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

                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
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

                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => {
                      upvoteHandler("upvote", question._id, "question");
                    }}
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{question.upVote || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <ThumbsDown className="w-5 h-5" />
                    <span>{question.downVote || 0}</span>
                  </button>
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === "question" ? null : "question")}
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{question.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {activeCommentId === "question" && (
                <div className="mt-4 w-full">
                  <div className="flex flex-col space-y-3">
                    {question.comments?.map((comment, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {comment.author?.username || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    ))}
                    <div className="flex mt-2">
                      <input
                        type="text"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSubmitComment(question._id, "question")}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-r-lg transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Answers section */}
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
                </h2>

                <div ref={answersRef} className="space-y-6">
                  {answers.map((answer) => (
                    <div
                      key={answer._id}
                      id={`answer-${answer._id}`}
                      className="p-6 bg-white dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <div className="prose dark:prose-invert max-w-none mb-4">
                        <ReactMarkdown
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              return (
                                <code
                                  className={`${className || ""} ${
                                    inline
                                      ? ""
                                      : "block p-2 bg-gray-100 dark:bg-gray-800 rounded"
                                  }`}
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {answer.content || ""}
                        </ReactMarkdown>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          Answered by{" "}
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {answer.author?.username || "Anonymous"}
                          </span>
                        </div>
                        <div>
                          {new Date(answer.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{answer.upVote || 0}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{answer.downVote || 0}</span>
                        </button>
                        <button 
                          onClick={() => setActiveCommentId(activeCommentId === answer._id ? null : answer._id)}
                          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{answer.comments?.length || 0}</span>
                        </button>
                      </div>

                      {activeCommentId === answer._id && (
                        <div className="mt-4 w-full">
                          <div className="flex flex-col space-y-3">
                            {answer.comments?.map((comment, index) => (
                              <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm">
                                <div className="flex justify-between">
                                  <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {comment.author?.username || "Anonymous"}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                              </div>
                            ))}
                            <div className="flex mt-2">
                              <input
                                type="text"
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleSubmitComment(answer._id, "answer")}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-r-lg transition-colors"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer form */}
              <div ref={answerFormRef} className="mb-10">
                <h2 className="text-xl font-bold mb-6">Your Answer</h2>

                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                  {/* Markdown toolbar */}
                  <div className="flex items-center space-x-2 mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-t-xl border border-gray-300 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => insertMarkdown("bold")}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("italic")}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("code")}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Code Block"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("list")}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <div className="flex-1"></div>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {previewMode ? "Edit" : "Preview"}
                    </button>
                  </div>

                  {/* Editor/Preview toggle */}
                  {previewMode ? (
                    <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-b-xl bg-white dark:bg-[#1a1a1a] text-black dark:text-white min-h-[200px] prose dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            return (
                              <code
                                className={`${className || ""} ${
                                  inline
                                    ? ""
                                    : "block p-2 bg-gray-100 dark:bg-gray-800 rounded"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-b-xl bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-mono"
                    />
                  )}

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all w-full sm:w-fit"
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
