import { useRef } from "react";
import "../styles/board.css";

function Whiteboard() {
  const canvasRef = useRef(null);

  return (
    <div className="board-container">
      <div className="toolbar">
        <button>Draw</button>
        <button>Text</button>
        <button>Clear</button>
      </div>

      <canvas ref={canvasRef} className="board-canvas"></canvas>
    </div>
  );
}

export default Whiteboard;