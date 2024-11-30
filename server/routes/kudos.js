const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createKudo,
  getAllKudos,
  getUserKudos,
} = require("../controllers/kudoController");

router.post("/", protect, createKudo);
router.get("/", protect, getAllKudos);
router.get("/user", protect, getUserKudos);

module.exports = router;
