"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.verifyUser = exports.loginUser = exports.signUpUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = require("bcrypt");
const tokenManager_1 = require("../utils/tokenManager");
const getAllUsers = async (req, res, next) => {
    try {
        const user = await user_model_1.default.find();
        return res.status(200).json({ message: "OK", user });
    }
    catch (error) {
        return res.json({ message: "ERROR", cause: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const signUpUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (await user_model_1.default.findOne({ email: email }))
            return res.status(422).json({ error: "Email already exists" });
        const hashedPassword = (await (0, bcrypt_1.hash)(password, 10)).toString();
        const user = new user_model_1.default({ name, email, password: hashedPassword });
        await user.save();
        res.clearCookie("auth_token", { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        const token = (0, tokenManager_1.createToken)(user._id.toString(), user.email, 60 * 60 * 24 * 7);
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        return res.status(201).json({ message: "User registered successfully", id: user._id.toString() });
    }
    catch (error) {
        return res.json({ message: "ERROR", cause: error.message });
    }
};
exports.signUpUser = signUpUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await user_model_1.default.findOne({ email: email });
        if (userExist) {
            if (await (0, bcrypt_1.compare)(password, userExist.password)) {
                res.clearCookie("auth_token", { httpOnly: true, domain: "localhost", signed: true, path: "/" });
                const token = (0, tokenManager_1.createToken)(userExist._id.toString(), userExist.email, 60 * 60 * 24 * 7);
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie("auth_token", token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
                return res.status(200).json({ message: "User logged in" });
            }
            else
                return res.status(403).json({ message: "Incorrect Password" });
        }
        return res.status(401).json({ message: "User not registered" });
    }
    catch (error) {
        return res.json({ message: "ERROR", cause: error.message });
    }
};
exports.loginUser = loginUser;
const verifyUser = async (req, res) => {
    try {
        const userExist = await user_model_1.default.findById(res.locals.jwtData.id);
        if (!userExist)
            return res.status(401).json("User not registered");
        return res.status(200).json({ message: "OK", email: userExist.email, name: userExist.name });
    }
    catch (error) {
        console.error(error);
        return res.status(200).json({ message: "ERROR", error: error.message });
    }
};
exports.verifyUser = verifyUser;
const userLogout = async (req, res) => {
    try {
        const userExist = await user_model_1.default.findById(res.locals.jwtData.id);
        if (!userExist)
            return res.status(401).json("User not registered");
        res.clearCookie("auth_token", { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        return res.status(200).json({ message: "OK" });
    }
    catch (err) {
        console.error(err);
        return res.status(200).json({ message: "ERROR", error: err.message });
    }
};
exports.userLogout = userLogout;
//# sourceMappingURL=user.controller.js.map