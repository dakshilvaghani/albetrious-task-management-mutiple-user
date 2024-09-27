import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Get the token from Bearer

  console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    console.log(decoded);

    // Use 'userId' from the decoded token
    req.user = await User.findById(decoded.userId); // Assuming userId is the key in your JWT payload
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
