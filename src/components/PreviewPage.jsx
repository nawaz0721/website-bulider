import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import toast from "react-hot-toast";

export default function PreviewPage() {
  const { pageName } = useParams();
  const [templateData, setTemplateData] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const parts = pageName.split("-");
    const slug = parts.slice(0, parts.length - 1).join("-");
    const templateId = parts[parts.length - 1];

    if (templateId) {
      axios
        .get(`${AppRoutes.template}/${templateId}`)
        .then((res) => {
          const template = res.data;
          setTemplateData(template);

          const page = template.pages.find((p) => p.id === slug);
          if (page) {
            setCurrentPage(page);
          } else {
            setCurrentPage("404");
          }
        })
        .catch((err) => {
          toast.error("Error fetching template from backend");
          console.error(err);
        });
    } else {
      toast.error("Preview URL invalid");
    }
  }, [pageName]);

  if (!templateData) return <div>Loading preview...</div>;

  if (currentPage === "404") {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">404 Page Not Found</h1>
        <p className="mt-4">The page you're looking for does not exist in this template.</p>
      </div>
    );
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: currentPage.html }}></div>
      <style>{currentPage.css}</style>
    </div>
  );
}
