import { Router } from "express";
import { getAllUsers, loginUser, signUpUser, userLogout, verifyUser } from "../controllers/user.controller";
import { loginValidator, signUpValidator, validate } from "../utils/validators";
import { verifyToken } from "../utils/tokenManager";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signUpValidator),signUpUser);
userRoutes.post("/login",validate(loginValidator),loginUser)
userRoutes.get("/authenticate",verifyToken,verifyUser);
userRoutes.get("/logout",verifyToken,userLogout);

export default userRoutes;