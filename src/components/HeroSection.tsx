"use client";

interface HeroSectionProps {
  onStart: () => void;
  onOpenInfo: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart, onOpenInfo }) => {
  return (
    <div className="text-center animate-fade-in px-6">
      <div className="mb-6">
        <div className="inline-block p-4 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-teal-400/30 mb-6">
          <svg className="w-20 h-20 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
        FocusMate
      </h1>

      <p className="max-w-2xl mx-auto mb-4 text-gray-100 text-xl md:text-2xl font-medium leading-relaxed">
        Master your time. Boost your productivity.
      </p>

      <p className="max-w-xl mx-auto mb-12 text-gray-300 text-base md:text-lg font-light leading-relaxed">
        Using the proven Pomodoro Technique with 25-minute focused work sessions,
        helping you achieve deep concentration and maintain peak performance.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onStart}
          className="group relative bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 hover:from-teal-400 hover:via-blue-400 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-300 shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105 hover:-translate-y-1"
        >
          <span className="relative z-10 flex items-center gap-3">
            Start Focus Session
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-purple-700 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
        </button>
      </div>

      <div className="mt-10">
        <button
          onClick={onOpenInfo}
          className="group inline-flex items-center gap-2 text-gray-300 hover:text-teal-400 text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Learn about Pomodoro Technique
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
