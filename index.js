const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const { connectDB } = require("./config/db")
const { UserRouter } = require("./routers/Auth.route");
const { UrlRouter } = require("./routers/UrlShortener.route");
const { UrlModel } = require("./models/Url.model");

const app = express()
app.use(cors({
    origin: "*",
    Credential: true
}))

app.use(express.json())
app.use(cookieParser());
app.use("/user", UserRouter)
app.use("/url", UrlRouter)

app.get("/:shortId", async (req, res) => {

    const { shortId } = req.params

    try {
        const newUrl = await UrlModel.findOneAndUpdate({ shortId }, {
            $push: {
                visitHistory: {
                    timestamp: new Date()
                }
            }
        })
        if (!newUrl) return res.status(404).json({ result: false, msg: "URL not found!" })
        res.redirect(newUrl.redirectURL)
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: false, msg: "Somethin went wrong!" })

    }

})



app.get("/test", (req, res) => {
    res.send("URL shortener API")
})


app.listen(5000, async () => {
    try {

        await connectDB;
        console.log("DB Connected");
        console.log("listing on 5000");

    } catch (err) {

        console.log("Faild to connect");

    }
})