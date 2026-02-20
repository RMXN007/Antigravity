import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import Skeleton from '../components/Skeleton'

function Home() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/api/v1/videos')

                if (response.data?.data?.docs) {
                    setVideos(response.data.data.docs)
                } else {
                    setVideos([])
                }
            } catch (err) {
                console.error("Error fetching videos:", err)
                // Log detailed error from backend if available
                const msg = err.response?.data?.message || err.message || "Failed to load videos";
                setError(msg)
            } finally {
                setLoading(false)
            }
        }

        fetchVideos()
    }, [])

    if (loading) {
        return (
            <div className="text-white p-4">
                <h1 className="text-2xl font-bold mb-4 hidden">Recommended</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Skeleton key={i} type="video-card" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)] text-white">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4 hidden">Recommended</h1>

            {videos.length === 0 ? (
                <div className="flex justify-center mt-10 text-gray-400">
                    No videos found. Be the first to publish one!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
