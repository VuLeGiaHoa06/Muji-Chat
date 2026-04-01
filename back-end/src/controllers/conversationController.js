import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { io } from "../socket/index.js";
import { formatted } from "../utils/formatted.js";

export const createConversation = async (req, res) => {
  try {
    const { type, name = "", memberIds = [] } = req.body;

    const userId = req.user._id.toString();

    if (
      !type ||
      (type === "group" && !name) ||
      !memberIds ||
      !Array.isArray(memberIds)
    ) {
      return res
        .status(400)
        .json({ message: "Tên nhóm và danh sách thành viên là bắt buộc" });
    }

    let conversation;

    if (type === "direct") {
      const otherPerson = memberIds.find((id) => id !== userId);

      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [userId, otherPerson.toString()] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          type: "direct",
          participants: [{ userId }, { userId: otherPerson }],
          lastMessageAt: new Date(),
        });
      }
    }

    if (type === "group") {
      const formatted = memberIds.map((id) => ({
        userId: id,
      }));
      // [id1, id2, id3]

      conversation = await Conversation.create({
        type: "group",
        participants: [{ userId }, ...formatted],
        lastMessageAt: new Date(),
        group: {
          name,
          createdBy: userId,
        },
      });
    }

    if (!conversation) {
      return res.status(403).json({ message: "Type không hợp lệ" });
    }

    await conversation.populate([
      {
        path: "participants.userId",
        select: "_id username displayName avatarUrl",
      },
      {
        path: "lastMessage.senderId",
        select: "_id username displayName avatarUrl",
      },
      { path: "seenBy", select: "avatarUrl" },
    ]);

    const updatedConv = formatted(conversation.toObject());


    io.emit("new-conversation", updatedConv);

    return res.status(201).json({
      message: "Cuộc trò chuyện đã được tạo",
      conversation: updatedConv,
    });
  } catch (error) {
    console.log("conversationCOntroller_create", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      "participants.userId": userId,
    })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .populate({
        path: "participants.userId",
        select: "displayName avatarUrl",
      })
      .populate({
        path: "lastMessage.senderId",
        select: "displayName avatarUrl",
      })
      .populate({
        path: "seenBy",
        select: "displayName avatarUrl",
      });

    const formatted = conversations.map((convo) => {
      const participants = (convo.participants || []).map((p) => ({
        _id: p.userId?._id,
        displayName: p.userId?.displayName,
        avatarUrl: p.userId?.avatarUrl ?? null,
        joinedAt: p.joinedAt,
      }));

      return {
        ...convo.toObject(),
        unreadCounts: convo.unreadCounts || {},
        participants,
      };
    });

    return res.status(200).json({ conversations: formatted });
  } catch (error) {
    console.log("conversationController_getConversation", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;
    const { limit = 50, cursor } = req.query;

    // kiem tra converid co ton tai kh
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Cuộc trò chuyện này không tồn tại" });
    }

    // kiem tra ng gui req co trong participants cua conversation
    const userInConversation = await Conversation.findOne({
      "participants.userId": userId,
    });

    if (!userInConversation) {
      return res.status(403).json({
        message: "Bạn không có trong nhóm này. Vui lòng kết bạn hoặc trong gr",
      });
    }

    const query = { conversationId };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    let messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) + 1);

    let nextCursor = null;

    if (messages.length > limit) {
      const lastMessage = messages[messages.length - 1];
      nextCursor = lastMessage.createdAt.toISOString();
      messages.pop();
    }

    messages = messages.reverse();

    return res.status(200).json({ messages, nextCursor });
  } catch (error) {
    console.log("conversationController_getMessages", error);
    return res.status(500).json({ message: "Internal Server Errro" });
  }
};

export const conversationdIdsForSocketIO = async (userId) => {
  try {
    const conversations = await Conversation.find(
      {
        "participants.userId": userId,
      },
      { _id: 1 },
    );

    return conversations.map((c) => c._id.toString());
  } catch (error) {
    console.log("converstionController_conversationdIdsForSocketIO", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const userId = req.user._id.toString();

    const conversation = await Conversation.findById(conversationId).lean();

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Conversation này không tồn tại" });
    }

    const haveMessage = conversation.lastMessage;

    if (!haveMessage) {
      return res
        .status(200)
        .json({ message: "Chưa có tin nhắn trong cuộc trò chuyện" });
    }

    if (haveMessage.senderId.toString() === userId) {
      return res
        .status(200)
        .json({ message: "Status seen phải là người bạn của bạn" });
    }

    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: { seenBy: userId },
        $set: { [`unreadCounts.${userId}`]: 0 },
      },
      {
        new: true,
      },
    ).populate("participants.userId", "_id displayName avatarUrl");

    const formatedParticipant = updatedConversation.participants.map((p) => ({
      _id: p.userId?._id,
      displayName: p.userId?.displayName ?? "",
      avatarUrl: p.userId?.avatarUrl ?? null,
    }));

    io.to(conversationId).emit("read-message", {
      conversation: updatedConversation,
      formatedParticipant,
      lastMessage: {
        _id: updatedConversation.lastMessage._id,
        content: updatedConversation.lastMessage.content,
        senderId: updatedConversation.lastMessage.senderId,
        createdAt: updatedConversation.lastMessageAt,
      },
    });

    return res.status(200).json({
      message: "Mark as seen",
      seenBy: updatedConversation.seenBy,
      myUnreadCount: updatedConversation.unreadCounts ?? 0,
    });
  } catch (error) {
    console.log("conversationController_markAsSeen", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
