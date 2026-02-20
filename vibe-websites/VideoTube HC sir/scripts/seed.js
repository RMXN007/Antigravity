import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../src/models/user.models.js";
import { Video } from "../src/models/video.models.js";

dotenv.config({
    path: './.env'
});

const DB_NAME = "videotube"; // Hardcoding or import. Let's try to just connect to URI which usually has DB name

const SAMPLE_VIDEOS = [
    {
        title: "Big Buck Bunny",
        description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself.",
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg",
        duration: 596,
        views: 12053,
        isPublished: true
    },
    {
        title: "Elephant Dream",
        description: "The first open movie game, code-named Orange.",
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Elephants_Dream_poster_01.jpg/1200px-Elephants_Dream_poster_01.jpg",
        duration: 653,
        views: 8520,
        isPublished: true
    },
    {
        title: "For Bigger Blazes",
        description: "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV.",
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
        duration: 15,
        views: 2314,
        isPublished: true
    },
    {
        title: "For Bigger Escapes",
        description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV.",
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
        duration: 15,
        views: 5410,
        isPublished: true
    },
    {
        title: "For Bigger Joyrides",
        description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV.",
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
        duration: 15,
        views: 9812,
        isPublished: true
    }
];

const seed = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Connected to DB");

        // Create Demo User
        const demoUser = await User.findOneAndUpdate(
            { email: "demo@videotube.com" },
            {
                username: "demouser",
                fullName: "Demo User",
                email: "demo@videotube.com",
                password: "password123", // In real app, this should be hashed, but model pre-save hook handles it if using .save() or .create()
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                coverImage: "https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?w=1200"
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Note: findOneAndUpdate bypasses pre-save hooks so password might not hash if new.
        // Let's safe bet:
        if (!demoUser.isPasswordCorrect) {
            // It's a mongoose doc?
        }
        // Actually, let's just use .create() if not exists or logic.
        // For simplicity in seed, let's assume we want valid data.
        // If we use User.create, validation and crypto runs.

        // Let's delete existing demo user first
        await User.deleteOne({ email: "demo@videotube.com" });
        const user = await User.create({
            username: "demouser",
            fullName: "Demo User",
            email: "demo@videotube.com",
            password: "password123",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            coverImage: "https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?w=1200"
        });

        console.log("Demo User Created:", user._id);

        // Delete existing videos by this user
        await Video.deleteMany({ owner: user._id });

        // Insert Videos
        const videosToInsert = SAMPLE_VIDEOS.map(v => ({
            ...v,
            owner: user._id
        }));

        await Video.insertMany(videosToInsert);
        console.log(`Seeded ${videosToInsert.length} videos`);

        process.exit(0);

    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
