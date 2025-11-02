import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ChevronDown, Play, Gamepad2, FlaskConical, ListChecks, Lightbulb } from "lucide-react";

export default function SubjectsExplorer({ data }) {
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activityModal, setActivityModal] = useState(null); // { type, title }

  const subjects = data.subjects;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Subjects</h3>
            <p className="text-slate-600">Tap a subject to explore chapters and interactive subtopics.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSubject((p) => (p?.id === s.id ? null : s))}
              className={`relative rounded-2xl p-5 bg-white border ${activeSubject?.id === s.id ? "border-blue-400 shadow-blue-500/20" : "border-slate-200"} shadow-sm hover:shadow-lg transition text-left`}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white grid place-items-center">
                  <Book size={20} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">{s.name}</div>
                  <div className="text-sm text-slate-500">{s.chapters.length} chapters</div>
                </div>
              </div>
              <ChevronDown className={`absolute right-5 top-5 transition-transform ${activeSubject?.id === s.id ? "rotate-180" : ""}`} />

              <AnimatePresence initial={false}>
                {activeSubject?.id === s.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3">
                      {s.chapters.map((c) => (
                        <div key={c.id} className="rounded-xl border border-slate-200 overflow-hidden">
                          <button
                            onClick={() => setActiveChapter((prev) => (prev?.id === c.id ? null : c))}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition"
                          >
                            <div className="font-medium text-slate-800">{c.title}</div>
                            <div className="flex items-center gap-3 text-xs text-slate-600">
                              <Road value={c.progress} />
                              <ChevronDown className={`transition-transform ${activeChapter?.id === c.id ? "rotate-180" : ""}`} size={16} />
                            </div>
                          </button>
                          <AnimatePresence initial={false}>
                            {activeChapter?.id === c.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 py-4 bg-white border-t border-slate-200"
                              >
                                <div className="space-y-4">
                                  {c.subtopics.map((st) => (
                                    <div key={st.id} className="rounded-lg border border-slate-200 p-3">
                                      <div className="font-medium text-slate-800">{st.title}</div>
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        <Chip icon={Gamepad2} label="Simulations" onClick={() => setActivityModal({ type: "simulation", title: st.title })} />
                                        <Chip icon={FlaskConical} label="Experiments" onClick={() => setActivityModal({ type: "experiment", title: st.title })} />
                                        <Chip icon={ListChecks} label="Quizzes" onClick={() => setActivityModal({ type: "quiz", title: st.title })} />
                                        <Chip icon={Play} label="Videos" onClick={() => setActivityModal({ type: "video", title: st.title })} />
                                        <Chip icon={Lightbulb} label="Projects" onClick={() => setActivityModal({ type: "project", title: st.title })} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>

      <ActivityModal state={activityModal} onClose={() => setActivityModal(null)} />
    </section>
  );
}

function Road({ value }) {
  const steps = ["Start", "Learn", "Practice", "Apply", "Mastery"];
  const activeIndex = Math.round((value / 100) * (steps.length - 1));
  return (
    <div className="flex items-center gap-1">
      {steps.map((s, idx) => (
        <div key={s} className={`h-1.5 w-8 rounded-full ${idx <= activeIndex ? "bg-gradient-to-r from-blue-600 to-cyan-400" : "bg-slate-200"}`} />
      ))}
    </div>
  );
}

function Chip({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-blue-300 hover:text-blue-700 transition"
    >
      <Icon size={14} /> {label}
    </button>
  );
}

function ActivityModal({ state, onClose }) {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="font-semibold text-slate-900 capitalize">{state.type} • {state.title}</div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
            </div>
            <div className="p-5">
              {state.type === "quiz" && <MiniQuiz />}
              {state.type === "video" && <VideoPlaceholder />}
              {state.type === "simulation" && <MiniSim />}
              {state.type === "experiment" && <ExperimentSteps />}
              {state.type === "project" && <ProjectBrief />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MiniQuiz() {
  const [ans, setAns] = useState(null);
  return (
    <div>
      <div className="font-medium text-slate-800">Quick Check</div>
      <p className="text-slate-600 mt-1">Which of the following is a prime number?</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[12, 17, 21, 27].map((n) => (
          <button
            key={n}
            onClick={() => setAns(n)}
            className={`rounded-xl border p-3 text-left ${ans === n ? (n === 17 ? "border-emerald-500 bg-emerald-50" : "border-red-400 bg-red-50") : "border-slate-200 hover:border-blue-300"}`}
          >
            {n}
          </button>
        ))}
      </div>
      {ans !== null && (
        <div className={`mt-3 text-sm ${ans === 17 ? "text-emerald-600" : "text-red-600"}`}>
          {ans === 17 ? "Correct!" : "Try again. 17 is the only prime here."}
        </div>
      )}
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 grid place-items-center text-slate-500">
      <div>Video player loads here</div>
    </div>
  );
}

function MiniSim() {
  const [mass, setMass] = useState(1);
  const [acc, setAcc] = useState(2);
  const force = mass * acc;
  return (
    <div className="space-y-4">
      <div className="font-medium text-slate-800">F = m × a</div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-slate-500">Mass (kg)</label>
          <input type="range" min="1" max="10" value={mass} onChange={(e) => setMass(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-slate-700">{mass} kg</div>
        </div>
        <div>
          <label className="text-xs text-slate-500">Acceleration (m/s²)</label>
          <input type="range" min="1" max="10" value={acc} onChange={(e) => setAcc(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-slate-700">{acc} m/s²</div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="text-xs text-slate-500">Force</div>
          <div className="text-2xl font-bold text-blue-700">{force.toFixed(1)} N</div>
        </div>
      </div>
    </div>
  );
}

function ExperimentSteps() {
  const steps = [
    "Gather materials",
    "Form a hypothesis",
    "Run the experiment",
    "Record observations",
    "Analyze results",
  ];
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  return (
    <div>
      <div className="font-medium text-slate-800">Guided Experiment</div>
      <ul className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} />
            <span className={`${done.includes(i) ? "line-through text-slate-400" : "text-slate-700"}`}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectBrief() {
  return (
    <div className="space-y-2">
      <div className="font-medium text-slate-800">Mini Project</div>
      <p className="text-slate-600">Design a paper prototype of a smart classroom assistant. Show how it helps students with reminders and instant explanations.</p>
      <ul className="list-disc pl-5 text-slate-600">
        <li>Sketch 3 screens</li>
        <li>Describe user flow</li>
        <li>Record a 1-minute walkthrough</li>
      </ul>
    </div>
  );
}
