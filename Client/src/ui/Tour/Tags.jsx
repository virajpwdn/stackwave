import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/baseurl";

const tagsData = [
  {
    name: "Frontend",
    subcategories: [
      "React", "Vue.js", "Angular", "HTML", "CSS", 
      "JavaScript", "Tailwind CSS", "Next.js",
    ],
  },
  {
    name: "Backend",
    subcategories: [
      "Node.js", "Express.js", "Python", "Django", 
      "Flask", "Ruby on Rails", "RESTful APIs", "GraphQL",
    ],
  },
  {
    name: "Database",
    subcategories: [
      "MongoDB", "PostgreSQL", "MySQL", 
      "SQL Server", "Firebase", "NoSQL",
    ],
  },
  {
    name: "Mobile",
    subcategories: [
      "React Native", "Flutter", "Android", 
      "iOS", "Swift", "Kotlin",
    ],
  },
  {
    name: "DevOps",
    subcategories: [
      "Docker", "Kubernetes", "AWS", 
      "Azure", "CI/CD", "Jenkins", "Git",
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
        navigate("/"); // Navigate to home page after successful submission
      }
    } catch (error) {
      console.error("Error saving tags:", error);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  // Filter tags based on search term
  const filteredTags = searchTerm 
    ? tagsData.map(category => ({
        ...category,
        subcategories: category.subcategories.filter(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.subcategories.length > 0)
    : tagsData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center py-10 px-4 transition-colors duration-200">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Personalize your feed</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Select at least 3 topics you're interested in to help us customize your feed.
            You can always change these later.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Selected tags count */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            {selectedSubcategories.length} topics selected
          </span>
          {selectedSubcategories.length > 0 && (
            <button
              onClick={() => setSelectedSubcategories([])}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Tags sections */}
        <div className="space-y-8 mb-10">
          {filteredTags.map((category) => (
            <div key={category.name} className="tag-category">
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              <div className="flex flex-wrap gap-3">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => handleSubcategoryClick(subcategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isSubcategorySelected(subcategory)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={selectedSubcategories.length < 3}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
              selectedSubcategories.length < 3
                ? "bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
            }`}
          >
            Save preferences
          </button>
          <button
            onClick={handleSkip}
            className="px-8 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSelectionPage;
