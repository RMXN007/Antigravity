import React from 'react'
import { POSTS } from '../data/fakeData'
import { Heart, MessageCircle } from 'lucide-react'

function Explore() {
    return (
        <div className="max-w-4xl mx-auto py-4 px-2 pb-16 md:pb-4">
            <div className="grid grid-cols-3 gap-1 md:gap-4">
                {POSTS.map((post, idx) => {
                    const isLarge = (idx + 1) % 10 === 0 || (idx + 1) % 7 === 0; // Simple pattern for varying sizes if we want, for now just square
                    return (
                        <div key={post._id} className={`relative group aspect-square bg-[var(--bg-secondary)] overflow-hidden cursor-pointer ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}>
                            <img
                                src={post.image}
                                alt="explore"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-bold">
                                <div className="flex items-center gap-1">
                                    <Heart className="fill-white w-6 h-6" />
                                    <span>{post.likesCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="fill-white w-6 h-6" />
                                    <span>{post.commentsCount}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Explore
