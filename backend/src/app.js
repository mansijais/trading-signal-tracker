const express = require("express");
const cors = require("cors");

const signalRoutes = require("./routes/signalRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/signals", signalRoutes);

module.exports = app;