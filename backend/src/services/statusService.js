const calculateStatus = (signal, currentPrice) => {
  const now = new Date();

  if (signal.status !== "OPEN") {
    return signal.status;
  }

  if (now > new Date(signal.expiryTime)) {
    return "EXPIRED";
  }

  if (signal.direction === "BUY") {
    if (currentPrice >= signal.targetPrice) {
      return "TARGET_HIT";
    }

    if (currentPrice <= signal.stopLoss) {
      return "STOPLOSS_HIT";
    }
  }

  if (signal.direction === "SELL") {
    if (currentPrice <= signal.targetPrice) {
      return "TARGET_HIT";
    }

    if (currentPrice >= signal.stopLoss) {
      return "STOPLOSS_HIT";
    }
  }

  return "OPEN";
};
const calculateROI = (signal, currentPrice) => {
  let roi = 0;

  if (signal.direction === "BUY") {
    roi =
      ((currentPrice - signal.entryPrice) / signal.entryPrice) * 100;
  } else {
    roi =
      ((signal.entryPrice - currentPrice) / signal.entryPrice) * 100;
  }

  return Number(roi.toFixed(2));
};

module.exports = {
  calculateStatus,
  calculateROI
};