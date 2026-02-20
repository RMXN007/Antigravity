import React, { useState } from 'react'
import { X, Search } from 'lucide-react'
import { USERS } from '../data/fakeData'

function ShareModal({ onClose }) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState([])

    const filteredUsers = USERS.filter(u => u.username.toLowerCase().includes(query.toLowerCase()) || u.fullName.toLowerCase().includes(query.toLowerCase()))

    const toggleSelect = (username) => {
        if (selected.includes(username)) {
            setSelected(selected.filter(s => s !== username))
        } else {
            setSelected([...selected, username])
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-[var(--bg-elevated)] w-[400px] h-[60vh] rounded-xl flex flex-col shadow-2xl transition-colors duration-300" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-[var(--border-color)]">
                    <div className="w-8"></div>
                    <span className="font-bold text-[var(--text-primary)]">Share</span>
                    <button onClick={onClose}><X className="w-6 h-6 text-[var(--text-primary)]" /></button>
                </div>

                {/* Search */}
                <div className="p-3 border-b border-[var(--border-color)] flex items-center gap-2">
                    <span className="font-semibold text-[var(--text-primary)]">To:</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-transparent outline-none text-sm text-[var(--text-primary)]"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] px-2 mb-2">Suggested</h3>
                    {filteredUsers.map(user => (
                        <div
                            key={user.username}
                            className="flex items-center justify-between p-2 hover:bg-[var(--bg-hover)] rounded-lg cursor-pointer group"
                            onClick={() => toggleSelect(user.username)}
                        >
                            <div className="flex items-center gap-3">
                                <img src={user.avatar} className="w-11 h-11 rounded-full object-cover" alt="avatar" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-[var(--text-primary)]">{user.fullName}</span>
                                    <span className="text-xs text-[var(--text-tertiary)]">{user.username}</span>
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected.includes(user.username) ? 'bg-[#0095f6] border-[#0095f6]' : 'border-[var(--border-color)] group-hover:border-[var(--text-tertiary)]'}`}>
                                {selected.includes(user.username) && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[var(--border-color)]">
                    <button
                        className="w-full bg-[#0095f6] text-white font-semibold py-2.5 rounded-lg disabled:opacity-50 hover:bg-[#1877f2] transition-colors"
                        disabled={selected.length === 0}
                        onClick={onClose}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareModal
