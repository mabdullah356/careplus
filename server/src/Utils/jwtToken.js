const jwt = require("jsonwebtoken");


function generateToken(user, res) {
  const token = jwt.sign(
    { id: user._id,role:user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d"}
  );
  res.cookie("token", token, {
    maxAge: 60 * 60 * 1000 
  });
  return token;
}



module.exports = { generateToken};
