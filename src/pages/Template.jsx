"use client";

import { ArrowLeft, Plus, Search, Eye } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AppRoutes } from "@/constant/constant";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allTemplates, setAllTemplates] = useState([]);
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userTemplates, setUserTemplates] = useState([]);
  const navigate = useNavigate();

  let userDetails = null;
  try {
    const user = Cookies?.get("user");
    if (user) {
      userDetails = JSON.parse(user);
    }
  } catch (err) {
    console.error("Failed to parse user cookie:", err);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all templates
        const templatesResponse = await axios.get(AppRoutes.template);
        setAllTemplates(templatesResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userDetails?._id]);

  useEffect(() => {
    let filtered = [...allTemplates];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          (t.title?.toLowerCase()?.includes(query) || "") || 
          (t.description?.toLowerCase()?.includes(query) || "")
      );
    }
    setDisplayedTemplates(filtered);
  }, [allTemplates, searchQuery]);

  // Check if template is already in user's collection
  const isTemplateAdded = (templateId) => {
    return userTemplates.some(t => t.templateID === templateId);
  };

  const handleAddToCart = async (template) => {
    try {
      if (!userDetails?._id) {
        toast.error("You need to be logged in to add templates.");
        return;
      }

      // Check if template already exists in user's collection
      if (isTemplateAdded(template._id)) {
        toast.error("This template is already in your collection!");
        return;
      }

      const newTemplate = {
        userID: userDetails._id,
        templateID: template._id,
        title: template.title,
        category: template.category,
        image: template.image,
        description: template.description,
        pages: template.pages,
        header: template.header,
        footer: template.footer
      };

      
      const response = await axios.post(AppRoutes.userTemplate, newTemplate);
      
      // Update local state with the newly added template
      setUserTemplates([...userTemplates, response.data]);
      
      toast.success("Template added to your collection!");
      navigate("/main-dashboard");
    } catch (error) {
      console.error("Error adding template:", error);
      if (error.response?.status === 409) {
        toast.error("This template is already in your collection!");
      } else {
        toast.error("Failed to add template.");
      }
    }
  };

  const handleUseTemplate = (template) => {
    navigate(`/editor/${template._id}`);
  };

  const handlePreview = (template) => {
    window.open(`/templatepreview/${template._id}/${template.pages[0].id}`, "_blank")
  } 

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/main-dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            {userDetails?.role === "admin" && (
              <Button
                className="flex items-center gap-2"
                onClick={() => navigate("/editor")}
              >
                <Plus className="h-4 w-4" />
                New Template
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="space-y-2 m-2">
          <h1 className="text-4xl font-bold tracking-tight">Templates Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse our collection of professionally designed templates to kickstart your next project
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6 flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Button variant="outline">
            <Search className="h-5 w-5 " />
          </Button>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <p>Loading...</p>
        ) : displayedTemplates.length > 0 ? (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedTemplates.map((template) => (
              <Card key={template._id} className="shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  className="w-full h-40 object-cover rounded-t-md"
                />
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                  <Badge className="bg-black text-white p-3">{template.category}</Badge>
                </CardHeader>
                <CardFooter className="flex justify-between space-x-2">
                  <Button variant="outline" onClick={() => handlePreview(template)} >
                    <Eye className="h-4 w-4 mr-2 " />
                    Preview
                  </Button>
                  {userDetails?.role === "admin" ? (
                    <Button variant="default" onClick={() => handleUseTemplate(template)}>
                      Use Template
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleAddToCart(template)}
                      disabled={isTemplateAdded(template._id)}
                    >
                      {isTemplateAdded(template._id) ? "Added" : "Add to Collection"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No templates found.</p>
        )}
      </main>
    </div>
  );
}