const server = require("./app");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`Server running on https://localhost:${PORT}`)
);
