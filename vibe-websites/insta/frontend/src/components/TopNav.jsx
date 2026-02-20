import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Compass, MessageCircle, Heart, PlusSquare, User, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'

function TopNav() {
    const { isDarkMode, toggleTheme } = useTheme()
    const { showToast } = useToast()
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <div className="fixed top-0 left-0 w-full bg-[var(--bg-elevated)] border-b border-[var(--border-color)] h-[60px] z-50 px-4 md:px-[20%] transition-colors duration-300">
            <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold font-cursive tracking-wider">
                    InstaClone
                </Link>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:block w-[268px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[var(--text-tertiary)]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-[var(--bg-secondary)] border-none text-[var(--text-primary)] text-sm rounded-lg block w-full pl-10 p-2 focus:ring-1 focus:ring-[var(--text-tertiary)] focus:outline-none"
                    />
                </div>

                {/* Icons (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/"><Home className={`nav-icon w-6 h-6 ${isActive('/') ? "fill-[var(--text-primary)]" : ""}`} /></Link>
                    <Link to="/messages"><MessageCircle className={`nav-icon w-6 h-6 ${isActive('/messages') ? "fill-[var(--text-primary)]" : ""}`} /></Link>
                    <Link to="/create"><PlusSquare className={`nav-icon w-6 h-6 ${isActive('/create') ? "fill-[var(--text-primary)]" : ""}`} /></Link>
                    <Link to="/explore"><Compass className={`nav-icon w-6 h-6 ${isActive('/explore') ? "fill-[var(--text-primary)]" : ""}`} /></Link>
                    <Link to="/activity"><Heart className={`nav-icon w-6 h-6 ${isActive('/activity') ? "fill-[var(--text-primary)]" : ""}`} /></Link>
                    <Link to="/profile">
                        <img src="https://via.placeholder.com/24" className={`w-6 h-6 rounded-full border ${isActive('/profile') ? "border-[var(--text-primary)]" : "border-transparent"}`} alt="profile" />
                    </Link>
                    <div onClick={toggleTheme} className="cursor-pointer">
                        {isDarkMode ? '☀️' : '🌙'}
                    </div>
                </div>

                {/* Mobile Header Actions */}
                <div className="flex md:hidden items-center gap-4">
                    <div onClick={toggleTheme} className="cursor-pointer text-xl">
                        {isDarkMode ? '☀️' : '🌙'}
                    </div>
                    <Link to="/activity"><Heart className="w-6 h-6" /></Link>
                    <Link to="/messages"><MessageCircle className="w-6 h-6" /></Link>
                </div>
            </div>
        </div>
    )
}

export default TopNav
