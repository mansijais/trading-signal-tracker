const axios = require("axios");

const getLivePrice = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    return Number(response.data.price);
  } catch (error) {
    return null;
  }
};

module.exports = {
  getLivePrice,
};