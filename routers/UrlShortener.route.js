const express = require("express")
const nanoid = require("nanoid")
const { generateShortUrl, analyticsOfUrl } = require("../controllers/urlController")

const UrlRouter = express.Router()

UrlRouter.post("/", generateShortUrl)
UrlRouter.get("/analytics/:shortId", analyticsOfUrl)

module.exports = { UrlRouter }