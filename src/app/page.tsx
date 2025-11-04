'use client';

import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import SettingsPanel from '../components/SettingsPanel';
import FocusTimer from '../components/FocusTimer';
import PomodoroInfoModal from '../components/PomodoroInfoModal';

export type View = 'hero' | 'settings' | 'timer';

export default function Home() {
  const [view, setView] = useState<View>('hero');
  const [settings, setSettings] = useState({ music: '', notifications: true });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);
  const [bgImages, setBgImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  const TOTAL_BACKGROUND_IMAGES = 20;

  const getImagePath = (index: number) =>
    `/images/b${String(index).padStart(3, '0')}.jpg`;

  const getNextImageIndex = (index: number) =>
    (index % TOTAL_BACKGROUND_IMAGES) + 1;

  // Initial setup effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedSettings = window.localStorage.getItem('focusMateSettings');
    if (!savedSettings) return;
    try {
      const parsed = JSON.parse(savedSettings);
      if (parsed && typeof parsed === 'object') {
        setSettings({
          music: typeof parsed.music === 'string' ? parsed.music : '',
          notifications: typeof parsed.notifications === 'boolean' ? parsed.notifications : true,
        });
      }
    } catch (error) {
      console.warn('Failed to parse saved settings, resetting.', error);
      window.localStorage.removeItem('focusMateSettings');
    }
  }, []);

  useEffect(() => {
    const initial = Math.floor(Math.random() * TOTAL_BACKGROUND_IMAGES) + 1;
    const next = getNextImageIndex(initial);
    setImageIndex(initial);
    setBgImages([getImagePath(initial), getImagePath(next)]);
  }, []);

  useEffect(() => {
    if (bgImages.length === 0) return;
    const interval = setInterval(() => {
      setImageIndex(prev => {
        const nextIndex = getNextImageIndex(prev);
        setActiveImage(prevActive => {
          const nextActive = 1 - prevActive;
          setBgImages(prevImages => {
            const updated = [...prevImages];
            updated[nextActive] = getImagePath(nextIndex);
            return updated;
          });
          return nextActive;
        });
        return nextIndex;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [bgImages]);

  const handleStartNow = () => {
    setView('settings');
  };

  const handleStartSession = (newSettings: { music: string; notifications: boolean; }) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('focusMateSettings', JSON.stringify(newSettings));
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setView('timer');
      setIsTransitioning(false);
    }, 500);
  };

  const handleEndSession = () => {
    setView('settings');
  };

  const isTimerView = view === 'timer';
  const containerClass = isTimerView
    ? 'relative min-h-screen text-white overflow-hidden bg-gray-900 flex flex-col items-center'
    : 'relative flex items-center justify-center min-h-screen text-white overflow-hidden bg-gray-900';

  return (
    <main className={containerClass}>
      {/* Background cross-fade */}
      {bgImages.length === 2 && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[4000ms] ease-in-out"
            style={{ backgroundImage: `url(${bgImages[0]})`, opacity: activeImage === 0 ? 0.35 : 0 }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[4000ms] ease-in-out"
            style={{ backgroundImage: `url(${bgImages[1]})`, opacity: activeImage === 1 ? 0.35 : 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 opacity-40" />
        </>
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${isTimerView ? 'w-full' : ''}`}>
        {view === 'hero' && <HeroSection onStart={handleStartNow} onOpenInfo={() => setIsInfoModalOpen(true)} />}
        {view === 'settings' && (
          <div className={`${isTransitioning ? 'animate-scale-out' : 'animate-scale-in'}`}>
            <SettingsPanel onStartSession={handleStartSession} initialSettings={settings} />
          </div>
        )}
        {view === 'timer' && (
          <div className="animate-scale-in">
            <FocusTimer settings={settings} onEndSession={handleEndSession} onOpenInfo={() => setIsInfoModalOpen(true)} />
          </div>
        )}
      </div>

      {isInfoModalOpen && <PomodoroInfoModal onClose={() => setIsInfoModalOpen(false)} />}

      <footer className="absolute bottom-4 text-center w-full z-10">
        <div className="inline-block px-6 py-3 bg-gray-800/40 backdrop-blur-md rounded-full border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-gray-300 font-light">
            Crafted with love by <span className="font-semibold text-teal-400">Mahmoud Ibrahim</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
