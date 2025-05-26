import { Request, Response, NextFunction } from 'express';
export declare const createToken: (id: string, email: string, expiresIn: number) => string;
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void;
