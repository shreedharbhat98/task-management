const { prisma } = require("../models/index");

const taskController = {
  async getMetrics(req, res) {
    try {
      const userId = req.user.id;
      const openTasks = await prisma.task.count({
        where: {
          userId,
          status: "open",
        },
      });
      const inProgressTasks = await prisma.task.count({
        where: {
          userId,
          status: "inprogress",
        },
      });
      const completedTasks = await prisma.task.count({
        where: {
          userId,
          status: "completed",
        },
      });
      res.json({
        open_tasks: openTasks,
        inprogress_tasks: inProgressTasks,
        completed_tasks: completedTasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  async getTasks(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;
      const tasks = await prisma.task.findMany({
        where: { userId },
        take: limit,
        skip: (page - 1) * limit,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  async createTask(req, res) {
    try {
      const { title, status } = req.body;
      const userId = req.user.id;
      const newTask = await prisma.task.create({
        data: {
          title,
          userId,
          status,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await prisma.task.delete({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(deletedTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  async getTask(req, res) {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const updatedTask = await prisma.task.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          description,
          status,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = taskController;
