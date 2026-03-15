# SyncBoard — Real-Time Collaborative Whiteboard

SyncBoard is a real-time collaborative whiteboard where multiple users can draw, add text, and interact on the same board simultaneously.

The system uses **React + Canvas API for rendering** and **WebSockets for real-time synchronization**.

---

# Features

- Real-time collaborative drawing
- Room-based sessions
- Live cursor presence
- Editable and movable text blocks
- Active user list
- Clear board functionality
- Optimized event broadcasting

---

# System Architecture

The system is composed of two main parts:

### Client (React)

- Responsible for rendering the whiteboard UI
- Handles user interactions such as drawing, cursor movement, and text editing
- Sends interaction events through WebSocket

### Server (Node.js WebSocket Server)

- Maintains active rooms
- Broadcasts events between connected clients
- Tracks active users per room

### Architecture Flow

User Action → Client Event → WebSocket Message → Server Broadcast → Other Clients Update UI

---

# Frontend Structure

```
src/

components/
  Whiteboard.jsx       → main board container
  CursorLayer.jsx      → renders remote cursors
  UserList.jsx         → active user display
  TextLayer.jsx        → editable text elements

hooks/
  useCanvasDraw.js     → canvas drawing logic
  useSocketEvents.js   → centralized websocket event handling

utils/
  socket.js            → websocket connection utilities
  throttle.js          → performance optimization

styles/
  board.css            → whiteboard styling
```

---

# State Management

The whiteboard state is managed locally using **React state hooks**.

Key states include:

- `texts` → list of text blocks on the board
- `cursors` → positions of connected users' cursors
- `users` → active users in the room

Canvas drawing is handled directly through the **Canvas API instead of React state** to avoid unnecessary re-renders and maintain high performance.

---

# Real-Time Synchronization Approach

WebSocket events are used to synchronize user actions across clients.

Supported event types:

### draw

Broadcasts drawing coordinates to other users.

### cursor

Broadcasts cursor position updates for live cursor presence.

### text

Broadcasts creation of new text blocks.

### user_list

Broadcasts the updated list of active users.

### clear

Broadcasts board reset events to all clients.

The server forwards events to **all users in the same room**.

---

# Performance Considerations

High-frequency events such as drawing and cursor movement can generate large volumes of messages.

To reduce network load:

- Cursor updates are **throttled**
- Drawing events are **rate-limited**
- Canvas rendering is handled directly without triggering React re-renders

These optimizations allow smooth performance even with multiple concurrent users.

---

# Edge Cases Considered

- Multiple users drawing simultaneously
- User disconnecting mid-session
- High-frequency cursor movement
- Multiple clients joining the same room

The server removes users from rooms when sockets close to maintain accurate session state.

---

# Trade-offs and Assumptions

In-memory server state was chosen for simplicity.

For production environments, a distributed store such as **Redis** would be required for scaling across multiple server instances.

Canvas rendering was chosen instead of DOM rendering because it provides better performance for drawing operations.

Conflict resolution follows a **last-write-wins model**, where the latest broadcasted event determines the visible state.

---

# Running the Project

## Start Backend

```
cd server
node server.js
```

## Start Frontend

```
npm install
npm run dev
```

Open multiple browser tabs and join the same room ID to test collaboration.

---

# Future Improvements

- Persistent board state
- Undo / redo support
- Shape drawing tools (rectangle, circle, arrow)
- Improved cursor visualization
- User authentication and identity display
