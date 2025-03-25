"use client"

import { ArrowLeft, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AppRoutes } from "@/constant/constant"
import Cookies from "js-cookie"
import toast from "react-hot-toast"

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [allTemplates, setAllTemplates] = useState([])
  const [displayedTemplates, setDisplayedTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true)
        const templatesResponse = await axios.get(AppRoutes.template)
        console.log(templatesResponse);
        
        
        const templatesWithUserDetails = await Promise.all(
          templatesResponse.data.map(async (template) => {
            try {
              const userResponse = await axios.get(`${AppRoutes.user}/${template.userID}`, {
                headers: { Accept: "application/json" },
              })

              const userDetails =
                typeof userResponse.data === "string" ? JSON.parse(userResponse.data) : userResponse.data

              return { ...template, userDetails }
            } catch (error) {
              return { ...template, userDetails: null }
            }
          }),
        )

        const adminTemplates = templatesWithUserDetails.filter(
          (template) => template.userDetails?.role === "admin",
        )

        setAllTemplates(adminTemplates)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching templates:", error)
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  // Filtering logic
  useEffect(() => {
    let filtered = [...allTemplates]
    if (selectedCategory !== "All") {
      filtered = filtered.filter((t) => t.category === selectedCategory)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (t) => t.name.toLowerCase().includes(query) || t.description?.toLowerCase().includes(query),
      )
    }
    setDisplayedTemplates(filtered)
  }, [allTemplates, selectedCategory, searchQuery])

  const getUniqueCategories = () => {
    const categories = new Set(allTemplates.map((t) => t.category || "Uncategorized"))
    return ["All", ...Array.from(categories)]
  }

  const handlePreview = async (template) => {
    try {
      const res = await axios.get(`${AppRoutes.template}/${template._id}`);
      const templateData = res.data;
  
      // Ensure pages exist
      if (!templateData.pages || templateData.pages.length === 0) {
        toast.error("No pages found in this template!");
        return;
      }
  
      // Grab first page for preview
      const firstPage = templateData.pages[0];
  
      const slugify = (str) => {
        if (!str) return "home";
        return str
      
      };

      
      const firstPageSlug = slugify(firstPage.id);
  
      // open preview page with correct slug & template ID
      const previewURL = `/previewpage/${templateData._id}/${firstPageSlug}`;
      window.open(previewURL, "_blank");
    } catch (err) {
      console.error("Error fetching template details:", err);
      toast.error("Failed to fetch template details!");
    }
  };
  
 // When click Use Template, go to /editor/:id
const handleUseTemplate = (template) => {
  const authToken = Cookies?.get("authToken")
  if (!authToken) {
    toast.error("You need to be logged in to use this template.")
    setTimeout(() => navigate("/login"), 2000)
    return
  }

  navigate(`/editor/${template._id}`)
}
  const authToken = Cookies?.get("authToken")
  
  let userDetails = null;
  try {
    const user = Cookies?.get("user");
    if (user) {
      userDetails = JSON.parse(user);
    }
  } catch (err) {
    console.error("Failed to parse user cookie:", err);
  }
  

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/main-dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div>
              <Button
                variant="outline"
                className="gap-2 text-white"
                onClick={() => {
                  if (authToken) {
                    navigate("/editor")
                  } else {
                    toast.error("You need to be logged in to create a new template.")
                    setTimeout(() => navigate("/login"), 2000)
                  }
                }}
              >
                <Plus className="h-4 w-4" />
                Add New Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Templates Gallery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Browse our collection of professionally designed templates to kickstart your next project
            </p>
          </div>

          {/* Search and Filters */}
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
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "text-black whitespace-nowrap" : "text-white whitespace-nowrap"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border p-4 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg"></div>
                  <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                </div>
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
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{template.name}</CardTitle>
                          <Badge variant="secondary" className="ml-2">{template.category}</Badge>
                        </div>
                        <CardDescription className="mt-2 line-clamp-2">{template.description || "No description available"}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between gap-4 pt-2 pb-4 ">
                        <Button
                          variant="outline"
                          className="flex-1 transition-colors text-white hover:bg-white hover:text-black"
                          onClick={() => handlePreview(template)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 text-white hover:bg-white hover:text-black"
                          onClick={() => handleUseTemplate(template)}
                        >
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No templates found.
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
