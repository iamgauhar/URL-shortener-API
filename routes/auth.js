import { Router } from "express";
import { login, resetPasswordMail, setPassword, signup } from "../controllers/auth.js";
import { emailValidation, loginValidation, passwordValidation, signupValidation } from "../middlewares/authValidator.js";

const userRouter = Router()

userRouter.post("/signup", (signupValidation), signup)
userRouter.post("/set-password/:id/:token", (passwordValidation), setPassword)
userRouter.post("/login", (loginValidation), login)
userRouter.post("/reset-password", (emailValidation), resetPasswordMail)

export default userRouter