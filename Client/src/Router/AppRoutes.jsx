import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import DataTable from "../components/ui/admin/DataTable";
import RefactorAI from "../components/ui/ai/RefactorAI";
import Login from "../components/ui/auth/Login";
import Signup from "../components/ui/auth/Signup";
import CodeEditor from "../components/ui/editor/CodeEditor";
import Hero from "../components/ui/heropage/Hero";
import CreateQuestion from "../components/ui/question/CreateQuestion";
import QuestionFeed from "../components/ui/question/Questions";
import ViewQuestion from "../components/ui/question/ViewQuestion";
import CreateRoom from "../components/ui/room/CreateRoom";
import Room from "../components/ui/room/Room";
import GuestDashboard from "../components/ui/settings/Settings";
import TagSelectionPage from "../components/ui/tour/Tags";
import Tour from "../components/ui/tour/Tour";
import User from "../components/ui/user/User";
import Authentication from "./Authentication";

// Layout component that includes Navbar and renders children through Outlet
const Layout = () => {
  const currUrl = window.location.pathname;
  return (
    <>
      {currUrl !== "/hero-page" && <Navbar />}
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Root route uses Layout component */}
        <Route element={<Layout />}>
          {/* All these routes will be rendered inside the Layout */}
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tour"
            element={
              <Authentication>
                <Tour />
              </Authentication>
            }
          />
          <Route path="/tags-selection" element={<TagSelectionPage />} />
          <Route path="/questions" element={<QuestionFeed />} />
          <Route
            path="/ask-question"
            element={
              <Authentication>
                <CreateQuestion />
              </Authentication>
            }
          />
          <Route
            path="/view-question/:id"
            element={
              <Authentication>
                <ViewQuestion />
              </Authentication>
            }
          />
          <Route
            path="/live-rooms"
            element={
              <Authentication>
                <Room />
              </Authentication>
            }
          />

          <Route
            path="/create-room"
            element={
              <Authentication>
                <CreateRoom />
              </Authentication>
            }
          />
          <Route
            path="/editor/:roomId"
            element={
              <Authentication>
                <CodeEditor />
              </Authentication>
            }
          />

          <Route path="/refactor-ai" element={<RefactorAI />} />
          <Route path="/hero-page" element={<Hero />} />
          <Route
            path="/settings"
            element={
              <Authentication>
                <GuestDashboard />
              </Authentication>
            }
          />

          <Route
            path="/admin"
            element={
              <Authentication>
                <DataTable />
              </Authentication>
            }
          />

          <Route
            path="/user/:id"
            element={
              <Authentication>
                <User />
              </Authentication>
            }
          />

          <Route path="*" element={<QuestionFeed />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
