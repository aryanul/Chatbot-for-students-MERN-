import { Request, Response, NextFunction } from "express";
import { ValidationChain } from "express-validator";
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const signUpValidator: ValidationChain[];
export declare const loginValidator: ValidationChain[];
