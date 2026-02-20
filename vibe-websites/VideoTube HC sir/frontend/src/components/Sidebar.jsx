import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const navItems = [
        { name: 'Home', path: '/', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>) },
        { name: 'History', path: '/history', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>) },
        { name: 'Subscriptions', path: '/subscriptions', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>) },
        { name: 'Liked Videos', path: '/liked-videos', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>) },
    ];

    return (
        <aside className="glass fixed top-0 left-0 z-40 w-64 h-screen pt-24 transition-transform -translate-x-full border-r border-white/5 sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-4 pb-4 overflow-y-auto">
                <ul className="space-y-3 font-medium">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `flex items-center p-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/5 hover:text-white ${isActive ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : ""}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={`transition-colors ${isActive ? "text-indigo-400" : "text-gray-400 group-hover:text-white"}`}>
                                            {item.icon}
                                        </span>
                                        <span className="ml-3 font-medium tracking-wide">{item.name}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
