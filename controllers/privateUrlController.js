const { nanoid } = require("nanoid")
const { UrlModel } = require("../models/Url.model")

const generatePrivateShortUrl = async (req, res) => {
    const { redirectURL } = req.body
    const payload = req.body
    if (!redirectURL) return res.status(400).json({ result: false, msg: "URL required" })
    const shortUrl = nanoid(8)
    req.body.shortId = shortUrl

    const newUrl = await new UrlModel(payload)
    newUrl.save()
    res.status(200).json({ result: true, response: `http://localhost:5000/${shortUrl}` })
}

const getAllmyUrls = async (req, res) => {
    const { userId } = req.params
    if (userId != req.body.user) return res.status(400).json({ result: false, msg: "You are not authorize" })

    const allUrls = await UrlModel.find({ user: userId })
    res.status(200).json(allUrls)
}

module.exports = { generatePrivateShortUrl, getAllmyUrls }