const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const { connectDB } = require("./config/db")
const { UserRouter } = require("./routers/Auth.route")

const app = express()
app.use(cors({
    origin: "*",
    Credential: true
}))

app.use(express.json())
app.use(cookieParser());
app.use("/user", UserRouter)
app.get("/test", (req, res) => {
    res.send("Chat with API")
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