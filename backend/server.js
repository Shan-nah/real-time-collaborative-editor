require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("document-edit", (data) => {
    console.log(`Received edit: ${data}`);
    socket.broadcast.emit("update-document", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Real-time Collaboration Backend is Running");
});

server.listen(5000, () => console.log("Backend Server running on port 5000"));
