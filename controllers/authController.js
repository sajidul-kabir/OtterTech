const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, fullname, email, password } = req.body;

  if (!email || !fullname || !password || !username) {
    return next(new AppError("provide the required fields", 400));
  }

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
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //Check whether credentials are provided
  if (!username || !password) {
    return next(new AppError("provide the required fields", 400));
  }

  //Check whether username matches
  const username_query = "SELECT * FROM users WHERE username=?";
  let user = await pool.query(username_query, [username]);
  if (user[0].length === 0) {
    return next(new AppError("Invalid username", 404));
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
    return next(new AppError("Wrong Password", 404));
  }
});

//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY);
};
