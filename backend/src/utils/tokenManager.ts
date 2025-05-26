import {
  sign,
  verify,
  JsonWebTokenError,
  JwtPayload,
  Secret,
} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {config} from 'dotenv';
config();
const JWT_SECRET: Secret = process.env.JWT_KEY as string;

export const createToken = (id: string, email: string, expiresIn: number) =>
  sign({id, email}, JWT_SECRET, {expiresIn});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.signedCookies['auth_token'];
  console.log(token);

  if (!token) {
    res.status(401).json({message: 'Token Not Received'});
    return;
  }

  verify(
    token,
    JWT_SECRET,
    (
      err: JsonWebTokenError | null,
      decoded: JwtPayload | string | undefined,
    ): void => {
      if (err || !decoded) {
        res.status(401).json({message: err?.name ?? 'Invalid token'});
        return;
      }

      res.locals.jwtData = decoded as JwtPayload;
      next();
    },
  );
};
