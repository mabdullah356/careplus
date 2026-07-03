const User = require("../Models/user.Model");
const bcrypt = require("bcryptjs");

module.exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["patient", "doctor"].includes(role)) {
    return res.status(400).json({ message: "Role must be either patient or doctor" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword, role });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" });
  }
};
