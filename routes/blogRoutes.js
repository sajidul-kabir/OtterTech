const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.use(authMiddleware.protectRoute);

router.route("/").get(blogController.getAllBlogs);
router.route("/:blogId").get(blogController.getABlog);
router.route("/user/:username").get(blogController.getBlogsFromAUser);

module.exports = router;
