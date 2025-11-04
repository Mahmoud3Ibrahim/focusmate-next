'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MotivationBanner from './MotivationBanner';
import MusicControls from './MusicControls';

interface FocusTimerProps {
  settings: {
    music: string;
    notifications: boolean;
  };
  onEndSession: () => void;
  onOpenInfo: () => void;
}

type Phase = 'focus' | 'shortBreak' | 'longBreak';

const FOCUS_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 25 * 60; // 25 minutes
const SESSIONS_BEFORE_LONG_BREAK = 4;

// Calm break music from Pixabay (royalty-free)
type BreakTrack = {
  name: string;
  url: string;
};

const SHORT_BREAK_TRACKS: BreakTrack[] = [
  {
    name: 'Meditation Impromptu 01 - Deep Rest (7 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2001.mp3',
  },
  {
    name: 'Floating Cities - Ambient Dreams (6 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Floating%20Cities.mp3',
  },
  {
    name: 'Atlantean Twilight - Peaceful Waves (5.5 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Atlantean%20Twilight.mp3',
  },
  {
    name: 'Quasi Motion - Gentle Flow (6 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Quasi%20Motion.mp3',
  },
];

const LONG_BREAK_TRACKS: BreakTrack[] = [
  {
    name: 'Echoes of Time v2 - Extended Rest (12 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Echoes%20of%20Time%20v2.mp3',
  },
  {
    name: 'Soaring - Uplifting Ambient (13 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Soaring.mp3',
  },
  {
    name: 'Lightless Dawn - Deep Meditation (16 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Lightless%20Dawn.mp3',
  },
  {
    name: 'Meditation Impromptu 02 - Long Rest (8 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2002.mp3',
  },
];

const breakMotivations = [
  'Stand up for a quick stretch and loosen your shoulders.',
  'Drink some water and let your eyes rest on a distant point.',
  'Take a short walk around the room to reset your energy.',
  'Pause for slow breaths in and out, then reset your posture.',
  'Step away from the desk for a moment and clear your head.',
];

const longBreakMessages = [
  'Excellent streak! Take a longer break and relax fully.',
  'Four pomodoros complete - treat yourself before the next round.',
  'Deep work achieved. Use this time to recharge properly.',
  'Make this long break count with movement, fuel, and rest.',
];

import { musicTracks } from '../lib/music';

