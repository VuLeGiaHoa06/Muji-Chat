import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { decode } from "punycode";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake?.auth.token;

    if (!token) {
      return next(new Error("403 - Lỗi xác thực token"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return next(new Error("403 - Token không hợp lệ"));
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");

    if (!user) {
      return next(new Error("404 - Không tìm thấy user"));
    }

    socket.user = user;

    next();
  } catch (err) {
    console.log("socketMiddleware_socketAuthMiddleware", err);
  }
};
