import { useState } from "react";
import { Link } from "react-router";

const Topbar = ({ questions }) => {
  console.log("first", questions);
  return (
    <div>
      <h1 className="text-2xl font-bold">Recent Questions</h1>
      <div>
        {questions?.map((item, idx) => {
          const date = item.createdAt
            ? new Date(parseInt(item.createdAt)).toLocaleDateString()
            : "N/A";

          return (
            <div key={idx} className="mt-2 flex items-center justify-between">
              <div className="my-3 flex flex-col gap-1">
                <h4 className="text-base font-medium leading-none">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {date}
                </p>
              </div>
              <Link
                to={`/view-question/${item.id}`}
                className="cursor-pointer border border-solid border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors duration-75 ease-in hover:bg-accent hover:text-gray-200 dark:text-gray-300"
              >
                View
              </Link>
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <button className="mt-5 rounded-md border border-transparent bg-accent px-4 py-2 font-semibold text-white transition-colors duration-75 ease-in hover:border hover:bg-transparent hover:text-black">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
