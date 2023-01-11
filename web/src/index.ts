import express from "express";
import { App } from "./app.js";

// start server
(function main() {
  const app = new App();
  const server = express();
  app.start(server);
})();
