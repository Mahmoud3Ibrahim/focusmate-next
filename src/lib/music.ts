export interface MusicTrack {
  name: string;
  url: string;
}

export const musicTracks: MusicTrack[] = [
  {
    name: 'Cipher - Focused Coding (28 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cipher.mp3'
  },
  {
    name: 'Hypnothis - Electronic Focus (26 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Hypnothis.mp3'
  },
  {
    name: 'Digital Lemonade - Upbeat Study (25 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Digital%20Lemonade.mp3'
  },
  {
    name: 'Airport Lounge - Smooth Productivity (30 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Airport%20Lounge.mp3'
  },
  {
    name: 'Comfortable Mystery 2 - Deep Work (24 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Comfortable%20Mystery%202.mp3'
  },
  {
    name: 'Floating Cities - Ambient Coding (30 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Floating%20Cities.mp3'
  },
  {
    name: 'Quasi Motion - Active Study (29 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Quasi%20Motion.mp3'
  }
];

// For backward compatibility
export const musicFiles = musicTracks.map(track => track.url);
