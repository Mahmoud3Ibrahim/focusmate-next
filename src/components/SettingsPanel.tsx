'use client';

import { useState } from 'react';

interface SettingsPanelProps {
  onStartSession: (settings: { music: string; notifications: boolean }) => void;
  initialSettings: { music: string; notifications: boolean };
}

import { musicTracks } from '../lib/music';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onStartSession, initialSettings }) => {
  const [selectedMusic, setSelectedMusic] = useState(initialSettings.music || musicTracks[0].url);
  const [notificationsEnabled, setNotificationsEnabled] = useState(initialSettings.notifications);

  const handleStart = () => {
    if (notificationsEnabled) {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        Notification.requestPermission()
          .then(permission => {
            onStartSession({
              music: selectedMusic,
              notifications: permission === 'granted',
            });
          })
          .catch(() => {
            onStartSession({ music: selectedMusic, notifications: false });
          });
      } else {
        onStartSession({ music: selectedMusic, notifications: false });
      }
    } else {
      onStartSession({ music: selectedMusic, notifications: false });
    }
  };

  return (
    <div className="animate-fade-in bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-700/50">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-teal-400/30 mb-4">
          <svg className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Setup Your Session</h2>
        <p className="text-gray-400 text-sm">Customize your perfect focus environment</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label htmlFor="music-select" className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            Background Music
          </label>
          <div className="relative">
            <select
              id="music-select"
              value={selectedMusic}
              onChange={(e) => setSelectedMusic(e.target.value)}
              className="bg-gray-800/50 border-2 border-gray-700 hover:border-teal-500/50 focus:border-teal-500 text-white rounded-xl focus:ring-4 focus:ring-teal-500/20 block w-full p-4 appearance-none cursor-pointer transition-all duration-300 font-medium"
            >
              {musicTracks.map(track => (
                <option key={track.url} value={track.url} className="bg-gray-800">{track.name}</option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div>
              <span className="text-sm font-semibold text-gray-200 block">Enable Notifications</span>
              <span className="text-xs text-gray-500">Get alerts when sessions complete</span>
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} className="sr-only peer" />
            <div className="relative w-14 h-7 bg-gray-700 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-500/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-blue-500 shadow-lg"></div>
          </label>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="group relative w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 hover:from-teal-400 hover:via-blue-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-teal-500/50 transform hover:scale-[1.02] hover:-translate-y-0.5 mt-8"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          Start Focus Session
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-purple-700 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
      </button>
    </div>
  );
};

export default SettingsPanel;
