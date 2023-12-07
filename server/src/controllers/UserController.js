//controllers/UserController.js
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";

function userFieldCheck(req, res, next) {
  //Only checks for absolutely necessary fields
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  next();
}
async function loginUser(req, res, next) {
  const { username, password } = req.body;
  try {
    // Using async/await instead of callback
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication Failed: User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Authentication Failed: Incorrect password" });
    }

    const jwtPayload = { id: user.id, email: user.email };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json({ message: "okay", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function registerUser(req, res, next) {
  const { username, password, firstName, lastName, emailAddress } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      emailAddress,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { userFieldCheck, registerUser, loginUser };