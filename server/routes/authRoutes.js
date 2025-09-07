const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserData);

module.exports = router;
