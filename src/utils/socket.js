let socket = null;

export function connectSocket(roomId) {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId
      })
    );
  };

  return socket;
}

export function sendDrawEvent(data) {
  if (!socket) return;

  socket.send(
    JSON.stringify({
      type: "broadcast",
      payload: {
        type: "draw",
        data
      }
    })
  );
}

export function sendCursorEvent(data) {
  if (!socket) return;

  socket.send(
    JSON.stringify({
      type: "broadcast",
      payload: {
        type: "cursor",
        data
      }
    })
  );
}

export function getSocket() {
  return socket;
}

export function sendTextEvent(data) {
  if (!socket) return;
  socket.send(
    JSON.stringify({
      type: "broadcast",
      payload: {
        type: "text",
        data
      }
    })
  );
}