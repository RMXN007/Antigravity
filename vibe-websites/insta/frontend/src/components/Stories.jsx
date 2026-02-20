import React from 'react'
import { Plus } from 'lucide-react'
import { STORIES } from '../data/fakeData'

function Stories() {
    return (
        <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] py-4 mb-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-4 min-w-max">
                {STORIES.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className={`w-16 h-16 rounded-full p-[2px] ${story.isStart ? "" : (story.isSeen ? "story-ring-seen" : "story-ring animate-spin-slow")} transition-transform duration-200 group-hover:scale-110`}>
                            <div className="w-full h-full rounded-full bg-[var(--bg-primary)] p-[2px] relative">
                                {story.isStart ? (
                                    <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-color)] relative overflow-hidden">
                                        <img
                                            src="https://via.placeholder.com/60" // Valid placeholder or current user avatar
                                            alt="You"
                                            className="w-full h-full object-cover opacity-50"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-blue-500 rounded-full p-1 border-2 border-[var(--bg-primary)]">
                                                <Plus size={16} color="white" strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={story.avatar}
                                        alt={story.username}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                )}
                            </div>
                        </div>
                        <span className={`text-xs truncate w-16 text-center ${story.isSeen ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] font-medium'}`}>
                            {story.username}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stories
