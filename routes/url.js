import { Router } from "express";
import { generateOpenUrl, generatePrivateUrl, getMyUrls } from "../controllers/url.js";
import { openUrlMiddleware } from "../middlewares/urlMiddleware.js";
import { authorization } from "../middlewares/authorization.js";

const urlRouter = Router()

urlRouter.post("/public", openUrlMiddleware, generateOpenUrl)
urlRouter.post("/private", openUrlMiddleware, authorization, generatePrivateUrl)
urlRouter.post("/all-urls", authorization, getMyUrls)

export default urlRouter