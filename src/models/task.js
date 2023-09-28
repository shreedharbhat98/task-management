const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Task = prisma.task;

module.exports = Task;
