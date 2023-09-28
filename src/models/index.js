const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const task = require("./task");
const user = require("./user");

const models = {
  User: user,
  Task: task,
};

module.exports = {
  prisma,
  models,
};
