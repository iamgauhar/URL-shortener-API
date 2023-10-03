import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import connection from '../configs/db.js'
import sendEmail from '../utils/sendEmail.js';


// Stage 1 of signup process / 2
export const signup = async (req, res, next) => {

    const { email, first_name, last_name } = req.body;
    const token = uuidv4();
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = errors.array()[0].msg;
        return res.status(422).json({ status: false, message: error });
    }

    const insertQuery = "INSERT INTO users (id, email, first_name, last_name, passwordSetToken) VALUES";
    const id = uuidv4()

    try {
        await connection.execute(`${insertQuery} ("${id}", "${email}", "${first_name}", "${(last_name || "")}", "${token}")`)
        let message = `<h3>To reset your password <a href="${process.env.BASEURL}/set-password/${id}/${token}">click here </a> </h3>`;

        await sendEmail(email, "Verify email", message)
        return res.status(200).json({ status: true, message: "Signup successful please varify your Email." })


    } catch (err) {
        if (err.code == "ER_DUP_ENTRY") {
            return res.status(400).json({ status: false, code: err.code, message: "Account already exists." })
        }
        else if (err.code == "ER_BAD_NULL_ERROR") {
            return res.status(400).json({ status: false, code: err.code, message: "Field required" })
        } else {
            return res.status(400).json({ status: false, code: err.code, message: "Somthing went wrong!" })
        }
    }


}

// Stage 2 of signup process / 2
export const setPassword = async (req, res, next) => {
    const { id, token } = req.params;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = errors.array()[0].msg;
        return res.status(422).json({ status: false, message: error });
    }

    try {
        const user = await connection.execute(`SELECT * FROM users WHERE id = "${id}"`)
        const currentDate = new Date();
        if ((currentDate - user[0][0]?.updated_at > 3600000) && user[0][0]?.passwordSetToken === token) {

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const result = await connection.execute(`UPDATE users SET password = "${hashedPassword}", passwordSetToken = "", isVarified = ${true} WHERE id = "${id}"`)
            if (result[0].affectedRows == 1) {
                return res.status(200).json({ status: true, message: "Password set successful" })
            }
        } else {
            return res.status(400).json({ status: false, message: "Link expired" })
        }
    } catch (err) {
        return res.status(400).json({ status: false, message: "Somthing went wrong", err })
    }

}