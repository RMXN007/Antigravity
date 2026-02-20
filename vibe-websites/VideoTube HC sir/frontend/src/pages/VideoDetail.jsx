import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import VideoCard from '../components/VideoCard'
import Skeleton from '../components/Skeleton'
import toast from 'react-hot-toast'

function VideoDetail() {
    const { videoId } = useParams()
    const { user } = useAuth()
    const [video, setVideo] = useState(null)
    const [likesCount, setLikesCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [recommendedVideos, setRecommendedVideos] = useState([])
    const [isSubscribed, setIsSubscribed] = useState(false)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                setLoading(true)
                // Fetch Video Details
                const videoRes = await axios.get(`/api/v1/videos/${videoId}`)
                setVideo(videoRes.data.data)

                // Fetch Comments
                const commentsRes = await axios.get(`/api/v1/comments/${videoId}`)
                if (commentsRes.data?.data?.docs) {
                    setComments(commentsRes.data.data.docs)
                } else {
                    setComments([])
                }

                // Fetch Recommended Videos
                const recRes = await axios.get(`/api/v1/videos?limit=10`)
                if (recRes.data?.data?.docs) {
                    const filtered = recRes.data.data.docs.filter(v => v._id !== videoId)
                    // Simple random shuffle for diversity (Fisher-Yates)
                    for (let i = filtered.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
                    }
                    setRecommendedVideos(filtered)
                }

            } catch (err) {
                console.error("Error fetching data:", err)
                setError("Failed to load video data")
            } finally {
                setLoading(false)
            }
        }

        if (videoId) {
            fetchVideoData()
            // Reset states when changing video
            setIsSubscribed(false)
            setIsLiked(false)
            setLikesCount(0)
        }
    }, [videoId])

    const handleLike = async () => {
        if (!user) return toast.error("Please login to like")
        try {
            const res = await axios.post(`/api/v1/likes/toggle/v/${videoId}`)
            if (res.data.data.isLiked) {
                setLikesCount(prev => prev + 1)
                setIsLiked(true)
                toast.success("Liked video")
            } else {
                setLikesCount(prev => prev - 1)
                setIsLiked(false)
                toast.success("Unliked video")
            }
        } catch (err) {
            console.error("Error toggling like", err)
            toast.error("Failed to like video")
        }
    }

    const handleSubscribe = async () => {
        if (!user) return toast.error("Please login to subscribe")
        try {
            const channelId = video.ownerDetails?._id || video.owner
            const res = await axios.post(`/api/v1/subscriptions/c/${channelId}`)
            if (res.data.data.subscribed) {
                setIsSubscribed(true)
                toast.success("Subscribed to channel")
            } else {
                setIsSubscribed(false)
                toast.success("Unsubscribed")
            }
        } catch (err) {
            console.error("Error subscribing", err)
            toast.error("Failed to update subscription")
        }
    }

    const onCommentSubmit = async (data) => {
        if (!user) return toast.error("Please login to comment")
        try {
            const res = await axios.post(`/api/v1/comments/${videoId}`, { content: data.content })
            const newComment = res.data.data
            // Manually add owner for immediate display
            newComment.ownerDetails = {
                username: user.username,
                avatar: user.avatar,
                _id: user._id
            }

            setComments(prev => [newComment, ...prev])
            reset()
            toast.success("Comment posted")
        } catch (err) {
            console.error("Error posting comment", err)
            toast.error("Failed to post comment")
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/v1/comments/c/${commentId}`)
            setComments(prev => prev.filter(c => c._id !== commentId))
            toast.success("Comment deleted")
        } catch (err) {
            console.error("Error deleting comment", err)
            toast.error("Failed to delete comment")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center h-[calc(100vh-100px)] text-white pt-10">
                <Skeleton type="video-detail" />
            </div>
        )
    }

    if (error || !video) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)] text-white">
                <p className="text-red-500">{error || "Video not found"}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 text-white max-w-[1600px] mx-auto p-4">
            {/* Main Content: Video Player and Info */}
            <div className="flex-1">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] border border-white/10 ring-1 ring-white/5 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <iframe
                        src={video.videoFile}
                        title={video.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="mt-4 px-2">
                    <h1 className="text-xl md:text-2xl font-bold line-clamp-2">{video.title}</h1>

                    <div className="flex justify-between items-center mt-4 pb-4 border-b border-[#303030]">
                        <div className="flex items-center gap-4">
                            <img
                                src={video.ownerDetails?.avatar || "https://via.placeholder.com/40"}
                                alt="channel avatar"
                                className="w-10 h-10 rounded-full object-cover bg-gray-500"
                            />
                            <div>
                                <h3 className="font-semibold text-base">{video.ownerDetails?.fullName || video.ownerDetails?.username || "Unknown Channel"}</h3>
                                <p className="text-gray-400 text-sm">{video.ownerDetails?.subscribersCount || 0} subscribers</p>
                            </div>
                            <button
                                onClick={handleSubscribe}
                                className={`ml-4 px-4 py-2 font-semibold rounded-full transition-colors ${isSubscribed
                                    ? "bg-[#303030] text-gray-200 hover:bg-[#404040]"
                                    : "bg-white text-black hover:bg-gray-200"
                                    }`}
                            >
                                {isSubscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isLiked ? "bg-white text-black" : "bg-[#222] hover:bg-[#333]"}`}
                            >
                                <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                                {likesCount || video.view || 0}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#222] hover:bg-[#333] rounded-full transition-colors">
                                Share
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 bg-[#1e1e1e] p-3 rounded-lg text-sm text-gray-200 whitespace-pre-wrap">
                        <p className="font-semibold mb-2">{video.views} views • {new Date(video.createdAt).toDateString()}</p>
                        {video.description}
                    </div>

                    {/* Comments Section */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>

                        {/* Add Comment Form */}
                        {user && (
                            <form onSubmit={handleSubmit(onCommentSubmit)} className="flex gap-3 mb-6">
                                <img
                                    src={user.avatar || "https://via.placeholder.com/40"}
                                    alt="user avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <input
                                        {...register("content", { required: true })}
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="w-full bg-transparent border-b border-[#303030] focus:border-white outline-none pb-1 text-sm text-white transition-colors"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700">
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment._id} className="flex gap-3 group">
                                    <img
                                        src={comment.ownerDetails?.avatar || "https://via.placeholder.com/40"}
                                        alt="commenter avatar"
                                        className="w-10 h-10 rounded-full object-cover bg-gray-500"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex gap-2 items-center mb-1">
                                                    <span className="font-semibold text-sm">{comment.ownerDetails?.username || "User"}</span>
                                                    <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-200">{comment.content}</p>
                                            </div>

                                            {/* Delete Button (Only for owner) */}
                                            {user && (comment.ownerDetails?._id === user._id || comment.owner === user._id) && (
                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded"
                                                    title="Delete comment"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-2.129-1.858L4.757 14.243 3.375 7.757a1 1 0 01.97-1.22H19.654a1 1 0 01.971 1.22zM7 7V3h10v4M10 3v4M14 3v4"></path></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Sidebar: Recommended Videos */}
            <div className="lg:w-[350px] flex-shrink-0">
                <h3 className="text-lg font-bold mb-4 px-2">Up Next</h3>
                <div className="flex flex-col gap-3">
                    {recommendedVideos.map((vid) => (
                        <div key={vid._id} className="w-full">
                            <VideoCard video={vid} type="list" />
                        </div>
                    ))}

                    {recommendedVideos.length === 0 && (
                        <div className="text-gray-500 text-center py-10 bg-[#121212] rounded-lg">
                            No recommendations available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoDetail
