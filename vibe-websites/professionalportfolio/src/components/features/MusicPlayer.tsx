import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Music } from 'lucide-react';
import { useMusicStore } from '../../hooks/useMusicStore';

const MusicPlayer: React.FC = () => {
    const { isPlaying, currentTrack, artist, togglePlay } = useMusicStore();

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-8 left-8 z-50 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl w-80"
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-primary to-secondary ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <Music size={20} className="text-white" />
            </div>

            <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-sm truncate">{currentTrack}</h4>
                <p className="text-xs text-gray-400 truncate">{artist}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                >
                    {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-1" />}
                </button>
                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <SkipForward size={14} />
                </button>
            </div>

            {/* Visualizer Bars (CSS Animation mocked) */}
            <div className="absolute top-0 right-4 -mt-6 flex gap-1 h-6 items-end">
                {[1, 2, 3, 4].map(i => (
                    <motion.div
                        key={i}
                        className="w-1 bg-primary rounded-t-full"
                        animate={{ height: isPlaying ? [4, 16, 8, 20, 4] : 4 }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1, ease: "linear" }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default MusicPlayer;
