import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { deleteChats, getChat } from "../controllers/chat.controller";

const chatRoutes = Router();

chatRoutes.get("/delete", verifyToken, deleteChats);
chatRoutes.get("/get-chat", verifyToken, getChat);

export default chatRoutes;