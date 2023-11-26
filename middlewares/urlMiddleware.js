import { nanoid, customAlphabet, urlAlphabet, random, customRandom } from "nanoid";

export const generateUrlandId = (req, res, next) => {

    const idf = customAlphabet('0123456789', 13)
    const urlId = customRandom(urlAlphabet, 6, random)

    req.body.short_url = urlId();
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