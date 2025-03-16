import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsTailwind from "grapesjs-tailwind";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

const Editor = () => {
  // If there's an "id" param, we are editing an existing template
  const { id } = useParams();
  const navigate = useNavigate();

  // GrapesJS instance reference
  const editorRef = useRef(null);

  // Determines if we are editing an existing template
  const [isEditMode, setIsEditMode] = useState(false);

  // Template data from DB (if editing)
  const [templateData, setTemplateData] = useState(null);

  // State for showing/hiding modals
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Form fields for saving/updating template
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateCategory, setTemplateCategory] = useState("Personal");

  // Code modal content
  const [generatedCode, setGeneratedCode] = useState("");

  // 1) Check if we have an ID => set isEditMode
  useEffect(() => {
    setIsEditMode(!!id);
  }, [id]);

  // 2) If editing, fetch the template from the DB
  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return; // No ID => skip fetching

      try {
        // GET /api/templates/:id
        const res = await axios.get(`${AppRoutes.template}/${id}`);
        const data = res.data;
        setTemplateData(data);

        // Populate form fields
        setTemplateName(data.name || "");
        setTemplateDescription(data.description || "");
        setTemplateCategory(data.category || "Personal");
      } catch (error) {
        console.error("Error fetching template:", error);
        // Optionally navigate away or show an error
      }
    };

    fetchTemplate();
  }, [id]);

  // 3) Initialize GrapesJS once we have templateData (if any)
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

    // Helper: Get combined HTML + CSS
    const getCompleteHtml = () => {
      const html = editor.getHtml();
      const css = editor.getCss();
      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Generated Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      ${css}
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;
    };

    // Commands: Preview
    editor.Commands.add("preview", {
      run: () => {
        const previewHtml = getCompleteHtml();
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(previewHtml);
        previewWindow.document.close();
      },
    });

    // Commands: Show Code
    editor.Commands.add("show-code", {
      run: () => {
        setGeneratedCode(getCompleteHtml());
        setShowCodeModal(true);
      },
    });

    // Commands: Save/Update => open modal
    editor.Commands.add("save-template", {
      run: () => {
        setShowSaveModal(true);
      },
    });

    // If editing, and we have templateData with full HTML, load it
    if (templateData) {
      // If DB stores entire HTML
      editor.setComponents(templateData.html);

      // If DB stores separate CSS or GrapesJS JSON data, handle here:
      // e.g. editor.setStyle(templateData.css);
      // e.g. editor.setComponents(JSON.parse(templateData.components));
      // e.g. editor.setStyle(JSON.parse(templateData.styles));
    }

    return () => {
      editor.destroy();
    };
  }, [templateData]);

  // 4) UI Button Handlers
  const handlePreview = () => {
    editorRef.current?.runCommand("preview");
  };

  const handleShowCode = () => {
    editorRef.current?.runCommand("show-code");
  };

  const handleSaveTemplate = () => {
    editorRef.current?.runCommand("save-template");
  };

  // 5) Actually save or update in the modal’s final step
  const handleSaveOrUpdateTemplate = async () => {
    // Validate form
    if (!templateName) {
      toast.success("Please enter a template name");
      return;
    }

    const editor = editorRef.current;
    if (!editor) return;

    // Force GrapesJS to store final memory
    editor.store();

    // Get HTML / CSS from GrapesJS
    const html = editor.getHtml();
    const css = editor.getCss();

    // Build combined HTML
    const completeHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${templateName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      ${css}
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;

    // Attempt automatic screenshot via html2canvas
    let thumbnail = "/placeholder.svg";
    try {
      // Get the GrapesJS editor instance
      const editor = editorRef.current;
      // Get the canvas iframe element
      const iframeEl = editor.Canvas.getFrameEl();
      if (iframeEl) {
        // Get the iframe's document/body
        const iframeDoc = iframeEl.contentDocument;
        const iframeBody = iframeDoc?.body;
        if (iframeBody) {
          // Use html2canvas on the iframe body
          const canvas = await html2canvas(iframeBody, {
            useCORS: true, // handle cross-origin images if properly configured
          });
          thumbnail = canvas.toDataURL("image/jpeg");
        }
      }
    } catch (err) {
      console.error("Screenshot capture failed:", err);
      // fallback to a placeholder if needed
    }

    // Build payload
    const payload = {
      name: templateName,
      description:
        templateDescription ||
        `A custom template created on ${new Date().toLocaleDateString()}`,
      category: templateCategory,
      html: completeHtml,
      image: thumbnail,
    };
    console.log("Payload:", payload);
    
    try {
      if (isEditMode && id) {
        // Update existing template
        const response = await axios.put(`${AppRoutes.template}/${id}`, payload);
        console.log("respone", response)
        console.log("Template updated:", response.data);
        toast.success("Template updated successfully!");
      } else {
        // Create new template
        const response = await axios.post(AppRoutes.template, payload);
        console.log("Template created:", response.data);
        toast.success("Template saved successfully!");
      }

      // Close modal, reset
      setShowSaveModal(false);
      setTemplateName("");
      setTemplateDescription("");

      // Navigate or do something else
      navigate("/templates");
    } catch (error) {
      console.error("Error saving/updating template:", error);
      toast.error("Failed to save/update template. Check console for details.");
    }
  };

  return (
    <div>
      {/* GrapesJS Editor Container */}
      <div id="gjs" className="h-screen w-full"></div>

      {/* Floating Buttons */}
      <div className="fixed z-10 bottom-4 right-4 flex gap-2">
        <button
          onClick={handlePreview}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          title="Preview"
        >
          Preview
        </button>
        <button
          onClick={handleShowCode}
          className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          title="Show Code"
        >
          Show Code
        </button>
        <button
          onClick={handleSaveTemplate}
          className="p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          title={isEditMode ? "Update Template" : "Save Template"}
        >
          {isEditMode ? "Update Template" : "Save Template"}
        </button>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Generated Code</h3>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto flex-grow">
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                {generatedCode}
              </pre>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              {/* Template Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name*
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Awesome Template"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A brief description of your template"
                  rows={3}
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={templateCategory}
                  onChange={(e) => setTemplateCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Content">Content</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
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
