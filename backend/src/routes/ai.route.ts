import { Router } from "express";
import { getAiResponse } from "../controllers/ai.controller";
import { verifyToken } from "../utils/tokenManager.js";

const aiRouter = Router();

aiRouter.post("/sendQuery", verifyToken, getAiResponse);

export default aiRouter