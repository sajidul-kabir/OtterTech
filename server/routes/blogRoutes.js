const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");
const tagController = require("../controllers/tagController");

const router = express.Router();

router.use(authMiddleware.protectRoute);

// Blog CRUD
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.uploadCoverPhoto, blogController.createABlog);

router.route("/me").get(blogController.getMyBlogs);
router.route("/most-popular").get(blogController.mostPopular);

// Upvote/Downvote
router.route("/seeMyUpvote/:blogId").get(blogController.yourUpvote);
router.route("/upvotes/:blogId").delete(blogController.deleteUpvote);

// Tag Based Searching
router.route("/tags").post(tagController.tagCreate);
router.route("/tags/gaming").get(tagController.getGamingNews);

// Specific Blog-wise Functions
router
  .route("/:blogId")
  .get(blogController.getABlog)
  .post(blogController.upvoteABlog)
  .patch(blogController.updateABlog)
  .delete(blogController.deleteABlog);

router.route("/user/:username").get(blogController.getBlogsFromAUser);

module.exports = router;
