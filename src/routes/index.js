const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const auth = require("../middleware/auth");

router.use("/users", userRoutes);
router.use("/tasks", auth, taskRoutes);

module.exports = router;
