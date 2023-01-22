const express = require("express");
const morgan = require("morgan");

class Server {
  // General Path
  apiPaths = {
    client: "/api/clients",
    provider: "/api/providers",
  };
  constructor() {
    this.app = express();
    this.listen();
    this.applyMiddlewares();
    this.syncRoutes();
  }

  listen() {
    const port = process.env.PORT || 2000;
    this.app.listen(port, () => {
      console.log(`Server Runing on port : ${port}`);
    });
  }

  applyMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
  }

  syncRoutes() {
    this.app.use(this.apiPaths.client, require("../routes/client"));
    this.app.use(this.apiPaths.provider, require("../routes/provider"));
  }

  dbConection() {}
}

module.exports = Server;
