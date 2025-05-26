"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validators_1 = require("../utils/validators");
const tokenManager_1 = require("../utils/tokenManager");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controller_1.getAllUsers);
userRoutes.post("/signup", (0, validators_1.validate)(validators_1.signUpValidator), user_controller_1.signUpUser);
userRoutes.post("/login", (0, validators_1.validate)(validators_1.loginValidator), user_controller_1.loginUser);
userRoutes.get("/authenticate", tokenManager_1.verifyToken, user_controller_1.verifyUser);
userRoutes.get("/logout", tokenManager_1.verifyToken, user_controller_1.userLogout);
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map