const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
  })
);

app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
