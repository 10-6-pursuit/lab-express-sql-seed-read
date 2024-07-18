const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("<h1>Songs Server</h1>");
});

app.get("*", (req, res) => {
    res.status(404).send("<h1>404 Page Not Found</h1>");
});

module.exports = app;