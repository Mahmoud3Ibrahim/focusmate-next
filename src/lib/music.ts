export interface MusicTrack {
  name: string;
  url: string;
}

export const musicTracks: MusicTrack[] = [
  {
    name: 'Deep Focus - Ambient Soundscape (28 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Ethereal%20Relaxation.mp3'
  },
  {
    name: 'Peaceful Ocean Floor (60 min)',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_53f850c1a2.mp3?filename=ocean-floor-21950.mp3'
  },
  {
    name: 'Myst on the Moor - Atmospheric Focus (32 min)',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Calming/Kevin_MacLeod_-_Myst_on_the_Moor.mp3'
  },
  {
    name: 'Gentle Morning - Piano Study (40 min)',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Esther_Garcia/Soft_Piano/Esther_Garcia_-_01_-_Gentle_Morning.mp3'
  },
  {
    name: 'Deep Relaxation - Long Form (51 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Deep%20Relaxation.mp3'
  },
  {
    name: 'Ancient Winds - Meditative Ambient (58 min)',
    url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Ancient%20Winds.mp3'
  },
  {
    name: 'Forest Ambience - Deep Work (45 min)',
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Lobo_Loco/While_a_Small_Town_Sleeps/Lobo_Loco_-_09_-_Space_Between_ID_1223.mp3'
  }
];

// For backward compatibility
export const musicFiles = musicTracks.map(track => track.url);
