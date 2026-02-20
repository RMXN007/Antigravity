import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import Skeleton from '../components/Skeleton'

function History() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/v1/users/history')
                // Check if response returns array directly or wrapped
                // Our controller returns user[0].watchHistory which is an array of video doc objects
                if (res.data?.data) {
                    setVideos(res.data.data)
                } else {
                    setVideos([])
                }
            } catch (err) {
                console.error("Error fetching history:", err)
                setError("Failed to load history")
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    if (loading) {
        return (
            <div className="text-white p-4">
                <h1 className="text-2xl font-bold mb-6">Watch History</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
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
        <div className="text-white p-4">
            <h1 className="text-2xl font-bold mb-6">Watch History</h1>

            {videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                    <p className="text-lg">No watch history yet.</p>
                    <p className="text-sm">Videos you watch will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
                    {/* Note: Watch history might contain duplicate videos if watched multiple times, 
                        key should ideally be unique or index based */}
                    {videos.map((video, index) => (
                        <div key={`${video._id}-${index}`}>
                            <VideoCard video={video} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default History
