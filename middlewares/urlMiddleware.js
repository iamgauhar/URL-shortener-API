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
    // if (!original_url)
    try {
        const parsedUrl = new URL(original_url);

        // Check if the URL uses HTTP or HTTPS
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            return res.status(402).json({
                status: false,
                message: "Invalid URL"
            });
        }
        next()
    } catch (error) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

}