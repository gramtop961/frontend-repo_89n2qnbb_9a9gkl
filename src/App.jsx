import { useState } from "react";
import Navbar from "./components/Navbar";
import LoginPortal from "./components/LoginPortal";
import RoleDashboard from "./components/RoleDashboard";
import SubjectsExplorer from "./components/SubjectsExplorer";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  const data = getDemoData();

  const handleLogin = (u) => {
    setUser(u);
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white text-slate-900">
      <Navbar user={user} onLogout={handleLogout} onNavigate={setView} />

      {view === "login" && <LoginPortal onLogin={handleLogin} />}

      {view === "dashboard" && user && (
        <RoleDashboard user={user} onExploreSubjects={() => setView("subjects")} />
      )}

      {view === "subjects" && <SubjectsExplorer data={data} />}

      <footer className="py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} TinkrVerse — AI-powered learning
      </footer>
    </div>
  );
}

function getDemoData() {
  return {
    subjects: [
      {
        id: "sci",
        name: "Science",
        chapters: [
          {
            id: "sci-1",
            title: "Forces and Motion",
            progress: 60,
            subtopics: [
              { id: "sci-1-1", title: "Newton's Laws" },
              { id: "sci-1-2", title: "Friction & Drag" },
              { id: "sci-1-3", title: "Circular Motion" },
            ],
          },
          {
            id: "sci-2",
            title: "Energy & Work",
            progress: 35,
            subtopics: [
              { id: "sci-2-1", title: "Kinetic & Potential Energy" },
              { id: "sci-2-2", title: "Conservation of Energy" },
            ],
          },
        ],
      },
      {
        id: "math",
        name: "Math",
        chapters: [
          {
            id: "math-1",
            title: "Algebra Basics",
            progress: 80,
            subtopics: [
              { id: "math-1-1", title: "Linear Equations" },
              { id: "math-1-2", title: "Factoring" },
            ],
          },
          {
            id: "math-2",
            title: "Geometry",
            progress: 20,
            subtopics: [
              { id: "math-2-1", title: "Angles" },
              { id: "math-2-2", title: "Triangles" },
              { id: "math-2-3", title: "Circles" },
            ],
          },
        ],
      },
      {
        id: "eng",
        name: "English",
        chapters: [
          {
            id: "eng-1",
            title: "Reading Comprehension",
            progress: 50,
            subtopics: [
              { id: "eng-1-1", title: "Main Idea" },
              { id: "eng-1-2", title: "Inference" },
            ],
          },
          {
            id: "eng-2",
            title: "Writing Skills",
            progress: 45,
            subtopics: [
              { id: "eng-2-1", title: "Paragraphs" },
              { id: "eng-2-2", title: "Persuasive Essays" },
            ],
          },
        ],
      },
    ],
  };
}
