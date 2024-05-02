import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createProxyMiddleware } from "http-proxy-middleware";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Create an HTTP server instance
    const httpServer = createServer(server);

    const io = new Server(httpServer, {
      cors: {
        origin: "*", // Allow requests from any origin
        methods: ["GET", "POST"], // Allow GET and POST HTTP methods
      },
    });

    io.on("connection", (socket) => {
      console.log("Socket.IO connection established");

      socket?.on("disconnect", () => {
        console.log("Socket.IO connection disconnected");
      });

      socket?.on("message", (data) => {
        console.log("Received message from client:", data);
        socket?.emit("message", "Heartbeat from the server!");
      });

      socket?.on("sendMessage", (data) => {
        console.log("Received message:", data);
        socket?.emit("broadcastMessage", data);
      });
    });

    server.use(
      "/api",
      createProxyMiddleware({
        target: "https://bawbabsocket.netlify.app", // original url
        changeOrigin: true,
      }),
    );

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 8000;
    httpServer.listen(PORT, () => {
      console.log(
        `\r\n⚡️[server]: Server is running at http://localhost:${PORT}`,
      );
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
