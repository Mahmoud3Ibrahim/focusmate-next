'use client';

import { useState, useEffect } from 'react';

const motivationalPhrases = [
  'Keep going, you\'re doing great.',
  'Deep focus = real progress.',
  'Breathe. Stay calm. You\'ve got this.',
  'Every minute counts.',
  'You\'re one Pomodoro closer to your goals.',
  'Focus is a muscle - you\'re training it now.',
  'Silence the noise. Just create.',
  'Small steps. Big results.',
  'Your future self will thank you.',
  'Progress over perfection.',
  'Stay focused. Stay hungry.',
  'Discipline is choosing what you want most over what you want now.',
  'The work you put in today builds tomorrow.',
  'Excellence is a habit, not an act.',
  'Champions are made when no one is watching.',
];

const MotivationBanner = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % motivationalPhrases.length);
        setIsVisible(true);
      }, 1000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center min-h-[3rem] flex items-center justify-center">
      <p
        className={`text-lg md:text-xl font-medium bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent px-4 transition-all duration-1000 ease-in-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'
        }`}
        style={{
          textShadow: '0 0 40px rgba(20, 184, 166, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
        }}
      >
        {motivationalPhrases[phraseIndex]}
      </p>
    </div>
  );
};

export default MotivationBanner;
