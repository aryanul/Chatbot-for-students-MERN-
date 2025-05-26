import { NextFunction, Request, Response } from "express";
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const signUpUser: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const verifyUser: (req: Request, res: Response) => Promise<any>;
export declare const userLogout: (req: Request, res: Response) => Promise<any>;
