import { NextFunction, Request, Response } from "express";
import users from "../models/user.model"
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/tokenManager";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const user = await users.find();
        return res.status(200).json({ message: "OK", user });
    } catch (error:any) {
        return res.json({ message: "ERROR", cause: error.message });
    }
}

export const signUpUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const { name, email, password } = req.body;
        if (await users.findOne({ email: email }))
            return res.status(422).json({ error: "Email already exists" });
        const hashedPassword = (await hash(password, 10)).toString();
        const user = new users({ name, email, password: hashedPassword });
        await user.save();
        res.clearCookie("auth_token", { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        const token = createToken(user._id.toString(), user.email, 60*60*24*7);
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        return res.status(201).json({ message: "User registered successfully", id: user._id.toString() });
    } catch (error:any) {
        return res.json({ message: "ERROR", cause: error.message });
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const { email, password } = req.body;
        const userExist = await users.findOne({ email: email });
        if (userExist) {
            if (await compare(password, userExist.password)) {
                res.clearCookie("auth_token", { httpOnly: true, domain: "localhost", signed: true, path: "/" });
                const token = createToken(userExist._id.toString(), userExist.email, 60*60*24*7);
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie("auth_token", token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
                return res.status(200).json({ message: "User logged in" });
            }
            else
                return res.status(403).json({ message: "Incorrect Password" });
        }
        return res.status(401).json({ message: "User not registered" });
    } catch (error:any) {
        return res.json({ message: "ERROR", cause: error.message });
    }
}

export const verifyUser = async (req: Request, res: Response) : Promise<any> => {
    try {
        const userExist = await users.findById(res.locals.jwtData.id);
        if (!userExist)
            return res.status(401).json("User not registered");
        return res.status(200).json({ message: "OK", email: userExist.email, name: userExist.name });
    } catch (error:any) {
        console.error(error);
        return res.status(200).json({ message: "ERROR", error: error.message });
    }
}

export const userLogout = async (req: Request, res: Response) : Promise<any> => {
    try {
        const userExist = await users.findById(res.locals.jwtData.id);
        if (!userExist)
            return res.status(401).json("User not registered");
        res.clearCookie("auth_token", { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        return res.status(200).json({message:"OK"});
    } catch (err:any) {
        console.error(err);
        return res.status(200).json({ message: "ERROR", error: err.message });
    }
}