const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.use(authMiddleware.protectRoute);

router.route("/").get(blogController.getAllBlogs);

module.exports = router;
