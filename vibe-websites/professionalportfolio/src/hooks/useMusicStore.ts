import { create } from 'zustand';

interface MusicState {
    isPlaying: boolean;
    currentTrack: string;
    artist: string;
    togglePlay: () => void;
    setTrack: (track: string, artist: string) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
    isPlaying: false,
    currentTrack: "Midnight City",
    artist: "M83",
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setTrack: (track, artist) => set({ currentTrack: track, artist }),
}));
