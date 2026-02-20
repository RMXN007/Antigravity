import React from 'react'
import { Link } from 'react-router-dom'

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function VideoCard({ video, type = "grid" }) {
    const isList = type === "list";
    return (
        <Link to={`/video/${video._id}`} className="block w-full group">
            <div className={`flex ${isList ? "flex-row gap-4" : "flex-col gap-3"} transition-all duration-300`}>
                <div className={`relative ${isList ? "w-60 h-36 min-w-[240px]" : "w-full aspect-video"} bg-gray-800 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] group-hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/5`}>
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                    <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                        {formatDuration(video.duration)}
                    </span>

                    {/* Play Icon Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-indigo-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                </div>

                <div className={`flex gap-3 ${isList ? "items-start py-2" : "px-1"}`}>
                    {/* Avatar only for grid view */}
                    {!isList && (
                        <div className="flex-shrink-0 mt-1">
                            <img
                                src={video.ownerDetails?.avatar || video.owner?.avatar || "https://via.placeholder.com/40"}
                                alt="avatar"
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500 transition-all"
                            />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <h3 className={`text-white font-bold tracking-tight ${isList ? "text-lg line-clamp-2" : "text-base line-clamp-2"} leading-snug group-hover:text-indigo-400 transition-colors`}>
                            {video.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 hover:text-white transition-colors font-medium">
                            {video.ownerDetails?.username || video.owner?.username || "Unknown Channel"}
                        </p>
                        <div className="text-gray-500 text-xs flex items-center mt-1 font-medium">
                            <span>{video.views} views</span>
                            <span className="mx-1.5">•</span>
                            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard
