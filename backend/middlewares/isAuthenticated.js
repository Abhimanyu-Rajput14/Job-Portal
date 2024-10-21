import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Fetch token from cookies
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Please log in.",
                success: false,
            });
        }
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId; // Attach userId to request object
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please provide a valid token.",
                success: false,
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired. Please log in again.",
                success: false,
            });
        }
        
        console.error("Authentication error:", error); // Log error for debugging
        return res.status(500).json({
            message: "An error occurred during authentication. Please try again later.",
            success: false,
        });
    }
};

export default isAuthenticated;