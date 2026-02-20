import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="glass fixed top-0 z-50 w-full px-6 py-3 border-b border-white/10">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-shadow">
                            V
                        </div>
                        <span className="self-center text-xl font-bold whitespace-nowrap text-white tracking-tight">
                            VideoTube
                        </span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="hidden md:block w-1/3">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full p-2.5 pl-10 text-sm text-white border border-white/10 rounded-full bg-black/20 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all backdrop-blur-sm"
                            placeholder="Search content..."
                        />
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center">
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-white hover:text-indigo-300 font-medium text-sm px-4 py-2 transition-colors">
                            Login
                        </Link>
                        <Link to="/signup" className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-full text-sm px-5 py-2 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
