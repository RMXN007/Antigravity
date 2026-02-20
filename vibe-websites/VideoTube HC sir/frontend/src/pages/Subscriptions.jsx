import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import Skeleton from '../components/Skeleton'
import { useAuth } from '../context/AuthContext'

function Subscriptions() {
    const { user } = useAuth()
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (!user) {
                setLoading(false)
                return
            }
            try {
                setLoading(true)
                const res = await axios.get(`/api/v1/subscriptions/u/${user._id}`)
                if (res.data?.data) {
                    setChannels(res.data.data)
                }
            } catch (err) {
                console.error("Error fetching subscriptions:", err)
                setError("Failed to load subscriptions")
            } finally {
                setLoading(false)
            }
        }

        fetchSubscriptions()
    }, [user])

    if (loading) {
        return (
            <div className="text-white p-4">
                <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="animate-pulse bg-[#272727] h-20 rounded-lg"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)] text-white">
                <p>Please login to view subscriptions</p>
            </div>
        )
    }

    return (
        <div className="text-white p-4">
            <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>

            {channels.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                    <p className="text-lg">You haven't subscribed to any channels yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {channels.map((sub) => (
                        <div key={sub._id} className="bg-[#1e1e1e] p-4 rounded-lg flex items-center gap-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                            <img
                                src={sub.channelDetails?.avatar || "https://via.placeholder.com/50"}
                                alt={sub.channelDetails?.username}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold">{sub.channelDetails?.username}</h3>
                                <p className="text-sm text-gray-400">{sub.channelDetails?.fullName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Note: Ideally we would fetch VIDEOS from these channels too, but for MVP 
                we are just showing the list of subscribed channels. 
                Use "Future Roadmap" to implement feed aggregation. */}
        </div>
    )
}

export default Subscriptions
