import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"] 
  }
});

io.on('connection', (socket) => {
  console.log('Socket.IO connection established');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('userJoined', 'A new user has joined the room'); 
  });

  socket.on('sendMessage', (data) => {
    io.to(data.roomId).emit('newMessage', data);
  });

  socket?.on("message", (data) => {
    console.log("Received message from client:", data);
    socket?.emit("message", "Heartbeat from the server!");
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO connection disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
  });
});

io.on('error', (error) => {
  console.error('Global Socket.IO error:', error);
});

// Example: Basic API route
app.get('/api/healthcheck', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`); // Adjust for deployment
});
