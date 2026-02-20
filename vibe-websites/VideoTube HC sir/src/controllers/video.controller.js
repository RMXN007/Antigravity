import axios from "axios"
import { ApiError } from "../utiles/ApiError.js"
import { ApiResponse } from "../utiles/ApiResponse.js"
import { asyncHandler } from "../utiles/asyncHandler.js"

const RAPID_API_URL = "https://youtube-v31.p.rapidapi.com";
const RAPID_API_OPTIONS = {
    headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': process.env.RAPID_API_HOST || 'youtube-v31.p.rapidapi.com'
    }
};

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType } = req.query

    // Check if API key is present
    if (!process.env.RAPID_API_KEY) {
        // Fallback: Return empty or error. Better to error so user knows to add key.
        // For smoother UX in demo, we could return mock data, but let's stick to the requested "Real YouTube" plan.
        throw new ApiError(500, "RapidAPI Key is missing in backend .env")
    }

    try {
        const response = await axios.get(`${RAPID_API_URL}/search`, {
            ...RAPID_API_OPTIONS,
            params: {
                q: query || "trending",
                part: "snippet,id",
                regionCode: "US",
                maxResults: limit,
                order: sortBy === 'views' ? 'viewCount' : 'date',
                type: 'video'
            }
        });

        const videos = response.data.items.map(item => ({
            _id: item.id.videoId, // Use YouTube ID as _id
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            description: item.snippet.description,
            ownerDetails: {
                username: item.snippet.channelTitle,
                avatar: "https://via.placeholder.com/40" // API doesn't return avatar in search
            },
            views: 0, // Search API doesn't return views
            duration: 0,
            createdAt: item.snippet.publishedAt
        }));

        return res
            .status(200)
            .json(new ApiResponse(200, { docs: videos }, "Videos fetched from YouTube API"))

    } catch (error) {
        console.error("RapidAPI Error:", error.message);
        // Handle quota exceeded or other errors
        throw new ApiError(500, `Failed to fetch videos from YouTube API: ${error.message}`)
    }
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!process.env.RAPID_API_KEY) {
        throw new ApiError(500, "RapidAPI Key is missing")
    }

    try {
        const response = await axios.get(`${RAPID_API_URL}/videos`, {
            ...RAPID_API_OPTIONS,
            params: {
                part: 'contentDetails,snippet,statistics',
                id: videoId
            }
        });

        if (!response.data.items || response.data.items.length === 0) {
            throw new ApiError(404, "Video not found")
        }

        const item = response.data.items[0];
        const video = {
            _id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            videoFile: "https://www.youtube.com/embed/" + item.id, // For iframe
            thumbnail: item.snippet.thumbnails.high?.url,
            views: item.statistics.viewCount,
            likes: item.statistics.likeCount,
            ownerDetails: {
                username: item.snippet.channelTitle,
                avatar: "https://via.placeholder.com/40"
            },
            createdAt: item.snippet.publishedAt
        };

        return res
            .status(200)
            .json(new ApiResponse(200, video, "Video fetched successfully"))

    } catch (error) {
        console.error("RapidAPI Error:", error.message);
        throw new ApiError(500, "Failed to fetch video details")
    }
})

const publishAVideo = asyncHandler(async (req, res) => {
    return res.status(501).json(new ApiResponse(501, {}, "Upload disabled in YouTube API mode"))
})
const updateVideo = asyncHandler(async (req, res) => {
    return res.status(501).json(new ApiResponse(501, {}, "Update disabled in YouTube API mode"))
})
const deleteVideo = asyncHandler(async (req, res) => {
    return res.status(501).json(new ApiResponse(501, {}, "Delete disabled in YouTube API mode"))
})
const togglePublishStatus = asyncHandler(async (req, res) => {
    return res.status(501).json(new ApiResponse(501, {}, "Toggle disabled in YouTube API mode"))
})


export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
