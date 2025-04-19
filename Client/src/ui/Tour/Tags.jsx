import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const tagsData = [
  {
    category: 'Frontend',
    tags: ['React', 'Vue', 'Angular', 'Svelte']
  },
  {
    category: 'Backend',
    tags: ['Node.js', 'Express', 'Python', 'Django']
  },
  {
    category: 'Tools',
    tags: ['Docker', 'Git', 'AWS', 'MongoDB']
  }
];

const TagSelectionPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (activeCategory !== null) {
      // Animating the nested tags when they are displayed
      gsap.fromTo(
        `.tags-${activeCategory}`, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [activeCategory]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">Select Tags</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tagsData.map((category, index) => (
          <div key={index} className="space-y-4">
            <button
              className="w-full text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md shadow-md"
              onClick={() => setActiveCategory(activeCategory === index ? null : index)}
            >
              {category.category}
            </button>
            
            {activeCategory === index && (
              <div className={`tags-${index} flex flex-wrap gap-4 mt-4`}>
                {category.tags.map((tag, idx) => (
                  <button key={idx} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300">
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelectionPage;
