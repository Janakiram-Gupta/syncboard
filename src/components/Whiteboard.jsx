import { useRef, useEffect, useState } from "react";
import useCanvasDraw from "../hooks/useCanvasDraw";
import "../styles/board.css";
import { getSocket } from "../utils/socket";
import UserList from "./UserList";

function Whiteboard() {
  const canvasRef = useRef(null);
  const [users, setUsers] = useState([]);

  const {
    color,
    setColor,
    strokeWidth,
    setStrokeWidth
  } = useCanvasDraw(canvasRef);

  useEffect(() => {

    const socket = getSocket();

    if (!socket) return;

    socket.onmessage = (event) => {

      const message = JSON.parse(event.data);

      if (message.type === "user_list") {
        setUsers(message.users);
      }

    };

  }, []);

  return (
    <div className="board-container">
      <UserList users={users} />
      <div className="toolbar">

        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label>Size</label>
        <input
          type="range"
          min="1"
          max="10"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(e.target.value)}
        />

        <button onClick={() => window.location.reload()}>
          Clear
        </button>

      </div>

      <canvas ref={canvasRef} className="board-canvas"></canvas>

    </div>
  );
}

export default Whiteboard;