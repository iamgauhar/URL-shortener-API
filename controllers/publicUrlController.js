const { nanoid } = require("nanoid")
const { UrlModel } = require("../models/Url.model")

const generatePublicShortUrl = async (req, res) => {
    const { redirectURL } = req.body
    const payload = req.body
    if (!redirectURL) return res.status(400).json({ result: false, msg: "URL required" })
    const shortUrl = nanoid(8)
    req.body.shortId = shortUrl

    const newUrl = await new UrlModel(payload)
    newUrl.save()
    res.status(200).json({ result: true, response: `http://localhost:5000/${shortUrl}` })
}

const analyticsOfUrl = async (req, res) => {
    const shortId = req.params.shortId
    const analytics = await UrlModel.findOne({ shortId })
    res.status(200).json({
        result: true,
        totalClicks: analytics.visitHistory.length,
        analytics: analytics.visitHistory
    })
}

module.exports = { generatePublicShortUrl, analyticsOfUrl }