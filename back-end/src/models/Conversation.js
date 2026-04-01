import mongoose from "mongoose";

const participantsSchema = new mongoose.Schema(
  // 1. userId: de biet ai tham gia
  // 2. joinedAt: tham gia khi nao
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const groupSchema = new mongoose.Schema(
  // 1. name: nhom nay co ten la gi
  // 2. createdBy: nhom nay duoc tao boi ai
  {
    name: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    _id: false,
  }
);

const lastMessageSchema = new mongoose.Schema(
  {
    _id: { type: String },
    content: {
      type: String,
      default: null,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    // 1. type: xac dinh kieu tro chuyen - truc tiep(1-1), mot nhom(nhieu)
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },
    participants: {
      type: [participantsSchema],
      required: true,
    },
    group: {
      type: groupSchema,
    },
    lastMessageAt: {
      type: Date,
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      // tạo mới một conversation - thường chưa có tin nhắn nào
      type: lastMessageSchema,
      default: null,
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
conversationSchema.index({
  "participants.userId": 1, // sort từ nhỏ đến lớn
  lastMessageAt: -1, // sort tin nhắn mới nhất
});

// tao model tu schema
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
