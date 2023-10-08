import jwt from 'jsonwebtoken'

export const authorization = async (req, res, next) => {

    if (!req.headers.authorization) return res.status(401).json({
        status: false,
        message: "Please login",
        response: "Unauthorized"
    })

    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWTKEY, (err, decode) => {

        if (err) return res.status(401).json({
            status: false,
            message: "Please login",
            response: "Unauthorized, ghfgh"
        })

        req.body.user_id = decode.id
        next()
    })
}