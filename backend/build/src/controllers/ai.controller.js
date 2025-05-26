"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAiResponse = void 0;
const openai_1 = __importDefault(require("openai"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiKey = process.env.OPENAI_API;
const client = new openai_1.default({ apiKey });
const getAiResponse = async (req, res) => {
    try {
        const user = await user_model_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: 'User not registered OR Token malfunctioned' });
        const userInput = req.body.question;
        const language = req.body.language;
        if (!userInput) {
            return res
                .status(400)
                .send({ error: 'Question is required in the request body.' });
        }
        user.chats.push({ role: 'user', content: userInput });
        // user.chats.push({role: 'assistant', content: response.output_text});
        const response = await client.responses.create({
            model: 'gpt-4.1',
            input: userInput,
        });
        user.chats.push({ role: 'assistant', content: response.output_text });
        await user.save();
        res.send(response.output_text);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong!' });
    }
};
exports.getAiResponse = getAiResponse;
//# sourceMappingURL=ai.controller.js.map