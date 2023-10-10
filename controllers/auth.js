import 'dotenv/config'
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import connection from '../configs/db.js'
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import generateId from '../utils/generateId.js';
import { nanoid } from 'nanoid';


// Stage 1 of signup process / 2
export const signup = async (req, res, next) => {

    const { email, first_name, last_name } = req.body;
    const token = nanoid();
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = errors.array()[0].msg;
        return res.status(422).json({ status: false, message: error });
    }

    const insertQuery = "INSERT INTO users (id, email, first_name, last_name, passwordSetToken) VALUES";
    const id = generateId;

    try {
        await connection.execute(`${insertQuery} ("${id}", "${email}", "${first_name}", "${(last_name || "")}", "${token}")`)
        let message = `<h3>To reset your password <a href="${process.env.BASEURL}/auth/set-password/${id}/${token}">click here </a> </h3>`;

        await sendEmail(email, "Verify email", message)
        return res.status(200).json({
            status: true,
            message: "Signup successful please varify your Email."
        })


    } catch (err) {
        if (err.code == "ER_DUP_ENTRY") {
            return res.status(400).json({
                status: false,
                code: err.code,
                message: "Account already exists."
            })
        }
        else if (err.code == "ER_BAD_NULL_ERROR") {
            return res.status(400).json({
                status: false,
                code: err.code,
                message: "Field required"
            })
        } else {
            return res.status(400).json({
                status: false,
                code: err.code,
                message: "Somthing went wrong!"
            })
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
        if ((currentDate - user[0][0]?.updated_at < 3600000) && user[0][0]?.passwordSetToken === token) {

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const result = await connection.execute(`UPDATE users SET password = "${hashedPassword}", passwordSetToken = "", isVarified = ${true} WHERE id = "${id}"`)

            if (result[0].affectedRows == 1) {
                return res.status(200).json({
                    status: true,
                    message: "Password set successful"
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Link expired"
            })
        }
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Somthing went wrong",
            err
        })
    }

}

// Login API controller;
export const login = async (req, res) => {
    const { email, password } = req.body

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = errors.array()[0].msg;
        return res.status(422).json({
            status: false,
            message: error
        });
    }

    try {

        const user = await connection.execute(`SELECT * FROM users WHERE email = "${email}"`)
        if (user[0].length === 0) return res.status(400).json({
            status: false,
            message: "Account not exists."
        })
        const userData = user[0][0]
        if (!userData.isVarified) return res.status(400).json({
            status: false,
            message: "Account not varified"
        })
        const userPassword = await bcrypt.compare(password, userData.password)
        if (!userPassword) return res.status(400).json({
            status: false,
            message: "Password did not mached."
        })
        const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWTKEY)
        res.status(200).json({
            status: true,
            message: 'user logged in successfully',
            user: {
                id: userData.id,
                name: userData.first_name,
                email: userData.email,
                token,
            },
        });

    } catch (err) {
        return res.status(400).json({ status: false, code: err.code, message: "Somthing went wrong." })
    }

}

// Forgot password API
export const resetPasswordMail = async (req, res, next) => {

    const { email } = req.body;

    try {
        const user = await connection.execute(`SELECT * FROM users WHERE email = "${email}"`)
        if (user[0].length === 0) return res.status(400).json({
            status: false,
            message: "Account not exists."
        })
        const token = nanoid()
        const result = await connection.execute(`UPDATE users SET passwordSetToken = "${token}" WHERE email = "${email}"`)

        if (result[0].affectedRows !== 1) {
            return res.status(402).json({
                status: false,
                message: "Somthing went wrong!"
            })
        }
        let message = `<h3>To reset your password <a href="${process.env.BASEURL}/auth/set-password/${user[0][0].id}/${token}">click here </a> </h3>`;

        const response = await sendEmail(email, "Forgot password", message)
        if (response.response.includes("OK")) {
            return res.status(200).json({
                status: true,
                message: "please varify your Email."
            })
        }
        return res.status(400).json({
            status: false, code: err,
            message: "Somthing went wrong!"
        })


    } catch (err) {
        if (err.code == "ER_BAD_NULL_ERROR") {
            return res.status(400).json({
                status: false,
                code: err.code,
                message: "Field required"
            })
        } else {
            return res.status(400).json({
                status: false,
                code: err,
                message: "Somthing went wrong!"
            })
        }
    }


}
