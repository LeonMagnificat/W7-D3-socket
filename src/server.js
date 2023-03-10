import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http"; // CORE MODULE
import { newConnectionHandler } from "./socket/socket.js";

const expressServer = express();
const port = process.env.PORT || 3001;

const httpServer = createServer(expressServer);
const io = new Server(httpServer);

io.on("connection", newConnectionHandler);

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`Server is running on port ${port}`);
  });
});
