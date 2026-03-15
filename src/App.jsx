import { useState } from "react";
import Whiteboard from "./components/Whiteboard";
import { connectSocket } from "./utils/socket";

function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (!roomId.trim()) return;
    connectSocket(roomId);
    setJoined(true);
  };

  if (joined) {
    return <Whiteboard roomId={roomId} />;
  }

  return (
    <div style={container}>
      <h1>SyncBoard</h1>
      <p>Real-time collaborative whiteboard</p>

      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={input}
      />

      <button style={button} onClick={handleJoin}>
        Join Board
      </button>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "sans-serif",
};

const input = {
  padding: "10px",
  marginTop: "10px",
  width: "220px",
};

const button = {
  padding: "10px 20px",
  marginTop: "10px",
  cursor: "pointer",
};

export default App;