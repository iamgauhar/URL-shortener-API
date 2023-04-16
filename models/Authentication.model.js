const mongooose = require("mongoose")

const UserRegisterModel = mongooose.model("user", mongooose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}))



module.exports = { UserRegisterModel }