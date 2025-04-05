"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

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

  return (
    <div className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl">Create a New Custom Website</CardTitle>
          <CardDescription>Build your website with custom setup</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Choose Location
              </label>
              <Select defaultValue={formData.location} onValueChange={(value) => updateFormData({ location: value })}>
                <SelectTrigger id="location" className="w-full">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="siteTitle" className="text-sm font-medium">
                Site Title
              </label>
              <Input
                id="siteTitle"
                type="text"
                placeholder="My Website"
                value={formData.siteTitle}
                onChange={(e) => updateFormData({ siteTitle: e.target.value })}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

