import React, { useState } from 'react'
import { X } from 'lucide-react'
import { SEARCH_HISTORY, POSTS } from '../data/fakeData'

function Search() {
    const [query, setQuery] = useState('')

    return (
        <div className="max-w-4xl mx-auto py-4 px-4 pb-20 md:pb-4 min-h-screen">
            {/* Search Input (Mobile Only - visually) */}
            <div className="relative mb-6 md:hidden">
                <input
                    type="text"
                    className="w-full bg-[var(--bg-secondary)] border-none rounded-lg py-2 px-4 placeholder-[var(--text-tertiary)] text-[var(--text-primary)] focus:outline-none"
                    placeholder="Search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>

            {query ? (
                <div className="text-center mt-10 text-[var(--text-tertiary)]">
                    <p>Searching for "<b>{query}</b>"</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-base font-semibold text-[var(--text-primary)]">Recent</span>
                        <button className="text-sm font-semibold text-[#0095f6] hover:text-[#00376b]">Clear all</button>
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        {SEARCH_HISTORY.map((item) => (
                            <div key={item.id} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    {item.user ? (
                                        <img src={item.user.avatar} className="w-11 h-11 rounded-full object-cover" alt="avatar" />
                                    ) : (
                                        <div className="w-11 h-11 rounded-full border border-[var(--border-color)] flex items-center justify-center">
                                            <span className="text-[var(--text-primary)] text-xl">#</span>
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-[var(--text-primary)]">
                                            {item.user ? item.user.username : item.text}
                                        </span>
                                        <span className="text-sm text-[var(--text-tertiary)]">
                                            {item.user ? item.user.fullName : ""}
                                        </span>
                                    </div>
                                </div>
                                <X className="text-[var(--text-tertiary)] w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>

                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Explore</h3>
                    <div className="grid grid-cols-3 gap-1">
                        {POSTS.slice(0, 15).map(post => (
                            <div key={post._id} className="aspect-square bg-[var(--bg-secondary)] cursor-pointer">
                                <img src={post.image} className="w-full h-full object-cover" alt="explore" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Search
