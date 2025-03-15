import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const navigate = useNavigate();


  // Load user templates from localStorage
  useEffect(() => {
    const loadTemplates = () => {
      const userTemplatesJSON = localStorage.getItem("userTemplates");
      const userTemplates = userTemplatesJSON ? JSON.parse(userTemplatesJSON) : [];

      // Filter by category if needed
      if (selectedCategory === "All") {
        setDisplayedTemplates(userTemplates);
      } else {
        setDisplayedTemplates(
          userTemplates.filter((template) => template.category === selectedCategory)
        );
      }
    };

    loadTemplates();
  }, [selectedCategory]);

  useEffect(() => {
    const storedTemplates = localStorage.getItem("userTemplates");
    setDisplayedTemplates(storedTemplates ? JSON.parse(storedTemplates) : []);
  }, []);
  

  // Get unique categories from user templates
  const getUniqueCategories = () => {
    const userTemplatesJSON = localStorage.getItem("userTemplates");
    const userTemplates = userTemplatesJSON ? JSON.parse(userTemplatesJSON) : [];

    const categories = new Set(userTemplates.map((template) => template.category));
    return ["All", ...Array.from(categories)];
  };

  // Handle template preview
  const handlePreview = (template) => {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(template.html);
    previewWindow.document.close();
  };

  // Handle template use
  const handleUseTemplate = (template) => {
    console.log(template);
    
    localStorage.setItem(
      "gjsProject",
      JSON.stringify({
        html: template.html || "", // Ensure HTML is stored
        css: template.css || "", // Default to empty string if undefined
        components: template.components ? JSON.stringify(template.components) : "[]", // Default to empty array
        styles: template.styles ? JSON.stringify(template.styles) : "[]", // Default to empty array
      })
    );
  
    // Navigate to editor page
    navigate("/editor");
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-5 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/editor" className="flex items-center gap-2">
              <span className="font-medium"> Editor </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Choose a template to get started quickly</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {getUniqueCategories().map((category) => (
              <Button
                key={category}
                className={`text-black bg-white hover:text-white hover:bg-black ${
                  selectedCategory === category ? "bg-black text-white" : ""
                }`}
                variant="outline"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedTemplates.length > 0 ? (
            displayedTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{template.name}</CardTitle>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button
                    className="text-black bg-white hover:text-white hover:bg-black"
                    variant="outline"
                    onClick={() => handlePreview(template)}
                  >
                    Preview
                  </Button>
                  <Button
                    className="text-black bg-white hover:text-white hover:bg-black"
                    variant="outline"
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No templates available. Create one in the editor.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
