const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    alert("Error while registering user:", err); // Log the error
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
