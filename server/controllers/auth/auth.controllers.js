import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.models.js";

// Register Users
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    dateOfBirth,
    gender,
    country,
    city,
    zipCode,
    terms,
    profileType,
    bio,
  } = req.body;

  try {
    console.log('📥 Received registration data:', JSON.stringify(req.body, null, 2));

    // 1. Validate required fields
    if (!firstName || !lastName || !username || !email || !password || !dateOfBirth || !country || !profileType || terms === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields: {
          firstName: !firstName,
          lastName: !lastName,
          username: !username,
          email: !email,
          password: !password,
          dateOfBirth: !dateOfBirth,
          country: !country,
          profileType: !profileType,
          terms: terms === undefined
        }
      });
    }

    // 2. Validate terms acceptance
    if (terms !== true) {
      return res.status(400).json({
        success: false,
        message: "You must accept the terms and conditions"
      });
    }

    // 3. Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.email === email 
          ? "User already exists with this email" 
          : "Username already taken"
      });
    }

    // 4. Hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // 5. Create user with sanitized data
    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashPassword,
      phone: phone ? phone.trim() : undefined,
      dateOfBirth: new Date(dateOfBirth),
      gender: gender || undefined,
      country: country.trim(),
      city: city ? city.trim() : undefined,
      zipCode: zipCode ? zipCode.trim() : undefined,
      terms: Boolean(terms),
      profileType,
      bio: bio ? bio.trim() : undefined,
    });

    // 6. Save user
    await newUser.save();

    console.log('✅ User registered successfully:', newUser.email);

    // 7. Return success response
    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        id: newUser._id,
      },
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
        field: field
      });
    }
  }
};

//Login Users
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
        username: checkUser.username,
      },
      "ACCESS_TOKEN_SECRET",
      {
        expiresIn: "1h",
      }
    );
    return res
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
          username: checkUser.username,
        },
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//Logout users
const logoutUser = (req, res) => {
  return res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//Auth-Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "ACCESS_TOKEN_SECRET");
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
