"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const tokenManager_js_1 = require("../utils/tokenManager.js");
const aiRouter = (0, express_1.Router)();
aiRouter.post("/sendQuery", tokenManager_js_1.verifyToken, ai_controller_1.getAiResponse);
exports.default = aiRouter;
//# sourceMappingURL=ai.route.js.map