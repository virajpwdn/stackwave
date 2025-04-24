import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../../config/baseurl";
import Editor from "@monaco-editor/react";
import Terminal from "./Terminal";
import {
  ChevronDown,
  Play,
  Code as CodeIcon,
  RefreshCw,
  Eye,
} from "lucide-react";

const Code = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(102); // Default to JavaScript
  const [code, setCode] = useState("// Write your code here");
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const menuRef = useRef(null);

  const themes = [
    { id: "vs", name: "Light" },
    { id: "vs-dark", name: "Dark" },
    { id: "hc-black", name: "High Contrast Dark" },
    { id: "hc-light", name: "High Contrast Light" },
  ];

  const [selectedTheme, setSelectedTheme] = useState("vs-dark"); // Default theme

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getAllLanguages = async () => {
      try {
        const response = await axios.get(BASE_URL + "/compiler/showlanguages", {
          withCredentials: true,
        });
        if (Array.isArray(response.data.data)) {
          setLanguages(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllLanguages();
  }, []);

  useEffect(() => {
    // Update editor language when selectedLanguage changes
    setEditorLanguage(selectedLanguage || "javascript");
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    const languageId = parseInt(e.target.value, 10);
    setSelectedLanguage(languageId);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
    setIsMenuOpen(false); // Close menu after action
  };

  const submitAnswer = () => {
    console.log("Submitting answer:", code);
    setIsMenuOpen(false); // Close menu after action
    // Add your submission logic here
  };

  const aiRefactorization = () => {
    console.log("AI Refactorization requested");
    setIsMenuOpen(false); // Close menu after action
    // Add your AI refactorization logic here
  };

  const viewAICode = () => {
    console.log("View AI Code requested");
    setIsMenuOpen(false); // Close menu after action
    // Add your view AI code logic here
  };

  const runCode = async () => {
    console.log("Running code:", code);
    setIsMenuOpen(false);

    try {
      const response = await axios.post(
        BASE_URL + "/compiler/create-submission",
        { code, selectedLanguage },
        { withCredentials: true }
      );
      const token = response.data.data.token;
      console.log(token);

      setTimeout(async ()=>{
        try {
          const responseResult = await axios.get(
            `${BASE_URL}/compiler/getanswers/${token}`
          );
          setTerminalOutput(responseResult.data.output)
          console.log(responseResult.data.output);
        } catch (error) {
          console.error(error);
        }
      }, 3000)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto h-screen bg-white dark:bg-gray-900 overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-col h-full">
        {/* Top div */}
        <div className="w-full h-[8%] bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center p-4 h-full">
            {/* Left div - Language selector */}
            <div className="flex items-center space-x-3">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages && languages.length > 0 ? (
                  languages.map((elem) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  ))
                ) : (
                  <option value={102} key={102}>
                    Javascript
                  </option>
                )}
              </select>

              <select
                value={selectedTheme}
                onChange={handleThemeChange}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Right div - Run button and Actions dropdown wrapped in one div */}
            <div className="flex items-center space-x-3">
              <button
                onClick={runCode}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
              >
                <Play className="mr-2 h-4 w-4" /> Run Code
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={toggleMenu}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700">
                    <div className="py-1">
                      <button
                        onClick={aiRefactorization}
                        className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" /> AI
                        Refactorization
                      </button>
                      <button
                        onClick={viewAICode}
                        className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Eye className="mr-2 h-4 w-4" /> View AI Code
                      </button>
                      <button
                        onClick={submitAnswer}
                        className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <CodeIcon className="mr-2 h-4 w-4" /> Submit Answer
                      </button>
                      <button
                        onClick={toggleTerminal}
                        className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <CodeIcon className="mr-2 h-4 w-4" /> Toggle Terminal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Editor div */}
        <div
          className={`w-full ${
            showTerminal ? "h-[65%]" : "h-[92%]"
          } bg-gray-50 dark:bg-gray-800`}
        >
          <Editor
            height="100%"
            defaultLanguage="javascript"
            language={editorLanguage}
            value={code}
            onChange={handleEditorChange}
            theme={selectedTheme}
            options={{
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              fontSize: 14,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Terminal */}
        {showTerminal && <Terminal output={terminalOutput} />}
      </div>
    </div>
  );
};

export default Code;
