import { nanoid } from "nanoid";
import generateId from "../utils/generateId.js";

export const openUrlMiddleware = (req, res, next) => {

    const { original_url } = req.body;
    if (!original_url) return res.status(402).json({
        status: false,
        message: "Please Enter the URL"
    });

    req.body.short_url = nanoid(8);
    req.body.uid = generateId;

    next()
}