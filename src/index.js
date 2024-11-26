import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { createUsersTable, insertUser, getAllUsers } from "./database/db.js";
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("a user connected");
});

app.get("/", async (req, res) => {
  console.log("a user connected");
  createUsersTable();
  insertUser("louis", 18);
  res.send("hello");
});

app.get("/users", async (req, res) => {
  console.log("getting users");
  const users = await getAllUsers();
  console.log(users);
  res.send(users);
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
