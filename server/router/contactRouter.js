const express  = require('express');
const router = express.Router();
const contactForm  = require('../controllers/contactControllers');

router.route("/contact").post(contactForm);

module.exports = router;