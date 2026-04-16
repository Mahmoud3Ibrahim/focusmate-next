export interface MusicTrack {
  name: string;
  url: string;
}

const STORAGE_BASE =
  'https://kgxundnocmyqggtonpgd.supabase.co/storage/v1/object/public/music-tracks';

/** Focus session — picker + default focus music */
export const musicTracks: MusicTrack[] = [
  {
    name: 'Glory Glory',
    url: `${STORAGE_BASE}/39034061-glory-glory-166795.mp3`,
  },
  {
    name: 'His Mercy',
    url: `${STORAGE_BASE}/39034061-his-mercy-166520.mp3`,
  },
  {
    name: 'The Grace of God',
    url: `${STORAGE_BASE}/39034061-the-grace-of-god-165502.mp3`,
  },
  {
    name: 'Through Faith',
    url: `${STORAGE_BASE}/39034061-through-faith-170275.mp3`,
  },
  {
    name: 'Coffee After Midnight (Lofi)',
    url: `${STORAGE_BASE}/desifreemusic-coffee-after-midnight-cozy-lofi-background-music-477511.mp3`,
  },
  {
    name: 'Lofi Chill — Study & Relax',
    url: `${STORAGE_BASE}/desifreemusic-copyright-free-lo-fi-chill-music-for-study-relax-amp-background-use-474210.mp3`,
  },
  {
    name: 'Late Night Lofi (Coffee Study)',
    url: `${STORAGE_BASE}/desifreemusic-late-night-lofi-chill-coffee-study-beats-no-copyright-476705%20(1).mp3`,
  },
  {
    name: 'Lofi Chill — Study & Relaxation',
    url: `${STORAGE_BASE}/desifreemusic-no-copyright-lofi-chill-beat-for-study-amp-relaxation-474208.mp3`,
  },
  {
    name: 'Magical Wizard School (Orchestral)',
    url: `${STORAGE_BASE}/domartistudios-magical-wizard-school-orchestral-fantasy-488126.mp3`,
  },
  {
    name: 'Hapncs — Background',
    url: `${STORAGE_BASE}/genzbeats-genzbetas-hapncs-no-copyright-free-background-music-412205.mp3`,
  },
  {
    name: 'Just Relax',
    url: `${STORAGE_BASE}/music_for_video-just-relax-11157.mp3`,
  },
  {
    name: 'Flute Meditation',
    url: `${STORAGE_BASE}/onetent-flute-meditation-music-5-229769.mp3`,
  },
];

/** Short break — random pick when entering short break */
export const shortBreakTracks: MusicTrack[] = [
  musicTracks[10],
  musicTracks[11],
  musicTracks[1],
  musicTracks[2],
  musicTracks[4],
  musicTracks[5],
];

/** Long break — random pick when entering long break */
export const longBreakTracks: MusicTrack[] = [
  musicTracks[0],
  musicTracks[3],
  musicTracks[7],
  musicTracks[8],
  musicTracks[9],
  musicTracks[6],
];

const allKnownUrls = new Set<string>([
  ...musicTracks.map(t => t.url),
  ...shortBreakTracks.map(t => t.url),
  ...longBreakTracks.map(t => t.url),
]);

/** Maps saved preference to a valid track (ignores dead Incompetech URLs etc.) */
export function resolveMusicUrl(saved: string | undefined): string {
  if (saved && allKnownUrls.has(saved)) return saved;
  return musicTracks[0].url;
}

// For backward compatibility
export const musicFiles = musicTracks.map(track => track.url);
