// Dependencies
const cors = require("cors");
const express = require("express");

// Configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
const songController = require("./controllers/songController");


app.use("/songs", songController);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Tuner");
  });

  // 404 Page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });
  
  
// Export
module.exports = app;

