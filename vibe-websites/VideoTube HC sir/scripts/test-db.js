import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

console.log("Starting connection test...");
console.log("URI present:", !!process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(c => {
        console.log(`Connected to: ${c.connection.host}`);
        process.exit(0);
    })
    .catch(e => {
        console.error("Connection failed:", e);
        process.exit(1);
    });
