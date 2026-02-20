import React from 'react'

export function PostSkeleton() {
    return (
        <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] pb-4 mb-4 animate-pulse">
            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-hover)]"></div>
                    <div className="h-3 w-24 bg-[var(--bg-hover)] rounded"></div>
                </div>
            </div>
            <div className="w-full aspect-square bg-[var(--bg-hover)]"></div>
            <div className="px-3 pt-3">
                <div className="h-4 w-full bg-[var(--bg-hover)] rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-[var(--bg-hover)] rounded"></div>
            </div>
        </div>
    )
}

export function StorySkeleton() {
    return (
        <div className="flex gap-4 px-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex flex-col items-center gap-1 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-hover)]"></div>
                    <div className="h-2 w-12 bg-[var(--bg-hover)] rounded"></div>
                </div>
            ))}
        </div>
    )
}

export function ProfileSkeleton() {
    return (
        <div className="max-w-[850px] mx-auto py-8 px-4 animate-pulse">
            <div className="flex gap-8 items-center mb-8">
                <div className="w-20 h-20 md:w-36 md:h-36 rounded-full bg-[var(--bg-hover)]"></div>
                <div className="flex-1 space-y-4">
                    <div className="h-6 w-32 bg-[var(--bg-hover)] rounded"></div>
                    <div className="flex gap-6">
                        <div className="h-4 w-16 bg-[var(--bg-hover)] rounded"></div>
                        <div className="h-4 w-16 bg-[var(--bg-hover)] rounded"></div>
                        <div className="h-4 w-16 bg-[var(--bg-hover)] rounded"></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                    <div key={i} className="aspect-square bg-[var(--bg-hover)]"></div>
                ))}
            </div>
        </div>
    )
}
