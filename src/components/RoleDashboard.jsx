import { motion } from "framer-motion";
import { BookOpen, Trophy, Mic, ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function RoleDashboard({ user, onExploreSubjects }) {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-sm text-slate-500 capitalize">{user.role}</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Hi {user.name}, keep building your future.
            </h2>
            <p className="text-slate-600 mt-3 max-w-xl">
              Your progress updates in real-time across lessons, quizzes, projects, and more. Tap the AI assistant to ask anything or jump to a topic.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <Stat label="XP" value={user.xp.toLocaleString()} icon={<Trophy className="text-amber-500" size={18} />} />
              <Stat label="Grade/Track" value={user.grade} icon={<BookOpen className="text-blue-500" size={18} />} />
              <div className="rounded-xl border border-slate-200 p-4 bg-white">
                <div className="text-xs text-slate-500 mb-2">Progress</div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${user.progress}%` }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400"
                  />
                </div>
                <div className="mt-2 text-xs text-slate-600">{user.progress}% complete</div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onExploreSubjects}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-5 py-2.5 shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition"
              >
                Explore Subjects <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative h-[420px] rounded-3xl border border-slate-200 overflow-hidden bg-white">
            <div className="absolute inset-0">
              <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 pointer-events-none" />
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <button
                className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white/80 backdrop-blur border border-slate-200 shadow-md hover:shadow-lg transition"
                onClick={() => alert("Voice assistant coming soon! Say: 'Open Chapter 2 in Science'.")}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse" />
                <Mic size={18} className="text-blue-600" />
                <span className="text-slate-700">Ask the AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 bg-white">
      <div className="text-xs text-slate-500 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}
