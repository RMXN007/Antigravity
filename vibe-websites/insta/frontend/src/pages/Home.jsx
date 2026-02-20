import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'
import Stories from '../components/Stories'
import Sidebar from '../components/Sidebar' // Import Sidebar
import { POSTS } from '../data/fakeData' // Fallback data

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                // Try fetching from API first
                // const res = await axios.get('/api/v1/posts/feed', {
                //     headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                // })
                // if (res.data.success && res.data.data.docs.length > 0) {
                //     setPosts(res.data.data.docs)
                // } else {
                // Fallback to fake data
                setPosts(POSTS)
                // }
            } catch (err) {
                console.error(err)
                setPosts(POSTS)
            } finally {
                setLoading(false)
            }
        }
        fetchFeed()
    }, [])

    return (
        <div className="flex max-w-[850px] mx-auto">
            {/* Feed Section */}
            <div className="w-full lg:w-[470px] mx-auto py-8">
                <Stories />
                <div className="flex flex-col">
                    {loading ? (
                        <>
                            {[1, 2].map(i => <div key={i} className="h-[500px] w-full bg-[var(--bg-elevated)] animate-pulse mb-8 rounded-lg" />)}
                        </>
                    ) : (
                        <>
                            {posts.map(post => (
                                <PostCard key={post._id} post={post} />
                            ))}
                            {posts.length === 0 && <p className="text-center text-[var(--text-tertiary)]">No posts yet.</p>}
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar (Desktop only) */}
            <div className="hidden lg:block w-[320px]">
                <Sidebar />
            </div>
        </div>
    )
}

export default Home
