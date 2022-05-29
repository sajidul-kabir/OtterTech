const pool = require("../db");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM users";
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    data: users[0],
  });
});

exports.getAUser = catchAsync(async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return next(new AppError("provide the required fields", 400));
  }
  const username_query = "SELECT * FROM users where username=?";
  const user = await pool.execute(username_query, [username]);
  if (user[0].length === 0) {
    return next(new AppError("Invalid username", 404));
  }
  res.status(200).json({
    message: "successful",
    data: user[0],
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const username = req.user;
  const username_query = "SELECT * FROM users where username=?";
  const user = await pool.execute(username_query, [username]);
  res.status(200).json({
    message: "successful",
    data: user[0],
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "username",
    "fullname",
    "email",
    "password"
  );

  //Hashing Password
  if (filteredBody.password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(filteredBody.password, salt);
    filteredBody.password = hash;
  }
  let update_query = "UPDATE users SET ? WHERE username = ?";
  await pool.query(update_query, [filteredBody, req.user]);

  res.status(200).json({
    status: "successfully updated",
  });
});
