import { useRef, useEffect, useState } from "react";
import { getSocket, sendCursorEvent } from "../utils/socket";
import CursorLayer from "./CursorLayer";
import UserList from "./UserList";
import useCanvasDraw from "../hooks/useCanvasDraw";
import "../styles/board.css";
import TextLayer from "./TextLayer";
import { sendTextEvent, sendClearEvent } from "../utils/socket";
import throttle from "../utils/throttle";
import useSocketEvents from "../hooks/useSocketEvents";

function Whiteboard() {
  const canvasRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [cursors, setCursors] = useState({});
  const [texts, setTexts] = useState([]);

  const {
    color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    clearCanvas
  } = useCanvasDraw(canvasRef);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
  }, [clearCanvas]);

  useEffect(() => {
    const throttledCursor = throttle((e) => {
      sendCursorEvent({
        x: e.clientX,
        y: e.clientY
      });

    }, 50);

    const handleMouseMove = (e) => {
      throttledCursor(e);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete") {
        setTexts((prev) =>
          prev.slice(0, -1)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useSocketEvents({
    onUserList: (users) => {
      setUsers(users);
    },

    onCursor: (message) => {

      setCursors((prev) => ({
        ...prev,
        [message.userId]: message.data
      }));

    },

    onText: (text) => {
      setTexts((prev) => [...prev, text]);
    },

    onClear: () => {
      clearCanvas();
      setTexts([]);
    }

  });

  const addText = () => {
    const newText = {
      id: Date.now(),
      text: "Edit me",
      x: 200,
      y: 200
    };

    setTexts((prev) => [...prev, newText]);

    sendTextEvent(newText);
  };

  const handleClearBoard = () => {
    clearCanvas();
    setTexts([]);

    sendClearEvent();

  };

  return (
    <div className="board-container">
      <UserList users={users} />
      <CursorLayer cursors={cursors} />

      <TextLayer texts={texts} setTexts={setTexts} />

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

        <button onClick={handleClearBoard}>
          Clear
        </button>

        <button onClick={addText}>
          Text
        </button>

      </div>

      <canvas ref={canvasRef} className="board-canvas"></canvas>

    </div>
  );
}

export default Whiteboard;