import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import Sidebar from "../../../components/Sidebar";
import { BASE_URL } from "../../../config/baseurl";
import {
  barChartBox1,
  barChartBox2,
  chartBoxAnswers,
  chartBoxDownvote,
  chartBoxUpvote,
  chartBoxUser,
} from "../../../utils/data";
import AreaChartGraph from "./AreaChart";
import BarChartGraph from "./BarChart";
import ChartBox from "./ChartBox";
import PieChartGraph from "./PieChart";
import Topbar from "./Topbar";

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
      {/* TODO: API to integrate */}
      <div className="grid-responsive grid h-full w-full grid-cols-4 gap-5 overflow-y-auto p-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        <div className="div1 box col-span-1 row-span-3">
          <Topbar />
        </div>
        <div className="div2 box">
          <ChartBox {...chartBoxUser} />
        </div>
        <div className="div3 box">
          <ChartBox {...chartBoxAnswers} />
        </div>
        <div className="div4 box col-span-1 row-span-3">
          <PieChartGraph />
        </div>
        <div className="div5 box">
          <ChartBox {...chartBoxUpvote} />
        </div>
        <div className="div6 box">
          <ChartBox {...chartBoxDownvote} />
        </div>
        <div className="div7 box col-span-2 row-span-2 max-md:hidden">
          <AreaChartGraph />
        </div>
        <div className="div8 box">
          <BarChartGraph {...barChartBox1} />
        </div>
        <div className="div9 box">
          <BarChartGraph {...barChartBox2} />
        </div>
      </div>
    </div>
  );
}
