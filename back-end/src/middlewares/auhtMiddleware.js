import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers?.authorization;
    
    // xử lý token
    const token = authHeader?.split(" ")[1];

    // xác nhận token hợp lệ kh
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decodeUser) => {
        if (error) {
          return res
            .status(403)
            .json({ message: "Access token hết hạn hoặc không đúng" });
        }

        // tìm user
        const user = await User.findById(decodeUser.userId).select(
          "-hashedPassword"
        );

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // lưu user vào req - để tiện cho những router khác - khi đã đăng nhập - truy vấn dữ liệu
        req.user = user;

        // chuyen tiep middle tiep theo
        next();
      }
    );
  } catch (error) {
    console.log("authMiddleware_protectedRoute", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
