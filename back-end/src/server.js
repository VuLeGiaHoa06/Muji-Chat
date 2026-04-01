import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDB from "./lib/db.js";
import { app, server } from "./socket/index.js";
import { v2 as cloudinary } from "cloudinary";

//////////// Middlewares ////////////
import { protectedRoute } from "./middlewares/auhtMiddleware.js";

//////////// Routes ////////////
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import friendRoute from "./routes/friendRoute.js";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser()); // de request doc duoc headers, cookie
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// CLOUDINARY Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// route handler for main
app.get("/", (req, res) => {
  res.send("Server on");
});

// public routes - tức là route này ai cũng truy cập được - không cần quyền
app.use("/api/auth", authRoute);

// private routes
app.use(protectedRoute); // middeware này chạy cho toàn bộ router(/me, /my-friends) của user
app.use("/api/users", userRoute);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

// connect to db
await connectToDB();

server.listen(PORT, () => {
  console.log(`Server listeing on PORT: ${PORT}`);
});
