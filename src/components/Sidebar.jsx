import React from "react";

const Sidebar = ({ setElements }) => {
  const addText = () => {
    setElements((prev) => [
      ...prev,
      { id: Date.now(), type: "text", text: "New Text", fontSize: 24, fill: "#000", x: 100, y: 100 },
    ]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setElements((prev) => [
          ...prev,
          { id: Date.now(), type: "image", src: reader.result, x: 150, y: 150 },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-1/4 p-4 border">
      <button onClick={addText} className="mb-2 p-2 bg-blue-500 text-white rounded">
        Add Text
      </button>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default Sidebar;
