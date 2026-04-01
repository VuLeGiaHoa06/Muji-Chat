import express from "express";
import {
  acceptRequestFriend,
  sendFriendRequest,
  declineRequestFriend,
  getAllFriends,
  getFriendsRequest,
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/requests", sendFriendRequest);
router.post("/requests/:requestId/accept", acceptRequestFriend);
router.post("/requests/:requestId/decline", declineRequestFriend);
router.get("/", getAllFriends);
router.get("/requests", getFriendsRequest);

export default router;
