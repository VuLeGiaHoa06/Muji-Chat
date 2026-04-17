import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import {
  emitNewMessage,
  updateConversationAfterCreateMessage,
} from "../utils/messageHelper.js";
import { io } from "../socket/index.js";
import { uploadImageFromBufferForMessage } from "../middlewares/uploadMiddleware.js";

export const sendDirectMessage = async (req, res) => {
  try {
    // 1. lay id cua nguoi nhan, nguoi gui, content, coversationId tu req.body
    const images = req.files;
    const { content, conversationId } = req.body;
    const senderId = req.user._id;
    const recipientId = req.recipientId;

    // 3. check coi co noi dung ben trong kh
    if (!content && !images) {
      return res.status(400).json({
        message: "Thiếu nội dung! Cần cung cấp đoạn văn hay hình ảnh",
      });
    }

    let imgUrls;

    if (images.length > 0) {
      const uploadPromise = images.map((i) =>
        uploadImageFromBufferForMessage(i.buffer),
      );

      const results = await Promise.all(uploadPromise);

      imgUrls = results.map((r) => r.secure_url);
    }

    let conversation;

    // 4. co conversation id thi tim trong db
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    // 5. neu kh co conversation id thi tao moi
    if (!conversationId) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: senderId, joinedAt: new Date() },
          {
            userId: recipientId,
            joinedAt: new Date(),
          },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    // 6. tao moi message
    const message = await Message.create({
      conversationId: conversation?._id,
      senderId,
      content,
      images: imgUrls,
    });

    // 7. update conversation
    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();

    emitNewMessage(io, conversation, message);

    // 8. response cho client - render ui
    return res.status(201).json({ message });
  } catch (error) {
    console.log("messageController_sendDirectMessage", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const sendGroupMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const senderId = req.user._id;
    const conversation = req.conversation;

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung" });
    }

    // neu id, content họp le - thi tao moi mesage
    const message = await Message.create({
      conversationId: conversation._id,
      content,
      senderId,
    });

    // update conversation
    updateConversationAfterCreateMessage(conversation, message, senderId);

    await conversation.save();

    emitNewMessage(io, conversation, message);

    return res
      .status(201)
      .json({ message: "Gửi tin nhắn thành công", message });
  } catch (error) {
    console.log("messageController_sendGroupMessage", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
