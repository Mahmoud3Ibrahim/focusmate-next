export interface MusicTrack {
  name: string;
  url: string;
}

export const musicTracks: MusicTrack[] = [
  {
    name: 'Ethereal Relaxation - Calm Ambient (25 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Ethereal%20Relaxation.mp3'
  },
  {
    name: 'Deep Relaxation - Meditation (28 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Deep%20Relaxation.mp3'
  },
  {
    name: 'Meditation Impromptu 03 - Peaceful (26 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2003.mp3'
  },
  {
    name: 'Comfortable Mystery 2 - Atmospheric (24 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Comfortable%20Mystery%202.mp3'
  },
  {
    name: 'Floating Cities - Ambient Dreams (30 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Floating%20Cities.mp3'
  },
  {
    name: 'Atlantean Twilight - Serene Waves (27 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Atlantean%20Twilight.mp3'
  },
  {
    name: 'Quasi Motion - Gentle Flow (29 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Quasi%20Motion.mp3'
  }
];

// For backward compatibility
export const musicFiles = musicTracks.map(track => track.url);
