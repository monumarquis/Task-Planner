const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const SECRET_TOKEN = process.env.SECRET_TOKEN;


// user Login Route Logic

const ValidateUser = async (password, User) => {
    try {
        // here checking hash password that is stored on our database and 
        // return boolean value based on login crediantail
        const match = bcrypt.compareSync(password, User.password);

        if (match) {

            const token = jwt.sign(
                {
                    _id: User.id,
                    username: User.username,
                    email: User.email,
                    password: User.password,
                    role: User.role
                },
                SECRET_TOKEN,
                {
                    expiresIn: "7 days",
                }
            );
            return { message: "Login Successfully", token,role: User.role };
        } else {
            return { message: "Password is wrong" };
        }
    } catch {
        return { message: "Invalid Credentials" };
    }
}

// user Update Route Logic

const UpdatedUser = async (User, update) => {
    try {
        let doc = await userModel.findOneAndUpdate({ _id: User._id }, update, {
            new: true
        });
        console.log(doc);
        return { user: doc, message: "Your Informtion Updated Successfully" }

    } catch (error) {
        return { "message": "Something went wrong" }
    }
}


module.exports = { ValidateUser, UpdatedUser }