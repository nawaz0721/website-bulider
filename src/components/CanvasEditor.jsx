import React from "react";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import { useImage } from "use-image";

const CanvasEditor = ({ elements, setElements }) => {
  const handleDragEnd = (id, x, y) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  return (
    <div className="w-3/4 h-full border">
      <Stage width={window.innerWidth * 0.75} height={window.innerHeight}>
        <Layer>
          {elements.map((el) => {
            if (el.type === "text") {
              return (
                <Text
                  key={el.id}
                  text={el.text}
                  fontSize={el.fontSize}
                  fill={el.fill}
                  x={el.x}
                  y={el.y}
                  draggable
                  onDragEnd={(e) => handleDragEnd(el.id, e.target.x(), e.target.y())}
                />
              );
            } else if (el.type === "rect") {
              return (
                <Rect
                  key={el.id}
                  width={el.width}
                  height={el.height}
                  fill={el.fill}
                  x={el.x}
                  y={el.y}
                  draggable
                  onDragEnd={(e) => handleDragEnd(el.id, e.target.x(), e.target.y())}
                />
              );
            } else if (el.type === "image") {
              const [img] = useImage(el.src);
              return (
                <Image
                  key={el.id}
                  image={img}
                  x={el.x}
                  y={el.y}
                  draggable
                  onDragEnd={(e) => handleDragEnd(el.id, e.target.x(), e.target.y())}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;
