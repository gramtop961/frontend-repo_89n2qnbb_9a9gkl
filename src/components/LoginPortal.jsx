import { motion } from "framer-motion";
import { School, GraduationCap, Shield, Users } from "lucide-react";

const roles = [
  { key: "student", label: "Student", icon: School, accent: "from-blue-500 to-cyan-400" },
  { key: "teacher", label: "Teacher", icon: GraduationCap, accent: "from-indigo-500 to-blue-500" },
  { key: "parent", label: "Parent", icon: Users, accent: "from-sky-500 to-teal-400" },
  { key: "admin", label: "Admin", icon: Shield, accent: "from-blue-600 to-indigo-600" },
];

export default function LoginPortal({ onLogin }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">TinkrVerse</span>
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            An AI-powered interactive learning platform for students, teachers, parents, and admins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((r, idx) => (
            <motion.button
              key={r.key}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onLogin({
                  role: r.key,
                  name: r.label === "Admin" ? "Avery" : r.label === "Teacher" ? "Jordan" : r.label === "Parent" ? "Riley" : "Alex",
                  grade: r.key === "student" ? "Grade 8" : r.key === "teacher" ? "Physics" : r.key === "parent" ? "Guardian" : "Superuser",
                  xp: 1240,
                  progress: 68,
                })
              }
              className={`group relative rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow text-left`}
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-tr ${r.accent} text-white grid place-items-center shadow-lg shadow-blue-500/20`}>
                <r.icon size={26} />
              </div>
              <div className="mt-4">
                <div className="text-lg font-semibold text-slate-900">{r.label}</div>
                <div className="text-sm text-slate-500">Personalized dashboard & tools</div>
              </div>
              <div className="absolute inset-x-6 bottom-6">
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: idx * 0.1 }}
                    className={`h-full bg-gradient-to-r ${r.accent}`}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
