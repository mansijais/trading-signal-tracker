const prisma = require("../prisma/client");
const validateSignal = require("../utils/validateSignal");

const { getLivePrice } = require("../services/binanceService");

const { calculateStatus, calculateROI } = require("../services/statusService");

const createSignal = async (req, res) => {
  try {
    const validation = validateSignal(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        error: validation.message,
      });
    }

    const {
      symbol,
      direction,
      entryPrice,
      stopLoss,
      targetPrice,
      entryTime,
      expiryTime,
    } = req.body;

    const signal = await prisma.signal.create({
      data: {
        symbol: symbol.toUpperCase(),
        direction,
        entryPrice: Number(entryPrice),
        stopLoss: Number(stopLoss),
        targetPrice: Number(targetPrice),
        entryTime: new Date(entryTime),
        expiryTime: new Date(expiryTime),
      },
    });

    res.status(201).json(signal);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create signal",
    });
  }
};

const getAllSignals = async (req, res) => {
  try {
    const signals = await prisma.signal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const updatedSignals = [];

    for (const signal of signals) {
      const currentPrice = await getLivePrice(signal.symbol);

      if (!currentPrice) {
        continue;
      }

      const status = calculateStatus(signal, currentPrice);

      const roi = calculateROI(signal, currentPrice);

      // persist final states
      if (
        status === "TARGET_HIT" ||
        status === "STOPLOSS_HIT" ||
        status === "EXPIRED"
      ) {
        await prisma.signal.update({
          where: {
            id: signal.id,
          },
          data: {
            status,
            realizedROI: roi,
          },
        });
      }

      updatedSignals.push({
        ...signal,
        currentPrice,
        status,
        roi,
      });
    }

    res.json(updatedSignals);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch signals",
    });
  }
};

const getSignalById = async (req, res) => {
  try {
    const signal = await prisma.signal.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!signal) {
      return res.status(404).json({
        error: "Signal not found",
      });
    }

    res.json(signal);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch signal",
    });
  }
};

const deleteSignal = async (req, res) => {
  try {
    const existingSignal = await prisma.signal.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!existingSignal) {
      return res.status(404).json({
        error: "Signal not found",
      });
    }
    await prisma.signal.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Signal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete signal",
    });
  }
};

module.exports = {
  createSignal,
  getAllSignals,
  getSignalById,
  deleteSignal,
};
