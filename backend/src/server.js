require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5001;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  });
