const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { dbConection } = require("../database/db");

class Server {
  // General Path

  constructor() {
    this.app = express();
    this.applyMiddlewares();
    this.listen();
    this.dbConection = dbConection();
    this.syncRoutes();
  }

  listen() {
    const port = process.env.PORT_DEV || 2000;
    this.app.listen(port, () => {
      console.log(`Server Runing on port : ${port}`);
    });
  }

  applyMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  syncRoutes() {
    this.app.use(express.static("public"));
    this.app.use(process.env.AUTH_PATH, require("../routes/auth"));
    this.app.use(process.env.USER_PATH, require("../routes/event"));
  }
}

module.exports = Server;
