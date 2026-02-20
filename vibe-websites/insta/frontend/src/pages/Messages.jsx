import React, { useState } from 'react'
import { Edit, Phone, Video, Info, CircleHelp, Image, Heart, Mic } from 'lucide-react'
import { USERS } from '../data/fakeData'

function Messages() {
    const [activeUser, setActiveUser] = useState(null)

    return (
        <div className="flex h-[calc(100vh-60px)] max-w-5xl mx-auto bg-[var(--bg-elevated)] md:border md:border-[var(--border-color)] md:rounded-lg overflow-hidden md:mt-4 md:mb-4">
            {/* Sidebar / User List */}
            <div className={`w-full md:w-[350px] border-r border-[var(--border-color)] flex flex-col ${activeUser ? 'hidden md:flex' : 'flex'}`}>
                <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
                    <div className="font-bold text-lg flex items-center gap-1 text-[var(--text-primary)]">
                        MyAccount <span className="text-xs">▼</span>
                    </div>
                    <Edit className="w-6 h-6 text-[var(--text-primary)] cursor-pointer" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 flex items-center justify-between">
                        <span className="font-bold text-[var(--text-primary)]">Messages</span>
                        <span className="text-[var(--text-tertiary)] text-sm font-semibold cursor-pointer">Requests</span>
                    </div>
                    {USERS.slice(0, 10).map((user, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveUser(user)}
                            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-[var(--bg-hover)] transition-colors ${activeUser?.username === user.username ? 'bg-[var(--bg-hover)]' : ''}`}
                        >
                            <img src={user.avatar} className="w-14 h-14 rounded-full object-cover" alt="avatar" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-[var(--text-primary)]">{user.fullName}</span>
                                <span className="text-sm text-[var(--text-tertiary)] flex items-center gap-1">
                                    {idx % 3 === 0 ? "Active now" : `Sent a reel • ${idx + 2}h`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col bg-[var(--bg-primary)] ${!activeUser ? 'hidden md:flex' : 'flex'}`}>
                {activeUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-[75px] border-b border-[var(--border-color)] flex items-center justify-between px-6 bg-[var(--bg-elevated)]">
                            <div className="flex items-center gap-3">
                                <button className="md:hidden mr-2 text-[var(--text-primary)]" onClick={() => setActiveUser(null)}>←</button>
                                <img src={activeUser.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                                <span className="font-semibold text-[var(--text-primary)]">{activeUser.fullName}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[var(--text-primary)]">
                                <Phone className="w-6 h-6 cursor-pointer" />
                                <Video className="w-6 h-6 cursor-pointer" />
                                <Info className="w-6 h-6 cursor-pointer" />
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                            <div className="self-center text-[var(--text-tertiary)] text-xs my-4">Today</div>
                            <div className="self-end bg-[#3797f0] text-white py-2 px-4 rounded-3xl rounded-br-none max-w-[70%] text-sm">
                                Hey! How are you doing?
                            </div>
                            <div className="self-start bg-[var(--bg-secondary)] text-[var(--text-primary)] py-2 px-4 rounded-3xl rounded-bl-none max-w-[70%] text-sm border border-[var(--border-color)]">
                                I'm good! Just working on this cool project. 🚀
                            </div>
                            <div className="self-end bg-[#3797f0] text-white py-2 px-4 rounded-3xl rounded-br-none max-w-[70%] text-sm">
                                That sounds awesome! Can't wait to see it.
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4">
                            <div className="w-full flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full px-4 py-2">
                                <div className="p-2 bg-blue-500 rounded-full cursor-pointer">
                                    <Image className="w-4 h-4 text-white" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    className="flex-1 bg-transparent outline-none text-[var(--text-primary)] text-sm"
                                />
                                <div className="flex items-center gap-3 text-[var(--text-primary)] cursor-pointer">
                                    <Mic className="w-6 h-6" />
                                    <Image className="w-6 h-6" />
                                    <Heart className="w-6 h-6 hover:text-red-500" />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-4">
                            <Send className="w-12 h-12 rotate-12" />
                        </div>
                        <h2 className="text-xl font-light mb-2 text-[var(--text-primary)]">Your Messages</h2>
                        <p className="text-[var(--text-tertiary)] text-sm mb-6">Send private photos and messages to a friend or group.</p>
                        <button className="bg-[#0095f6] text-white font-semibold py-2 px-6 rounded-lg text-sm hover:bg-[#1877f2]">
                            Send Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Messages
