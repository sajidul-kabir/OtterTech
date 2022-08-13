const multer = require("multer");
const pool = require("../db");
const { getOrSetCache } = require("../utils/redis-getOrSetCache");
const filterObj = require("../utils/filterObj");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

let updated_blogs_counter = 0;
let current_blogs_counter = 0;

let updated_popular_blogs_counter = 0;
let current_popular_blogs_counter = 0;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img/blogs");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `blog-${Date.now()}.${ext}`);
  },
});
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
exports.uploadCoverPhoto = upload.single("cover-photo");

// Blog Selection
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await getOrSetCache(
    "blogs",
    updated_blogs_counter,
    current_blogs_counter,
    async () => {
      const query = "SELECT * FROM blogs ORDER BY blogs.created_at DESC";
      const allBlogs = await pool.execute(query);
      current_blogs_counter = 0;
      updated_blogs_counter = 0;
      return allBlogs[0];
    }
  );
  res.status(200).json({
    message: "successful",
    total: blogs.length,
    data: blogs,
  });
});

exports.getABlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  if (!blogId) {
    return next(new AppError("provide the required fields", 400));
  }
  const blog_query =
    "SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at,COUNT(*) as total_upvotes FROM blogs JOIN upvotes ON blogs.id=upvotes.blog_id where blogs.id=?";
  const blog = await pool.execute(blog_query, [blogId]);
  if (blog[0].length === 0) {
    return next(new AppError("Invalid ID", 404));
  }
  res.status(200).json({
    message: "successful",
    data: blog[0],
  });
});

exports.mostPopular = catchAsync(async (req, res, next) => {
  const blogs = await getOrSetCache(
    "popular_blogs",
    updated_popular_blogs_counter,
    current_popular_blogs_counter,
    async () => {
      const query =
        "SELECT id,title,blog,cover_photo,user_username,created_at,COUNT(*) as total_upvotes from blogs INNER JOIN upvotes ON blogs.id=upvotes.blog_id GROUP BY blogs.id ORDER by total_upvotes DESC LIMIT 5";
      const popularBlogs = await pool.execute(query);
      current_popular_blogs_counter = 0;
      updated_popular_blogs_counter = 0;
      return popularBlogs[0];
    }
  );
  res.status(200).json({
    message: "successful",
    total: blogs.length,
    data: blogs,
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
    total: blogs[0].length,
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
    total: blogs[0].length,
    data: blogs[0],
  });
});

// Blog Creation
exports.createABlog = catchAsync(async (req, res, next) => {
  const { title, blog } = req.body;
  if (!title || !blog) {
    return next(new AppError("provide the required fields", 400));
  }
  const newBlog = {
    title,
    blog,
    cover_photo: req.file.filename,
    user_username: req.user,
  };
  const blog_query = "INSERT INTO blogs SET ?";
  const created_blog = await pool.query(blog_query, [newBlog]);

  updated_blogs_counter++;
  res.status(201).json({
    message: "successful",
    data: created_blog[0],
  });
});

// Blog Modification
exports.updateABlog = catchAsync(async (req, res, next) => {
  const id = req.params.blogId;
  if (!id) {
    return next(new AppError("provide the id", 400));
  }
  const filteredBody = filterObj(req.body, "title", "blog", "cover_photo");
  let update_query = "UPDATE blogs SET ? WHERE id = ?";
  await pool.query(update_query, [filteredBody, id]);

  updated_blogs_counter++;
  res.status(202).json({
    message: "successfully updated",
  });
});

// Blog Deletion
exports.deleteABlog = catchAsync(async (req, res, next) => {
  const id = req.params.blogId;
  if (!id) {
    return next(new AppError("provide the id", 400));
  }
  let delete_query = "DELETE FROM blogs WHERE id = ?";
  await pool.query(delete_query, id);
  updated_blogs_counter++;

  res.status(200).json({
    message: "deleted",
  });
});

// Blog Upvote
exports.upvoteABlog = catchAsync(async (req, res, next) => {
  const id = req.params.blogId;
  if (!id) {
    return next(new AppError("provide the id", 400));
  }
  const blog_info = {
    users_username: req.user,
    blog_id: id,
  };
  let upvote_query = "INSERT INTO upvotes SET ?";
  const upvoted_blog = await pool.query(upvote_query, [blog_info]);
  updated_popular_blogs_counter++;

  res.status(201).json({
    message: "successful",
    data: upvoted_blog[0],
  });
});

exports.deleteUpvote = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  if (!blogId) {
    return next(new AppError("provide the required fields", 400));
  }
  const blog_query =
    "DELETE FROM upvotes WHERE upvotes.users_username = ? AND upvotes.blog_id = ?";
  await pool.execute(blog_query, [req.user, blogId]);
  res.status(200).json({
    message: "successfully deleted",
  });
});

exports.yourUpvote = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  if (!blogId) {
    return next(new AppError("provide the required fields", 400));
  }
  const blog_query =
    "SELECT * from users JOIN upvotes ON users.username=upvotes.users_username WHERE users.username=? && blog_id=?";
  const blog = await pool.execute(blog_query, [req.user, blogId]);

  res.status(200).json({
    message: "successful",
    data: blog[0],
  });
});