const FocusTimer: React.FC<FocusTimerProps> = ({ settings, onEndSession, onOpenInfo }) => {
  const [phase, setPhase] = useState<Phase>('focus');
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [sessionLog, setSessionLog] = useState<string[]>([]);
  const [currentMusic, setCurrentMusic] = useState(settings.music || musicTracks[0].url);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(70);
  const [breakMessage, setBreakMessage] = useState('');
  const [shortBreakTrack, setShortBreakTrack] = useState<BreakTrack>(SHORT_BREAK_TRACKS[0]);
  const [longBreakTrack, setLongBreakTrack] = useState<BreakTrack>(LONG_BREAK_TRACKS[0]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const dingAudioRef = useRef<HTMLAudioElement>(null);
  const comeBackAudioRef = useRef<HTMLAudioElement>(null);
  const longBreakBellAudioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef(volume);

  const sendNotification = useCallback((body: string) => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    try {
      new Notification('FocusMate', { body });
    } catch (error) {
      console.warn('Notification error:', error);
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('focusMate_sessionsToday');
    const savedCycles = localStorage.getItem('focusMate_cyclesCompleted');

    if (savedSessions) setSessionsCompleted(parseInt(savedSessions));
    if (savedCycles) setCyclesCompleted(parseInt(savedCycles));
  }, []);

  // Save to localStorage whenever sessions/cycles change
  useEffect(() => {
    localStorage.setItem('focusMate_sessionsToday', sessionsCompleted.toString());
    localStorage.setItem('focusMate_cyclesCompleted', cyclesCompleted.toString());
  }, [sessionsCompleted, cyclesCompleted]);

  useEffect(() => {
    setCurrentMusic(settings.music || musicTracks[0].url);
  }, [settings.music]);

  // Countdown timer
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isPaused]);

  // Handle phase completion
  useEffect(() => {
    if (timeLeft > 0) return;

    if (phase === 'focus') {
      // Focus session completed
      const newSessionCount = sessionsCompleted + 1;
      setSessionsCompleted(newSessionCount);
      setSessionLog(prev => [...prev, `Session ${newSessionCount} completed`]);

      if (dingAudioRef.current) {
        dingAudioRef.current.play();
      }

      if (settings.notifications) {
        const messages = [
          'Session finished - take a 5-minute break.',
          'Great work! Time for a short rest.',
          'Pomodoro complete! Stretch and relax.',
        ];
        sendNotification(messages[Math.floor(Math.random() * messages.length)]);
      }

      // Check if it's time for long break
      if (newSessionCount % SESSIONS_BEFORE_LONG_BREAK === 0) {
        setPhase('longBreak');
        setTimeLeft(LONG_BREAK_DURATION);
        setCyclesCompleted(prev => prev + 1);
      } else {
        setPhase('shortBreak');
        setTimeLeft(SHORT_BREAK_DURATION);
      }
    } else if (phase === 'shortBreak') {
      // Short break completed
      if (comeBackAudioRef.current) {
        comeBackAudioRef.current.play();
      }

      if (settings.notifications) {
        sendNotification("Break is over - let's focus again!");
      }

      setPhase('focus');
      setTimeLeft(FOCUS_DURATION);
    } else if (phase === 'longBreak') {
      // Long break completed
      if (longBreakBellAudioRef.current) {
        longBreakBellAudioRef.current.play();
      }

      if (settings.notifications) {
        sendNotification('Long break finished! Ready for the next cycle?');
      }

      setPhase('focus');
      setTimeLeft(FOCUS_DURATION);
    }
  }, [timeLeft, phase, sessionsCompleted, settings.notifications, sendNotification]);

  // Music management
  useEffect(() => {
    if (!audioRef.current) return;

    const nextSrc =
      phase === 'focus'
        ? currentMusic
        : phase === 'shortBreak'
          ? shortBreakTrack.url
          : longBreakTrack.url;

    if (audioRef.current.src !== nextSrc) {
      audioRef.current.pause();
      audioRef.current.src = nextSrc;
    }

    audioRef.current.loop = true;
    audioRef.current.volume = volumeRef.current / 100;

    if (!isPaused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name === 'AbortError' || error.name === 'NotAllowedError') {
            return;
          }
          console.error("Audio play failed:", error);
        });
      }
    }
  }, [phase, currentMusic, isPaused, shortBreakTrack, longBreakTrack]);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (phase === 'shortBreak') {
      const track = SHORT_BREAK_TRACKS[Math.floor(Math.random() * SHORT_BREAK_TRACKS.length)];
      setShortBreakTrack(track);
      setBreakMessage(breakMotivations[Math.floor(Math.random() * breakMotivations.length)]);
    } else if (phase === 'longBreak') {
      const track = LONG_BREAK_TRACKS[Math.floor(Math.random() * LONG_BREAK_TRACKS.length)];
      setLongBreakTrack(track);
      setBreakMessage(longBreakMessages[Math.floor(Math.random() * longBreakMessages.length)]);
    } else {
      setBreakMessage('');
    }
  }, [phase]);

  // Mute control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    if (audioRef.current) {
      if (isPaused) {
        const resumePromise = audioRef.current.play();
        if (resumePromise) {
          resumePromise.catch(error => {
            if (error.name === 'AbortError' || error.name === 'NotAllowedError') {
              return;
            }
            console.error("Audio play failed:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getDuration = () => {
    if (phase === 'focus') return FOCUS_DURATION;
    if (phase === 'shortBreak') return SHORT_BREAK_DURATION;
    return LONG_BREAK_DURATION;
  };

  const progress = ((getDuration() - timeLeft) / getDuration()) * 100;

  const getPhaseLabel = () => {
    if (phase === 'focus') return 'Focus Time';
    if (phase === 'shortBreak') return 'Short Break';
    return 'Long Break';
  };

  const getPhaseColor = () => {
    if (phase === 'focus') return 'from-teal-500 to-blue-500';
    if (phase === 'shortBreak') return 'from-green-500 to-teal-500';
    return 'from-purple-500 to-pink-500';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 animate-fade-in overflow-visible flex flex-col items-center gap-8">
      <audio ref={audioRef} preload="metadata" />
      <audio ref={dingAudioRef} src="/audio/ding.mp3" preload="metadata" />
      <audio ref={comeBackAudioRef} src="/audio/come_back.mp3" preload="metadata" />
      <audio ref={longBreakBellAudioRef} src="/audio/long_break_bell.mp3" preload="metadata" />

      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <button
          onClick={onOpenInfo}
          className="group flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Pomodoro Technique</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-default">
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">{sessionsCompleted}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide group-hover:text-teal-400 transition-colors duration-300">Sessions</div>
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
          <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-default">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">{cyclesCompleted}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide group-hover:text-purple-400 transition-colors duration-300">Cycles</div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className={`absolute -inset-10 bg-gradient-to-br ${getPhaseColor()} opacity-10 rounded-full blur-3xl pointer-events-none`} />
        <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-gray-800/50"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            {/* Progress circle */}
            <circle
              className="drop-shadow-2xl transition-all duration-1000 ease-linear"
              strokeWidth="4"
              strokeDasharray={`${(progress / 100) * 264} 264`}
              strokeLinecap="round"
              stroke="url(#gradient)"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                {phase === 'focus' && (
                  <>
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </>
                )}
                {phase === 'shortBreak' && (
                  <>
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </>
                )}
                {phase === 'longBreak' && (
                  <>
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </>
                )}
              </linearGradient>
            </defs>
          </svg>

          {/* Time display */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-bold font-mono bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text drop-shadow-lg mb-1">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-400 font-medium tracking-wider uppercase">
              {isPaused ? 'Paused' : getPhaseLabel()}
            </div>
            <div className={`mt-1 px-3 py-0.5 bg-gradient-to-r ${getPhaseColor()} bg-opacity-20 rounded-full border border-opacity-30`}>
              <span className="text-white text-xs font-semibold">{progress.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl px-4">
        <div className="min-h-[4rem] flex items-center justify-center">
          {(phase === 'shortBreak' || phase === 'longBreak') && breakMessage ? (
            <div className="text-center">
              <p className="text-base font-medium text-teal-300">{breakMessage}</p>
            </div>
          ) : phase === 'focus' ? (
            <MotivationBanner />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePauseToggle}
          className="group relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-gray-500/50 transform hover:scale-105 text-sm min-w-[10rem]"
        >
          <span className="flex items-center gap-2">
            {isPaused ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Resume
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                Pause
              </>
            )}
          </span>
        </button>

        <button
          onClick={onEndSession}
          className="group relative bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 text-red-400 hover:text-red-300 font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm min-w-[10rem]"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            End Session
          </span>
        </button>
      </div>

      <div className="w-full max-w-xl bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
        {phase === 'focus' ? (
          <MusicControls
            musicTracks={musicTracks}
            currentMusic={currentMusic}
            onMusicChange={setCurrentMusic}
            volume={volume}
            onVolumeChange={setVolume}
            isMuted={isMuted}
            onMuteToggle={() => setIsMuted(!isMuted)}
            audioRef={audioRef}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="text-sm font-semibold text-gray-200">Break Music</span>
            </div>

            {/* Track selector */}
            <div className="relative">
              <select
                value={phase === 'shortBreak' ? shortBreakTrack.url : longBreakTrack.url}
                onChange={(e) => {
                  const selectedTrack = (phase === 'shortBreak' ? SHORT_BREAK_TRACKS : LONG_BREAK_TRACKS)
                    .find(t => t.url === e.target.value);
                  if (selectedTrack) {
                    if (phase === 'shortBreak') {
                      setShortBreakTrack(selectedTrack);
                    } else {
                      setLongBreakTrack(selectedTrack);
                    }
                  }
                }}
                className="w-full bg-gray-800/50 border border-gray-700 hover:border-teal-500/50 focus:border-teal-500 text-white text-sm rounded-xl focus:ring-2 focus:ring-teal-500/30 pl-3 pr-10 py-3 appearance-none cursor-pointer transition-all duration-300 font-medium"
              >
                {(phase === 'shortBreak' ? SHORT_BREAK_TRACKS : LONG_BREAK_TRACKS).map(track => (
                  <option key={track.url} value={track.url} className="bg-gray-800">{track.name}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Volume and Mute controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  isMuted
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30'
                    : 'bg-teal-500/20 border border-teal-500/50 text-teal-400 hover:bg-teal-500/30'
                }`}
              >
                {isMuted ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .89-1.077 1.337-1.707.707L5.586 15zM17 14l4-4m0 4l-4-4" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m1.428-9.5a9 9 0 010 12M6 10v4a2 2 0 002 2h2l4 4V4L10 8H8a2 2 0 00-2 2z" />
                  </svg>
                )}
              </button>

              <div className="flex-1 flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m-6-7.072a5 5 0 010 7.072m1.414-1.414a3 3 0 010-4.242M12 10.586a1 1 0 011.414 0l4.95 4.95a1 1 0 01-1.414 1.414l-4.95-4.95a1 1 0 010-1.414z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${volume}%, #374151 ${volume}%, #374151 100%)`
                  }}
                />
                <span className="text-xs text-gray-400 font-medium w-8 text-right">{volume}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {sessionLog.length > 0 && (
        <div className="w-full max-w-md bg-gray-800/30 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Today's Progress</h3>
          <div className="space-y-2">
            {sessionLog.slice(-4).map((log, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {log}
              </div>
            ))}
            {sessionsCompleted % SESSIONS_BEFORE_LONG_BREAK !== 0 && phase === 'focus' && (
              <div className="flex items-center gap-2 text-xs text-teal-400">
                <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Session {sessionsCompleted + 1} in progress...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusTimer;
