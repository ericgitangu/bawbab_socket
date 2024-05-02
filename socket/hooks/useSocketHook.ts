import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface SocketEventListeners {
  [key: string]: (...args: any[]) => void;
}

const useSocket = (url: string, eventListeners: SocketEventListeners = {}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);
    socketRef.current = newSocket;

    // Add event listeners
    Object.entries(eventListeners).forEach(([eventName, listener]) => {
      newSocket.on(eventName, listener);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return socket;
};

export default useSocket;
