import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PreviewPage = () => {
  const { templateId, pageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState({ html: "", css: "" });
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cameFromMainDashboard, setCameFromMainDashboard] = useState(false);

  const user = Cookies?.get("user");
  const userDetails = user ? JSON.parse(user) : null;

  // ✅ Detect where the user came from (Only Once)
  useEffect(() => {
    const previousRoute = location.state?.from || document.referrer || "/";
    setCameFromMainDashboard(previousRoute.includes("/main-dashboard"));
  }, []);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        setLoading(true);

        let apiURL = cameFromMainDashboard
          ? `${AppRoutes.userTemplatePreview}/${templateId}`
          : `${AppRoutes.template}/${templateId}`;

        console.log("Fetching from:", apiURL);
        const res = await axios.get(apiURL);
        const templateData = res.data;

        if (!templateData?.pages || templateData?.pages.length === 0) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        if (!pageId) {
          const defaultPageId = templateData.pages[0]?.id || "home";
          navigate(`/previewpage/${templateId}/${defaultPageId}`, { state: { from: location.pathname } });
          return;
        }

        const page = templateData.pages.find(p => p.id?.toLowerCase() === pageId.toLowerCase());

        if (!page) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setContent({ html: page.html, css: page.css });
        setNotFound(false);
      } catch (error) {
        console.error("Error fetching template data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [templateId, pageId, cameFromMainDashboard]);

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
