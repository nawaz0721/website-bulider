import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PreviewPage = () => {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState({ html: "", css: "" });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const pageData = localStorage.getItem(`preview-${pageName}`);
    if (pageData) {
      const { html, css } = JSON.parse(pageData);
      setContent({ html, css });
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [pageName]);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.getAttribute("href")) {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          navigate(`/previewpage/${href}`);
        }
      }
    };

    document.body.addEventListener("click", handleLinkClick);
    return () => document.body.removeEventListener("click", handleLinkClick);
  }, [navigate]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-600">404</h1>
          <p className="text-xl mt-4">Page not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{content.css}</style>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  );
};

export default PreviewPage;
