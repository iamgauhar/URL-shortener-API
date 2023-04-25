const jwt = require("jsonwebtoken")
require("dotenv").config()


const authorization = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token)
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (decode) {
                const username = decode.username
                req.body.user = username
                req.body.admin = "iamadmin"
                next()
            } else {
                res.send("Please Login invalid token")
            }
        })


    } else {
        res.send("Please Login")
    }
}

module.exports = { authorization }
