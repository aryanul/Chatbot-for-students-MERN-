"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_KEY;
const createToken = (id, email, expiresIn) => (0, jsonwebtoken_1.sign)({ id, email }, JWT_SECRET, { expiresIn });
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    const token = req.signedCookies['auth_token'];
    console.log(token);
    if (!token) {
        res.status(401).json({ message: 'Token Not Received' });
        return;
    }
    (0, jsonwebtoken_1.verify)(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            res.status(401).json({ message: err?.name ?? 'Invalid token' });
            return;
        }
        res.locals.jwtData = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenManager.js.map