"use client";
import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import useSocket from "./hooks/useSocketHook";

interface MessageData {
  message: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useSocket("http://localhost:8000", {
    connect: () => {
      console.log("Socket.IO connected!");
      setIsConnected(true);
    },
    message: (data: MessageData) => console.log("Received from server:", data),
    disconnect: () => {
      console.log("Socket.IO disconnected!");
      setIsConnected(false);
    },
    error: (error: Error) => console.log("Socket.IO error:", error),
  });
  return (
    <html>
      <body>
        <Head>
          <title>Real-time -BawBab</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header>
          <div style={{ display: "flex", alignItems: "center" }}>
            Socket Status: {isConnected ? "Connected" : "Disconnected"}
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <small className="text-center">&copy; 2024 Bawbab Technologies</small>
        </footer>
      </body>
    </html>
  );
}
