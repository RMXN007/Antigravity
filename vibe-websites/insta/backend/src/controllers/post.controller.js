import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const createPost = asyncHandler(async (req, res) => {
    const { caption, location } = req.body;

    const imageLocalPath = req.files?.image?.[0]?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        throw new ApiError(500, "Image upload failed");
    }

    const post = await Post.create({
        image: image.url,
        caption,
        location,
        owner: req.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created successfully"));
});

const getFeedPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Try Fetching from DB
        if (mongoose.connection.readyState !== 1) throw new Error("DB Not Connected");

        const postsAggregate = Post.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [{ $project: { username: 1, avatar: 1 } }]
                }
            },
            { $unwind: "$owner" }
        ]);

        const posts = await Post.aggregatePaginate(postsAggregate, {
            page: parseInt(page),
            limit: parseInt(limit)
        });

        return res.status(200).json(new ApiResponse(200, posts, "Feed fetched successfully"));

    } catch (error) {
        console.log("Serving Mock Data due to DB Error:", error.message);
        // Fallback Mock Data
        const { MOCK_POSTS } = await import("../utils/mockData.js");
        return res.status(200).json(new ApiResponse(200, { docs: MOCK_POSTS }, "Fetched from Mock Data (DB Error)"));
    }
});

const getUserPosts = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const posts = await Post.aggregate([
        {
            $match: {
                owner: user._id
            }
        },
        {
            $sort: { createdAt: -1 }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, posts, "User posts fetched successfully"));
});

export {
    createPost,
    getFeedPosts,
    getUserPosts
}
