"use client"

import { Search, Sparkles, ArrowRight, X, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { wordpressTemplates } from "@/data"
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"

export default function WordPressTemplateModal({
  isOpen,
  onClose,
  onTemplateSelect,
  selectedTemplate,
  setSelectedTemplate,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  currentPage,
  setCurrentPage,
}) {
  // Filter templates based on search and category
  const filteredTemplates = wordpressTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

    // Handle template selection
    const handleTemplateSelect = (template) => {
      setSelectedTemplate(template)
      // Store template ID in cookie with 30 days expiration
      Cookies.set('selectedTemplateId', template.id, { expires: 30, path: '' })
    }

  // Pagination
  const templatesPerPage = 9
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage)
  const currentTemplates = filteredTemplates.slice((currentPage - 1) * templatesPerPage, currentPage * templatesPerPage)

  // Get unique categories
  const categories = ["all", ...new Set(wordpressTemplates.map((t) => t.category))]

  if (!isOpen) return null

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 w-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Modal Header */}
          <div className="border-b p-6 relative bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="pt-6 text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Choose a WordPress Template
              </h2>
              <p className="text-gray-600 mt-1">Select a template to start building your website</p>
            </div>
            <button
              className="absolute right-4 top-4 rounded-full hover:bg-white/80 p-2 transition-colors duration-200"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b bg-white shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-10 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchQuery("")
                      setCurrentPage(1)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[180px] h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Template Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-lg ${
                    selectedTemplate?.id === template.id
                      ? "ring-2 ring-blue-500 shadow-md transform scale-[1.02]"
                      : "hover:scale-[1.02]"
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category badge */}
                    <Badge className="absolute top-3 left-3 bg-white/90 text-blue-700 font-medium">
                      {template.category}
                    </Badge>

                    {/* Selected indicator */}
                    {selectedTemplate?.id === template.id && (
                      <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{template.description}</p>

                    {/* View details button that appears on hover */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {currentTemplates.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No templates found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any templates matching your search criteria. Try adjusting your filters or search
                  terms.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("all")
                    setCurrentPage(1)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination and Footer */}
          <div className="border-t p-4 flex items-center justify-between bg-white">
            <div>
              {filteredTemplates.length > 0 && (
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">{(currentPage - 1) * templatesPerPage + 1}</span>-
                  <span className="font-medium">
                    {Math.min(currentPage * templatesPerPage, filteredTemplates.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredTemplates.length}</span> templates
                </p>
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === page
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          <div className="border-t p-5 flex justify-end bg-gradient-to-r from-gray-50 to-gray-100">
            <Button variant="outline" className="mr-3 border-gray-300 text-gray-700 hover:bg-gray-50" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={!selectedTemplate}
              onClick={() => {
                onClose()
                onTemplateSelect()
              }}
              className={`bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ${
                !selectedTemplate ? "opacity-70 cursor-not-allowed" : "shadow-md hover:shadow-lg"
              }`}
            >
              {selectedTemplate ? `Continue with ${selectedTemplate.name}` : "Select a Template"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
