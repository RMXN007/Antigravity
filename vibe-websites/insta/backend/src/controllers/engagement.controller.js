import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Like, Comment, Follow } from "../models/relation.models.js";
import { Post } from "../models/post.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const toggleLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const existingLike = await Like.findOne({
        post: postId,
        likedBy: userId
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
        return res.status(200).json(new ApiResponse(200, { liked: false }, "Unliked"));
    } else {
        await Like.create({
            post: postId,
            likedBy: userId
        });
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
        return res.status(200).json(new ApiResponse(200, { liked: true }, "Liked"));
    }
});

const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) throw new ApiError(400, "Content is required");

    const comment = await Comment.create({
        content,
        post: postId,
        owner: req.user._id
    });

    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    return res.status(201).json(new ApiResponse(201, comment, "Comment added"));
});

const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const comments = await Comment.aggregate([
        { $match: { post: new mongoose.Types.ObjectId(postId) } },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    { $project: { username: 1, avatar: 1 } }
                ]
            }
        },
        { $unwind: "$owner" }
    ]);

    return res.status(200).json(new ApiResponse(200, comments, "Comments fetched"));
});

export {
    toggleLike,
    addComment,
    getComments
}
