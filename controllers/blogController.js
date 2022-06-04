const pool = require("../db");
const { getOrSetCache } = require("../utils/redis-getOrSetCache");
const filterObj = require("../utils/filterObj");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

let updated_blogs_counter = 0;
let current_blogs_counter = 0;

// Blog Selection
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await getOrSetCache(
    "blogs",
    updated_blogs_counter,
    current_blogs_counter,
    async () => {
      const query = "SELECT * FROM blogs";
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
//   redisClient.get("blogs", async (err, blogs) => {
//     if (err) console.error(err);
//     if (blogs != null) {
//       console.log("CACHE HIT");
//       return res.json({
//         message: "successful",
//         total: JSON.parse(blogs).length,
//         data: JSON.parse(blogs),
//       });
//     } else {
//       console.log("CACHE MISS");
//       const query = "SELECT * FROM blogs";
//       const allBlogs = await pool.execute(query);
//       redisClient.setEx("blogs", 60, JSON.stringify(allBlogs[0]));
//       res.status(200).json({
//         message: "successful",
//         total: allBlogs[0].length,
//         data: allBlogs[0],
//       });
//     }
//   });
// });

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
  const { title, blog, cover_photo } = req.body;
  if (!title || !blog) {
    return next(new AppError("provide the required fields", 400));
  }
  const newBlog = {
    title,
    blog,
    cover_photo,
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
  most_popular_cache_counter++;

  res.status(201).json({
    message: "successful",
    data: upvoted_blog[0],
  });
});

exports.mostPopular = catchAsync(async (req, res, next) => {
  // console.log(most_popular_cache_counter, curr_most_popular_cache_counter);
  // redisClient.get("most_popular_blogs", async (err, most_popular_blogs) => {
  //   if (err) console.error(err);
  //   if (most_popular_blogs != null) {
  //     if (curr_most_popular_cache_counter === most_popular_cache_counter) {
  //       console.log("CACHE HIT");
  //       return res.json({
  //         message: "successful",
  //         data: JSON.parse(most_popular_blogs),
  //       });
  //     } else {
  //       console.log("STALE DATA CACHE MISS");
  //       curr_most_popular_cache_counter++;
  //       const query =
  //         "SELECT id,title,blog,cover_photo,user_username,created_at,COUNT(*) as total_upvotes from blogs INNER JOIN upvotes ON blogs.id=upvotes.blog_id GROUP BY blogs.id ORDER by total_upvotes DESC LIMIT 5";
  //       const mostPopularBlogs = await pool.execute(query);
  //       redisClient.setEx(
  //         "most_popular_blogs",
  //         60,
  //         JSON.stringify(mostPopularBlogs[0])
  //       );
  //       res.status(200).json({
  //         message: "successful",
  //         data: mostPopularBlogs[0],
  //       });
  //     }
  //   } else {
  //     console.log("CACHE MISS");
  //     const query =
  //       "SELECT id,title,blog,cover_photo,user_username,created_at,COUNT(*) as total_upvotes from blogs INNER JOIN upvotes ON blogs.id=upvotes.blog_id GROUP BY blogs.id ORDER by total_upvotes DESC LIMIT 5";
  //     const mostPopularBlogs = await pool.execute(query);
  //     redisClient.setEx(
  //       "most_popular_blogs",
  //       60,
  //       JSON.stringify(mostPopularBlogs[0])
  //     );
  //     res.status(200).json({
  //       message: "successful",
  //       data: mostPopularBlogs[0],
  //     });
  //   }
  // });
});
