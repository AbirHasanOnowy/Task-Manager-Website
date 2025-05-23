const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../controllers/reportController");

const router = express.Router();

roter.get("/export/tasks", protect, adminOnly, exportTasksReport);
router.get("/export/users", protect, adminOnly, exportUsersReport);

module.exports = router;
