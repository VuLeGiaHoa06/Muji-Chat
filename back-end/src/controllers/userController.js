import { uploadImageFromBuffer } from "../middlewares/uploadMiddleware.js";
import User from "../models/User.js";

export const authMe = async (req, res) => {
  try {
    const user = req.user; // du lieu lay tu middle-auth

    res.status(200).json({ user });
  } catch (error) {
    console.log("user-controller_get", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    // tránh trường hợp người dùng gửi một đống white space
    if (!username || username.trim() === "")
      return res
        .status(400)
        .json({ message: "Vui lòng nhập thông tin username" });

    const user = await User.findOne({ username })
      .select("_id displayName avatarUrl email")
      .lean();

    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    return res.status(200).json({ user });
  } catch (error) {
    console.log("userController_searchUserByUsername", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
      return res.status(400).json({ message: "Avatar load failed" });
    }

    const result = await uploadImageFromBuffer(file.buffer);

    // update db
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: result.secure_url,
        avatarId: result.public_id,
      },
      {
        new: true,
      },
    ).select("avatarUrl");

    if (!updatedUser.avatarUrl) {
      return res.status(400).json({ message: "Avatar trả về null" });
    }

    return res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.log("uploadAvatar_userController", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
