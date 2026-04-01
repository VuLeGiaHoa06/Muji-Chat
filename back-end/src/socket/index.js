import { Server } from "socket.io";
import express from "express";
import http from "http";
import { socketAuthMiddleware } from "../middlewares/socketMiddleware.js";
import { conversationdIdsForSocketIO } from "../controllers/conversationController.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const onlineUsers = new Map(); // {userId: socketId}

///////////// Connect Scoket /////////////
io.on("connection", async (socket) => {
  // Lấy thông tin user, được lưu từ middleware sokcet
  const user = socket.user;
  console.log("socket connected", socket.id);

  // Lưu dữ liệu vào map
  onlineUsers.set(user._id, socket.id); // {userId, socketId}

  // Bắn đi dữ liệu
  io.emit("online-users", Array.from(onlineUsers.keys()));

  // Lấy các cuộc trò chuyện của userid hiện tại
  // tạo một room với id-conv
  // những ai mà có id-conv này
  // sẽ được thêm vào cùng một room
  const conversationIds = await conversationdIdsForSocketIO(user._id);

  conversationIds.forEach((id) => {
    socket.join(id);
  });

  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });

  // Tạo phòng dựa trên user_id
  socket.join(user._id.toString());

  ///////////// Disconnect Socket /////////////
  socket.on("disconnect", () => {
    // xoá user khi disconeect
    onlineUsers.delete(user._id);

    // update lại những user đang online
    io.emit("online-users", Array.from(onlineUsers.keys()));

    console.log("socket disconnected");
  });
});

export { io, app, server };
