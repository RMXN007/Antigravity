import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

dotenv.config({
    path: './.env'
})

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// Database Connection
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/instaclone`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        console.log("PLEASE CHECK YOUR .env FILE. ENSURE MONGODB IS RUNNING LOCALLY OR URI IS CORRECT.");
        // process.exit(1) // Keep alive to show error log instead of restart loop
    }
}

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })

// Routes Import
import userRouter from './src/routes/user.routes.js'
import postRouter from './src/routes/post.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)

app.get("/", (req, res) => {
    res.send("InstaClone API is running")
})
