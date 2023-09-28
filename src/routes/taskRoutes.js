const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const {
  taskCreationValidation,
  taskUpdationValidation,
  taskIdValidation,
  validate,
} = require("../middleware/taskValidation");

router.get("/", taskController.getTasks);
router.get("/:id", taskIdValidation, validate, taskController.getTask);
router.post("/", taskCreationValidation, validate, taskController.createTask);
router.put("/:id", taskUpdationValidation, validate, taskController.updateTask);
router.delete("/:id", taskIdValidation, validate, taskController.deleteTask);

router.get("/metrics", taskController.getMetrics);
module.exports = router;
