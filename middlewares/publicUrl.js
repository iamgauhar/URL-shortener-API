
const publicUrlmiddleware = (req, res, next) => {

    req.body.admin = "iamadmin"
    req.body.user = "randomuser"
    next()
    // console.log(req.body);
}

module.exports = { publicUrlmiddleware }