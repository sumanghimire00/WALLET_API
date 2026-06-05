const db = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
    const User = db.users;
    const { email, password } = req.body;

    try {
        if (!email) throw new Error("Please provide an email");
        if (!password) throw new Error("Please provide a password");

        const getUser = await User.findOne({
            where: { email: email }
        });
        
        if (!getUser) throw new Error("User does not exist");
        
        const matched = await bcrypt.compare(password, getUser.password);

        if (!matched) throw new Error("Email and Password do not match");

        const accessToken = jwt.sign({
            id: getUser.id,
            email: getUser.email,
            name: getUser.name,
        },
            process.env.jwt_salt || 'default_secret', {
            expiresIn: "90 days"
        });

        res.status(200).json({
            status: "User logged in successfully!!",
            accessToken
        });

    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message,
        });
    }
};

module.exports = userLogin;
