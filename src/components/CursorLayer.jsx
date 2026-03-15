function CursorLayer({ cursors }) {

  return (
    <>
      {Object.entries(cursors).map(([id, cursor]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            fontSize: "18px"
          }}
        >
          🖱️
        </div>
      ))}
    </>
  );
}

export default CursorLayer;