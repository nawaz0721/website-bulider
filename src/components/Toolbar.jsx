import React from "react";

const Toolbar = ({ elements }) => {
  const saveLayout = () => {
    localStorage.setItem("editorData", JSON.stringify(elements));
    alert("Saved Successfully!");
  };

  const exportToHTML = () => {
    let html = elements.map((el) => {
      if (el.type === "text") {
        return `<p style="position:absolute; left:${el.x}px; top:${el.y}px; font-size:${el.fontSize}px; color:${el.fill};">${el.text}</p>`;
      } else if (el.type === "rect") {
        return `<div style="position:absolute; left:${el.x}px; top:${el.y}px; width:${el.width}px; height:${el.height}px; background:${el.fill};"></div>`;
      }
      return "";
    }).join("\n");

    const htmlFile = `
      <html>
      <head><style>body { position:relative; }</style></head>
      <body>${html}</body>
      </html>
    `;

    const blob = new Blob([htmlFile], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_page.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="absolute top-2 right-2 flex gap-2">
      <button onClick={saveLayout} className="p-2 bg-green-500 text-white rounded">Save</button>
      <button onClick={exportToHTML} className="p-2 bg-red-500 text-white rounded">Export</button>
    </div>
  );
};

export default Toolbar;
