import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        image: {
            type: String, // cloudinary url
            required: true
        },
        caption: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        likesCount: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

postSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post", postSchema)
