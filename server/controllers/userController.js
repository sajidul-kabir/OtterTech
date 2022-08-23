const multer = require("multer");
const bcrypt = require("bcryptjs");
const sharp = require("sharp");
const pool = require("../db");
const filterObj = require("../utils/filterObj");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Selectiong Users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = "SELECT * FROM users";
  const users = await pool.execute(query);
  res.status(200).json({
    message: "successful",
    total: users[0].length,
    data: users[0],
  });
});

exports.getAUser = catchAsync(async (req, res, next) => {
  const username = req.params.username;
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

// Updating User

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("user_photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`img/users/${req.file.filename}`);

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "username",
    "fullname",
    "email",
    "password",
    "user_photo"
  );
  if (req.file) filteredBody.user_photo = req.file.filename;

  //Hashing Password
  if (filteredBody.password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(filteredBody.password, salt);
    filteredBody.password = hash;
  }
  let username_query = "SELECT * FROM users WHERE users.username=?";
  let any_user = await pool.query(username_query, [filteredBody.username]);
  // console.log(any_user[0]);
  if (any_user[0].length > 0) {
    if (req.user != filteredBody.username)
      return next(new AppError("Invalid username", 404));
  }
  let update_query = "UPDATE users SET ? WHERE username = ?";
  await pool.query(update_query, [filteredBody, req.user]);

  res.status(200).json({
    status: "successfully updated",
  });
});
