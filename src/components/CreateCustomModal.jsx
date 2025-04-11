"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Globe, ArrowRight, MapPin } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function CreateCustomModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    location: "council-bluffs",
    siteTitle: "",
  })
  const [darkMode, setDarkMode] = useState(false)
  const router = useNavigate()

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router("/templates")
  }

  if (!isOpen) return null

  const locations = [
    { label: "Council Bluffs, USA", value: "council-bluffs" },
    { label: "The Dalles, USA", value: "the-dalles" },
    { label: "London, UK", value: "london" },
    { label: "Mumbai, India", value: "mumbai" },
    { label: "Sydney, Australia", value: "sydney" },
  ]

  // Get flag emoji for the selected location
  const getLocationFlag = (location) => {
    const flags = {
      "council-bluffs": "🇺🇸",
      "the-dalles": "🇺🇸",
      london: "🇬🇧",
      mumbai: "🇮🇳",
      sydney: "🇦🇺",
    }
    return flags[location] || "🌎"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="w-full max-w-md shadow-2xl bg-white border-0">
              <CardHeader className="relative pb-4 border-b">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full p-3 shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="pt-6">
                  <CardTitle className="text-2xl font-bold text-center">Create a New Custom Website</CardTitle>
                  <CardDescription className="text-center pt-1">
                    Build your website with custom setup
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Choose Location
                    </label>
                    <Select
                      defaultValue={formData.location}
                      onValueChange={(value) => updateFormData({ location: value })}
                    >
                      <SelectTrigger
                        id="location"
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      >
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {locations.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                            className="flex items-center gap-2 py-2.5"
                          >
                            <span className="mr-2">{getLocationFlag(location.value)}</span>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose the server location closest to your target audience for better performance.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="siteTitle" className="text-sm font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      Site Title
                    </label>
                    <Input
                      id="siteTitle"
                      type="text"
                      placeholder="My Website"
                      value={formData.siteTitle}
                      onChange={(e) => updateFormData({ siteTitle: e.target.value })}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be displayed in the browser tab and as the main heading on your site.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!formData.siteTitle.trim()}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
