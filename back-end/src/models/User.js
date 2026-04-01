import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // mongodb tạo ra một index - để truy vấn nhanh hơn
      trim: true,
      lowercase: true,
    },
    hashedPassword: {
      // không được phép lưu password gốc - của người dùng
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    avatarId: {
      type: String, // id được dùng để xoá trên cloudinary
    },
    bio: {
      type: String,
      maxlength: 500, // set độ lại bio = 500 ký tự
    },
    phone: {
      type: String,
      sparse: true, // giá trị mặc định = null, nếu thêm giá trị - thì nó phải là unique
    },
  },
  { timestamps: true }, // tự động tạo createdAt và updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;

// còn một config - khi user chưa có - thì tạo mới - nếu có rồi - thì sử dụng cái cũ
