const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const {signupSchema} = require("../validators/authValidator");
const validate = require("../middlewares/validateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;