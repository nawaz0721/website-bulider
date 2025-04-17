"use client"

import { Eye, Trash, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// This would be a separate component you can import in your MainDashboard.tsx
const TemplateCard = ({ template, onDelete, onPreview, onManage, handlePayNow }) => {

  console.log("template=>",template);
  
  // Format the date (assuming template has a createdAt field)
  const formattedDate = template.createdAt
    ? formatDistanceToNow(new Date(template.createdAt), { addSuffix: true })
    : "Recently added"

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Status badge - top left */}
      <Badge className="absolute top-3 left-3 z-10 bg-green-100 text-green-800 border border-green-200 px-2 py-1 text-xs font-medium">
        Active
      </Badge>

      {/* Preview section */}
      <div className="relative overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

        {/* Action buttons - appear on hover with nice animation */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-800 shadow-md"
            onClick={() => onPreview(template)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-800 shadow-md"
            onClick={() => onManage(template)}
          >
            Manage
          </Button>
          {!template.stripeSubscriptionId && 
        <Button
        variant="secondary"
        size="sm"
        className="bg-white/90 hover:bg-white text-gray-800 shadow-md"
        onClick={() => handlePayNow(template)}
      >
        Pay Now
      </Button> 
        }
        </div>
          

        {/* Delete button - top right */}
        <button
          onClick={() => onDelete(template._id)}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-red-500 text-gray-700 hover:text-white rounded-full shadow-md z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
        >
          <Trash className="h-4 w-4" />
        </button>

        {/* Template Image with subtle zoom effect */}
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={template.image || "/placeholder.svg?height=200&width=400"}
            alt={template.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Template type indicator */}
        <div className="flex items-center mb-2">
          <Badge variant="outline" className="text-xs font-normal text-gray-600 bg-gray-50">
            {template.type || "Custom Template"}
          </Badge>
        </div>

        {/* Title and description */}
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-2">
          {template.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{template.description || "No description available"}</p>

        {/* Metadata footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{template.pages?.length || 0} pages</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateCard
