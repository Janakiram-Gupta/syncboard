import { useState } from "react";

function TextLayer({ texts, setTexts }) {

  const handleChange = (id, value) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: value } : t))
    );
  };

  const handleDrag = (e, id) => {

    const x = e.clientX;
    const y = e.clientY;

    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, x, y } : t))
    );
  };

  return (
    <>
      {texts.map((t) => (
        <textarea
          key={t.id}
          value={t.text}
          onChange={(e) => handleChange(t.id, e.target.value)}
          onMouseUp={(e) => handleDrag(e, t.id)}
          style={{
            position: "absolute",
            left: t.x,
            top: t.y,
            resize: "none",
            border: "1px solid #ccc",
            background: "white",
            padding: "4px"
          }}
        />
      ))}
    </>
  );
}

export default TextLayer;