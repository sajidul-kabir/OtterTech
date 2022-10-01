const pool = require("../db");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.tagCreate = catchAsync(async (req, res, next) => {
  const itemsAll = req.body;
  console.log(itemsAll.items);
  const items = itemsAll.items;

  const created_tags = await pool.query(
    "INSERT INTO tags (blog_id, tag_name) VALUES ?",
    [items.map((item) => [item.blog_id, item.tag_name])]
  );

  res.status(200).json({
    message: "successful",
    data: created_tags,
  });
});

exports.getGamingNews = catchAsync(async (req, res, next) => {
  const gameTagQuery =
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at,tag_name from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%game%' || tags.tag_name like '%gaming%' GROUP BY blogs.id";
  const gamingNews = await pool.execute(gameTagQuery);

  res.status(200).json({
    message: "successful",
    total: gamingNews[0].length,
    data: gamingNews[0],
  });
});
