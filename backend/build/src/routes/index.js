"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const chat_route_1 = __importDefault(require("./chat.route"));
const ai_route_1 = __importDefault(require("./ai.route"));
const appRouter = (0, express_1.Router)();
appRouter.use("/user", user_route_1.default);
appRouter.use("/chats", chat_route_1.default);
appRouter.use("/ai", ai_route_1.default);
exports.default = appRouter;
//# sourceMappingURL=index.js.map