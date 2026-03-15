import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

const rooms = {};

const users = {};

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
          users[currentRoom] = [];
        }

        const userId = Math.random().toString(36).substring(2, 9);

        socket.userId = userId;

        rooms[currentRoom].add(socket);
        users[currentRoom].push(userId);

        console.log(`User ${userId} joined room ${currentRoom}`);

        rooms[currentRoom].forEach((client) => {
          if (client.readyState === 1) {
            client.send(
              JSON.stringify({
                type: "user_list",
                users: users[currentRoom]
              })
            );
          }
        });

        break;

      case "broadcast":

        if (!currentRoom) return;

        rooms[currentRoom].forEach((client) => {

          if (client !== socket && client.readyState === 1) {
            client.send(
              JSON.stringify({
                ...message.payload,
                userId: socket.userId
              })
            );
          }

        });

        break;
    }

  });

  socket.on("close", () => {

    if (currentRoom && rooms[currentRoom]) {

      rooms[currentRoom].delete(socket);

      users[currentRoom] = users[currentRoom].filter(
        (id) => id !== socket.userId
      );

      rooms[currentRoom].forEach((client) => {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({
              type: "user_list",
              users: users[currentRoom]
            })
          );
        }
      });

      if (rooms[currentRoom].size === 0) {
        delete rooms[currentRoom];
        delete users[currentRoom];
      }
    }

    console.log("User disconnected");

  });

});