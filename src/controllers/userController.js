const { prisma } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  async getUser(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      const payload = {
        user: {
          id: newUser.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.header("x-auth-token", `Bearer ${token}`).status(201).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.header("x-auth-token", `Bearer ${token}`).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = userController;
