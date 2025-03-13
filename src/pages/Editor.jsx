import React, { useState, useEffect } from "react";
import CanvasEditor from "../components/CanvasEditor";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";

const Editor = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("editorData");
    if (savedData) {
      setElements(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar setElements={setElements} />
      <CanvasEditor elements={elements} setElements={setElements} />
      <Toolbar elements={elements} />
    </div>
  );
};

export default Editor;
