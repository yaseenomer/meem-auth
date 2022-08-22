import { body } from "express-validator";

export const signupUserValidator = [
  body("email")
    .trim().isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
  body("store")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Store must be between 3 and 20 characters"),
];
