import React, { useRef, useState, useEffect } from 'react'
import { Heart, MessageCircle, Send, MoreHorizontal, Music } from 'lucide-react'
import { REELS } from '../data/fakeData'

function ReelItem({ reel }) {
    const videoRef = useRef(null)
    const [liked, setLiked] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)

    // Auto play/pause logic based on intersection would go here
    // For simplicity in this demo, we assume user clicks to play/pause or it autoplays

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause()
            else videoRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className="h-[calc(100vh-60px)] md:h-screen w-full md:w-[400px] mx-auto relative snap-start flex items-center justify-center bg-black">
            <video
                ref={videoRef}
                src={reel.url}
                className="h-full w-full object-cover md:rounded-lg cursor-pointer"
                loop
                autoPlay
                muted // Muted for autoplay
                onClick={togglePlay}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 md:rounded-lg pointer-events-none"></div>

            {/* Content info */}
            <div className="absolute bottom-16 left-4 right-14 text-white z-10">
                <div className="flex items-center gap-2 mb-3 cursor-pointer pointer-events-auto">
                    <img src={reel.user.avatar} className="w-8 h-8 rounded-full border border-white" alt="avatar" />
                    <span className="font-semibold text-sm">{reel.user.username}</span>
                    <button className="border border-white/60 text-xs px-2 py-1 rounded-lg ml-2 font-medium">Follow</button>
                </div>
                <p className="text-sm mb-3 pointer-events-auto cursor-pointer" dangerouslySetInnerHTML={{ __html: reel.caption.replace(/#(\w+)/g, '<span class="font-bold">#$1</span>') }} />
                <div className="flex items-center gap-2 text-xs opacity-90 overflow-hidden">
                    <Music size={12} />
                    <span className="moving-text-container">
                        <span className="scrolling-text">Original Audio - {reel.user.username} • Original Audio</span>
                    </span>
                </div>
            </div>

            {/* Actions Sidebar */}
            <div className="absolute bottom-4 right-2 flex flex-col gap-6 items-center text-white z-20 pointer-events-auto">
                <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setLiked(!liked)}>
                    <Heart className={`w-7 h-7 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="text-xs font-medium">{(reel.likes + (liked ? 1 : 0)).toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <MessageCircle className="w-7 h-7" />
                    <span className="text-xs font-medium">{reel.comments}</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Send className="w-7 h-7 rotate-12" />
                </div>
                <div className="cursor-pointer">
                    <MoreHorizontal className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 border-2 border-white rounded-lg overflow-hidden mt-2 cursor-pointer">
                    <img src={reel.user.avatar} className="w-full h-full object-cover opacity-80" alt="music" />
                </div>
            </div>
        </div>
    )
}

function Reels() {
    return (
        <div className="h-screen w-full bg-[var(--bg-primary)] snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
            {REELS.map(reel => (
                <ReelItem key={reel.id} reel={reel} />
            ))}
        </div>
    )
}

export default Reels
