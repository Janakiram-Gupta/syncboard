import { useEffect, useRef, useState } from "react";

export default function useCanvasDraw(canvasRef) {
  const isDrawing = useRef(false);
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const startDrawing = (e) => {
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    const draw = (e) => {
      if (!isDrawing.current) return;

      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;

      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", stopDrawing);
    };
  }, [canvasRef, color, strokeWidth]);

  return {
    color,
    setColor,
    strokeWidth,
    setStrokeWidth
  };
}