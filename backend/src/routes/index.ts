import { Router } from "express";
import userRoutes from "./user.route";
import chatRoutes from "./chat.route";
import aiRouter from "./ai.route";

const appRouter = Router();

appRouter.use("/user",userRoutes);
appRouter.use("/chats",chatRoutes);
appRouter.use("/ai",aiRouter);
export default appRouter;