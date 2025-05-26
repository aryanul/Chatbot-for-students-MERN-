"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.deleteChats = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const deleteChats = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered');
        }
        user.chats.splice(0, user.chats.length);
        await user.save();
        return res.status(200).json({ message: 'CHATS DELETED' });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
exports.deleteChats = deleteChats;
const getChat = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered');
        }
        return res.status(200).json({ message: 'CHATS RECEIVED', chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
};
exports.getChat = getChat;
//# sourceMappingURL=chat.controller.js.map