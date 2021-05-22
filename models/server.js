const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {};

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log("server running in port", this.port);
    });
  }
}

module.exports = Server;
