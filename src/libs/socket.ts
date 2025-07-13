import { io } from "socket.io-client";

const socket = io("http://192.168.1.9:4000", {
  transports: ["websocket"],
});

export { socket };
