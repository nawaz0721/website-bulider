import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";

const PreviewPage = () => {
  const { templateId, pageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState({ html: "", css: "" });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const res = await axios.get(`${AppRoutes.template}/${templateId}`);
        const templateData = res.data;
        console.log("template ==> ", templateData);

        console.log("Current Page ID: ", pageId);
        console.log("Available Pages: ", templateData.pages.map(p => p.id));

        if (!pageId) {
          const defaultPageId = templateData.pages[0]?.id || "home";
          navigate(`/previewpage/${templateId}/${defaultPageId}`);
          return;
        }

        const page = templateData.pages.find(
          (p) => p.id?.toLowerCase() === pageId.toLowerCase()
        );

        if (!page) {
          setNotFound(true);
          return;
        }

        const fixedHtml = page.html.replace(/href="(.*?)"/g, (match, href) => {
          if (href.startsWith("http") || href.startsWith("#")) {
            return match; // keep external/anchor links unchanged
          }
          return `href="/previewpage/${templateId}/${href}"`; // rewrite internal links
        });

        setContent({ html: fixedHtml, css: page.css });
        setNotFound(false);
      } catch (error) {
        console.error("Error fetching template data:", error);
        setNotFound(true);
      }
    };

    fetchTemplateData();
  }, [templateId, pageId, navigate]);

  // Handle clicks on internal links inside injected HTML
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.getAttribute("href")) {
        const href = target.getAttribute("href");
        if (href.startsWith("/previewpage")) {
          e.preventDefault();
          navigate(href.replace(location.origin, ""));
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
