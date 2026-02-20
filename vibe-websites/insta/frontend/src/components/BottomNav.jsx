import React from 'react'
import { Home, Search, PlusSquare, Heart, Video, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function BottomNav() {
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[var(--bg-elevated)] border-t border-[var(--border-color)] h-[50px] flex items-center justify-around z-50 md:hidden transition-colors duration-300">
            <Link to="/" className="p-2">
                <Home className={`w-6 h-6 transition-transform ${isActive('/') ? "text-[var(--text-primary)] scale-110" : "text-[var(--text-secondary)]"}`} strokeWidth={isActive('/') ? 3 : 2} />
            </Link>
            <Link to="/explore" className="p-2">
                <Search className={`w-6 h-6 transition-transform ${isActive('/explore') ? "text-[var(--text-primary)] scale-110" : "text-[var(--text-secondary)]"}`} strokeWidth={isActive('/explore') ? 3 : 2} />
            </Link>
            <Link to="/create" className="p-2">
                <PlusSquare className={`w-6 h-6 transition-transform ${isActive('/create') ? "text-[var(--text-primary)] scale-110" : "text-[var(--text-secondary)]"}`} strokeWidth={isActive('/create') ? 3 : 2} />
            </Link>
            <Link to="/reels" className="p-2">
                <Video className={`w-6 h-6 transition-transform ${isActive('/reels') ? "text-[var(--text-primary)] scale-110" : "text-[var(--text-secondary)]"}`} strokeWidth={isActive('/reels') ? 3 : 2} />
            </Link>
            <Link to="/profile" className="p-2">
                {isActive('/profile') ? (
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--text-primary)] p-[1px]">
                        <img src="https://via.placeholder.com/24" className="w-full h-full rounded-full" alt="profile" />
                    </div>
                ) : (
                    <img src="https://via.placeholder.com/24" className="w-6 h-6 rounded-full opacity-70" alt="profile" />
                )}
            </Link>
        </div>
    )
}

export default BottomNav
