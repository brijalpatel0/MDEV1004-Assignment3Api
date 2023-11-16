//controllers/UserController.js
import User from "../models/UserModel";
import bcrypt from "bcryptjs";

function userFieldCheck(req, res, next) {
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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
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
