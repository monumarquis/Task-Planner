const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model')
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const userPrivateRoute = async (req, res, next) => {
    console.log(req);
    let authToken;
    // here we are checking if headers include token if not then return from here itself
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) authToken = req.headers.authorization.split(" ")[1]
    else return res.status(401).send({ "message": "Not Authorized" })

    try {
        // verify JWT Token
        const decodedToken = jwt.verify(authToken, SECRET_TOKEN)

        // here in updateProfile route we need password so that's why I send user Detials with password 
        if (req.url === "/udpdateProfile") {
            // Get the data by decodedToken id and send the all detail in req.body.user object with password
            const User = await userModel.findById(decodedToken._id)
            req.body.user = User
        }
        else {
            // Get the data by decodedToken id and send the all detail in req.body.user object except password
            const User = await userModel.findById(decodedToken._id).select("-password")
            req.body.user = User
        }
        next()

    } catch (error) {
        res.status(401).send({ "message": "Not Authorized" })
    }
}

const adminPrivateRoute = async (req, res, next) => {
    let authToken;
    // here we are checking if headers include token if not then return from here itself
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) authToken = req.headers.authorization.split(" ")[1]
    else return res.status(401).send({ "message": "Not Authorized" })

    try {
        // verify JWT Token
        const decodedToken = jwt.verify(authToken, SECRET_TOKEN)
        // here we are checking here user role is admin or not 
        if (decodedToken.role === 'admin') {
            next()
        }
        else {
            res.status(401).send({ "message": "Not Authorized" })
        }


    } catch (error) {
        res.status(401).send({ "message": "Not Authorized" })
    }
}

module.exports = { userPrivateRoute, adminPrivateRoute }