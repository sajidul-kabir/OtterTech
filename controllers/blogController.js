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

exports.getABlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  if (!blogId) {
    return next(new AppError("provide the required fields", 400));
  }
  const blog_query = "SELECT * FROM blogs where id=?";
  const blog = await pool.execute(blog_query, [blogId]);
  if (blog[0].length === 0) {
    return next(new AppError("Invalid ID", 404));
  }
  res.status(200).json({
    message: "successful",
    data: blog[0],
  });
});

exports.getBlogsFromAUser = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    return next(new AppError("provide the required fields", 400));
  }
  const blog_query =
    "SELECT id,title,blog,cover_photo,blogs.created_at,users.username,users.fullname FROM blogs INNER JOIN users on blogs.user_username=users.username WHERE users.username=?";
  const blogs = await pool.execute(blog_query, [username]);
  if (blogs[0].length === 0) {
    return next(new AppError("Invalid username", 404));
  }
  res.status(200).json({
    message: "successful",
    data: blogs[0],
  });
});

exports.getMyBlogs = catchAsync(async (req, res, next) => {
  const username = req.user;
  const blog_query =
    "SELECT id,title,blog,cover_photo,blogs.created_at,users.username,users.fullname FROM blogs INNER JOIN users on blogs.user_username=users.username WHERE users.username=?";
  const blogs = await pool.execute(blog_query, [username]);

  res.status(200).json({
    message: "successful",
    data: blogs[0],
  });
});
