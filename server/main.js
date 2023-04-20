const express = require("express");
const routes = require("./routes/database.routes.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
const port = 5555;

server.use(bodyParser.json());
server.use(cors());
server.use("/api", routes);
server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
