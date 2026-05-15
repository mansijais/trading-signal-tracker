require("dotenv").config();

const app = require("./app");
// const { getLivePrice } = require("./services/binanceService");

// getLivePrice("BTCUSDT").then((price) => {
//   console.log(price);
// });
const PORT = process.env.PORT || 5001;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  });
