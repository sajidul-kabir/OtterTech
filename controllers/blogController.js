const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM blogs";
  const blogs = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    data: blogs[0],
  });
});
