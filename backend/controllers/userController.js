import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/index.js";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

//login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true, 
      maxAge: 3600000, 
    });

    res.json({
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.json({ message: "Logout successful" });
};
