import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

// tạo config cho cookie - để tái sử dụng
const configCookie = {
  httpOnly: true, // kh cho browser sử dụng js để truy cập cookie này
  secure: true, // cho phép truy cập bằng https - tăng tính bảo mật
  sameSite: "none", // các website khác - cũng có thể truy cập được cookie này - bắt buộc đi cùng với secure = true
};

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body; // kh can express.json()

    // kiểm tra nhập đủ thông tin chưa - xử lý lỗi và in cho người dùng biết để tránh crash
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ messsage: "Dont have enough data!" });
    }

    // kiem tra username co trung kh
    const duplicate = await User.findOne({ username });

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Usernamse is already, please create new one" });
    }

    // hash passowrd
    const hashedPassword = await bcrypt.hash(password, 10);

    // tạo mới user
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    res.status(200).json({ message: "Sign up successful" });
  } catch (error) {
    console.log("auth-controller_signup", error);
    return res.sendStatus(500).send("Internal Server Error");
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Bad request" });
    }

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return res.status(401).send("Unauthorized");
    }

    // tạo mới access token
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // tạo mới một refresh-token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // lưu refresh-token trong db - cần định nghĩa một schema
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // lưu refresh-token vào trong cookie
    res.cookie("refreshToken", refreshToken, {
      ...configCookie,
      maxAge: REFRESH_TOKEN_TTL,
    });

    res
      .status(200)
      .json({ message: "User log in successful", accessToken: token });
  } catch (error) {
    console.log("auhtController_sign-in", error);
    res.status(500).send("Internal Server Error");
  }
};

export const signOut = async (req, res) => {
  try {
    // lay refreshTokeb thong qua cookie
    // truy cập token - phải sử dụng thư viện cookieParser
    const token = req.cookies?.refreshToken;

    if (token) {
      // xoá token trong db
      await Session.deleteOne({ refreshToken: token });

      // xoá refresh token trên trình duỵet
      res.clearCookie("refreshToken");
    }

    res.sendStatus(204);
  } catch (error) {
    console.log("auth-controller_sign-out", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const refreshToken = async (req, res) => {
  try {
    // lay refreshtoken tu cookie
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Token khong ton tai" });
    }

    // so sanh refreshtoken trong db
    const session = await Session.findOne({ refreshToken: token });

    if (!session) {
      return res
        .status(403)
        .json({ message: "Token khong hop le hoac da het han" });
    }

    // kiem tra con han kh
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token da het han" });
    }

    // tao mot access token moi
    const newToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_TTL,
      },
    );

    // return
    return res
      .status(200)
      .json({ message: "Tao moi token", accessToken: newToken });
  } catch (error) {
    console.log(authController_refreshToken);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
