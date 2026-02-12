const express  = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const {signupSchema, loginSchema} = require('../validators/authValidator');
const validate = require('../middlewares/validateMiddleware');

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

module.exports = router;