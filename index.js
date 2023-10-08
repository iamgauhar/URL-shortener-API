import express from "express";
import 'dotenv/config'



// importes custom modules.
import connection from "./configs/db.js";
import logger from "./configs/logger.js";
import userRouter from "./routes/auth.js";
import urlRouter from "./routes/url.js";



const app = express()
app.use(express.json())

app.use("/auth", userRouter)
app.use("/url", urlRouter)





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