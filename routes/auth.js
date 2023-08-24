const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");

const authenticationMiddleware = require("../middleware/authentication");
const testUser = require("../middleware/testUser");

const rateLimiter = require("express-rate-limit");
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Tpp many request from this IP. Please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticationMiddleware, testUser, updateUser);

module.exports = router;
