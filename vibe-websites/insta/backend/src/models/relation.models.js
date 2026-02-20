import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const followSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId, // The user who is following
        ref: "User"
    },
    following: {
        type: Schema.Types.ObjectId, // The user being followed
        ref: "User"
    }
}, { timestamps: true });

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });


export const Like = mongoose.model("Like", likeSchema);
export const Follow = mongoose.model("Follow", followSchema);
export const Comment = mongoose.model("Comment", commentSchema);
