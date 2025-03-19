import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsTailwind from "grapesjs-tailwind";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateCategory, setTemplateCategory] = useState("Personal");

  const user = Cookies.get("user");
  const userdetails = JSON.parse(user);

  // Pages state
  const [pages, setPages] = useState([
    { id: "home", name: "Home", components: null, styles: null },
  ]);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    setIsEditMode(!!id);
  }, [id]);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`${AppRoutes.template}/${id}`);
        const data = res.data;
        setTemplateData(data);
        setTemplateName(data.name || "");
        setTemplateDescription(data.description || "");
        setTemplateCategory(data.category || "Personal");
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplate();
  }, [id]);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      plugins: [grapesjsTailwind],
      pluginsOpts: { [grapesjsTailwind]: {} },
      fromElement: true,
      storageManager: {
        type: "local",
        autosave: true,
        autoload: false, // Don’t automatically load local storage
        stepsBeforeSave: 1,
        options: { local: { key: "gjsProject" } },
      },
    });

    editorRef.current = editor;

    // Load components when switching page
    const loadPageContent = (pageId) => {
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        editor.DomComponents.clear();
        editor.Css.clear();
        if (page.components) {
          editor.setComponents(page.components);
          editor.setStyle(page.styles);
        }
      }
    };

    // Add custom panel to the right
    editor.Panels.addPanel({
      id: "pages-panel",
      el: ".pages-panel",
      buttons: [],
    });

    // Load current page components
    loadPageContent(currentPage);

    return () => editor.destroy();
  }, [templateData, pages, currentPage]);

  const handleAddPage = () => {
    const name = prompt("Enter page name (e.g., About, Contact)");
    if (name) {
      const id = name.toLowerCase().replace(/\s+/g, "-");
      if (pages.find((p) => p.id === id)) {
        toast.error("Page already exists!");
        return;
      }
      setPages([...pages, { id, name, components: null, styles: null }]);
      setCurrentPage(id);
    }
  };

  const handleSwitchPage = (pageId) => {
    const editor = editorRef.current;
    if (!editor) return;

    // Save current page content
    setPages((prev) =>
      prev.map((p) =>
        p.id === currentPage
          ? {
              ...p,
              components: editor.getComponents(),
              styles: editor.getCss(),
            }
          : p
      )
    );

    setCurrentPage(pageId);
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      editor.DomComponents.clear();
      editor.Css.clear();
      if (page.components) {
        editor.setComponents(page.components);
        editor.setStyle(page.styles);
      }
    }
  };

  const handleSaveTemplate = () => {
    editorRef.current?.runCommand("save-template");
    setShowSaveModal(true);
  };

  const handleSaveOrUpdateTemplate = async () => {
    if (!templateName) {
      toast.error("Please enter a template name");
      return;
    }

    const editor = editorRef.current;
    if (!editor) return;

    editor.store();

    const combinedPages = pages.map((p) => ({
      ...p,
      components: p.id === currentPage ? editor.getComponents() : p.components,
      styles: p.id === currentPage ? editor.getCss() : p.styles,
    }));

    const html = editor.getHtml();
    const css = editor.getCss();

    const completeHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${templateName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${css}</style>
  </head>
  <body>${html}</body>
</html>`;

    let thumbnail = "/placeholder.svg";
    try {
      const iframeEl = editor.Canvas.getFrameEl();
      const iframeDoc = iframeEl.contentDocument;
      const iframeBody = iframeDoc?.body;
      if (iframeBody) {
        const canvas = await html2canvas(iframeBody, { useCORS: true });
        thumbnail = canvas.toDataURL("image/jpeg");
      }
    } catch (err) {
      console.error("Screenshot capture failed:", err);
    }

    const payload = {
      userID: userdetails._id,
      name: templateName,
      description:
        templateDescription ||
        `A custom template created on ${new Date().toLocaleDateString()}`,
      category: templateCategory,
      html: completeHtml,
      image: thumbnail,
      pages: combinedPages,
    };

    try {
      if (isEditMode && id) {
        await axios.put(`${AppRoutes.template}/${id}`, payload);
        toast.success("Template updated successfully!");
      } else {
        await axios.post(AppRoutes.template, payload);
        toast.success("Template saved successfully!");
      }
      setShowSaveModal(false);
      setTemplateName("");
      setTemplateDescription("");
      navigate("/templates");
    } catch (error) {
      console.error("Error saving/updating template:", error);
      toast.error("Failed to save/update template.");
    }
  };

  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    <div className="flex">
      {/* GrapesJS Editor Container */}
      <div id="gjs" className="h-screen flex-1"></div>

      {/* Pages Sidebar */}
      <div className="pages-panel bg-white shadow-lg border-l w-64 p-4 space-y-4">
        <h3 className="text-lg font-bold">Pages</h3>
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page.id}>
              <button
                onClick={() => handleSwitchPage(page.id)}
                className={`block w-full text-left px-3 py-2 rounded ${
                  page.id === currentPage
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddPage}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          + Add Page
        </button>
        <button
          onClick={handleSaveTemplate}
          className="mt-2 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          {isEditMode ? "Update Template" : "Save Template"}
        </button>
      </div>

      {/* Save / Update Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {isEditMode ? "Update Template" : "Save as Template"}
              </h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name*
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={templateCategory}
                  onChange={(e) => setTemplateCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Content">Content</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOrUpdateTemplate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditMode ? "Update Template" : "Save Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
