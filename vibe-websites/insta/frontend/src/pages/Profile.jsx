import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Settings, Grid, Bookmark, Film, UserPlus } from 'lucide-react'
import { POSTS, REELS, USERS } from '../data/fakeData'
import { ProfileSkeleton } from '../components/Skeleton'

function Profile() {
    const [posts, setPosts] = useState([])
    const [activeTab, setActiveTab] = useState('posts')
    const [loading, setLoading] = useState(true)

    // Simulating user data
    const user = {
        username: 'my_account',
        fullName: 'My Name',
        bio: 'Creating digital dreams ✨\nExplorer & Creator 📸\n📍 Earth',
        avatar: 'https://via.placeholder.com/150',
        postsCount: 42,
        followersCount: 1234,
        followingCount: 567
    }

    useEffect(() => {
        // Simulate fetch delay
        setTimeout(() => {
            setPosts(POSTS.slice(0, 12)) // Different set for profile?
            setLoading(false)
        }, 800)
    }, [])

    if (loading) return <ProfileSkeleton />

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 pb-20 md:pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-center md:items-start mb-8 md:px-10">
                <div className="w-20 h-20 md:w-36 md:h-36 rounded-full bg-[var(--bg-secondary)] overflow-hidden shrink-0 border border-[var(--border-color)]">
                    <img src={user.avatar} alt="profile" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <h1 className="text-xl text-[var(--text-primary)] font-light">{user.username}</h1>
                        <div className="flex gap-2">
                            <button className="bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-hover)] border border-[var(--border-color)]">Edit profile</button>
                            <button className="bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-hover)] border border-[var(--border-color)]">View archive</button>
                            <button className="bg-[var(--bg-secondary)] text-[var(--text-primary)] p-1.5 rounded-lg hover:bg-[var(--bg-hover)] border border-[var(--border-color)]"><Settings className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <div className="flex justify-around md:justify-start gap-8 mb-4 border-b md:border-none border-[var(--border-color)] py-2 md:py-0 w-full">
                        <span className="text-center md:text-left"><b className="text-[var(--text-primary)]">{user.postsCount}</b> <span className="text-[var(--text-primary)]">posts</span></span>
                        <span className="text-center md:text-left"><b className="text-[var(--text-primary)]">{user.followersCount}</b> <span className="text-[var(--text-primary)]">followers</span></span>
                        <span className="text-center md:text-left"><b className="text-[var(--text-primary)]">{user.followingCount}</b> <span className="text-[var(--text-primary)]">following</span></span>
                    </div>

                    <div className="hidden md:block">
                        <div className="font-semibold text-[var(--text-primary)]">{user.fullName}</div>
                        <div className="whitespace-pre-wrap text-sm text-[var(--text-primary)]">{user.bio}</div>
                    </div>
                </div>
            </div>

            {/* Mobile Bio */}
            <div className="md:hidden mb-6 px-1">
                <div className="font-semibold text-[var(--text-primary)]">{user.fullName}</div>
                <div className="whitespace-pre-wrap text-sm text-[var(--text-primary)]">{user.bio}</div>
            </div>

            <hr className="border-[var(--border-color)] mb-0" />

            {/* Tabs */}
            <div className="flex justify-center gap-12 text-xs font-semibold tracking-widest text-[var(--text-tertiary)] uppercase border-t border-[var(--border-color)] -mt-[1px]">
                <button
                    onClick={() => setActiveTab('posts')}
                    className={`flex items-center gap-1 py-4 border-t ${activeTab === 'posts' ? 'border-[var(--text-primary)] text-[var(--text-primary)]' : 'border-transparent'}`}
                >
                    <Grid className="w-3 h-3" /> Posts
                </button>
                <button
                    onClick={() => setActiveTab('saved')}
                    className={`flex items-center gap-1 py-4 border-t ${activeTab === 'saved' ? 'border-[var(--text-primary)] text-[var(--text-primary)]' : 'border-transparent'}`}
                >
                    <Bookmark className="w-3 h-3" /> Saved
                </button>
                <button
                    onClick={() => setActiveTab('reels')}
                    className={`flex items-center gap-1 py-4 border-t ${activeTab === 'reels' ? 'border-[var(--text-primary)] text-[var(--text-primary)]' : 'border-transparent'}`}
                >
                    <Film className="w-3 h-3" /> Reels
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-4">
                {activeTab === 'posts' && posts.map(post => (
                    <div key={post._id} className="aspect-square bg-[var(--bg-secondary)] overflow-hidden relative group cursor-pointer hover:opacity-90">
                        <img src={post.image} alt="post" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                ))}
                {activeTab === 'reels' && REELS.map(reel => (
                    <div key={reel.id} className="aspect-[9/16] bg-[var(--bg-secondary)] overflow-hidden relative group cursor-pointer hover:opacity-90">
                        <div className="absolute top-2 right-2 z-10 text-white font-bold flex items-center gap-1 text-sm shadow-black drop-shadow-md">
                            <Film className="w-4 h-4 fill-white" /> {reel.views}
                        </div>
                        <video src={reel.url} className="w-full h-full object-cover" />
                    </div>
                ))}
                {activeTab === 'saved' && (
                    <div className="col-span-3 py-10 text-center text-[var(--text-tertiary)] flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-2 border-[var(--text-primary)] flex items-center justify-center mb-4">
                            <Bookmark className="w-8 h-8 text-[var(--text-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Save</h3>
                        <p className="max-w-xs text-sm">Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
