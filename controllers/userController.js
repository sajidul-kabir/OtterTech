const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

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
