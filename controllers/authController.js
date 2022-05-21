const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user._id);

//     res.cookie("jwt", token, {
//       httpOnly: true,
//     });
//     res.status(statusCode).json({
//       message: "succesful",
//       token,
//       data: {
//         user,
//       },
//     });
//   };

exports.signup = async (req, res) => {
  const { username, fullname, email, password } = req.body;
  console.log(username);

  //Hashing Password
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = {
    username,
    fullname,
    email,
    password: hash,
  };

  await pool.query("INSERT INTO users SET ?", newUser);
  const accessToken = generateToken(username);
  res.status(201).json({
    message: "successful",
    accessToken,
  });
  //createSendToken(newUser, 201, res);
};

//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY);
};
