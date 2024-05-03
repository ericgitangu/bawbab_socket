import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();

app.use(express.static("public"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let statusElement = null;
  console.log("Socket.IO connection established");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("userJoined", "A new user has joined the room");
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("newMessage", data);
  });

  socket?.on("message", (data) => {
    console.log("Received message from client:", data);
    socket?.emit("message", "Heartbeat from the server!");
  });

  socket.on("disconnect", () => {
    console.log("Socket.IO connection disconnected");
  });

  socket.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });
});

io.on("error", (error) => {
  console.error("Global Socket.IO error:", error);
});

// Example: Basic API route
app.get("/api/healthcheck", (req, res) => {
  res.json({ status: "OK" });
});

// Serve the static site from the 'public' directory
app.get("/api/dashboard", (req, res) => {
  console.log(path.dirname.toString());
  res.sendFile("/Users/s0049767/Development/bawbab_socket/socket/index.html");
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`); // Adjust for deployment
});
