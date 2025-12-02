import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config/baseurl";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="flex h-screen bg-gray-50 dark:bg-[#0e0e0e] text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto px-40 max-lg:px-10 bg-white dark:bg-[#0e0e0e]">
        {/* Profile Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-start gap-8">
            {/* Profile Avatar */}
            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-purple-500">
              <img className="rounded-3xl" src={avatar} alt="" />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl max-sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
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
          <button className="px-6 py-2 max-sm:px-3 max-sm:py-1 max-sm:text-xs border-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-100 dark:hover:bg-blue-500 dark:hover:text-white transition-all rounded-lg">
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Badges Box */}
          <div className="col-span-1 p-6 rounded-2xl bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600">
            <div className="flex items-start justify-between">
              <h3 className="font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                Badges
              </h3>
              <p className="font-semibold dark:white text-text-slate-700">
                Current: Bronze
              </p>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>Bronze : Initial Badge</p>
              <p>Silver : After answering 10 questions</p>
              <p>Gold : After answering 50 questions</p>
            </div>
          </div>

          {/* Answers Box */}
          <div className="col-span-1 p-6 rounded-2xl bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-500">
            <div className="flex items-start justify-between font-semibold">
              <h3 className="font-bold mb-3 text-green-800 dark:text-green-200">
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
          <div className="col-span-1 p-6 rounded-2xl bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-500">
            <div className="flex items-start justify-between">
              <h3 className="font-bold mb-3 text-green-800 dark:text-green-200">
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
          <div className="col-span-1 p-6 rounded-2xl bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-500">
            <div className="flex items-start justify-between">
              <h3 className="font-bold mb-3 text-green-800 dark:text-green-200">
                Live Questions Ongoing
              </h3>
              <p className="font-semibold">Total: {allRooms}</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Live questions how many asked
            </p>
          </div>

          {/* Tags Box */}
          <div className="col-span-2 p-6 rounded-2xl bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-500">
            <h3 className="font-bold mb-3 text-green-800 dark:text-green-200">
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
