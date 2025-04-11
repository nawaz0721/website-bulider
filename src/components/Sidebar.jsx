"use client"

import { useState, useEffect } from "react"
import { Tooltip } from "antd"
import { Heart, Gem, Box, Menu, X, Home, Settings, Layers, PlusSquare } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setExpanded(false)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <>
      {/* Mobile overlay when sidebar is expanded */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-[100%] border-r border-red-400 flex flex-col items-center gap-4 bg-[#B5132C] transition-all duration-300 z-40",
          expanded ? "w-56" : "w-16",
          isMobile && !expanded && "w-0 -translate-x-full opacity-0",
          isMobile && expanded && "w-64"
        )}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between w-full px-3 h-14 border-b border-red-400">
          <Tooltip placement="right" title={expanded ? "" : "Home"}>
            <div className="flex h-10 w-10 items-center justify-center">
              <Box className="h-7 w-7 text-white" />
            </div>
          </Tooltip>

          {expanded && <span className="text-white font-semibold text-lg">Web4x</span>}

          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-red-800"
              onClick={() => setExpanded(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Toggle button for desktop */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-red-400 p-0 text-white hover:bg-red-500 shadow-md"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
          </Button>
        )}

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col items-center w-full gap-2 px-3 py-4">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            expanded={expanded}
            active
          />
          <NavItem
            icon={<Layers className="h-5 w-5" />}
            label="Templates"
            expanded={expanded}
          />
          <NavItem
            icon={<PlusSquare className="h-5 w-5" />}
            label="New Project"
            expanded={expanded}
          />
          <Link to={'/setting'}> 
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            expanded={expanded}
            />
            </Link>

          <div className="mt-4 w-full border-t border-red-400 pt-4">
            <Tooltip placement="right" title={expanded ? "" : "Salar's Workspace"}>
              <button
                className={cn(
                  "flex items-center gap-3 w-full p-2 rounded-lg bg-purple-600 text-white transition-colors hover:bg-purple-700",
                  expanded ? "justify-start" : "justify-center"
                )}
                aria-label="Workspace"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-800 text-white">
                  S
                </span>
                {expanded && <span className="font-medium">Salar's Workspace</span>}
              </button>
            </Tooltip>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col w-full gap-2 p-3 border-t border-red-400">
          {/* Premium button */}
          <Tooltip placement="right" title={expanded ? "" : "Try Web4x Pro"}>
            <button
              className={cn(
                "flex items-center gap-3 w-full p-2 rounded-lg bg-emerald-500 text-white transition-all hover:bg-emerald-600",
                expanded ? "justify-start" : "justify-center"
              )}
              aria-label="Premium Features"
            >
              <Gem className="h-5 w-5 flex-shrink-0" />
              {expanded && <span className="font-medium whitespace-nowrap">Try Web4x Pro</span>}
            </button>
          </Tooltip>

          {/* Favorites button */}
          <Tooltip placement="right" title={expanded ? "" : "Favorites"}>
            <button
              className={cn(
                "flex items-center gap-3 w-full p-2 rounded-lg text-white transition-colors hover:bg-red-800",
                expanded ? "justify-start" : "justify-center"
              )}
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5 flex-shrink-0" />
              {expanded && <span className="font-medium">Favorites</span>}
            </button>
          </Tooltip>
        </div>
      </aside>

      {/* Mobile toggle button */}
      {isMobile && !expanded && (
        <button
          className="fixed left-4 top-3 z-50 rounded-md bg-[#B5132C] p-2 text-white shadow-md"
          onClick={() => setExpanded(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  )
}

// Navigation item component
const NavItem = ({ icon, label, expanded, active = false }) => {
  return (
    <Tooltip placement="right" title={expanded ? "" : label}>
      <button
        className={cn(
          "flex items-center gap-3 w-full p-2 rounded-lg transition-colors",
          expanded ? "justify-start" : "justify-center",
          active
            ? "bg-red-800 text-white"
            : "text-white hover:bg-red-800"
        )}
        aria-label={label}
      >
        {icon}
        {expanded && <span className="font-medium">{label}</span>}
      </button>
    </Tooltip>
  )
}

export default Sidebar
