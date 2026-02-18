import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { gsap } from "gsap";

import { BASE_URL } from "../../../config/baseurl";

const tagsData = [
  {
    name: "Frontend",
    subcategories: [
      "React",
      "Vue.js",
      "Angular",
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "Next.js",
    ],
  },
  {
    name: "Backend",
    subcategories: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "Flask",
      "Ruby on Rails",
      "RESTful APIs",
      "GraphQL",
    ],
  },
  {
    name: "Database",
    subcategories: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Firebase",
      "NoSQL",
    ],
  },
  {
    name: "Mobile",
    subcategories: [
      "React Native",
      "Flutter",
      "Android",
      "iOS",
      "Swift",
      "Kotlin",
    ],
  },
  {
    name: "DevOps",
    subcategories: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "CI/CD",
      "Jenkins",
      "Git",
    ],
  },
];

const TagSelectionPage = () => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Animation for initial load
  useEffect(() => {
    gsap.fromTo(
      ".tag-category",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => sub !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  const isSubcategorySelected = (subcategory) =>
    selectedSubcategories.includes(subcategory);

  const handleSubmit = async () => {
    if (selectedSubcategories.length < 3) {
      alert("Please select at least 3 tags to continue");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/select-tags`,
        { selectedSubcategories },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/feed"); // Navigate to home page after successful submission
      }
    } catch (error) {
      console.error("Error saving tags:", error);
    }
  };

  const handleSkip = () => {
    navigate("/feed");
  };

  // Filter tags based on search term
  const filteredTags = searchTerm
    ? tagsData
        .map((category) => ({
          ...category,
          subcategories: category.subcategories.filter((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.subcategories.length > 0)
    : tagsData;

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-4 py-10 text-black transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold">Personalize your feed</h1>
          <p className="mx-auto max-w-xl text-gray-600 dark:text-gray-400">
            Select at least 3 topics you're interested in to help us customize
            your feed. You can always change these later.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Selected tags count */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {selectedSubcategories.length} topics selected
          </span>
          {selectedSubcategories.length > 0 && (
            <button
              onClick={() => setSelectedSubcategories([])}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Tags sections */}
        <div className="mb-10 space-y-8">
          {filteredTags.map((category) => (
            <div key={category.name} className="tag-category">
              <h2 className="mb-4 text-xl font-semibold">{category.name}</h2>
              <div className="flex flex-wrap gap-3">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => handleSubcategoryClick(subcategory)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isSubcategorySelected(subcategory)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleSubmit}
            disabled={selectedSubcategories.length < 3}
            className={`rounded-lg px-8 py-3 font-medium text-white transition-colors ${
              selectedSubcategories.length < 3
                ? "cursor-not-allowed bg-blue-400 dark:bg-blue-500/50"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
            }`}
          >
            Save preferences
          </button>
          <button
            onClick={handleSkip}
            className="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSelectionPage;
