const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.use(authMiddleware.protectRoute);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.uploadCoverPhoto, blogController.createABlog);

router.route("/me").get(blogController.getMyBlogs);
router.route("/most-popular").get(blogController.mostPopular);

router
  .route("/:blogId")
  .get(blogController.getABlog)
  .post(blogController.upvoteABlog)
  .patch(blogController.updateABlog)
  .delete(blogController.deleteABlog);

router.route("/user/:username").get(blogController.getBlogsFromAUser);

module.exports = router;
