const express = require("express");
const app = express();
const songRoutes = require("./routes/songRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

app.use("/songs", songRoutes);

module.exports = app;
