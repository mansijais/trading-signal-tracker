const express = require("express");

const router = express.Router();

const {
  createSignal,
  getAllSignals,
  getSignalById,
  deleteSignal,
} = require("../controllers/signalController");

router.post("/", createSignal);

router.get("/", getAllSignals);

router.get("/:id", getSignalById);

router.delete("/:id", deleteSignal);

module.exports = router;