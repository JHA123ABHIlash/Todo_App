const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;

    console.log("TOKEN:", token);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No Token"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        const user = await User.findById(decoded.id);

        console.log("USER:", user);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (err) {
        console.log("JWT ERROR:", err);

        return res.status(401).json({
            message: err.message
        });
    }
};

module.exports = authenticate;