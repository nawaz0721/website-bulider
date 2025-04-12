"use client"

import { ArrowLeft, Plus, Search, Eye, Filter, Grid, List, ChevronDown, X } from "lucide-react"
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
import { UserTemplateCard } from "@/components/UserTemplateCard"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [allTemplates, setAllTemplates] = useState([])
  const [displayedTemplates, setDisplayedTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userTemplates, setUserTemplates] = useState([])
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeFilters, setActiveFilters] = useState([])
  const navigate = useNavigate()

  let userDetails = null
  try {
    const user = Cookies?.get("user")
    if (user) {
      userDetails = JSON.parse(user)
      
    }
  } catch (err) {
    console.error("Failed to parse user cookie:", err)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch all templates
        const templatesResponse = await axios.get(AppRoutes.template)
        setAllTemplates(templatesResponse.data)

        console.log("templatesResponse",templatesResponse.data);
        
        // If user is logged in, fetch their templates
        if (userDetails?._id) {
          const userTemplatesResponse = await axios.get(`${AppRoutes.userTemplate}/${userDetails._id}`)
          setUserTemplates(userTemplatesResponse.data || [])
          console.log("userTemplatesResponse",userTemplatesResponse.data);
        }

        
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userDetails?._id])

  useEffect(() => {
    let filtered = [...allTemplates]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (t) => t.title?.toLowerCase()?.includes(query) || "" || t.description?.toLowerCase()?.includes(query) || "",
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((t) => t.category === categoryFilter)
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((t) => {
        // This is a placeholder for additional filtering logic
        return true
      })
    }

    setDisplayedTemplates(filtered)
  }, [allTemplates, searchQuery, categoryFilter, activeFilters])

  // Check if template is already in user's collection
  const isTemplateAdded = (templateId) => {
    return userTemplates.some((t) => t.templateID === templateId)
  }

  const handleAddToCart = async (template) => {
    try {
      if (!userDetails?._id) {
        toast.error("You need to be logged in to add templates.")
        return
      }

      // Check if template already exists in user's collection
      if (isTemplateAdded(template._id)) {
        toast.error("This template is already in your collection!")
        return
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
        footer: template.footer,
      }

      const response = await axios.post(AppRoutes.userTemplate, newTemplate)

      // Update local state with the newly added template
      setUserTemplates([...userTemplates, response.data])

      toast.success("Template added to your collection!")
      navigate("/main-dashboard")
    } catch (error) {
      console.error("Error adding template:", error)
      if (error.response?.status === 409) {
        toast.error("This template is already in your collection!")
      } else {
        toast.error("Failed to add template.")
      }
    }
  }

  const handleUseTemplate = (template) => {
    navigate(`/editor/${template._id}`)
  }

  const handlePreview = (template) => {
    window.open(`/templatepreview/${template._id}/${template.pages[0].id}`, "_blank")
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setActiveFilters([])
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  // Get unique categories from templates
  const categories = ["all", ...new Set(allTemplates.map((t) => t.category).filter(Boolean))]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/main-dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            {userDetails?.role === "admin" && (
              <Button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Templates Gallery</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Browse our collection of professionally designed templates to kickstart your next project
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] h-10 border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 border-gray-200 gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <span>Most Popular</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Newest First</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Oldest First</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="bg-gray-100 rounded-md p-1 flex">
                <button
                  className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {(searchQuery || categoryFilter !== "all" || activeFilters.length > 0) && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-gray-500">
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Active filters */}
          {(searchQuery || categoryFilter !== "all" || activeFilters.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <span>Search: {searchQuery}</span>
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {categoryFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <span>Category: {categoryFilter}</span>
                  <button onClick={() => setCategoryFilter("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </motion.div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border shadow p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : displayedTemplates.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}
          >
            {displayedTemplates.map((template) => (
              <motion.div key={template._id} variants={itemVariants}>
                {viewMode === "grid" ? (
                  <UserTemplateCard
                    template={template}
                    handlePreview={handlePreview}
                    handleUseTemplate={handleUseTemplate}
                    handleAddToCart={handleAddToCart}
                    isTemplateAdded={isTemplateAdded}
                  />
                ) : (
                  <Card className="flex flex-col md:flex-row overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="md:w-1/3">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{template.title}</CardTitle>
                            <CardDescription className="mt-1">{template.description}</CardDescription>
                          </div>
                          {template.category && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">{template.category}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardFooter className="mt-auto flex justify-end gap-3">
                        <Button variant="outline" onClick={() => handlePreview(template)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        {userDetails?.role === "admin" ? (
                          <Button onClick={() => handleUseTemplate(template)}>Use Template</Button>
                        ) : (
                          <Button
                            onClick={() => handleAddToCart(template)}
                            disabled={isTemplateAdded(template._id)}
                            className={
                              isTemplateAdded(template._id)
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }
                          >
                            {isTemplateAdded(template._id) ? "Added to Collection" : "Add to Collection"}
                          </Button>
                        )}
                      </CardFooter>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-lg border shadow-sm"
          >
            <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No templates found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any templates matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={handleClearFilters}>Clear All Filters</Button>
          </motion.div>
        )}
      </main>
    </div>
  )
}
