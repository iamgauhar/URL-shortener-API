import { Router } from "express";
import { deleteUrl, generateOpenUrl, generatePrivateUrl, getMyUrls, updateUrl } from "../controllers/url.js";
import { checkUrl, generateUrlandId } from "../middlewares/urlMiddleware.js";
import { authorization } from "../middlewares/authorization.js";

const urlRouter = Router()

urlRouter.post("/generate/public", checkUrl, generateUrlandId, generateOpenUrl)
urlRouter.post("/generate/private", checkUrl, generateUrlandId, authorization, generatePrivateUrl)
urlRouter.get("/all-urls/:limit/:offset", authorization, getMyUrls)
urlRouter.delete("/delete/:url", authorization, deleteUrl)
urlRouter.put("/update/:url", checkUrl, authorization, updateUrl)


export default urlRouter