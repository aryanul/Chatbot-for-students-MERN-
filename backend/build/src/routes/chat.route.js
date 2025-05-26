"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenManager_js_1 = require("../utils/tokenManager.js");
const chat_controller_1 = require("../controllers/chat.controller");
const chatRoutes = (0, express_1.Router)();
chatRoutes.get("/delete", tokenManager_js_1.verifyToken, chat_controller_1.deleteChats);
chatRoutes.get("/get-chat", tokenManager_js_1.verifyToken, chat_controller_1.getChat);
exports.default = chatRoutes;
//# sourceMappingURL=chat.route.js.map