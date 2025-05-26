"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signUpValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const error = (0, express_validator_1.validationResult)(req);
        if (error.isEmpty())
            return next();
        else
            return res.status(422).json({ errors: error.array() });
    };
};
exports.validate = validate;
exports.signUpValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").notEmpty().trim().isEmail().withMessage("Enter a valid Email"),
    (0, express_validator_1.body)("password").notEmpty().trim().isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
];
exports.loginValidator = [
    (0, express_validator_1.body)("email").notEmpty().trim().isEmail().withMessage("Enter a valid Email"),
    (0, express_validator_1.body)("password").notEmpty().trim().isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
];
// export const chatMessageValidator = [
//     body("message").notEmpty().withMessage("Message  is required"),
// ];
//# sourceMappingURL=validators.js.map