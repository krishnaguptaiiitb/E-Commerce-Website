import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.models.js";

//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exist with same email! Please Try again",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please register first",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth-middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
