import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAdminToken = (req, res, next) => {
    const headerWithToken = req.headers.authorization;

    if (!headerWithToken) {
        return res.status(400).json({ error: "Token is not provided" });
    }

    const token = headerWithToken.split(" ")[1];

    if (!token) {
        return res.status(400).json({ error: "Token is not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.isAdmin) {
            // req.user = decoded;
            next();
        } else {
            return res.status(401).json({ error: "Admin not authenticated" });
        }
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
