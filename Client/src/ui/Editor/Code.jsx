import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/baseurl";
import Editor from "@monaco-editor/react";
import Terminal from "./Terminal";

const Code = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(102); // Default to JavaScript
  const [code, setCode] = useState("// Write your code here");
  const [editorLanguage, setEditorLanguage] = useState("javascript");

  // Language mapping from API IDs to Monaco language identifiers
  // const themes = ["vs", "vs-dark", "hc-black", "my-cool-theme"];
  const themes = [
    {
      style: "vs",
      id: 1,
    },
    {
      style: "vs-dark",
      id: 2,
    },
    {
      style: "hc-black",
      id: 3,
    },
    {
      style: "my-cool-theme",
      id: 4,
    },
  ];

  const [theme, setTheme] = useState(themes);
  const [selectTheme, setSelectTheme] = useState();

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

  const handleEditorChange = (value) => {
    setCode(value);
    console.log(code);
  };

  const changeThemeHandler = (e) => {
    setSelectTheme(e.target.value);
  };

  return (
    <div className="w-full mx-auto h-screen bg-white dark:bg-gray-900 overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-col h-full">
        {/* Top div - 20% height */}
        <div className="w-full max-sm:h-1/4 h-[8%] bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Top section with two divs */}
          <div className="flex max-sm:flex-col gap-4 justify-between items-center p-4 h-full">
            {/* Left div */}
            <div className="flex items-center">
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
            </div>
            {/* changes */}
            <div className="flex items-center">
              <select
                value={selectTheme}
                onChange={changeThemeHandler}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {themes && themes.length > 0 ? (
                  themes.map((elem) => (
                    <option key={elem.id} value={elem.style}>
                      {elem.style}
                    </option>
                  ))
                ) : (
                  <option value={1} key={vs}>
                    vs
                  </option>
                )}
              </select>
            </div>

            {/* Right div with two buttons */}
            <div className="flex space-x-3">
              <div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                  AI Refactorization
                </button>
              </div>
              <div>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md transition-colors">
                  View AI Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom div - 80% height */}
        <div className="w-full max-sm:min-h-screen h-[92%] bg-gray-50 dark:bg-gray-800">
          <Editor
            height="100%"
            defaultLanguage={selectedLanguage}
            language={editorLanguage}
            value={code}
            onChange={handleEditorChange}
            theme={selectTheme}
            options={{
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              fontSize: 14,
              automaticLayout: true,
            }}
          />
        </div>
        <Terminal />
      </div>
    </div>
  );
};

export default Code;
