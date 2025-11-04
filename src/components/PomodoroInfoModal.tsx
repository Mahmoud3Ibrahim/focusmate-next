'use client';

interface PomodoroInfoModalProps {
  onClose: () => void;
}

const PomodoroInfoModal: React.FC<PomodoroInfoModalProps> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur md:backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-blue-950/70 shadow-[0_35px_120px_rgba(15,23,42,0.6)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/5 to-purple-500/10 opacity-70" />
        <div className="relative p-8 md:p-12 space-y-8">
          <header className="space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
              Focus Essentials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-teal-200 to-blue-200 bg-clip-text leading-tight">
              What is the Pomodoro Technique?
            </h2>
            <p className="text-sm md:text-base text-slate-300/80 max-w-2xl">
              A simple rhythm of deep work and intentional rest. Twenty-five minutes of focus, followed by a short reset, repeated to build momentum without burning out.
            </p>
          </header>

          <section className="grid md:grid-cols-[1.2fr_1fr] gap-8">
            <div className="space-y-5 text-slate-200/90 text-base leading-relaxed">
              <p>
                Developed in the late 1980s, the Pomodoro Technique uses a timer to structure your day into focused work intervals separated by restorative breaks. The name comes from the tomato-shaped kitchen timer used by its creator.
              </p>
              <p>
                Each 25-minute block is a commitment: choose one task, remove distractions, and give it your full attention until the timer rings. Then, take a short pause to breathe, move, or hydrate before diving into the next session.
              </p>
            </div>

            <aside className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 space-y-4 shadow-inner shadow-slate-900/60">
              <h3 className="text-lg font-semibold text-teal-200 tracking-wide uppercase">Key Benefits</h3>
              <ul className="space-y-3 text-sm md:text-base text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-teal-400 shrink-0" />
                  <span><span className="font-semibold text-white">Improved focus:</span> short sprints help you defend your attention and reach deep work faster.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                  <span><span className="font-semibold text-white">Less burnout:</span> scheduled breaks keep your energy steady and your mind refreshed.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-400 shrink-0" />
                  <span><span className="font-semibold text-white">Time awareness:</span> tracking sessions builds a sharp sense of how long tasks really take.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  <span><span className="font-semibold text-white">Built-in motivation:</span> every completed Pomodoro is a small win that keeps momentum going.</span>
                </li>
              </ul>
            </aside>
          </section>

          <footer className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/70">
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400/70">
              FocusMate · Work with intention
            </div>
            <button
              onClick={onClose}
              className="group relative overflow-hidden rounded-full border border-teal-400/30 bg-gradient-to-r from-teal-500/80 via-blue-500/70 to-purple-500/70 px-8 py-2 text-sm font-semibold uppercase tracking-wide text-white transition duration-300"
            >
              <span className="relative z-10">Close</span>
              <span className="absolute inset-0 translate-y-full bg-white/20 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PomodoroInfoModal;
