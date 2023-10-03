import { Router } from "express";
import { setPassword, signup } from "../controllers/auth.js";
import { passwordValidation, signupValidation } from "../middlewares/authValidator.js";

const router = Router()

router.post("/signup", (signupValidation), signup)
router.post("/set-password/:id/:token", (passwordValidation), setPassword)

export default router