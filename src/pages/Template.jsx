"use client";

import { ArrowLeft, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AppRoutes } from "@/constant/constant";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allTemplates, setAllTemplates] = useState([]);
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all templates from your backend on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(AppRoutes.template);
        setAllTemplates(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Filter templates by category and search query
  useEffect(() => {
    let filtered = [...allTemplates];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }

    setDisplayedTemplates(filtered);
  }, [allTemplates, selectedCategory, searchQuery]);

  // Get unique categories (including "All")
  const getUniqueCategories = () => {
    const categories = new Set(allTemplates.map((t) => t.category));
    return ["All", ...Array.from(categories)];
  };

  // Preview template => open its HTML in a new tab
  const handlePreview = (template) => {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(template.html);
    previewWindow.document.close();
  };

  // Use template => navigate to Editor with template ID (/editor/:id)
  const handleUseTemplate = (template) => {
    console.log("template", template);

    navigate(`/editor/${template._id}`);
    // window.location.to = `/editor/${template._id}`
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const authToken = Cookies.get("authToken"); // Check if user is authenticated

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {authToken ? (
                <Link to="/editor">
                  <Button variant="outline" className="gap-2 text-white">
                    <Plus className="h-4 w-4" />
                    New Template
                  </Button>
                </Link>
              ) : (
                  <Button variant="outline" className="gap-2 text-white" onClick={() => {
                                toast.error(
                                  "You need to be logged in to use this template."
                                );
                                setTimeout(() => {
                                  navigate("/login");
                                }, 2000); // Adjust the delay as needed
                              }}>
                    <Plus className="h-4 w-4" />
                    New Template
                  </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="space-y-8">
          {/* Hero section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Templates Gallery
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Browse our collection of professionally designed templates to
              kickstart your next project
            </p>
          </div>

          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {getUniqueCategories().map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "text-black whitespace-nowrap"
                      : "text-white whitespace-nowrap"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse" />
                  <CardHeader>
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="h-10 bg-muted animate-pulse rounded w-28" />
                    <div className="h-10 bg-muted animate-pulse rounded w-28" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayedTemplates.length > 0 ? (
                displayedTemplates.map((template) => (
                  <motion.div key={template._id} variants={item}>
                    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                      <div className="aspect-video overflow-hidden bg-muted/30">
                        <img
                          src={
                            template.image ||
                            "/placeholder.svg?height=200&width=400"
                          }
                          alt={template.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            {template.name}
                          </CardTitle>
                          <Badge variant="secondary" className="ml-2">
                            {template.category}
                          </Badge>
                        </div>
                        <CardDescription className="mt-2 line-clamp-2">
                          {template.description || "No description available"}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between gap-4 pt-2 pb-4 ">
                        <Button
                          variant="outline"
                          className="flex-1 transition-colors text-white hover:bg-white hover:text-black"
                          onClick={() => handlePreview(template)}
                        >
                          Preview
                        </Button>
                        {authToken ? (
                          <Button
                            variant="outline"
                            className="flex-1 text-white hover:bg-white hover:text-black"
                            onClick={() => handleUseTemplate(template)}
                          >
                            Use Template
                          </Button>
                        ) : (
                          <Link to="/login">
                            <Button
                              variant="outline"
                              className="flex-1 text-white hover:bg-white hover:text-black"
                              onClick={() => {
                                toast.error(
                                  "You need to be logged in to use this template."
                                );
                                setTimeout(() => {
                                  navigate("/login");
                                }, 2000); // Adjust the delay as needed
                              }}
                            >
                              Use Template
                            </Button>
                          </Link>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12">
                  <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg border-2 border-dashed">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">
                      No templates found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? "Try adjusting your search or filter criteria"
                        : "No templates available in this category. Create one in the editor."}
                    </p>
                    <Link to="/editor">
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Template
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/help"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
