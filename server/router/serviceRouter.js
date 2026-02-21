const express = require("express");
const router = express.Router();
const services = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");


router.route("/service").get(services);

module.exports = router;
