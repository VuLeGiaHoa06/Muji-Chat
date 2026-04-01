import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";
import { pair } from "../utils/friendShipHelper.js";

export const checkFriendShip = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const recipientId = req.body?.recipientId ?? null;
    const memberIds = req.body?.memberIds ?? [];

    if (!recipientId && memberIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Cần cung cấp recipientId và memberIds" });
    }

    if (recipientId) {
      const [userA, userB] = pair(userId, recipientId);

      const isFriend = await Friend.findOne({ userA, userB });

      if (!isFriend) {
        return res
          .status(403)
          .json({ message: "Bạn chưa kết bạn với người này" });
      }

      req.recipientId = recipientId;

      return next();
    }

    const otherPerson = memberIds.filter((id) => id !== userId);

    // cần kiểm tra các thành viên khác - có là bạn bè trong db chưa
    const friendCheck = otherPerson.map(async (memberId) => {
      const [userA, userB] = pair(memberId, userId);

      const friend = await Friend.findOne({ userA, userB });
      return friend ? null : memberId;
    });

    const results = await Promise.all(friendCheck);
    const notFriends = results.filter(Boolean);

    if (notFriends.length > 0) {
      return res.status(403).json({
        message: "Bạn phải kết bạn với người này, thì mới được tạo nhóm",
        notFriends,
      });
    }

    next();
  } catch (error) {
    console.log("friendMiddleware_checkFriendShip", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkGroupMembership = async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Cuộc trò chuyện này kh tồn tại" });
    }

    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId.toString(),
    );

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Bạn không phải là một thành viên trong nhóm" });
    }

    req.conversation = conversation;

    next();
  } catch (error) {
    console.log("friendMiddleware_checkGroupMemberShip", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
