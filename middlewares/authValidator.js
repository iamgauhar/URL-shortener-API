import { body } from "express-validator";


export const signupValidation = [
    body("first_name")
        .not()
        .isEmpty()
        .withMessage("First Name is required")
        .isString()
        .withMessage("Name should contain character")
        .isLength({ min: 4, max: 55 })
        .withMessage("Name length should be min 4 & max 55 char"),

    body("email")
        .not()
        .isEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Please input a valid email')
        .trim()
        .toLowerCase()
        .normalizeEmail()
]

export const passwordValidation = [
    body('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters')
        .isStrongPassword()
        .withMessage('password shoule be strong password'),
]