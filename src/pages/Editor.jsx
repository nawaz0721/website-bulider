import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsTailwind from "grapesjs-tailwind";
import gjsCustomCode from "grapesjs-custom-code";
import gjsComponentCodeEditor from "grapesjs-component-code-editor";
import gjsParserPostcss from "grapesjs-parser-postcss";
import gjsTooltip from "grapesjs-tooltip";
import gjsTuiImageEditor from "grapesjs-tui-image-editor";


import { Plus, Trash2, Save, Eye, FileText } from "lucide-react";
import { AppRoutes } from "@/constant/constant";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const user = Cookies.get("user");
const userDetails = JSON.parse(user)

console.log(userDetails._id);


const Editor = () => {
  const { id } = useParams();
  const editorRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "auto",
      storageManager: { type: null },
      plugins: [
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsParserPostcss,
        gjsTooltip,
        gjsTuiImageEditor,
        gjsCustomCode,
        gjsComponentCodeEditor,
        grapesjsTailwind,
      ],
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        ],
      },
    });
  
    editorRef.current = editor;
    window.editor = editor;
  
    const loadTemplate = async () => {
      if (id) {
        try {
          const res = await axios.get(`${AppRoutes.template}/${id}`);
          const data = res.data;
          console.log("data 01", data.pages);
    
          const pm = editor.Pages;
    
          if (data?.pages && pm) {
            // Clear existing pages
            pm.getAll().forEach((p) => pm.remove(p.id));
    
            data.pages.forEach((page) => {
              const newPage = pm.add({
                id: page.id,
                name: page.name,
              });
              newPage.set("customHtml", page.html);
              newPage.set("customCss", page.css);
            });
    
            setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
    
            // Move this inside editor.on('load')
            // switchToPage(data.pages[0]?.id || "");
          }
    
          if (data?.settings) {
            setTemplateDetails({
              title: data.settings.title || "",
              description: data.settings.description || "",
              category: data.settings.category || "",
            });
          }
    
          toast.success("Template loaded successfully!");
        } catch (err) {
          console.log("Failed to load template", err);
        }
      } 
    };
    
  
    // ✅ Only inside load event:
    editor.on("load", () => {
      loadTemplate().then(() => {
        // Only after template load, set first page
        const firstPage = editor.Pages.getAll()[0];
        if (firstPage) {
          editor.Pages.select(firstPage.id);
          editor.setComponents(firstPage.get("customHtml") || "<div></div>");
          editor.setStyle(firstPage.get("customCss") || "");
        }
      });
    });
    
  
    return () => editor.destroy();
  }, [id]);


  const saveCurrentPageState = () => {
    const pm = editorRef.current.Pages;
    const currentPage = pm.getSelected();
    if (currentPage) {
      currentPage.set("customHtml", editorRef.current.getHtml());
      currentPage.set("customCss", editorRef.current.getCss());
    }
  };
  
  
  const switchToPage = (pageId) => {
    const pm = editorRef.current.Pages;
    const nextPage = pm.get(pageId);
    if (nextPage) {
      // Save current page before switching
      saveCurrentPageState();
  
      // Switch
      pm.select(pageId);
  
      // Load content of the next page
      editorRef.current.setComponents(nextPage.get("customHtml") || "");
      editorRef.current.setStyle(nextPage.get("customCss") || "");
      setCurrentPage(pageId);
    }
  };
  
  
  const handleAddPage = () => {
    const editor = editorRef.current;
    const pm = editor.Pages;
    const pageName = prompt("Enter new page name:");
    if (!pageName) return;
    const pageId = pageName.toLowerCase().replace(/\s+/g, "-");
    pm.add({
      id: pageId,
      name: pageName,
      component: `<div class='p-4'>${pageName} Page</div>`,
    });
    setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
    switchToPage(pageId);
  };

  const handleDeletePage = async (pageId) => {
    const editor = editorRef.current;
    const pm = editor.Pages;
    if (!pm) {
      toast.error("Page manager not available");
      return;
    }
  
    if (pm.getAll().length <= 1) {
      toast.error("Cannot delete the last page");
      return;
    }
  
    try {
      // Delete page from backend
      if (id) {
        // If editing existing template, delete from backend too
        await axios.delete(`${AppRoutes.template}/${id}/page/${pageId}`);
        console.log("Deleting page", { templateId: id, pageId });
        toast.success("Page deleted successfully!");
      } else {
        // No backend deletion required for new template (local only)
        toast.success("Page deleted locally!");
      }
  
      // Remove page locally from GrapesJS
      pm.remove(pageId);
      setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
  
      // Switch to another page if the deleted page was active
      if (currentPage === pageId) {
        const firstPage = pm.getAll()[0];
        if (firstPage) switchToPage(firstPage.id);
      }
    } catch (error) {
      console.error("Error deleting page:", error.response?.data || error.message);
      toast.error("Failed to delete page.");
    }
  };
  
  const handleSavePage = () => {
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    const pageData = {
      id: page.id,
      name: page.get("name"),
      html: editor.getHtml(),
      css: editor.getCss(),
    };
    localStorage.setItem(`page-${page.id}`, JSON.stringify(pageData));
    toast.success("Page saved successfully!");
  };

  const handlePreviewPage = () => {
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    const html = editor.getHtml();
    const css = editor.getCss();
    const pageName = page.get('name') || 'previewpage';
    localStorage.setItem(`preview-${pageName}`, JSON.stringify({ html, css }));
    window.open(`/previewpage/${pageName}`, '_blank');
  };

  const handleSaveTemplate = () => {
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const captureHomePageScreenshot = async () => {
    const editor = editorRef.current;
    const frame = editor.Canvas.getFrameEl();
    const canvasEl = frame?.contentWindow?.document?.body;

    if (!canvasEl) {
      toast.error("Could not capture canvas");
      return null;
    }

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(canvasEl);
    return canvas.toDataURL("image/png");
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const editor = editorRef.current;

    const image = await captureHomePageScreenshot();
    const pm = editor.Pages; // ✅ define pm here

    const projectPages = pm.getAll().map((page) => {
      pm.select(page.id); // Switch to each page before getting its html/css
      return {
        id: page.id,
        name: page.get("name"),
        html: editor.getHtml(),
        css: editor.getCss(),
      };
    });

    const projectData = {
      userID: userDetails._id,
      title: templateDetails.title,
      description: templateDetails.description,
      category: templateDetails.category,
      image, // captured base64 image
      pages: projectPages,
    };

    console.log("projectData",projectData);
    
    try {
      if (id) {
        await axios.put(`${AppRoutes.template}/${id}`, projectData);
        toast.success("Template updated successfully!");
      } else {
        await axios.post(AppRoutes.template, projectData);
        toast.success("Template saved successfully!");
      }
      setShowModal(false);
    } catch (error) {
      toast.error("Error saving template.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Pages</h2>
        <div className="flex-1 overflow-y-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex items-center justify-between p-2 mb-2 rounded cursor-pointer ${
                currentPage === page.id ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="flex-1" onClick={() => switchToPage(page.id)}>
                {page?.name || "Home"}
              </span>
              <button
                onClick={() => handleDeletePage(page.id)}
                className="p-1 hover:bg-red-500 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <button
            onClick={handleAddPage}
            className="w-full flex items-center justify-center gap-2 bg-green-600 p-2 rounded hover:bg-green-700"
          >
            <Plus size={20} />
            Add Page
          </button>
          <button
            onClick={handleSavePage}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 p-2 rounded hover:bg-blue-700"
          >
            <Save size={20} />
            Save Page
          </button>
          <button
            onClick={handlePreviewPage}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 p-2 rounded hover:bg-purple-700"
          >
            <Eye size={20} />
            Preview Page
          </button>
          <button
            onClick={handleSaveTemplate}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 p-2 rounded hover:bg-purple-700"
          >
            <FileText size={20} />
            {id ? "Update Template" : "Save Template"}
          </button>
        </div>
      </div>

      {/* GrapesJS editor */}
      <div id="gjs" className="flex-1" />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative z-[10000]">
            <h3 className="text-xl font-bold mb-4">
              {id ? "Update Template" : "Save Template"}
            </h3>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={templateDetails.title}
                onChange={handleModalChange}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={templateDetails.description}
                onChange={handleModalChange}
                className="w-full border p-2 rounded"
                rows="3"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={templateDetails.category}
                onChange={handleModalChange}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
