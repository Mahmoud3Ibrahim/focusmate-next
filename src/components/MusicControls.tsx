'use client';

import { MusicTrack } from "../lib/music";
import { useEffect } from 'react';

interface MusicControlsProps {
  musicTracks: MusicTrack[];
  currentMusic: string;
  onMusicChange: (music: string) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicControls: React.FC<MusicControlsProps> = ({
  musicTracks,
  currentMusic,
  onMusicChange,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
  audioRef
}) => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    onVolumeChange(newVolume);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Music Selection & Mute */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <select
            value={currentMusic}
            onChange={(e) => onMusicChange(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 hover:border-teal-500/50 focus:border-teal-500 text-white text-sm rounded-xl focus:ring-2 focus:ring-teal-500/30 pl-11 pr-10 py-3 appearance-none cursor-pointer transition-all duration-300 font-medium"
          >
            {musicTracks.map(track => (
              <option key={track.url} value={track.url} className="bg-gray-800">{track.name}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <button
          onClick={onMuteToggle}
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
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 px-1">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m-6-7.072a5 5 0 010 7.072m1.414-1.414a3 3 0 010-4.242M12 10.586a1 1 0 011.414 0l4.95 4.95a1 1 0 01-1.414 1.414l-4.95-4.95a1 1 0 010-1.414z" />
        </svg>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${volume}%, #374151 ${volume}%, #374151 100%)`
          }}
        />
        <span className="text-xs text-gray-400 font-medium w-8 text-right">{volume}%</span>
      </div>
    </div>
  );
};

export default MusicControls;
