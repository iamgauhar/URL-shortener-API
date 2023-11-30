import express from "express";
import cors from 'cors'
import 'dotenv/config'
import cookieParser, { JSONCookies } from "cookie-parser";


// importes custom modules.
import connection from "./configs/db.js";
import logger from "./configs/logger.js";
import userRouter from "./routes/auth.js";
import urlRouter from "./routes/url.js";
import { visitUrl } from "./controllers/visitUrl.js";



const app = express()
app.use(express.json())
app.use(cors({

    // credentials: true,
    // allowedHeaders: true,
    // origin: "http://localhost:5173",

}))
app.options("*", cors())

app.use(cookieParser())

app.get("/:url", visitUrl)
app.use("/auth", userRouter)
app.use("/url", urlRouter)


app.get('/cookie/get', (req, res) => {
    const token = req.cookies?.user
    console.log(JSON.parse(token).token);
    return res.send(token)
})


const PORT = process.env.PORT || 5001
app.listen(PORT, async () => {
    try {
        connection;

        logger.info('server is running on http://localhost:' + PORT)
        console.log(process.env.msg, "Database Connection Established");

    } catch (error) {
        console.log(error);
    }
})