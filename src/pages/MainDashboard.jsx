"use client"

import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Search, Brain, Eye, MoreVertical, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { Card, Divider } from "antd"
import { FaCloudflare } from "react-icons/fa"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import axios from "axios"
import Cookies from "js-cookie"
import { AppRoutes } from "@/constant/constant"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useNavigate, Link } from "react-router-dom"
import PreviewPage from "./preview-modal"
import toast from "react-hot-toast"

export default function Dashboard() {
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
  
      const user = Cookies?.get("user");
      const userDetails = user ? JSON.parse(user) : null;
  
      const userId = userDetails?._id;
      if (!userId) {
        console.error("User ID not found");
        setIsLoading(false);
        return;
      }


      const fetchUserTemplates = async () => {
        try {
          const response = await axios.get(`${AppRoutes.userTemplate}/${userId}`);
          setTemplates(response.data);
        } catch (error) {
          console.error("Error fetching user templates:", error);
        }
      };

      fetchUserTemplates();
  
      // setTemplates(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTemplates()
  }, [])

  // Filter templates by search query
  const filteredTemplates = templates.filter((template) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return template.name?.toLowerCase().includes(query) || template.description?.toLowerCase().includes(query)
  })

  // Use template => navigate to Editor with template ID (/editor/:id)
  const handleUseTemplate = (template) => {
    setSelectedTemplate(template) // set template data
    setShowPreview(true) // open modal
  }

  const handleClosePreview = () => {
    setShowPreview(false)
    setSelectedTemplate(null)
  }

  const handleDeleteTemplate = async (templateId) => {
    try {
      const authToken = Cookies.get("authToken")
      if (!authToken) {
        toast.error("You need to be logged in to delete templates.")
        return
      }

      // Show loading toast
      const loadingToast = toast.loading("Deleting template...")

      // Delete the template
      await axios.delete(`${AppRoutes.template}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast)
      toast.success("Template deleted successfully!")

      // Refresh the templates list
      fetchTemplates()
    } catch (error) {
      console.error("Error deleting template:", error)
      toast.error("Failed to delete template. Please try again.")
    }
  }

  const handlePreview = async (template) => {
    try {
      
      if (!template?._id) {
        toast.error("Template ID is missing!");
        return;
      }
      
      const res = await axios.get(`${AppRoutes.userTemplatePreview}/${template._id}`);
      const templateData = res.data;
      console.log(templateData);
      
      // Ensure pages exist
      if (!templateData.pages || templateData.pages.length === 0) {
        toast.error("No pages found in this template!");
        return;
      }
  
      // Grab first page for preview
      const firstPage = templateData.pages[0];
  
      const slugify = (str) => {
        if (!str) return "home";
        return str.toLowerCase().replace(/\s+/g, '-');
      };
  
      const firstPageSlug = slugify(firstPage.id || firstPage.name);
  
      // Open preview page with correct slug & template ID
      const previewURL = `/previewpage/${templateData._id}/${firstPageSlug}`;
      window.open(previewURL, "_blank");
    } catch (err) {
      console.error("Error fetching template details:", err);
      toast.error("Failed to fetch template details!");
    }
  };
  

  const authToken = Cookies.get("authToken") // Check if user is authenticated

  console.log(templates);
  

  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />

      {/* Conditional rendering */}
      {showPreview && selectedTemplate ? (
        <PreviewPage template={selectedTemplate} isOpen={showPreview} onClose={handleClosePreview} />
      ) : (
        <div className="mx-auto w-full mt-12 ml-16 p-6 space-y-6">
          {/* Action Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <button className="flex items-center gap-4 rounded-lg border p-4 text-left hover:border-gray-400 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B5132C] text-white">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold">Create a website</h2>
                <p className="text-sm text-gray-500">Use AI, templates or themes</p>
              </div>
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-4 rounded-lg border p-4 text-left hover:border-gray-400 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B5132C] text-white">
                    <FaCloudflare className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Create a custom website</h2>
                    <p className="text-sm text-gray-500">Manually design and customize your website.</p>
                  </div>
                </button>
              </PopoverTrigger>
            </Popover>
            <Link
              to="/templates"
              className="flex items-center gap-4 rounded-lg border p-4 text-left hover:border-gray-400 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B5132C] text-white">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold">Browse templates</h2>
                <p className="text-sm text-gray-500">Find and use pre-designed templates</p>
              </div>
            </Link>
          </div>
          <Divider className="w-full" orientation="right">
            Websites: {templates.length} of {templates.length}
          </Divider>
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <Checkbox id="select-all" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tags</SelectItem>
                  {/* Add more filter options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Template Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Show loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border p-4 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg"></div>
                  <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))
            ) : filteredTemplates.length > 0 ? (
              // Show templates
              filteredTemplates.map((template) => (
                <Card key={template._id} className="overflow-hidden border-0 shadow-md">
                  {/* Preview section */}
                  <div className="aspect-video overflow-hidden bg-muted/30 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full bg-slate-400 h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 text-black" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => navigate(`/editor/${template._id}`)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleDeleteTemplate(template._id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <img
                      src={template.image || "/placeholder.svg?height=200&width=400"}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Footer section */}
                  <div className="bg-white p-3 flex flex-col">
                    <div>
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {template.description || "No description available"}
                      </CardDescription>
                      </div>
                      <div className="flex justify-end gap-5 ">
                      <Button
                        className=" bg-slate-400  "
                        onClick={() => handlePreview(template)}
                      >
                        Preview
                      </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleUseTemplate(template)}>
                      Manage
                    </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              // Show message if no templates are found
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No templates found. Create one to get started or browse the template gallery.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <Link to="/editor">
                    <Button variant="outline" className="text-white">Create Template</Button>
                  </Link>
                  <Link to="/templates">
                    <Button>Browse Templates</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </SidebarProvider>
  )
}

