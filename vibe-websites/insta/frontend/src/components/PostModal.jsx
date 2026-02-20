import React, { useState } from 'react'
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from 'lucide-react'
import { COMMENTS } from '../data/fakeData'

function PostModal({ post, onClose }) {
    const [liked, setLiked] = useState(post.isLiked)
    const [saved, setSaved] = useState(post.isSaved)
    const [comment, setComment] = useState('')
    const [localComments, setLocalComments] = useState(COMMENTS)

    const handleLike = () => setLiked(!liked)
    const handleSave = () => setSaved(!saved)

    const handlePostComment = (e) => {
        e.preventDefault()
        if (!comment.trim()) return

        const newComment = {
            id: Date.now(),
            user: { username: 'my_account', avatar: 'https://via.placeholder.com/150' }, // Current user
            text: comment,
            time: 'Just now'
        }
        setLocalComments([...localComments, newComment])
        setComment('')
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <button className="absolute top-4 right-4 text-white z-[110]" onClick={onClose}>
                <X className="w-8 h-8" />
            </button>

            <div className="bg-[var(--bg-elevated)] max-w-6xl w-full max-h-[90vh] h-[90vh] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl transition-colors duration-300" onClick={e => e.stopPropagation()}>
                {/* Image Section */}
                <div className="hidden md:flex flex-1 bg-black items-center justify-center h-full">
                    <img src={post.image} className="max-w-full max-h-full object-contain" alt="post" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-[400px] lg:w-[500px] flex flex-col h-full bg-[var(--bg-elevated)] border-l border-[var(--border-color)]">

                    {/* Header */}
                    <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={post.owner.avatar} className="w-8 h-8 rounded-full object-cover border border-[var(--border-light)]" alt="avatar" />
                            <span className="font-semibold text-sm text-[var(--text-primary)] hover:opacity-70 cursor-pointer">{post.owner.username}</span>
                            <span className="text-[var(--text-primary)]">•</span>
                            <span className="text-[#0095f6] font-semibold text-sm cursor-pointer hover:text-[#00376b]">Follow</span>
                        </div>
                        <MoreHorizontal className="w-6 h-6 text-[var(--text-primary)] cursor-pointer" />
                    </div>

                    {/* Comments Area */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
                        {/* Caption as first comment */}
                        <div className="flex gap-3">
                            <img src={post.owner.avatar} className="w-8 h-8 rounded-full object-cover mt-1" alt="avatar" />
                            <div className="flex flex-col text-sm">
                                <div>
                                    <span className="font-semibold text-[var(--text-primary)] mr-2">{post.owner.username}</span>
                                    <span className="text-[var(--text-primary)]" dangerouslySetInnerHTML={{ __html: post.caption.replace(/#(\w+)/g, '<span class="text-blue-500">#$1</span>') }} />
                                </div>
                                <span className="text-[var(--text-tertiary)] text-xs mt-1">2h</span>
                            </div>
                        </div>

                        {/* Fake Comments */}
                        {localComments.map((c) => (
                            <div key={c.id} className="flex gap-3">
                                <img src={c.user.avatar} className="w-8 h-8 rounded-full object-cover mt-1" alt="avatar" />
                                <div className="flex flex-col text-sm w-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-semibold text-[var(--text-primary)] mr-2">{c.user.username}</span>
                                            <span className="text-[var(--text-primary)]">{c.text}</span>
                                        </div>
                                        <Heart className="w-3 h-3 text-[var(--text-tertiary)] hover:text-[var(--text-tertiary)] cursor-pointer" />
                                    </div>
                                    <div className="flex gap-3 mt-1 text-xs text-[var(--text-tertiary)] font-semibold">
                                        <span>{c.time}</span>
                                        <span className="cursor-pointer hover:text-[var(--text-secondary)]">Reply</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-[var(--border-color)]">
                        <div className="flex justify-between mb-2">
                            <div className="flex gap-4">
                                <Heart
                                    className={`w-6 h-6 cursor-pointer ${liked ? 'fill-[#ed4956] text-[#ed4956]' : 'text-[var(--text-primary)] hover:opacity-50'}`}
                                    onClick={handleLike}
                                />
                                <MessageCircle className="w-6 h-6 text-[var(--text-primary)] cursor-pointer hover:opacity-50" />
                                <Send className="w-6 h-6 text-[var(--text-primary)] cursor-pointer hover:opacity-50" />
                            </div>
                            <Bookmark
                                className={`w-6 h-6 cursor-pointer ${saved ? 'fill-[var(--text-primary)] text-[var(--text-primary)]' : 'text-[var(--text-primary)] hover:opacity-50'}`}
                                onClick={handleSave}
                            />
                        </div>
                        <div className="font-semibold text-sm mb-1 text-[var(--text-primary)]">{(post.likesCount + (liked ? 1 : 0)).toLocaleString()} likes</div>
                        <div className="text-[10px] text-[var(--text-tertiary)] uppercase mb-3">2 DAYS AGO</div>

                        {/* Comment Input */}
                        <form onSubmit={handlePostComment} className="flex items-center gap-2 border-t border-[var(--border-color)] pt-3">
                            <Smile className="w-6 h-6 text-[var(--text-primary)] cursor-pointer" />
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent outline-none text-sm text-[var(--text-primary)]"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-[#0095f6] font-semibold text-sm disabled:opacity-50"
                                disabled={!comment.trim()}
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal
