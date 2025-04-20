import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { BASE_URL } from "../../config/baseurl";

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

const FullPageTags = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".main-category-tag",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      gsap.fromTo(
        `.subcategory-container-${selectedCategory}`,
        { opacity: 0, y: 10, display: "none" },
        {
          opacity: 1,
          y: 0,
          display: "flex",
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [selectedCategory]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };

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
    // In a real application, you would send this data to your backend API
    console.log("Selected Subcategories:", selectedSubcategories);
    try {
      const response = await axios.post(
        BASE_URL + "/auth/select-tags",
        {
          selectedSubcategories,
        },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`min-h-screen w-full py-10 flex flex-col items-center ${
        darkMode
          ? "bg-neutral-900 text-neutral-100"
          : "bg-neutral-100 text-neutral-800"
      }`}
    >
      <div
        className={`bg-neutral-50 rounded-lg shadow-md p-10 w-4/5 max-w-4xl flex flex-col ${
          darkMode ? "bg-neutral-800 shadow-neutral-700" : "bg-neutral-50"
        }`}
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition duration-300 ease-in-out focus:outline-none ${
              darkMode ? "bg-neutral-700" : "bg-neutral-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition duration-300 ease-in-out ${
                darkMode ? "translate-x-full" : ""
              }`}
            />
          </button>
        </div>

        <h2 className="text-3xl font-semibold mb-8 text-center">
          Tell us what you're interested in
        </h2>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {tagsData.map((category) => (
            <button
              key={category.name}
              className={`main-category-tag px-4 py-2 rounded-full text-lg font-medium transition duration-200 ease-in-out ${
                selectedCategory === category.name
                  ? darkMode
                    ? "bg-blue-500 text-neutral-100 hover:bg-blue-600"
                    : "bg-blue-500 text-neutral-100 hover:bg-blue-600"
                  : darkMode
                  ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {tagsData.map((category) => (
          <div
            key={category.name}
            className={`subcategory-container subcategory-container-${
              category.name
            } flex flex-wrap gap-4 mt-6 transition-all duration-300 ease-in-out justify-center ${
              selectedCategory === category.name ? "flex" : "hidden"
            }`}
          >
            {category.subcategories.map((subcategory) => (
              <button
                key={subcategory}
                className={`px-4 py-2 rounded-full text-lg font-medium transition duration-200 ease-in-out ${
                  isSubcategorySelected(subcategory)
                    ? darkMode
                      ? "bg-green-500 text-neutral-100 hover:bg-green-600"
                      : "bg-green-500 text-neutral-100 hover:bg-green-600"
                    : darkMode
                    ? "bg-neutral-600 text-neutral-200 hover:bg-neutral-500"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300"
                }`}
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                {subcategory}
              </button>
            ))}
          </div>
        ))}

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSubmit}
            className={`bg-blue-600 text-neutral-100 py-3 px-8 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out ${
              darkMode ? "bg-blue-500 hover:bg-blue-600" : ""
            }`}
          >
            Submit Interests
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPageTags;
