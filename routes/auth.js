import { Router } from "express";
import { login, resetPasswordMail, setPassword, signup } from "../controllers/auth.js";
import { emailValidation, loginValidation, passwordValidation, signupValidation } from "../middlewares/authValidator.js";

const router = Router()

router.post("/signup", (signupValidation), signup)
router.post("/set-password/:id/:token", (passwordValidation), setPassword)
router.post("/login", (loginValidation), login)
router.post("/reset-password", (emailValidation), resetPasswordMail)

export default router