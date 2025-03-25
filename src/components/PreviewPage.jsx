import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import Cookies from "js-cookie";

// ✅ Get user role from cookies (or Redux)
let userDetails = null;
try {
  const user = Cookies?.get("user");
  if (user) {
    userDetails = JSON.parse(user);
  }
} catch (err) {
  console.error("Failed to parse user cookie:", err);
}

const PreviewPage = () => {
  const { templateId, pageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState({ html: "", css: "" });
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        setLoading(true);

        const isUser = userDetails?.role === "user";
        let res;

        
        if (isUser) {
          try {
            // Try fetching from user templates first
            res = await axios.get(
              `${AppRoutes.userTemplatePreview}/${templateId}`
            );
            console.log("User template found:", res.data);
          } catch (error) {
            console.warn("User template not found, falling back to default.");
            // res = await axios.get(`${AppRoutes.template}/${templateId}`); // Fallback to admin template
          }
        } else {
          // Admin fetches from main templates collection
          res = await axios.get(`${AppRoutes.template}/${templateId}`);
          console.log("admin fetched");
          
        }


        const templateData = res.data;
        console.log("Template Data:", templateData);

        // Handle missing pageId (default to first page)
        if (!pageId) {
          const defaultPageId = templateData.pages[0]?.id || "home";
          navigate(`/previewpage/${templateId}/${defaultPageId}`);
          return;
        }

        // Find page in template
        const page = templateData.pages.find(
          (p) => p.id?.toLowerCase() === pageId.toLowerCase()
        );

        if (!page) {
          setNotFound(true);
          return;
        }

        // Fix links inside HTML content
        const fixedHtml = page.html.replace(/href="(.*?)"/g, (match, href) => {
          if (href.startsWith("http") || href.startsWith("#")) {
            return match;
          }
          return `href="/previewpage/${templateId}/${href}"`;
        });

        setContent({ html: fixedHtml, css: page.css });
        setNotFound(false);
      } catch (error) {
        console.error("Error fetching template data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [templateId, pageId, navigate]);

  // Handle link clicks inside preview
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

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

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
