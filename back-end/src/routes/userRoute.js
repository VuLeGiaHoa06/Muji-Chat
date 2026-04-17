import express from "express";
import {
  authMe,
  searchUserByUsername,
  uploadAvatar,
  uploadProfile,
} from "../controllers/userController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/me", authMe);
router.get("/search", searchUserByUsername);
router.post("/uploadAvatar", upload.single("file"), uploadAvatar);
router.post("/uploadProfile", uploadProfile);

export default router;
