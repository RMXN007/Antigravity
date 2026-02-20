import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getFeedPosts, getUserPosts } from "../controllers/post.controller.js";
import { toggleLike, addComment, getComments } from "../controllers/engagement.controller.js";

const router = Router();

// Public/Semi-public
router.get("/feed", getFeedPosts); // Could be protected, but keeping open for demo if needed
router.get("/user/:username", getUserPosts);

// Protected
router.use(verifyJWT);

router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createPost);

// Engagement
router.post("/:postId/like", toggleLike);
router.post("/:postId/comment", addComment);
router.get("/:postId/comments", getComments);

export default router;
