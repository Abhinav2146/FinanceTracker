const express = require("express");
const {
  addIncome,
  getIncome,
  deleteIncome,
  downloadIncome,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download", protect, downloadIncome);

module.exports = router;
