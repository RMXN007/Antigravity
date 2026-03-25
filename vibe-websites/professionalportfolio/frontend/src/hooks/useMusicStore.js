import { create } from 'zustand';









export const useMusicStore = create((set) => ({
  isPlaying: false,
  currentTrack: "Midnight City",
  artist: "M83",
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setTrack: (track, artist) => set({ currentTrack: track, artist })
}));