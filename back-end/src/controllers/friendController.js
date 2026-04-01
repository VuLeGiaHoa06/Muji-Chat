import User from "../models/User.js";
import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";

import { pair } from "../utils/friendShipHelper.js";
import { createConversation } from "./conversationController.js";

// 1. send request friend
export const sendFriendRequest = async (req, res) => {
  try {
    // to = receiver
    // from = sender
    // 1. lay data tu request body
    const { to, message } = req.body;
    const from = req.user._id.toString();

    // 2. check du lieu
    // 2.1 check tu gui cho chinh minh
    if (from === to) {
      return res
        .status(403)
        .json({ message: "khong the gui loi moi cho chinh minh" });
    }

    // 2.2 check xem người mà mình gửi lời mời kết bạn có tồn tại hay không
    const userExist = await User.exists({ _id: to });

    if (!userExist) {
      return res.status(404).json({ message: "Nguoi dung khong ton tai" });
    }

    const [userA, userB] = pair(from, to);

    // 3. kiểm tra 2 người này đã là bạn chưa và đã gửi lời mời kết bạn chưa
    const [alreadyFriend, existingRequest] = await Promise.all([
      await Friend.findOne({ userA, userB }),
      await FriendRequest.findOne({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }),
    ]);

    // nếu là bạn rồi thì trả lỗi - 400
    if (alreadyFriend) {
      return res.status(400).json({ message: "Hai người này đã là bạn rồi" });
    }

    // nếu đã tồn tại lời mời kết bạn - 404
    if (existingRequest) {
      return res.status(404).json({ message: "Lời mời này đã tồn tại rồi" });
    }

    // 4. them friend vao db friends
    const request = await FriendRequest.create({
      from,
      to,
      message,
    });

    // 5. res thanh cong - 201 - created - da tao loi moi thanh cong
    return res.status(201).json({ message: "Gửi lời mời thành công", request });
  } catch (err) {
    console.log("friendController_addFriend", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 2. accept firned
export const acceptRequestFriend = async (req, res) => {
  try {
    // 1. lay id cua request tu url
    const { requestId } = req.params;
    const userId = req.user._id;

    // 2. kiem tra request nay co ton tai trong db kh
    const request = await FriendRequest.findById(requestId);

    // 2.1 nếu không tồn tại thì trả về lỗi - 404
    if (!request) {
      return res.status(404).json({ message: "Lời mời này không tồn tại" });
    }

    // 3. nếu id của người nhận - khác với id của người đăng nhập - thì thông báo lỗi
    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền chấp nhận lời mời" });
    }

    // 4. tạo mới db
    await Friend.create({
      userA: request.from,
      userB: request.to,
    });

    // 5. xoá FriendReequest trong db
    await FriendRequest.findByIdAndDelete(requestId);

    // 6. lấy thông tin của người gửi lời mời - sender = from
    const getInfo = await User.findById(request.from)
      .select("_id displayName avatarUrl")
      .lean();

    return res.status(200).json({
      message: "Hai người đã là bạn",
      newFriend: {
        _id: getInfo?._id,
        displayName: getInfo?.displayName,
        avatarUrl: getInfo?.avatarUrl,
      },
    });
  } catch (err) {
    console.log("friendController_acceptRequestFriend", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 3. decline friend
export const declineRequestFriend = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Lời mời này không tồn tại" });
    }

    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền từ chối lời mời" });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    return res.sendStatus(204);
  } catch (err) {
    console.log("friendController_declineRequestFriend", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4. get all list friends
export const getAllFriends = async (req, res) => {
  try {
    // 1. lấy id của người gửi request - người đăng nhập thành công
    const userId = req.user._id;

    // 2. kiểm tra mối quan hệ bạn bè - find
    const friendShips = await Friend.find({
      $or: [{ userA: userId }, { userB: userId }],
    })
      .populate("userA", "_id displayName avatarUrl username")
      .populate("userB", "_id displayName avatarUrl username")
      .lean();

    // 3. nếu không có mối quan hệ bạn bè - thì xử lý lỗi
    if (!friendShips) {
      return res.status(200).json({ friendShips: [] });
    }

    // 4. nếu bạn là user a - thì lấy thông tin của userB
    const friends = friendShips.map((f) =>
      userId.toString() === f.userA._id.toString() ? f.userB : f.userA,
    );

    return res.status(200).json({ friends });
  } catch (err) {
    console.log("friendController_getAllFriends", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 5. get all request firneds
export const getFriendsRequest = async (req, res) => {
  try {
    // 1. lấy id của user gửi request
    const userId = req.user._id;

    const populateFields = "_id displayName avatarUrl username";

    // 2. chạy 2 promise song song
    // để lấy thông tin user gửi request
    // và các request mà user nhận được
    const [sent, received] = await Promise.all([
      FriendRequest.find({ from: userId }).populate("to", populateFields),
      FriendRequest.find({ to: userId }).populate("from", populateFields),
    ]);

    // 3. trả về 2 thông tin trên
    return res.status(200).json({ sent, received });
  } catch (err) {
    console.log("friendController_getFriendRequest", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 6. delete friend
