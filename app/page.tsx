"use client";
import React from "react";
import { useEffect, useState } from "react";
import useSocket from "./hooks/useSocketHook";

interface MessageData {
  message: string;
}

const ServerHealthStatus = () => {
  const [serverStatus, setServerStatus] = useState("Connecting...");
  const socket = useSocket("https://bawbabsocket.netlify.app:8000", {
    connect: () => {
      console.log("Socket.IO connected!");
      setServerStatus("Socket is running and healthy");
    },
    message: (data: MessageData) => console.log("Received from server:", data),
    disconnect: () => {
      console.log("Socket.IO disconnected!");
      setServerStatus("Socket has stopped!");
    },
    error: (error: Error) => console.log("Socket.IO error:", error),
  });

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        textAlign: "center",
        alignItems: "center",
        color:
          serverStatus === "Server is healthy and running"
            ? "#4caf50"
            : "#f44336",
      }}
    >
      {serverStatus}
    </div>
  );
};

export default ServerHealthStatus;
