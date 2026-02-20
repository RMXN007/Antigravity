import React from 'react'
import { Link } from 'react-router-dom'
import { SUGGESTED_USERS } from '../data/fakeData'

function Sidebar() {
    return (
        <div className="hidden lg:block w-[320px] pl-8 mt-8 fixed right-0 top-0 h-full pr-8">
            {/* User Profile */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <img
                        src="https://via.placeholder.com/56"
                        alt="current user"
                        className="w-14 h-14 rounded-full object-cover cursor-pointer"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[var(--text-primary)] cursor-pointer">my_account</span>
                        <span className="text-sm text-[var(--text-tertiary)]">My Name</span>
                    </div>
                </div>
                <button className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b]">Switch</button>
            </div>

            {/* Suggestions Header */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[var(--text-tertiary)]">Suggested for you</span>
                <button className="text-xs font-semibold text-[var(--text-primary)] hover:opacity-50">See All</button>
            </div>

            {/* Suggestions List */}
            <div className="flex flex-col gap-3">
                {SUGGESTED_USERS.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                            />
                            <div className="flex flex-col">
                                <Link to={`/profile`} className="text-xs font-semibold text-[var(--text-primary)] hover:underline">
                                    {user.username}
                                </Link>
                                <span className="text-[10px] text-[var(--text-tertiary)] truncate w-32" title={user.followedBy}>
                                    {user.followedBy}
                                </span>
                            </div>
                        </div>
                        <button className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b]">Follow</button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#c7c7c7]">
                {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'].map((link) => (
                    <a href="#" key={link} className="hover:underline">{link}</a>
                ))}
            </div>
            <div className="mt-4 text-xs text-[#c7c7c7] uppercase">
                © 2024 INSTAGRAM FROM META
            </div>
        </div>
    )
}

export default Sidebar
