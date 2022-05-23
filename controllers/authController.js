const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, fullname, email, password } = req.body;

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
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  //Check whether credentials are provided
  if (!username || !password) {
    return res.json({
      message: "Error",
    });
  }

  //Check whether username matches
  const username_query = "SELECT * FROM users WHERE username=?";
  let user = await pool.query(username_query, [username]);
  if (user[0].length === 0) {
    return res.json({
      message: "INVALID",
    });
  }

  //Check whether password matches
  if (
    user[0].length > 0 &&
    (await bcrypt.compare(password, user[0][0].password))
  ) {
    const accessToken = generateToken(username);
    res.status(200).json({
      message: "successfully Loggied in",
      accessToken,
    });
  } else {
    return res.json({
      message: "WRONG PASS",
    });
  }
};
//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY);
};
