const validateSignal = (data) => {
  const {
    direction,
    entryPrice,
    stopLoss,
    targetPrice,
    entryTime,
    expiryTime,
  } = data;
  if (
    !direction ||
    !entryPrice ||
    !stopLoss ||
    !targetPrice ||
    !entryTime ||
    !expiryTime
  ) {
    return {
      valid: false,
      message: "All fields are required",
    };
  }
  if (direction === "BUY") {
    if (stopLoss >= entryPrice) {
      return {
        valid: false,
        message: "For BUY, stop loss must be below entry price",
      };
    }

    if (targetPrice <= entryPrice) {
      return {
        valid: false,
        message: "For BUY, target price must be above entry price",
      };
    }
  }

  if (direction === "SELL") {
    if (stopLoss <= entryPrice) {
      return {
        valid: false,
        message: "For SELL, stop loss must be above entry price",
      };
    }

    if (targetPrice >= entryPrice) {
      return {
        valid: false,
        message: "For SELL, target price must be below entry price",
      };
    }
  }

  if (new Date(expiryTime) <= new Date(entryTime)) {
    return {
      valid: false,
      message: "Expiry time must be after entry time",
    };
  }
  if (!["BUY", "SELL"].includes(direction)) {
    return {
      valid: false,
      message: "Direction must be BUY or SELL",
    };
  }

  return {
    valid: true,
  };
};

module.exports = validateSignal;
