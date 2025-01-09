import jwt from "jsonwebtoken";
import User from "../models/users.models.js";

export const autentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ message: 'Unautorized - No token provided' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            res.status(401).json({ message: 'Unautorized - Invalid token' });
        }
        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            res.status(401).json({ message: 'Unautorized - User not found' });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log('Error in authentication middleware', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}