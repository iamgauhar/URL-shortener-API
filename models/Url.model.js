const mongooose = require("mongoose")

const UrlModel = mongooose.model("url", mongooose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true
    },
    admin: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    visitHistory: [{ timestamp: { type: String } }]
}, { timestamps: true }))

module.exports = { UrlModel }