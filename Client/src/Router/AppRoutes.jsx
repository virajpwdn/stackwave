import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Signup from "../ui/Auth/Signup";
import Login from "../ui/Auth/Login";
import Authentication from "./Authentication";
import Tour from "../ui/Tour/Tour";
import TagSelectionPage from "../ui/Tour/Tags";
import QuestionFeed from "../ui/Question/Questions";
import CreateQuestion from "../ui/Question/CreateQuestion";
import ViewQuestion from "../ui/Question/ViewQuestion";
import Navbar from "../components/Navbar";
import Room from "../ui/Room/Room";
import CreateRoom from "../ui/Room/CreateRoom";
import CodeEditor from "../ui/Editor/CodeEditor";

// Layout component that includes Navbar and renders children through Outlet
const Layout = () => {
  return (
    <>
      <Navbar />
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
          <Route path="/" element={<QuestionFeed />} />
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
          <Route path="/view-question/:id" element={<Authentication><ViewQuestion /></Authentication>} />
          <Route path="/live-rooms" element={<Room />} />

          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/editor" element={<CodeEditor />} />

          
          <Route path="*" element={<QuestionFeed />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
