import { Server } from "socket.io";
import { joinRoom, leaveRoom } from "./rooms.js";

let io: any;

const socketServer = (server: any) => {
  io = new Server(server, {
    path: "/socket_server",
    cors: {
      origin: true,
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
    pingTimeout: 10000,
  });

  io.on("connection", (socket: any) => {
    // *** Connection ***
    console.log("User Connected :: Socket Created");

    socket.on("disconnect", async () => {
      console.log("User Disconnected", socket.id);
    });

    socket.on("set_user", async (userId: string) => {
      console.log(`Socket ID :: ${socket.id} -- User ID :: ${userId}`);
    });

    // *** Rooms ***
    socket.on("join_room", async (room_name: string) => {
      joinRoom(socket, room_name);
    });
    socket.on("leave_room", async (room_name: string) => {
      leaveRoom(socket, room_name);
    });
    socket.on("send_to", (item: any) => {
      const { room, route, data } = item;
      socket.to(room).emit(route, data);
    });

    // *** Test ***
    socket.on("chat_message", (msg: string) => {
      socket.broadcast.emit(msg);
    });
  });
};

const socketConnection = () => {
  return io;
};

export { socketServer, socketConnection };

// import { Elysia } from "elysia";

// const socket = new Elysia().ws("/socket_server", {
//   open(socket) {
//     console.log("User Connected", socket.id);
//   },
//   close(socket, code, message) {
//     console.log("User Disconnected", socket.id);
//   },
//   message(socket, message) {
//     socket.send(message);
//   },
// });

// export default socket;
