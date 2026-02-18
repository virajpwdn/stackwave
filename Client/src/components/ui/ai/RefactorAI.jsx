import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Editor from "@monaco-editor/react";
import axios from "axios";
import { ArrowLeft, Code, Copy, Download } from "lucide-react";

import { BASE_URL } from "../../../config/baseurl";

const RefactorAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = location.state || {};
  const [prompt, setPrompt] = useState(code);

  useEffect(() => {
    const getUpdatedCode = async () => {
      try {
        const response = await axios.post(
          BASE_URL + "/ai/generate",
          { prompt },
          { withCredentials: true }
        );
        console.log(response.data.data);
        setPrompt(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUpdatedCode();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center text-xl font-bold sm:text-2xl">
              <Code className="mr-2" /> AI Code Refactoring
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Original code section */}
          <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md dark:bg-gray-800">
            <div className="border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-600 dark:bg-gray-700">
              <h2 className="font-medium">Original Code</h2>
            </div>
            <div className="h-[400px] overflow-auto sm:h-[500px]">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code || "// Original code will appear here"}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* Refactored code section */}
          <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-600 dark:bg-gray-700">
              <h2 className="font-medium">Refactored Code</h2>
              <div className="flex space-x-2">
                <button
                  className="rounded p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => navigator.clipboard.writeText(prompt)}
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button className="rounded p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-[600px] overflow-auto sm:h-[500px]">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={prompt}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  wordWrap: "on",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RefactorAI;
