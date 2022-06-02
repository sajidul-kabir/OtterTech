const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.use(authMiddleware.protectRoute);

router.route("/").get(userController.getAllUsers);
router.route("/me").get(userController.getMe).patch(userController.updateMe);
router.route("/:username").get(userController.getAUser);

module.exports = router;
