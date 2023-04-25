const express = require("express")
const nanoid = require("nanoid")
const { analyticsOfUrl, generatePublicShortUrl } = require("../controllers/publicUrlController")
const { publicUrlmiddleware } = require("../middlewares/publicUrl")
const { authorization } = require("../middlewares/authorization")
const { generatePrivateShortUrl } = require("../controllers/privateUrlController")
const { UrlModel } = require("../models/Url.model")

const UrlRouter = express.Router({ mergeParams: true })


UrlRouter.post("/public", publicUrlmiddleware, generatePublicShortUrl)
UrlRouter.post("/private", authorization, generatePrivateShortUrl)
UrlRouter.get("/analytics/:shortId", analyticsOfUrl)

module.exports = { UrlRouter }