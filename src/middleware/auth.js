const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token")?.split("Bearer ")?.[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided, permission denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
