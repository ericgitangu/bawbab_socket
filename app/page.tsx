"use client";
import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ServerHealthStatus = () => {
  const [serverStatus, setServerStatus] = useState("Connecting...");

  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      setServerStatus("Server is healthy and running");
    });

    socket.on("disconnect", () => {
      setServerStatus("Server disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    };
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        textAlign: "center",
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
