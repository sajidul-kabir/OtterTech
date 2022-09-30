const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.use(authMiddleware.protectRoute);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.uploadCoverPhoto, blogController.createABlog);

router.route("/gaming").get(blogController.getGamingNews);

router.route("/me").get(blogController.getMyBlogs);
router.route("/most-popular").get(blogController.mostPopular);
router.route("/seeMyUpvote/:blogId").get(blogController.yourUpvote);
router.route("/upvotes/:blogId").delete(blogController.deleteUpvote);

router
  .route("/:blogId")
  .get(blogController.getABlog)
  .post(blogController.upvoteABlog)
  .patch(blogController.updateABlog)
  .delete(blogController.deleteABlog);

router.route("/user/:username").get(blogController.getBlogsFromAUser);

module.exports = router;
