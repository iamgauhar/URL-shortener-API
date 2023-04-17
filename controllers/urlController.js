const { nanoid } = require("nanoid")
const { UrlModel } = require("../models/Url.model")

const generateShortUrl = async (req, res) => {
    const { url } = req.body
    if (!url) return res.status(400).json({ result: false, msg: "URL required" })
    const shortUrl = nanoid(8)
    await UrlModel.create({
        shortId: shortUrl,
        redirectURL: url,
        timestam: []
    })
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

module.exports = { generateShortUrl, analyticsOfUrl }