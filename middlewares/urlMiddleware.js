import { nanoid, customAlphabet } from "nanoid";
import generateId from "../utils/generateId.js";

export const generateUrlandId = (req, res, next) => {

    const idf = customAlphabet('0123456789', 13)


    req.body.short_url = nanoid(8);
    req.body.uid = idf();

    next()
}

export const checkUrl = (req, res, next) => {

    const { original_url } = req.body;
    if (!original_url) return res.status(402).json({
        status: false,
        message: "Please Enter the URL"
    });
    next()
}