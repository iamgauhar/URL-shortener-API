import express from "express";
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config'



// importes custom modules.
import connection from "./configs/db.js";
import logger from "./configs/logger.js";
import router from "./routes/auth.js";



const app = express()
app.use(express.json())

app.use("/auth", router)





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