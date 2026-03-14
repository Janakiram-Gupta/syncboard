import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

const rooms = {};

console.log(`WebSocket server running on port ${PORT}`);

wss.on("connection", (socket) => {

  let currentRoom = null;

  socket.on("message", (data) => {

    const message = JSON.parse(data);

    switch (message.type) {

      case "join_room":

        currentRoom = message.roomId;

        if (!rooms[currentRoom]) {
          rooms[currentRoom] = new Set();
        }

        rooms[currentRoom].add(socket);

        console.log(`User joined room ${currentRoom}`);

        break;

      case "broadcast":

        if (!currentRoom) return;

        rooms[currentRoom].forEach((client) => {

          if (client !== socket && client.readyState === 1) {
            client.send(JSON.stringify(message.payload));
          }

        });

        break;
    }

  });

  socket.on("close", () => {

    if (currentRoom && rooms[currentRoom]) {

      rooms[currentRoom].delete(socket);

      if (rooms[currentRoom].size === 0) {
        delete rooms[currentRoom];
      }

    }

    console.log("User disconnected");

  });

});