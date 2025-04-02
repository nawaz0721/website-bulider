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
import { RxCross2 } from "react-icons/rx";

let userDetails = null;
try {
  const user = Cookies?.get("user");
  if (user) {
    userDetails = JSON.parse(user);
  }
} catch (err) {
  console.error("Failed to parse user cookie:", err);
}

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
  const navigate = useNavigate();

  // Initialize default pages
  const initializeDefaultPages = (editor) => {
    const pm = editor.Pages;
    
    // Clear existing pages
    pm.getAll().forEach(page => pm.remove(page.id));
    
    // Add default pages
    const homePage = pm.add({
      id: "home",
      name: "Home",
      component: `<div class='p-4'>Home Page Content</div>`,
    });
    
    const headerPage = pm.add({
      id: "header",
      name: "Header",
      component: `<header class='p-4 bg-gray-100'>Header Content</header>`,
    });
    
    const footerPage = pm.add({
      id: "footer",
      name: "Footer",
      component: `<footer class='p-4 bg-gray-100'>Footer Content</footer>`,
    });
    
    // Select home page by default
    pm.select("home");
    setCurrentPage("home");
    setPages([
      { id: "home", name: "Home" },
      { id: "header", name: "Header" },
      { id: "footer", name: "Footer" }
    ]);
  };

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

    // Internal Link Command for <a> tag
    editor.Commands.add("set-internal-link", {
      run(editor) {
        const slug = prompt("Enter page slug (e.g. home, about, contact)");
        if (slug) {
          const link = `/previewpage/${slug}-${id}`;
          const selected = editor.getSelected();
          if (selected && selected.is("a")) {
            selected.addAttributes({ href: link });
            toast.success(`Internal link set to: ${link}`);
          } else {
            toast.error("Please select an <a> element first!");
          }
        }
      },
    });

    // Trait for <a> tag components only
    editor.on("component:selected", (model) => {
      if (model.get("tagName") === "a") {
        model.addTrait({
          type: "button",
          label: "Set Internal Link",
          text: "Add Link",
          command: "set-internal-link",
        });
      }
    });

    const loadTemplate = async () => {
      if (!id) {
        // No ID → Initialize default pages
        initializeDefaultPages(editor);
        return;
      }

      try {
        let data = null; // Store fetched data

        if (userDetails?.role === "admin") {
          const res = await axios.get(`${AppRoutes.template}/${id}`);
          data = res.data;
        } else {
          const res = await axios.get(`${AppRoutes.userTemplate}/${id}`);
          data = res.data;
        }

        if (!data) {
          toast.error("Failed to load template data.");
          initializeDefaultPages(editor);
          return;
        }

        const pm = editor.Pages;

        // Remove existing pages
        pm.getAll().forEach((p) => pm.remove(p.id));

        // Add pages from database
        if (Array.isArray(data.pages) && data.pages.length > 0) {
          data.pages.forEach((page) => {
            const newPage = pm.add({
              id: page.id,
              name: page.name,
            });
            newPage.set("customHtml", page.html || "");
            newPage.set("customCss", page.css || "");
          });

          // Add header and footer if they exist in the template
          if (data.header) {
            const headerPage = pm.add({
              id: "header",
              name: "Header",
            });
            headerPage.set("customHtml", data.header.html || "");
            headerPage.set("customCss", data.header.css || "");
          }

          if (data.footer) {
            const footerPage = pm.add({
              id: "footer",
              name: "Footer",
            });
            footerPage.set("customHtml", data.footer.html || "");
            footerPage.set("customCss", data.footer.css || "");
          }

          // Select first page by default
          pm.select(data.pages[0].id);
          setCurrentPage(data.pages[0].id);

          // Set canvas content for first page
          editor.setComponents(data.pages[0].html || "");
          editor.setStyle(data.pages[0].css || "");

          // Update pages state
          setPages([
            ...pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })),
          ]);
        } else {
          // If no pages in template, initialize defaults
          initializeDefaultPages(editor);
        }

        // Set template details
        setTemplateDetails({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
        });

        toast.success("Template loaded successfully!");
      } catch (err) {
        console.error("Failed to load template:", err);
        toast.error("Error loading template.");
        initializeDefaultPages(editor);
      }
    };

    editor.on("load", loadTemplate);

    return () => editor.destroy();
  }, [id]);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;

    // Listen for all clicks inside the canvas
    editor.on("canvas:click", (event) => {
      const el = event.target;
      if (el.tagName === "A" && el.getAttribute("href")) {
        event.preventDefault();

        const href = el.getAttribute("href");
        const pm = editor.Pages;

        // Check if href matches one of your page ids
        const page = pm.getAll().find((p) => p.id === href);
        if (page) {
          switchToPage(href);
        } else {
          toast.error("Page not found!");
        }
      }
    });

    return () => {
      editor.off("canvas:click");
    };
  }, [pages, currentPage]);

  const saveCurrentPageState = () => {
    const pm = editorRef.current.Pages;
    const currentPageObj = pm.get(currentPage);
    
    if (currentPageObj) {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      
      currentPageObj.set("customHtml", html);
      currentPageObj.set("customCss", css);
    }
  };

  const switchToPage = (pageId) => {
    const pm = editorRef.current.Pages;
    const nextPage = pm.get(pageId);
    
    if (nextPage) {
      // Save current page state before switching
      saveCurrentPageState();
      
      // Switch to the new page
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
    
    // Check if page already exists
    if (pm.get(pageId)) {
      toast.error("Page with this name already exists");
      return;
    }
    
    pm.add({
      id: pageId,
      name: pageName,
      component: `<div class='p-4'>${pageName} Page</div>`,
    });
    
    setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
    switchToPage(pageId);
    setShowAddPageModal(false);
  };

  const closePageModal = () => {
    setShowAddPageModal(false);
  };

  const closeTemplateModal = () => {
    setShowModal(false);
  };

  const handleDeletePage = async (pageId) => {
    const editor = editorRef.current;
    const pm = editor.Pages;
    
    // Prevent deletion of default pages
    if (["home", "header", "footer"].includes(pageId)) {
      toast.error("Cannot delete default pages");
      return;
    }
    
    if (pm.getAll().length <= 3) { // 3 default pages
      toast.error("Cannot delete the last custom page");
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
        // Switch to home page if current page was deleted
        switchToPage("home");
      }
    } catch (error) {
      toast.error("Failed to delete page.");
    }
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
    const pm = editor.Pages;
    
    // Save current page state
    saveCurrentPageState();
    
    // Switch to home page to capture screenshot
    const homePage = pm.get("home");
    if (!homePage) {
      toast.error("Home page not found");
      return null;
    }
    
    // Switch to home page temporarily
    const previousPage = currentPage;
    pm.select("home");
    editor.setComponents(homePage.get("customHtml") || "");
    editor.setStyle(homePage.get("customCss") || "");
    
    // Wait for the canvas to update
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const frame = editor.Canvas.getFrameEl();
      const canvasEl = frame?.contentWindow?.document?.body;
      
      if (!canvasEl) {
        toast.error("Could not capture canvas");
        return null;
      }
      
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasEl, {
        scale: 1,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      // Switch back to the previous page
      if (previousPage !== "home") {
        const prevPage = pm.get(previousPage);
        if (prevPage) {
          pm.select(previousPage);
          editor.setComponents(prevPage.get("customHtml") || "");
          editor.setStyle(prevPage.get("customCss") || "");
        }
      }
      
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      toast.error("Failed to capture screenshot");
      
      // Switch back to the previous page even if capture fails
      if (previousPage !== "home") {
        const prevPage = pm.get(previousPage);
        if (prevPage) {
          pm.select(previousPage);
          editor.setComponents(prevPage.get("customHtml") || "");
          editor.setStyle(prevPage.get("customCss") || "");
        }
      }
      
      return null;
    }
  };
  
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const editor = editorRef.current;
    const pm = editor.Pages;
  
    // Save the current page before sending data
    saveCurrentPageState();
  
    // Get all pages except header and footer for the pages array
    const customPages = pm.getAll().filter(
      page => !["header", "footer"].includes(page.id)
    );
    
    // Get header and footer separately
    const headerPage = pm.get("header");
    const footerPage = pm.get("footer");
    
    const projectData = {
      userID: userDetails._id,
      title: templateDetails.title,
      description: templateDetails.description,
      category: templateDetails.category,
      image: await captureHomePageScreenshot(),
      pages: customPages.map((page) => ({
        id: page.id,
        name: page.get("name"),
        html: page.get("customHtml") || "",
        css: page.get("customCss") || "",
      })),
      header: {
        html: headerPage?.get("customHtml") || "",
        css: headerPage?.get("customCss") || "",
      },
      footer: {
        html: footerPage?.get("customHtml") || "",
        css: footerPage?.get("customCss") || "",
      },
    };
  
    try {
      if (userDetails.role === "admin") {
        if (id) {
          await axios.put(`${AppRoutes.template}/${id}`, projectData);
          toast.success("Template updated successfully!");
        } else {
          await axios.post(AppRoutes.template, projectData);
          toast.success("Template added successfully!");
        }
      } else {
        if (id) {
          await axios.put(`${AppRoutes.userTemplate}/${id}`, projectData);
          toast.success("User template saved successfully!");
        } else {
          await axios.post(AppRoutes.userTemplate, projectData);
          toast.success("User created template successfully");
        }
      }
  
      navigate("/main-dashboard");
    } catch (error) {
      toast.error("Error saving template.");
      console.error(error);
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
                {page.name}
              </span>
              {!["home", "header", "footer"].includes(page.id) && (
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
          onClick={() => switchToPage("header")}
          className="flex items-center justify-center mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Edit Header
        </button>

        <button
          onClick={() => switchToPage("footer")}
          className="flex items-center justify-center mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Edit Footer
        </button>

        <button
          onClick={handleSaveTemplate}
          className="flex items-center justify-center mt-4 p-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          <FileText className="w-4 h-4 mr-2" />{" "}
          {id ? "Update Template" : "Save Template"}
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
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Template Details</h2>
              <RxCross2
                onClick={closeTemplateModal}
                className="cursor-pointer"
              />
            </div>

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
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {id ? "Update Template" : "Save Template"}
            </button>
          </form>
        </div>
      )}

      {/* Add Page Modal */}
      {showAddPageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <div className="flex justify-between">
              <div className="absolute top-5 right-5 cursor-pointer">
                <RxCross2
                  onClick={closePageModal}
                  className="w-5 h-5 text-gray-600 hover:text-black"
                />
              </div>
              <h2 className="text-lg font-bold mb-4">New Page</h2>
            </div>

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
              className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
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