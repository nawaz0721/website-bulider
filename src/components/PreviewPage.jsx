// PreviewPage.jsx
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PreviewPage = () => {
  const { pageName } = useParams();

  useEffect(() => {
    const data = localStorage.getItem(`preview-${pageName}`);
    if (data) {
      const { html, css } = JSON.parse(data);
      document.head.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>${css}</style>
      `;
      document.body.innerHTML = html;
    }
  }, [pageName]);

  return null; // We manually inject into DOM
};

export default PreviewPage;
