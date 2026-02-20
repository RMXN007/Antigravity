import React from 'react'

function Skeleton({ type = "text", className = "" }) {
    const baseClass = "bg-[#272727] animate-pulse rounded"

    if (type === "video-card") {
        return (
            <div className="w-full flex flex-col gap-2">
                <div className={`${baseClass} w-full aspect-video rounded-xl`}></div>
                <div className="flex gap-3 px-1">
                    <div className={`${baseClass} w-10 h-10 rounded-full flex-shrink-0`}></div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className={`${baseClass} h-4 w-3/4`}></div>
                        <div className={`${baseClass} h-3 w-1/2`}></div>
                    </div>
                </div>
            </div>
        )
    }

    if (type === "video-detail") {
        return (
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1600px] mx-auto p-4">
                <div className="flex-1">
                    <div className={`${baseClass} w-full aspect-video rounded-xl`}></div>
                    <div className="mt-4 px-2 space-y-4">
                        <div className={`${baseClass} h-6 w-3/4`}></div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`${baseClass} w-10 h-10 rounded-full`}></div>
                                <div className="space-y-2">
                                    <div className={`${baseClass} h-4 w-32`}></div>
                                    <div className={`${baseClass} h-3 w-20`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-[350px] space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-2">
                            <div className={`${baseClass} w-40 h-24 rounded-lg`}></div>
                            <div className="flex-1 space-y-2">
                                <div className={`${baseClass} h-3 w-full`}></div>
                                <div className={`${baseClass} h-3 w-2/3`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return <div className={`${baseClass} ${className}`}></div>
}

export default Skeleton
