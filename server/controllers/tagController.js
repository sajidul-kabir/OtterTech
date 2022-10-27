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
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%game%' || tags.tag_name like '%gaming%' GROUP BY blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at";

  const gamingNews = await pool.execute(gameTagQuery);

  res.status(200).json({
    message: "successful",
    total: gamingNews[0].length,
    data: gamingNews[0],
  });
});

exports.getTechNews = catchAsync(async (req, res, next) => {
  const techTagQuery =
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%tech%' || tags.tag_name like '%technology%' || tags.tag_name like '%futur%' GROUP BY blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at";

  const techNews = await pool.execute(techTagQuery);

  res.status(200).json({
    message: "successful",
    total: techNews[0].length,
    data: techNews[0],
  });
});
exports.getEntertainmentNews = catchAsync(async (req, res, next) => {
  const entertainmentTagQuery =
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%entertain%' || tags.tag_name like '%fun%'|| tags.tag_name like '%interesting%'|| tags.tag_name like '%amus%' GROUP BY blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at";
  const entertainmentNews = await pool.execute(entertainmentTagQuery);

  res.status(200).json({
    message: "successful",
    total: entertainmentNews[0].length,
    data: entertainmentNews[0],
  });
});

exports.getProductNews = catchAsync(async (req, res, next) => {
  const productTagQuery =
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%product%' || tags.tag_name like '%gadget%' GROUP BY blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at";
  const productNews = await pool.execute(productTagQuery);

  res.status(200).json({
    message: "successful",
    total: productNews[0].length,
    data: productNews[0],
  });
});
exports.getReviewNews = catchAsync(async (req, res, next) => {
  const reviewTagQuery =
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%review%' || tags.tag_name like '%score%' || tags.tag_name like '%rating%' || tags.tag_name like '%rated%' GROUP BY blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at";
  const reviewNews = await pool.execute(reviewTagQuery);

  res.status(200).json({
    message: "successful",
    total: reviewNews[0].length,
    data: reviewNews[0],
  });
});

exports.getOtherNews = catchAsync(async (req, res, next) => {
  const otherquery =
    " SELECT  blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at from blogs INNER join tags ON blogs.id=tags.blog_id where tags.tag_name like '%news%' || tags.tag_name NOT like '%gam%' && tags.tag_name NOT like '%rating%' && tags.tag_name NOT like '%enter%'&& tags.tag_name NOT like '%review%'&& tags.tag_name NOT like '%product%'&& tags.tag_name NOT like '%gadget%' GROUP BY blogs.id,blogs.title,blogs.blog,blogs.cover_photo,blogs.user_username,blogs.created_at";
  const othersNews = await pool.execute(otherquery);

  res.status(200).json({
    message: "successful",
    total: othersNews[0].length,
    data: othersNews[0],
  });
});
