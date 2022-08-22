import { body } from "express-validator";



export const signinValidator = [
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
];