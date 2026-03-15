import { useState } from "react";

function TextLayer({ texts, setTexts }) {

  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (id, value) => {

    setTexts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: value } : t
      )
    );

  };

  const handleMouseDown = (e, id) => {

    setSelectedId(id);

    const startX = e.clientX;
    const startY = e.clientY;

    const text = texts.find((t) => t.id === id);

    const offsetX = startX - text.x;
    const offsetY = startY - text.y;

    const handleMouseMove = (event) => {

      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;

      setTexts((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, x: newX, y: newY } : t
        )
      );

    };

    const handleMouseUp = () => {

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

  };

  const deleteSelected = () => {

    if (!selectedId) return;

    setTexts((prev) =>
      prev.filter((t) => t.id !== selectedId)
    );

    setSelectedId(null);

  };

  return (
    <>
      {texts.map((t) => (

        <textarea
          key={t.id}
          value={t.text}
          onChange={(e) => handleChange(t.id, e.target.value)}
          onMouseDown={(e) => handleMouseDown(e, t.id)}
          onClick={() => setSelectedId(t.id)}
          style={{
            position: "absolute",
            left: t.x,
            top: t.y,
            resize: "none",
            border: selectedId === t.id ? "2px solid blue" : "1px solid #ccc",
            background: "white",
            padding: "4px"
          }}
        />

      ))}

      <button
        onClick={deleteSelected}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "8px 14px",
          cursor: "pointer"
        }}
      >
        Delete Selected
      </button>

    </>
  );
}

export default TextLayer;