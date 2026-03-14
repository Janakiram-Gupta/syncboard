import { useRef } from "react";
import useCanvasDraw from "../hooks/useCanvasDraw";
import "../styles/board.css";

function Whiteboard() {
  const canvasRef = useRef(null);

  const {
    color,
    setColor,
    strokeWidth,
    setStrokeWidth
  } = useCanvasDraw(canvasRef);

  return (
    <div className="board-container">

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