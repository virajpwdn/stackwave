import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import RefactorAI from "../ui/AI/RefactorAI";
import Login from "../ui/Auth/Login";
import Signup from "../ui/Auth/Signup";
import CodeEditor from "../ui/Editor/CodeEditor";
import Hero from "../ui/HeroPage/Hero";
import CreateQuestion from "../ui/Question/CreateQuestion";
import QuestionFeed from "../ui/Question/Questions";
import ViewQuestion from "../ui/Question/ViewQuestion";
import CreateRoom from "../ui/Room/CreateRoom";
import Room from "../ui/Room/Room";
import GuestDashboard from "../ui/settings/Settings";
import TagSelectionPage from "../ui/Tour/Tags";
import Tour from "../ui/Tour/Tour";
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

          <Route path="*" element={<QuestionFeed />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
