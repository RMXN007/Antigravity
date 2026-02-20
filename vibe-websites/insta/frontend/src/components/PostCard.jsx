import React, { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import axios from 'axios'
import PostModal from './PostModal'
import ShareModal from './ShareModal'

function PostCard({ post }) {
    const [liked, setLiked] = useState(post.isLiked)
    const [likesCount, setLikesCount] = useState(post.likesCount)
    const [saved, setSaved] = useState(post.isSaved)
    const [showHeartOverlay, setShowHeartOverlay] = useState(false)
    const [showPostModal, setShowPostModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)

    const handleLike = async () => {
        const isLiking = !liked
        setLiked(isLiking)
        setLikesCount(prev => isLiking ? prev + 1 : prev - 1)

        // Simulate API call if needed, otherwise just local state for demo
        // try {
        //     await axios.post(`/api/v1/posts/${post._id}/like`)
        // } catch (err) {
        //     setLiked(!isLiking)
        //     setLikesCount(prev => !isLiking ? prev + 1 : prev - 1)
        // }
    }

    const handleDoubleTap = () => {
        if (!liked) {
            handleLike()
        }
        setShowHeartOverlay(true)
        setTimeout(() => setShowHeartOverlay(false), 1000)
    }

    const handleSave = () => {
        setSaved(!saved)
    }

    return (
        <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] pb-4 mb-4">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 cursor-pointer">
                    <img
                        src={post.owner?.avatar || "https://via.placeholder.com/32"}
                        className="w-8 h-8 rounded-full object-cover border border-[var(--border-light)] p-[1px]"
                        alt="avatar"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold hover:text-[var(--text-secondary)] transition-colors">{post.owner?.username}</span>
                        {post.location && <span className="text-[10px] text-[var(--text-tertiary)]">{post.location}</span>}
                    </div>
                </div>
                <button className="text-[var(--text-primary)] hover:opacity-50 font-bold p-2">...</button>
            </div>

            {/* Image */}
            <div
                className="w-full aspect-square bg-[var(--bg-secondary)] relative cursor-pointer"
                onDoubleClick={handleDoubleTap}
            >
                <img src={post.image} alt="post" className="w-full h-full object-cover" loading="lazy" />

                {/* Heart Overlay Animation */}
                {showHeartOverlay && (
                    <div className="double-tap-heart animate-heart-burst">
                        <Heart className="fill-white" />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-3 pt-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <button onClick={handleLike} className="hover:opacity-60 transition-opacity">
                            <Heart className={`w-6 h-6 transition-all duration-300 ${liked ? "fill-red-500 text-red-500 animate-heart-pulse" : "text-[var(--text-primary)]"}`} />
                        </button>
                        <button onClick={() => setShowPostModal(true)} className="hover:opacity-60 transition-opacity">
                            <MessageCircle className="w-6 h-6 text-[var(--text-primary)]" />
                        </button>
                        <button onClick={() => setShowShareModal(true)} className="hover:opacity-60 transition-opacity">
                            <Send className="w-6 h-6 text-[var(--text-primary)]" />
                        </button>
                    </div>
                    <button onClick={handleSave} className="hover:opacity-60 transition-opacity">
                        <Bookmark className={`w-6 h-6 ${saved ? "fill-[var(--text-primary)] text-[var(--text-primary)]" : "text-[var(--text-primary)]"}`} />
                    </button>
                </div>

                {/* Likes */}
                <p className="text-sm font-semibold mb-1 cursor-pointer">{likesCount.toLocaleString()} likes</p>

                {/* Caption */}
                <div className="text-sm mb-1">
                    <span className="font-semibold mr-2 cursor-pointer hover:underline">{post.owner?.username}</span>
                    <span dangerouslySetInnerHTML={{ __html: post.caption.replace(/#(\w+)/g, '<span class="text-blue-500 cursor-pointer">#$1</span>') }} />
                </div>

                {/* Comments Link */}
                <button onClick={() => setShowPostModal(true)} className="text-[var(--text-tertiary)] text-sm mb-1 cursor-pointer hover:text-[var(--text-secondary)]">
                    View all {post.commentsCount} comments
                </button>

                {/* Date */}
                <p className="text-[10px] text-[var(--text-tertiary)] uppercase">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Modals */}
            {showPostModal && <PostModal post={post} onClose={() => setShowPostModal(false)} />}
            {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
        </div>
    )
}

export default PostCard
