import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjsTailwind from 'grapesjs-tailwind';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
  const editorRef = useRef(null);
  const [editorKey, setEditorKey] = useState(Date.now());
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateCategory, setTemplateCategory] = useState('Personal');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the editor with your existing configuration


      const editor = grapesjs.init({
        container: '#gjs',
        plugins: [grapesjsTailwind],
        pluginsOpts: {
          [grapesjsTailwind]: { /* plugin options */ },
        },
        fromElement: true,
        storageManager: {
          type: 'local',
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
          options: {
            local: { key: 'gjsProject' },
          }
        },
      });
  
      // Store the editor instance in the ref
      editorRef.current = editor;
  
      // Function to get complete HTML with CSS
      const getCompleteHtml = () => {
        const html = editor.getHtml();
        const css = editor.getCss();
        
        return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Page</title>
      <!-- Include Tailwind CSS from CDN -->
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        /* Custom CSS from editor */
        ${css}
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>`;
      };
  
      // Add preview command with proper CSS
      editor.Commands.add('preview', {
        run: function(editor) {
          editor.store();
          const completeHtml = getCompleteHtml();
          
          // Create a new window with the content
          const previewWindow = window.open('', '_blank');
          previewWindow.document.write(completeHtml);
          previewWindow.document.close();
        }
      });
  
      // Add show code command
      editor.Commands.add('show-code', {
        run: function(editor) {
          editor.store();
          const completeHtml = getCompleteHtml();
          setGeneratedCode(completeHtml);
          setShowCodeModal(true);
        }
      });
  
      // Add save template command
      editor.Commands.add('save-template', {
        run: function(editor) {
          setShowSaveModal(true);
        }
      });

       // Load stored template
       const storedTemplate = localStorage.getItem("gjsProject");
       
       if (storedTemplate) {
         const { html, css, components, styles } = JSON.parse(storedTemplate);
         console.log(html);
         console.log(css);
         console.log(styles);
         
         editor.setComponents(components || html); // Load components if available, otherwise HTML
         editor.setStyle(styles || css); // Load styles if available
 
         console.log("Loaded template:", { components, styles });
       }
  
      return () => {
        editor.destroy();
      };
    }, []);

  

  // Functions to handle preview and show code
  const handlePreview = () => {
    if (editorRef.current) {
      editorRef.current.runCommand('preview');
    }
  };

  const handleShowCode = () => {
    if (editorRef.current) {
      editorRef.current.runCommand('show-code');
    }
  };

  const handleSaveTemplate = () => {
    if (editorRef.current) {
      editorRef.current.runCommand('save-template');
    }
  };

  const saveTemplate = () => {
    if (!templateName) {
      alert('Please enter a template name');
      return;
    }

    if (editorRef.current) {
      const editor = editorRef.current;
      editor.store();
      
      // Get HTML and CSS
      const html = editor.getHtml();
      const css = editor.getCss();
      
      // Create a complete HTML document
      const completeHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateName}</title>
    <!-- Include Tailwind CSS from CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      /* Custom CSS from editor */
      ${css}
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;

      // Generate a thumbnail by capturing the canvas
      // For simplicity, we'll use a data URL of the canvas
      let thumbnail = '';
      try {
        // Try to get a screenshot of the canvas
        const canvas = document.createElement('canvas');
        const wrapper = document.querySelector('#gjs');
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(wrapper, 0, 0, rect.width, rect.height);
          thumbnail = canvas.toDataURL('image/jpeg');
        }
      } catch (e) {
        console.error('Error generating thumbnail:', e);
        // Use a placeholder if thumbnail generation fails
        thumbnail = '/placeholder.svg';
      }

      // Create a template object
      const template = {
        id: `user-template-${Date.now()}`,
        name: templateName,
        description: templateDescription || `A custom template created on ${new Date().toLocaleDateString()}`,
        category: templateCategory,
        image: thumbnail,
        html: completeHtml,
        createdAt: new Date().toISOString(),
      };

      // Get existing templates from localStorage
      const existingTemplatesJSON = localStorage.getItem('userTemplates');
      const existingTemplates = existingTemplatesJSON ? JSON.parse(existingTemplatesJSON) : [];
      
      // Add the new template
      existingTemplates.push(template);
      
      // Save back to localStorage
      localStorage.setItem('userTemplates', JSON.stringify(existingTemplates));
      
      // Close the modal
      setShowSaveModal(false);
      
      // Reset form fields
      setTemplateName('');
      setTemplateDescription('');
      
      // Show success message
      alert('Template saved successfully!');
      
      // Navigate to templates page
      navigate('/templates');
    }
  };

  const handleDownload = () => {
    // Create download link
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webpage.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div id="gjs" className="h-screen w-full" key={editorKey}></div>
      
      {/* Control buttons */}
      <div className="fixed z-10 bottom-4 right-4 flex gap-2">
        {/* Preview button */}
        <button 
          onClick={handlePreview}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          title="Preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        
        {/* Show Code button */}
        <button 
          onClick={handleShowCode}
          className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          title="Show Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
        
        {/* Save Template button */}
        <button 
          onClick={handleSaveTemplate}
          className="p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          title="Save as Template"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
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
              {/* <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download HTML
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Save Template Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Save as Template</h3>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Awesome Template"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A brief description of your template"
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
            <div className="p-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveTemplate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;