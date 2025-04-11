"use client"

import { useState } from "react"
import { Eye, Plus, Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Cookies from "js-cookie"

export const UserTemplateCard = ({ template, handlePreview, handleUseTemplate, handleAddToCart, isTemplateAdded }) => {
  const [isHovered, setIsHovered] = useState(false)

  const user = Cookies?.get("user")
  const userDetails = user ? JSON.parse(user) : null

  return (
    <Card
      key={template._id}
      className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-lg flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with overlay and effects */}
      <div className="relative overflow-hidden">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 z-10 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Image with zoom effect */}
        <img
          src={template.image || "/placeholder.svg"}
          alt={template.title}
          className="w-full h-40 object-cover rounded-t-md transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category badge that appears on hover */}
        <Badge
          className={`absolute bottom-3 left-3 z-20 bg-black text-white px-3 py-1 transition-all duration-300 ${
            isHovered ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
        >
          {template.category || "Template"}
        </Badge>
      </div>

      {/* Content */}
      <CardHeader className="flex-1">
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {template.title}
        </CardTitle>

        <CardDescription className="text-sm text-gray-600 line-clamp-2 mt-2">
          {template.description || "No description available"}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between space-x-2 pt-3 border-t border-gray-100">
        <Button variant="outline" className="hover:bg-gray-50 border-gray-200" onClick={() => handlePreview(template)}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>

        {userDetails?.role === "admin" ? (
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleUseTemplate(template)}
          >
            Use Template
          </Button>
        ) : (
          <Button
            className={`${
              isTemplateAdded(template._id) ? "bg-green-600 hover:bg-green-700" : "bg-[#B5132C] hover:bg-[#9e1126]"
            }`}
            onClick={() => handleAddToCart(template)}
            disabled={isTemplateAdded(template._id)}
          >
            {isTemplateAdded(template._id) ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add to Collection
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
