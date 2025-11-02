import { User, LogOut, Sparkles } from "lucide-react";

export default function Navbar({ user, onLogout, onNavigate }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => onNavigate("login")}
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 grid place-items-center text-white shadow-lg shadow-blue-500/30">
            <Sparkles size={18} />
          </div>
          <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-500">TinkrVerse</span>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-slate-700">
          <button
            className="hover:text-blue-600 transition-colors"
            onClick={() => onNavigate("dashboard")}
          >
            Home
          </button>
          <button
            className="hover:text-blue-600 transition-colors"
            onClick={() => onNavigate("subjects")}
          >
            Subjects
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-slate-800">
                  {user.name}
                </div>
                <div className="text-[11px] text-slate-500 capitalize">
                  {user.role}
                </div>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 grid place-items-center text-white">
                <User size={18} />
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="text-slate-500 text-sm">Welcome</div>
          )}
        </div>
      </div>
    </header>
  );
}
