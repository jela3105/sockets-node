const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.paths = {};

    this.middlewares();

    this.routes();

    this.socketsEvents();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  routes() {}

  socketsEvents() {
    this.io.on("connection", (socket) => {
      socket.on("send-message", (payload, callback) => {
        const id = 123456;
        callback(id);
        this.io.emit("send-message", payload);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("server running in port", this.port);
    });
  }
}

module.exports = Server;
