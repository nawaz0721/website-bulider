import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const userDetails = JSON.parse(user);

const Editor = () => {
  const { id } = useParams();
  const editorRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    description: "",
    category: "",
  });
const navigate = useNavigate()


  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "auto",
      storageManager: { type: null },
      plugins: [
        grapesjsTailwind,
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsParserPostcss,
        gjsTooltip,
        gjsTuiImageEditor,
        gjsCustomCode,
        gjsComponentCodeEditor,
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

          const pm = editor.Pages;
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
      } else {
        // Create a default "Home" page if creating a new template
        const pm = editor.Pages;
        const homePage = pm.add({
          id: "home",
          name: "Home",
          component: `<div class='p-4'></div>`,
        });
        pm.select("home");
        setPages([{ id: "home", name: "Home" }]);
        setCurrentPage("home");
      }
    };

    editor.on("load", loadTemplate);
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
      saveCurrentPageState();
      pm.select(pageId);
      editorRef.current.setComponents(nextPage.get("customHtml") || "");
      editorRef.current.setStyle(nextPage.get("customCss") || "");
      setCurrentPage(pageId);
    }
  };

  const handleAddPage = () => {
    setNewPageName("");
    setShowAddPageModal(true);
  };

  const handleAddPageSubmit = () => {
    const editor = editorRef.current;
    const pm = editor.Pages;
    const pageName = newPageName.trim();
    if (!pageName) {
      toast.error("Page name cannot be empty");
      return;
    }
    const pageId = pageName.toLowerCase().replace(/\s+/g, "-");
    pm.add({
      id: pageId,
      name: pageName,
      component: `<div class='p-4'>${pageName} Page</div>`,
    });
    setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
    switchToPage(pageId);
    setShowAddPageModal(false);
  };

  const handleDeletePage = async (pageId) => {
    const editor = editorRef.current;
    const pm = editor.Pages;
    if (pm.getAll().length <= 1) {
      toast.error("Cannot delete the last page");
      return;
    }
    try {
      if (id) {
        await axios.delete(`${AppRoutes.template}/${id}/page/${pageId}`);
        toast.success("Page deleted successfully!");
      } else {
        toast.success("Page deleted locally!");
      }
      pm.remove(pageId);
      setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
      if (currentPage === pageId) {
        const firstPage = pm.getAll()[0];
        if (firstPage) switchToPage(firstPage.id);
      }
    } catch (error) {
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
    const pageName = page.get("name") || "previewpage";
    localStorage.setItem(`preview-${pageName}`, JSON.stringify({ html, css }));
    window.open(`/previewpage/${pageName}`, "_blank");
  };

  const handleSaveTemplate = () => {
    localStorage.clear();
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
    const pm = editor.Pages;

    const projectPages = pm.getAll().map((page) => {
      pm.select(page.id);
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
      image,
      pages: projectPages,
    };

    try {
      if (id) {
        await axios.put(`${AppRoutes.template}/${id}`, projectData);
        toast.success("Template updated successfully!");
        navigate('/templates');
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
        <div className="flex-1 space-y-2 overflow-y-auto">
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
              {page.id !== "home" && (
                <button
                  onClick={() => handleDeletePage(page.id)}
                  className="p-1 hover:bg-red-500 rounded"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddPage}
          className="flex items-center justify-center mt-4 p-2 bg-green-600 hover:bg-green-700 rounded"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Page
        </button>

        <button
          onClick={handleSavePage}
          className="flex items-center justify-center mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          <Save className="w-4 h-4 mr-2" /> Save Page
        </button>

        <button
          onClick={handlePreviewPage}
          className="flex items-center justify-center mt-4 p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
        >
          <Eye className="w-4 h-4 mr-2" /> Preview
        </button>

        <button
          onClick={handleSaveTemplate}
          className="flex items-center justify-center mt-4 p-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          <FileText className="w-4 h-4 mr-2" /> Save Template
        </button>
      </div>

      {/* GrapesJS Editor */}
      <div id="gjs" className="flex-1"></div>

      {/* Save Template Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleModalSubmit}
            className="bg-white p-8 rounded shadow-lg space-y-4 w-96"
          >
            <h2 className="text-xl font-bold">Template Details</h2>
            <input
              name="title"
              value={templateDetails.title}
              onChange={handleModalChange}
              className="w-full p-2 border rounded"
              placeholder="Title"
              required
            />
            <input
              name="description"
              value={templateDetails.description}
              onChange={handleModalChange}
              className="w-full p-2 border rounded"
              placeholder="Description"
              required
            />
            <input
              name="category"
              value={templateDetails.category}
              onChange={handleModalChange}
              className="w-full p-2 border rounded"
              placeholder="Category"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              Save Template
            </button>
          </form>
        </div>
      )}

      {/* Add Page Modal */}
      {showAddPageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">New Page</h2>
            <input
              type="text"
              placeholder="Enter page name"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleAddPageSubmit}
              className="w-full p-2 bg-green-600 text-white rounded"
            >
              Add Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
