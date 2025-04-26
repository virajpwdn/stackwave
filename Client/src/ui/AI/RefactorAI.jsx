import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Code, Copy, Download } from "lucide-react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { BASE_URL } from "../../config/baseurl";

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center">
              <Code className="mr-2" /> AI Code Refactoring
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 flex items-center text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Editor
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original code section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <h2 className="font-medium">Original Code</h2>
            </div>
            <div className="h-[400px] sm:h-[500px] overflow-auto">
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
              <h2 className="font-medium">Refactored Code</h2>
              <div className="flex space-x-2">
                <button
                  className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => navigator.clipboard.writeText(prompt)}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-[600px] sm:h-[500px] overflow-auto">
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
