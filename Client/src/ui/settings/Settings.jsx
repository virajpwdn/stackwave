import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import Sidebar from "../../components/Sidebar";
import { BASE_URL } from "../../config/baseurl";

export default function GuestDashboard() {
  const store = useSelector((store) => store.user.user);
  const [allQuestions, setAllQuestions] = useState(0);
  const [allAnswer, setAllAnswer] = useState(0);
  const [allRooms, setAllRooms] = useState(0);

  const fullName = store.firstName + " " + store.lastName;
  const avatar = store.avatar;

  const getAllQuestions = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `/questions/user/questions/${store._id}`,
        { withCredentials: true }
      );

      setAllQuestions(response.data.data.totalQuestion);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const getAllAnswer = async () => {
    try {
      const response = await axios.get(BASE_URL + `/answer/user/all/ans`, {
        withCredentials: true,
      });
      setAllAnswer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLiveRooms = async () => {
    try {
      const response = await axios.get(BASE_URL + "/room/room-by-id", {
        withCredentials: true,
      });
      setAllRooms(response.data.data);
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    if (store) {
      getAllQuestions();
      getAllAnswer();
      getAllLiveRooms();
    }
  }, [store]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-[#0e0e0e] dark:text-white">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white p-8 px-40 dark:bg-[#0e0e0e] max-lg:px-10">
        {/* Profile Section */}
        <div className="mb-12 flex items-start justify-between">
          <div className="flex items-start gap-8">
            {/* Profile Avatar */}
            <div className="h-40 w-40 rounded-3xl border-2 border-purple-500 bg-gradient-to-br from-purple-600 to-purple-900">
              <img className="rounded-3xl" src={avatar} alt="" />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white max-sm:text-xl">
                {store && fullName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-sm:text-xs">
                Member for platform {"{join date}"}
              </p>

              {/* Summary Box */}
              {/* <div className="mt-8 p-6 rounded-2xl bg-blue-100 dark:bg-blue-900 border-2 border-blue-400 dark:border-blue-500 max-w-md">
                <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3">
                  Summary
                </h3>
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-100 mb-2">
                  Total upvotes
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Reputation, when someone upvotes on the question posted by
                  loggedin user. He will receive badges.
                </p>
              </div> */}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="rounded-lg border-2 border-blue-500 bg-transparent px-6 py-2 text-blue-600 transition-all hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white max-sm:px-3 max-sm:py-1 max-sm:text-xs">
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Badges Box */}
          <div className="col-span-1 rounded-2xl border-2 border-yellow-400 bg-yellow-100 p-6 dark:border-yellow-600 dark:bg-yellow-900">
            <div className="flex items-start justify-between">
              <h3 className="mb-3 font-bold text-yellow-800 dark:text-yellow-200">
                Badges
              </h3>
              <p className="dark:white text-text-slate-700 font-semibold">
                Current: Bronze
              </p>
            </div>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p>Bronze : Initial Badge</p>
              <p>Silver : After answering 10 questions</p>
              <p>Gold : After answering 50 questions</p>
            </div>
          </div>

          {/* Answers Box */}
          <div className="col-span-1 rounded-2xl border-2 border-green-400 bg-green-100 p-6 dark:border-green-500 dark:bg-green-900">
            <div className="flex items-start justify-between font-semibold">
              <h3 className="mb-3 font-bold text-green-800 dark:text-green-200">
                Answers
              </h3>
              <p>Total: {allAnswer}</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              How many answers loggedin user have given add them over here with
              pagination
            </p>
          </div>

          {/* Questions Box */}
          <div className="col-span-1 rounded-2xl border-2 border-green-400 bg-green-100 p-6 dark:border-green-500 dark:bg-green-900">
            <div className="flex items-start justify-between">
              <h3 className="mb-3 font-bold text-green-800 dark:text-green-200">
                Questions
              </h3>
              <p className="font-semibold">Total: {allQuestions}</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              How many questions loggedin user have given add them over here
              with pagination
            </p>
          </div>

          {/* Live Questions Box */}
          <div className="col-span-1 rounded-2xl border-2 border-green-400 bg-green-100 p-6 dark:border-green-500 dark:bg-green-900">
            <div className="flex items-start justify-between">
              <h3 className="mb-3 font-bold text-green-800 dark:text-green-200">
                Live Questions Ongoing
              </h3>
              <p className="font-semibold">Total: {allRooms}</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Live questions how many asked
            </p>
          </div>

          {/* Tags Box */}
          <div className="col-span-2 rounded-2xl border-2 border-green-400 bg-green-100 p-6 dark:border-green-500 dark:bg-green-900">
            <h3 className="mb-3 font-bold text-green-800 dark:text-green-200">
              Tags
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {store.tags &&
                store.tags.map((usr, idx) => {
                  return <div>usr.tags</div>;
                })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
