const db = require("../../../models");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
    const User = db.users;
    
    // validation
    const { name, email, password, address, balance } = req.body;

    if (!name || !email || !password || balance === undefined) {
        return res.status(400).json({
            status: "failed",
            message: "Please provide all required fields"
        });
    }

    try {
        const encPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: encPassword,
            address,
            balance: balance || 0,
        });

        res.status(200).json({
            status: "success",
            message: "User registered successfully"
        });
    } catch (e) {
        res.status(400).json({
            status: "failed!",
            message: e.message,
        });
    }
};

module.exports = userRegister;
