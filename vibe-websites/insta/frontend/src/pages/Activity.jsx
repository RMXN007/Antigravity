import React from 'react'
import { NOTIFICATIONS } from '../data/fakeData'

function Activity() {
    return (
        <div className="max-w-2xl mx-auto py-4 px-4 pb-20 md:pb-4">
            <h1 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Notifications</h1>

            <div className="flex flex-col gap-6">
                {/* Today */}
                <div>
                    <h2 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Today</h2>
                    <div className="flex flex-col gap-4">
                        {NOTIFICATIONS.slice(0, 2).map((notif, idx) => (
                            <NotificationItem key={idx} notif={notif} />
                        ))}
                    </div>
                </div>

                {/* This Week */}
                <div>
                    <h2 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">This Week</h2>
                    <div className="flex flex-col gap-4">
                        {NOTIFICATIONS.slice(2).map((notif, idx) => (
                            <NotificationItem key={idx} notif={notif} />
                        ))}
                    </div>
                </div>

                {/* Earlier (Mock repeat) */}
                <div>
                    <h2 className="text-sm font-semibold mb-4 text-[var(--text-primary)]">Earlier</h2>
                    <div className="flex flex-col gap-4">
                        {NOTIFICATIONS.map((notif, idx) => (
                            <NotificationItem key={idx + 10} notif={notif} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function NotificationItem({ notif }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={notif.user.avatar} className="w-11 h-11 rounded-full object-cover cursor-pointer" alt="avatar" />
                    {/* Icon badge could go here */}
                </div>
                <div className="text-sm">
                    <span className="font-semibold text-[var(--text-primary)] cursor-pointer hover:opacity-80 mr-1">{notif.user.username}</span>
                    <span className="text-[var(--text-primary)]">{notif.text}</span>
                    <span className="text-[var(--text-tertiary)] ml-1">{notif.time}</span>
                </div>
            </div>

            {/* Action */}
            {notif.type === 'follow' ? (
                <button className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${notif.isFollowing ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]' : 'bg-[#0095f6] text-white hover:bg-[#1877f2]'}`}>
                    {notif.isFollowing ? 'Following' : 'Follow'}
                </button>
            ) : (
                <img src={notif.postImage} className="w-11 h-11 object-cover rounded cursor-pointer hover:opacity-90" alt="post" />
            )}
        </div>
    )
}

export default Activity
