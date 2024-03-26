// Add SocketUser dps

const joinRoom = async (socket: any, room_name: any) => {
  socket.join(room_name);
  //   await SocketUser("base").updateOne({ socketId: socket.id }, { $push: { rooms: room_name } });
};

const leaveRoom = async (socket: any, room_name: any) => {
  socket.leave(room_name);
  //   await SocketUser("base").updateOne({ socketId: socket.id }, { $pull: { rooms: room_name } });
};

export { joinRoom, leaveRoom };
