"use client"

import { useEffect, useState } from "react"
import { Search, Brain, Eye, Plus, Trash, Code, Layers } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, Divider } from "antd"
import { FaCloudflare, FaWordpress } from "react-icons/fa"
import axios from "axios"
import Cookies from "js-cookie"
import { AppRoutes } from "@/constant/constant"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, Link, useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import  TemplateCard  from "@/components/TemplateCard.jsx"

export default function MainDashboard() {
  const [templates, setTemplates] = useState([])
  const [wordpressTemplates, setWordpressTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isWordpressLoading, setIsWordpressLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("custom")
  const [websiteStats, setWebsiteStats] = useState({
    customCreated: 0,
    purchaseLimit: 10,
    wordpressCreated: 0,
    wordpressPurchaseLimit: 5,
  })

  const navigate = useNavigate()
  const location = useLocation()

  const user = Cookies?.get("user")
  const userDetails = user ? JSON.parse(user) : null

  const fetchTemplates = async () => {
    try {
      setIsLoading(true)

      const user = Cookies?.get("user")
      const path = Cookies?.get("path")
      console.log("path", path)

      const userDetails = user ? JSON.parse(user) : null

      const userId = userDetails?._id
      if (!userId) {
        console.error("User ID not found")
        setIsLoading(false)
        return
      }

      const fetchUserTemplates = async () => {
        try {
          const response = await axios.get(`${AppRoutes.templateByUserId}/${userId}`)

          setTemplates(response.data)
          // Update stats
          setWebsiteStats((prev) => ({
            ...prev,
            customCreated: response.data.length,
          }))
        } catch (error) {
          console.error("Error fetching user templates:", error)
        }
      }

      fetchUserTemplates()
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching templates:", error)
      setIsLoading(false)
    }
  }

  // This would be replaced with actual API call in the future
  const fetchWordpressTemplates = async () => {
    try {
      setIsWordpressLoading(true)
      // Placeholder for future API call
      // For now, just set a placeholder empty array
      setWordpressTemplates([])
      setWebsiteStats((prev) => ({
        ...prev,
        wordpressCreated: 0, // This would come from the API
      }))
      setIsWordpressLoading(false)
    } catch (error) {
      console.error("Error fetching WordPress templates:", error)
      setIsWordpressLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
    fetchWordpressTemplates()
  }, [])

  // Filter templates by search query
  const filteredTemplates = templates.filter((template) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return template.name?.toLowerCase().includes(query) || template.description?.toLowerCase().includes(query)
  })

  // Use template => navigate to Editor with template ID (/editor/:id)
  const handleUseTemplate = (template) => {
    navigate(`/templatedetails/${template._id}`)
  }

  const handleDeleteTemplate = async (templateId) => {
    try {
      const authToken = Cookies.get("authToken")
      if (!authToken) {
        toast.error("You need to be logged in to delete templates.")
        return
      }

      // Delete the template
      await axios.delete(`${AppRoutes.userTemplate}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      // Dismiss loading toast and show success
      toast.success("Template deleted successfully!")

      // Refresh the templates list
      fetchTemplates()
    } catch (error) {
      console.error("Error deleting template:", error)
      toast.error("Failed to delete template. Please try again.")
    }
  }

  const handlePreview = async (template) => {
    window.open(`/dashboardpreview/${template._id}/${template.pages[0].id}`, "_blank")
  }

  const handleClick = () => {
    navigate("/select-website")
  }

  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />

      <div className="mx-auto w-full mt-12 ml-16 p-6 space-y-6">
      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Create Website Card */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-4 -translate-y-4 transform rounded-full bg-blue-400 opacity-20 group-hover:bg-blue-500 group-hover:opacity-30 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-4 translate-y-4 transform rounded-full bg-blue-400 opacity-20 group-hover:bg-blue-500 group-hover:opacity-30 transition-all duration-300"></div>

          <button className="flex h-full w-full flex-col items-start p-6 text-left">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Brain className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Create a Website</h2>
            <p className="text-sm text-gray-600 mb-4">Use AI, templates or themes to build your perfect site</p>
            <div className="mt-auto flex items-center text-blue-600 font-medium">
              <span>Get started</span>
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Create WordPress Website Card */}
        <div
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
          onClick={handleClick}
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-4 -translate-y-4 transform rounded-full bg-green-400 opacity-20 group-hover:bg-green-500 group-hover:opacity-30 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-4 translate-y-4 transform rounded-full bg-green-400 opacity-20 group-hover:bg-green-500 group-hover:opacity-30 transition-all duration-300"></div>

          <button className="flex h-full w-full flex-col items-start p-6 text-left">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
              <FaWordpress className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Create WordPress Site</h2>
            <p className="text-sm text-gray-600 mb-4">Design and customize your WordPress website with ease</p>
            <div className="mt-auto flex items-center text-green-600 font-medium">
              <span>Get started</span>
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Browse Templates Card */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-4 -translate-y-4 transform rounded-full bg-purple-400 opacity-20 group-hover:bg-purple-500 group-hover:opacity-30 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-4 translate-y-4 transform rounded-full bg-purple-400 opacity-20 group-hover:bg-purple-500 group-hover:opacity-30 transition-all duration-300"></div>

          <Link to="/templates" className="flex h-full w-full flex-col items-start p-6 text-left">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
              <Layers className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Browse Templates</h2>
            <p className="text-sm text-gray-600 mb-4">Find and use professionally designed templates</p>
            <div className="mt-auto flex items-center text-purple-600 font-medium">
              <span>Explore templates</span>
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>


      {/* Website Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        {/* Custom Websites Stats */}
        <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Custom Websites</h3>
                <p className="text-sm text-gray-500">Track your custom website usage</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{websiteStats.customCreated}</p>
              <p className="text-sm text-gray-500">of {websiteStats.purchaseLimit} available</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(websiteStats.customCreated / websiteStats.purchaseLimit) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Purchase More
            </Button>
          </div>
        </div>

        {/* WordPress Websites Stats */}
        <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaWordpress className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">WordPress Websites</h3>
                <p className="text-sm text-gray-500">Track your WordPress website usage</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{websiteStats.wordpressCreated}</p>
              <p className="text-sm text-gray-500">of {websiteStats.wordpressPurchaseLimit} available</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(websiteStats.wordpressCreated / websiteStats.wordpressPurchaseLimit) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              Purchase More
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Custom and WordPress websites */}
      <Tabs defaultValue="custom" className="w-full mt-8" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger
              value="custom"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2"
            >
              <Code className="h-4 w-4 mr-2" />
              Custom Websites
            </TabsTrigger>
            <TabsTrigger
              value="wordpress"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2"
            >
              <FaWordpress className="h-4 w-4 mr-2" />
              WordPress Websites
            </TabsTrigger>
          </TabsList>

          <div className="relative max-w-sm flex-1 md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Custom Websites Tab Content */}
        <TabsContent value="custom" className="mt-0">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All tags</SelectItem>
                  {/* Add more filter options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1"></div>
            <Button className="bg-[#B5132C] hover:bg-[#9e1126]">
              <Plus className="h-4 w-4 mr-2" />
              New Website
            </Button>
          </div>

          <Divider className="w-full" orientation="left">
            <span className="text-gray-500 text-sm">
              Custom Websites: {templates.length} of {websiteStats.purchaseLimit}
            </span>
          </Divider>

          {/* Template Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
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
                <TemplateCard
                key={template._id}
                template={template}
                onDelete={handleDeleteTemplate}
                onPreview={handlePreview}
                onManage={handleUseTemplate}
              />
              ))
            ) : (
              // Show message if no templates are found
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                <Layers className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No custom websites found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Create your first custom website or browse our template gallery to get started quickly.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/editor">
                    <Button variant="outline">Create Website</Button>
                  </Link>
                  <Link to="/templates">
                    <Button className="bg-[#B5132C] hover:bg-[#9e1126]">Browse Templates</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* WordPress Websites Tab Content */}
        <TabsContent value="wordpress" className="mt-0">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1"></div>
            <Button className="bg-[#B5132C] hover:bg-[#9e1126]" onClick={handleClick}>
              <Plus className="h-4 w-4 mr-2" />
              New WordPress Site
            </Button>
          </div>

          <Divider className="w-full" orientation="left">
            <span className="text-gray-500 text-sm">
              WordPress Websites: {websiteStats.wordpressCreated} of {websiteStats.wordpressPurchaseLimit}
            </span>
          </Divider>

          {/* WordPress Template Cards (Placeholder for now) */}
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed mt-6">
            <FaWordpress className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No WordPress websites yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Create your first WordPress website to manage your content easily with the world's most popular CMS.
            </p>
            <Button className="bg-[#B5132C] hover:bg-[#9e1126]" onClick={handleClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create WordPress Website
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </SidebarProvider>
  )
}
