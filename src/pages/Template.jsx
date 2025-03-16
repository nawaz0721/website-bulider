import { ArrowLeft } from "lucide-react";
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
import axios from "axios";
import { AppRoutes } from "@/constant/constant";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allTemplates, setAllTemplates] = useState([]);
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const navigate = useNavigate();

  // Fetch all templates from your backend on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // E.g. AppRoutes.template = "http://localhost:5000/api/templates"
        const response = await axios.get(AppRoutes.template);
        setAllTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  // Filter templates by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setDisplayedTemplates(allTemplates);
    } else {
      setDisplayedTemplates(
        allTemplates.filter((t) => t.category === selectedCategory)
      );
    }
  }, [allTemplates, selectedCategory]);

  // Get unique categories (including "All")
  const getUniqueCategories = () => {
    const categories = new Set(allTemplates.map((t) => t.category));
    return ["All", ...categories];
  };

  // Preview template => open its HTML in a new tab
  const handlePreview = (template) => {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(template.html);
    previewWindow.document.close();
  };

  // Use template => navigate to Editor with template ID (/editor/:id)
  const handleUseTemplate = (template) => {
    navigate(`/editor/${template._id}`);
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
              <span className="font-medium">Editor</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-5 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">
              Choose a template to get started quickly
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {getUniqueCategories().map((category) => (
              <Button
                key={category}
                variant="outline"
                className={`text-black bg-white hover:text-white hover:bg-black ${
                  selectedCategory === category ? "bg-black text-white" : ""
                }`}
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
              <Card key={template._id} className="overflow-hidden">
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
                    variant="outline"
                    className="text-black bg-white hover:text-white hover:bg-black"
                    onClick={() => handlePreview(template)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="text-black bg-white hover:text-white hover:bg-black"
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
